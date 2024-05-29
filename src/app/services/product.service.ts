import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddProductForm, Product, ProductAdd } from '../../types/Products';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private searchValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/products';

  constructor() { }
  // getAllProduct
  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // getDetailProduct
  getDetailProductById(id: number | string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // createProduct
  // createProduct(product:any):Observable<any>{
  //   return this.http.post<Product>(this.apiUrl, product);
  // }
  createProduct(data: Partial<AddProductForm>) {
    return this.http.post(this.apiUrl, data);
  }
  getLastProductId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/lastProductId`);
  }

  //updateProduct
  updateProductById(id: number | string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  //delete product
  deleteProductById(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



  setSearchValue(value: string): void {
    this.searchValueSubject.next(value);
  }

  getSearchValue(): Observable<string> {
    return this.searchValueSubject.asObservable();
  }

}
