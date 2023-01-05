import {FlatList, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import {
  Communities,
  PagingQuery,
  UserId,
  UserIdList,
  FollowQuery,
  UsersQuery,
} from 'getsocial-react-native-sdk';
import colors from '../../../theme/colors/colors';
import fonts from '../../../theme/fonts/fonts';
import colorPalates from '../../../theme/colors/colorPalates';
import LoadingContainer from '../../../components/loading-container/LoadingContainer';
import UnFollowModel from './unfollow-modal/UnFollowModel';
import _ from 'lodash';
import RenderFollowItem from './render-follow-item/RenderFollowItem';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../models/ModalsMessages';
import EndPoints from '../../../Network/EndPoints';
import {Emmiter, showToast} from '../../../utils/helper/helper';

const Following = props => {
  const {userId} = props;
  const [followingData, setFollowingData] = useState([]);
  const [next, setNext] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visisble, setVisisble] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props?.focus) {
      getFollowingList(false, false);
    }
  }, [props?.focus]);

  useEffect(() => {
    getFollowingList();
  }, []);

  useEffect(() => {
    Emmiter.addListener('followingData', () => {
      getFollowingList();
    });
  }, []);

  const getFollowStatus = item => {
    return new Promise(resolve => {
      const userIds = UserIdList.create([item?.userId]);
      const followQuery = FollowQuery.users(userIds);
      try {
        Communities.isFollowing(UserId.currentUser(), followQuery).then(
          result => {
            resolve(result[item?.userId] || false);
          },
        );
      } catch (e) {
        setError(true);
      }
    });
  };

  const getFollowingList = (isPagination = false, load = true) => {
    if (isPagination && !next) {
      return;
    }
    const query = UsersQuery.followedBy(UserId.create(userId));
    let pagingQuery = new PagingQuery(query);
    pagingQuery.next = next;
    // let pagingQuery = PagingQuery();
    // pagingQuery.next = next;
    if (!isPagination && load) {
      setLoading(true);
    }

    try {
      Communities.getUsers(pagingQuery).then(
        async result => {
          setNext(result?.next);
          if (result?.entries?.length !== 0) {
            const followesData = [];
            for (let index = 0; index < result?.entries?.length; index++) {
              const payload = {
                isFolloweYou: await getFollowStatus(result?.entries[index]),
                ...result?.entries[index],
              };
              followesData.push(payload);
            }

            const data = isPagination
              ? [...followingData, ...followesData]
              : followesData;

            setFollowingData(data);
            setIsLoadMore(false);
            setLoading(false);
          } else {
            const data = isPagination ? followingData : [];
            setFollowingData(data);
            setIsLoadMore(false);
            setLoading(false);
          }
        },
        () => {
          setLoading(false);
        },
      );
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const onUnFollow = userID => {
    setVisisble(false);

    if (userID !== EndPoints.systemUser) {
      const userIds = UserIdList.create([userID]);
      const followQuery = FollowQuery.users(userIds);
      try {
        Communities.unfollow(followQuery).then(() => {
          const filterIds = _.filter(followingData, i => i?.userId !== userID);
          setFollowingData(filterIds);
        });
      } catch (e) {
        setError(true);
      }
    } else {
      setVisisble(false);

      showToast("You can't unfollow System ");
    }
  };

  const renderItem = ({item}) => {
    return <RenderFollowItem item={item} userId={userId} isFollowess={false} />;
  };

  const renderBottomLoader = () => {
    if (isLoadMore) {
      return (
        <ActivityIndicator
          size={'small'}
          color={colorPalates.AppTheme.primary}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderView}>
        {loading ? (
          <LoadingContainer />
        ) : (
          <FlatList
            data={followingData}
            extraData={followingData}
            renderItem={renderItem}
            keyExtractor={(t, index) => `following${index}`}
            onEndReached={() => getFollowingList(true)}
            ListFooterComponent={renderBottomLoader}
          />
        )}
        {selectedItem && visisble && (
          <UnFollowModel
            isVisible={visisble}
            item={selectedItem}
            onClose={() => {
              setVisisble(false);
              setSelectedItem(null);
            }}
            onUnFollow={onUnFollow}
          />
        )}
      </View>
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

export default Following;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  itemCOntainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(15),
    marginVertical: s(5),
  },
  followingBtnText: {
    color: colors.blackShade02,
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
  },
  profileImage: {
    width: vs(30),
    height: vs(30),
    borderRadius: ms(300),
  },
  followingBtn: {
    borderColor: colors.grayShadeCC,
    borderWidth: 1,
    borderRadius: ms(10),
    padding: s(5),
  },
  borderView: {
    flex: 1,
    marginTop: s(10),
    borderTopLeftRadius: colorPalates.size.defaultBorderRadius,
    borderTopRightRadius: colorPalates.size.defaultBorderRadius,
    backgroundColor: colorPalates.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingTop: ms(10),
  },
});
