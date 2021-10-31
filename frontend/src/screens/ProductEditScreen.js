import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {FormContainer} from "../components/FormContainer";
import {productDetailsAction, productUpdateAction} from "../redux/actions/productsActions";
import {PRODUCT_UPDATE_RESET} from "../redux/constants/productsConstants";
import axios from "axios";

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id;
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    const {loading, error, product} = useSelector((state) => state.productDetails);
    const {
        loading: updateLoading,
        error: updateError,
        success: updateSuccess
    } = useSelector((state) => state.updateProduct);

    useEffect(() => {
        if (updateSuccess) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productList')
        }
        console.log(product.name + "   " + product._id)
        if (!product.name || product._id !== productId) {
            dispatch(productDetailsAction(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setStock(product.countInStock);
            setDescription(product.description);
        }
    }, [productId, product, dispatch, history, updateSuccess]);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data);
            setUploading(false);
        } catch (e) {
            console.log(e);
            setUploading(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(productUpdateAction({
            _id: productId, name, price, image, brand, category, description, countInStock: stock
        }))
    };

    return (
        <>
            <Link to={"/admin/productList"} className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {updateLoading && <Loader/>}
                {updateError && <Message variant="danger">{updateError}</Message>}
                {loading ? (
                    <Loader/>
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
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price..."
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image url..."
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Form.File id={"image-file"} label={"Choose File"} custom onChange={onFileChange}/>
                            {uploading && <Loader/>}
                        </Form.Group>
                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand..."
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category..."
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter stock..."
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            {loading ? "Wait.."
                                // : updateLoading ? 'Updating..'
                                : " Update"}
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
