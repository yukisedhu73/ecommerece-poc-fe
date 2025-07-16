// product-detail.component.ts (Child Component)
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,  // Ensuring the component is standalone
  imports: [FormsModule],  // Import FormsModule here
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product: any = {}; // Receive product data from the parent component
  @Output() addToCart: EventEmitter<{ product: any, quantity: number }> = new EventEmitter(); // Event emitter

  quantity: number = 1;

  constructor(private location: Location) { }

  onAddToCart(): void {
    const event = { product: this.product, quantity: this.quantity }; // Event data
    this.addToCart.emit(event); // Emit the event with the correct data
  }

  getLocalImage(imageurl: string): string {
    if (!imageurl) {
      return 'assets/product-images/default.jpeg'; // fallback image if missing
    }

    const parts = imageurl.split('/');
    const fileName = parts[parts.length - 1]; // example "product1"

    return `assets/product-images/${fileName}.jpeg`;
  }

  goBack(): void {
    this.location.back();  // This will navigate to the previous route in history
  }
}

