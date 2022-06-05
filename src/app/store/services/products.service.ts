import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(
    category: number | null,
    page: number,
    search: string | null = null,
    manufacturers: string[] = [],
    priceSort: 'asc' | 'desc' = 'desc'
  ) {
    return this.http.get(
      environment.apiUrl +
        `/products?${category == null ? '' : 'category='}&page=${page}${
          search == null ? '' : `&search=${search}`
        }${
          manufacturers.length ? `&manufacturers=${manufacturers}` : ''
        }&price=${priceSort}`
    );
  }

  getProductById(id: number) {
    return this.http.get(environment.apiUrl + `/products/${id}`);
  }

  getManufacturers() {
    return this.http.get(environment.apiUrl + '/products/manufacturers');
  }

  getPopularProducts() {
    return this.http.get(environment.apiUrl + '/products/popular');
  }
}
