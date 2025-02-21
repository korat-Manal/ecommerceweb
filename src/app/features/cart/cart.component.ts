import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  @Input() min: number = 0;
  @Input() max: number = 5;
  @Input() value: number = 1;
  cartItems: any[]=[];
  TotalPrice: number = 0;
  shippingCost: number = 0;
  subTotalPrice: number = 0;
  grandTotalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router){
    this.subTotalPrice = Number(localStorage.getItem('subTotalPrices')) || 0;
    this.shippingCost = Number(localStorage.getItem('shippingCosts')) || 0;
    this.grandTotalPrice = Number(localStorage.getItem('grandTotalPrices'))
  }

  ngOnInit(): void {
    this.loadCart();
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  removeItem(index: number){
    this.cartService.removeCartItem(index);
    this.cartItems = this.cartService.getCartItems();
  }

  getSubTotal(item: any): number {
    return Number(item.price) * item.quantity;
  }

  updateCart(){
    this.subTotalPrice = this.cartItems.reduce((total, item)=>  total + this.getSubTotal(item),0);
    this.shippingCost = this.subTotalPrice < 500 ? 10 : 0;
    this.grandTotalPrice = this.subTotalPrice + this.shippingCost;
  }

  increaseQuantity(index:number){
    this.cartService.increaseQuantity(index);
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  decreaseQuantity(index:number){
    this.cartService.decreaseQuantity(index);
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  updateTotalPrice(){
    this.TotalPrice = this.cartService.getTotalPrice();
  }

  proceedToCheckout() {
    this.cartService.updateTotals(); // Ensure values are updated
    this.router.navigate(['/home/checkout'])
  }
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }
}
