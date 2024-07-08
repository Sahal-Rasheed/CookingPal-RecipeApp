import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import { CategoryProvider } from './contexts/CategoryContext';
// import "./index.css";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CategoryProvider> <MainLayout /> </CategoryProvider>,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <HomePage /> },
            {
              path: 'recipe/:recipeId',
              element: <RecipeDetailPage />
            }
          ]
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
