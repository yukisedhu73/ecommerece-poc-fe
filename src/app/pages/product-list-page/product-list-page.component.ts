import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductListComponent } from '../../components/product-list/product-list.component'; // Import child component
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterModule],
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];
  isAdminRoute = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isAdminRoute = location.pathname.includes('admin');
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
}
