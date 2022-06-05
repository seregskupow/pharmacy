import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavouritesService } from '../../services/favourites.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  products: any;
  totalRecords: number = 0;

  loading = true;

  manufacturers: any = [];
  selectedManufacturers: any = [];

  currentPage = 0;

  categoryId!: number;

  val: any;

  prodSub = new Subscription();

  priceSortOptions!: SelectItem[];
  priceSort = null;

  sortOrder!: number;

  sortField!: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    public favService: FavouritesService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      const search = params['searchslug'];

      this.activateRoute.queryParams.subscribe((query) => {
        const { page, manufacturers: manufacturersQuery, price } = query;

        this.productService.getManufacturers().subscribe((manufacturers) => {
          this.manufacturers = manufacturers;
          this.selectedManufacturers = manufacturersQuery
            ? this.manufacturers.filter((manuf: any) =>
                manufacturersQuery.includes(manuf.name)
              )
            : [];
        });
        this.productService
          .getProducts(null, page || 0, search, manufacturersQuery, price)
          .subscribe((data: any) => {
            this.currentPage = page * 9 || 0;
            this.products = data.data;
            this.totalRecords = data.totalRecords;
            this.loading = false;
          });
      });
    });
    this.priceSortOptions = [
      { label: 'Price High to Low', value: 'desc' },
      { label: 'Price Low to High', value: 'asc' },
    ];
  }

  ngOnDestroy(): void {
    this.prodSub.unsubscribe();
  }

  onPriceSortChange(event: any) {
    let value = event.value;
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: { price: value },
      queryParamsHandling: 'merge',
    });
  }

  onManufacturersChange(event: any) {
    let value = event.value;
    console.log({ selected: this.selectedManufacturers });
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        manufacturers: value.map((manufacturer: any) => manufacturer.name),
      },
      queryParamsHandling: 'merge',
    });
  }

  loadProducts(event: any) {
    const page = event.first / 9;
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
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
