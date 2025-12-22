import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/user-login';
import { authTokenKey, UserToken } from '../../models/user-token';
import { Router, RouterLink } from '@angular/router';
import { LoggedInStore } from '../../stores/logged-in.store';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly loggedInStore = inject(LoggedInStore);

  loginFormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  submit() {
    if (this.loginFormGroup.valid) {
      const user: Partial<UserLogin> = this.loginFormGroup.value;

      this.authService.login(user as UserLogin).subscribe({
        next: (response: UserToken) => {
          localStorage.setItem(authTokenKey, response.token || '');

          this.loggedInStore.set(true);

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loginFormGroup.setErrors({ invalidCredentials: true });
          console.error('Login failed', err);
        },
      });
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
