import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GlobalDataService } from '../../../services/globalService/global-data.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent  {
  isLoading: boolean = false
  constructor(private GlobalDataService:GlobalDataService) {
    this.GlobalDataService.apiCallSubject.subscribe({
      next: (data) => {
        this.isLoading = data
      }
    })
  }
}
