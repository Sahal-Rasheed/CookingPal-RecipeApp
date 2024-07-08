import { Link } from 'react-router-dom';
import { useCategoryContext } from '../../contexts/CategoryContext';

const RecipeCard = ({ recipe }) => {
  const { categoryFilter } = useCategoryContext();

  return (
    <div className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`recipe/${recipe.idMeal}`}>
        <div className="h-48 overflow-hidden rounded-xl relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.imageAlt === undefined ? recipe.strMeal : recipe.imageAlt}
            className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out transform hover:scale-105"
            loading="lazy"
          />
          <span className="absolute bg-red-500 text-white text-base top-0 right-0 p-1 m-2 rounded-sm">
            {recipe.strArea === undefined ? categoryFilter : recipe.strArea}
          </span>
        </div>
        <div className="mx-5">
          <p className="text-xs font-light text-gray-500 mt-3 leading-none">
            {recipe.strCategory === undefined ? categoryFilter : recipe.strCategory}
          </p>
          <h3 className="text-xl text-black font-bold leading-8">{recipe.strMeal}</h3>
          <p className="text-base text-orange-500 font-semibold mt-1 mb-4">
            {Math.floor(Math.random() * (60 - 10 + 1)) + 10} min
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
