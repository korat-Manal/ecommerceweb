import { WishlistService } from './../../core/services/wishlist.service';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  wishList: any[] = [];
  selectedProductIndex: number | null = null;
  
  constructor(private wishlistService: WishlistService, private cartService: CartService){

  }
  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishList = items;
    });
  }

  toggleCartVisibility(index: number) {
    this.selectedProductIndex = this.selectedProductIndex === index ? null : index;
  }

  addToCart(product: any){  
    console.log("Adding to Cart from Wishlist:", product);
    this.cartService.addToCart(product);
  }

  moveAllToCart() {
    this.wishList.forEach(product => {
      this.cartService.addToCart(product);
    });
  }
}
