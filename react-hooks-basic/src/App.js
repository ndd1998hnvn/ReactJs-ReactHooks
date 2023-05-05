import logo from './logo.svg';
import './App.scss';
import ColorBox from './Components/ColorBox';
import { useEffect, useState } from 'react';
import TodoList from './Components/TodoList';
import TodoForm from './Components/TodoForm';
import PostList from './Components/PostList';
import Pagination from './Components/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './Components/PostFiltersForm';
import Clock from './Components/Clock';
import NewClock from './Components/NewClock';
import MagicBox from './Components/MagicBox';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 1, title: 'Nghiên cứu reactjs'},
    {id: 2, title: 'Nghiên cứu reactjs x nextjs'},
    {id: 3, title: 'Nghiên cứu reactjs x hooks'},
  ])

  const [postList1, setPostList1] = useState([]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPaginations] = useState({
    _page:1,
    _limit:10,
    _totalRows:1,
  });

  const [filters,setFilters] = useState({
    _limit:10,
    _page:1, 
  });

  useEffect(()=>{
    async function fetchPostList1(){
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1'
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({responseJSON});
        const {data} = responseJSON;
        setPostList1(data);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }      
    }
    console.log('PostList')
    fetchPostList1();
  },[])

  useEffect(()=>{
    async function fetchPostList(){
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({responseJSON});
        const {data, pagination} = responseJSON;
        setPostList(data);
        setPaginations(pagination);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }      
    }
    console.log('PostList')
    fetchPostList();
  },[filters])

  useEffect(()=>{
    console.log('todolist');
  })

  function handleTodoClick(todo){
    
    const index = todoList.findIndex(x => x.id === todo.id);
    if ( index < 0 ) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handlePageChange(newPage){
    console.log('new page: ', newPage);
    setFilters({
        ...filters,
          _page:newPage,
        });
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

  function handleFiltersChange(newFilters) {
    console.log(newFilters)
    setFilters({
      ...filters,
      _page:1,
      title_like: newFilters.searchTerm,
    })
  }

  const [showClock, setShowClock] = useState(true);
  const [clockVisible, setClockVisible] = useState(true);

  const handleClockVisibility = () => {
    setShowClock(!showClock);
    setClockVisible(!clockVisible);
  }

  return (
    <div>    
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Study React Hooks by Cop</h1>
      </div>
      <div>
        <h1>Dùng useEffect() qua ví dụ hiển thị giờ</h1>
        <button onClick={handleClockVisibility}>
        {clockVisible ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
        </button>
        {clockVisible && showClock && <Clock />}
        <NewClock />
      </div>
      <div>
        <h1>Dùng customhooks() qua ví dụ</h1>
        <MagicBox />
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
      <div>
        <h1>useState qua ví dụ useEffect</h1>
        <div>
          <h2>Post list</h2>
          <PostList posts={postList1}/>
        </div>
        <div>
          <h2>Pagination</h2>
          <PostFiltersForm onSubmit={handleFiltersChange}/>
          <PostList posts={postList}/>
          <Pagination 
          pagination={pagination}
          onPageChange={handlePageChange}/>
        </div>
      </div>       
    </div>
  );
}

export default App;
