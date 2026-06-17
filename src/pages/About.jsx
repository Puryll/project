import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx"
import "./About.css";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function About() {
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

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
      const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
      return onSnapshot(q, (snapshot) => {
        const allComments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setComments(allComments);
        
        // Calculate average rating
        if (allComments.length > 0) {
          const totalRating = allComments.reduce((sum, comment) => sum + (Number(comment.rating) || 0), 0);
          const avg = (totalRating / allComments.length).toFixed(1);
          setAverageRating(avg);
        }
      });
    }, []);

    return (
        <>
            <Navbar />
            <div className="about-container">
                <div className="about-content">
                    <div className="about-header">
                        <h1>🏪 Rreth Nesh</h1>
                        <p>Destinacioni juaj i besueshëm për blerje cilësore që nga 2014</p>
                    </div>

                    <div className="about-sections">
                        {/* About Info Section */}
                        <div className="section">
                            <h2>💼 Rreth Dyqanit Tonë</h2>
                            <p className="info-text">
                                Ne jemi një platformë e përkushtuar e tregtisë elektronike, të përkushtuar për t'ju ofruar produkte me cilësi të lartë dhe shërbim të shkëlqyer për klientët tanë. Misioni ynë është ta bëjmë blerjen të përshtatshme, të përballueshme dhe të këndshme për të gjithë.
                            </p>
                            <p className="info-text">
                                Me më shumë se 10 vjet përvojë në industri, ne kemi ndërtuar reputacionin tonë mbi besueshmëri, transparencë dhe përkushtim të plotë ndaj kënaqësisë të klientit.
                            </p>
                        </div>

                        {/* Work Days Section */}
                        <div className="section">
                            <h2>🕐 Orari i Punës</h2>
                            <div className="work-days">
                                <div className="day-item">
                                    <span className="day-name">E Hënë</span>
                                    <span className="day-hours">9:00 - 18:00</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">E Martë</span>
                                    <span className="day-hours">9:00 - 18:00</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">E Mërkurë</span>
                                    <span className="day-hours">9:00 - 18:00</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">E Enjte</span>
                                    <span className="day-hours">9:00 - 18:00</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">E Premte</span>
                                    <span className="day-hours">9:00 - 18:00</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">E Shtunë</span>
                                    <span className="day-hours">9:00 - 18:00</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">E Dielë</span>
                                    <span className="day-hours">9:00 - 16:00</span>
                                </div>
                            </div>
                        </div>

                        <div className="section">
                            <h2>⭐ Vlerësimet e Klientëve</h2>
                            <div className="review-stats">
                                <div className="stat-item">
                                    <p className="stat-label">Vlerësim Mesatar</p>
                                    <div className="stars-large">{renderStars(averageRating)}</div>
                                    <p className="stat-value">{averageRating} / 5</p>
                                </div>
                                <div className="stat-item">
                                    <p className="stat-label">Numri i Vlerësimeve</p>
                                    <p className="stat-value" style={{fontSize: '2em'}}>{comments.length}</p>
                                </div>
                            </div>
                            <p className="rating-text">
                                {comments.length > 0 
                                  ? `${comments.length} klientë të kënaqur na besojnë për blerjet e tyre!` 
                                  : 'Bëhu i pari që të lësh vlerësim!'}
                            </p>

                            {comments.length > 0 && (
                                <div className="recent-reviews">
                                    <h3>Vlerësimet më të reja</h3>
                                    {comments.slice(0, 3).map((comment) => (
                                        <div key={comment.id} className="review-item">
                                            <div className="review-header">
                                                <strong>{comment.name}</strong>
                                                <span className="review-stars">{renderStars(comment.rating)}</span>
                                            </div>
                                            <p className="review-date">{formatDate(comment.createdAt)}</p>
                                            <p className="review-text">{comment.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Opened Year Section */}
                        <div className="section">
                            <h2>📅 Themeluar në</h2>
                            <p className="year-opened">
                                Ne kemi shërbyer klientët me krenari dhe profesionalizëm që nga <strong>2014</strong>. Mbi një dekadë shërbim i besueshëm, produkte cilësore dhe përdorimi i teknologjisë më të fundit në tregtinë elektronike.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
};

export default About;