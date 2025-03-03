import { Component } from '@angular/core';
import axios from 'axios';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private router: Router) {}

  async onRegister(): Promise<void> {
    try {
      const response = await axios.post('http://localhost:8000/api/users/register/', {
        username: this.username,
        password: this.password,
        email: this.email
      });
      console.log('Registration successful:', response.data);
      this.router.navigate(['/login']); // Redirect to login after registration
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Registration failed. Please check your details.');
    }
  }
}