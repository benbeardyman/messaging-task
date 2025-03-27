import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { last, Subscription, timer } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-messaging',
  imports: [FormsModule, CommonModule],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.scss',
})
export class MessagingComponent implements OnInit, OnDestroy {
  public successMessage = '';
  public errorMessage = '';
  public lastReceivedMessageId = '';
  public mockedUserId = 1;
  private websocketMessageSubscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    // listen to messenger channel for MessageProcessed event
    this.websocketMessageSubscription = this.webSocketService
      .listenToChannel('messenger', 'MessageProcessed')
      .subscribe({
        next: (message) => {
          this.handleProcessedMessageEvent(message);
        },
        error: (error) => {
          console.error('Echo subscription error:', error);
          this.errorMessage = 'Echo error: ' + error.message;

          // Clear error message after 3 seconds
          timer(3000).subscribe(() => (this.errorMessage = ''));
        },
      });
  }

  handleProcessedMessageEvent(message: any) {
    // Check if the message is from the current mocked user
    // Needs refactoring to use actual logged in user and corresponding private channel
    if (message.userId === this.mockedUserId) {
      this.lastReceivedMessageId = message.messageId;
    }
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.websocketMessageSubscription) {
      this.websocketMessageSubscription.unsubscribe();
    }

    // Leave the channel
    this.webSocketService.leaveChannel('messenger');
  }

  sendMessage(form: NgForm) {
    if (form.value.message) {
      this.messagingService
        .sendMessage(form.value.message, this.mockedUserId)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Message sent successfully!';
            this.errorMessage = '';
            form.reset();

            // Clear success message after 3 seconds
            timer(3000).subscribe(() => (this.successMessage = ''));
          },
          error: (error) => {
            console.error('Error sending message:', error);
            this.errorMessage = `Error sending message`;
            this.successMessage = '';

            timer(3000).subscribe(() => (this.errorMessage = ''));
          },
        });
    }
  }

  // handle switch between mocked users
  toggleUser() {
    this.mockedUserId = this.mockedUserId === 1 ? 2 : 1;

    //clea last received message id
    this.lastReceivedMessageId = '';
  }
}
