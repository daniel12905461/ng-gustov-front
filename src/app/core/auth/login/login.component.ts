import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { AlertSwallService } from '../../service/alert-swall.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  viewPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    public alertSwal: AlertSwallService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      password: ['', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]]
    });
  }
  
  login() {
    this.loading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.loading = false;
        })
      )
      .subscribe(
        (data: any) => {

          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data.user);

          this.alertSwal.showSwallSuccess(data);

          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          this.alertSwal.showSwallError(error.error);
          // console.log(error);
          
        }
      );
  }
}
