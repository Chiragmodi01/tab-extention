import React, {useEffect, useState} from 'react'
import './Todos.css'
import { useOnClickOutside } from '../../hooks'
import {IoMdClose} from '../../utils/getIcons';
import { v4 as uuidv4 } from 'uuid';

function Todos() {
    const showAddTodoInitialState = "isTodosShowing" in localStorage ? JSON.parse(localStorage.getItem('isTodosShowing')) : false;
    const todoInitialState = "todos" in localStorage ? JSON.parse(localStorage.getItem('todos')) : [];

    const [showTodos, setShowTodos] = useState(false);
    const [showAddTodo, setShowAddTodo] = useState(showAddTodoInitialState);
    const [singleTodoText, setSingleTodoText] = useState('');
    const [todo, setTodo] = useState(todoInitialState);
    const showTodosRef = useOnClickOutside(() => setShowTodos(false), showTodos);

    const openCreateTodo = () => {
        setShowAddTodo(true);
        setShowTodos(false);
    }

    const submitTodo = (e) => {
        e.preventDefault();
        setShowAddTodo(true);
        localStorage.setItem('isTodosShowing', true);
        if(singleTodoText.length !== 0 || singleTodoText !== ' ') {
            setTodo([...todo, {title:singleTodoText, id:uuidv4(), isDone: false}]);
        }
        setSingleTodoText('')
    }

    const deleteTodo = (ele) => {
        const isTodo = todo.filter((t) => t.id !== ele.id);
        setTodo(isTodo);
    }

    const handleTodoWrapper = () => {
        if(todo.length === 0) {
            setShowTodos(prev => !prev);
            setShowAddTodo(false);
        } else {   
            setShowAddTodo(prev => !prev);
            localStorage.setItem('isTodosShowing', !showAddTodo);
        }
    }
    
    const doneTodo = (ele) => {
        const index = todo.findIndex((emp) => emp.id === ele.id);
        const newTodo = [...todo];

        newTodo[index] = {
            id: todo[index].id,
            title: todo[index].title,
            isDone: !todo[index].isDone,
        };

        setTodo(newTodo);
    }

    
    useEffect(() => {
        if(todo.length === 0) {
            localStorage.removeItem('todos');
            localStorage.setItem('isTodosShowing', false);
        } else {
            localStorage.setItem('todos', JSON.stringify(todo));
        }
    }, [todo])


  return (
    <div className='Todos'>
        <div ref={showTodosRef}>
        <span className="todos-main-text" onClick={handleTodoWrapper}>Todos</span>
        {showTodos &&
        <div className='add-todo-wrapper flex-centered flex-col'>
            <p className="add-todos-title">Add a todo to get started</p>
            <button className="add-todo-btn" onClick={openCreateTodo}>NEW TODO</button>
        </div>}
        </div>
        {showAddTodo &&
        <div className='main-todos-container'>
            {
                todo.map((todo) => {
                    return (
                        <span key={todo.id} className="todo-item flex-centered justify-start">
                            <label className={`${todo.isDone && 'strike-grey'} flex-centered`} htmlFor={todo.id}>
                                <input defaultChecked={todo.isDone} type="checkbox" name="todo-item" id={todo.id} onChange={() => doneTodo(todo)}/>
                                {todo.title}</label>
                                <IoMdClose size="1em" className='todo-icon-close' onClick={() => deleteTodo(todo)}/>
                        </span>
                    )
                })
            }
            <form className="create-todo-wrapper flex-centered justify-start" onSubmit={(e) => submitTodo(e)}>
                <input autoFocus value={singleTodoText} type="text" className='create-todo-input' placeholder='New Todo' onChange={(e) => setSingleTodoText(e.target.value)}/>
            </form>
        </div>}
        
    </div>
  )
}

export {Todos}