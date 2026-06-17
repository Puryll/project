import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import secretData from "../secretData";
import "./Secret.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
 
export default function Secret() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(secretData.getProducts());
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [stock, setStock] = useState(1);
  const [comments, setComments] = useState([]);

  const renderStars = (value) => {
    const v = Number(value) || 0;
    const full = Math.floor(v);
    const hasHalf = v - full >= 0.5;
    const filled = '★'.repeat(full);
    const half = hasHalf ? '⯨' : '';
    const empty = '☆'.repeat(5 - full - (hasHalf ? 1 : 0));
    return `${filled}${half}${empty}`;
  };

  const formatDate = (ts) => {
    if (!ts) return '';
    let d;
    if (ts.toDate) d = ts.toDate();
    else if (ts.seconds) d = new Date(ts.seconds * 1000);
    else d = new Date(ts);
    return d.toLocaleDateString();
  };
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const fallback = localStorage.getItem("adminAccess") === "true";
      if (!user && !fallback) {
        navigate('/login');
      }
    });
    const unsub = secretData.subscribe((p) => setProducts([...p]));
    return () => { unsub(); unsubscribe(); };
  }, [navigate]);

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  function handleDeleteComment(commentId) {
    deleteDoc(doc(db, "comments", commentId));
  }

  function handleAdd(e) {
    e.preventDefault();
    const next = {
      id: Date.now(),
      name: title || "Produkt i ri",
      description: "Shtuar nga admin",
      img: imgLink || "",
      saleprice: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
    };
    secretData.addProduct(next);
    setTitle("");
    setPrice("");
    setImgLink("");
    setStock(1);
  }

  function handleSaveProducts() {
    secretData.saveProducts();
  }

  return (
    <>
      <Navbar />
      <main className="secret-page">
        <section className="secret-panel">
          <h2>Dashboard i Sekret</h2>
          <p className="muted">Shto produkte të reja dhe menaxho listën. Ndryshimet do të reflektohen në faqen kryesore.</p>

          <form className="secret-form" onSubmit={handleAdd}>
            <input placeholder="Emri i produktit" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Çmimi" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input placeholder="Link foto (opsionale)" value={imgLink} onChange={(e) => setImgLink(e.target.value)} />
            <input placeholder="Sasia ne stok" value={stock} onChange={(e) => setStock(e.target.value)} />
            <button className="btn" type="submit">Shto produkt</button>
          </form>

          <div className="secret-save-row">
            <button className="btn secret-save-btn" type="button" onClick={handleSaveProducts}>Ruaj ndryshimet</button>
            <span className="small muted">Kliko kur të kesh përfunduar ndryshimet e stokut.</span>
          </div>
          <div className="secret-list">
            {products.map(p => (
              <div key={p.id} className="secret-item">
                <div className="secret-item-info">
                  <strong>{p.name}</strong>
                  <span>{p.saleprice} €</span>
                  <div className="small muted">{p.stock !== undefined ? (p.stock > 0 ? `In stock: ${p.stock}` : 'Out of stock') : 'Stock: -'}</div>
                </div>
                <div className="secret-item-actions">
                  <label className="small">
                    Stok
                    <input type="number" min="0" value={p.stock || 0} onChange={(e) => secretData.updateProduct(p.id, { stock: Math.max(0, parseInt(e.target.value || 0, 10)) })} />
                  </label>
                  <button className="btn" onClick={() => secretData.deleteProduct(p.id)}>Fshi</button>
                </div>
              </div>
            ))}
          </div>

          <div className="secret-comments">
            <h3>Menaxho Komentet</h3>
            <p className="muted">Fshi komentet e panevojshme direkt nga databaza.</p>
            {comments.length ? comments.map((c) => (
              <div key={c.id} className="secret-comment-item">
                <div className="secret-comment-main">
                  <strong>{c.name || 'Anon'}</strong>
                  <span className="small muted">{formatDate(c.createdAt)}</span>
                  <p>{c.text}</p>
                  <div className="secret-comment-rating">{renderStars(c.rating)}{c.rating ? ` ${c.rating}/5` : ''}</div>
                </div>
                <button className="btn secret-comment-delete" onClick={() => handleDeleteComment(c.id)}>Fshi</button>
              </div>
            )) : (
              <div className="secret-comment-empty">Nuk ka komente për momentin.</div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}