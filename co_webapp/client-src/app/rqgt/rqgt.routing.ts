import { Routes } from '@angular/router';

import { RqgtComponent } from './rqgt.component';

export const RqgtRoutes: Routes = [
    {

      path: '',
      children: [ {
          path: 'rqgt-list',
        component: RqgtComponent
    }]
}
];
