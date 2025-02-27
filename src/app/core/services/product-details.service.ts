import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private selectedProduct :any = null;

  constructor() { }

  //loads the data pf selected products to local storage
  setProduct(product: any){
    this.selectedProduct = product;
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  }

  
  getProduct(){
    if (this.selectedProduct) {
      return this.selectedProduct;
    }
    const storedProduct = localStorage.getItem('selectedProduct');
    return storedProduct ? JSON.parse(storedProduct) : null;
  }
}
