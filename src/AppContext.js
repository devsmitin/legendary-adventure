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
  const [modalOpen, modalStateHandler] = useState(false);
  const [editData, editDataHandler] = useState(null);
  const [searchRes, searchResHandler] = useState(null);

  useEffect(() => {
    // change app title
    document.title = "Smit's Notes App";

    // make firebase signin
    signinProcess();
  }, []);

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

  // will work when we get firebase userid
  useEffect(() => {
    if (fb_user) {
      let defaultUser = localStorage.getItem("adventure_user");
      if (defaultUser !== null && defaultUser !== "null") {
        // there is an active/inactive user present in system

        console.log("Local user found...", defaultUser);
        userStateHandler(defaultUser);
      } else {
        // there is no active/inactive user present in system

        const newUser = randomUsername();
        console.log("Local user generated...", newUser);
        userStateHandler(newUser);
      }
    }
  }, [fb_user]);

  const randomUsername = () => {
    const d_obj = new Date(Date.now()),
      first_two = parseInt(Math.random() * 39) + 10,
      last_four =
        d_obj.getMilliseconds() +
        d_obj.getSeconds() +
        parseInt(Math.random() * 7999) +
        1000;

    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const random_letter =
      alphabets[Math.floor(Math.random() * alphabets.length)];

    return "dz_" + random_letter + first_two + "-" + last_four;
  };

  const fb_updateUser = async (username, data) => {
    if (!username) return false;
    const docRef = doc(db, "users", username);
    data
      ? await updateDoc(docRef, data)
      : await setDoc(docRef, {
          date_reg: Date.now(),
          date_acc: Date.now(),
          settings: {},
          tasks: [],
        });
  };

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("adventure_user", user);
      console.log("Local user updated...", user);
      fb_updateUser(user);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{ user, userStateHandler, editData, editDataHandler }}
    >
      <SearchContext.Provider value={{ searchRes, searchResHandler }}>
        <ModalContext.Provider value={{ modalOpen, modalStateHandler }}>
          {children}
        </ModalContext.Provider>
      </SearchContext.Provider>
    </AppContext.Provider>
  );
}
