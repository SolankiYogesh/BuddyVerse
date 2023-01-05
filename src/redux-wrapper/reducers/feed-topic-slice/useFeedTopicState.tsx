import {useSelector} from 'react-redux';
import {appStateType} from 'redux-wrapper/store/store';
import {feedTopicSelectors} from './feedTopicSlice';

const useFeedTopicState = () => {
  const feedTopicState = useSelector((state: appStateType) =>
    feedTopicSelectors.feedTopicStateSelector(state),
  );

  return {feedTopicState};
};

export default useFeedTopicState;
