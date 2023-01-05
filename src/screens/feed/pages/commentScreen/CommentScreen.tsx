import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import CommentBox from '../../components/comment-box/CommentBox';
import CommentInput from 'screens/feed/components/comment-input/CommentInput';
import {useRoute} from '@react-navigation/core';
import IosBottomButtonAvoid from '../../../../components/ios-bottom-helper/IosBottomButtonAvoid';
import ScreenHeader from '../../components/screen-header/ScreenHeader';
import validations from '../../../../utils/validation/validation';
import alerts from '../../../../utils/alerts/alerts';
import {
  locationModeration,
  locationSpaceWordModeration,
  ManualModerationTool,
  onMentions,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import {useNetInfo} from '@react-native-community/netinfo';
import {useFeedService} from 'services/feed-service/useFeedService';
import {feedSliceActions, useUserState} from 'redux-wrapper/reducers';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import {s, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import {useTheme} from '@react-navigation/native';
import ModalsMessages from '../../../../models/ModalsMessages';

const CommentScreen = props => {
  const route = useRoute();
  const {colors} = useTheme();
  const feedData = props?.route?.params?.feedId;
  const {type, feed} = route.params;
  const [isPopUp, setIsPopUp] = useState(false);
  const commentRef = useRef();
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const [commentUsers, setCommentUsers] = useState([]);
  const {userData} = useUserState();
  const lisitngRef = useRef();
  const [Feed, setFeed] = useState(feed || null);
  const styles = myStyles(colors);
  const feedItemData = !!Feed ? Feed : {id: feedData};
  useEffect(() => {
    getPostComments();
  }, []);

  useEffect(() => {
    setFeed(feed);
  }, [feed]);
  const {commentOnFeedPost, getCommentsOnPost} = useFeedService();

  const getPostComments = () => {
    getCommentsOnPost(feedItemData)
      .then(result => {
        console.log(result.entries);

        if (result.entries?.length !== 0) {
          const usersIds = _.map(result.entries, i => {
            return i?.author;
          });
          const uniqIds = _.unionBy(usersIds, i => i?.userId);
          const filterIds = _.filter(uniqIds, i => i?.userId !== userData?.id);
          setCommentUsers(filterIds);
        }
      })
      .catch(error => {
        console.log('Failed to get comments, error: ', error);
      });
  };

  const onPressComment = (comment: string) => {
    if (validations.isEmpty(comment)) {
      alerts.errorAlert('Please enter comment first.');
      return;
    }

    const isSafe = ManualModerationTool(comment);
    const advIsSafe = isSafe && SpaceWordModeration(comment);

    if (advIsSafe) {
      // const safeTextSpace = locationModeration(comment);

      // const safeText = locationSpaceWordModeration(safeTextSpace);

      if (netInfo.isConnected) {
        let objFeed = JSON.parse(JSON.stringify(Feed));
        console.log(objFeed);

        objFeed.commentsCount = objFeed.commentsCount + 1;
        commentOnFeedPost(objFeed, comment);

        onMentions(comment, userData, objFeed?.text, 'c', null, feed.id);
        setTimeout(() => {
          lisitngRef.current?.updateComments();
        }, 500);
        dispatch(
          feedSliceActions.UpdateCommentAction({
            routeName: objFeed?.source?.id,
            id: objFeed.id,
          }),
        );
        setFeed(objFeed);

        commentRef?.current?.clearComment();
      }
    } else {
      setIsPopUp(true);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: colorPalates.white}}>
        <ScreenHeader
          svgData={''}
          isImage={false}
          isCreateScreen={false}
          isGreenTalk={false}
          isBackVisible={true}
          title={'comments'}
        />
        <View style={styles.viewContainer}>
          <CommentInput feed={feedItemData} type={type} ref={lisitngRef} />
          <CommentBox
            onPressCommentSend={comment => onPressComment(comment)}
            ref={commentRef}
            mentionsList={commentUsers}
          />
        </View>

        <IosBottomButtonAvoid />
      </SafeAreaView>
      <AnnounceMentModal
        modalVisible={isPopUp}
        buttonText={'ok'}
        messageText={ModalsMessages.ModalsMassages.offensiveWord}
        onPressButton={() => setIsPopUp(false)}
      />
      <SafeAreaView style={{backgroundColor: colors.background}} />
    </>
  );
};

export default CommentScreen;

const myStyles = colors =>
  ScaledSheet.create({
    viewContainer: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopLeftRadius: colorPalates.size.defaultBorderRadius,
      borderTopRightRadius: colorPalates.size.defaultBorderRadius,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      paddingTop: s(10),
    },
  });
