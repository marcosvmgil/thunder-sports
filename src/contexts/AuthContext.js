import React, { useContext, useState, useEffect } from "react";
import firebase, { auth, firestore } from "../firebase";

const AuthContext = React.createContext();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // console.log(response);
        // console.log(response.user.uid);
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
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
        return(error);
      });
  }
  
  // async function loginGoogle() {
  //   firebase.auth()
  //     .signInWithPopup(googleProvider)
  //     .then((response) => {
  //       console.log(response)
  //       const uid = response.user.uid;
  //       const usersRef = firestore.collection("users");
  //       usersRef
  //         .doc(uid)
  //         .get()
  //         .then((firestoreDocument) => {
  //           if (!firestoreDocument.exists) {
  //             // alert("Usuário não existe mais.");
  //             return;
  //           }
  //         })
  //         .catch((error) => {
  //           alert(error);
  //         })
  //         }).catch((error) => {
  //           console.log(error)
  //         });
  //     }

  async function loginGoogle() {
  
    return firebase.auth()
      .signInWithPopup(googleProvider)
      .then((response) => {
        console.log(response);
        console.log(response.user.uid);
        const uid = response.user.uid;
        const email = response.user.email;
        const data = {
          id: uid,
          email,
          // teamNBA,
        };
        // var user = response.user;
        const usersRef = firestore.collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .catch((error) => {
            console(error);
          });
      }).catch((error) => {
        console.log(error)
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
    loginGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
