import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-providers',
  templateUrl: './auth-providers.component.html',
  styleUrls: ['./auth-providers.component.scss'],
})
export class AuthProvidersComponent implements OnInit, OnDestroy {
  private isAuthSub = new Subscription();

  GOOLE_LOGIN_URL = environment.GOOGLE_LOGIN_URL;
  googleLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuth.subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['/']);
      }
    });
  }
  ngOnDestroy(): void {
    this.isAuthSub.unsubscribe();
  }

  redirectToGoogleSSO = async (url: string) => {
    let timer: NodeJS.Timeout | null = null;
    this.googleLoading = true;
    const newWindow = window.open(url, '_blank', 'width=500,height=600');

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          this.authService.authenticate();
          this.googleLoading = true;
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };
}
