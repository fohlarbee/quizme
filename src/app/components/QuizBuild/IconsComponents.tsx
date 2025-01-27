import useGlobalContextProvider from '@/app/context/ContextApi';
import { IconsData } from '@/app/Data/IconsData';
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const IconsComponents = () => {
    const [allIcons, setAllIcons] = React.useState(IconsData);
    const {openBoxToggle, selectedIconObj} = useGlobalContextProvider();
    const {setSelectedIcon} = selectedIconObj;

    const {openIconBox, setOpenIconBox} = openBoxToggle;
    function handleClickedIcon(iconIndex: number){
        const updatedIcons = allIcons.map((icon, i) => {
            if(i === iconIndex){

                setSelectedIcon((prevState) => {
                    const copyIconState = prevState;
                    copyIconState.faIcon =  icon.name
                    // copyIconState.faIcon = 'fa' + copyIconState.faIcon.split('fa')[1].split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
                    return copyIconState;
                })
                return {...icon,isSelected: true}
            }
            return {...icon, isSelected: false}
        });
        
        setAllIcons(updatedIcons);
    }
  return (
    <div className={`w-full flex absolute justify-center items-centertop-50} ${openIconBox ? 'visible' : 'invisible'} `}>
        <div className='relative z-50 w-[570px] p-4 rounded-md bg-[#fff] border border-[#15803d] flex flex-col gap-6 shadow-md border-opacity-5'>
            <FontAwesomeIcon
            height={20}
            width={20}
            className='absolute top-8 right-4 text-gray-300 cursor-pointer'
            icon={faClose}
            onClick={() => setOpenIconBox(false)}
            />
            <span className='font-bold text-lg text-[#15803d] bg-[#fff] mt-3'>
                Select an Icon
            </span>
            <div 
            className='border border-gray-200 p-2 flex flex-wrap gap-4
             items-center rounded-md'>
                {allIcons.map((icon, i) => (
                    <FontAwesomeIcon
                    key={i}
                    icon={icon.faIcon}
                    height={50}
                    width={50}
                    className={`cursor-pointer p-4 py-2
                     border-gray-200 border rounded-md hover:bg-gray-100
                     shadow-md border-opacity-50 text-green-700 flex-grow-0 flex-shrink-0 flex-wrap
                     ${icon.isSelected ? 'bg-gray-200' : ''} flex-[0_2_10%]
                     md:flex-[0_2_15%] lg:flex-[0_2_10%]`}
                    onClick={() => {
                        handleClickedIcon(i); 
                    }}
                    />
                ))}
            </div>
            <div className='flex my-2 justify-end'>
                <button 
                onClick={() => setOpenIconBox(false)}
                className='p-2 px-4 hover:bg-green-900 bg-[#15803d] rounded-md text-[#fff]'>
                    Save
                </button>

            </div>

         </div>
    </div>
  )
}

export default IconsComponents