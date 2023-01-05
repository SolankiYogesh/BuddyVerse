import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CreateGroupHeader from 'screens/chat/components/create-group-header/CreateGroupHeader';
import CreateGroupInput from 'screens/chat/components/create-group-input/CreateGroupInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EditGroupScreenStyle from './EditGroupScreenStyle';
import {showToast} from 'utils/helper/helper';
import screenNameEnum from 'models/screenNameEnum';
import {images} from 'theme';
import {launchImageLibrary} from 'react-native-image-picker';
import ToggleSwitch from 'toggle-switch-react-native';
import colors from 'theme/colors/colors';
import _ from 'lodash';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import {
  MembersQuery,
  Communities,
  PagingQuery,
  GroupContent,
  MediaAttachment,
  MemberStatus,
  UpdateGroupMembersQuery,
  UserIdList,
  Role,
  Action,
  RemoveGroupMembersQuery,
  NotificationContent,
  SendNotificationTarget,
  Notifications,
} from 'getsocial-react-native-sdk';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import ThemeButton from 'components/theme-button/ThemeButton';
import OverlayLoader from 'components/overlay-loader/OverlayLoader';
import MakeAdminModel from 'screens/chat/components/admin-model/MakeAdminModel';
import {
  ManualModerationTool,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import {Storage} from 'aws-amplify';
import {openSettings} from 'react-native-permissions';
import Permission from '../../../../models/Permission';
import {ms} from 'react-native-size-matters';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';

const EditGroupScreen = props => {
  const i = props?.route?.params?.item;
  const [isPrivate, setIsPrivate] = useState(i?.settings?.isPrivate || false);
  const [groupName, setGroupName] = useState(i?.title || '');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState(i?.description || '');
  const [imageUri, setImageUri] = useState(i?.avatarUrl || '');
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const isOwner = i?.membership?.role === 0 || i?.membership?.role === 1;
  const isCreaterOwner = i?.membership?.role === 0;
  const {userData} = useUserState();
  const [adminModal, setAdminModel] = useState(false);
  const [modalItem, setModelItem] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const [permissionModal, setPermissionModel] = useState(false);
  // const [updatedPopUp, setUpdatedPopup] = useState(false);

  useEffect(() => {
    getGroupMembers(true);
  }, []);

  const getImageFromGallery = () => {
    launchImageLibrary({
      maxWidth: 300,
      maxHeight: 400,
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
      presentationStyle: 'fullScreen',
    }).then(image => {
      if (image) {
        setImageUri(image?.assets[0]?.uri);
      }
    });
  };

  const getGroupMembers = (isLoad = false) => {
    const groupId = i?.id;
    const query = MembersQuery.ofGroup(groupId);
    const pagingQuery = new PagingQuery(query);
    setIsLoading(isLoad);
    try {
      Communities.getGroupMembers(pagingQuery).then(
        result => {
          setIsLoading(false);

          const orderByID = _.orderBy(
            result.entries,
            item => item?.membership?.role,
          );

          setMembers(orderByID);
        },
        () => {
          setIsLoading(false);
        },
      );
    } catch (e) {
      setIsLoading(false);

      setError(true);
    }
  };

  const onPressCancel = () => {
    props?.navigation?.pop();
  };

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
    const isGroupnameSafe = ManualModerationTool(groupName);
    const isDescriptionSafe = ManualModerationTool(description);
    const advGroupSafe = isGroupnameSafe && SpaceWordModeration(groupName);
    const advDescriptionSafe =
      isDescriptionSafe && SpaceWordModeration(description);

    if (!(advGroupSafe && advDescriptionSafe)) {
      setIsPopUp(true);
      return;
    }
    const groupContent = new GroupContent();
    const isLink = imageUri.includes('http');
    if (!isLink) {
      const imageUrl = await getGroupImageProfileUrl();
      groupContent.avatar = MediaAttachment.withImageUrl(imageUrl);
    } else {
      groupContent.avatar = MediaAttachment.withImageUrl(imageUri);
    }

    groupContent.id = i?.id;
    groupContent.title = groupName;
    groupContent.description = description;
    groupContent.isPrivate = isPrivate;
    groupContent.isDiscoverable = true;
    groupContent.properties['owner'] = userData?.id;

    setIsLoading(true);
    try {
      Communities.updateGroup(i?.id, groupContent)
        .then(() => {
          setIsLoading(false);
          showToast(`${groupName} updated`);

          if (members?.length !== 0) {
            updateGroupMembers();
          } else {
            props?.navigation.pop();
          }
        })
        .catch(() => {
          setIsLoading(false);
          props?.navigation.pop();
          showToast(`Something went wrong !`);
        });
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  };

  const getGroupImageProfileUrl = () => {
    return new Promise(async resolve => {
      try {
        const media = await fetch(imageUri);
        const blob = await media.blob();

        const file_name = `GPROFILE-${i?.id}_${new Date().getTime()}.jpg`;
        Storage.put(file_name, blob, {
          level: 'public',
          contentType: `image/jpg`,
          useAccelerateEndpoint: true,
        })
          .then(() => {
            resolve(
              `https://d1c70unjid1vm2.cloudfront.net/public/${file_name.replace(
                '.jpg',
                '',
              )}-profile.jpg`,
            );
          })
          .catch(() => {
            resolve('');
          });
      } catch (e) {
        resolve('');
        setIsLoading(false);
        setError(true);
      }
    });
  };

  const removeGroupMembers = member => {
    if (adminModal) {
      setAdminModel(false);
    }
    const groupID = i?.id;
    const userIdList = UserIdList.create([member.userId]);
    const query = new RemoveGroupMembersQuery(userIdList, groupID);

    try {
      Communities.removeGroupMembers(query)
        .then(() => {
          setIsLoading(false);
          showToast(` You Removed ${member?.displayName}`);
          const filterData = _.filter(
            members,
            i => i?.userId !== member?.userId,
          );

          setMembers(filterData);
        })
        .catch(() => {
          showToast(`Sorry failed to remove ${member?.displayName} `);
        });
    } catch (e) {
      setIsLoading(false);

      setError(true);
    }
  };

  const leaveGroup = () => {
    const groupID = i?.id;
    const userIdList = UserIdList.create([userData?.id]);
    const query = new RemoveGroupMembersQuery(userIdList, groupID);

    setIsLoading(true);
    try {
      Communities.removeGroupMembers(query)
        .then(() => {
          setIsLoading(false);

          showToast(`${i?.title} Group Successfully Leaved`);
          props.navigation.goBack();
        })
        .catch(() => {
          setIsLoading(false);

          showToast(`Sorry Something went wrong`);
        });
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  };

  const deleteGroup = () => {
    const groupID = i?.id;
    if (groupID) {
      setIsLoading(true);
      try {
        Communities.removeGroups([groupID])
          .then(() => {
            setIsLoading(false);
            showToast(`${i?.title} Group Deleted`);
            props.navigation.goBack();
          })
          .catch(() => {
            showToast(`Sorry Something went wrong`);
            setIsLoading(false);
          });
      } catch (e) {
        setIsLoading(false);
        setError(true);
      }
    }
  };

  const updateGroupMembers = () => {
    const filterMembers = _.filter(members, i => {
      return !i?.membership;
    });

    const ids = _.map(filterMembers, i => {
      return i?.userId;
    });
    let userIdList = new UserIdList.create(ids);
    const query = UpdateGroupMembersQuery.create(i?.id, userIdList)
      .withMemberStatus(MemberStatus.Member)
      .withRole(Role.Member);
    setIsLoading(true);
    try {
      Communities.updateGroupMembers(query)
        .then(() => {
          setIsLoading(false);
          props?.navigation.goBack();
        })
        .catch(() => {
          setIsLoading(false);

          props.navigation.goBack();
        });
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  };

  const onPressAdmin = async item => {
    setAdminModel(false);

    const ids = _.map([item], id => {
      return id?.userId;
    });
    let userIdList = new UserIdList.create(ids);
    const query = UpdateGroupMembersQuery.create(i?.id, userIdList)
      .withMemberStatus(MemberStatus.Member)
      .withRole(Role.Admin);

    await Communities.updateGroupMembers(query);
    setTimeout(() => {
      getGroupMembers(false);
      setModelItem(null);
    }, 200);
  };

  const onPressRemoveFromAdmin = async item => {
    setAdminModel(false);
    const ids = _.map([item], id => {
      return id?.userId;
    });
    let userIdList = new UserIdList.create(ids);
    const query = UpdateGroupMembersQuery.create(i?.id, userIdList)
      .withMemberStatus(MemberStatus.Member)
      .withRole(Role.Member);

    await Communities.updateGroupMembers(query);

    setTimeout(() => {
      getGroupMembers(false);
      setModelItem(null);
    }, 200);
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
      const updatedMembers = _.uniqBy(newMembers, it => it?.userId);
      const filterMembers = _.filter(updatedMembers, i => {
        return !i?.membership;
      });

      const ids = _.map(filterMembers, i => {
        return i?.userId;
      });
      let userIdList = new UserIdList.create(ids);
      const query = UpdateGroupMembersQuery.create(i?.id, userIdList)
        .withMemberStatus(MemberStatus.Member)
        .withRole(Role.Member);
      setIsLoading(true);

      try {
        Communities.updateGroupMembers(query)
          .then(() => {
            setIsLoading(false);
            sendNotifications(userIdList);
            getGroupMembers(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      } catch (e) {
        setIsLoading(false);
        setError(true);
      }
    }
  };

  const sendNotifications = async userIdList => {
    const notificationContent = new NotificationContent();
    notificationContent.templateName = 'addedYouInGroup';
    notificationContent.templatePlaceholders['GROUP_NAME'] = i?.title;
    const action = Action.create('group_added', {GroupId: i?.id});
    notificationContent.action = action;
    notificationContent.templatePlaceholders['USER_NAME'] =
      userData?.publicProperties?.full_name || userData?.displayName;
    const target = SendNotificationTarget.usersWithIds(userIdList);

    await Notifications.send(notificationContent, target);
  };

  const onPressAddMembers = () => {
    props?.navigation?.push(screenNameEnum.AddMembersScreen, {
      onAdd: onAddMembers,
    });
  };

  const renderPublicView = () => {
    return (
      <View style={EditGroupScreenStyle.publicViewContainer}>
        <View style={EditGroupScreenStyle.switchViewContainer}>
          <Text style={EditGroupScreenStyle.privateText}>Private Group</Text>
          <ToggleSwitch
            isOn={isPrivate}
            onToggle={() => setIsPrivate(!isPrivate)}
            size={'medium'}
            offColor={colors.grayShadeCC}
            disabled={!isOwner}
          />
        </View>
      </View>
    );
  };

  const renderSeperator = () => {
    return <View style={EditGroupScreenStyle.seperator} />;
  };

  const renderAddMembers = () => {
    return (
      <View style={EditGroupScreenStyle.publicViewContainer}>
        <Text
          style={EditGroupScreenStyle.privateText}
        >{`Members (${members?.length})`}</Text>
        {isLoading ? (
          <LoadingContainer />
        ) : (
          members.length !== 0 && (
            <FlatList
              data={members}
              extraData={useState}
              renderItem={renderMemberItem}
              keyExtractor={(_, index) => `members${index}`}
              contentContainerStyle={EditGroupScreenStyle.listItems}
              ItemSeparatorComponent={renderSeperator}
              showsHorizontalScrollIndicator={false}
            />
          )
        )}
        <TouchableOpacity
          style={EditGroupScreenStyle.btnContainer}
          onPress={onPressAddMembers}
          disabled={!isOwner}
        >
          <Image
            source={images.addMember}
            style={EditGroupScreenStyle.plusIcon}
            resizeMode="contain"
          />
          <Text style={EditGroupScreenStyle.privateText}>Add Members</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCoverStream = () => {
    const isLink = imageUri.includes('http');

    return (
      <View style={EditGroupScreenStyle.publicViewContainer}>
        <Text style={EditGroupScreenStyle.privateText}>Upload Cover Photo</Text>
        {imageUri ? (
          <View style={EditGroupScreenStyle.coverImageContainer}>
            <Image
              resizeMode="stretch"
              style={EditGroupScreenStyle.coverImage}
              source={
                isLink
                  ? {
                      uri: imageUri,
                    }
                  : {uri: imageUri}
              }
            />
            {isOwner && (
              <TouchableOpacity
                style={EditGroupScreenStyle.cancelImageBack}
                onPress={() => setImageUri('')}
              >
                <Image
                  resizeMode="contain"
                  style={[EditGroupScreenStyle.coverImage]}
                  source={images.cancel}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={EditGroupScreenStyle.btnContainer}
            onPress={onPressImage}
          >
            <Image
              source={images.plus}
              style={EditGroupScreenStyle.plusIcon}
              resizeMode="contain"
            />
            <Text style={EditGroupScreenStyle.privateText}>Add cover</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderMemberItem = ({item}) => {
    const roleType = item?.membership?.role;
    const role = roleType === 0 ? 'Owner' : roleType === 1 ? 'Admin' : 'Member';

    return (
      <TouchableOpacity
        style={EditGroupScreenStyle.memberContainer}
        onLongPress={() => {
          setAdminModel(
            item?.membership?.role !== 0 && i?.membership?.role !== 3,
          ),
            setModelItem(
              item?.membership?.role !== 0 && i?.membership?.role !== 3 && item,
            );
        }}
      >
        <View style={EditGroupScreenStyle.leftContainer}>
          <UserImage Url={item?.avatarUrl} size={45} />
          <View style={EditGroupScreenStyle.textContainer}>
            <Text style={EditGroupScreenStyle.name}>{item?.displayName}</Text>
          </View>
        </View>
        <View style={EditGroupScreenStyle.leftContainer}>
          {((role === 'Member' && isOwner) ||
            (role === 'Admin' && isCreaterOwner)) && (
            <TouchableOpacity onPress={() => removeGroupMembers(item)}>
              <Image
                source={images.cross}
                resizeMode="contain"
                style={EditGroupScreenStyle.crossImage}
              />
            </TouchableOpacity>
          )}
          {
            <View style={EditGroupScreenStyle.roleContainer}>
              <Text style={EditGroupScreenStyle.roleText}>{role}</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    );
  };

  const renderLeaveButtons = () => {
    return (
      <View
        style={[
          EditGroupScreenStyle.leaveContainer,
          {justifyContent: 'center'},
        ]}
      >
        {isOwner && (
          <ThemeButton
            title="Delete Group"
            onPress={() => setDeleteModal(true)}
            containerStyle={{
              overflow: 'hidden',
              borderRadius: ms(50),

              alignItems: 'center',
              justifyContent: 'center',
            }}
            titleStyle={[EditGroupScreenStyle.thmemeTitle]}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={EditGroupScreenStyle.container}>
      <CreateGroupHeader
        title={'Edit Group'}
        onPressSave={onPressSave}
        onPressCancel={onPressCancel}
        isDisable={!isOwner}
      />
      <View style={EditGroupScreenStyle.viewContainer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={EditGroupScreenStyle.container}>
            <CreateGroupInput
              multiline={false}
              placeholder={'Group Name'}
              value={groupName}
              onChangeText={setGroupName}
              onSubmitEditing={undefined}
              returnKeyType={'next'}
              editable={isOwner}
            />
            <CreateGroupInput
              multiline={false}
              placeholder={'Location (Optional)'}
              value={location}
              onChangeText={setLocation}
              onSubmitEditing={undefined}
              returnKeyType={'next'}
              editable={isOwner}
            />
            <CreateGroupInput
              multiline={true}
              placeholder={'Group Description'}
              value={description}
              onChangeText={setDescription}
              onSubmitEditing={undefined}
              returnKeyType={'done'}
              editable={isOwner}
            />
            {renderPublicView()}
            {renderCoverStream()}
            {renderAddMembers()}
            {renderLeaveButtons()}
          </View>
        </KeyboardAwareScrollView>
      </View>
      <AnnounceMentModal
        modalVisible={isPopUp}
        buttonText={'ok'}
        messageText={ModalsMessages.ModalsMassages.offensiveWord}
        onPressButton={() => setIsPopUp(false)}
      />

      <AnnounceMentModal
        modalVisible={deleteModal}
        onPressSecondButton={leaveGroup}
        onPressButton={() => setDeleteModal(false)}
        messageText={ModalsMessages.ModalsMassages.doYouWantToleaveGroup}
        secondButton
        secondButtonText="Leave Group"
        buttonText="Stay in Group"
      />

      <AnnounceMentModal
        modalVisible={deleteModal}
        containerStyle={{width: '80%'}}
        onPressSecondButton={deleteGroup}
        onPressButton={() => setDeleteModal(false)}
        messageText={ModalsMessages.ModalsMassages.areYouSureWant}
        secondButton
        secondButtonText="Delete Group"
        buttonText="Cancel"
      />
      {isLoading && <OverlayLoader />}
      <MakeAdminModel
        isVisisble={adminModal}
        item={modalItem}
        onClose={() => {
          setAdminModel(false), setModelItem(null);
        }}
        isPermited={isOwner}
        isOwner={isCreaterOwner}
        onPressAdmin={onPressAdmin}
        onPressRemoveAdmin={onPressRemoveFromAdmin}
        onPressRemoveUser={removeGroupMembers}
      />
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
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
    </SafeAreaView>
  );
};
export default EditGroupScreen;
