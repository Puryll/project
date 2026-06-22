import React from 'react' 
import './footer.css'

function Footer () {
    return(
        <>
            <footer>
            <div className="footer">
                <div className="infoitem">
                    <h1 className="info-title">Na kontaktoni mes numrave</h1>
                    <a href="tel:+383044307925">+383 044 307 925</a>
                    <a href="tel:+383049551704">+383 049 551 704</a>
                </div>
                <ul className="FooterUl">
                <li>
                    <a href="https://www.facebook.com/driloniad">
                        Facebook
                    </a>
                </li>

                <li>
                    <a href="https://instagram.com">
                        Instagram
                    </a>
                </li>
                </ul>
                <div className="MadeFrom">
                    <h1 className="info-show">U krijua nga</h1>
                    <h2>Yll Pllana</h2>
                    <h3>Vigjilent Zeqiri</h3>
                    <h4>Dijar Peci</h4>
                </div>
            </div>
            <p className="copy">&copy; 2026 Hekuraria Driloni AD. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Footer