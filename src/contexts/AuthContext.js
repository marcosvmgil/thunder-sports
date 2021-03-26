import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response)
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
      };
      const usersRef = firestore.collection("users");
      usersRef
        .doc(uid)
        .set(data)
        // .then(() => {
        //   navigation.navigate("MenuDrawer", {
        //     screen: "MenuDrawer",
        //     params: { user: data },
        //   });
        // })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response)
      const uid = response.user.uid;
      const usersRef = firestore.collection("users");
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            alert("User does not exist anymore.");
            return;
          }

          //const user = firestoreDocument.data();
          // navigation.navigate("MenuDrawer", {
          //   screen: "MenuDrawer",
          //   params: { user: user },
          // });
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
