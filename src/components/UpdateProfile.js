import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "./NavBar";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { getTeamsById } from "../contexts/NBAContext";
import { getTeamById } from "../contexts/F1Context";
import { firestore } from "../firebase";
import { NBATeams, F1Teams } from "./ComboOptions";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [teamNBA, setTeamNBA] = useState("");
  const [teamF1, setTeamF1] = useState("");
  const [favoriteNBA, setFavoriteNBA] = useState();
  const [favoriteF1, setFavoriteF1] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senhas Estão Divergindo");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    const user = firestore.collection("users").doc(`${currentUser.uid}`);

    // user.get().then((document) => {
    user.update({
      email: emailRef.current.value,
      id: currentUser.uid,
      likeF1: !favoriteF1,
      F1Team: await getTeamById(teamF1.value),
      likeNBA: !favoriteNBA,
      NBATeam: await getTeamsById(teamNBA.value),
    });

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Falha ao Atualizar a Conta");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function getUserdata() {
    await firestore
      .collection("users")
      .doc(`${currentUser.uid}`)
      .get()
      .then((document) => {
        setFavoriteNBA(!document.data().likeNBA);
        setFavoriteF1(!document.data().likeF1);
        if(document.data().NBATeam !== undefined){
          setTeamNBA({
            value: document.data().NBATeam.teamId,
            label: document.data().NBATeam.fullName,
          });
        }
        console.log(document.data().F1Team)
        if(document.data().F1Team !== undefined){
          setTeamF1({
            value: document.data().F1Team.id,
            label: document.data().F1Team.name,
          });
        }
      });
  }

  useEffect(() => {
    getUserdata();
    console.log(favoriteF1);
    console.log(favoriteNBA);
  }, []);

  const handleNBATeam = (e) => {
    setTeamNBA(e);
  };

  const handleF1Team = (e) => {
    setTeamF1(e);
  };

  const handleSelectionNBA = () => {
    favoriteNBA == true ? setFavoriteNBA(false) : setFavoriteNBA(true);
    if (!favoriteNBA) {
      setTeamNBA({});
    } else {
      firestore
        .collection("users")
        .doc(`${currentUser.uid}`)
        .get()
        .then((document) => {
          if(document.data().NBATeam !== undefined){
          setTeamNBA({
            value: document.data().NBATeam.teamId,
            label: document.data().NBATeam.fullName,
          });
        }
        });
    }
  };

  const handleSelectionF1 = () => {
    favoriteF1 == true ? setFavoriteF1(false) : setFavoriteF1(true);
    if (!favoriteF1) {
      setTeamF1({});
    } else {
      firestore
        .collection("users")
        .doc(`${currentUser.uid}`)
        .get()
        .then((document) => {
          if(document.data().F1Team !== undefined){
          setTeamF1({
            value: document.data().F1Team.id,
            label: document.data().F1Team.name,
          });
        }
        });
    }
  };

  function deleteUser(e) {
    const user = firestore.collection("users").doc(`${currentUser.uid}`);

    console.log("aqui");
    try {
      currentUser.delete().then(() => {
        console.log(currentUser.uid);
        user.delete();
      });
      history.push("/login");
    } catch {
      setError("Falha ao deletar a conta");
      console.log("error");
    }
  }

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
              <Form.Group controlId="formBasicCheckbox">
                <Form.Label>Ligas</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="NBA"
                  checked={!favoriteNBA}
                  onChange={handleSelectionNBA}
                />
                <Select
                  isDisabled={favoriteNBA}
                  placeholder="Time favorito"
                  value={teamNBA}
                  onChange={handleNBATeam}
                  options={NBATeams}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Formula 1"
                  checked={!favoriteF1}
                  onChange={handleSelectionF1}
                />
                <Select
                  isDisabled={favoriteF1}
                  placeholder="Time favorito"
                  value={teamF1}
                  onChange={handleF1Team}
                  options={F1Teams}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Atualizar
              </Button>
              <Button
                disabled={loading}
                style={{ marginTop: "5px" }}
                className="w-100 btn btn-danger"
                onClick={deleteUser}
              >
                Apagar Conta
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancelar</Link>
        </div>
      </div>
    </>
  );
}
