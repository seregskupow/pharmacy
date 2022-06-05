import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { FavouritesService } from './store/services/favourites.service';
import { CartService } from './store/services/cart.service';

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
    private primengConfig: PrimeNGConfig,
    private favService: FavouritesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.authService.authenticate();
    this.favService.getFavourites();
    this.cartService.getCartItems().subscribe();
  }
}
