import {createSlice} from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData: [],
    wishlistData: [],
    orderHistory:[],
  },
  reducers: {
    addToCart: (state, action) => {
      let index = state.cartData.findIndex(item => {
        return item.id === action.payload.id;
      });
      if (index === -1) {
        state.cartData = [...state.cartData, action.payload];
      } else {
        state.cartData[index].count += 1;
      }
    },
    emptyCart: (state, action) => {
      state.orderHistory = [...state.orderHistory,{id:state.orderHistory.length+1,data:state.cartData}]
      state.cartData = [];
    },
    removeFromCart: (state, action) => {
      let index = state.cartData.findIndex(item => {
        return item.id === action.payload.id;
      });
      if (state.cartData[index].count === 1) {
        state.cartData.splice(index, 1);
      } else {
        state.cartData[index].count -= 1;
      }
    },
    addToWishlist: (state, action) => {
      let index = state.wishlistData.findIndex(item => {
        return item.id === action.payload.id;
      });
      if (index === -1) {
        state.wishlistData = [...state.wishlistData, action.payload];
      } else {
        state.wishlistData.splice(index, 1);
      }
    },
  },
});

export const {addToCart, removeFromCart, addToWishlist,emptyCart} = CartSlice.actions;

export default CartSlice.reducer;
