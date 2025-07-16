// src/app/pages/cart-page/cart-page.component.ts
import { Component } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component'; // import CartComponent

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartComponent], // include CartComponent here
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'] // small typo earlier, use style**Urls**
})
export class CartPageComponent {}
