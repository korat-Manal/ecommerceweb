import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; 
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports:[RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isHome: boolean = false; 
  isAuthenticated: boolean = false;
  isOpen = false;
  cartCount = 0;
  wishlistCount: number = 0;

  constructor(private router: Router, private authService: AuthService, private cartService: CartService, private wishlistService: WishlistService) {}

  ngOnInit() {
    this.updateIsHome();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateIsHome();
    });

    this.authService.isAuthenticated().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });

    this.cartService.getCartCount().subscribe(count =>{
      this.cartCount = count;
    });

    const storedCart: { quantity: number }[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartCount = storedCart.reduce((total, item: { quantity: number }) => total + item.quantity, 0);  

    this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
  }

  private updateIsHome() {
    this.isHome = this.router.url.startsWith('/home');
  }

  profileMenu(): void {
    this.isOpen = !this.isOpen;
  }

  navigateTo(route: string) {
    this.isOpen = false;
    this.router.navigate([route]);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.isOpen = false;
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/home']);
  }
}