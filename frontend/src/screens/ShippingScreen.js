import React, { useEffect, useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    history.push('/payment')
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ostalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Postal Code..."
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Country..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
