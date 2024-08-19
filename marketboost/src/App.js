import './App.css';
import MenuSelectPage from './pages/MenuSelectPage';
import MarketCategory from './pages/MarketCategory';
import StudentBoard from './pages/StudentBoard';
import FoodRandom from './pages/FoodRandom';
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuSelectPage />} />
        <Route path="/category" element={<MarketCategory />} />
        <Route path="/board" element={<StudentBoard />} />
        <Route path="/foodrandom" element={<FoodRandom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
