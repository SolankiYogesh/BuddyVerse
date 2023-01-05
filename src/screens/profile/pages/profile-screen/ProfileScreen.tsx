import screenNameEnum from 'models/screenNameEnum';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Image,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ms, s, vs} from 'react-native-size-matters';
import {useUserState} from 'redux-wrapper/reducers';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import FeedList from 'screens/profile/pages/feed-list/FeedList';
import {colorPalates, images} from 'theme';
import ProfileScreenStyle from './ProfileScreenStyle';
import {
  Communities,
  UserId,
  FollowersQuery,
  UsersQuery,
  PagingQuery,
} from 'getsocial-react-native-sdk';
import _ from 'lodash';
import ThemeButton from '../../../../components/theme-button/ThemeButton';
import colors from '../../../../theme/colors/colors';
import {useDispatch, useSelector} from 'react-redux';
import {getSocialUsersSliceAction} from '../../../../redux-wrapper/reducers/getSocial-users-slice/GetSocialUsersSlice';
import ViewMoreText from 'react-native-view-more-text';
import {useIsFocused} from '@react-navigation/native';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import svg from '../../../../theme/images/svg';
import {SvgXml} from 'react-native-svg';
import ImageView from 'react-native-image-viewing';
import UserImage from '../../../../components/user-profile-image/UserImage';

const ProfileScreen = ({navigation}) => {
  const {userData} = useUserState();
  const [visible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const usersData = useSelector(state => state?.getScoailUsers?.users);
  const userFromRedux = _.find(usersData, i => i?.id === userData?.id);
  const viewMoreRef = useRef();
  const isFocus = useIsFocused();
  const [error, setError] = useState(false);
  const isVip = userData?.publicProperties?.isVip === 'VIP';
  const [onScroll, setOnScroll] =
    useState<NativeSyntheticEvent<NativeScrollEvent>>(undefined);
  let Data = userData?.publicProperties?.aboutData
    ? JSON.parse(userData?.publicProperties?.aboutData)
    : '';

  useEffect(() => {
    dispatch(getSocialUsersSliceAction.addUser(userData));
    setTimeout(() => {
      getFollowers();
      getFollowingUsers();
    }, 500);
  }, [isFocus]);

  useEffect(() => {
    if (!isFocus && viewMoreRef.current) {
      viewMoreRef.current?.onPressLess();
    }
  }, [isFocus]);

  const onPressFOllowers = () => {
    navigation.navigate(screenNameEnum.FollowerFollwingScreen, {
      index: 0,
      item: userData,
      followersCount: userFromRedux?.followers,
      followingCount: userFromRedux?.following,
      isPorfile: true,
    });
  };
  const onPressFOllowings = () => {
    navigation.push(screenNameEnum.FollowerFollwingScreen, {
      index: 1,
      item: userData,
      followersCount: userFromRedux?.followers,
      followingCount: userFromRedux?.following,
      isPorfile: true,
    });
  };

  const getFollowers = () => {
    const followersQuery = FollowersQuery.ofUser(UserId.create(userData?.id));

    try {
      Communities.getFollowersCount(followersQuery).then(result => {
        dispatch(
          getSocialUsersSliceAction.addFollowersTouser({
            id: userData?.id,
            followers: result,
          }),
        );
      });
    } catch (e) {
      setError(true);
    }
  };

  const getFollowingUsers = () => {
    const query = UsersQuery.followedBy(UserId.create(userData?.id));
    let pagingQuery = new PagingQuery(query);
    pagingQuery.limit = 100;
    try {
      Communities.getUsers(pagingQuery).then(result => {
        const users = result.entries;
        dispatch(
          getSocialUsersSliceAction.addFollowingTouser({
            id: userData?.id,
            following: users?.length,
          }),
        );
      });
    } catch (e) {
      setError(true);
    }
  };

  const UserProfile = () => {
    return (
      <View style={ProfileScreenStyle.userProfileContainer}>
        <View>
          <UserImage
            Url={userData?.avatarUrl}
            size={80}
            onPress={() => setIsVisible(true)}
          />

          {isVip ? (
            <View style={ProfileScreenStyle.verifyIcon}>
              <SvgXml xml={svg.ProfileBadge} height={ms(22)} width={ms(22)} />
            </View>
          ) : userData?.publicProperties?.profileComplete === '100' ? (
            <View style={ProfileScreenStyle.verifyIcon}>
              <Image
                source={images.verifyIcon}
                style={ProfileScreenStyle.ProfileBadgeVerify}
                resizeMode="cover"
              />
            </View>
          ) : null}
        </View>
        <View style={ProfileScreenStyle.friedsContainer}>
          <TouchableOpacity
            style={ProfileScreenStyle.userFriendsContainer}
            onPress={onPressFOllowers}
          >
            <Text style={ProfileScreenStyle.countrFriends}>
              {userFromRedux?.followers}
            </Text>
            <Text style={ProfileScreenStyle.textFriends}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ProfileScreenStyle.userFriendsContainer,
              {marginLeft: ms(25)},
            ]}
            onPress={onPressFOllowings}
          >
            <Text style={ProfileScreenStyle.countrFriends}>
              {userFromRedux?.following}
            </Text>
            <Text style={ProfileScreenStyle.textFriends}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // const DetailesView = () => {
  //   return (
  //     <View style={{paddingHorizontal: s(15)}}>
  //       {/* <View style={ProfileScreenStyle.detailsView}>
  //         <Text style={ProfileScreenStyle.titleText}>Gender</Text>
  //         <Text style={ProfileScreenStyle.descText}>
  //           {userData?.privateProperties?.gender
  //             ? userData?.privateProperties?.gender === 'm'
  //               ? 'Male'
  //               : 'Female'
  //             : ''}
  //         </Text>
  //       </View>
  //       <View style={ProfileScreenStyle.detailsView}>
  //         <Text style={ProfileScreenStyle.titleText}>Date of birth</Text>
  //         <Text style={ProfileScreenStyle.descText}>
  //           {userData?.privateProperties?.dob || ''}
  //         </Text>
  //       </View> */}
  //     </View>
  //   );
  // };

  // const ThemeButton = () => {
  //   return (
  //     <View style={ProfileScreenStyle.themeContainer}>
  //       <View style={ProfileScreenStyle.rowThemeView}>
  //         <Switch
  //           value={isDark}
  //           onValueChange={() => {
  //             dispatch(ThemeActions.themeSliceActions.isDark(!isDark));
  //           }}
  //           switchWidthMultiplier={3}
  //           activeText={'Dark'}
  //           inActiveText={'Light'}
  //           switchLeftPx={2.5}
  //           switchRightPx={2.5}
  //           backgroundActive={colorPalates.AppTheme.primary}
  //         />
  //         <Text
  //           style={[
  //             ProfileScreenStyle.chatCommentText,
  //             {marginRight: ms(5), fontFamily: fonts.primarySemiBoldFont},
  //           ]}
  //         >
  //           Mode
  //         </Text>
  //         <Text style={ProfileScreenStyle.chatCommentText}>
  //           {'(Chat & Comments only)'}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  const renderViewMore = onPress => {
    return (
      <Text
        style={{
          color: colorPalates.AppTheme.primary,
          paddingHorizontal: s(16),
          width: '100%',
        }}
        onPress={onPress}
      >
        More
      </Text>
    );
  };

  const renderViewLess = onPress => {
    return (
      <Text
        style={{
          color: colorPalates.AppTheme.primary,
          paddingHorizontal: s(16),
          width: '100%',
        }}
        onPress={onPress}
      >
        Less
      </Text>
    );
  };

  const fullname =
    userData?.publicProperties?.full_name || userData?.displayName;
  return (
    <>
      <SafeAreaView style={ProfileScreenStyle.mainContainer}>
        <ScreenHeader isBackVisible={true} title="My Profile" />
        <View style={ProfileScreenStyle.containerStyle}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={ProfileScreenStyle.containerStyle}
            onScroll={e => setOnScroll(e?.nativeEvent)}
          >
            <View style={ProfileScreenStyle.container}>
              <UserProfile />
              <Text style={ProfileScreenStyle.profileName}>
                {fullname || ''}
              </Text>

              <ViewMoreText
                numberOfLines={2}
                renderViewMore={renderViewMore}
                textStyle={ProfileScreenStyle.userIdText}
                renderViewLess={renderViewLess}
                ref={viewMoreRef}
              >
                {Data?.aboutText || ''}
              </ViewMoreText>

              {Data?.website ? (
                <TouchableOpacity
                  onPress={() => {
                    const url = _.includes(Data?.website, 'http')
                      ? Data?.website
                      : `https://${Data?.website}`;

                    Linking.openURL(url).then(() => {});
                  }}
                >
                  <Text
                    style={[
                      ProfileScreenStyle.userIdText,
                      {
                        marginTop: 0,
                        marginBottom: s(10),
                        color: colors.blueShade02,
                      },
                    ]}
                  >
                    {Data?.website}
                  </Text>
                </TouchableOpacity>
              ) : null}
              <ThemeButton
                title="Edit Profile"
                onPress={() =>
                  navigation.push(screenNameEnum.EditProfileScreen)
                }
                containerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: ms(50),
                  height: vs(33),
                  marginVertical: s(30),
                }}
              />

              {/* <ThemeButton /> */}

              <View style={{flex: 1}}>
                {/* <Text style={ProfileScreenStyle.headText}>My Posts</Text> */}
                <View style={{marginTop: ms(10)}}>
                  <FeedList onScroll={onScroll} />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {!!userData?.avatarUrl && visible && (
          <ImageView
            images={[
              {
                uri: userData?.avatarUrl,
              },
            ]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
            borderRadius={20}
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
      <SafeAreaView style={{backgroundColor: colorPalates.white}} />
    </>
  );
};

export default memo(ProfileScreen);
