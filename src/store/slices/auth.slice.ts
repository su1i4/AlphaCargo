import {
    getUserFromStorage,
    removeUserFromStorage,
    saveUserToStorage,
  } from '../../utils/helpers';
  import {createSlice} from '@reduxjs/toolkit';
  
  const initialState: any = {
    user: getUserFromStorage() || null,
  };
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      saveUser: (state, action) => {
        state.user = action.payload;
        saveUserToStorage(action.payload);
      },
      logout: state => {
        state.user = null;
        removeUserFromStorage();
      },
    },
  });
  
  export const authActions = authSlice.actions;
  export const authReducer = authSlice.reducer;
  