import { useState, useEffect } from 'react';
import axios from 'axios';
import { axios_instance } from '../../api/axios';
import RecipeCard from './RecipeCard';
import { useCategoryContext } from '../../contexts/CategoryContext';
import RecipeCardLoadingSkeleton from '../Skeleton/RecipeCardLoadingSkeleton';

const RecipeList = () => {
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  const { categoryFilter, categoryMeal } = useCategoryContext();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    (async () => {
      try {
        const response = await axios_instance.get('search.php?s=', {
          cancelToken: cancelToken.token
        });
        if (response.status === 200) {
          setFeaturedRecipe(response.data.meals);
          console.log(response.data.meals);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        if (!axios.isCancel(error)) console.log(error);
      } finally {
        // setLoading(false);
      }
    })();

    return () => {
      cancelToken.cancel(); // cancel the request when the component unmounts
    };
  }, []);

  // Show-More
  const [categoryMealShowMore, setCategoryMealShowMore] = useState(false);

  return (
    <>
      <div>
        <h1 className="text-4xl py-7 px-20 font-extrabold">{categoryFilter} Recipes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-10 gap-y-8 px-20">
          {categoryMeal?.length === 0 &&
            Array(categoryMealShowMore ? undefined : 10)
              .fill(0)
              .map((_, index) => <RecipeCardLoadingSkeleton key={index} />)}
          {categoryMeal === null ? (
            <h1>No Data</h1>
          ) : (
            categoryMeal
              .slice(0, categoryMealShowMore ? undefined : 10)
              ?.map((recipe, index) => <RecipeCard key={index} recipe={recipe} />)
          )}
        </div>
        {categoryMeal?.length >= 10 && (
          <div className="flex justify-center">
            <button
              className="px-8 py-2 rounded-lg text-lg bg-lime-500 font-bold text-white hover:bg-green-500"
              onClick={() => setCategoryMealShowMore(!categoryMealShowMore)}
            >
              {categoryMealShowMore ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-4xl py-7 font-extrabold px-20">Featured Recipes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-10 gap-y-8 px-20">
          {!featuredRecipe &&
            Array(10)
              .fill(0)
              .map((_, index) => <RecipeCardLoadingSkeleton key={index} />)}
          {featuredRecipe?.slice(0, 10)?.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
