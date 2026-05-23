import ProductComponent from "../components/Product";
import Navbar from "../components/Navbar";
import products from "../Product";

function ProductPage() {
  return (
    <>
      <Navbar />
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
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default ProductPage;