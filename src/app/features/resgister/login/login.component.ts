
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

  //intialize form controls and stores data to local storage 

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl()
    });
    const localData = localStorage.getItem('users');
    if(localData){
      this.storedUser = JSON.parse(localData);
    }else {
      this.storedUser = [];
    }
  }

  // insert a token with authentication and checks if user is valid or not and stores the data of the currentUser to local Storage
  login(){

    const fakeToken = '123456789';

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
        this.authService.login(fakeToken);
        this.router.navigate(['/home']);
      }, 1000); 
    } else {
      this.toastr.error('Invalid username or password', 'Error');
    } 
  }
}
