import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { enviroment } from '../../enviroment/enviroment';
import { Product } from '../../models/product/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor() {}
  private hubConnection!: signalR.HubConnection;
  private messageSource = new BehaviorSubject<Product|null>(null);
  currentMessage = this.messageSource.asObservable();
  // Start the SignalR connection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${enviroment.baseUrl}/notificationHub`) // Replace with your backend URL
      .build();

    return this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
      })
      .catch((err) => console.error('Error while starting connection: ' + err));
  };
  public disconnect = () => {
    this.hubConnection.stop().then(() => {
      console.log('Disconnected from hub');
    });
  };
  public addReceiveMessageListener = (
    callback: (user: string, message: string, product: Product) => void
  ) => {
    this.hubConnection.on('receiveNotification', (message: string) => {
      console.log(message);
    });
    this.hubConnection.on('receiveUpdatedProduct', (product: Product) => {
      this.messageSource.next(product);
    });
    this.hubConnection.on('sendReply', (message: string) => {
      console.log('Received reply from server:', message);
    });
  };

  // Method to receive messages from the server
  joinGroup(groupName: string):Promise<any> {
    return this.hubConnection
      .invoke('joinGroup', groupName)
      .catch((err) => console.error(err));
  }
  leaveGroup(groupName: string):Promise<any> {
    return this.hubConnection
      .invoke('leaveGroup', groupName)
      .catch((err) => console.error(err));
  }
}
