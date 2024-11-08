import { CanActivate } from '@angular/router';
import { AccountService } from '../../../services/accountService/account.service';
import { Injectable } from '@angular/core';
import { HandleResponse } from '../../../handlingResponse/handle-response';
@Injectable({
  providedIn: 'root',
})
export class isAdminGuard implements CanActivate {
  constructor(private accountService: AccountService) {}

  canActivate(): boolean {
    if (this.accountService.isAdmin()) {
      return true;
    }
    HandleResponse.handleError(
      'you are not authorized , login to process and retry'
    );

    return false;
  }
}
