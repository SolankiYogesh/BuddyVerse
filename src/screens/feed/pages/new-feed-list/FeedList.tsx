import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styles} from './FeedStyle';
import ScreenHeader from '../../components/screen-header/ScreenHeader';
import svg from '../../../../theme/images/svg';
import {
  ActivitiesQuery,
  PagingQuery,
  Communities,
} from 'getsocial-react-native-sdk';
import images from '../../../../theme/images/images';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import LoadingContainer from '../../../../components/loading-container/LoadingContainer';
import {Emmiter} from '../../../../utils/helper/helper';
import {useDispatch, useSelector} from 'react-redux';
import {feedSliceActions} from '../../../../redux-wrapper/reducers/feed-slice/feedSlice';
import DetailsItem from './DetailsItem';
import IosBottomButtonAvoid from '../../../../components/ios-bottom-helper/IosBottomButtonAvoid';
import colorPalates from '../../../../theme/colors/colorPalates';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import appConstants from '../../../../models/appConstants';
import {ActivityIndicator} from 'react-native-paper';
import colors from '../../../../theme/colors/colors';

const FeedList = () => {
  const [loading, setLoading] = useState(false);
  const [isPaginate, setPagination] = useState(false);
  const [next, setNext] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const feedData = useSelector(
    state => state.feedData[appConstants.APITheJoint],
  );
  const listref = useRef<FlatList>();

  const [currentItemId, setCurrentItemID] = useState('');
  const [refreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getFeedList();
    const emit = Emmiter.addListener('thejoint', () => {
      getFeedList(false);
      listref.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    });
    return () => {
      emit.remove();
    };
  }, []);

  const getFeedList = (isPagination = false) => {
    const query = ActivitiesQuery.inTopic(appConstants.APITheJoint);
    const pagingQuery = new PagingQuery(query);
    if (isPagination && next) {
      pagingQuery.next = next;
    }
    if ((isPagination && !next) || loading) {
      return;
    }
    setLoading(!isPagination && feedData?.length === 0);
    setIsRefreshing(!isPagination && !loading);
    setPagination(isPagination);
    try {
      Communities.getActivities(pagingQuery)
        .then(async result => {
          const data = JSON.parse(JSON.stringify(result?.entries));

          setNext(result.next);

          const newData =
            feedData?.length > 0 && isPagination
              ? [...feedData, ...data]
              : data;

          dispatch(
            feedSliceActions.SetFeedDataAction({
              collection_name: appConstants.APITheJoint,
              data: newData,
            }),
          );
          setIsRefreshing(false);
          setLoading(false);
          setPagination(false);
        })
        .catch(() => {
          setIsRefreshing(false);

          setLoading(false);
        });
    } catch (e) {
      setIsRefreshing(false);
      setPagination(false);
      setLoading(false);
      setError(true);
    }
  };

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    setCurrentItemID(viewableItems?.[0]?.item?.id);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <DetailsItem
        loading={loading}
        index={index}
        item={item}
        currentId={currentItemId}
      />
    );
  };

  const renderFooterComponent = () => {
    if (isPaginate) {
      return (
        <View style={{width: '100%', marginVertical: 10}}>
          <ActivityIndicator size="large" color={colors.greenShade2A} />
        </View>
      );
    }
    return null;
  };

  const renderMasonryList = () => {
    return loading ? (
      <LoadingContainer />
    ) : feedData.length !== 0 ? (
      <FlatList
        renderItem={renderItem}
        // snapToInterval={Dimensions.get('screen').width}
        // decelerationRate={'fast'}
        // snapToAlignment={'start'}
        // disableIntervalMomentum
        ref={listref}
        data={feedData}
        refreshControl={
          <RefreshControl
            colors={[colorPalates.AppTheme.primary]}
            refreshing={refreshing}
            onRefresh={() => getFeedList()}
          />
        }
        extraData={{}}
        keyboardShouldPersistTaps="always"
        keyExtractor={(i, index) => `feedData${index.toString() + i?.id}`}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        windowSize={50}
        // ref={flatListRef}
        onViewableItemsChanged={_onViewableItemsChanged}
        onEndReached={() => getFeedList(true)}
        scrollEventThrottle={16}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        ListFooterComponent={renderFooterComponent}
      />
    ) : (
      eamptyComponents()
    );
  };

  const eamptyComponents = () => {
    return (
      <View style={styles.emptyFeedContainer}>
        <Text
          style={styles.emptyInstruction}
          onPress={() => navigation.navigate(screenNameEnum.CreateFeedScreen)}
        >
          {'Create The First Post'}
        </Text>
        <Image source={images.emptyFeedImage} style={styles.emptyFeedImage} />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          isCreateScreen={true}
          isImage={false}
          svgData={svg.finalJointGreen}
          isBackVisible={false}
          title={'TheJoint'}
        />

        <View style={styles.containerx}>{renderMasonryList()}</View>
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
        <IosBottomButtonAvoid />
      </SafeAreaView>

      <SafeAreaView style={{backgroundColor: colorPalates.white}} />
    </>
  );
};

export default FeedList;
