import React from 'react';


const BudgetSet = React.lazy(() => import('./views/BudgetSet'));
// const Shop = React.lazy(() => import('./views/Shop'));
// const News = React.lazy(() => import('./views/News'));

const routes = [
  { path: '/', exact: true, name: 'Home' }, 
  // { path: '/user', name: 'User', component: User },
  // { path: '/shop', name: 'Shop', component: Shop },
  { path: '/budget-set', name: 'News', component: BudgetSet },

];

export default routes;
