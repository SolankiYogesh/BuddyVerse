import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import UserProfileScreenStyle from './UserProfileScreenStyle';
import ScreenHeader from '../screen-header/ScreenHeader';
import LinearGradient from 'react-native-linear-gradient';
import OverlayLoader from 'components/overlay-loader/OverlayLoader';

import {
  Communities,
  UserId,
  FollowersQuery,
  UsersQuery,
  PagingQuery,
  FollowQuery,
  UserIdList,
  NotificationContent,
  SendNotificationTarget,
  Notifications,
  Action,
} from 'getsocial-react-native-sdk';
import {useUserState} from 'redux-wrapper/reducers';
import screenNameEnum from 'models/screenNameEnum';
import FollowerModal from '../follower-Modal/FollowerModal';
import FeedListByUserId from '../feed-list-by-id/FeedListByUserId';
import UnFollowModel from '../../../profile/components/unfollow-modal/UnFollowModel';
import ReportPostModal from '../../pages/feed-detail/components/report-post-modal/ReportPostModal';
import {showToast} from '../../../../utils/helper/helper';
import {
  MyPassions,
  CANNABIS,
  IMData,
} from '../../../../utils/helper/ConstantArray';
import colorPalates from '../../../../theme/colors/colorPalates';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {ms, s, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import {getSocialUsersSliceAction} from '../../../../redux-wrapper/reducers/getSocial-users-slice/GetSocialUsersSlice';
import ViewMoreText from 'react-native-view-more-text';
import {useIsFocused} from '@react-navigation/native';
import ModalsMessages from '../../../../models/ModalsMessages';
import EndPoints from '../../../../Network/EndPoints';
import fonts from '../../../../theme/fonts/fonts';
import ImageView from 'react-native-image-viewing';
import LoadingContainer from '../../../../components/loading-container/LoadingContainer';
import Jointimage from './Image-item/Jointimage';
import UserImage from '../../../../components/user-profile-image/UserImage';

const UserProfileScreen = props => {
  const [user, setUser] = useState(null);
  const userId = props?.route?.params?.userId;
  const [loading, setLoading] = useState(false);
  const {userData} = useUserState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [unfolloweModel, setUnFollowModel] = useState(false);
  const [isVisisble, setIsvisisble] = useState(false);
  const dispatch = useDispatch();
  const [high5Modal, setHigh5Modal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [blockPopUpmodal, setBlockPopUpModel] = useState(false);
  const [reportPopUpmodal, setReportPopUpModel] = useState(false);
  const usersData = useSelector(state => state?.getScoailUsers?.users);
  const userFromRedux = _.find(usersData, i => i?.userId === userId);
  const viewMoreRef = useRef();
  const isFocus = useIsFocused();
  const [userProfileLike, setUserProfileLiked] = useState(false);
  const [userProfileLikesCount, setUserProfileCount] = useState(0);
  const isVipUser = user?.publicProperties?.isVip === 'VIP';
  const [isLoading, setIsLoading] = useState(false);
  const [onScroll, setOnScroll] =
    useState<NativeSyntheticEvent<NativeScrollEvent>>(undefined);
  const [cannabisData, setCannabisData] = useState([]);
  const [imData, setImData] = useState([]);
  const [Passions, setPassions] = useState([]);
  let Data = user?.publicProperties?.aboutData
    ? JSON.parse(user?.publicProperties?.aboutData)
    : '';
  let labelData = user?.publicProperties?.labelsData
    ? JSON.parse(user?.publicProperties?.labelsData)
    : '';

  useEffect(() => {
    if (!isFocus && viewMoreRef.current) {
      viewMoreRef.current?.onPressLess();
    }
  }, [isFocus]);

  useMemo(() => {
    if (userId === userData?.id) {
      props.navigation.replace(screenNameEnum.ProfileScreen);
    }
  }, []);

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (!!user) {
      getFollowers();
      getFollowingUsers();
    }
    if (!!user) {
      isFollowingCurrentUser();
    }

    const cd = labelData?.canabisData ? JSON.parse(labelData?.canabisData) : [];
    const id = labelData?.iamData ? JSON.parse(labelData?.iamData) : [];
    const pd = labelData?.myPassionsData
      ? JSON.parse(labelData?.myPassionsData)
      : [];

    const cdfilterLength = _.filter(
      cd,
      i => !isNaN(Number(i)) && typeof i !== 'object',
    )?.length;
    const idfilterLength = _.filter(
      id,
      i => !isNaN(Number(i)) && typeof i !== 'object',
    )?.length;
    const pdfilterLength = _.filter(
      pd,
      i => !isNaN(Number(i)) && typeof i !== 'object',
    )?.length;

    if (cdfilterLength + idfilterLength + pdfilterLength === 0) {
      setCannabisData(cd);
      setPassions(pd);
      setImData(id);
    } else {
      const myPassionData = _.map(MyPassions, i => {
        return !!_.find(pd, it => i?.id === it) ? i : null;
      }).filter(i => !!i);
      const canabiesData = _.map(CANNABIS, i => {
        return !!_.find(cd, it => i?.id === it) ? i : null;
      }).filter(i => !!i);
      const imtData = _.map(IMData, i => {
        return !!_.find(id, it => i?.id === it) ? i : null;
      }).filter(i => !!i);
      setCannabisData(canabiesData);
      setPassions(myPassionData);
      setImData(imtData);
    }
  }, [user]);

  useEffect(() => {
    if (!!user) {
      getActivityById(user?.publicProperties?.reactionID);
    }
  }, [user]);

  const getActivityById = id => {
    if (id) {
      Communities.getActivity(id).then(resp => {
        setUserProfileLiked(_.includes(resp?.myReactions, 'like'));
        setUserProfileCount(resp?.reactionsCount?.like || 0);
      });
    }
  };

  const onPressFOllowers = () => {
    props?.navigation.push(screenNameEnum.FollowerFollwingScreen, {
      index: 0,
      item: userFromRedux,
    });
  };
  const onPressFOllowings = () => {
    props?.navigation.push(screenNameEnum.FollowerFollwingScreen, {
      index: 1,
      item: userFromRedux,
    });
  };

  const onFollow = () => {
    const userIds = UserIdList.create([userId]);
    const followQuery = FollowQuery.users(userIds);
    setLoading(true);
    try {
      Communities.follow(followQuery)
        .then(() => {
          setLoading(false);
          getFollowers();
          isFollowingCurrentUser();
          sendFollowNotification();
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (e) {
      console.log(e);

      setError(true);
    }
  };

  const sendFollowNotification = async () => {
    const notificationContent = new NotificationContent();
    notificationContent.templateName = 'follow';
    const action = Action.create('follow', {followerId: userData.id});
    notificationContent.action = action;
    const target = SendNotificationTarget.usersWithIds(
      UserIdList.create([userId]),
    );
    await Notifications.send(notificationContent, target);
  };

  const onUnfollow = () => {
    if (userId !== EndPoints.systemUser) {
      setUnFollowModel(false);
      const userIds = UserIdList.create([userId]);
      const followQuery = FollowQuery.users(userIds);
      setLoading(true);

      try {
        Communities.unfollow(followQuery)
          .then(() => {
            setLoading(false);
            getFollowers();
            isFollowingCurrentUser();
          })
          .catch(() => {
            setLoading(false);
          });
      } catch (e) {
        console.log(e);

        setError(true);
      }
    } else {
      setUnFollowModel(false);

      showToast("You can't unfollow System ");
    }
  };

  const getUserDetails = () => {
    setLoading(true);
    try {
      Communities.getUser(UserId.create(userId))
        .then(resp => {
          setLoading(false);
          setUser(resp);
          dispatch(getSocialUsersSliceAction.addUser(resp));
        })
        .catch(e => {
          console.log(e);

          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);

      setError(true);
    }
  };

  const isFollowingCurrentUser = () => {
    const userIds = UserIdList.create([userId]);
    const followQuery = FollowQuery.users(userIds);

    try {
      Communities.isFollowing(UserId.create(userData?.id), followQuery).then(
        resp => {
          if (!!user) {
            dispatch(
              getSocialUsersSliceAction.setIsFollowing({
                id: userId,
                isFollowing: resp?.[userId],
              }),
            );
          }
        },
      );
    } catch (e) {
      console.log(e);

      setError(true);
    }
  };

  const blockUser = () => {
    setReportPopUpModel(false);
    setReportPopUpModel(false);

    Communities.blockUsers(UserIdList.create([userId])).then(() => {
      showToast("You've blocked this user.");
    });
  };

  const getFollowers = () => {
    const followersQuery = FollowersQuery.ofUser(UserId.create(userId));

    try {
      Communities.getFollowersCount(followersQuery).then(result => {
        if (!!userId) {
          dispatch(
            getSocialUsersSliceAction.addFollowersTouser({
              id: userId,
              followers: result,
            }),
          );
        }
      });
    } catch (e) {
      console.log(e);

      setError(true);
    }
  };

  const getFollowingUsers = () => {
    const query = UsersQuery.followedBy(UserId.create(userId));
    let pagingQuery = new PagingQuery(query);
    pagingQuery.limit = 100;
    try {
      Communities.getUsers(pagingQuery).then(result => {
        const users = result.entries;
        if (!!userId) {
          dispatch(
            getSocialUsersSliceAction.addFollowingTouser({
              id: userId,
              following: users?.length,
            }),
          );
        }
      });
    } catch (e) {
      console.log(e);

      setError(true);
    }
  };

  const sendLikeNotification = async () => {
    const notificationContent = new NotificationContent();

    const action = Action.create('likeProfile', {profile: userData?.id});
    notificationContent.templateName = 'ProFile_Like';
    notificationContent.templatePlaceholders['SOMEONE'] =
      userData?.publicProperties?.full_name || userData?.displayName;
    notificationContent.action = action;

    const target = SendNotificationTarget.usersWithIds(
      UserIdList.create([userId]),
    );
    await Notifications.send(notificationContent, target);
  };

  const updateUserDataLike = async () => {
    try {
      await Communities.setReaction(
        'like',
        userFromRedux?.publicProperties?.reactionID,
      );
    } catch (e) {
      console.log(e);
    }
    setUserProfileCount(count => (userProfileLike ? count : count + 1));
    setUserProfileLiked(true);

    setHigh5Modal(true);
    sendLikeNotification();
  };

  const onPressChat = () => {
    props.navigation.navigate(screenNameEnum.AllChatsScreen, {
      item: user,
    });
  };

  const onPressBlock = () => {
    setBlockPopUpModel(false);
    setReportPopUpModel(false);
    showToast("You've reported this post");
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const UserProfileCenter = () => {
    return (
      <View style={UserProfileScreenStyle.profile}>
        <View>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <UserImage
              Url={user?.avatarUrl}
              size={80}
              style={UserProfileScreenStyle.profileImage}
            />
          </TouchableOpacity>
          {isVipUser && (
            <View style={UserProfileScreenStyle.vipIcon}>
              <SvgXml xml={svg.ProfileBadge} height={ms(22)} width={ms(22)} />
            </View>
          )}
        </View>
        <View style={UserProfileScreenStyle.friedsContainer}>
          <TouchableOpacity
            style={UserProfileScreenStyle.userFriendsContainer}
            onPress={updateUserDataLike}
          >
            {userProfileLike ? (
              <Jointimage />
            ) : (
              // <SvgXml xml={svg.highFiveGreen} height={ms(35)} width={ms(35)} />
              <SvgXml xml={svg.highFive} height={ms(20)} width={ms(20)} />
            )}
            <Text style={UserProfileScreenStyle.countrFriends}>
              {userProfileLikesCount || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={UserProfileScreenStyle.userFriendsContainer}
            onPress={onPressFOllowers}
          >
            <Text style={UserProfileScreenStyle.textFriends}>Followers</Text>
            <Text style={UserProfileScreenStyle.countrFriends}>
              {userFromRedux?.followers || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={UserProfileScreenStyle.userFriendsContainer}
            onPress={onPressFOllowings}
          >
            <Text style={UserProfileScreenStyle.textFriends}>Following</Text>
            <Text style={UserProfileScreenStyle.countrFriends}>
              {userFromRedux?.following || 0}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFollowButtons = () => {
    return (
      <View style={UserProfileScreenStyle.followerContainer}>
        <TouchableOpacity
          style={UserProfileScreenStyle.btnView}
          onPress={onPressChat}
        >
          <LinearGradient
            start={{x: 0.0, y: 0.5}}
            end={{x: 0.5, y: 0.0}}
            locations={[0, 0.8]}
            colors={[colorPalates.greenShade60, colorPalates.AppTheme.primary]}
            style={UserProfileScreenStyle.gradientContainer}
          >
            <SvgXml xml={svg.chatMenuIcon} height={vs(15)} width={vs(15)} />
            <Text style={UserProfileScreenStyle.followBtnText}>Chat</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={UserProfileScreenStyle.btnView}
          onPress={() => {
            userFromRedux?.isFollowing ? setUnFollowModel(true) : onFollow();
          }}
        >
          <LinearGradient
            start={{x: 0.0, y: 0.5}}
            end={{x: 0.5, y: 0.0}}
            locations={[0, 0.8]}
            colors={[colorPalates.greenShade60, colorPalates.AppTheme.primary]}
            style={UserProfileScreenStyle.gradientContainer}
          >
            <SvgXml xml={svg.followIcon} height={vs(15)} width={vs(15)} />

            <Text style={UserProfileScreenStyle.followBtnText}>
              {userFromRedux?.isFollowing ? 'Following' : 'Follow'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

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

  const name =
    user?.publicProperties?.full_name === '1'
      ? user?.publicProperties?.full_name
      : user?.displayName;

  const renderImData = () => {
    return (
      <>
        <View style={{marginTop: ms(5), alignItems: 'center'}}>
          <Text
            style={{
              color: colorPalates.AppTheme.text,
              fontSize: ms(15),
              fontFamily: fonts.primarySemiBoldFont,
            }}
          >
            I'm a
          </Text>
        </View>

        <View
          style={{
            marginTop: ms(2),
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {_.map(imData, i => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  borderColor: colorPalates.AppTheme.primary,
                  borderWidth: 1,
                  borderRadius: ms(50),
                  padding: ms(3),
                  paddingHorizontal: ms(10),
                  margin: ms(3),
                }}
              >
                <SvgXml
                  xml={i?.svg ? svg[i?.svg] : i?.green}
                  height={ms(18)}
                  width={ms(18)}
                />
                <Text
                  style={{
                    color: colorPalates.AppTheme.primary,
                    marginLeft: ms(5),
                    fontSize: ms(12),
                  }}
                >
                  {i?.name}
                </Text>
              </View>
            );
          })}
        </View>
      </>
    );
  };

  const renderPassions = () => {
    return (
      <>
        <View style={{marginTop: ms(5), alignItems: 'center'}}>
          <Text
            style={{
              color: colorPalates.AppTheme.text,
              fontSize: ms(15),
              fontFamily: fonts.primarySemiBoldFont,
            }}
          >
            I'm interested in
          </Text>
        </View>

        <View
          style={{
            marginTop: ms(2),
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {_.map(Passions, i => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  borderColor: colorPalates.AppTheme.primary,
                  borderWidth: 1,
                  borderRadius: ms(50),
                  padding: ms(3),
                  paddingHorizontal: ms(10),
                  margin: ms(3),
                }}
              >
                <SvgXml
                  xml={i?.svg ? svg[i?.svg] : i?.green}
                  height={ms(18)}
                  width={ms(18)}
                />
                <Text
                  style={{
                    color: colorPalates.AppTheme.primary,
                    marginLeft: ms(5),
                    fontSize: ms(12),
                  }}
                >
                  {i?.name}
                </Text>
              </View>
            );
          })}
        </View>
      </>
    );
  };

  const renderCannabies = () => {
    return (
      <>
        <View style={{marginTop: ms(5), alignItems: 'center'}}>
          <Text
            style={{
              color: colorPalates.AppTheme.text,
              fontSize: ms(15),
              fontFamily: fonts.primarySemiBoldFont,
            }}
          >
            I Like
          </Text>
        </View>

        <View
          style={{
            marginTop: ms(2),
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {_.map(cannabisData, i => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  borderColor: colorPalates.AppTheme.primary,
                  borderWidth: 1,
                  borderRadius: ms(50),
                  padding: ms(3),
                  paddingHorizontal: ms(10),
                  margin: ms(3),
                }}
              >
                <SvgXml
                  xml={i?.svg ? svg[i?.svg] : i?.green}
                  height={ms(18)}
                  width={ms(18)}
                />
                <Text
                  style={{
                    color: colorPalates.AppTheme.primary,
                    marginLeft: ms(5),
                    fontSize: ms(12),
                  }}
                >
                  {i?.name}
                </Text>
              </View>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={UserProfileScreenStyle.container}>
        <ScreenHeader
          isMenu
          onPressMenu={() => setIsvisisble(true)}
          title={user?.displayName}
          isBackVisible={true}
        />

        {isLoading ? (
          <LoadingContainer />
        ) : (
          <View style={UserProfileScreenStyle.containerStyle}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={UserProfileScreenStyle.containerStyle}
              onScroll={e => setOnScroll(e?.nativeEvent)}
            >
              <View style={{flex: 1}}>
                <UserProfileCenter />
                <Text style={UserProfileScreenStyle.profileUserName}>
                  {name}
                </Text>
                <ViewMoreText
                  numberOfLines={2}
                  renderViewMore={renderViewMore}
                  textStyle={UserProfileScreenStyle.userIdText}
                  renderViewLess={renderViewLess}
                  ref={viewMoreRef}
                >
                  {Data?.aboutText || ''}
                </ViewMoreText>

                {Data?.website ? (
                  <Text
                    style={[
                      UserProfileScreenStyle.userIdText,
                      {
                        marginTop: 0,
                        marginBottom: s(10),
                        color: colors.blueShade02,
                      },
                    ]}
                    onPress={() => {
                      const url = _.includes(Data?.website, 'http')
                        ? Data?.website
                        : `https://${Data?.website}`;

                      Linking.openURL(url).then(() => {});
                    }}
                  >
                    {Data?.website}
                  </Text>
                ) : null}
                {imData?.length !== 0 && renderImData()}
                {Passions?.length !== 0 && renderPassions()}
                {cannabisData?.length !== 0 && renderCannabies()}
                {/* <UserDetails /> */}

                {renderFollowButtons()}
                {/* <Text style={UserProfileScreenStyle.postText}>Posts</Text> */}
                <View style={{marginTop: ms(10)}}>
                  {!!userId && (
                    <FeedListByUserId
                      id={userId}
                      isFromUser
                      onScroll={onScroll}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
        {loading && <OverlayLoader />}
        <FollowerModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          isFollower={userFromRedux?.isFollowing}
          onBlockUser={() => {
            setIsModalVisible(false);
            onPressBlock();
          }}
          onReportUser={() => {
            setIsModalVisible(false);
            onPressBlock();
          }}
          onUnFollowerUser={() => {
            setIsModalVisible(false);
            onUnfollow();
          }}
        />
        <UnFollowModel
          isVisible={unfolloweModel}
          item={user}
          onClose={() => {
            setUnFollowModel(false);
          }}
          onUnFollow={onUnfollow}
        />
        {isVisisble && (
          <ReportPostModal
            isShowReportModal={isVisisble}
            onPressBlockUser={() => {
              setIsvisisble(false);
              setTimeout(() => {
                setReportPopUpModel(true);
              }, 300);
            }}
            onPressReportFeed={() => {
              setIsvisisble(false);

              setTimeout(() => {
                setBlockPopUpModel(true);
              }, 300);
            }}
            onPressCancel={() => setIsvisisble(false)}
            reportFeed={user}
            title={'Report User'}
          />
        )}

        {!!user?.avatarUrl && visible && (
          <ImageView
            images={[
              {
                uri: user?.avatarUrl,
              },
            ]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setVisible(false)}
            borderRadius={20}
          />
        )}
        <AnnounceMentModal
          modalVisible={high5Modal}
          buttonText="OK"
          isOtherLogo
          messageText={ModalsMessages.ModalsMassages.youPassedJoint}
          onPressButton={() => setHigh5Modal(false)}
          messegeTextStyle={UserProfileScreenStyle.MessgeStyle}
        />
        {(reportPopUpmodal || blockPopUpmodal) && (
          <AnnounceMentModal
            secondButton
            modalVisible={reportPopUpmodal || blockPopUpmodal}
            onPressButton={() => {
              !reportPopUpmodal ? onPressBlock() : blockUser();
            }}
            onPressSecondButton={() => {
              setBlockPopUpModel(false);
              setReportPopUpModel(false);
            }}
            buttonText={'YES'}
            secondButtonText={'NO'}
            messageText={
              !reportPopUpmodal
                ? ModalsMessages.ModalsMassages.areYouSureWantToReport
                : ModalsMessages.ModalsMassages.areYouSureWantToBlock
            }
            title={
              !reportPopUpmodal
                ? ModalsMessages.ModalsTitles.Report
                : ModalsMessages.ModalsTitles.Block
            }
          />
        )}
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.white}} />
    </>
  );
};

export default React.memo(UserProfileScreen);
