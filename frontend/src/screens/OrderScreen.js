import React, {useEffect, useState} from "react";
import axios from "axios";
import {PayPalButton} from "react-paypal-button-v2";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {deliverOrder, getOrderDetails, payOrder} from "../redux/actions/orderActions";
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from "../redux/constants/orderConstants";

const OrderScreen = ({match, history}) => {
    const orderId = match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.userLogin);
    const {loading, error, order} = useSelector((state) => state.orderDetails);
    const {loading: loadingPay, success: successPay} = useSelector((state) => state.orderPay);
    const {loading: loadingDeliver, success: successDeliver} = useSelector((state) => state.orderDeliver);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        const addPaypalScript = async () => {
            const {data: clientId} = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => setSdkReady(true);
            document.body.appendChild(script);
        };

        if (!order || successPay || successDeliver) {
            dispatch({type: ORDER_PAY_RESET});
            dispatch({type: ORDER_DELIVER_RESET});
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [orderId, dispatch, order, successDeliver, successPay]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        if (window.confirm("Order Delivered??")) {
            dispatch(deliverOrder(order));
        }
    };

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <h2>Order: {orderId}</h2>
            <Row>
                <Col md={7}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name} &nbsp;
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a
                                    href={`mailto:${order.user.email}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                                {order.shippingAddress.postalCode}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">{order.deliveredAt}</Message>
                            ) : (
                                <Message variant="danger">Not Delivered</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method : </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">Paid On: {order.paidAt}</Message>
                            ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>No order Placed Yet:\</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, i) => (
                                        <ListGroup.Item key={i}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? (
                                        <Loader/>
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type={"button"} className="btn btn-block" onClick={deliverHandler}>
                                        {loadingDeliver ? <Loader/> : "Mark Delivered"}
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
