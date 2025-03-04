import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: any; 

  constructor(private router: Router) {}

  viewProductDetail() {
    this.router.navigate(['/product-detail', this.product.id]);
  }

  getStars(rating: number): number[] {
    const stars = Math.round(rating); 
    return Array(stars).fill(0); 
  }
}