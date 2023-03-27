import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./fire";

export const AppContext = createContext();
export const ModalContext = createContext();
export const SearchContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function useModalContext() {
  return useContext(ModalContext);
}

export function useSearchContext() {
  return useContext(SearchContext);
}

export function AppContextProvider({ children }) {
  const [fb_user, fa_userStateHandler] = useState("");
  const [user, userStateHandler] = useState(null);
  const [modalOpen, modalStateHandler] = useState(true);
  const [notes, notesHandler] = useState(null);
  const [searchRes, searchResHandler] = useState(null);

  const signinProcess = () => {
    console.log("signinProcess");
    signInAnonymously(auth).catch((error) => {
      console.error(error);
    });

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const uid = authUser.uid;
        console.log("authUser", uid);
        // firebase login
        fa_userStateHandler(uid);
      } else {
        // firebase logout
        fa_userStateHandler("");
      }
    });
  };

  const fb_updateUser = async (username, data) => {
    if (!username) return false;
    const docRef = doc(db, "users", username);
    const date = Date.now();
    const dateStr =
      new Date(date).toLocaleDateString() +
      " " +
      new Date(date).toLocaleTimeString();
    data
      ? await updateDoc(docRef, data)
      : await setDoc(docRef, {
          date_reg: date,
          date_acc: date,
          date_reg_local: dateStr,
          date_acc_local: dateStr,
          settings: {},
          tasks: [],
        });
  };

  useEffect(() => {
    // change app title
    document.title = "Smit's Notes App";

    // make firebase signin
    signinProcess();
  }, []);

  // will work when we get firebase userid
  useEffect(() => {
    if (fb_user) {
      let defaultUser = localStorage.getItem("adventure_user");
      if (defaultUser !== null && defaultUser !== "") {
        // there is an active/inactive user present in system
        console.log("Local user found...", defaultUser);

        const date = Date.now();
        const dateStr =
          new Date(date).toLocaleDateString() +
          " " +
          new Date(date).toLocaleTimeString();

        userStateHandler(defaultUser);
        fb_updateUser(defaultUser, {
          date_acc: date,
          date_acc_local: dateStr,
        });
      }
    }
  }, [fb_user]);

  // useEffect(() => {
  //   if (user !== null) {
  //     localStorage.setItem("adventure_user", user);
  //     console.log("Local user updated...", user);
  //     fb_updateUser(user);
  //   }
  // }, [user]);

  return (
    <AppContext.Provider
      value={{ user, userStateHandler, notes, notesHandler }}
    >
      <SearchContext.Provider value={{ searchRes, searchResHandler }}>
        <ModalContext.Provider value={{ modalOpen, modalStateHandler }}>
          {children}
        </ModalContext.Provider>
      </SearchContext.Provider>
    </AppContext.Provider>
  );
}
