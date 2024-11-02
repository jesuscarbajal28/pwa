import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BromaComponent } from '../../components/broma/broma.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onLogout() {
    try {
      await this.authService.logout();
      this.showToast('¡Sesión cerrada con éxito!', 'success');
      this.router.navigate(['/login']); // Redirigir a la página de login después de cerrar sesión
    } catch (error: any) {
      this.showToast(
        'Error al cerrar sesión. Por favor intenta de nuevo.',
        'danger'
      );
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
