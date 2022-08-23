import './App.css';
import '../src/assets/css/style.css'
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './components/routing/routers/MainRouter';

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
