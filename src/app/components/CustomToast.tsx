"use client";
import React from 'react';
import '../styles/CustomToast.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle, faInfoCircle, faX } from '@fortawesome/free-solid-svg-icons';


type VaraintType = 'success' | 'error' | 'information';
const CustomToast = ({open, onClose, duration=1500, variant='success'}: {open: boolean, onClose: (close:boolean) => void, duration?  :number, variant?: VaraintType,} ) => {
  const [isActive, setIsActive] = React.useState(false);
  const [icon, setIcon] = React.useState(faCheck);
  const [color, setColor] = React.useState<string>('green');

  const toastMesaages = {
    success:'Your message has ben sent successfully',
    error: 'An error occured while sending your message',
    information: "This is an info messsage"
  }

  function handeClick(){
    setIsActive(!isActive);
    onClose(false);

    
  }
  React.useEffect(() => {
    switch(variant){
      case 'information':
        setIcon(faInfoCircle);
        setColor('orange');
        break;
      case 'error':
        setIcon(faExclamationCircle);
        setColor('red');
        break;
      case 'success':
        setIcon(faCheck);
        setColor('green');
        break;
      default:
        setIcon(faCheck);
        setColor('green');
    }
  },[variant]);

   React.useEffect(() => {
      const timer = setTimeout(() => {
        onClose(false);
        setIsActive(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      }
   }, [onClose, duration]);
    
  React.useEffect(() => {
        setIsActive(open);
  }, [open]);
    return (
        <div
         style={{'--main-color': color} as React.CSSProperties}
         className={`toastContainer ${isActive} ? 'active' : ''`}>
            <div className='icon' style={{backgroundColor: color}}>
                <FontAwesomeIcon icon={icon } width={15} height={15} />
            </div>
                <div className='message'>
                    <span className='head'>
                      {variant?.charAt(0).toLocaleUpperCase() + variant.slice(1)}
                    </span>
                    <span className='saved'>{toastMesaages[variant]}</span>
                </div>
                <FontAwesomeIcon className='closeBtn' icon={faX} onClick={handeClick}/>
            
        </div>
  )
}

export default CustomToast;  

// "use client"
// import React from 'react';
// import '../styles/CustomToast.css';

// interface CustomToastProps {
//   title: string;
//   description: string;
//   variant: 'success' | 'error' | 'info';
// }

// const CustomToast: React.FC<CustomToastProps> = ({ title, description, variant }) => {
//   return (
//     <div className={`toastContainer flex ${variant}`}>
//       <div className="showToast">
//         <strong>{title}</strong>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// };

// export default CustomToast;