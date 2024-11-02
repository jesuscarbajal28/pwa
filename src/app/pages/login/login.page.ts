// src/app/login/login.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async onLogin() {
    if (this.email && this.password) {
      try {
        await this.authService.login(this.email, this.password);
        this.showToast('Login successful!', 'success');
      } catch (error: any) {
        this.showToast(error.message, 'danger');
      }
    } else {
      this.showToast('Please fill in all fields', 'warning');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
}
