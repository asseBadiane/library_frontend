import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  imagePreview: string | null = null;
  isLoading = false;
  submitted = false;
  user?: User;

  environment = environment;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadUserProfile();
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      profileImage: [null],
      username: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
    });
  }

  loadUserProfile() {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (user) => {
        console.log('Profil reçu:', user);
        this.user = user;

        // Mise à jour du formulaire avec les valeurs existantes
        this.profileForm.patchValue({
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          // Ne pas remplir le mot de passe
        });

        // Mise à jour de l'aperçu de l'image
        if (user.profile_image) {
          this.imagePreview = user.profile_image;
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
      },
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;

    const updatedUser: User = {
      ...this.user,
      username: this.profileForm.value.username,
      first_name: this.profileForm.value.first_name,
      last_name: this.profileForm.value.last_name,
      email: this.profileForm.value.email,
    };

    // Only include password if it was changed
    if (this.profileForm.value.password) {
      updatedUser.password = this.profileForm.value.password;
    }

    // Handle file upload
    const profileImageFile = this.profileForm.get('profileImage')?.value;

    if (profileImageFile && profileImageFile instanceof File) {
      const formData = new FormData();

      // Ajouter toutes les propriétés utilisateur au formData
      Object.keys(updatedUser).forEach((key) => {
        if (
          key !== 'profileImageFile' &&
          updatedUser[key] !== undefined &&
          updatedUser[key] !== null
        ) {
          formData.append(key, String(updatedUser[key]));
        }
      });

      // Vérifier le type du fichier et sa taille
      if (
        profileImageFile.type.match(/image\/(jpeg|png|jpg|gif)/) &&
        profileImageFile.size < 5000000
      ) {
        formData.append('profile_image', profileImageFile);

        console.log('Envoi du formulaire avec image');
        this.userService.updateProfile(formData).subscribe({
          next: (response) => {
            this.handleUpdateSuccess(response);
          },
          error: (error) => {
            console.error('Erreur détaillée:', error);
            this.handleUpdateError(error);
          },
        });
      } else {
        this.isLoading = false;
        alert(
          'Le fichier doit être une image (jpeg, png, jpg, gif) de moins de 5MB'
        );
      }
    } else {
      // Update without image - keep any existing image
      console.log('Envoi du formulaire sans image');
      this.userService.updateProfile(updatedUser).subscribe({
        next: (response) => {
          this.handleUpdateSuccess(response);
        },
        error: (error) => {
          console.error('Erreur détaillée:', error);
          this.handleUpdateError(error);
        },
      });
    }
  }

  handleUpdateSuccess(response: any) {
    this.isLoading = false;
    // Show success message
    alert('Profile updated successfully');
    // Navigate to dashboard or reload current page
    this.router.navigate(['/dashboard']);
  }

  handleUpdateError(error: any) {
    this.isLoading = false;
    console.error('Error updating profile:', error);
    alert('Failed to update profile. Please try again.');
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({
        profileImage: file,
      });
      this.previewImage(file);
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  }
}
