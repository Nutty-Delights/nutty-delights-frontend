import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart-Checkout/Cart';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme'
import BulkOrder from './pages/BulkOrder';
import Categories from './pages/Categories/Categories';
import ProductList from './pages/ProductList/ProductList';
import ProductPage from './pages/Product/ProductPage';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Admin from './pages/Admin/AdminPanel';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminApis from './pages/Admin/AdminApis';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminPayments from './pages/Admin/AdminPayments';
import UserAccount from './pages/UserAccount/UserAccount';
import Home from './pages/Home/Home';
import Checkout from './pages/Cart-Checkout/Checkout';
import PaymentSuccess from './pages/Payments/PaymentSuccess';
import Gifts from './pages/Gifts';
import Order from './pages/UserOrder/Order';
import ErrorPage from './pages/ErrorPage';



// creating the first route;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: < Home />
      },
      {
        path: 'cart',
        element: <Cart />,

      },
      {
        path: 'checkout',
        element: !localStorage.getItem('jwt') ? <Checkout /> : <ErrorPage></ErrorPage>


      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'payment/:orderId',
        element: <PaymentSuccess />
      },
      {
        path: 'bulk-orders',
        element: <BulkOrder />
      },
      {
        path: 'gifts',
        element: <Gifts />
      },
      {
        path: 'user/account',
        element: <UserAccount />

      },
      {
        path: 'user/orders/:orderId',
        element: <Order />,

      },
      // {
      //   path: 'products/',
      //   element: <ProductList />,
      // },
      // {
      //   path: ':productId',
      //   element: <ProductPage />
      // },


    ]
  },

  {
    path: '/products/',
    element: <ProductList />,
  },
  {
    path: '/:productId',
    element: <ProductPage />
  },
]);





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>

);

