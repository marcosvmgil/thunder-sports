import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import NavBar from "./NavBar";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../firebase"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const [ userData, setUserData ] = useState({})
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  
  async function getUserdata(){
    await firestore.collection("users")
    .doc("" + currentUser.uid).get().then((document) => {
      setUserData(document.data())
    });
  }
  // async function getTeamsAux(){
  //   // console.log(await getTeams())
  //   let teamsaux = await getCircuitByCompetitionId('22')
  //   console.log(teamsaux)
  //   setTeams(teamsaux)
  // }

  useEffect(() => {
    getUserdata()
    // getTeamsAux()
  },[])

  return (
    <>
     <NavBar></NavBar>
     <div className="w-100" style={{ position: "relative", marginTop: "25vh", maxWidth: "400px", alignSelf: "center", marginLeft: "auto", marginRight: "auto" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          {(userData.likeNBA && userData.NBATeam !== undefined) && (
            <div>
            <strong>Time NBA favorito:</strong> {userData.NBATeam.fullName}
            </div>
          )}
          {(userData.likeF1 && userData.F1Team !== undefined) && (
            <div>
            <strong>Time F1 favorito:</strong> {userData.F1Team.name}
            </div>
          )}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Atualizar Perfil
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Deslogar
        </Button>
      </div>
    </div>
    </>
  )
}
