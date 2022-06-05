import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { Category } from '../../models/category/category.model';
import { CategoryService } from '../../services/category.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: MegaMenuItem[] = [];
  manufacturers: any = [];
  popularProducts: any = [];

  products: any = [
    {
      img: '/assets/banners/gaviscon.jpg',
    },
    {
      img: '/assets/banners/strepsils.png',
    },
    {
      img: '/assets/banners/tylenol.jpg',
    },
  ];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllParentCategories().subscribe((data) => {
      this.categories = data.map((category) => {
        return {
          label: category.name,
          items: [
            [
              {
                label: 'Subcategories',
                items:
                  category.SubCategories.map((subcat) => {
                    return {
                      label: subcat.name,
                      queryParams: { page: 0 },
                      routerLink: `./category/${subcat.name
                        .split(' ')
                        .join('-')}_${subcat.id}`,
                    };
                  }) || [],
              },
            ],
          ],
        };
      });
    });
    this.productService.getManufacturers().subscribe((data) => {
      this.manufacturers = data;
    });
    this.productService.getPopularProducts().subscribe((data: any) => {
      this.popularProducts = data;
    });
  }
}
