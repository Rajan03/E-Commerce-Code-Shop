import React, {useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Row, Col} from "react-bootstrap";
import {FaEdit, FaTrash, FaPlus} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
    productCreateAction,
    productDeleteAction,
    productListAction,
} from "../redux/actions/productsActions";
import {PRODUCT_CREATE_RESET, PRODUCT_DETAIL_RESET} from "../redux/constants/productsConstants";

const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector(
        (state) => state.productList
    );
    const {userInfo} = useSelector((state) => state.userLogin);
    const {
        loading: deleteLoading,
        error: deleteError,
        success: deleteSuccess,
    } = useSelector((state) => state.deleteProduct);
    const {
        loading: createLoading,
        error: createError,
        success: createSuccess,
        product: createdProductDetails,
    } = useSelector((state) => state.createProduct);

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET});
        dispatch({type: PRODUCT_DETAIL_RESET});

        if (!userInfo.isAdmin) {
            history.push("/login");
        }

        if (createSuccess) {
            history.push(`/admin/product/${createdProductDetails._id}/edit`);
        } else {
            dispatch(productListAction());
        }
    }, [dispatch, history, userInfo, deleteSuccess, createSuccess, createdProductDetails]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(productDeleteAction(id));
        }
    };

    const addProductHandler = () => {
        if (window.confirm("Want to create new product?")) {
            dispatch(productCreateAction());
        }
    };
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={addProductHandler}>
                        <FaPlus/> Create Product
                    </Button>
                </Col>
            </Row>
            {deleteLoading && <Loader/>}
            {deleteError && <Message variant="danger">{deleteError.message}</Message>}
            {createLoading && <Loader/>}
            {createError && <Message variant="danger">{createError.message || createError}</Message>}
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error.message}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price} </td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <FaEdit/>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant="danger"
                                    className="btn-sm"
                                    onClick={() => deleteHandler(product._id)}
                                >
                                    <FaTrash/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ProductListScreen;
