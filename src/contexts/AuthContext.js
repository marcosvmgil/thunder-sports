import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, teamNBA = {}) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // console.log(response);
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          teamNBA,
        };
        // console.log(data)
        const usersRef = firestore.collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  }

  function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // console.log(response);
        const uid = response.user.uid;
        const usersRef = firestore.collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              // alert("Usuário não existe mais.");
              return;
            }
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  }

  async function signupGoogle(user, NBAteam) {
    setCurrentUser(user);
    const uid = user.uid;
    const email = user.email;
    const teamNBA = await NBAteam;
    const data = {
      id: uid,
      email,
      teamNBA,
    };
    // console.log(data)
    const usersRef = firestore.collection("users");
    usersRef
      .doc(uid)
      .set(data)
      .catch((error) => {
        alert(error);
      });
  }

  function signinGoogle(user) {
    setCurrentUser(user);
    const uid = user.uid;
    const usersRef = firestore.collection("users");
    usersRef
      .doc(uid)
      .get()
      .then((firestoreDocument) => {
        if (!firestoreDocument.exists) {
          // alert("Usuário não existe mais.");
          return;
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signupGoogle,
    signinGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
