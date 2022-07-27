import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";

const AddTodo: NextPage = () => {
  const [title, setTitle] = useState<string>(""); // Title
  const [description, setDescription] = useState<string>(""); // Description
  const [error, setError] = useState<string>(""); // Error
  const [message, setMessage] = useState<string>(""); // Message

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Avoids default behaviour

    if (!title || !description) {
      return setError("All fields are required.");
    }
    addTodo();
  };

  const addTodo = async () => {
    // Gets the current timestamp
    const timestamp: string = Date.now().toString();
    // Creates a pointer to the document
    const _todo = doc(firestore, `todos/${timestamp}`);
    // Structure the todo data
    const todoData = {
      title,
      description,
      done: false,
    };
    try {
      // Add the document
      await setDoc(_todo, todoData);
      // show a success message
      setMessage("Todo added successfully");
      // Reset fields
      setTitle("");
      setDescription("");
    } catch (error) {
      // Show an error message
      setError("An error occured while adding todo");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Add todo</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}>Add todo</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error ? (
            <div className={styles.formGroup}>
              <p className={styles.error}>{error}</p>
            </div>
          ) : null}
          {message ? (
            <div className={styles.formGroup}>
              <p className={styles.success}>
                {message}. Proceed to <a href="/">Home</a>
              </p>
            </div>
          ) : null}
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Todo title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              placeholder="Todo description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
