import { Routes } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { SignUpComponent } from './features/resgister/sign-up/sign-up.component'; 
import { FooterComponent } from './shared/footer/footer.component'; 
import { LoginComponent } from './features/resgister/login/login.component';
import { WildcardComponent } from './shared/wildcard/wildcard.component';
import { ManageUserComponent } from './features/manage-user/manage-user.component';
import { CartComponent } from './features/cart/cart.component';
import { WishlistComponent } from './features/wishlist/wishlist.component'; 
import { HomeComponent } from './features/home/home.component';
import { CheckoutComponent } from './features/checkout/checkout.component'; 
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { authGuard } from './core/Auth/auth.guard';

export const routes: Routes = [
    { path: 'nav-bar', component: NavBarComponent},
    { path: 'footer', component:FooterComponent},
    { path: 'home', component: HomeComponent,  children: [
        { path: 'manage-user', component: ManageUserComponent },
        { path: 'cart', component: CartComponent, canActivate: [authGuard]},
        { path:'wishlist', component: WishlistComponent, canActivate: [authGuard]},
        { path:'checkout', component: CheckoutComponent, canActivate: [authGuard]},
        { path:'productDetails', component: ProductDetailsComponent }
    ]},
    { path: 'about',component: AboutComponent },
    { path: 'contact',component: ContactComponent},
    { path: 'sign-up', component: SignUpComponent},
    { path: 'login', component: LoginComponent},
    { path: 'manage-user', component: ManageUserComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: WildcardComponent } 
];