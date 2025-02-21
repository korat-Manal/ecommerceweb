
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [NavBarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  storedUser: any[] = [];
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService){

  }
  ngOnInit(): void {


    this.loginForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl()
    });
    const localData = localStorage.getItem('users');
    console.log('Local storage users:', localData); // Debugging
    if(localData){
      this.storedUser = JSON.parse(localData);
    }else {
      this.storedUser = [];
      console.log('No users found in localStorage');
    }
  }

  login(){
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.toastr.error('Email and password are required', 'Error');
      return;
    }
    const {email, password} = this.loginForm.value;
    const user = this.storedUser.find(user => user.email === email && user.password === password);

    if (user) {
    
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.toastr.success('Login successful', 'Success');

      setTimeout(() => {
        this.authService.login();
        this.router.navigate(['/home']);
      }, 1000); // ✅ Delay navigation
    } else {
      this.toastr.error('Invalid username or password', 'Error');
    } 
  }
}
