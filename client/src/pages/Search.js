import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    return (
        <Layout title={"Buscar Resultados - venta de garage"}>
            <div className="container">
                <div className="text-center">
                    <h1>Resultados de busqueda</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "Producto no encontrado"
                            : `Encontrado ${values?.results.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button
                                        className="btn btn-primary ms-2 my-2"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        Mas Detalles
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
            </div>
        </Layout>
    );
};

export default Search;