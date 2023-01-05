/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {feedDataModel} from 'models/create-feed/feedDataModel';
import {
  ActivitiesQuery,
  PagingQuery,
  Communities,
  UserId,
} from 'getsocial-react-native-sdk';
import _ from 'lodash';
import {feedSliceActions} from 'redux-wrapper/reducers';
import {useDispatch, useSelector} from 'react-redux';
import MasonryItem from '../../pages/new-feed-list/MasonryItem';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import appConstants from '../../../../models/appConstants';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import {isCloseToBottom} from '../../../../utils/helper/helper';
import colors from '../../../../theme/colors/colors';
import LoadingContainer from '../../../../components/loading-container/LoadingContainer';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {ms} from 'react-native-size-matters';
import fonts from '../../../../theme/fonts/fonts';
import colorPalates from '../../../../theme/colors/colorPalates';

const FeedListByUserId = props => {
  const [next, setNext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const feedData = useSelector(state => state?.feedData['UsersPost']);
  const onScroll = props?.onScroll;
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [flatlist1, setFlatlist1] = useState([]);
  const [flatlist2, setFlatlist2] = useState([]);
  const [isPaginate, setPagination] = useState(false);
  const [visisbleID1, setVisisbleID1] = useState('');
  const [visisbleID2, setVisisbleID2] = useState('');

  useEffect(() => {
    if (!!props?.id) {
      getData(false);
    }
  }, [props?.id]);

  useEffect(() => {
    if (!!onScroll) {
      if (isCloseToBottom(onScroll)) {
        getData(true);
      }
    }
  }, [onScroll]);

  useEffect(() => {
    let flat1 = [];
    let flat2 = [];
    if (feedData?.length !== 0) {
      for (let index = 0; index < feedData?.length; index++) {
        if (index % 2 !== 0) {
          flat2.push(feedData[index]);
        } else {
          flat1.push(feedData[index]);
        }
      }
      setFlatlist1(flat1);
      setFlatlist2(flat2);
    }
  }, [feedData]);

  const getData = (isPagination = false) => {
    const query = ActivitiesQuery.everywhere().byUser(UserId.create(props?.id));
    const pagingQuery = new PagingQuery(query);

    if (isPagination && next) {
      pagingQuery.next = next;
    }
    if ((isPagination && !next) || isLoading) {
      return;
    }
    setIsLoading(!isPagination);
    setPagination(isPagination);
    try {
      Communities.getActivities(pagingQuery).then(
        result => {
          let data = JSON.parse(JSON.stringify(result?.entries));

          data = _.filter(data, i => {
            return (
              i.author.userId === props?.id &&
              (i?.source.id === appConstants.APITheJoint ||
                i?.source.id === appConstants.memes ||
                i?.source.id === appConstants.moments ||
                i?.source.id === appConstants.APIGreenTalk)
            );
          });

          setNext(result.next);
          const newData =
            feedData?.length > 0 && isPagination
              ? [...feedData, ...data]
              : data;

          dispatch(
            feedSliceActions.SetFeedDataAction({
              collection_name: 'UsersPost',
              data: newData,
            }),
          );
          setWaiting(false);
          setPagination(false);
          setIsLoading(false);
        },
        () => {
          setWaiting(false);

          setPagination(false);
          setIsLoading(false);
        },
      );
    } catch (e) {
      setWaiting(false);

      setPagination(false);
      setIsLoading(false);
      setError(true);
    }
  };

  const renderPostItem = ({item}: {item: feedDataModel}) => {
    return (
      <MasonryItem
        item={item}
        isFromUser={props?.isFromUser}
        visisbleID1={visisbleID1}
        visisbleID2={visisbleID2}
      />
    );
  };

  const flatlist1ViewItems = useCallback(({viewableItems}) => {
    if (viewableItems?.[0]?.item?.mediaAttachments[0]?.videoUrl) {
      setVisisbleID1(viewableItems?.[0]?.item?.id);
    }
  }, []);

  const flatlist2ViewItems = useCallback(({viewableItems}) => {
    if (viewableItems?.[0]?.item?.mediaAttachments[0]?.videoUrl) {
      setVisisbleID2(viewableItems?.[0]?.item?.id);
    }
  }, []);

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

  return (
    <>
      {isLoading || waiting ? (
        <LoadingContainer />
      ) : feedData?.length !== 0 ? (
        <ScrollView
          style={{flex: 1}}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <FlatList
              renderItem={renderPostItem}
              keyExtractor={(_, index) => {
                return `FlatList1${index}`;
              }}
              scrollEnabled={false}
              data={flatlist1}
              style={{
                flex: 1,
              }}
              onViewableItemsChanged={flatlist1ViewItems}
              maxToRenderPerBatch={5}
              windowSize={1}
              scrollEventThrottle={16}
              viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
            />
            <FlatList
              renderItem={renderPostItem}
              keyExtractor={(_, index) => {
                return `FlatList2${index}`;
              }}
              scrollEnabled={false}
              style={{
                flex: 1,
              }}
              onViewableItemsChanged={flatlist2ViewItems}
              maxToRenderPerBatch={5}
              windowSize={1}
              data={flatlist2}
              scrollEventThrottle={16}
              viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
            />
          </View>
          {renderFooterComponent()}
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{marginTop: ms(70)}}>
            <SvgXml xml={svg.noPostsGreen} height={ms(65)} width={ms(65)} />
          </View>
          <Text
            style={{
              fontFamily: fonts.primarySemiBoldFont,
              fontSize: ms(24),
              color: colorPalates.AppTheme.primary,
              marginTop: ms(70),
            }}
          >
            {'No  Posts'}
          </Text>
        </View>
      )}

      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </>
  );
};

export default memo(FeedListByUserId);
