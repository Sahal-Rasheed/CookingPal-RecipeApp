import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { axios_instance } from '../api/axios';
import { DetailPageLoadingSkeleton } from '../components';

const RecipeDetailPage = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (recipeId) {
      (async () => {
        try {
          const response = await axios_instance.get(`lookup.php?i=${recipeId}`, {
            cancelToken: cancelToken.token
          });
          if (response.status === 200) {
            setRecipe(response.data.meals[0]);
            console.log(response.data.meals[0]);
          } else {
            console.error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error);
          }
        } finally {
          // setRecipeLoading(false);
        }
      })();
    }

    return () => {
      cancelToken.cancel(); // cancel the request when the component unmounts
    };
  }, [recipeId]);

  const getIngredients = (recipe) => {
    return recipe ? Object.keys(recipe)
      .filter((key) => key.startsWith('strIngredient') && recipe[key])
      .map((key) => ({
        ingredient: recipe[key],
        key
      })) : null
  };

  const getMeasurements = (recipe) => {
    return recipe ? Object.keys(recipe)
      .filter((key) => key.startsWith('strMeasure') && recipe[key])
      .map((key) => ({
        measurement: recipe[key],
        key
      })) : null
  };
  
  const ingredients = getIngredients(recipe);
  const measurements = getMeasurements(recipe);

  if (!recipe) {
    return <DetailPageLoadingSkeleton ingredients={9} measurements={9} instructions={9} />;
  }

  return (
    <section className="py-1 mx-20 overflow-hidden mb-5">
      <h1 className="text-start text-4xl font-extrabold tracking-wide mb-5">Recipe Details</h1>
      <div className="border shadow">
        <div className="px-10 py-4 grid grid-cols-1 lg:grid-cols-2">
          <div>
            <img
              src={recipe?.strMealThumb}
              className="py-5 w-full sm:w-full md:w-full lg:w-[90%] lg:h-full object-cover resize-none"
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold pt-6 pb-5 border-b-2 border-red-500 tracking-wide">
              {recipe?.strMeal}
            </h1>
            <p className="text-2xl font-semibold pt-5">Category : {recipe?.strCategory}</p>
            <p className="text-2xl font-semibold pt-5 truncate" title={recipe?.strSource}>
              Source : {recipe?.strSource}
            </p>
            {recipe.strTags && (
              <p className="text-2xl font-semibold pt-5 ">
                Tags :
                {recipe?.strTags &&
                  recipe?.strTags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="p-1 border border-red-500 mx-2 text-red-500 rounded-md text-base hover:bg-red-500 hover:text-white"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </p>
            )}
            <div className="rounded-sm bg-red-500 px-7 py-5 my-10">
              <h2 className="text-xl text-white font-bold">Ingredients :</h2>
              <ul className="flex flex-wrap text-white my-5 gap-x-24 gap-y-3">
                {ingredients.map(({ ingredient, key }, index) => (
                  <li className="font-bold w-44" key={key}>
                    <span className="px-2 py-0.5 rounded-full bg-red-500 border border-white mr-2">
                      {index + 1}
                    </span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm border border-red-500 text-red-500 px-7 py-5 my-10">
              <h2 className="text-xl text-black font-bold">Measurement :</h2>
              <ul className="flex flex-wrap text-black my-5 gap-x-24 gap-y-3">
                {measurements
                  ?.filter(({ measurement }) => measurement !== ' ')
                  .map(({ measurement, key }, index) => (
                    <li className="font-bold w-44" key={key}>
                      <span className="px-2 py-0.5 rounded-full bg-white border border-red-500 mr-2">
                        {index + 1}
                      </span>
                      {measurement}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border border-red-500 px-7 py-5 mx-10 mb-10">
          <h2 className="text-2xl font-semibold mb-2">Instructions :</h2>
          {recipe?.strInstructions
            ?.split('\r\n')
            ?.filter((instruction) => instruction.length > 1)
            .map((instruction, index) => (
              <p key={index} className="mb-2">{`Step ${index + 1} : ${instruction.trim()}`}</p>
            ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeDetailPage;
