import {Routes} from '@angular/router';

const ClientAppointmentsPageComponent = () =>
  import('../client/pages/client-appointments-page/client-appointments-page.component').then(m => m.ClientAppointmentsPageComponent);

const ClientAppointmentAddPageComponent = () =>
  import('../client/pages/client-appointment-add-page/client-appointment-add-page.component').then(m => m.ClientAppointmentAddPageComponent);

const ClientVehiclesListPageComponent = () =>
  import('../client/pages/client-vehicles-list-page/client-vehicles-list-page.component').then(m => m.ClientVehiclesListPageComponent);

const ClientVehicleAddPageComponent = () =>
  import('../client/pages/client-vehicle-add-page/client-vehicle-add-page.component').then(m => m.ClientVehicleAddPageComponent);

export const clientRoutes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full'
  },
  {
    path: 'vehicles',
    children: [
      {
        path: '',
        loadComponent: ClientVehiclesListPageComponent
      },
      {
        path: 'new',
        loadComponent: ClientVehicleAddPageComponent
      }
    ]
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
