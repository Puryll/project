import React, { useEffect, useState } from "react";
import ProductComponent from "../components/Product";
import Navbar from "../components/Navbar";
import secretData from "../secretData";
import Footer from "../components/footer.jsx";

function ProductPage() {
  const [products, setProducts] = useState(secretData.getProducts());

  useEffect(() => {
    const unsub = secretData.subscribe((p) => setProducts([...p]));
    return () => unsub();
  }, []);

  return (
    <>
      <Navbar />
      <div className="products">
        <main className="product-page">
          <section className="product-header">
            <h1>Produktet tona</h1>
            <p>Zgjidhni nga produktet tona të klasit të lartë me ofertat më të mira.</p>
          </section>
          <section className="produkti">
            {products.map((p) => (
              <ProductComponent
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                img={p.img}
                saleprice={p.saleprice}
                stock={p.stock}
              />
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
