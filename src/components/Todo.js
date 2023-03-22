import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../fire";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [localUser, setLocalUser] = useState(null);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todoList"), {
        todo: todo,
        user: localUser.username,
      });
      const obj = {
        id: docRef.id,
        todo: todo,
        user: localUser.username,
      };
      setTodoList([...todoList, obj]);
      setTodo("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchPost = async () => {
    await getDocs(collection(db, "todoList")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodoList(newData);
    });
  };

  const aRandomLetter = () => {
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

  const setRandom = async (username) => {
    console.log(" localUser", username);
    await setDoc(doc(db, "users", username), {
      date_reg: "",
      date_acc: "",
      settings: {},
      tasks: [],
    });
  };

  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.error(error);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const username = aRandomLetter();
        setLocalUser({ uid, username });
        // setRandom(username);
        fetchPost();
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <section className="todo-container">
      <div className="todo">
        <div>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">
          {todoList?.map((todo, i) => {
            return <p key={i}>{todo.todo}</p>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Todo;
