import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../firebase"
// import {getLeagues} from "../contexts/NBAContext"

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
  async function getLeagueData(){

  }

  useEffect(() => {
    getUserdata()
    getLeagueData()
  },[])

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Atualizar Perfil
          </Link>
          <Card>{userData.id}</Card>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Deslogar
        </Button>
      </div>
    </>
  )
}
