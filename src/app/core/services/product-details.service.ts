import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private selectedProduct :any = null;

  constructor() { }

  setProduct(product: any){
    this.selectedProduct = product;
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  }

  getProduct(){
    return this.selectedProduct || JSON.parse(localStorage.getItem('selectedProduct') || '{}');
  }
}
