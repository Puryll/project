import React from 'react' 
import './footer.css'

function Footer () {
    return(
        <>
            <footer>
            <div className="footer">
                <ul className="FooterUl">
                    <a href="https://www.facebook.com/driloniad" className="a1">facebook</a>
                    <a href="instagram.com" className="a2">isntagram</a>
                </ul>
                <div className="MadeFrom">
                    <p>U bë nga</p>
                    <h2>Yll Pllana</h2>
                    <h3>Vigjilent Zeqiri</h3>
                    <h4>Diar Peci</h4>
                </div>
            </div>
            <p className="copy">&copy; 2026 Hekuraria Driloni AD. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Footer