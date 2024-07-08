import { useEffect, useRef } from 'react';
import Menu from './Menu';
import { useCategoryContext } from '../../contexts/CategoryContext';
import "./style.css";

const colorMap = [
  'bg-orange-400',
  'bg-yellow-400',
  'bg-emerald-400',
  'bg-lime-400',
  'bg-green-400',
  'bg-red-400'
];

const MenuList = () => {
  const { categories, categoryLoading } = useCategoryContext();
  
  // carousal
  const carousalRef = useRef(null);
  const carousalControls = useRef({
    isMouseDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    const carousal = carousalRef.current;

    const handleMouseDown = (e, isTouch=false) => {
      carousalControls.current.isMouseDown = true;
      carousalControls.current.startX = isTouch ? e.touches[0].pageX - carousal.offsetLeft : e.pageX - carousal.offsetLeft;
      carousalControls.current.scrollLeft = carousal.scrollLeft;
      carousal.style.userSelect = 'none';
    };

    const handleMouseMove = (e, isTouch=false) => {
      if (!carousalControls.current.isMouseDown) return;
      e.preventDefault();
      const scrollSpeed = isTouch ? 2 : 1; 
      const currentX = isTouch ? e.touches[0].pageX - carousal.offsetLeft : e.pageX - carousal.offsetLeft;
      const walk = (currentX - carousalControls.current.startX) * scrollSpeed;
      carousal.scrollLeft = carousalControls.current.scrollLeft - walk;
      carousal.style.cursor = 'grabbing';
      carousal.style.userSelect = 'none';
    }

    const handleMouseUp = () => {
      carousalControls.current.isMouseDown = false;
      carousal.style.cursor = '';
    }
   
    const handleMouseOut = () => {
      carousalControls.current.isMouseDown = false;
      carousal.style.cursor = '';
    }

    carousal?.addEventListener('mousedown', handleMouseDown);
    carousal?.addEventListener('touchstart', (e) => handleMouseDown(e, true));

    carousal?.addEventListener('mousemove', handleMouseMove);
    carousal?.addEventListener('touchmove', (e) => handleMouseMove(e, true));

    carousal?.addEventListener('mouseup', handleMouseUp);
    carousal?.addEventListener('touchend', handleMouseUp);

    carousal?.addEventListener('mouseout', handleMouseOut);
    carousal?.addEventListener('touchend', handleMouseOut);

    return () => {
      carousal?.removeEventListener('mousedown', handleMouseDown);
      carousal?.removeEventListener('touchstart', handleMouseDown);

      carousal?.removeEventListener('mousemove', handleMouseMove);
      carousal?.removeEventListener('touchmove', handleMouseMove);
      
      carousal?.removeEventListener('mouseup', handleMouseUp);
      carousal?.removeEventListener('touchend', handleMouseUp);

      carousal?.removeEventListener('mouseout', handleMouseOut);
      carousal?.removeEventListener('touchend', handleMouseOut);
    };

  }, [carousalRef, carousalControls, categoryLoading]);

  if (categoryLoading) {
    return 'loading....';
  }

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 px-20">
    <div className="px-20">
      <div className="" ref={carousalRef} data-carousal="carousal">
        {categories.map((category, index) => (
          <Menu category={category.strCategory} key={index} bgColor={colorMap[index]} />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
