import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../constants/productsConstants";

//  Reducer For : All products
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { products: [], loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { products: action.payload, loading: false };

    case PRODUCT_LIST_FAIL:
      return { error: action.payload, loading: false };

    default:
      return state;
  }
};

//  Reducer For : Single product details
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_DETAIL_SUCCESS:
      return { product: action.payload, loading: false };

    case PRODUCT_DETAIL_FAIL:
      return { error: action.payload, loading: false };

    default:
      return state;
  }
};
