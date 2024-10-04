import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
@Input() headMessage:string=''
@Input() bodyMessage:string=''
}
