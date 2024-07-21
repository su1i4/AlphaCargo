import {createSlice} from '@reduxjs/toolkit';
  
const initialState: any = {
  product: '',
};

export const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    }
  },
});

export const {setProduct} = helpersSlice.actions;
export const authReducer = helpersSlice.reducer;
