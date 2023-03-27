import {
  AppContextProvider,
  useAppContext,
  useModalContext,
} from "./AppContext";
import Layout from "./components/Layout";
import AuthModal from "./components/AuthModal";
// import Todo from "./components/Todo";

import logo from "./assets/dashboard.png";
import { randomUsername } from "./helper";
import { useState } from "react";

const AppChildren = () => {
  const modalContext = useModalContext();
  let { modalOpen, modalStateHandler } = modalContext;

  const appContext = useAppContext();
  let { user, userStateHandler } = appContext;

  const [authState, authStateHandler] = useState(false);

  const addNewUser = () => {
    // there is no active/inactive user present in system
    const newUser = randomUsername();
    console.log("Local user generated...", newUser);
    // userStateHandler(newUser);
  };

  const authUser = (id) => {
    console.log("id", id);
    if (false) {
      addNewUser();
    }
  };

  let view = (
    <AuthModal
      modalState={modalOpen}
      modalToggle={modalStateHandler}
      checkUser={authUser}
    />
  );

  if (authState) {
    view = (
      <Layout logo={logo}>
        {/* <Todo /> */}
        test
      </Layout>
    );
  }
  return view;
};

const App = () => {
  return (
    <AppContextProvider>
      <AppChildren />
    </AppContextProvider>
  );
};

export default App;
