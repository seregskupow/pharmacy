import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavouritesService } from '../../services/favourites.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: any;
  loading = true;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    public favService: FavouritesService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.activateRoute.snapshot.params['productslug'];
    this.productService.getProductById(+productId).subscribe((data) => {
      this.product = data;
      this.loading = false;
    });
  }

  productStatus(amount: number) {
    if (amount === 0) return 'outofstock';
    if (amount < 10) return 'lowstock';
    return 'instock';
  }

  addToCart(id: number) {
    this.authService.isAuth.subscribe((isAuth) => {
      if (!isAuth) {
        this.router.navigate(['/auth/login']);
        return;
      }
      this.cartService.addItem(id).subscribe();
    });
  }

  addFav(id: number) {
    this.favService.addFavourite(id);
  }
  removeFav(id: number) {
    this.favService.removeFavourite(id);
  }
}
