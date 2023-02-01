import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import Api from "../api";

function ToDoItems({ data, getData }) {
  // Handles a single item delete
  const handleDelete = async () => {
    try {
      // Makes delete request
      await Api.delete(`/todos/${data._id}`);

      // Then makes a Get reqeust after to get to output
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ListGroup.Item>
        {data.title}
        <Button
          className="remove-button"
          onClick={() => {
            handleDelete();
          }}
        >
          Remove Item
        </Button>
      </ListGroup.Item>
    </>
  );
}

export default ToDoItems;
