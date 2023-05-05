import logo from './logo.svg';
import './App.scss';
import ColorBox from './Components/ColorBox';
import { useState } from 'react';
import TodoList from './Components/TodoList';
import TodoForm from './Components/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 1, title: 'Nghiên cứu reactjs'},
    {id: 2, title: 'Nghiên cứu reactjs x nextjs'},
    {id: 3, title: 'Nghiên cứu reactjs x hooks'},
  ])
  function handleTodoClick(todo){
    
    const index = todoList.findIndex(x => x.id === todo.id);
    if ( index < 0 ) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  function handleTodoFormSubmit(formValues){
    const nextId = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;
    const newTodo = {
      id: nextId,
      ...formValues,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
    console.log(newTodo)
  }
  return (
    <div>    
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Study React Hooks by Cop</h1>
      </div>
      <div>
        <h1>Dùng useState() qua ví dụ</h1>
        <ColorBox />
      </div>
      <div>
        <h1>useState qua ví dụ TodoList</h1>
        <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
        <button onClick={() => window.location.reload(false)}>Refesh</button>  
      </div>
      <div>
        <h1>useState qua ví dụ TodoForm</h1>
        <TodoForm onSubmit={handleTodoFormSubmit}/>
      </div>      
    </div>
  );
}

export default App;
