import React, { useEffect, useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../redux/actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmFPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(
    (state) => state.userRegister
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const isDisabled =
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    confirmPassword.length === 0 ||
    loading ||
    password !== confirmPassword;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler} autoComplete="off">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmFPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isDisabled}>
          {loading ? "Wait..." : " Register"}
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already a Customer?? &nbsp;
          <Link to={redirect ? `/login/redirect=${redirect}` : "/register"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
