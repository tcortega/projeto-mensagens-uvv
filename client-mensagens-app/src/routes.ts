import { Routes } from '@angular/router';
import { SignupComponent } from './app/auth/pages/signup/signup.component';
import { LoginComponent } from './app/auth/pages/login/login.component';
import { ChatComponent } from './app/chat/pages/chat/chat.component';
import { AuthGuard } from './app/core/auth/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    children: [{ path: '', component: SignupComponent }],
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];