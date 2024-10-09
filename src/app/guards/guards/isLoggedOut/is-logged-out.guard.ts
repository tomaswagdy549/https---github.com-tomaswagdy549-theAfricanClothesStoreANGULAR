import { CanActivateFn } from '@angular/router';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};
