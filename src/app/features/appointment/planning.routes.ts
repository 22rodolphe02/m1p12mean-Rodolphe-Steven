import {Routes} from '@angular/router';

const PlanningPageComponent = () =>
  import('../admin/pages/admin-appointments-list-page/admin-appointments-list-page.component').then(m => m.AdminAppointmentsListPageComponent);

export const planningRoutes: Routes = [
  {
    path: '',
    loadComponent: PlanningPageComponent
  }
]
