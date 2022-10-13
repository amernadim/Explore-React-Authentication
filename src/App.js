import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';


 const auth = getAuth(app)
  
function App() {
  const [user,setUser] = useState({})
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const hanldeGoogleSingIn = () => {
    signInWithPopup(auth ,  googleProvider)
    .then(resilt => {
      const user = resilt.user;
      setUser(user)
      console.log(user);
    })
    .then (error => {
      console.error(error);
    })
  }

  const hanldeSingOut = () => {
    signOut(auth)
    .then(() => {
      setUser({})
    })
    .catch(() => {
      setUser({})
    })
  }
 const hanldeGithubSingIn = () => {
   signInWithPopup(auth , githubProvider)
   .then((result)=> {
    const user = result.user;
    setUser(user)
    console.log(user);
   })
   .catch(error => {
    console.error(error);
   })
 }

  return (
    <div className="App">
      {
        user.uid ? 
        <button onClick={hanldeSingOut}>Sing Out</button>
        :
      <>
      <button onClick={hanldeGoogleSingIn}>Google Sing In</button>
      <button onClick={hanldeGithubSingIn}>Gothub Sing In</button>
      </>
      }


    { user.uid &&
     <div>
      <h1>user Name : {user.displayName}</h1>
      <p>user Email : {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
    }
    </div>
  );
}

export default App;
