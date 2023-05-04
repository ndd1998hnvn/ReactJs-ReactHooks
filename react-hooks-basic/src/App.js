import logo from './logo.svg';
import './App.scss';
import ColorBox from './Components/ColorBox';

function App() {
  return (
    <div className="App">      
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Study React Hooks by Cop</h1>
      <ColorBox />
    </div>
  );
}

export default App;
