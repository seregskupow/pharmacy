import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isActivePath(pathName: string): boolean {
    console.log({ Path: this.router.url });
    return this.router.url.startsWith(`/auth/${pathName}`);
  }
}
