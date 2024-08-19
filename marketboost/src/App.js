import './App.css';
import MenuSelectPage from './pages/MenuSelectPage';
import MarketCategory from './pages/MarketCategory';
import StudentBoard from './pages/StudentBoard';
import FoodRandom from './pages/FoodRandom';
import Cafe from './pages/Cafe';
import Food from './pages/Food';
import Beauty from './pages/Beauty';
import Enter from './pages/Enter';

import { BrowserRouter,Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuSelectPage />} />
        <Route path="/category" element={<MarketCategory />} />
        <Route path="/board" element={<StudentBoard />} />
        <Route path="/foodrandom" element={<FoodRandom />} />
        <Route path="/category/one" element={<Cafe />} /> 
        <Route path="/category/two" element={<Food />} /> 
        <Route path="/category/three" element={<Beauty />} /> 
        <Route path="/category/four" element={<Enter />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
