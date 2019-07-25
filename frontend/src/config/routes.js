import YXRO from '../apps/YXRO';
import { Home, Test } from '../pages';

const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  { divider: true },
  { header: true, name: "Calculations" },
  {
    path: '/yxro',
    name: 'YXRO',
    component: YXRO,
  },
  { divider: true },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
];

export default routes;
