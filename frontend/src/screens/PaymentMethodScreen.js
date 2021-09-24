import React, { useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/place-order");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              value="PayPal"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodScreen;
