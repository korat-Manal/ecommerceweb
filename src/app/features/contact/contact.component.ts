import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ContactForm } from '../../core/model/contact-form.models';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact',
  standalone:true,
  imports: [NavBarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  contactData: any[]=[];
  contactForm!: ContactForm;
  currentMessage!: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService){
  }

  // intializing form controls and validations of the page and stores users message in the local storage
  ngOnInit(): void{
    this.currentMessage = this.fb.group({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
      message: new FormControl('',Validators.required)
    });

    const localData = localStorage.getItem('contactDetails');
    this.contactData = localData ? JSON.parse(localData): [];
    }

  // checks if values of the form are valid or not anf if the are valid than store the users message in localstorage
  onSubmit(){
    if(this.currentMessage.invalid){
      this.toastr.error('fill the details properly', 'Error');
      return;
    }

    const newDetails = this.currentMessage.value;

    this.contactData.push(newDetails);
    localStorage.setItem('contactDetails',JSON.stringify(this.contactData));
    this.toastr.success('submitted successfully', 'Success')
    this.currentMessage.reset();
  }
}
