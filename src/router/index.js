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


Vue.use(Router);


const children = [
  { path: 'heads', name: 'RobotHeads', component: RobotHeads },
  { path: 'arms', name: 'RobotArms', component: RobotArms },
  { path: 'torsos', name: 'RobotTorsos', component: RobotTorsos },
  { path: 'bases', name: 'RobotBases', component: RobotBases },
];

const routerOptions = {
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/build', name: 'Build', component: RobotBuilder },
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
    },
  ],
};
export default new Router(routerOptions);
