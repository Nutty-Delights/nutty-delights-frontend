import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme'
import Offers from './pages/Offers';
import BulkOrder from './pages/BulkOrder';
import Delivery from './pages/Delivery';
import Categories from './pages/Categories/Categories';
import ProductList from './pages/ProductList/ProductList';
import ProductPage from './pages/Product/ProductPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import Admin from './pages/Admin/AdminPanel';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminApis from './pages/Admin/AdminApis';



// creating the first route;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Categories />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'offers',
        element: <Offers />
      },
      {
        path: 'bulk-orders',
        element: <BulkOrder />
      },
      {
        path: 'delivery',
        element: <Delivery />
      },
      {
        path: 'products/',
        element: <ProductList />,
      },
      {
        path: ':productId',
        element: <ProductPage />
      },


    ]
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: 'categories',
        element: <AdminCategories />,
      },
      {
        path: 'Products',
        element: <AdminProducts />,
      },
      {
        path: 'apis',
        element: <AdminApis />,
      }
    ]

  }
]);





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

