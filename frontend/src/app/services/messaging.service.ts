import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private apiUrl = 'http://127.0.0.1:8000/api/messages';

  constructor(private http: HttpClient) {}

  sendMessage(message: string, userId: number = 1): Observable<any> {
    const messagePayload = {
      user_id: userId,
      data: message,
    };

    return this.http.post(this.apiUrl, messagePayload).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error('Error sending message:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
