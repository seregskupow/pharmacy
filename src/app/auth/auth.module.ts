import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthProvidersComponent } from './components/auth-providers/auth-providers.component';
import { GoogleSvgComponent } from './components/auth-providers/providers-icons/google.component';
import { FacebookSvgComponent } from './components/auth-providers/providers-icons/facebook.component';
//Ngprime
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    AuthProvidersComponent,
    GoogleSvgComponent,
    FacebookSvgComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    RippleModule,
    PasswordModule,
    DividerModule,
    ImageModule,
    FileUploadModule,
    TooltipModule,
    MessagesModule,
    MessageModule,
    ToastModule,
  ],
})
export class AuthModule {}
