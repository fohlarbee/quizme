import React from 'react'
import '../styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookOpen,  faX } from '@fortawesome/free-solid-svg-icons';
import {mainColor} from '../styles/Colors'
import { useRouter } from 'next/navigation';

type MenuProp ={
  isMenuOpen: boolean;
  toggleMenu?: () => void;
}
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div 
    style={{backgroundColor: mainColor, color:'#fff'}}
    className='header'>
      <Logo/>
      <div

      className={`mainMenuAndLoginButton ${isMenuOpen ? 'open' :''}`}>
        <MainMenu/>
        <LoginButton isMenuOpen={isMenuOpen}/>
      </div>
      <FontAwesomeIcon
      className='barsIcon'
      icon={isMenuOpen ? faX : faBars}
      size='2x'
      onClick={toggleMenu}
      />

    </div>
  )
}

export default Header;

function Logo(){
  return <div className='logoRootContainer'>
    <FontAwesomeIcon
    className='logo' 
    icon={faBookOpen}
    />
    <span className='websitename'>Quizme</span>
  </div>
}

function MainMenu(){
  const menuItems = ['Home', 'Courses', 'Pricing', 'About us', 'Blog'];
  return  <div className='mainMenuRootContainer'>
   {menuItems.map((item, index) => (
    <div key={index} className='singleMenuItem'>
      {item}
    </div>
   ))}
  </div>
}

function LoginButton({isMenuOpen}: MenuProp){
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const router = useRouter();

  return <div className='loginButtonContainer'>
    <button 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{
      backgroundColor: isMenuOpen ? '#fff' : isHovered ? "#fff": mainColor ,
      border: isMenuOpen ? `1px solid #15803d`: isHovered ? `1px solid #fff`:'' ,
      color: isMenuOpen ? mainColor : isHovered ? '#fff' : '#fff'
    }}
    type='button' className='loginButton' onClick={() => router.push('/quiz')  }>
      Demo
    </button>
  </div>
}