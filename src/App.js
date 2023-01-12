import './App.css';
import HomePage from './components/HomePage';
import { AlertProvider } from './contexts/alert-context';

function App() {
  return (
    <AlertProvider>
      <div className="App">
          <HomePage />
      </div>
    </AlertProvider>
  );
}

export default App;
