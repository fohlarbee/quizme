import React, { useRef } from 'react';
import '../styles/CustomButton.css';

const CustomButton = ({name} : {name: string}) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);

    function handleClick(event: React.MouseEvent<HTMLDivElement>): void {
        const button = buttonRef.current;
        const ripple = rippleRef.current;
        const buttonRect = button?.getBoundingClientRect();
        const { left, top } = buttonRect || { left: 0, top: 0 };
        const leftPosition = event.clientX  - left;
        const topPosition = event.clientY - top;

        ripple!.style.left = leftPosition + 'px';
        ripple!.style.top = topPosition + 'px';

        ripple?.classList.add('active');

        setTimeout(() => {
            ripple?.classList.remove('active')
        }, 500)
    }

    return(
    <div 
    onClick={handleClick}
    ref={buttonRef}
    className='myButton'>
        {name}
        <span ref={rippleRef} className='rippleEffect'></span>

    </div>
  )
}

export default CustomButton