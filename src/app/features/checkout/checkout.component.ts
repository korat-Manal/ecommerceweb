import { CartService } from './../../core/services/cart.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutForm } from './../../core/model/checkout.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutData: any[] = [];
  checkoutForm!: CheckoutForm;
  currentDetails!: FormGroup;
  cartItems: any[] = [];
  subTotalPrice: number = 0;
  shippingCost: number = 0;
  grandTotalPrice: number = 0;

  constructor(private fb: FormBuilder,private router:Router, private cartService: CartService, private toastr: ToastrService) {}

  // accepts the product from the differnt components and saves the final order of the user woth all the required information
  // and also intiliaze the formcontrols and validations
  ngOnInit(): void {

    const buyNowData = localStorage.getItem('buyNowProduct');

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as any;

    if (buyNowData) {
      const { product, quantity } = JSON.parse(buyNowData);
      this.cartItems = [{ ...product, quantity }];
      this.subTotalPrice = product.price * quantity;
  
      // Clear buyNowProduct after loading it
      localStorage.removeItem('buyNowProduct');
    } else {
      // Load cart data normally if not from "Buy Now"
      const checkout = this.cartService.getCheckoutData();
      this.cartItems = checkout.cartItems || [];
      this.subTotalPrice = checkout.subTotal || 0;
    }
  
    this.shippingCost = this.subTotalPrice < 500 ? 10 : 0;
    this.grandTotalPrice = this.subTotalPrice + this.shippingCost;

    this.currentDetails = this.fb.group({
      name: new FormControl('', Validators.required),
      companyName: new FormControl(''),
      streetAddress: new FormControl('', Validators.required),
      apartmentName: new FormControl(''),
      city: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    const localData = localStorage.getItem('checkoutdata');
    this.checkoutData = localData ? JSON.parse(localData) : [];
  }

  // checks all the information are valid or not
  // if it is valid than allow the user to order the product the product and soters the value in local storage
  placeOrder() {
    if (this.currentDetails.invalid) {
      this.toastr.error('Details are invalid', 'Error'); 
      return;
    }

    const newDetails = this.currentDetails.value;

    const order = {
      ...newDetails,
      cartItems: this.cartItems,
      subTotal: this.subTotalPrice,
      shipping: this.shippingCost,
      grandTotal: this.grandTotalPrice,
      orderDate: new Date().toISOString(), 
    };

    this.checkoutData.push(order);
    localStorage.setItem('checkoutdata', JSON.stringify(this.checkoutData));
    this.toastr.success('Order is placed successfully', 'Success');
      
    setTimeout(()=>{
      this.router.navigate(['/home'])
    },1000);
    
    this.currentDetails.reset();
    this.cartService.clearCart();
  }
}
