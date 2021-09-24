import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

// GET /api/products/:id
// @desc - Add to Cart Feature
export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// GET /api/products/:id
// @desc - Add to Cart Feature
export const removeCartAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

// POST /api/products/:id
// @desc - Save Shipping Address of user
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data))
};

// POST /api/products/:id
// @desc - Save Shipping Address of user
export const savePaymentMethod = (method) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: method
  });

  localStorage.setItem('paymentMethod', JSON.stringify(method))
};