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
