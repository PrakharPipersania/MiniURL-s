import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../modal';
import { Router } from '@angular/router';
import { UserURLService } from '../user-url.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  userForm:FormGroup;
  isRegistered:boolean = false;

  constructor(private formBuilder: FormBuilder, private userService:UserURLService, private router:Router) { 
    this.userForm = this.formBuilder.group({
      'userName': new FormControl('', [Validators.required]),
      'userDob': new FormControl('', [Validators.required]),
      'userEmail': new FormControl('', [Validators.required, Validators.email]),
      'userPwd': new FormControl('', [Validators.required,Validators.minLength(8)]),
      'confirmPwd': new FormControl('', [Validators.required])
    },
    {
      validators: this.passwordValidator('userPwd','confirmPwd')
    });
  }

  ngOnInit(): void {
  }

  passwordValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.passwordValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  submitUser() {
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.userService.saveUser(this.userForm.value).subscribe(() => {
        this.isRegistered = true;
        setTimeout(() => { this.router.navigate(['/login']) }, 5000);
      },() => {
        alert("Something Went Wrong. Try Again Later!");
      })
      
    }
  }

}
