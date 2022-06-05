import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Category } from '../models/category/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllParentCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/categories');
  }
}
