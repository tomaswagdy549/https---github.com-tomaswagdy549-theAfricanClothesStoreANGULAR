import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalDataService } from '../../services/globalService/global-data.service';
import { catchError, tap, throwError } from 'rxjs';
import { HandleResponse } from '../../handlingResponse/handle-response';
export function responseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const globalDataService = inject(GlobalDataService);
  globalDataService.apiCallSubject.next(true);
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        if (req.method != 'GET') {
          let operation: string = '';
          switch (req.method) {
            case 'POST':
              operation = 'Added';
              break;
            case 'PUT':
              operation = 'Updated';
              break;
            case 'DELETE':
              operation = 'Deleted';
              break;
          }
          HandleResponse.handleSuccess(`${operation} succesfully`);
        }
        globalDataService.apiCallSubject.next(false);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => {
        HandleResponse.handleSuccess(error.error.message);
        globalDataService.apiCallSubject.next(false);
      });
    })
  );
}
