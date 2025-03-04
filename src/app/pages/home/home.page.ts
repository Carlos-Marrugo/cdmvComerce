import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  cartItemCount: number = 0;
  selectedCategory: string = 'all';
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  searchProducts() {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
  // Filtrar por categ
  filterByCategory() {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe((data) => {
        this.filteredProducts = data;
      });
    }
  }

  goToProductDetail(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}