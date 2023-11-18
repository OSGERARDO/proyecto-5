import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const [cart, setCart] = useCart();
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="300"
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className="text-center">Detalles del Producto</h1>
                    <h6>Nombre : {product.name}</h6>
                    <h6>Descripcion : {product.description}</h6>
                    <h6>Precio : {product.price}</h6>
                    <h6>Categoria : {product?.category?.name}</h6>
                    <button class="btn btn-secondary ms-2 my-2" onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                        );
                        toast.success(
                            "¡Wow! Que buena elección, ¡tu producto se agrego al carrito!"
                        );
                    }}>Agregar al carrito</button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h6>Productos similares</h6>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No se han encontrado productos similares</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={`/api/v1/product/product-photo/${p?._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 30)}...</p>
                                <p className="card-text"> $ {p.price}</p>
                                <button
                                    className="btn btn-primary ms-1"
                                    onClick={() => navigate(`/product/${p.slug}`)}
                                >
                                    Mas detalles
                                </button>


                                <button
                                    className="btn btn-secondary ms-2 my-2"
                                    onClick={() => {
                                        setCart([...cart, p]);
                                        localStorage.setItem(
                                            "cart",
                                            JSON.stringify([...cart, p])
                                        );
                                        toast.success(
                                            "¡Wow! Que buena elección, ¡tu producto se agrego al carrito!"
                                        );
                                    }}
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;