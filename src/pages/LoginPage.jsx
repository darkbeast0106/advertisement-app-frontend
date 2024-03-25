import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { login, authToken } = authContext;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    login(email, password);
  };

  useEffect(() => {
    if (authToken) {
      navigate("/user-profile")
    }
  }, [authToken, navigate]);

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Bejelentkezés</h2>
      <div className="mb-3">
        <label className="form-label" htmlFor="loginEmail">
          E-mail:
        </label>
        <input
          className="form-control"
          type="email"
          id="loginEmail"
          placeholder="E-mail"
          ref={emailRef}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="loginPassword">
          Jelszó
        </label>
        <input
          className="form-control"
          type="password"
          id="loginPassword"
          placeholder="Jelszó"
          ref={passwordRef}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Bejelentkezés
      </button>
    </form>
  );
}

export default LoginPage;
