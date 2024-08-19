import React from 'react'
import { useNavigate } from 'react-router-dom';

const Buttons = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='selectbuttonbox'>
      <div className="circle-container">
          <button className='circle' onClick={()=>handleNavigation('/foodrandom')}>
              <img className="icon" src="/recommand.png" alt='thumb' />  
          </button>
          <h1 className="icon-label">추천 음식</h1>
      </div>
      <div className="circle-container">
         <button className='circle' onClick={()=>handleNavigation('/category')}>
           <img className="icon" src="/market.png" alt='thumb' />
         </button>
         <h1 className="icon-label1">상권 분석</h1>
      </div>
      <div className="circle-container">
        <button className='circle' onClick={()=>{handleNavigation('/board')}}>
            <img className="icon-board" src="/board.png" alt='thumb' />
        </button>
        <h1 className="icon-label2">게시판</h1>
      </div>   
    </div>
  )
}

export default Buttons
