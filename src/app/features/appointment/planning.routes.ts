import {Routes} from '@angular/router';

const PlanningPageComponent = () =>
  import('../appointment/pages/planning-page/planning-page.component').then(m => m.PlanningPageComponent);

export const planningRoutes: Routes = [
  {
    path: '',
    loadComponent: PlanningPageComponent
  }
]
