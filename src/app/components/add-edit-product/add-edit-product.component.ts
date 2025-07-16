import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent {
  @Output() closeForm = new EventEmitter<void>();

  productForm: FormGroup;
  baseImageUrl = 'https://www.sampleurl/';
  productId: number | null = null; // <-- To detect update mode
  selectedFile: File | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      price: ['', [Validators.required]],
      imageFile: [null, Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProduct(this.productId);
        this.isEditMode = true;
      }
    });
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe(product => {
      const parts = product.imageurl.split('/');
      const fileName = parts[parts.length - 1];

      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        imageFile: `assets/product-images/${fileName}.jpeg`,
      });
    });
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Save temporary preview URL
        this.productForm.patchValue({
          imageFile: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
  }


  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = this.productForm.value;
    let imageUrl = '';

    if (this.selectedFile) {
      // If user selected new file, construct URL from filename
      const filename = this.selectedFile.name.split('.')[0];
      imageUrl = this.baseImageUrl + filename;
    } else if (typeof formData.imageFile === 'string') {
      if (formData.imageFile.startsWith('assets/')) {
        // Image is local path from loadProduct -> fix it to baseImageUrl
        const parts = formData.imageFile.split('/');
        const filename = parts[parts.length - 1].split('.')[0];
        imageUrl = this.baseImageUrl + filename;
      } else {
        // Otherwise assume it's already a correct URL (rare)
        imageUrl = formData.imageFile;
      }
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      imageUrl: imageUrl,
    };

    if (this.productId) {
      // Update
      this.productService.updateProduct(this.productId, payload).subscribe((res) => {
        this.notification.show('Product updated successfully!');
        this.router.navigate(['/admin']);
      });
    } else {
      // Add
      this.productService.addProduct(payload).subscribe((res) => {
        this.notification.show('Product Saved successfully!');
        this.router.navigate(['/admin']);
      });
    }
  }



  cancel() {
    this.router.navigate(['/admin']);
  }
}
