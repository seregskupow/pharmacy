import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-btn',
  templateUrl: './user-btn.component.html',
  styleUrls: ['./user-btn.component.scss'],
})
export class UserBtnComponent implements OnInit {
  authItems: MenuItem[] = [
    { label: 'Login', routerLink: '/auth/login' },
    {
      label: 'Register',
      routerLink: '/auth/register',
    },
  ];
  userItems: MenuItem[] = [
    {
      label: 'Logout',
      command: (event) => {
        this.authService.logout();
      },
    },
  ];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
