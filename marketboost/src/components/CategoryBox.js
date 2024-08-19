import React from 'react'
import '../css/categorypage.css';



const CategoryBox = ({num, onClick}) => {

  const imgsrc = {'one': "/cafe.png", "two":"/food.png", "three":"/beauty.png", "four":"/play.png"}  
  const categoryNames = {
    'one': '카페/음료',
    'two': '음식',
    'three': '뷰티',
    'four': '놀이'
  };

  return (
    
    <div className={`categorybox ${num}`} onClick={onClick}>
        <img className='categoryimg' src={imgsrc[num]} />
        <h1 className='categoryname'>{categoryNames[num]}</h1>
    </div>
    
  )
}

export default CategoryBox;
