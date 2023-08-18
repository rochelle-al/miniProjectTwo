import './App.css';
import Forecast from "./components/Forecast/Forecast";
import logo from "./assets/logo.png"; 




function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="logo" alt="App Logo" />
      <h1>Weather Application</h1>
      </header>
      <main>
      <Forecast />
      </main>
    </div>
  );
}

export default App;