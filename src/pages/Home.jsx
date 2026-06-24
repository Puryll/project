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

const newestProducts = [...products]
  .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
  .slice(0, 4);
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
          <div className="home">
            <h1>Përshëndetje dhe Mirësevini në Dyqanin Tonë</h1>
            <p>Ne sjellim produkte të përzgjedhura me kujdes, me dizajne moderne dhe funksionalitet të qëndrueshëm. Çdo produkt është testuar për t'ju ofruar një përvojë të besueshme.</p>
            <Link to="/Product" className="home-button">Shiko Koleksionin</Link>
            <p className="home-small">Zbuloni produktet më të reja dhe ofertat ekskluzive, të përshtatura për çdo nevojë të jetesës.</p>
          </div>
        </section>
        <section className="feutures">
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