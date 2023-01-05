import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './GreenTalkStyle';
import ScreenHeader from '../../components/screen-header/ScreenHeader';
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

import IosBottomButtonAvoid from '../../../../components/ios-bottom-helper/IosBottomButtonAvoid';
import GreenTalkNewDetailsItem from './GreenTalkNewDetailsItem';
import colorPalates from '../../../../theme/colors/colorPalates';
import svg from '../../../../theme/images/svg';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import appConstants from '../../../../models/appConstants';

const GreenTalk = () => {
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const feedData = useSelector(
    state => state.feedData[appConstants.APIGreenTalk],
  );
  const [refreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getFeedList();
    const emit = Emmiter.addListener('greentalk', () => {
      getFeedList(false);
    });
    return () => {
      emit.remove();
    };
  }, []);

  const getFeedList = (isPagination = false) => {
    const query = ActivitiesQuery.inTopic(appConstants.APIGreenTalk);
    const pagingQuery = new PagingQuery(query);
    if (isPagination && next) {
      pagingQuery.next = next;
    }
    if ((isPagination && !next) || loading) {
      return;
    }
    setIsRefreshing(!isPagination && !loading);
    setLoading(!isPagination && feedData?.length === 0);

    try {
      Communities.getActivities(pagingQuery).then(
        result => {
          const data = JSON.parse(JSON.stringify(result?.entries));

          setNext(result.next);
          const newData =
            feedData?.length > 0 && isPagination
              ? [...feedData, ...data]
              : data;

          dispatch(
            feedSliceActions.SetFeedDataAction({
              collection_name: appConstants.APIGreenTalk,
              data: newData,
            }),
          );
          setIsRefreshing(false);
          setLoading(false);
        },
        (error: any) => {
          console.log('Failed to get activities, error: ' + error.message);
          setIsRefreshing(false);
          setLoading(false);
        },
      );
    } catch (e) {
      setIsRefreshing(false);
      setLoading(false);
      setError(true);
    }
  };

  const renderItem = ({item, index}) => {
    return <GreenTalkNewDetailsItem index={index} item={item} />;
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
        data={feedData}
        refreshControl={
          <RefreshControl
            colors={[colorPalates.AppTheme.primary]}
            refreshing={refreshing}
            onRefresh={() => getFeedList()}
          />
        }
        extraData={feedData}
        keyboardShouldPersistTaps="always"
        keyExtractor={(_, index) => `greenTalk${index}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={15}
        windowSize={15}
        onEndReached={() => getFeedList(true)}
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
          svgData={svg.greenTalkGreen}
          isBackVisible={false}
          title={'GreenTalk'}
          isGreenTalk={true}
        />
        <View style={styles.containerX}>{renderMasonryList()}</View>
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

export default GreenTalk;
