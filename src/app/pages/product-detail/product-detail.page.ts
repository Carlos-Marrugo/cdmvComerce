import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: any;
  quantity: number = 1;
  selectedColor: string = '';
  availableColors: string[] = ['Rojo', 'Azul', 'Verde', 'Negro']; // Colores disponibles

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe((data) => {
        this.product = data;
      });
    }
  }

  // Método para verificar si el producto es ropa
  isClothing(product: any): boolean {
    const clothingCategories = ["men's clothing", "women's clothing"];
    return clothingCategories.includes(product.category);
  }

  // Método para aumentar la cantidad
  increaseQuantity() {
    this.quantity++;
  }

  // Método para disminuir la cantidad
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Método para agregar al carrito
  async addToCart(product: any) {
    this.cartService.addToCart(product, this.quantity, this.selectedColor);
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  // Método para generar las estrellas de calificación
  getStars(rating: number): number[] {
    const stars = Math.round(rating);
    return Array(stars).fill(0);
  }
}