import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../redux/actions/productsActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
