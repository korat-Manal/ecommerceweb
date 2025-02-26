import { BestSeller } from "../../core/model/home.model";
import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { FooterComponent } from "../../shared/footer/footer.component"; 
import { CommonModule } from '@angular/common';
import { Banner } from "../../core/model/home.model";
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from "../../core/services/cart.service";
import { ToastrService } from "ngx-toastr";
import { WishlistService } from "../../core/services/wishlist.service";
import { ProductDetailsService } from "../../core/services/product-details.service";

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [NavBarComponent, FooterComponent, CommonModule, RouterOutlet, RouterModule],
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
    {category:'women' ,image: '/img26.png', name:'The north coat',info:'Premium insulated coat designed for ultimate warmth and comfort. Made with high-quality, weather-resistant materials to protect against the elements. Lightweight yet durable, perfect for outdoor adventures or everyday wear.' ,price: '260', originalPrice:'$360', ratings: 4, reviews: 100, inStock:true ,  isFavorite: false},
    {category:'women' ,image: '/img27.png', name:'Gucci duffle bag',info:'Luxury travel bag crafted from high-quality materials with iconic Gucci design. Spacious interior with multiple compartments for organized storage. Durable handles and an adjustable shoulder strap for', price: '960', originalPrice:'$1160', ratings: 3, reviews: 100, inStock:true , isFavorite : false},
    {category:'home' ,image: '/img29.png', name:'Small BookSelf',info:'Compact and sturdy design, perfect for organizing books, décor, and essentials. Made from high-quality materials for durability and stability. Space-saving solution for home, office, or study rooms. Easy to assemble and stylishly fits any décor.', price: '360',originalPrice:'', ratings: 2, reviews: 100, inStock:true , isFavorite : false},
    {category:'pets' ,image: '/img30.png', name:'Breed Dry Dog Food',info:'Nutrient-rich formula tailored for optimal health and energy. Made with high-quality ingredients to support digestion, coat health, and strong muscles. No artificial flavors or preservatives. Perfect for daily feeding and balanced nutrition.', price: '360',originalPrice:'', ratings: 2, reviews: 100, inStock:false , isFavorite : false},
    {category:'camera' ,image: '/img31.png', name:'CANON EOS DSLR Camera',info:'High-performance DSLR with advanced imaging technology for stunning photos and videos. Features a powerful sensor, fast autofocus, and versatile lens compatibility. User-friendly controls with built-in Wi-Fi and HD video recording. Perfect for professionals and beginners alike.', price: '360',originalPrice:'', ratings: 2, reviews: 100, inStock:true , isFavorite : false},
    {category:'computers' ,image: '/img32.png', name:'ASUS FHD Gaming Laptop',info:'Powerful gaming laptop with a high-refresh-rate Full HD display for smooth visuals. Equipped with a high-performance processor and dedicated GPU for seamless gameplay. Advanced cooling system and RGB-backlit keyboard for an immersive gaming experience. Perfect for gamers and content creators.', price: '360',originalPrice:'', ratings: 2, reviews: 100, inStock: false , isFavorite : false},
    {category:'healthCare' ,image: '/img33.png', name:'Curology Product Set ',info:'Customized skincare regimen tailored to your skin’s unique needs. Includes a personalized formula, cleanser, and moisturizer for a complete skincare routine. Dermatologist-designed with high-quality ingredients to target acne, wrinkles, and dark spots. Gentle, effective, and perfect for all skin types.', price: '60',originalPrice:'', ratings: 2, reviews: 100, inStock:true , isFavorite : false},
    {category:'toys' ,image: '/img34.png', name:'Kids Electric Car',info:'Fun and safe ride-on car with realistic design and smooth driving experience. Features rechargeable battery, LED lights, music, and parental remote control for added safety. Durable construction with comfortable seating, perfect for indoor and outdoor adventures.', price: '360',originalPrice:'', ratings: 2, reviews: 100, inStock:true , isFavorite : false},
    {category:'sports' ,image: '/img35.png', name:'Jr. Zoom Soccer Cleats',info:'Lightweight and durable cleats designed for speed and agility on the field. Features a cushioned insole and responsive Zoom Air unit for comfort and performance. High-traction outsole for superior grip on various playing surfaces. Perfect for young athletes looking to elevate their game.', price: '360',originalPrice:'', ratings: 2, reviews: 100, inStock:false , isFavorite : false},
    {category:'gaming' ,image: '/img36.png', name:'GP11 Shooter USB Gamepad',info:'Ergonomic and responsive gamepad designed for precision gaming. Features a comfortable grip, dual analog sticks, and pressure-sensitive buttons for enhanced control. Plug-and-play USB connectivity for seamless compatibility with PC and gaming consoles. Perfect for FPS, racing, and action games.', price: '360',originalPrice:'', ratings: 2, reviews: 100, inStock:false , isFavorite : false},
    {category:'men' ,image: '/img37.png', name:'Quilted Satin Jacket',info:'Stylish and lightweight jacket with a smooth satin finish and quilted design for added warmth. Features a comfortable fit, ribbed cuffs, and a zip-up front for a classic look. Perfect for layering in any season, combining elegance with casual comfort.', price: '360',originalPrice:'', ratings: 2, reviews: 100, inStock:true , isFavorite : false},
    {category:'gaming' ,image: '/img39.png', name:'Havic HV G-92 Gamepad',info:'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble-free install & mess-free removal. Pressure sensitive.',price:'360',originalPrice:'', ratings: 2,reviews: 100, inStock:true , isFavorite : false}
  ]

  currentBannerIndex = 0;
  slideInterval: any;
  showHomeContent: boolean = true;
  selectedProductIndex: number | null = null;
  showAllProducts = false;
  isFavorite: boolean = false;
  filteredProducts: any[] = [];
  selectedCategory: string = '';
  filteredHeroProducts: any[]= [];
  selectedHeroCategory: string = '';

  isFilteredProductsVisible: boolean = false

  constructor(private router: Router, private cartService: CartService, private toastr: ToastrService, private wishlistService: WishlistService,private productDetailService: ProductDetailsService) { }

  ngOnInit() {
    this.updateHomeContent();
    this.filteredProducts = this.bestSeller;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateHomeContent();
      this.cartService.getCartItems();
      this.cartService.cartCount$.subscribe(count => {
      });
    });

    this.slideInterval = setInterval(() => {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    }, 5000);

    this.wishlistService.wishlist$.subscribe(wishlistItems => {
      this.bestSeller.forEach(product => {
        product.isFavorite = wishlistItems.some(item => item.name === product.name);
      });
    });
  }
  filterHeroProducts(category: string){
    this.isFilteredProductsVisible = true;
    this.selectedHeroCategory = category;
    this.filteredHeroProducts = this.bestSeller.filter(product => product.category === category);
  }

  filterProducts(category: string) {
    this.selectedCategory = category;
    this.filteredProducts = this.bestSeller.filter(product => product.category === category);
  }

  toggleWishList(product: any, index: number, event: Event){
    event.stopPropagation();
    product.isFavorite = !product.isFavorite;
    this.wishlistService.toggleWishlistItem(product);
  }

  productDetails(event: Event, product: any) {
    event.stopPropagation();
    
    if (!product || !product.name) {
      console.error("Error: Product name is undefined!", product);
      return;
    }
  
    this.productDetailService.setProduct(product);
  
    this.router.navigate(["/home/productDetails"]);
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
