import { ChevronRight } from 'lucide-react';
import { useCategoryContext } from '../../contexts/CategoryContext';

const Menu = ({ bgColor = 'bg-orange-400', category }) => {
  const { setCategoryFilter } = useCategoryContext();

  return (
    <div className={`h-20 flex justify-between px-5 items-center ${bgColor} rounded-lg`} onClick={() => setCategoryFilter(category)}>
      <h1 className="text-white text-lg font-bold mr-5">{category}</h1>
      <ChevronRight className="text-white font-bold" />
    </div>
  );
};

export default Menu;
