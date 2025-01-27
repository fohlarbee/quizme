import useGlobalContextProvider from '@/app/context/ContextApi';
import { IconsData } from '@/app/Data/IconsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface QuizBuildTitleProps {
  focusProp: {
    focus: boolean;
    setFocusFirst: React.Dispatch<React.SetStateAction<boolean>>;
  },
  onChangeQuizTitle: (value: string) => void,
}

const QuizBuildTitle: React.FC<QuizBuildTitleProps> = ({ focusProp, onChangeQuizTitle }) => {
  const {openBoxToggle, selectedIconObj, selectedQuizObj} = useGlobalContextProvider();
   const { setOpenIconBox} = openBoxToggle;
   const {selectedIcon} = selectedIconObj;
    const {selectedQuiz} = selectedQuizObj
  const [quizTitle, setQuizTitle] = React.useState<string>(() => {
    return selectedQuiz ? selectedQuiz.quizTitle : ''
  });
  const {focus} = focusProp;
  const quizTileRef = React.useRef<HTMLInputElement>(null);


   


  const matchedIcon = selectedIcon ? IconsData.find((iconData) => iconData.name === selectedIcon.faIcon) : null;
  if (selectedIcon && !matchedIcon) {
    console.warn(`No matching icon found for iconName: ${selectedIcon.faIcon}`);
  }
  function handleTextInputChange(value: string){
    setQuizTitle(value); 
    onChangeQuizTitle(value);
  
  }

  React.useEffect(() => {
    if(focus){
      quizTileRef.current?.focus();
      // setFocusFirst(false);
    }
  }, [focus])
  return (
    <div className='p-3 flex justify-between border border-[#15803d] rounded-md shadow-md border-opacity-5 overflow-x-auto'>
      <div className='flex gap-2'>
        <div className='flex gap-2 items-center'>
          <div className='bg-[#15803d] px-4 py-1 rounded-md text-[#fff]'>
            1
          </div>
          <span className='font-bold'>Quiz Name : </span>          
        </div>
        <input 
        type="text"
        className='outline-none border-b-2 pt-1 w-full sm:w-9/12 text-[13px]'
        placeholder='Enter Quiz Name' 
        value={quizTitle}
        ref={quizTileRef}
        onChange={(e => handleTextInputChange(e.target.value))} 
        />

      </div> 
       {matchedIcon && (
                
            <FontAwesomeIcon
             onClick={() => setOpenIconBox(true)}
             icon={matchedIcon.faIcon} 
             width={40} 
             height={40} 
             className='text-[#fff] p-2 rounded-md bg-[#15803d] cursor-pointer' />
        )}


    </div>
  )
}

export default QuizBuildTitle;