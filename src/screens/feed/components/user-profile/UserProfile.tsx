import React from 'react';
import ThemeButton from 'components/theme-button/ThemeButton';
import {TouchableOpacity, Text, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import {colorPalates} from 'theme';
import SimpleProfileButton from './simple-button/SimpleProfileButton';
import UserProfileStyle from './UserProfileStyle';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import {Auth} from 'aws-amplify';
import {GetSocial} from 'getsocial-react-native-sdk';
import {inviteFriends} from 'utils/helper/helper';
import {useUserState} from 'redux-wrapper/reducers';
import {useDispatch} from 'react-redux';
import {themeSliceActions} from '../../../../redux-wrapper/reducers/theme-slice/themeSlice';
import {getSocialUsersSliceAction} from '../../../../redux-wrapper/reducers/getSocial-users-slice/GetSocialUsersSlice';
import {userAction} from '../../../../redux-wrapper/reducers/user-slice/userSlice';
import UserImage from '../../../../components/user-profile-image/UserImage';

const UserProfile = ({UserProfiles}) => {
  const navigation = useNavigation();
  const {userData} = useUserState();
  const dispatch = useDispatch();

  const ButtonContainer = () => {
    const goToChangePassword = () => {
      UserProfiles.current.close();
      setTimeout(() => {
        navigation.navigate(screenNameEnum.ChangePassword);
      }, 400);
    };
    const goToSetting = () => {
      UserProfiles.current.close();
      setTimeout(() => {
        navigation.navigate(screenNameEnum.NotificationScreen);
      }, 400);
    };
    const inviteFriend = () => {
      // UserProfiles.current.close();

      // inviteFriends('https://greenlnyc.gsc.im/1/greenlync', messageText);
      inviteFriends();
    };
    const goToAboutScreen = () => {
      UserProfiles.current.close();
      navigation.navigate(screenNameEnum.AboutStack);
      console.log('goToAboutScreen');
    };

    const gotoBloackUsers = () => {
      UserProfiles.current.close();
      navigation.navigate(screenNameEnum.BlockUsersScreen);
    };

    return (
      <View style={{backgroundColor: colorPalates.white}}>
        {/* <SimpleProfileButton title="Favorites" frontIcon="grade" /> */}
        {/* <SimpleProfileButton title="Track Order" frontIcon="local-shipping" /> */}
        <SimpleProfileButton
          title="Notifications"
          frontIcon="notifications"
          onPressButton={goToSetting}
        />
        {/* <SimpleProfileButton title="Blocked Users" frontIcon="person-remove" onPressButton={() => UserProfiles.current.close()}/> */}
        <SimpleProfileButton
          title="Change Password"
          frontIcon="lock"
          onPressButton={goToChangePassword}
        />
        <SimpleProfileButton
          title="Share with friends"
          frontIcon="group"
          onPressButton={inviteFriend}
        />
        <SimpleProfileButton
          title="Blocked Users"
          frontIcon="block"
          onPressButton={gotoBloackUsers}
        />
        <SimpleProfileButton
          title="About"
          frontIcon="support-agent"
          onPressButton={goToAboutScreen}
        />
      </View>
    );
  };
  const UserProfileHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: ms(36),
        }}
      >
        <UserImage
          Url={userData?.avatarUrl}
          style={UserProfileStyle.profileImage}
          size={64}
        />
        <View style={{marginTop: ms(24), marginLeft: ms(24)}}>
          <Text style={{fontSize: ms(16), color: colorPalates.AppTheme.text}}>
            {userData?.publicProperties['full_name'] || ' '}
          </Text>
          <Text style={{fontSize: ms(12), color: colorPalates.AppTheme.text}}>
            @{userData?.displayName || 'user_name'}
          </Text>
          {/* <Text style={{ fontSize: ms(12), marginTop: 5 }}>Consumer</Text> */}
        </View>
      </View>
    );
  };
  const LogoutContainer = () => {
    return (
      <View
        style={{
          marginTop: ms(8),
          flexDirection: 'row',
          backgroundColor: colorPalates.white,
        }}
      >
        <TouchableOpacity
          style={UserProfileStyle.logoutButton}
          onPress={async () => {
            dispatch(themeSliceActions.isDark(false));
            UserProfiles.current.close();
            setTimeout(async () => {
              dispatch(getSocialUsersSliceAction.clearAllUsers(null));
              dispatch(userAction.clearUser());
              await Auth.signOut();
              await GetSocial.resetUser();
            }, 1000);
          }}
        >
          <IconMaterialIcons
            size={24}
            name="logout"
            color={colorPalates.redShadeDF}
          />
          <Text style={UserProfileStyle.logoutButtonTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressViewPage = () => {
    UserProfiles.current.close();
    navigation.navigate(screenNameEnum.ProfileScreen);
  };

  return (
    <View style={{flex: 1, backgroundColor: colorPalates.grayShadeE9}}>
      <UserProfileHeader />
      <ThemeButton
        title="View My Profile"
        containerStyle={UserProfileStyle.viewMyPage}
        onPress={onPressViewPage}
      />
      <View style={{marginTop: ms(16), marginBottom: ms(8)}}>
        <ButtonContainer />
        <LogoutContainer />
      </View>
    </View>
  );
};
export default UserProfile;
