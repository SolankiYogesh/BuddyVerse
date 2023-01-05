import {Text, SafeAreaView, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CreateGroupScreenStyle from './CreateGroupScreenStyle';
import CreateGroupHeader from 'screens/chat/components/create-group-header/CreateGroupHeader';
import CreateGroupInput from 'screens/chat/components/create-group-input/CreateGroupInput';
import ToggleSwitch from 'toggle-switch-react-native';
import colors from 'theme/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images} from 'theme';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import {
  Communities,
  GroupContent,
  MediaAttachment,
  AddGroupMembersQuery,
  MemberStatus,
  UserIdList,
  CommunitiesAction,
  Role,
  NotificationContent,
  SendNotificationTarget,
  Notifications,
  Action,
} from 'getsocial-react-native-sdk';
import _ from 'lodash';
import {launchImageLibrary} from 'react-native-image-picker';
import {openSettings} from 'react-native-permissions';
import screenNameEnum from 'models/screenNameEnum';
import {FlatList} from 'react-native-gesture-handler';
import {showToast} from 'utils/helper/helper';
import OverlayLoader from 'components/overlay-loader/OverlayLoader';
import {
  ManualModerationTool,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import {Storage} from 'aws-amplify';
import Permission from '../../../../models/Permission';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';
import {ms} from 'react-native-size-matters';

const CreateGroupScreen = props => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createGroupPopup, setCreateGroupPopup] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const {userData} = useUserState();
  const [permissionModal, setPermissionModel] = useState(false);
  const [error, setError] = useState(false);

  let GroupID = '';

  const onPressSave = async () => {
    if (!_.trim(groupName)) {
      showToast('Enter group name');
      return;
    }
    if (!_.trim(description)) {
      showToast('Enter group description');
      return;
    }
    if (!imageUri) {
      showToast('Please upload Cover Image');
      return;
    }
    const isgroupNameSafe = ManualModerationTool(groupName);
    const advgroupSafe = isgroupNameSafe && SpaceWordModeration(groupName);
    const isdescription = ManualModerationTool(description);
    const advDescriptionSafe =
      isdescription && SpaceWordModeration(description);

    if (!(advgroupSafe && advDescriptionSafe)) {
      setIsPopUp(true);
      return;
    }
    setIsLoading(true);
    const imageUrl = await getGroupImageProfileUrl();
    const groupContent = new GroupContent();
    groupContent.avatar = MediaAttachment.withImageUrl(imageUrl);
    groupContent.id = new Date().getTime().toString();
    groupContent.title = groupName;
    groupContent.description = description;
    groupContent.isPrivate = isPrivate;
    groupContent.properties['owner'] = userData?.id;
    groupContent.permissions[CommunitiesAction.Post] = Role.Member; // only admins can create posts
    groupContent.permissions[CommunitiesAction.React] = Role.Member; // members can add reactions
    groupContent.isDiscoverable = true; // group will be visible for everyone

    try {
      Communities.createGroup(groupContent)
        .then((group: any) => {
          GroupID = group?.id;

          setIsLoading(false);

          if (members?.length !== 0) {
            addMembersGroup(group?.id);
          } else {
            setCreateGroupPopup(true);
          }
        })
        .catch(() => {
          setIsLoading(false);
          props.navigation.goBack();
          showToast('oops! Something went wrong, Try again later');
        });
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  };

  const getGroupImageProfileUrl = () => {
    return new Promise(async resolve => {
      const media = await fetch(imageUri);
      const blob = await media.blob();

      try {
        const file_name = `GPROFILE-${
          Math.floor(Math.random() * 90000) + 10000
        }_${new Date().getTime()}.jpg`;
        Storage.put(file_name, blob, {
          level: 'public',
          contentType: `image/jpg`,
          useAccelerateEndpoint: true,
        })
          .then(() => {
            setIsLoading(false);

            resolve(
              `https://d1c70unjid1vm2.cloudfront.net/public/${file_name.replace(
                '.jpg',
                '',
              )}-profile.jpg`,
            );
          })
          .catch(eror => {
            console.log(eror);

            resolve('');
          });
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    });
  };

  const addMembersGroup = groupId => {
    const ids = _.map(members, i => {
      return i?.userId;
    });

    let userIdList = new UserIdList.create(ids);

    const query = AddGroupMembersQuery.create(groupId, userIdList)
      .withMemberStatus(MemberStatus.Member)
      .withRole(Role.Member);
    setIsLoading(true);

    try {
      Communities.addGroupMembers(query)
        .then(() => {
          setIsLoading(false);
          sendNotifications(userIdList);
          setCreateGroupPopup(true);
        })
        .catch(() => {
          setIsLoading(false);
          props.navigation.goBack();
        });
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  const sendNotifications = async userIdList => {
    const notificationContent = new NotificationContent();
    notificationContent.templateName = 'addedYouInGroup';
    notificationContent.templatePlaceholders['GROUP_NAME'] = groupName;

    const action = Action.create('group_added', {GroupId: GroupID});
    notificationContent.action = action;
    notificationContent.templatePlaceholders['USER_NAME'] =
      userData?.publicProperties?.full_name || userData?.displayName;
    const target = SendNotificationTarget.usersWithIds(userIdList);
    await Notifications.send(notificationContent, target);
  };

  const getImageFromGallery = () => {
    launchImageLibrary({
      includeBase64: true,
      maxWidth: 300,
      maxHeight: 400,
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
      presentationStyle: 'fullScreen',
    })
      .then(image => {
        if (image) {
          setImageUri(image?.assets[0]?.uri);
        }
      })
      .catch(() => {
        showToast('oops! Something went wrong, Try with a different image');
      });
  };

  const onPressCancel = () => {
    props?.navigation?.pop();
  };

  const onPressImage = async () => {
    const mic = await Permission.getMicPermission();
    const camera = await Permission.getCameraPermission();
    const storage = await Permission.getStoragePermission();

    if (mic && camera && storage) {
      getImageFromGallery();
    } else {
      setPermissionModel(true);
    }
  };

  const onAddMembers = items => {
    if (items.length !== 0) {
      const newMembers = [...members, ...items];
      const updatedMembers = _.uniqBy(newMembers, i => i?.userId);
      setMembers(updatedMembers);
    }
  };

  const onPressAddMembers = () => {
    props?.navigation?.push(screenNameEnum.AddMembersScreen, {
      onAdd: onAddMembers,
    });
  };

  const onPressRemoveMember = item => {
    const newMembers = _.filter(members, i => i?.userId !== item?.userId);
    setMembers(newMembers);
  };

  const renderPublicView = () => {
    return (
      <View style={CreateGroupScreenStyle.publicViewContainer}>
        <View style={CreateGroupScreenStyle.switchViewContainer}>
          <Text style={CreateGroupScreenStyle.privateText}>Private Group</Text>
          <ToggleSwitch
            isOn={isPrivate}
            onToggle={() => setIsPrivate(!isPrivate)}
            size={'medium'}
            offColor={colors.grayShadeCC}
          />
        </View>
      </View>
    );
  };

  const renderCoverStream = () => {
    return (
      <View style={CreateGroupScreenStyle.publicViewContainer}>
        <Text style={CreateGroupScreenStyle.privateText}>
          Upload Cover Photo
        </Text>
        {imageUri ? (
          <View style={CreateGroupScreenStyle.coverImageContainer}>
            <Image
              resizeMode="cover"
              style={CreateGroupScreenStyle.coverImage}
              source={{uri: imageUri}}
            />
            <TouchableOpacity
              style={CreateGroupScreenStyle.cancelImageBack}
              onPress={() => setImageUri('')}
            >
              <Image
                resizeMode="contain"
                style={[CreateGroupScreenStyle.coverImage]}
                source={images.cancel}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={CreateGroupScreenStyle.btnContainer}
            onPress={onPressImage}
          >
            <Image
              source={images.plus}
              style={CreateGroupScreenStyle.plusIcon}
              resizeMode="contain"
            />
            <Text style={CreateGroupScreenStyle.privateText}>Add cover</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderMemberItem = ({item, index}) => {
    const isLast = index === members.length - 1;

    return (
      <View
        style={{
          width: ms(50),
          height: ms(50),
        }}
      >
        <UserImage
          Url={item?.avatarUrl}
          size={50}
          style={CreateGroupScreenStyle.memberCoverImage}
        />
        <TouchableOpacity
          style={[
            CreateGroupScreenStyle.cancelMemberImageBack,
            isLast && CreateGroupScreenStyle.topright,
          ]}
          onPress={() => onPressRemoveMember(item)}
        >
          <Image
            resizeMode="contain"
            style={[CreateGroupScreenStyle.coverImage]}
            source={images.cancel}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSeperator = () => {
    return <View style={CreateGroupScreenStyle.seperator} />;
  };

  const renderAddMembers = () => {
    return (
      <View style={CreateGroupScreenStyle.publicViewContainer}>
        <Text style={CreateGroupScreenStyle.privateText}>Add Members</Text>
        <Text style={CreateGroupScreenStyle.descriptionText}>
          Choose people from your contacts list
        </Text>
        <AnnounceMentModal
          modalVisible={isPopUp}
          title={''}
          buttonText={'ok'}
          messageText={ModalsMessages.ModalsMassages.offensiveWord}
          onPressButton={() => setIsPopUp(false)}
        />
        {members.length !== 0 && (
          <FlatList
            data={members}
            extraData={useState}
            renderItem={renderMemberItem}
            keyExtractor={(_, index) => `members${index}`}
            horizontal
            contentContainerStyle={CreateGroupScreenStyle.listItems}
            ItemSeparatorComponent={renderSeperator}
            showsHorizontalScrollIndicator={false}
          />
        )}
        <TouchableOpacity
          style={CreateGroupScreenStyle.btnContainer}
          onPress={onPressAddMembers}
        >
          <Image
            source={images.addMember}
            style={CreateGroupScreenStyle.plusIcon}
            resizeMode="contain"
          />
          <Text style={CreateGroupScreenStyle.privateText}>Add Members</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={CreateGroupScreenStyle.container}>
      <CreateGroupHeader
        title={'Create Group'}
        onPressSave={onPressSave}
        onPressCancel={onPressCancel}
        isDisable={isLoading}
      />
      <View style={CreateGroupScreenStyle.viewContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <View style={CreateGroupScreenStyle.container}>
            <CreateGroupInput
              multiline={false}
              placeholder={'Group Name'}
              value={groupName}
              onChangeText={setGroupName}
              onSubmitEditing={undefined}
              returnKeyType={'next'}
            />
            <CreateGroupInput
              multiline={false}
              placeholder={'Location (Optional)'}
              value={location}
              onChangeText={setLocation}
              onSubmitEditing={undefined}
              returnKeyType={'next'}
            />
            <CreateGroupInput
              multiline={true}
              placeholder={'Group Description'}
              value={description}
              onChangeText={setDescription}
              onSubmitEditing={undefined}
              returnKeyType={undefined}
            />
            {renderPublicView()}
            {renderCoverStream()}
            {renderAddMembers()}
          </View>
        </KeyboardAwareScrollView>
      </View>
      {isLoading && <OverlayLoader />}
      <AnnounceMentModal
        modalVisible={permissionModal}
        buttonText="Setting"
        secondButton
        secondButtonText="Cancel"
        onPressSecondButton={() => {
          setPermissionModel(false);
        }}
        messageText={ModalsMessages.ModalsMassages.thisFeatureRequired}
        onPressButton={() => {
          openSettings().then(() => {
            setPermissionModel(false);
          });
        }}
      />
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
      {createGroupPopup && (
        <AnnounceMentModal
          modalVisible={createGroupPopup}
          title={ModalsMessages.ModalsTitles.success}
          messageText={ModalsMessages.ModalsMassages.groupCreated}
          buttonText="Ok"
          onPressButton={() => {
            setCreateGroupPopup(false);
            props.navigation.goBack();
          }}
        />
      )}
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </SafeAreaView>
  );
};

export default CreateGroupScreen;
