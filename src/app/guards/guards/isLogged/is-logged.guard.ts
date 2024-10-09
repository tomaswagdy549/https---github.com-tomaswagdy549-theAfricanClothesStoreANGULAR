import { CanActivateFn } from '@angular/router';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('token')) {
    return true;
  }
  return false;
};
