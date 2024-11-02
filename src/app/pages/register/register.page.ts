import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async onRegister() {
    if (this.email && this.password) {
      try {
        await this.authService.register(this.email, this.password);
        this.showToast('Registro Exitoso!', 'success');
      } catch (error: any) {
        this.showToast('Error: ' + error.message, 'danger');
      }
    } else {
      this.showToast('Por favor llena todos los campos', 'warning');
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
