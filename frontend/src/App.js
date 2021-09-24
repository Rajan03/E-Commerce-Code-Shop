import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Container } from "react-bootstrap";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";
import { CartScreen } from "./screens/CartScreen";
import { LoginScreen } from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/profileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

export const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderScreen}/>
          <Route path="/place-order" component={PlaceOrderScreen}/>
          <Route path="/payment" component={PaymentMethodScreen}/>
          <Route path="/shipping" component={ShippingScreen}/>
          <Route path="/profile" component={ProfileScreen}/>
          <Route path="/register" component={RegisterScreen}/>
          <Route path="/login" component={LoginScreen}/>
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route exact path="/" component={HomeScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};