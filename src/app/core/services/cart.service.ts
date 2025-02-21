import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  private subTotalPrice: number = 0;
  private shippingCost: number = 0;
  private grandTotalPrice: number = 0;


  cartCount$ = this.cartCount.asObservable();

  constructor(private toastr: ToastrService) {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartCount.next(this.cartItems.length);
    }
  }

  addToCart(product: any) {


    const existingItem = this.cartItems.find(item => item.name === product.name);

    if (existingItem) {
      
      if (existingItem.quantity >= 5) {
        this.toastr.warning('You cannot add more than 5 of this item!', 'Limit Reached');
        return;
      }
      existingItem.quantity += 1;
      
    } else {
      product.quantity = 1;

      if (typeof product.price === 'string') {
        product.price = parseFloat(product.price.replace('$', ''));
      }
      
      this.cartItems.push(product);
    }

    this.toastr. success('Added to cart','Succuess')
    this.updateTotals();
    this.saveCart();
  }

  removeCartItem(index: number) {
    this.cartItems.splice(index, 1);
    this.updateTotals();
    this.saveCart();
  }

  increaseQuantity(index: number) {
    if (this.cartItems[index].quantity < 5) {
      this.cartItems[index].quantity += 1;
      this.updateTotals();
      this.saveCart();
    }
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.updateTotals();
      this.saveCart();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const itemPrice = Number(item.price) || 0;
      return total + itemPrice * (item.quantity || 1);
    }, 0);
  }

  getCartItems() {
    return this.cartItems.map(item => ({
      ...item,
      quantity: item.quantity ?? 1
    }));
  }
  
  getCartCount() {
    return this.cartCount$;
  }
  
  saveCart(){
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartCount.next(this.getTotalItemCount());  
  }
  
  getTotalItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  updateTotals() {
    this.subTotalPrice = this.getTotalPrice();
    this.shippingCost = this.subTotalPrice < 500 ? 10 : 0;
    this.grandTotalPrice = this.subTotalPrice + this.shippingCost;

    localStorage.setItem('subTotalPrices', this.subTotalPrice.toString());
    localStorage.setItem('shippingCosts', this.shippingCost.toString());
    localStorage.setItem('grandTotalPrices', this.grandTotalPrice.toString());
  }

  getCheckoutData(): any {
    return {
      cartItems: this.cartItems,
      subTotal: this.subTotalPrice,
      shipping: this.shippingCost,
      grandTotal: this.grandTotalPrice
    };
  }
  clearCart() {
    this.cartItems = [];
    this.cartCount.next(0);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('subTotalPrices');
    localStorage.removeItem('shippingCosts');
    localStorage.removeItem('grandTotalPrices');
  }
}