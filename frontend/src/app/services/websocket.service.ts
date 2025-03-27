import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private echo: Echo<any>;
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor() {
    // Make Pusher available globally
    (window as any).Pusher = Pusher;

    //todo: refactor to environment variables
    // Initialize Laravel Echo
    this.echo = new Echo({
      broadcaster: 'reverb',
      key: 'pmf76rjfpjj6f4olbg1t', // REVERB_APP_KEY
      wsHost: '127.0.0.1', // REVERB_HOST
      wsPort: 8080, // REVERB_PORT
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws'],
    });

    console.log('Echo initialized', this.echo);
  }

  /**
   * Listen to a public channel
   */
  public listenToChannel(
    channelName: string,
    eventName: string
  ): Observable<any> {
    const subject = new Subject<any>();

    console.log(`Subscribing to ${channelName} channel, event: ${eventName}`);

    this.echo.channel(channelName).listen(eventName, (data: any) => {
      console.log(`Received event ${eventName} on ${channelName}:`, data);
      subject.next(data);
    });

    return subject.asObservable();
  }

  /**
   * Listen to a private channel
   */
  public listenToPrivateChannel(
    channelName: string,
    eventName: string
  ): Observable<any> {
    const subject = new Subject<any>();

    console.log(
      `Subscribing to private-${channelName} channel, event: ${eventName}`
    );

    this.echo.private(channelName).listen(eventName, (data: any) => {
      console.log(
        `Received event ${eventName} on private-${channelName}:`,
        data
      );
      subject.next(data);
    });

    return subject.asObservable();
  }

  /**
   * Leave a channel
   */
  public leaveChannel(channelName: string): void {
    this.echo.leave(channelName);
  }
}
