import { CartService } from './../../core/services/cart.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  
  constructor(private cartService: CartService){

  }
  toggleWishList(product: any, event: Event){
    event.stopPropagation();
    product.isFavorite = !product.isFavorite;
  }

  addToCart(product: any){  
    this.cartService.addToCart(product);
  }
}
