import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactBook, faBlog, faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import '../styles/CustomNavbar.css';

type Page = {
  name: string;
  path: string;
  icon: IconDefinition;
  selected: boolean;
};

const CustomNavbar: React.FC = () => {
  const pages: Page[] = [
    { name: 'Home', path: '/', icon: faContactBook, selected: true },
    { name: 'Contact', path: '/contact', icon: faContactBook, selected: false },
    { name: 'Blog', path: '/blog', icon: faBlog, selected: false },
    { name: 'Searchserach', path: '/search', icon: faMagnifyingGlass, selected: false }
  ];

  const [pagesState, setPagesState] = React.useState<Page[]>(pages);
  const [selectedWidth, setSelectedWidth] = React.useState('50px'); 

  function handleClick(e: React.MouseEvent<HTMLDivElement>, pageClicked: Page) {
    const updatePagesState = pagesState.map((page) => {
      return { ...page, selected: page.name === pageClicked.name };
    });


    setPagesState(updatePagesState);
    const clickedSingleItem = e.currentTarget;
    const clickedPageName = clickedSingleItem.querySelector('.pageName');
    setSelectedWidth((clickedPageName as HTMLElement).offsetWidth + 60 +     'px');
  }

  React.useEffect(() => {
    const firstElement = document.querySelector('.singlePage:first-child');
    const  firstSinglePageRef = firstElement?.querySelector('.pageName');

    if (firstSinglePageRef) 
      setSelectedWidth((firstSinglePageRef as HTMLElement).offsetWidth + 60 + 'px');


    }, []);

  return (
    <nav className='md:hidden z-50 fixed bottom-0 left-0 right-0 rounded-t-lg flex gap-14 rounded-md h-16 shadow-md text-green-800  border-opacity-5 mt-16 bg-[#f8f8f8]'>
      {pagesState.map((p, i) => (
        <div
          onClick={(e) => handleClick(e, p)}
          key={i}
          style={{ width: p.selected === true ? selectedWidth : '50px' }}
          className
          ={`singlePage flex flex-grow relative m-2 justify-center text-md rounded-lg transition-all duration-400 
            w-[150px]   ${
            p.selected ? 'w-50 bg-gradient-to-r from-green-200 to-green-200' : ''
          }`}
        >
          <div className={`pageIcon absolute top-2 ${p.selected ? 'left-4' : ''}`}>
            <FontAwesomeIcon icon={p.icon}  />
          </div>
          <span className={`mt-1 pageName ${p.selected === true ? 'selected' : ''}`} >{p.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default CustomNavbar;

// ${p.selected === true ? 'selected' : ''}
// className={`pageIcon ${p.selected === true ? 'selected' : ''}`}
