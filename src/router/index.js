import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';

import PartInfo from '../parts/PartInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBases from '../parts/RobotBases.vue';

import SidebarStandard from '../sidebars/SidebarStandard.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';
import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);


const children = [
  { path: 'heads', name: 'RobotHeads', component: RobotHeads },
  { path: 'arms', name: 'RobotArms', component: RobotArms },
  { path: 'torsos', name: 'RobotTorsos', component: RobotTorsos },
  { path: 'bases', name: 'RobotBases', component: RobotBases },
];

const routerOptions = {
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', components: { default: HomePage, sidebar: SidebarStandard } },
    { path: '/build', name: 'Build', components: { default: RobotBuilder, sidebar: SidebarBuild } },
    {
      /* for routes order is important
        So, this goes before to prevent 'browse'
        being interpreted as a part
      */
      path: '/parts/browse',
      name: 'BrowseParts',
      component: BrowseParts,
      children,
    },
    {
      path: '/parts/:type/:id',
      name: 'Parts',
      component: PartInfo,
      props: true,
      beforeEnter(to, from, next) {
        const isValidId = Number.isInteger(Number(to.params.id));
        next(isValidId);
      },
    },
    {
      path: '/cart',
      name: 'Cart',
      component: ShoppingCart,
    },
  ],
};
export default new Router(routerOptions);
