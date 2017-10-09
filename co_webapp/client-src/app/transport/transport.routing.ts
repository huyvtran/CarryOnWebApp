import { Routes } from '@angular/router';

import { TransportPublishComponent } from './transport-publish.component';

export const TransportRoutes: Routes = [
    {

      path: '',
      children: [ {
          path: 'transport-publish',
          component: TransportPublishComponent
    }]
}
];
