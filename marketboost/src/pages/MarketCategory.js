import React from 'react'
import '../css/categorypage.css';
import CategoryBox from '../components/CategoryBox';
import { useNavigate } from 'react-router-dom';

const MarketCategory = () => {
  const nums = ['one', 'two', 'three', 'four'];

  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className='categorymain'>
      <h1 className="categorytext">Category</h1>

      {nums.map((num) => (
        <CategoryBox num={num} onClick={()=>handleClick(num)}/>
      ))}
      
      

    </div>
  )
}

export default MarketCategory
