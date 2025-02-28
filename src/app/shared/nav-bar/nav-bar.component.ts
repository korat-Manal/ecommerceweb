import { BestSeller } from './../../core/model/home.model';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; 
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports:[RouterModule, CommonModule, FormsModule],
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
  searchQuery: string = '';
  products: any[] = [];
  filteredProducts: BestSeller[] = [];
  showDropdown: boolean = false;

  constructor(private router: Router, private authService: AuthService, private cartService: CartService, private wishlistService: WishlistService, private productService: ProductDetailsService) {}

  ngOnInit() {
    this.updateIsHome();

    this.productService.products$.subscribe((products) => {
      this.products = products;
    });

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

  // checks if we are in home component and make appropriate functionality visible accordingly
  private updateIsHome() {
    this.isHome = this.router.url.startsWith('/home');
  }

  profileMenu(): void {
    this.isOpen = !this.isOpen;// profile menu pops-up
  }

  navigateTo(route: string) {
    this.isOpen = false; // closes menu
    this.router.navigate([route]); // redirect
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; //main menu pops-up
  }

  //make changes in all the authentication related services or gaurd

  logout() {
    this.isOpen = false;
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/home']);
  }

    // Filter products based on search query
    onSearch() {
      if (this.searchQuery.length >= 2) {
        this.filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
  
        this.showDropdown = this.filteredProducts.length > 0;
      } else {
        this.filteredProducts = [];
        this.showDropdown = false;
      }
    }
  
    // When user selects a product from dropdown
    selectProduct(product: BestSeller) {
      this.searchQuery = product.name;
      this.showDropdown = false;
      this.navigateToProduct(product);
    }

  searchProduct() {
    if (!this.searchQuery.trim()) return;
  
    // if (!this.products || this.products.length === 0) {
    //   console.error("No products available for search.");
    //   return;
    // }
  
    const matchedProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  
    if (matchedProducts.length === 1) {
      this.navigateToProduct(matchedProducts[0]);
    } else if (matchedProducts.length > 1) {
      this.filteredProducts = matchedProducts;
      this.showDropdown = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No Product Found',
        text: 'Try searching for something else!',
      });
    }
  }
  navigateToProduct(product: BestSeller) {
    this.productService.setProduct(product);

    
    this.router.navigate(['/home/productDetails']);

    this.searchQuery = '';
    this.showDropdown = false;
  }
}