import logo from './logo.svg';
import './App.css';
import NavigationBar from './component/NavigationBar';
import Timer from './component/Timer'

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <header className="App-header">
        <Timer/>
      </header>
    </div>
  );
}

export default App;
