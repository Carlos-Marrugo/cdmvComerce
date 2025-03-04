import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'Carlos Commerce'; 
  cartItemCount: number = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}