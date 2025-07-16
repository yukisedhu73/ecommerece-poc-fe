import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

  // New: BehaviorSubject to track cart count live
  cartCount$ = new BehaviorSubject<number>(this.calculateCartCount());

  constructor(private notification: NotificationService) { }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const item = this.cartItems.find(c => c.product.id === product.id);
    if (item) {
      this.notification.show('Product is already present in the Cart!');
      return;
    } else {
      this.cartItems.push({ product, quantity });
      this.saveCart();
      this.notification.show('Product added to the Cart Successfully!');
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
    this.notification.show('Product is Removed from the Cart!');
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(c => c.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

  private updateCartCount(): void {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cartData?.length;
    this.cartCount$.next(count);
  }

  private calculateCartCount(): number {
    //just no of items enough not quantity count
    // return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    return this.cartItems?.length;
  }
}
