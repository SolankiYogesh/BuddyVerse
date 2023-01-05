import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userDataPayload} from './models/payloads/userPayloadModel';
import {userStateModel} from './models/userStateModel';
import userSliceSelector from './selectors';
import useUserStateHook from './userState';

const initialState: userStateModel = {
  user: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<userDataPayload>) => {
      const {user} = action.payload;
      state.user = user;
    },
    clearUser: state => {
      state.user = null;
    },
  },
});
export const userAction = userSlice.actions;
export const userSelector = userSliceSelector;
export const useUserState = useUserStateHook;
export default userSlice.reducer;
