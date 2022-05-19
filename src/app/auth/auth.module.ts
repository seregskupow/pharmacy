import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthProvidersComponent } from './components/auth-providers/auth-providers.component';
import { GoogleSvgComponent } from './components/auth-providers/providers-icons/google.component';
import { FacebookSvgComponent } from './components/auth-providers/providers-icons/facebook.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, AuthProvidersComponent, GoogleSvgComponent, FacebookSvgComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
