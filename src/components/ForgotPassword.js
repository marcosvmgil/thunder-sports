import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Cheque seu email para mais instruções");
    } catch {
      setError("Falha ao tentar recuperar a senha");
    }

    setLoading(false);
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="w-100" style={{ position: "relative", marginTop: "25vh", maxWidth: "400px", alignSelf: "center", marginLeft: "auto", marginRight: "auto" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Recuperar Senha</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Recuperar Senha
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Entrar</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Não tem conta? <Link to="/signup">Cadastre-se</Link>
        </div>
      </div>
    </>
  );
}
