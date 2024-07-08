import axios from 'axios';
import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCategoryContext } from '../../contexts/CategoryContext';
import { axios_instance } from '../../api/axios';


const SearchBar = () => {
  const { categories, setCategoryMeal, setCategoryFilter, categoryFilter } = useCategoryContext();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParam] = useSearchParams();
  console.log(categoryFilter);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const searchQueryParam = searchParam.get('search');

    const searchMeal = async () => {
      try {
        const response = await axios_instance.get(`search.php?s=${searchQueryParam}`, {
          cancelToken: cancelToken.token
        });
        if (response.status === 200) {
          setCategoryMeal(response.data.meals);
          console.log(response.data.meals);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        if (!axios.isCancel(error)) console.log(error);
      } finally {
        // setLoading(false);
      }
    };

    if (!searchQueryParam) {
      console.log(searchQueryParam);
      setCategoryFilter('Beef');
    } else {
      console.log(searchQueryParam);
      searchMeal();
    }

    return () => {
      cancelToken.cancel(); // cancel the request when the component unmounts
    };
  }, [location.search]);

  return (
    <div className="flex h-12">
      <select
        className="h-full px-4 py-2 bg-slate-100 text-lg outline-none cursor-pointer"
        onChange={(e) => setCategoryFilter(e.target.value)}
        value={categoryFilter}
      >
        {categories.slice(0, 6)?.map((category, index) => (
          <option value={category.strCategory} key={index}>
            {category.strCategory}
          </option>
        ))}
      </select>
      <div className="relative flex items-center h-full w-[370px]">
        <input
          type="search"
          name="search"
          className="h-full w-full px-6 py-2 bg-slate-100 outline-none text-lg"
          placeholder="Search for recipes..."
          // manipulating current url to add q-param based on i/p using onchange and navigate
          onChange={(e) => {
            if (e.target.value) return navigate(`?search=${e.target.value}`, { replace: true });
            navigate('/', { replace: true });
          }}
        />
        <span className="absolute left-2  text-slate-400">|</span>
      </div>
      <button className="h-full px-4 py-2 bg-lime-600 text-white flex items-center">
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
