import React from 'react'
import '../styles/FeatureArea.css'
import Image from 'next/image'
import {mainColor} from '../styles/Colors'

type LevelCardProps = {
  id: number,
  header: string,
  text: string,
  image: string
}

const FeatureArea = () => {
  const items: LevelCardProps[] = [
    {
      id: 1,
      header: 'Create quizes',
      text: 'Create your own quizes and share with friends',
      image: '/level-img1.webp'
    },
    {
      id: 2,
      header: 'Build your learning path',
      text: 'Choose your level and start learning',
      image: '/level-img2.webp'
    },
    {
      id: 3,
      header: 'Track your learning growth',
      text: 'Track your learning growth and improve your skills',
      image: '/level-img3.webp'
    }
  ]
  return (
    <div className='featureAreaRoot'>
      <div className="featureAreaContainer">
        <div 
        style={{color:mainColor}}
        className="featureAreaHeader">Choose Your Level...</div>
        <div className="featureAreaCards">
          {items.map((item, i) => (
            <LevelCard key={i} id={item.id} header={item.header} text={item.text} image={item.image} />
          ))}

        
        </div>
      </div>
    </div>
  )
}

export default FeatureArea;

function LevelCard({header, text, image}: LevelCardProps) { 
  return <div className="levelCardRoot">
    <div className="levelCardContainer">
      {/* <div className=""> */}
        <Image src={image} alt="levelCardImage" width={200} height={200} />
      {/* </div> */}
      <div  
      style={{color:mainColor}}
      className='levelCardHeader'>{header}</div>
      <div className='levelCardText'>{text}</div>
    </div>

  </div>
}