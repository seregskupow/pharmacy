import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

declare var StripeCheckout: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) {}
  products: any = [];
  loading = true;
  handler: any;

  cartTotal = 0;

  ngOnInit(): void {
    this.getItems();

    this.handler = StripeCheckout.configure({
      key: 'pk_test_51L7OPULTdMMCzCtXGEWmGyijE6tRg3oS4e8SEjr8ivGZHLcvGSb3JsoubMT0zpvGjLhKEpcSq64scd3SoANmF9Mo00t4KnddW4',
      image: '/assets/images/logo.png',
      locale: 'auto',
      source: async (source: any) => {
        this.cartService.formOrder();
      },
    });
  }

  getItems() {
    this.cartService.getCartItems().subscribe((data) => {
      this.products = data;
      this.loading = false;
      this.cartTotal = data.reduce(
        (total: number, item: any) =>
          (total += item.quantity * item.Product.price),
        0
      );
    });
  }

  addItem(id: number) {
    this.cartService.addItem(id).subscribe((res) => {
      this.getItems();
    });
  }
  removeItem(id: number) {
    this.cartService.removeItem(id).subscribe((res) => {
      this.getItems();
    });
  }

  redirectToCheckout() {
    this.handler.open({
      name: 'Pharmacy',
      amount: this.cartTotal * 100,
    });
  }
}
