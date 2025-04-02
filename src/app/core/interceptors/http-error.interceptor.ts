import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {inject} from '@angular/core';
import {catchError, mergeMap, Observable, takeWhile, throwError, timer} from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next): Observable<any> => {

  // const messageService = inject(MessageService);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return retryStrategy()(throwError(() => error)).pipe(
        catchError((finalError: HttpErrorResponse) => {
          // handleError(finalError, messageService);
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

// function handleError(error: HttpErrorResponse, messageService: MessageService): void {
//
//   let userMessage = 'Une erreur est survenue';
//
//   if (error.statut === 0) {
//     userMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
//   } else if (error.statut >= 500) {
//     userMessage = 'Problème serveur. Veuillez réessayer plus tard.';
//   } else if (error.statut === 404) {
//     userMessage = 'Ressource non trouvée.';
//   } else if (error.statut === 401 || error.statut === 403) {
//     userMessage = 'Non autorisé. Veuillez vous connecter.';
//   }
//
//   messageService.add({severity: 'error', detail: userMessage, life: 5000})
// }
