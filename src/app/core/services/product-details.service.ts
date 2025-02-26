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
    if (this.selectedProduct) {
      return this.selectedProduct;
    }

    try {
      const storedProduct = localStorage.getItem('selectedProduct');
      return storedProduct ? JSON.parse(storedProduct) : null;
    } catch (error) {
      console.error('Error parsing product from localStorage:', error);
      return null;
    }
  }
}
