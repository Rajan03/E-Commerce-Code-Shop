import axios from "axios";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

// POST /api/orders
// @desc - Place new Order
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });
        const {
            userLogin: {userInfo},
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.post(`/api/orders`, order, config);
        console.log(data);
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: ORDER_CREATE_RESET,
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// POST /api/orders
// @desc - Place new Order
export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(`/api/orders/${orderId}`, config);
        console.log(data);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// POST /api/orders
// @desc - Place new Order
export const payOrder =
    (orderId, paymentResult) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_PAY_REQUEST,
            });
            const {
                userLogin: {userInfo},
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const {data} = await axios.put(
                `/api/orders/${orderId}/pay`,
                paymentResult,
                config
            );
            console.log(data);
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// GET /api/orders
// @desc - List all Orders by user
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST,
        });
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(`/api/orders/myorders`, config);
        console.log(data)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// GET /api/orders
// @desc - Get all orders
export const listAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        });
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(`/api/orders`, config);
        console.log(data)
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// POST /api/orders
// @desc - Set deliver Status
export const deliverOrder = (order) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_DELIVER_REQUEST,
            });
            const {
                userLogin: {userInfo},
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const {data} = await axios.put(
                `/api/orders/${order._id}/deliver`,
                {},
                config
            );
            console.log(data);
            dispatch({
                type: ORDER_DELIVER_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: ORDER_DELIVER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };