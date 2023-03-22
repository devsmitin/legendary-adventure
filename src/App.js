import { useState } from "react";
import { AppContextProvider } from "./AppContext";
import Layout from "./components/Layout";
import AuthModal from "./components/AuthModal";
import Todo from "./components/Todo";

import logo from "./assets/dashboard.png";

const App = () => {
  const [auth, setAuth] = useState(true);
  const [open, setOpen] = useState(true);

  const checkUser = (id) => {
    console.log("id", id);
    if (id === "1234") {
      setAuth(true);
      setOpen(false);
    } else {
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 200);
    }
  };

  return (
    <AppContextProvider>
      {auth ? (
        <Layout logo={logo}>
          {/* <Todo /> */}
          test
        </Layout>
      ) : (
        <AuthModal open={open} isOpen={setOpen} authUser={checkUser} />
      )}
    </AppContextProvider>
  );
};

export default App;
