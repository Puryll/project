import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx"
import "./About.css";

function About() {
    return (
        <>
        <Navbar />
        <Footer/>
            <Navbar />
            <div className="about-container">
                <div className="about-content">
                    <div className="about-header">
                        <h1>About Us</h1>
                        <p>Your trusted shopping destination since 2014</p>
                    </div>

                    <div className="about-sections">
                        {/* About Info Section */}
                        <div className="section">
                            <h2>About Our Store</h2>
                            <p className="info-text">
                                We are a dedicated e-commerce platform committed to providing you with the highest quality products and exceptional customer service. Our mission is to make shopping convenient, affordable, and enjoyable for everyone.
                            </p>
                        </div>

                        {/* Work Days Section */}
                        <div className="section">
                            <h2>Work Days</h2>
                            <div className="work-days">
                                <div className="day-item">
                                    <span className="day-name">Monday</span>
                                    <span className="day-hours">8 AM - 10 PM</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">Tuesday</span>
                                    <span className="day-hours">8 AM - 10 PM</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">Wednesday</span>
                                    <span className="day-hours">8 AM - 10 PM</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">Thursday</span>
                                    <span className="day-hours">8 AM - 10 PM</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">Friday</span>
                                    <span className="day-hours">8 AM - 10 PM</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">Saturday</span>
                                    <span className="day-hours">8 AM - 10 PM</span>
                                </div>
                                <div className="day-item">
                                    <span className="day-name">Sunday</span>
                                    <span className="day-hours">8 AM - 10 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Reviews Section */}
                        <div className="section">
                            <h2>Customer Reviews</h2>
                            <div className="stars">★★★★★</div>
                            <p className="rating-text">
                                5-Star Rated! Thousands of satisfied customers trust us with their shopping needs.
                            </p>
                        </div>

                        {/* Opened Year Section */}
                        <div className="section">
                            <h2>Established</h2>
                            <p className="year-opened">
                                We have been serving customers with pride and excellence since <strong>2014</strong>. Over a decade of trusted service and quality products.
                            </p>
                        </div>

                        {/* Free Shipping Section */}
                        <div className="section">
                            <h2>Free Shipping</h2>
                            <p className="info-text">
                                Enjoy <strong>FREE SHIPPING</strong> on all orders!
                            </p>
                            <span className="shipping-badge">✓ FREE SHIPPING</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default About;