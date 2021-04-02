import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from '../images/logo.png';
import NavBar from "./NavBar";
import { auth, authUI } from "../firebase";



export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signinGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

  const history = useHistory();



  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Falha ao logar");
    }

    setLoading(false);
  }

  // let uiConfig = {
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  //   signInFlow: 'popup',
  //   callbacks: {
  //     signInSuccessWithAuthResult: () => {
  //       return false;
  //     }
  //   }
  // }

  auth.onAuthStateChanged((currentUser) => setCurrentUser(currentUser))

  useEffect(() => {
    if (!currentUser) {
      authUI.start(".google-login", {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: () => {
            return false;
          }
        }
      })
    }
  }, [currentUser])


  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser)
      if (currentUser !== null) {
        try {
          setError("")
          setLoading(true)
          signinGoogle(currentUser);
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
            <div className="google-login"></div>
            {/* <StyledFirebaseAuth
              uiCallback={ui => ui.setConfig}
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            /> */}
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 text-white">
        Não tem conta? <Link to="/signup">Cadastre-se</Link>
      </div>
    </>
  );
}
