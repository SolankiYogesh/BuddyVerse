import {createSelector} from 'reselect';
import { userStateModel } from '../models/userStateModel';
import userStateSelector from './userStateSelector';

export default createSelector(
  userStateSelector,
  (userState: userStateModel) => userState.user,
);
