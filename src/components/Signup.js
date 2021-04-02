import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Dropdown } from "react-bootstrap";
import NavBar from "./NavBar";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { NBATeams } from "./ComboOptions";
import firebase from "firebase/app";
import { auth, authUI } from "../firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getTeamsById } from "../contexts/NBAContext";


export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, signupGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [teamNBA, setTeamNBA] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senhas são diferentes");
    }

    try {
      // console.log(teamNBA.value)
      let NBATeam = await getTeamsById(teamNBA.value);
      // console.log(NBATeam)
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, NBATeam);
      history.push("/");
    } catch {
      setError("Falha ao criar a conta");
    }

    setLoading(false);
  }

  const handleNBATeam = (e) => {
    setTeamNBA(e);
    // console.log(teamNBA)
  };

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

  let uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        return false;
      },
    },
  };

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
      if (currentUser !== null) {
        try {
          setError("");
          setLoading(true);
          let NBATeam = getTeamsById(teamNBA.value);
          signupGoogle(currentUser, NBATeam);
          history.push("/");
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
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>NBA</Form.Label>
              <Select
                placeholder="Time favorito"
                value={teamNBA}
                onChange={handleNBATeam}
                options={NBATeams}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>NBA</Form.Label>
              <Select
                placeholder="Time favorito"
                value={teamNBA}
                onChange={this.handleNBATeam}
                options={NBATeams}
              />
            </Form.Group> */}
            <Button disabled={loading} className="w-100" type="submit">
              Criar Conta
            </Button>
            {/* <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />  */}
            <div className="google-login"></div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 text-white">
        Já tem uma conta? <Link to="/login">Entre</Link>
      </div>
    </>
  );
}
