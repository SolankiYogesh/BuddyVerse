import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {colorPalates, images} from 'theme';
import ChatHeaderStyle from './ChatHeaderStyle';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import ReportPostModal from '../../../feed/pages/feed-detail/components/report-post-modal/ReportPostModal';
import {showToast} from '../../../../utils/helper/helper';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import {Menu} from 'react-native-paper';
import {
  Communities,
  UserIdList,
  RemoveGroupMembersQuery,
} from 'getsocial-react-native-sdk';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';

const ChatHeader = (props: any) => {
  const [isVisisble, setIsvisisble] = useState(false);
  const item = props?.route?.params?.item || props?.item;
  const navigation = useNavigation();
  const [blockPopUpmodal, setBlockPopUpModel] = useState(false);
  const [reportPopUpmodal, setReportPopUpModel] = useState(false);
  const [menuVisisble, setMenuVisisble] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);
  const [error, setError] = useState(false);

  const {userData} = useUserState();
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressHeader = () => {
    if (!!props?.isGroup) {
      return;
    }
    navigation.push(screenNameEnum.UserProfileScreen, {
      userId: item?.otherMember?.userId || item?.userId || item?.id,
    });
  };

  const onBanOrReport = index => {
    setBlockPopUpModel(false);
    setReportPopUpModel(false);
    if (index === 0) {
      blockUser();
    } else {
      showToast("You've reported this post");
    }
  };

  const blockUser = () => {
    Communities.blockUsers(
      UserIdList.create([
        item?.otherMember?.userId || item?.userId || item?.id,
      ]),
    ).then(() => {
      showToast("You've blocked this user.");
    });
  };

  const onPressMenu = () => {
    setIsvisisble(true);
  };

  const leaveGroup = () => {
    const groupID = item?.id;
    const userIdList = UserIdList.create([userData?.id]);
    const query = new RemoveGroupMembersQuery(userIdList, groupID);

    try {
      Communities.removeGroupMembers(query)
        .then(() => {
          showToast(`You've left ${item?.title}`);
          navigation.goBack();
        })
        .catch(() => {
          showToast(`Sorry Something went wrong`);
        });
    } catch (e) {
      setError(true);
    }
  };

  return (
    <View style={ChatHeaderStyle.mainContainer}>
      <TouchableOpacity
        style={ChatHeaderStyle.profileContainer}
        onPress={onPressHeader}
      >
        <TouchableOpacity
          onPress={onPressBack}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
        >
          <IconAntDesign
            size={24}
            name={'arrowleft'}
            color={colorPalates.blackShade02}
          />
        </TouchableOpacity>
        <UserImage
          Url={item?.avatarUrl}
          style={ChatHeaderStyle.profileImageView}
          size={48}
        />

        <View style={ChatHeaderStyle.textViewContainer}>
          <Text style={ChatHeaderStyle.nameText} numberOfLines={1}>
            {item?.displayName || item?.title}
          </Text>
        </View>
      </TouchableOpacity>

      {
        <Menu
          visible={menuVisisble}
          onDismiss={() => setMenuVisisble(false)}
          anchor={
            <TouchableOpacity
              onPress={() => {
                props?.isGroup ? setMenuVisisble(true) : onPressMenu();
              }}
              hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
            >
              <Image
                source={images.dotMenu}
                resizeMode="contain"
                style={ChatHeaderStyle.imgView}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              setLeaveModal(true);
            }}
            title="Leave Group"
            style={{zIndex: 10000}}
            contentStyle={{zIndex: 10000}}
          />
        </Menu>
      }
      {isVisisble && (
        <ReportPostModal
          isShowReportModal={isVisisble}
          onPressBlockUser={() => {
            setIsvisisble(false);
            setTimeout(() => {
              setBlockPopUpModel(true);
            }, 300);
          }}
          onPressCancel={() => {
            setIsvisisble(false);
          }}
          onPressReportFeed={() => {
            setIsvisisble(false);
            setTimeout(() => {
              setReportPopUpModel(true);
            }, 300);
          }}
          reportFeed={item}
          title={'Report User'}
        />
      )}
      {(reportPopUpmodal || blockPopUpmodal) && (
        <AnnounceMentModal
          secondButton
          modalVisible={reportPopUpmodal || blockPopUpmodal}
          onPressButton={() => {
            reportPopUpmodal ? onBanOrReport(0) : onBanOrReport(1);
          }}
          onPressSecondButton={() => {
            setBlockPopUpModel(false);
            setReportPopUpModel(false);
          }}
          buttonText={'YES'}
          secondButtonText={'NO'}
          messageText={
            reportPopUpmodal
              ? ModalsMessages.ModalsMassages.areYouSureWantToReport
              : ModalsMessages.ModalsMassages.areYouSureWantToBlock
          }
          title={
            reportPopUpmodal
              ? ModalsMessages.ModalsTitles.Report
              : ModalsMessages.ModalsTitles.Block
          }
        />
      )}

      <AnnounceMentModal
        modalVisible={leaveModal}
        messageText={ModalsMessages.ModalsMassages.doYouWantToleaveGroup}
        buttonText="YES"
        secondButton
        secondButtonText="NO"
        onPressButton={leaveGroup}
        onPressSecondButton={() => setLeaveModal(false)}
      />
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </View>
  );
};

export default ChatHeader;
