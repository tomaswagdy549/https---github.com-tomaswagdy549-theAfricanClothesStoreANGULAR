import { Injectable } from '@angular/core';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { MainPageMedia } from '../../models/mainPageMedia/main-page-media';

@Injectable({
  providedIn: 'root',
})
export class MainPageMediaService {
  constructor(private http: HttpClient) {}
  addMedia(media: FormData): Observable<GenericResponse<MainPageMedia>> {
    return this.http.post<GenericResponse<MainPageMedia>>(
      `${enviroment.baseUrl}/api/mainPageMedia`,
      media
    );
  }
  getAll(): Observable<GenericResponse<MainPageMedia[]>> {
    return this.http.get<GenericResponse<MainPageMedia[]>>(
      `${enviroment.baseUrl}/api/mainPageMedia`
    );
  }
  updateMedia(media: FormData): Observable<GenericResponse<MainPageMedia>> {
    return this.http.put<GenericResponse<MainPageMedia>>(
      `${enviroment.baseUrl}/api/mainPageMedia`,
      media
    );
  }
  deleteMedia(id: number): Observable<GenericResponse<Response>> {
    return this.http.delete<GenericResponse<Response>>(
      `${enviroment.baseUrl}/api/mainPageMedia?Id=${id}`
    );
  }
}
