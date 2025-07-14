import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const credentials = { username: this.username, password: this.password };
this.authService.login(credentials).subscribe({
  next: (response: any) => {
    localStorage.setItem('token', response.token); // ✅ must match interceptor
    const decoded: any = jwtDecode(response.token);
    const role = decoded.role;

    if (role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  },
  error: () => {
    this.errorMessage = 'Invalid username or password.';
  },
});

  }
}
