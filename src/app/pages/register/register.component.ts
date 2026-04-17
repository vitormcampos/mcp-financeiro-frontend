import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegister } from '../../models/user-register';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  registerFormGroup = this.formBuilder.group({
    username: ['', { validators: [Validators.required] }],
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: [
      '',
      { validators: [Validators.required, Validators.minLength(6)] },
    ],
    confirmPassword: ['', { validators: [Validators.required] }],
  });

  submit() {
    if (this.registerFormGroup.valid) {
      const user = this.registerFormGroup.value;

      this.authService.register(user as UserRegister).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
      });
    } else {
      this.registerFormGroup.markAllAsTouched();
    }
  }
}
