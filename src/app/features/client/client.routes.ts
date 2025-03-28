import {Routes} from '@angular/router';

const ClientAppointmentsPageComponent = () =>
  import('../client/pages/client-appointments-page/client-appointments-page.component').then(m => m.ClientAppointmentsPageComponent);

const ClientAppointmentAddPageComponent = () =>
  import('../client/pages/client-appointment-add-page/client-appointment-add-page.component').then(m => m.ClientAppointmentAddPageComponent);


export const clientRoutes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full'
  },
  {
    path: 'appointments',
    children: [
      {
        path: '',
        loadComponent: ClientAppointmentsPageComponent
      },
      {
        path: 'new',
        loadComponent: ClientAppointmentAddPageComponent
      }
    ]

  }
];
