import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {register, authToken} = authContext;

  useEffect(() => {
    if (authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    if (await register(email, password, name)) {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Regisztráció</h2>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          E-mail:
        </label>
        <input
          className="form-control"
          type="email"
          id="email"
          placeholder="E-mail"
          ref={emailRef}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          Jelszó
        </label>
        <input
          className="form-control"
          type="password"
          id="password"
          placeholder="Jelszó"
          ref={passwordRef}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">
          Név
        </label>
        <input
          className="form-control"
          type="text"
          id="name"
          placeholder="Név"
          ref={nameRef}
        />
      </div>
      <button className="btn btn-primary" type="submit">Regisztráció</button>
    </form>
  );
}

export default RegisterPage;
