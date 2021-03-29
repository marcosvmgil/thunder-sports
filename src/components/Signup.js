import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Dropdown } from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Select from "react-select"
import {NBATeams} from "./ComboOptions"
import firebase from "firebase/app"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


export default function Signup() {
  // não sei aonde colocar, tem que fazer um hook do currentUser do AuthContext"
  var uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        return false;
      }
    }
  }

  
  // useEffect(() => {
  //   const authObserver = firebase.auth().onAuthStateChanged((currentUser) => {
  //     setCurrentUser(currentUser)
  //   })
  // })

  

  // **********************************
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [teamNBA, setTeamNBA] = useState("")
  const [valueTeamNBA, setValueTeamNBA] = useState(null)
  // const drop = ['eu', 'tu'];

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value, teamNBA)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  const handleNBATeam = (e) => {
    setTeamNBA(e)
    // console.log(teamNBA)
  }            

  return (
    <>
    <Navbar
        style={{ background: "#7C7878" }}
        fixed="top"
      >
        <Navbar.Brand>
          <Link to="/login">
            <img
              src="../../public/logo.png"
              width="75"
              height="30"
              className="d-inline-block align-top"
              alt="ThundeSports logo"
            />
          </Link>
        </Navbar.Brand>
      </Navbar>
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
            {/*Ui Login do google*/}
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            {/**/}
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 text-white">
        Já tem uma conta? <Link to="/login">Entre</Link>
      </div>
    </>
  )
}
