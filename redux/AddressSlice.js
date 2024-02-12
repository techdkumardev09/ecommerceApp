import {createSlice} from '@reduxjs/toolkit';

export const AddressSlice = createSlice({
  name: 'address',
  initialState: {
    addressData: [],
  },
  reducers: {
    addAddress: (state, action) => {
      state.addressData = [...state.addressData, action.payload];
    },
  },
});

export const {addAddress} = AddressSlice.actions;

export default AddressSlice.reducer;
