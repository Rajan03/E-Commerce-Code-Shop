import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_RESET,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
} from "../constants/productsConstants";

//  Reducer For : All products
export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {products: [], loading: true};

        case PRODUCT_LIST_SUCCESS:
            return {products: action.payload, loading: false};

        case PRODUCT_LIST_FAIL:
            return {error: action.payload, loading: false};

        default:
            return state;
    }
};

//  Reducer For : Single product details
export const productDetailsReducer = (
    state = {product: {reviews: []}},
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {loading: true, ...state};

        case PRODUCT_DETAIL_SUCCESS:
            return {product: action.payload, loading: false};

        case PRODUCT_DETAIL_FAIL:
            return {error: action.payload, loading: false};

        case PRODUCT_DETAIL_RESET:
            return {product: {reviews: []}, loading: false};

        default:
            return state;
    }
};

//  Reducer For : Delete product
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true, ...state};

        case PRODUCT_DELETE_SUCCESS:
            return {success: true, loading: false};

        case PRODUCT_DELETE_FAIL:
            return {error: action.payload, loading: false};

        default:
            return state;
    }
};

//  Reducer For : Create product
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading: true, ...state};

        case PRODUCT_CREATE_SUCCESS:
            return {success: true, loading: false, product: action.payload};

        case PRODUCT_CREATE_FAIL:
            return {error: action.payload, loading: false};

        case PRODUCT_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

//  Reducer For : Update product
export const productUpdateReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true, ...state};

        case PRODUCT_UPDATE_SUCCESS:
            return {success: true, loading: false, product: action.payload};

        case PRODUCT_UPDATE_FAIL:
            return {error: action.payload, loading: false};

        case PRODUCT_UPDATE_RESET:
            return {product: {}};

        default:
            return state;
    }
};

//  Reducer For : Review product
export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true};

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {success: true, loading: false};

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {error: action.payload, loading: false};

        case PRODUCT_CREATE_REVIEW_RESET:
            return {};

        default:
            return state;
    }
};
