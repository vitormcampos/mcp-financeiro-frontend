import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { authTokenKey } from '../models/user-token';

@Injectable({
  providedIn: 'root',
})
export class LoggedInStore {
  private readonly userLoggedIn = new BehaviorSubject<boolean>(
    Boolean(localStorage.getItem(authTokenKey)),
  );

  get() {
    return this.userLoggedIn.asObservable();
  }

  set(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }
}
