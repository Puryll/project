import { useState } from "react";
import Navbar from "../components/Navbar";
import "../Contact.css";

function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="contact-page">
            <Navbar />

            {/* Hero */}
            <section className="contact-hero">
                <h1>Na Kontaktoni</h1>
                <p>
                    Jemi gjithmonë të gatshëm t'ju ndihmojmë. Plotësoni formularin,
                    na telefononi ose vizitoni zyrat tona — do të kthehemi tek ju sa
                    më shpejt të jetë e mundur.
                </p>
            </section>

            {/* Info + Form */}
            <div className="contact-main">

                {/* Info Card */}
                <div className="contact-info">
                    <h2>Informacioni i Kontaktit</h2>

                    <div className="info-item">
                        <span className="info-icon">📍</span>
                        <div>
                            <h4>Adresa</h4>
                            <p>Rruga "çlirimit"<br />Mitrovica, Kosovo</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="info-icon">📞</span>
                        <div>
                            <h4>Telefon</h4>
                            <a href="tel:+355691234567">+383 044 307 925</a><br />
                            <a href="tel:+355422345678">+383 049 551 704</a>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="info-icon">✉️</span>
                        <div>
                            <h4>Email</h4>
                            <a href="adem_deliu@hotmail.com">adem_deliu@hotmail.com</a><br />
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="info-icon">🕐</span>
                        <div>
                            <h4>Orari i Punës</h4>
                            <p>E Hënë – E Shtune: 09:00 – 18:00<br /></p>
                            <p>E Diel: 09:00 – 16:00</p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="social-section">
                        <h3>Rrjetet Sociale</h3>
                        <div className="social-links">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn facebook"
                            >
                                <span>f</span> Facebook
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn instagram"
                            >
                                <span>◉</span> Instagram
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn twitter"
                            >
                                <span>𝕏</span> Twitter
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn linkedin"
                            >
                                <span>in</span> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="contact-form-card">
                    <h2>Dërgoni një Mesazh</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Emri i Plotë *</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Emri juaj"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subjekti</label>
                            <select
                                id="subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                            >
                                <option value="">Zgjidhni një temë...</option>
                                <option value="info">Informacion i Përgjithshëm</option>
                                <option value="support">Mbështetje Teknike</option>
                                <option value="order">Porosi / Produkte</option>
                                <option value="partnership">Partneritet</option>
                                <option value="other">Tjetër</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Mesazhi *</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Shkruani mesazhin tuaj këtu..."
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Dërgoni Mesazhin →
                        </button>

                        {submitted && (
                            <div className="form-success">
                                ✅ Mesazhi u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Google Maps Embed — Tirana, Albania */}
            <div className="contact-map">
                <h2>📍 Na Gjeni në Hartë</h2>
                <iframe
                    title="Lokacioni ynë"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.4064260607568!2d20.869458709644377!3d42.89487034252625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353456e15a633df%3A0xe4021ca5f7155061!2s%C3%87lirimi%2C%20Mitrovica%20e%20Veriut%2040000!5e0!3m2!1sen!2s!4v1779543791126!5m2!1sen!2s"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
}

export default Contact;