import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl; // Usar la URL de environment

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`); // URL correcta para obtener todos los productos
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/category/${category}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/categories`);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products?title=${query}`);
  }
}