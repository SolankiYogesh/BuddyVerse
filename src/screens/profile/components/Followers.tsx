import {ActivityIndicator, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ms, s, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../theme/colors/colorPalates';
import LoadingContainer from '../../../components/loading-container/LoadingContainer';
import {
  Communities,
  FollowersQuery,
  PagingQuery,
  UserId,
  UserIdList,
  FollowQuery,
} from 'getsocial-react-native-sdk';
import RenderFollowItem from './render-follow-item/RenderFollowItem';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../models/ModalsMessages';
import {Emmiter} from '../../../utils/helper/helper';

const Followers = props => {
  const {userId} = props;
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [next, setNext] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props?.focus) {
      getFollowersList(false, false);
    }
  }, [props?.focus]);

  useEffect(() => {
    getFollowersList();
  }, []);

  useEffect(() => {
    Emmiter.addListener('followers', () => {
      getFollowersList();
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
        resolve(false);
      }
    });
  };

  const getFollowersList = (isPagination = false, load = true) => {
    if (isPagination && !next) {
      return;
    }
    const Id = UserId.create(userId);
    const followersQuery = FollowersQuery.ofUser(Id);
    let pagingQuery = new PagingQuery(followersQuery);
    pagingQuery.next = next;
    if (!isPagination && load) {
      setLoading(true);
    }
    try {
      Communities.getFollowers(pagingQuery).then(
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
              ? [...followers, ...followesData]
              : followesData;

            setFollowers(data);
            setLoading(false);
            setIsLoadMore(false);
          } else {
            const data = isPagination ? followers : [];
            setFollowers(data);
            setLoading(false);
            setIsLoadMore(false);
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

  const renderItem = ({item}) => {
    return <RenderFollowItem item={item} userId={userId} isFollowess={true} />;
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
            data={followers}
            extraData={followers}
            renderItem={renderItem}
            keyExtractor={(_, index) => `following${index}`}
            onEndReached={() => getFollowersList(true)}
            ListFooterComponent={renderBottomLoader}
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

export default Followers;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
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
    paddingTop: ms(10),

    elevation: 5,
  },
});
