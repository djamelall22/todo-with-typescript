import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
// ;
// ;
// MdDone;

interface SingleToddoProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleToddo: React.FC<SingleToddoProps> = ({ todo, todos, setTodos }) => {
  const [editStaus, setEditStatus] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editStaus]);

  // delete
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // is done
  const handelIsDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handelEddit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEditStatus(false);
  };

  return (
    <form className="todos__single" onSubmit={(e) => handelEddit(e, todo.id)}>
      {editStaus ? (
        <input
          ref={inputRef}
          className="todos__single--text"
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        {/* update todo */}
        <span
          className="icon"
          onClick={() => {
            if (!todo.isDone && !editStaus) {
              setEditStatus(!editStaus);
            }
          }}
        >
          <AiFillEdit />
        </span>

        {/* delete */}
        <span className="icon">
          <AiFillDelete onClick={() => deleteTodo(todo.id)} />
        </span>

        {/* is done? */}
        <span className="icon" onClick={() => handelIsDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};
export default SingleToddo;
