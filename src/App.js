import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoListScreen from "./screens/TodoListScreen";
import { ToastContainer } from "react-toastify";
import EditTodoScreen from "./screens/EditTodoScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <Routes>
          <Route path="/" element={<TodoListScreen />} />
          <Route path="/single/todo/:id" element={<EditTodoScreen />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
