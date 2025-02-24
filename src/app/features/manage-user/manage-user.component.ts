import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit {
  editForm!: FormGroup;
  currentUser: any = {}; 
  allUsers: any[] = [];

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {

    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.allUsers = JSON.parse(usersData);
    }

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const storedUser = JSON.parse(userData);

      const loggedInUser = this.allUsers.find(user => user.email === storedUser.email);
      this.currentUser = loggedInUser || storedUser; 
    }

    this.editForm = this.fb.group({
      firstName: new FormControl(this.currentUser?.name || '', Validators.required),
      lastName: new FormControl(this.currentUser?.lastName || '', Validators.required),
      email: new FormControl(this.currentUser?.email || '', [Validators.required, Validators.email]),
      address: new FormControl(this.currentUser?.address || '', Validators.required),
      currentPassword: new FormControl(''),
      newPassword: new FormControl('', [Validators.minLength(6)]), 
      confirmPassword: new FormControl('')
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.toastr.error("Invalid details", 'Error');
      return;
    }

    const { firstName, lastName, email, address, currentPassword, newPassword, confirmPassword } = this.editForm.value;


    const updatedUser = {
      ...this.currentUser,
      name: firstName,
      lastName,
      email,
      address
    };

 
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        this.toastr.error("Please enter your current password.","Error");
        return;
      }
      if (currentPassword !== this.currentUser.password) {
        this.toastr.error("Current password is incorrect.", "Error");
        return;
      }
      if (!newPassword || !confirmPassword) {
        this.toastr.error("New password and confirm password cannot be empty.", "Error");
        return;
      }
      if (newPassword.length < 6) {
        this.toastr.error("New password must be at least 6 characters.", "Error");
        return;
      }
      if (newPassword !== confirmPassword) {
        this.toastr.error("New password and confirm password do not match.", "Error");
        return;
      }

   
      updatedUser.password = newPassword;
    }

    const userIndex = this.allUsers.findIndex(user => user.email === this.currentUser.email);
    if (userIndex !== -1) {
      this.allUsers[userIndex] = updatedUser; 
      localStorage.setItem('users', JSON.stringify(this.allUsers)); 
    }

  
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    this.toastr.success("Profile updated successfully!", 'Success');
  }
}
