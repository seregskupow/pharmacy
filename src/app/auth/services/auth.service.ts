import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@dto/user.dto';
import { environment } from '@env/environment';
import { dataURItoBlob } from '@utils/dataUriToBlob';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { CartService } from 'src/app/store/services/cart.service';
import { FavouritesService } from 'src/app/store/services/favourites.service';

export interface AuthResponseData {
  email: string;
  name: string;
  avatar: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  private _isAuth = new BehaviorSubject<boolean>(false);

  public user = this._user.asObservable();
  public isAuth = this._isAuth.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private favService: FavouritesService
  ) {}

  signup(email: string, name: string, password: string, avatar: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=MyBoundary',
    });

    const blob = dataURItoBlob(avatar);
    const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
    const bodyFormData = new FormData();
    bodyFormData.append('avatar', file);
    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    console.log({ bodyFormData });
    return this.http
      .post<AuthResponseData>(
        `${environment.apiUrl}/auth/register`,
        bodyFormData
      )
      .pipe(
        catchError(this.handleError),
        tap(({ email, name, avatar }) => {
          this.handleAuthentication(email, name, avatar);
        })
      );
  }
  testLogin() {
    this._user.next(new User('email@email.com', 'nmame', 'avatar'));
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${environment.apiUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap(({ email, name, avatar }) => {
          this.handleAuthentication(email, name, avatar);
        })
      );
  }

  logout() {
    this.http.get(`${environment.apiUrl}/auth/logout`).subscribe((resp) => {
      this.handleLogout();
    });
  }

  authenticate() {
    return this.http
      .get<AuthResponseData>(`${environment.apiUrl}/users/me`)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (resp) => {
          const { email, name, avatar } = resp;
          this.handleAuthentication(email, name, avatar);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  private handleAuthentication(
    email: string,
    name: string,
    avatar: string | null
  ) {
    const user = new User(email, name, avatar);
    this._user.next(user);
    this._isAuth.next(true);
    this.cartService.getCartItems().subscribe();
  }

  private handleLogout() {
    this._user.next(null);
    this._isAuth.next(false);
    this.cartService.clear();
    this.favService.clear();
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    errorMessage = errorRes.error.message;
    return throwError(() => new Error(errorMessage));
  }
}
