import React, { useEffect, useState } from "react";

import ToDoItems from "../components/ToDoItems";

import { Button, Container, Form, ListGroup } from "react-bootstrap";
import Api from "../api";

import { useNavigate } from "react-router-dom";

function ToDoList() {
  // User data state
  const [todos, setTodos] = useState([]);

  // Holdes current input
  const [input, setInput] = useState("");

  // This will get the token again
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  async function getData() {
    try {
      // This gets fired once the page is ready
      const res = await Api.get("/todos");

      setTodos(res);
    } catch (error) {
      console.log(error);
    }
  }

  // This will remove the token from local storage once a user logs out
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = async (data) => {
    try {
      // POST request
      // This sends the post request
      const newTodo = await Api.post("/todos", { title: data });

      // Sets new todos
      setTodos((todos) => [...todos, newTodo]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // This will handle the case of if a user does not have a token they will
    // be redirected to the login page
    if (!token) {
      window.location.href = "/login";
    }
    getData();
  }, []);

  return (
    <Container>
      <div>
        <div>
          <Button
            className="add-button"
            variant="primary"
            onClick={() => {
              handleLogOut();
            }}
          >
            Log Out
          </Button>
        </div>
        <h1>My To-Do list</h1>
        <h5>What would you like to do?</h5>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(input);
            setInput("");
          }}
        >
          <Form.Group>
            <Form.Label>Enter Todo:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Fuel up the car."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form.Group>
          <Button className="add-button" variant="primary" type="submit">
            Add
          </Button>
        </Form>

        {/* Here is where the todos are then mapped so that they can be displayed */}
        <ListGroup>
          {todos.map((data, index) => (
            <ToDoItems key={index} data={data} getData={getData} />
          ))}
        </ListGroup>
      </div>
    </Container>
  );
}

export default ToDoList;
