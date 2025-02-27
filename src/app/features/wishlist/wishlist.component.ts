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

  // Prevents triggering toggleCartVisibility and allowing user remove item from wishlist
  removeFromWishlist(product: any, event: Event) {
    event.stopPropagation();
    this.wishlistService.removeFromWishlist(product);
  }
  
  toggleCartVisibility(index: number) {
    this.selectedProductIndex = this.selectedProductIndex === index ? null : index;// triggers toggleCartVisibility
  }

  addToCart(product: any){  
    this.cartService.addToCart(product); // add items to cart
  }

  // move all items to carts except which are not inStock
  moveAllToCart() {
    this.wishList
    .filter(product => product.inStock)
    .forEach(product => {
      this.cartService.addToCart(product);
    });
  }
}
