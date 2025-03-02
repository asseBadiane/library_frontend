import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // Déclare le composant comme Standalone
  imports: [FormsModule, CommonModule], // Import FormsModule and CommonModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.authService.saveToken(response.access);
        // this.router.navigate(['/books']);
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }


}
