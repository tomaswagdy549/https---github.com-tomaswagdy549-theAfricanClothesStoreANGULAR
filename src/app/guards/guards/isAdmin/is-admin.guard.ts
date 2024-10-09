import { CanActivate } from '@angular/router';
import { AccountService } from '../../../services/accountService/account.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class isAdminGuard implements CanActivate {

  constructor(private accountService: AccountService) {}

  canActivate(): boolean {
    if (this.accountService.isAdmin()) {
      return true; 
    }
    return false; 
  }
}