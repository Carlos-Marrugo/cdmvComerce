import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastController } from '@ionic/angular'; // Importación correcta
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private toastController: ToastController, // Inyección correcta
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  async removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
    const toast = await this.toastController.create({
      message: 'Producto eliminado del carrito',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  async checkout() {
    const toast = await this.toastController.create({
      message: 'Procesando pago...',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();

    setTimeout(() => {
      this.router.navigate(['/checkout']);
    }, 2000);
  }
}