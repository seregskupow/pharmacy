import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { Category } from '../models/category/category.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _itemsCount = new BehaviorSubject<number>(0);

  public itemsCount = this._itemsCount.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getCartItems() {
    return this.http.get<any>(environment.apiUrl + '/cart').pipe(
      tap((data) => {
        if (!data.length) return;
        const itemsCount = data.reduce(
          (count: number, item: any) => (count += item.quantity),
          0
        );
        this._itemsCount.next(itemsCount);
      })
    );
  }

  addItem(productId: number) {
    return this.http
      .patch(environment.apiUrl + '/cart/add', { productId })
      .pipe(
        tap((res) => {
          this._itemsCount.next(this._itemsCount.getValue() + 1);
        })
      );
  }

  removeItem(productId: number) {
    return this.http
      .patch(environment.apiUrl + '/cart/remove', { productId })
      .pipe(
        tap((res) => {
          this._itemsCount.next(this._itemsCount.getValue() - 1);
        })
      );
  }

  formOrder() {
    return this.http
      .get(environment.apiUrl + '/cart/formorder')
      .subscribe((res) => {
        this._itemsCount.next(0);
        this.router.navigate(['/orders']);
      });
  }
}
