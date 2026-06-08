import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import products from "../Product";
import Footer from "../components/footer.jsx"

function ViewProduct() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <>
                <Navbar />
                <main className="product-page">
                    <section className="product-header">
                        <h1>Produkti nuk u gjet</h1>
                        <p>Provo një produkt tjetër ose kthehu tek koleksioni ynë.</p>
                        <Link className="buttoni" to="/product">
                            Shiko produktet
                        </Link>
                    </section>
                </main>
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
                    <p>Detajet e produktit dhe oferta e veçantë që ju të bëni zgjedhjen më të mirë.</p>
                </section>

                <section className="viewproduct-card">
                    <div className="viewproduct-image">
                        <img src={product.img} alt={product.name} />
                    </div>
                    <div className="viewproduct-details">
                        <span className="badge">Oferta Speciale</span>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <div className="viewproduct-footer">
                            <p className="price">${product.saleprice}</p>
                            <Link className="buttoni" to="/product">
                                Kthehu tek produktet
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            </div>
            <Footer/>
        </>
    );
}

export default ViewProduct;