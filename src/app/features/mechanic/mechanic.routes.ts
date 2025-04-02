import {Routes} from '@angular/router';

const MechanicInterventionsPageComponent = () =>
  import('../mechanic/pages/mechanic-interventions-page/mechanic-interventions-page.component')
    .then(m => m.MechanicInterventionsPageComponent);

const MechanicAppointmentsPageComponent = () =>
  import('../mechanic/pages/mechanic-appointments-page/mechanic-appointments-page.component')
    .then(m => m.MechanicAppointmentsPageComponent);

const MechanicInterventionDetailsPageComponent = () =>
  import('../mechanic/pages/mechanic-intervention-details-page/mechanic-intervention-details-page.component')
    .then(m => m.MechanicInterventionDetailsPageComponent);


export const mechanicRoutes: Routes = [
  {
    path: 'appointments',
    loadComponent: MechanicAppointmentsPageComponent
  },
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: "full"

  },
  {
    path: 'interventions',
    loadChildren: () => [
      {
        path: '',
        loadComponent: MechanicInterventionsPageComponent
      }
    ]
  }
]
