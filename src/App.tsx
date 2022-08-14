import React from "react";
import InputField from "./components/InputField";
import { useState } from "react";

import "./App.css";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handelAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const id: number = +new Date();
      setTodos([...todos, { id, todo, isDone: false }]);
      setTodo("");
    }
  };

  console.log("component updated: ", todos);

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handelAddTodo={handelAddTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
