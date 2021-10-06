import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FormContainer } from "../components/FormContainer";
import { getUserDetails, updateUser } from "../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.userUpdate);

  const isDisabled =
    name.length === 0 || email.length === 0 || loading || updateLoading;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userList");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, updateSuccess, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <>
      <Link to={"/admin/userList"} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User Details</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" disabled={isDisabled}>
              {loading ? "Wait.." : updateLoading ? 'Updating..' :" Update"}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
