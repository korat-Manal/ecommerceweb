import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product: any = null;
  quantity: number = 1; 
  isPlusActive: boolean = false;
  isMinusActive: boolean = false;

  constructor(private productDetailsService: ProductDetailsService, private router: Router, private wishlistService: WishlistService){}

  ngOnInit(): void {
    this.product = this.productDetailsService.getProduct();
    console.log("Product details:", this.product);     
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.activateButton('minus');
    }
  }

  increaseQuantity() {
    if (this.quantity < 5) {
      this.quantity++;
      this.activateButton('plus');
    }
  }

  activateButton(type: 'plus' | 'minus') {
    if (type === 'plus') {
      this.isPlusActive = true;
      setTimeout(() => this.isPlusActive = false, 300); 
    } else {
      this.isMinusActive = true;
      setTimeout(() => this.isMinusActive = false, 300); 
    }
  }
  
  buyNow(){
    if (!this.product.inStock) return;

    localStorage.setItem('buyNowProduct', JSON.stringify({
      product: this.product,
      quantity: this.quantity
    }));

    this.router.navigate(['/home/checkout']);
  }

  toggleWishList(product: any, event: Event){
    event.stopPropagation();
    product.isFavorite = !product.isFavorite;
    this.wishlistService.toggleWishlistItem(product);
  }
}
