import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

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

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authenticate();
  }
}
