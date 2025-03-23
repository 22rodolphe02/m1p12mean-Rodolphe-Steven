import {Routes} from '@angular/router';

const MechanicListComponent = () =>
  import('../mechanic/pages/mechanic-list-page/mechanic-list-page.component').then(m => m.MechanicListPageComponent);

export const mechanicRoutes: Routes = [
  {
    path: '',
    loadComponent: MechanicListComponent
  }
]
