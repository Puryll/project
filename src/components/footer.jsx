import React from 'react' 
import './footer.css'

function Footer () {
    return(
        <>
            <footer>
            <div className="footer">
                <ul className="FooterUl">
                    <a href="https://www.facebook.com/driloniad" className="a1">facebook</a>
                    <a href="instagram.com" className="a2">instagram</a>
                </ul>
                <div className="info-item">
                    <a href="tel:+355691234567">+383 044 307 925</a><br />
                    <a href="tel:+355422345678">+383 049 551 704</a>
                </div>
                <div className="MadeFrom">
                    <p>U krijua nga</p>
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