import React from 'react'
import '../styles/HeroArea.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {mainColor} from '../styles/Colors'

const HeroArea = () => {
  return (
    <div 
    style={{backgroundColor: mainColor, color:'#fff'}}
    className='heroAreaRoot'>
      <LeftArea />
      <RightArea />
    </div>
  )
}

export default HeroArea;

function LeftArea(){
  const subHeader = 'Build up your learning 10x Faster! Unlock your Potentials with personalized quizes';
  const subDescription = 'Create your own quiz, share it with your friends and see who scores the highest. Challenge your knowledge on various topics and discover new facts along the way. Join the community of quiz enthusiasts and make learning fun and engaging.';
  return (
    <div className='leftAreaRoot'>
      <div className='leftAreaSubContainer'>
        <span className='leftAreaSubHeader'>{subHeader}</span>
      <span className='leftAreaSubDescription'>{subDescription}</span>
      <div className='searchContainer'>
        <input type="text" placeholder='Explore quizes...' className='searchInput' />
        <FontAwesomeIcon icon={faSearch} className='searchButton' style={{color:mainColor, backgroundColor:'#fff'}} />

      </div>

      </div>
     
      
    </div>
  )
}
function RightArea(){ 
  return (
    <div className='rightAreaRoot'>
      <div className='rightAreaContainer'>
        <Image src='/quiz-take.png' width={640} height={500} alt='rightAreaImage' />
      </div>
    </div>
  )
}