import {userDataModel} from 'models/userData';
import {useSelector} from 'react-redux';
import {appStateType} from 'redux-wrapper/store/store';
import userSliceSelector from './selectors';

const useUserState = () => {
  const userData: userDataModel | null = useSelector((state: appStateType) =>
    userSliceSelector.userDataSelector(state),
  );

  return {userData};
};

export default useUserState;
