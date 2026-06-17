import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import "../Home.css";
import { Link } from "react-router-dom";
import Product from "../components/Product.jsx";
import secretData from "../secretData";
import Footer from "../components/footer.jsx";
import CommentForm from "../components/CommentForm.jsx";
import CommentList from "../components/CommentList.jsx";
import { db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

function Home() {
    const [products, setProducts] = useState(secretData.getProducts());

    useEffect(() => {
      const unsub = secretData.subscribe((p) => setProducts([...p]));
      return () => unsub();
    }, []);

    const newestProducts = products.slice(-4).reverse();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentName, setCommentName] = useState("");
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(null);

    const renderStars = (value) => {
      const v = Number(value) || 0;
      const full = Math.floor(v);
      const hasHalf = v - full >= 0.5;
      const filled = '★'.repeat(full);
      const half = hasHalf ? '⯨' : '';
      const empty = '☆'.repeat(5 - full - (hasHalf ? 1 : 0));
      return `${filled}${half}${empty}`;
    };

    const starLabel = (val) => {
      const v = Number(val);
      const full = Math.floor(v);
      const hasHalf = v - full >= 0.5;
      const stars = '★'.repeat(full) + (hasHalf ? '⯨' : '');
      return `${stars} ${v}`;
    };

    const formatDate = (ts) => {
      if (!ts) return '';
      let d;
      if (ts.toDate) d = ts.toDate();
      else if (ts.seconds) d = new Date(ts.seconds * 1000);
      else d = new Date(ts);
      return d.toLocaleDateString();
    };

    function addComment(e) {
      e.preventDefault();
      if (!newComment.trim()) return;
      addDoc(collection(db, "comments"), {
        name: commentName.trim() || "Anon",
        text: newComment.trim(),
        rating,
        createdAt: serverTimestamp(),
      });
      setCommentName("");
      setNewComment("");
      setRating(5);
    }

    useEffect(() => {
      const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
      return onSnapshot(q, (snapshot) => {
        setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }, []);

    return(
        <>
        <Navbar />
        <section className="homesection">
          <div className="home-gear gear-top-left gear-quarter">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path d="M80.6 52.8c0.2-1 0.4-2.1 0.4-3.2s-0.1-2.2-0.4-3.2l7.8-6.1c0.7-0.5 0.9-1.5 0.4-2.3l-7.4-12.8c-0.5-0.9-1.5-1.2-2.4-0.9l-9.2 3.7c-1.7-1.3-3.6-2.3-5.7-3L60 13.9c0-1-0.8-1.8-1.8-1.8H41.8c-1 0-1.8 0.8-1.8 1.8l-1.1 10.3c-2.1 0.7-4 1.7-5.7 3l-9.2-3.7c-1-0.4-1.9 0-2.4 0.9L14.1 38.5c-0.5 0.9-0.3 1.8 0.4 2.3l7.8 6.1c-0.2 1-0.4 2.1-0.4 3.2s0.1 2.2 0.4 3.2l-7.8 6.1c-0.7 0.5-0.9 1.5-0.4 2.3l7.4 12.8c0.5 0.9 1.5 1.2 2.4 0.9l9.2-3.7c1.7 1.3 3.6 2.3 5.7 3L41.8 86c0 1 0.8 1.8 1.8 1.8h16.4c1 0 1.8-0.8 1.8-1.8l1.1-10.3c2.1-0.7 4-1.7 5.7-3l9.2 3.7c0.9 0.4 1.9 0 2.4-0.9l7.4-12.8c0.5-0.9 0.3-1.8-0.4-2.3L80.6 52.8zM50 66.8c-9.3 0-16.8-7.5-16.8-16.8S40.7 33.2 50 33.2 66.8 40.7 66.8 50 59.3 66.8 50 66.8z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
          <div className="home-gear gear-top-right gear-quarter">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path d="M80.6 52.8c0.2-1 0.4-2.1 0.4-3.2s-0.1-2.2-0.4-3.2l7.8-6.1c0.7-0.5 0.9-1.5 0.4-2.3l-7.4-12.8c-0.5-0.9-1.5-1.2-2.4-0.9l-9.2 3.7c-1.7-1.3-3.6-2.3-5.7-3L60 13.9c0-1-0.8-1.8-1.8-1.8H41.8c-1 0-1.8 0.8-1.8 1.8l-1.1 10.3c-2.1 0.7-4 1.7-5.7 3l-9.2-3.7c-1-0.4-1.9 0-2.4 0.9L14.1 38.5c-0.5 0.9-0.3 1.8 0.4 2.3l7.8 6.1c-0.2 1-0.4 2.1-0.4 3.2s0.1 2.2 0.4 3.2l-7.8 6.1c-0.7 0.5-0.9 1.5-0.4 2.3l7.4 12.8c0.5 0.9 1.5 1.2 2.4 0.9l9.2-3.7c1.7 1.3 3.6 2.3 5.7 3L41.8 86c0 1 0.8 1.8 1.8 1.8h16.4c1 0 1.8-0.8 1.8-1.8l1.1-10.3c2.1-0.7 4-1.7 5.7-3l9.2 3.7c0.9 0.4 1.9 0 2.4-0.9l7.4-12.8c0.5-0.9 0.3-1.8-0.4-2.3L80.6 52.8zM50 66.8c-9.3 0-16.8-7.5-16.8-16.8S40.7 33.2 50 33.2 66.8 40.7 66.8 50 59.3 66.8 50 66.8z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
          <div className="home-gear gear-bottom-left gear-half">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path d="M80.6 52.8c0.2-1 0.4-2.1 0.4-3.2s-0.1-2.2-0.4-3.2l7.8-6.1c0.7-0.5 0.9-1.5 0.4-2.3l-7.4-12.8c-0.5-0.9-1.5-1.2-2.4-0.9l-9.2 3.7c-1.7-1.3-3.6-2.3-5.7-3L60 13.9c0-1-0.8-1.8-1.8-1.8H41.8c-1 0-1.8 0.8-1.8 1.8l-1.1 10.3c-2.1 0.7-4 1.7-5.7 3l-9.2-3.7c-1-0.4-1.9 0-2.4 0.9L14.1 38.5c-0.5 0.9-0.3 1.8 0.4 2.3l7.8 6.1c-0.2 1-0.4 2.1-0.4 3.2s0.1 2.2 0.4 3.2l-7.8 6.1c-0.7 0.5-0.9 1.5-0.4 2.3l7.4 12.8c0.5 0.9 1.5 1.2 2.4 0.9l9.2-3.7c1.7 1.3 3.6 2.3 5.7 3L41.8 86c0 1 0.8 1.8 1.8 1.8h16.4c1 0 1.8-0.8 1.8-1.8l1.1-10.3c2.1-0.7 4-1.7 5.7-3l9.2 3.7c0.9 0.4 1.9 0 2.4-0.9l7.4-12.8c0.5-0.9 0.3-1.8-0.4-2.3L80.6 52.8zM50 66.8c-9.3 0-16.8-7.5-16.8-16.8S40.7 33.2 50 33.2 66.8 40.7 66.8 50 59.3 66.8 50 66.8z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
          <div className="home-gear gear-bottom-right gear-half">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path d="M80.6 52.8c0.2-1 0.4-2.1 0.4-3.2s-0.1-2.2-0.4-3.2l7.8-6.1c0.7-0.5 0.9-1.5 0.4-2.3l-7.4-12.8c-0.5-0.9-1.5-1.2-2.4-0.9l-9.2 3.7c-1.7-1.3-3.6-2.3-5.7-3L60 13.9c0-1-0.8-1.8-1.8-1.8H41.8c-1 0-1.8 0.8-1.8 1.8l-1.1 10.3c-2.1 0.7-4 1.7-5.7 3l-9.2-3.7c-1-0.4-1.9 0-2.4 0.9L14.1 38.5c-0.5 0.9-0.3 1.8 0.4 2.3l7.8 6.1c-0.2 1-0.4 2.1-0.4 3.2s0.1 2.2 0.4 3.2l-7.8 6.1c-0.7 0.5-0.9 1.5-0.4 2.3l7.4 12.8c0.5 0.9 1.5 1.2 2.4 0.9l9.2-3.7c1.7 1.3 3.6 2.3 5.7 3L41.8 86c0 1 0.8 1.8 1.8 1.8h16.4c1 0 1.8-0.8 1.8-1.8l1.1-10.3c2.1-0.7 4-1.7 5.7-3l9.2 3.7c0.9 0.4 1.9 0 2.4-0.9l7.4-12.8c0.5-0.9 0.3-1.8-0.4-2.3L80.6 52.8zM50 66.8c-9.3 0-16.8-7.5-16.8-16.8S40.7 33.2 50 33.2 66.8 40.7 66.8 50 59.3 66.8 50 66.8z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
          <div className="home">
            <h1>Përshëndetje dhe Mirësevini në Dyqanin Tonë</h1>
            <p>Ne sjellim produkte të përzgjedhura me kujdes, me dizajne moderne dhe funksionalitet të qëndrueshëm. Çdo produkt është testuar për t'ju ofruar një përvojë të besueshme.</p>
            <Link to="/Product" className="home-button">Shiko Koleksionin</Link>
            <p className="home-small">Zbuloni produktet më të reja dhe ofertat ekskluzive, të përshtatura për çdo nevojë të jetesës.</p>
          </div>
        </section>
        <section className="feutures">
          <div className="feature-gear feature-top-left">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path d="M80.6 52.8c0.2-1 0.4-2.1 0.4-3.2s-0.1-2.2-0.4-3.2l7.8-6.1c0.7-0.5 0.9-1.5 0.4-2.3l-7.4-12.8c-0.5-0.9-1.5-1.2-2.4-0.9l-9.2 3.7c-1.7-1.3-3.6-2.3-5.7-3L60 13.9c0-1-0.8-1.8-1.8-1.8H41.8c-1 0-1.8 0.8-1.8 1.8l-1.1 10.3c-2.1 0.7-4 1.7-5.7 3l-9.2-3.7c-1-0.4-1.9 0-2.4 0.9L14.1 38.5c-0.5 0.9-0.3 1.8 0.4 2.3l7.8 6.1c-0.2 1-0.4 2.1-0.4 3.2s0.1 2.2 0.4 3.2l-7.8 6.1c-0.7 0.5-0.9 1.5-0.4 2.3l7.4 12.8c0.5 0.9 1.5 1.2 2.4 0.9l9.2-3.7c1.7 1.3 3.6 2.3 5.7 3L41.8 86c0 1 0.8 1.8 1.8 1.8h16.4c1 0 1.8-0.8 1.8-1.8l1.1-10.3c2.1-0.7 4-1.7 5.7-3l9.2 3.7c0.9 0.4 1.9 0 2.4-0.9l7.4-12.8c0.5-0.9 0.3-1.8-0.4-2.3L80.6 52.8zM50 66.8c-9.3 0-16.8-7.5-16.8-16.8S40.7 33.2 50 33.2 66.8 40.7 66.8 50 59.3 66.8 50 66.8z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
          <div className="feature-gear feature-top-right">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path d="M80.6 52.8c0.2-1 0.4-2.1 0.4-3.2s-0.1-2.2-0.4-3.2l7.8-6.1c0.7-0.5 0.9-1.5 0.4-2.3l-7.4-12.8c-0.5-0.9-1.5-1.2-2.4-0.9l-9.2 3.7c-1.7-1.3-3.6-2.3-5.7-3L60 13.9c0-1-0.8-1.8-1.8-1.8H41.8c-1 0-1.8 0.8-1.8 1.8l-1.1 10.3c-2.1 0.7-4 1.7-5.7 3l-9.2-3.7c-1-0.4-1.9 0-2.4 0.9L14.1 38.5c-0.5 0.9-0.3 1.8 0.4 2.3l7.8 6.1c-0.2 1-0.4 2.1-0.4 3.2s0.1 2.2 0.4 3.2l-7.8 6.1c-0.7 0.5-0.9 1.5-0.4 2.3l7.4 12.8c0.5 0.9 1.5 1.2 2.4 0.9l9.2-3.7c1.7 1.3 3.6 2.3 5.7 3L41.8 86c0 1 0.8 1.8 1.8 1.8h16.4c1 0 1.8-0.8 1.8-1.8l1.1-10.3c2.1-0.7 4-1.7 5.7-3l9.2 3.7c0.9 0.4 1.9 0 2.4-0.9l7.4-12.8c0.5-0.9 0.3-1.8-0.4-2.3L80.6 52.8zM50 66.8c-9.3 0-16.8-7.5-16.8-16.8S40.7 33.2 50 33.2 66.8 40.7 66.8 50 59.3 66.8 50 66.8z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Performancë e Lartë</p>
                <p className="description">Hekurari funksionon shpejt dhe efikas.</p>
              </div>
              <div className="flip-card-back">
                <p className="title">Përfitimi</p>
                <p className="description">Rezultate të shkëlqyera në çdo rroba dhe nganjëherë më pak kohë në hekurosje.</p>
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Siguri e Garantuar</p>
                <p className="description">Materiale të qëndrueshme dhe mbrojtje termike.</p>
              </div>
              <div className="flip-card-back">
                <p className="title">Përfitimi</p>
                <p className="description">Shkarkim i ulët i energjisë dhe më shumë qetësi gjatë përdorimit.</p>
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Kursim Energjie</p>
                <p className="description">Funksionon me konsum të ulët të energjisë.</p>
              </div>
              <div className="flip-card-back">
                <p className="title">Përfitimi</p>
                <p className="description">Shpenzime më të ulëta mujore dhe përdorim më efikas i burimeve.</p>
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Shërbim Teknik i Shpejtë</p>
                <p className="description">Mbështetje e shpejtë pas blerjes.</p>
              </div>
              <div className="flip-card-back">
                <p className="title">Përfitimi</p>
                <p className="description">Nëse keni ndonjë problem, ne ofrojmë riparim të shpejtë dhe pjesë këmbimi.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="homeproducts">
          <div className="homeproducts-header">
            <h2>Koleksioni më i fundit</h2>
            <p>Shfletoni 4 produktet më të reja me karakteristika inovative dhe më shumë vlerë për çdo blerje.</p>
          </div>
          <div className="homeproducts-list">
            {newestProducts.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                img={product.img}
                saleprice={product.saleprice}
                stock={product.stock}
              />
            ))}
          </div>
        </section>
        <section className="home-comments">
          <div className="homeproducts-header">
            <h2>Komente të reja të përdoruesve</h2>
            <p className="muted">Shtoni komentin tuaj ose lexoni komentet më të fundit nga komuniteti ynë.</p>
          </div>
          <div className="comment-section">
            <CommentForm
              commentName={commentName}
              setCommentName={setCommentName}
              newComment={newComment}
              setNewComment={setNewComment}
              rating={rating}
              setRating={setRating}
              hoverRating={hoverRating}
              setHoverRating={setHoverRating}
              renderStars={renderStars}
              onSubmit={addComment}
            />
            <CommentList comments={comments} renderStars={renderStars} formatDate={formatDate} />
          </div>
        </section>
        <Footer/>
        </>
    )
};

export default Home