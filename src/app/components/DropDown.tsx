import { faPencil, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome'
import React  from 'react'
import useGlobalContextProvider from '../context/ContextApi';
  
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


interface MenuItems {
  name: string;
  icon: IconDefinition;
}
const DropDown = () => {

    const dropDownRef = React.useRef<HTMLDivElement>(null);
    const {
      dropDownToggleObj, 
      ellipsisObj, 
      selectedQuizObj,
      allQuizzes,
      setAllQuizzes
    } = useGlobalContextProvider();
    const {dropDownToggle, setDropDownToggle} = dropDownToggleObj;
    const {ellipsis} = ellipsisObj;
    const {selectedQuiz, setSelectedQuiz} = selectedQuizObj;
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
    const router = useRouter();

    const menuItems: MenuItems[] = [
        {name: 'modify', icon: faPencil},
        {name: 'Delete', icon: faTrash},
    ];

    React.useEffect(() => {
        function handleOutsideClick(e: MouseEvent){
              if(dropDownRef.current && !dropDownRef.current.contains(e.target as Node))
                if(!isDialogOpen) setSelectedQuiz(null);
                setDropDownToggle(false);
        };
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [dropDownToggle, setDropDownToggle]);

    function deleteQuiz(){
      const updatedQuiz = allQuizzes.filter((q) => {
        if (q.id !== selectedQuiz!.id ) return q; 
      });

      setAllQuizzes(updatedQuiz);
      toast.success('Quiz Deleted Successfully');
      setIsDialogOpen(false);
      setSelectedQuiz(null);
    }


    function handleClickItem(item: MenuItems){
      if(item.name === 'modify') router.push('/quiz-build');
      if(item.name === 'Delete') {
      setIsDialogOpen(true);
      toast((t: { id: string | undefined; }) => (
        <div className='flex flex-col gap-4'>
          <span>
        Do you really want to delete <span className='font-bold text-[#15803d]'>{selectedQuiz?.quizTitle}</span> Quiz?
          </span>
          <div className='w-full flex gap-3 justify-center'>
        <button
        onClick={(() => {
          deleteQuiz();
          toast.dismiss(t.id);
        })}
        className='bg-[#15803d] text-[#fff] p-1 w-[100px] rounded-md'
        >
          Yes
        </button>
        <button
        onClick={(() => {
          toast.dismiss(t.id);
          setIsDialogOpen(false);
          setSelectedQuiz(null);
        })}
        className='bg-[#15803d] text-[#fff] p-1 w-[100px] rounded-md'
        >
          No
        </button>
          </div>
        </div>
      ), { duration: Infinity });
      }
    }
  return ( 
    <>
      {dropDownToggle && (
        <div className=''>
          <div ref={dropDownRef}
          style={{left:ellipsis.x - 110, top:ellipsis.y}}
            className={`p-4 w-32 fixed  z-50 shadow-md flex rounded-md 
              flex-col gap-3 bg-[#fff] poppins poppins-light text-[13px] `}
          >
            {menuItems.map((item, i) => (
              <div key={i} 
              onClick={() => handleClickItem(item)}
                className='flex gap-2 items-center border text-green-700
                  border-gray-200 rounded-md select-none cursor-pointer hover:text-[#fff] hover:bg-green-700'
              >
                <FontAwesomeIcon
                  className='size-4 ml-1' icon={item.icon}

                />
                <span className='p-2'> 
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default DropDown;