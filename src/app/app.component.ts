import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pharmacy-client';
  model: any;
  form = {
    type: '',
    username: '',
    password: '',
    rememberMe: true,
  };

  constructor(
    public authService: AuthService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.authService.authenticate();
  }
}
