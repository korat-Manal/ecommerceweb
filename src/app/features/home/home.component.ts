import { BestSeller } from "../../core/model/home.model";
import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { FooterComponent } from "../../shared/footer/footer.component"; 
import { CommonModule } from '@angular/common';
import { Banner } from "../../core/model/home.model";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from "../../core/services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [NavBarComponent, FooterComponent, CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{  
  banners: Banner[] = [
    { image: '/img16.png', title: 'iPhone 14 Series', description: 'Up to 10% off Voucher', link: '#shop-now' },
    { image: '/img18.jpeg', title: 'RTX 4090', description: 'Up to 40% off Voucher', link: '#shop-now' },
    { image: '/img19.png', title: 'House Lamp', description: 'Up to 10% off Voucher', link: '#shop-now' },
    { image: '/img20.png', title: 'Furniture', description: 'Up to 10% off Voucher', link: '#shop-now' },
  ];

  bestSeller: BestSeller[] = [
    {image: '/img26.png', name:'The north coat', price: '260', originalPrice:'$360', ratings: 4,  isFavorite: false},
    {image: '/img27.png', name:'Gucci duffle bag', price: '960', originalPrice:'$1160', ratings: 3, isFavorite : false},
    {image: '/img28.png', name:'RGB liquid CPU Cooler', price: '160', originalPrice:'$170', ratings: 4, isFavorite : false},
    {image: '/img29.png', name:'Small BookSelf', price: '360',originalPrice:'', ratings: 2, isFavorite : false},
    {image: '/img30.png', name:'Breed Dry Dog Food', price: '360',originalPrice:'', ratings: 2, isFavorite : false},
    {image: '/img31.png', name:'CANON EOS DSLR Camera', price: '360',originalPrice:'', ratings: 2, isFavorite : false},
    {image: '/img32.png', name:'ASUS FHD Gaming Laptop', price: '360',originalPrice:'', ratings: 2, isFavorite : false},
    {image: '/img33.png', name:'Curology Product Set ', price: '60',originalPrice:'', ratings: 2, isFavorite : false},
    {image: '/img34.png', name:'Kids Electric Car', price: '360',originalPrice:'', ratings: 2, isFavorite : false},
    {image: '/img35.png', name:'Jr. Zoom Soccer Cleats', price: '360',originalPrice:'', ratings: 2, isFavorite : false},
    {image: '/img36.png', name:'GP11 Shooter USB Gamepad', price: '360',originalPrice:'', ratings: 2, isFavorite : false},
    {image: '/img37.png', name:'Quilted Satin Jacket', price: '360',originalPrice:'', ratings: 2, isFavorite : false},
  ]

  currentBannerIndex = 0;
  slideInterval: any;
  showHomeContent: boolean = true;
  selectedProductIndex: number | null = null;
  showAllProducts = false;
  isFavorite: boolean = false;

  constructor(private router: Router, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
    this.updateHomeContent();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateHomeContent();
      this.cartService.getCartItems();
      this.cartService.cartCount$.subscribe(count => {
      });
    });

    this.slideInterval = setInterval(() => {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    }, 5000);
  }

  toggleWishList(product: any, event: Event){
    event.stopPropagation();
    product.isFavorite = !product.isFavorite;
  }
  toggleProducts() {
    this.showAllProducts = !this.showAllProducts;
  }

  toggleCartVisibility(index: number) {
    this.selectedProductIndex = this.selectedProductIndex === index ? null : index;
  }

  addToCart(product: any){  
    this.cartService.addToCart(product);
  }

  private updateHomeContent() {
    this.showHomeContent = this.router.url === '/home';
  }
  
  showBanner(index: number): void {
    this.currentBannerIndex = index;
  }
}
