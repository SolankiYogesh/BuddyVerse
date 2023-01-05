import {feedDataModel} from 'models/create-feed/feedDataModel';
import {useSelector} from 'react-redux';
import {appStateType} from 'redux-wrapper/store/store';
import feedListSliceSelector from './selectors/index';

const useFeedState = () => {
  const theJointFeedList: feedDataModel[] = useSelector((state: appStateType) =>
    feedListSliceSelector.theJointFeedListSelector(state),
  );
  const memeFeedList: feedDataModel[] = useSelector((state: appStateType) =>
    feedListSliceSelector.memeFeedListSelector(state),
  );
  const momentFeedList: feedDataModel[] = useSelector((state: appStateType) =>
    feedListSliceSelector.momentFeedListSelector(state),
  );
  const greenTalkFeedList: feedDataModel[] = useSelector(
    (state: appStateType) =>
      feedListSliceSelector.greenTalkFeedListSelector(state),
  );

  return {theJointFeedList, memeFeedList, momentFeedList, greenTalkFeedList};
};

export default useFeedState;
