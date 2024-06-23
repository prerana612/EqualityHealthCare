import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  msg!: string;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username === 'test@123' && password === '1234') {
      this.router.navigate(['/landingPage']);
    } else {
      this.msg = "Invalid username or password";
    }
  }


}
