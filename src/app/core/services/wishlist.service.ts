import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = this.loadWishlist();
  private wishlistSubject = new BehaviorSubject<any[]>(this.wishlist);
  wishlist$ = this.wishlistSubject.asObservable();
  private wishlistCountSubject = new BehaviorSubject<number>(this.wishlist.length);
  wishlistCount$ = this.wishlistCountSubject.asObservable(); 
   
  constructor() {}
  private loadWishlist(): any[] {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  private saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this.wishlistSubject.next([...this.wishlist]); // ✅ Emit updated wishlist
    this.wishlistCountSubject.next(this.wishlist.length); // ✅ Emit updated count
  }

  getWishlist() {
    return this.wishlist;
  }

  removeFromWishlist(product: any) {
    const index = this.wishlist.findIndex(item => item.name === product.name);
    
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
    }
  }
  
  toggleWishlistItem(product: any) {
    const index = this.wishlist.findIndex(item => item.name === product.name);

    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(product);
    }
    
    this.saveWishlist();
  }
}
