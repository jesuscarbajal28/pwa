import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Método de inicio de sesión
  async login(email: string, password: string) {
    try {
      // Intentar iniciar sesión directamente
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.router.navigate(['/home']); // Redirigir a la página de inicio u otra
      return userCredential;
    } catch (error: any) {
      // Manejo de errores específico de Firebase
      if (error.code === 'auth/wrong-password') {
        throw new Error('Contraseña incorrecta. Por favor intenta de nuevo.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('No hay alguna cuenta con este correo.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('El correo tiene un formato incorrecto');
      } else {
        throw new Error(
          'Error inesperado al iniciar sesión. Por favor intenta más tarde.'
        );
      }
    }
  }

  // Método de registro
  async register(email: string, password: string) {
    try {
      // Intentar crear una nueva cuenta
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return userCredential;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error(
          'El correo electronico ya está en uso por otra cuenta.'
        );
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('El correo tiene un formato incorrecto');
      } else if (error.code === 'auth/weak-password') {
        throw new Error(
          'La contraseña es demasiado débil. Por favor elige una más segura.'
        );
      } else {
        throw new Error(
          'Error inesperado al registrar. Por favor intenta más tarde.'
        );
      }
    }
  }
  // Método para cerrar sesión
  logout() {
    return this.afAuth.signOut();
  }
  getUser(): Observable<any> {
    return this.afAuth.authState; // Esto devuelve un observable del estado de autenticación
  }
}
