import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer.jsx";
import cartStore from "../cart";
import "./Cart.css"

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unsub = cartStore.subscribe(setCart);
    setCart(cartStore.getCart());
    return () => unsub();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty || 1),
    0
  );

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <h1>Shporta</h1>

        {cart.length === 0 ? (
          <p className="empty">Shporta është bosh</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-img" />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.price} €</p>

                <input
                  className="cart-input"
                  type="number"
                  value={item.qty || 1}
                  min="1"
                  onChange={(e) =>
                    cartStore.updateQty(item.id, Number(e.target.value))
                  }
                />

                <button
                  className="buttoni danger"
                  onClick={() => cartStore.removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        <hr />

        <h2>Total: {total.toFixed(2)} €</h2>

        <button className="buttoni" onClick={cartStore.buyCart}>
          Buy Now
        </button>

        <button className="buttoni secondary" onClick={cartStore.clearCart}>
          Clear Cart
        </button>
      </main>

      <Footer />
    </>
  );
}

export default Cart;