import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private selectedProduct :any = null;
  private products: any[] = [];
  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();
  constructor() { }

  //loads the data pf selected products to local storage
  setProduct(product: any){
    this.selectedProduct = product;
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  }

  setProducts(products: any[]) {
    this.productsSource.next(products);
  }
  
  getProduct(){
    if (this.selectedProduct) {
      return this.selectedProduct;
    }
    const storedProduct = localStorage.getItem('selectedProduct');
    return storedProduct ? JSON.parse(storedProduct) : null;
  }

  getBestSellerProducts() {
    return this.products.filter(product => product.isBestSeller);
  }
  
}
