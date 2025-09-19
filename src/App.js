import React, { useState, useEffect } from "react";
import "./styles.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const tarefasPendentes = todos.filter((todo) => !todo.completed).length;

  // 1️⃣ Carregar do localStorage quando o componente montar
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // 2️⃣ Salvar no localStorage sempre que "todos" mudar
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todo-app">
      <h1>Minha Lista de Tarefas 📝</h1>

      <p className="task-counter">
        {tarefasPendentes === 0
          ? "Todas as tarefas concluídas 🎉"
          : `Tarefas pendentes: ${tarefasPendentes}`}
      </p>

      <div className="input-section">
        <input
          className="todo-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Digite uma tarefa..."
        />
        <button className="add-button" onClick={addTodo}>
          Adicionar
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              className={`todo-text ${todo.completed ? "completed" : ""}`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <div className="todo-actions">
              <button
                onClick={() => toggleComplete(todo.id)}
                className={`action-button ${
                  todo.completed ? "undo-button" : "complete-button"
                }`}
              >
                {todo.completed ? "Desfazer" : "Concluir"}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="action-button delete-button"
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
