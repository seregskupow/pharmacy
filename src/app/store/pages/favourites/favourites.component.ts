import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FavouritesService } from '../../services/favourites.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favItems: any = [];
  loading = true;

  constructor(
    private favService: FavouritesService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.favService.favsCount.subscribe((favs) => {
      if (!favs.length) {
        this.loading = false;
        this.favItems = [];
        return;
      }
      forkJoin(
        favs.map((fav) => this.productService.getProductById(fav))
      ).subscribe((res: any[]) => {
        this.favItems = res;
        this.loading = false;
      });
    });
  }

  removeFav(id: number) {
    this.favService.removeFavourite(id);
  }
}
