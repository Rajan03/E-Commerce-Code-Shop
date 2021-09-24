import React, { useEffect, useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import { listMyOrders } from "../redux/actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const { order, loading: loadingOrders, error: errorOrders } = useSelector((state) => state.orderMyList);

  useEffect(() => {
    
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!!");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <h2>Update Profile</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {success && (
            <Message variant="success">Updated Successfully!!</Message>
          )}
          <Form onSubmit={submitHandler} autoComplete="off">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                disabled={loading}
                placeholder="Enter name..."
                value={name}
                onChange={(e) => {
                  setMessage(null);
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                disabled={loading}
                placeholder="Enter email..."
                value={email}
                onChange={(e) => {
                  setMessage(null);
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                disabled={loading}
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setMessage(null);
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                disabled={loading}
                placeholder="Confirm password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Wait..." : " Update"}
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {
            loadingOrders ? <Loader/> : 
            errorOrders ? <Message variant="danger">{errorOrders}</Message>
            : <Table striped bordered hover responsive className="table-sm">
<thead>
  <tr>
    <th>ID</th>
  </tr>
  <tr>
    <th>DATE</th>
  </tr>
</thead>
            </Table>
          }
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;


//  ORDER LIST PAGE al backend done