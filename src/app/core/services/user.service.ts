import { Injectable } from '@angular/core';
import {ResourceService} from './resource.service';
import {Client} from '../../features/client/models/client.model';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {

  constructor(http: HttpClient) {
    super(http)
    this.setApiUrl('users')
  }
}
