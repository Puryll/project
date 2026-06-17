import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (email === "YllPllana11@outlook.com" && password === "Alyrap1234") {
      localStorage.setItem("adminAccess", "true");
      navigate("/secret");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("adminAccess", "true");
      navigate("/secret");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }

  return (
    <>
      <Navbar />
      <main className="login-page">
        <section className="login-panel">
          <h2>Hyrje</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Fjalëkalim
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="btn primary" type="submit">Hyr</button>
          </form>

        </section>
      </main>
      <Footer />
    </>
  );
}
