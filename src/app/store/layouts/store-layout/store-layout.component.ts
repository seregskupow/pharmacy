import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { FavouritesService } from '../../services/favourites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.scss'],
})
export class StoreLayoutComponent implements OnInit {
  search: string = '';

  likedItems = 0;
  cartItems = 0;

  btnItems: MenuItem[] = [];

  products: any = [
    {
      img: '/assets/banners/banner-1.jpg',
    },
    {
      img: '/assets/banners/banner-2.jpg',
    },
    {
      img: '/assets/banners/banner-3.jpg',
    },
  ];

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public favService: FavouritesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSearch() {
    this.router.navigate(['search', this.search]);
  }
}
