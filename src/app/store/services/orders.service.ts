import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient, private router: Router) {}

  getOrder() {
    return this.http.get(environment.apiUrl + '/orders');
  }
}
