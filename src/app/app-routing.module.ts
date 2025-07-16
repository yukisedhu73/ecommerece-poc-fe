// src/app/app-routing.module.ts
import { Routes } from '@angular/router';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component'
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListPageComponent },
  { path: 'products/:id', component: ProductDetailPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'admin', component: ProductListPageComponent },
  { path: 'admin/add-product', component: AddEditProductComponent },
  { path: 'admin/edit-product/:id', component: AddEditProductComponent },
];
