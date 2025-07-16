import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddProductModel, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  addProduct(product: AddProductModel): Observable<AddProductModel> {
    return this.http.post<AddProductModel>(this.apiUrl, product);
  }

  updateProduct(id: number, product: AddProductModel): Observable<AddProductModel> {
    return this.http.put<AddProductModel>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addToCart(productId: number, quantity: number): void {
    // Logic to add product to cart via cart service
  }
}
