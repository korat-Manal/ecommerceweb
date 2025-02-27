declare var google: any; 
import { signUpObj } from '../../../core/model/sign-up.model';
import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone:true,
  imports: [NavBarComponent,FooterComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signupData: any[] = [];
  signUpForm!: FormGroup;
  currentUser!: signUpObj;

  // intializing the form controls

  constructor(private fb: FormBuilder, private toastr: ToastrService){
    this.signUpForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void{
    // if(typeof google !== 'undefined'){
    //   setTimeout(() => {
    //     if (typeof google !== 'undefined') { // ✅ Fix: Check if google is loaded
    //       google.accounts.id.initialize({
    //         client_id: '636339651514-9lni76fqsac7774l7f5vh68og27od54f.apps.googleusercontent.com',
    //         callback: (resp: any) => {
    //           console.log(resp);
    //         }
    //       });
    
    //       google.accounts.id.renderButton(document.getElementById("google-btn"), {
    //         size: 'large',
    //         shape: 'rectangle',
    //         width: 250
    //       });
    //     } else {
    //       console.error("Google SDK not loaded"); // ✅ Fix: Handle missing Google SDK
    //     }
    //   }, 500);
    // }
    const localData = localStorage.getItem('users');
    this.signupData = localData? JSON.parse(localData) : [];
  }

  // checks if the value are valid or not and if values are valid than stores that data in to local storage
  
  signUp(){
    if(this.signUpForm.invalid){
      this.toastr.error('please fill valid credntial', 'Error');
      return;
    }
    const userData = this.signUpForm.value;
    if(this.signupData.find(user => user.email === userData.email)){
      this.toastr.error('User already exist', 'Error');
      return;
    }

    this.signupData.push(userData);
    localStorage.setItem('users', JSON.stringify(this.signupData));
    this.toastr.success('User registered successfully','Success')
    this.signUpForm.reset();
  }
}
