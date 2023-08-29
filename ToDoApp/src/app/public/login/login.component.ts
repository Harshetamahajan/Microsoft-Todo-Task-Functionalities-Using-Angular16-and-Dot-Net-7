import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Auth/auth.service';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user: any | null = null;
  loginForm: FormGroup;
  errorMessage: string = '';
public role!:string;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router, private userInfo: UserLoginService, private toast:NgToastService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const requestData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    console.log(requestData);
    this.userInfo.authinticateUser(requestData)
      .subscribe({

        next: (response) => {
          // console.log(response.message);
          this.loginForm.reset();
          this.authService.login(response); 
          // alert(response.message);
          // alert("login successfull")
          this.toast.success({detail:"SUCCESS", summary:response.message, duration:5000});
          this.authService.login(response);
          this.router.navigate(['/user/dashboard']);
        //   if(this.role=='user')
        //   this.router.navigate(['/user/dashboard']);
        // else if(this.role=="admin"){
          //  this.router.navigate(['/public/signup']);
          //  this.router.navigate(['/superadmin/manageRoles']);
        
       
        },
        error: (err) => {
          // alert("Something went wrong!"); // Replace toast with alert
          alert("login unsuccessfull")

          console.log(err);
        },
      });
  }
}




