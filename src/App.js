import Layout from "./components/Layout";
import logo from "./assets/dashboard.png";
import Auth from "./components/Auth";
import { useState } from "react";

const App = () => {
  const [auth, setAuth] = useState(false);
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
    <>
      {auth ? (
        <Layout logo={logo}>
          Content
        </Layout>
      ) : (
        <Auth open={open} isOpen={setOpen} authUser={checkUser} />
      )}
    </>
  );
};

export default App;
