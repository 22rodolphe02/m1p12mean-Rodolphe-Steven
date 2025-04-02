import {Component, Input} from '@angular/core';
import {IsActiveMatchOptions, Router, RouterModule} from '@angular/router';
import {HeaderMenu} from '../../../core/models/menu.model';
import {AuthService} from '../../../core/auth/auth.service';
import {Button} from 'primeng/button';
import {User} from '../../../core/models/user.model';

@Component({
  selector: 'g-header',
  imports: [
    RouterModule,
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input({alias: 'menu'}) menus: HeaderMenu[] = []

  user!: User

  constructor(private router: Router, private authService: AuthService) {
    this.setUser();
    // console.log("ussse  ==== ", this.user)
  }


  logout(){
    this.authService.logout();
  }

  setUser(){
    this.user = this.authService.getCurrentUser()!;
  }
}
