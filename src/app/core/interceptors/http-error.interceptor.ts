import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {inject} from '@angular/core';
import {catchError, mergeMap, Observable, takeWhile, throwError, timer} from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next): Observable<any> => {
  const notificationService = inject(MessageService);

  console.log("salut")

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return retryStrategy()(throwError(() => error)).pipe(
        catchError((finalError: HttpErrorResponse) => {
          handleError(finalError, notificationService);
          return throwError(() => finalError);
        })
      );
    })
  );
};


function retryStrategy(maxRetries = 2, delayMs = 1000) {
  return (src: Observable<any>) => src.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (retryAttempt <= maxRetries && (error.status === 0 || error.status >= 500)) {
        return timer(delayMs);
      }
      return throwError(() => error);
    }),
    takeWhile((_, i) => i < maxRetries, true)
  );
}

function handleError(error: HttpErrorResponse, notificationService: MessageService): void {
  let userMessage = 'Une erreur est survenue';

  if (error.status === 0) {
    userMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
  } else if (error.status >= 500) {
    userMessage = 'Problème serveur. Veuillez réessayer plus tard.';
  } else if (error.status === 404) {
    userMessage = 'Ressource non trouvée.';
  } else if (error.status === 401 || error.status === 403) {
    userMessage = 'Non autorisé. Veuillez vous connecter.';
  }

  notificationService.add({severity: 'danger', summary:'', detail: userMessage});
}
