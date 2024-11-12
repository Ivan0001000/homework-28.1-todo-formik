import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './App.css'; 

const todoSchema = Yup.object().shape({
  task: Yup.string()
    .min(5, 'Минимум 5 символов')
    .required('Поле обязательно'),
});

function App() {
  const [todos, setTodos] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
    const savedTheme = JSON.parse(localStorage.getItem('theme'));
    if (savedTheme !== null) setIsDarkTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? '#333' : '#f4f4f4';
    document.body.style.color = isDarkTheme ? '#fff' : '#333';
    localStorage.setItem('theme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const addTodo = (values, { resetForm }) => {
    setTodos([...todos, values.task]);
    resetForm();
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="app-container">
      <h1>ToDo List</h1>
      <button className="theme-button" onClick={() => setIsDarkTheme((prev) => !prev)}>
        {isDarkTheme ? 'Светлая Тема' : 'Темная Тема'}
      </button>

      <Formik
        initialValues={{ task: '' }}
        validationSchema={todoSchema}
        onSubmit={addTodo}
      >
        {() => (
          <Form className="todo-form">
            <Field name="task" placeholder="Введите задачу" className="todo-input" />
            <button type="submit" className="submit-button">Добавить</button>
            <ErrorMessage name="task" component="div" className="error-message" />
          </Form>
        )}
      </Formik>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo}
            <button onClick={() => removeTodo(index)} className="delete-button">
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
