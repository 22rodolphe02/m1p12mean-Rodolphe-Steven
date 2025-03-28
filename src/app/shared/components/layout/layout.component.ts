import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {menuByRole} from '../../../core/config/menu.config';
import {AuthService} from '../../../core/auth/auth.service';
import {HeaderMenu} from '../../../core/models/menu.model';
import {Role} from '../../../core/models/user.model';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  protected menus!: HeaderMenu[] ;

  constructor(private authService: AuthService) {
    this.setMenus();
  }

  setMenus(): void{
    const role = this.authService.getRole();

    // if (role === Role.MECHANICAL){
    //   this.menus = menuByRole.mechanical;
    //   return ;
    // }else if(role == Role.CLIENT){
    //   this.menus = menuByRole.client
    // }
    //
    // this.menus = menuByRole.admin;

    this.menus = menuByRole.client
  }
}
