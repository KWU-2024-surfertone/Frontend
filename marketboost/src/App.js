import './App.css';
import MenuSelectPage from './pages/MenuSelectPage';
import MarketCategory from './pages/MarketCategory';
import StudentBoard from './pages/StudentBoard';
import FoodRandom from './pages/FoodRandom';
import Cafe from './pages/Cafe';
import Food from './pages/Food';
import Beauty from './pages/Beauty';
import Enter from './pages/Enter';
import {Status, Wrapper} from "@googlemaps/react-wrapper";

import { BrowserRouter,Routes, Route, Link } from "react-router-dom";

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <>로드 성공</>;
    default:
      return null;
  }
};


function App() {
  return (
    <Wrapper apiKey="AIzaSyDnc8Ff7lGdmiLBiIRKDhVRdKu8s9dzVpw" render={render}>
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
    </Wrapper>
  );
}

export default App;
