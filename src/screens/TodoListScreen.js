import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true, successCreate: false };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
        successCreate: true,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false, successCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return {
        ...state,
        loadingDelete: false,
        successDelete: false,
        successCreate: false,
      };
    default:
      return state;
  }
};

export default function TodoListScreen(props) {
  const [
    {
      loading,
      error,
      todos,
      loadingCreate,
      loadingDelete,
      successDelete,
      successCreate,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const [name, setName] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure to create?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        await axios.post(`/api/todo`, { name });
        toast.success("todo created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
      } catch (err) {
        console.log(err);
        toast.error("An error occured");
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (todo) => {
    console.log(todo);
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/todo/${todo.id}`);
        toast.success("todo deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error("Delete failed");
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/todos`);

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };
    if (successDelete || successCreate) {
      dispatch({ type: "DELETE_RESET" });
      setName("");
    } else {
      fetchData();
    }
  }, [successCreate, successDelete]);

  return (
    <Container>
      <div className="mt-2">
        <h1>Create a to do item</h1>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          <div className="mt-3 mb-3">
            <Button type="submit">Submit todo</Button>
          </div>
        </Form.Group>
      </Form>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <h2>Total items created: {todos.length}</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>Item Names</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.name}</td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => navigate(`/single/todo/${todo.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteHandler(todo)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
