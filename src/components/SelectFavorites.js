import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import NavBar from "./NavBar";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { NBATeams, F1Teams } from "./ComboOptions";
import { getTeamsById } from "../contexts/NBAContext";
import { getTeamById } from "../contexts/F1Context";
import { firestore } from "../firebase";

export default function SelectFavorites() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [teamNBA, setTeamNBA] = useState("");
  const [teamF1, setTeamF1] = useState("");
  const { currentUser } = useAuth();
  const [favoriteNBA, setFavoriteNBA] = useState(true);
  const [favoriteF1, setFavoriteF1] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let NBATeam = await getTeamsById(teamNBA.value);
      let F1Team = await getTeamById(teamF1.value);
      setError("");
      setLoading(true);
      const uid = currentUser.uid;
      const email = currentUser.email;
      let likeNBA = !favoriteNBA;
      let likeF1 = !favoriteF1;
      console.log(NBATeam.fullName)
      console.log("aqui " + F1Team.name)
      const data = {
        id: uid,
        email,
        likeNBA,
        NBATeam,
        likeF1,
        F1Team,
      };
      // console.log(data)
      const usersRef = firestore.collection("users");
      usersRef
        .doc(uid)
        .set(data)
        .catch((error) => {
            setError(error);
        });

      history.push("/");
    } 
    catch {
      setError("Falha ao criar a conta");
    }

    setLoading(false);
  }

  const handleNBATeam = (e) => {
    setTeamNBA(e);
  };

  const handleF1Team = (e) => {
    setTeamF1(e);
  };

  const handleSelectionNBA = () => {
    favoriteNBA == true ? setFavoriteNBA(false) : setFavoriteNBA(true);
    if(!favoriteNBA){
      setTeamNBA({})
    }
  };

  const handleSelectionF1 = () => {
    favoriteF1 == true ? setFavoriteF1(false) : setFavoriteF1(true);
    if(!favoriteF1){
      setTeamF1({})
    }
  };

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
            <h2 className="text-center mb-4">
              Selecionar Ligas e Times Favoritos
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Label>Ligas</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="NBA"
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
                Criar Conta
              </Button>
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
