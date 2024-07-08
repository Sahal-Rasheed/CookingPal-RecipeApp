import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { axios_instance } from '../api/axios';
import { useLocation, useSearchParams } from 'react-router-dom';

const CategoryContext = createContext(null);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  // fetch categories
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    (async () => {
      try {
        const response = await axios_instance.get('categories.php', {
          cancelToken: cancelToken.token
        });
        if (response.status === 200) {
          setCategories(response.data.categories);
          console.log(response.data.categories);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      } finally {
        setCategoryLoading(false);
      }
    })();

    return () => {
      cancelToken.cancel(); // cancel the request when the component unmounts
    };
  }, []);

  // fetch meal by category
  const [categoryFilter, setCategoryFilter] = useState('Beef');
  const [categoryMeal, setCategoryMeal] = useState([]);
  const [categoryMealLoading, setCategoryMealLoading] = useState(true);
  const location = useLocation();
  const [searchQueryParam] = useSearchParams();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (!searchQueryParam.get('search')) {
      (async () => {
        try {
          const response = await axios_instance.get(`filter.php?c=${categoryFilter}`, {
            cancelToken: cancelToken.token
          });
          if (response.status === 200) {
            setCategoryMeal(response.data.meals);
            console.log(response.data.meals);
          } else {
            console.error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error);
          }
        } finally {
          setCategoryMealLoading(false);
        }
      })();
    }

    return () => {
      cancelToken.cancel(); // cancel the request when the component unmounts
    };
  }, [categoryFilter, location.search]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryLoading,
        categoryFilter,
        setCategoryFilter,
        categoryMeal,
        setCategoryMeal,
        categoryMealLoading
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
