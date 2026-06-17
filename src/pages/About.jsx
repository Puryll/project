import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx"
import "./About.css";

function About() {
    return (
        <>
            <Navbar />
            <div className="about-container">
                <div className="about-content">
                            <div className="about-header">
                                <h1>Rreth Nesh</h1>
                                <p>Destinacioni juaj i besueshëm për blerje që nga 2014</p>
                            </div>

                    <div className="about-sections">
                        {/* About Info Section */}
                        <div className="section">
                            <h2>Rreth Dyqanit Tonë</h2>
                            <p className="info-text">
                                Ne jemi një platformë e përkushtuar e tregtisë elektronike, të përkushtuar për t'ju ofruar produkte me cilësi të lartë dhe shërbim të shkëlqyer për klientët tanë. Misioni ynë është ta bëjmë blerjen të përshtatshme, të përballueshme dhe të këndshme për të gjithë.
                            </p>
                        </div>

                        {/* Work Days Section */}
                        <div className="section">
                            <h2>Orari i Punës</h2>
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

                        {/* Customer Reviews Section */}
                        <div className="section">
                            <h2>Vlerësimet e Klientëve</h2>
                            <div className="stars">★★★★★</div>
                            <p className="rating-text">
                                Vlerësim 5 yje! Qindra klientë të kënaqur na besojnë për blerjet e tyre.
                            </p>
                        </div>

                        {/* Opened Year Section */}
                        <div className="section">
                            <h2>E themeluar</h2>
                            <p className="year-opened">
                                Ne kemi shërbyer klientët me krenari dhe profesionalizëm që nga <strong>2014</strong>. Mbi një dekadë shërbim i besueshëm dhe produkte cilësore.
                            </p>
                        </div>

                        {/* Free Shipping Section */}
                        {/* Removed Free Shipping section as requested */}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
};

export default About;