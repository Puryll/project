import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer.jsx";
import secretData from "../secretData";

function ViewProduct() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = secretData.subscribe((p) => {
            setProducts([...p]);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const product = products.find((p) => String(p.id) === String(id));

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="product-page">
                    <h2>Loading...</h2>
                </main>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <main className="product-page">
                    <section className="product-header">
                        <h1>Produkti nuk u gjet</h1>
                        <Link className="buttoni" to="/product">
                            Shiko produktet
                        </Link>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="viewProduct">
                <main className="product-page">
                    <section className="product-header">
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                    </section>

                    <section className="viewproduct-card">
                        <div className="viewproduct-image">
                            <img src={product.img} alt={product.name} />
                        </div>

                        <div className="viewproduct-details">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>

                            <div className="viewproduct-footer">
                                <p className="price">{product.saleprice} €</p>
                                <Link className="buttoni" to="/product">
                                    Kthehu
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default ViewProduct