import {Routes} from '@angular/router';
import {planningRoutes} from '../appointment/planning.routes';
import {serviceRoutes} from '../service/service.routes';

const ClientDetailComponent = () =>
  import('../admin/pages/client-details-page/client-details-page.component').then(m => m.ClientDetailsPageComponent);

const InterventionHistory = () =>
  import('./pages/client-intervention-history/client-intervention-history.component').then(m => m.ClientInterventionHistoryComponent);

const ClientDetailsInvoiceListPageComponent = () =>
  import('./pages/admin-clients-invoices-page/admin-clients-invoices-page.component').then(m => m.AdminClientsInvoicesPageComponent);

const InvoiceDetailsPageComponent = () =>
  import('../invoice/pages/invoice-details-page/invoice-details-page.component').then(m => m.InvoiceDetailsPageComponent);

const VehicleListComponent = () =>
  import('../admin/pages/client-vehicle-list-page/client-vehicle-list-page.component').then(m => m.ClientVehicleListPageComponent);

const MechanicListComponent = () =>
  import('../mechanic/pages/mechanic-list-page/mechanic-list-page.component').then(m => m.MechanicListPageComponent);

const AdminPieceListPageComponent = () =>
  import('./pages/admin-piece-list-page/admin-piece-list-page.component').then(m => m.AdminPieceListPageComponent);

export const adminRoutes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', loadComponent: () =>
      import('./pages/admin-dashboard-page/admin-dashboard-page.component').then(c => c.AdminDashboardPageComponent)
  },
  {
    path: 'pieces',
    loadComponent: AdminPieceListPageComponent
  },
  {
    path: 'clients',
    children: [
      {
        path: '', loadComponent: () =>
          import('../admin/pages/client-list-page/client-list-page.component').then(c => c.ClientListPageComponent),
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            loadComponent: ClientDetailComponent,
            children: [
              {
                path: 'vehicles',
                loadComponent: VehicleListComponent
              },
              {
                path: 'interventions-history',
                loadComponent: InterventionHistory
              },
              {
                path: 'invoices',
                children: [
                  {
                    path: '',
                    loadComponent: ClientDetailsInvoiceListPageComponent
                  },
                  {
                    path: ':invoiceId',
                    loadComponent: InvoiceDetailsPageComponent
                  },
                ]
              },
              {
                path: '',
                pathMatch: "full",
                redirectTo: 'vehicles'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'appointments',
    loadChildren: () => planningRoutes
  },
  {
    path: 'services',
    loadChildren: () => serviceRoutes
  },
  {
    path: 'mechanics',
    loadComponent: MechanicListComponent
  }
];
