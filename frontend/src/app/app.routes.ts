import { Routes } from '@angular/router';
import { MessagingComponent } from './components/messaging/messaging.component';

export const routes: Routes = [
  {
    pathMatch: 'full',
    redirectTo: 'message',
    path: '',
  },
  {
    path: 'message',
    component: MessagingComponent,
  },
];
