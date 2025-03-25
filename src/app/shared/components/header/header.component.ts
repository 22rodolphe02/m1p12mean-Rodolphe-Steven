import {Component, Input} from '@angular/core';
import {IsActiveMatchOptions, Router, RouterModule} from '@angular/router';
import {HeaderMenu} from '../../../core/models/menu.model';

@Component({
  selector: 'g-header',
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input({alias: 'menu'}) menus: HeaderMenu[] = []

  public activeUrl: IsActiveMatchOptions = {
    fragment: "ignored",
    matrixParams: "ignored",
    paths: "subset",  // Permet de garder l’état actif pour les sous-routes
    queryParams: "ignored"
  };


  // test: IsActiveMatchOptions

  // @Inject(Router) router !: Router

  constructor(private router: Router) {
  }
}
