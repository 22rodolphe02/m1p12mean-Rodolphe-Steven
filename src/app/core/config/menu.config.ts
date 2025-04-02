import {HeaderMenu} from '../models/menu.model';

export const adminHeaderMenuData: HeaderMenu[] = [
  {
    id: 1,
    label: 'Accueil',
    icon: 'pi pi-objects-column',
    link: '/user-space/admin/dashboard'
  },
  {
    id: 2,
    label: 'Clients',
    icon: 'pi pi-users',
    link: '/user-space/admin/clients'
  },
  {
    id: 3,
    label: 'Rendez-vous',
    icon: 'pi pi-send',
    link: '/user-space/admin/appointments'
  },
  {
    id: 4,
    label: 'Services',
    icon: 'pi pi-cog',
    link: '/user-space/admin/services'
  },
  {
    id: 5,
    label: 'Mécaniciens',
    icon: 'pi pi-users',
    link: '/user-space/admin/mechanics'
  },
]


export const clientHeaderMenuData: HeaderMenu[] = [
  {
    id: 1,
    label: 'Rendez-vous',
    icon: 'pi pi-send',
    link: '/user-space/client/appointments'
  },
  {
    id: 2,
    label: 'Voitures',
    icon: 'pi pi-car',
    link: '/user-space/client/vehicles'
  },
  {
    id: 3,
    label: 'Factures',
    icon: 'pi pi-cog',
    link: '/user-space/clients/invoices'
  },
]

export const mechanicalHeaderMenuData: HeaderMenu[] = [
  {
    id: 1,
    label: 'Rendez-vous',
    icon: 'pi pi-send',
    link: '/user-space/mechanic/appointments'
  },
  {
    id: 2,
    label: 'Interventions',
    icon: 'pi pi-cog',
    link: '/user-space/mechanic/interventions'
  },
]

export const menuByRole = {
  admin: adminHeaderMenuData,
  client: clientHeaderMenuData,
  mechanical: mechanicalHeaderMenuData
}



