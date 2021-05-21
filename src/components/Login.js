import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import NavBar from "./NavBar";
import "./Googlebtn.css"

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let response = await login(emailRef.current.value, passwordRef.current.value);
      if (response.code === "auth/wrong-password"){
        throw "Email e senha não conferem";
      }
      history.push("/");
    } catch (e){
      (e == "Email e senha não conferem") ? setError(e) : setError("Falha ao logar");
    }

    setLoading(false);
  }

  useEffect(() => {
    console.log(currentUser)
    const authObserver = firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser)
      if (currentUser !== null) {
        try {
          setError("")
          setLoading(true)
          // signinGoogle(currentUser);
          history.push("/")
        } catch {
          setError("Falha ao criar a conta")
        }
        setLoading(false)
      }
    })
  })

  return (
    <>
      <NavBar></NavBar>
      <div className="w-100" style={{ position: "relative", marginTop: "25vh", maxWidth: "400px", alignSelf: "center", marginLeft: "auto", marginRight: "auto" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Entrar</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  placeholder="insira seu e-mail"
                  type="email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  placeholder="insira sua senha"
                  type="password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button disabled={loading} className="w-40 btn-lg" type="submit">
                  Entrar
                </Button>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="GoogleSignIn" onClick={() => loginGoogle()}>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/G-on-white.svg" alt="Google logo" />
                    <span class="GoogleSignIntext">Fazer login com Google</span>
                  </button>
              </div>

            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Esqueceu a senha?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2 text-white">
          Não tem conta? <Link to="/signup">Cadastre-se</Link>
        </div>
      </div>
    </>
  );
}
