import React, {useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button} from "react-bootstrap";
import {FaTimes, FaCheck, FaEdit, FaTrash} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listAllOrders} from "../redux/actions/orderActions";

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch();
    const {loading, error, orders} = useSelector((state) => state.orderList);
    const {userInfo} = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);


    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error.message}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Is Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>
                                {order.createdAt.substring(0, 10)}
                            </td>
                            <td>
                                ${order.totalPrice}
                            </td>
                            <td>
                                {order.isPaid ? (
                                    <>
                                        <FaCheck style={{color: "green"}}/> {order.paidAt.substring(0, 10)}
                                    </>
                                ) : (
                                    <FaTimes style={{color: "red"}}/>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    <>
                                        <FaCheck style={{color: "green"}}/> {order.deliveredAt.substring(0, 10)}
                                    </>
                                ) : (
                                    <FaTimes style={{color: "red"}}/>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/order/${order._id}`}>
                                    <Button variant="light" className="btn-sm">
                                        View Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;
