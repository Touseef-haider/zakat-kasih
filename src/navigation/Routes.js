import React from 'react';

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const Profile = React.lazy(() => import('../views/profile/Profile'));
const CartItems = React.lazy(() => import('../views/zakats/cartItems'));
const SingleCartItem = React.lazy(() => import('../views/zakats/singleCartItem'));
const SavedZakat = React.lazy(() => import('../views/zakats/savedZakat/savedZakat'));
// const Extra = React.lazy(() => import('../views/zakats/extraInfoAboutPendapatan'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', exact: true, component: Dashboard }, 
  { path: '/profile', name: 'Profile', exact: true, component: Profile }, 
  { path: '/cartItems', name: 'Cart Items', exact: true, component: Profile }, 
  { path: '/singleCartItem', name: 'Single Cart Item', exact: true, component: Profile }, 
  { path: '/savedZakat', name: 'Saved Zakat', exact: true, component: SavedZakat }, 
  // { path: '/info', name: 'info', exact: true, component: Extra }, 
  
  
];

export default routes;
