import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import NavBar from "./NavBar";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "./Googlebtn.css"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, loginGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senhas são diferentes");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/select-favorites");
    } catch {
      setError("Falha ao criar a conta");
    }

    setLoading(false);
  }

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
      if (currentUser !== null) {
        try {
          setError("");
          setLoading(true);
          // signupGoogle(currentUser);
          history.push("/select-favorites");
        } catch {
          setError("Falha ao criar a conta");
        }
        setLoading(false);
      }
    });
  });

  return (
    <>
      <NavBar></NavBar>
      <div
        className="w-100"
        style={{
          position: "relative",
          marginTop: "25vh",
          maxWidth: "400px",
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Criar Conta</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirmação da Senha</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Próximo
              </Button>
              <div className="d-flex justify-content-center">
                  <button className="GoogleSignIn" onClick={() => loginGoogle()}>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/G-on-white.svg" alt="Google logo" />
                    <span class="GoogleSignIntext">Registre-se usando o Google</span>
                  </button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2 text-white">
          Já tem uma conta? <Link to="/login">Entre</Link>
        </div>
      </div>
    </>
  );
}
