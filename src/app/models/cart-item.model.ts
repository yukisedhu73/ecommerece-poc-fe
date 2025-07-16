import { Product } from "./product.model";

// src/app/models/cart-item.model.ts
export interface CartItem {
    product: Product;
    quantity: number;
  }
  