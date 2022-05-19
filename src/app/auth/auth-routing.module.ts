import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { ShouldAuthGuard } from './guards/should-auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
        canActivate: [ShouldAuthGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [ShouldAuthGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [ShouldAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
