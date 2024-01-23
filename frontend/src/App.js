import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Routes/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home/>}>
              </Route>
            </Routes>
          </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
