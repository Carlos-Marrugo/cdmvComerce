import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0); 

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
      this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));
    }
  }

    public getTotal(){
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }


  addToCart(product: any, quantity: number = 1, selectedColor: string) {
    const existingProduct = this.cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      product.quantity = quantity;
      this.cartItems.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + quantity);
    this.saveCart();
  }


  removeFromCart(productId: number) {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product) {
      this.cartItemCount.next(this.cartItemCount.value - product.quantity); 
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      this.saveCart();
    }
  }


  getCartItems(): any[] {
    return this.cartItems;
  }


  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemCount.next(0); 
    localStorage.removeItem('cart');
  }
}