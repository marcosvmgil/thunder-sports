import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import Navbar from "react-bootstrap/Navbar";
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senhas Estão Divergindo")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Falha ao Atulaizar a Conta")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
        <Navbar
        style={{ background: "#7C7878" }}
        fixed="top"
      >
        <Navbar.Brand>
          <Link to="/">
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
          <h2 className="text-center mb-4">Atualizar Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Deixe em branco para mantê-la"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmação da Senha</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Deixe em branco para mantê-la"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Atualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancelar</Link>
      </div>
    </>
  )
}
