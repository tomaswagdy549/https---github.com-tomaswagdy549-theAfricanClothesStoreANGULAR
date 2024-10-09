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
      if (event instanceof HttpResponse ) {
        if (req.method != 'GET' && !req.url.includes("user")) {
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
        let message = chceckRes(error);
        HandleResponse.handleError(message);
        globalDataService.apiCallSubject.next(false);
      });
    })
  );
}
function chceckRes(response: HttpErrorResponse) {
  let message = '';
  switch (response.status) {
    case 0:
      message = 'you are out of connection , check your internet connection';
      return message;
      break;
    case 401:
      message =
        'you are not authorized to execute this request , log to your account and try again';
      return message;
      break;
    case 429:
      message = 'too many requests , try again later please';
      return message;
      break;
  }
  return response.error.message;
}
