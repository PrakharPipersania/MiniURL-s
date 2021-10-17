import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../modal';
import { Router } from '@angular/router';
import { UserURLService } from '../user-url.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  userForm:FormGroup;
  isValidUser?:boolean;

  constructor(private userService:UserURLService, private router:Router) { 
    this.userForm = new FormGroup({
      'userEmail': new FormControl('', [Validators.required, Validators.email]),
      'userPwd': new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  validateUser(){
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.userService.getUserByEmail(this.userForm.value.userEmail).subscribe((data) => {
        if(data.length>0) {
          if(data[0].userPwd===this.userForm.value.userPwd) {
            this.isValidUser=true;
            setTimeout(() => { this.router.navigate(['/']) }, 5000);
          } else {
            this.isValidUser=false;
          }
        } 
        if(this.isValidUser!==true) {
          this.isValidUser=false;
          setTimeout(() => { 
            this.isValidUser=undefined;
            this.userForm.reset();
          }, 2000);
        }
      },() => {
        alert("Something Went Wrong. Try Again Later!");
      })
      
    }
  }

}