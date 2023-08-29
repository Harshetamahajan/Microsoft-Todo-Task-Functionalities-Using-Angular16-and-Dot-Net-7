import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userDataForm!: FormGroup; // Add the non-null assertion operator here
  

  successMessage = '';
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private userService: UserLoginService, private router:Router) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize the form in ngOnInit
  }

  initializeForm(): void {
    this.userDataForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
     
    });
  }

  onSubmit() {
    if (this.userDataForm.valid) {
      // If the form is valid, send the data to the backend
      const formData = this.userDataForm.value;
      this.userService.addUser(formData).subscribe({
        next:(res=>{
          this.userDataForm.reset();
          this.router.navigate(['login']);
         alert("user added")
        }),
        error:(err=>{
          // alert(err?.error.message)
        
        })
      })

    } else {
      // If the form is invalid, show error messages for all fields
    Object.keys(this.userDataForm?.controls ?? {}).forEach((key) => {
      this.userDataForm?.get(key)?.markAsTouched();
      });
    }
  }
}