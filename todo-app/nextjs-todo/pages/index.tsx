import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { firestore } from "../firebase/clientApp";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";

import { useState, useEffect } from "react";

const todosCollection = collection(firestore, "todos");

const Home: NextPage = () => {
  const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // fetching todo objects and resetting every 2s
  useEffect(() => {
    // get todos
    getTodos();
    // reset loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const todosCollection = collection(firestore, "todos");

  const getTodos = async () => {
    // construct query to get up to 10 undone todos
    const todosQuery = query(
      todosCollection,
      where("done", "==", false),
      limit(10)
    );
    // get the todos
    const querySnapshot = await getDocs(todosQuery);

    // map through todos, adding them to an array
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    // set it to state
    setTodos(result);
  };

  const updateTodo = async (documentId: string) => {
    // Creates a pointer to the document id
    const _todo = doc(firestore, `todos/${documentId}`);
    // Update the doc by setting done to true
    await updateDoc(_todo, {
      done: true,
    });
    // Retrieves todo
    getTodos();
  };

  const deleteTodo = async (documentId: string) => {
    // Creates a pointer to the Document id
    const _todo = doc(firestore, `todos/${documentId}`);
    // Deletes the doc
    await deleteDoc(_todo);
    // Retrieves todos
    getTodos();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Todos app</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Todos app</h1>

        <div className={styles.grid}>
          {loading ? (
            <div className={styles.card}>
              <h2>Loading</h2>
            </div>
          ) : todos.length === 0 ? (
            <div className={styles.card}>
              <h2>No undone todos</h2>
              <p>
                Consider adding a todo from <a href="/add-todo">here</a>
              </p>
            </div>
          ) : (
            todos.map((todo) => {
              return (
                <div className={styles.card}>
                  <h2>{todo.data().title}</h2>
                  <p>{todo.data().description}</p>
                  <div className={styles.cardActions}>
                    <button type="button" onClick={() => updateTodo(todo.id)}>
                      Mark as done
                    </button>
                    <button type="button" onClick={() => deleteTodo(todo.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="#" rel="noopener noreferrer">
          Todos app
        </a>
      </footer>
    </div>
  );
};
export default Home;
