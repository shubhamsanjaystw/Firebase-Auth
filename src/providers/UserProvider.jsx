import React, { Component, createContext, useState, useEffect } from "react";
import { auth, generateUserDocument } from "../firebase";


export const UserContext = createContext({ user: null });

// class UserProvider extends Component {
  const UserProvider = (props) => {
  // state = {
  //   user: null
  // };

    const [test, setTest] = useState({ user: null })
  
  
  // componentDidMount = async () => {
  //   auth.onAuthStateChanged(async userAuth => {
  //     const user = await generateUserDocument(userAuth);

  //     // this.setState({ user });
  //     setUser({ user })
  //   });
  // };

  useEffect(async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);

      // this.setState({ user });
      setTest({ user })
    });
    
  }, [])

  
    const { user } = test;

    return (
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    );
  
}

export default UserProvider;