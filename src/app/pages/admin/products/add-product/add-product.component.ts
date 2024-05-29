import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  loading: boolean = false;

  productService = inject(ProductService);
  file: any;
  preview: any;

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl('0', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    isShowing: new FormControl(true)
  });

  categoryList: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategoryListAdmin().subscribe({
      next: (categories) => (this.categoryList = categories),
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  onSubmit() {
    console.log(this.addProductForm.value);
    this.loading = true;
    // Call API, navigate, show notification
    this.productService.createProduct(this.addProductForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Thêm sản phẩm thành công',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
        this.router.navigate(['/admin/products/list']);
      },
      error: (error) => {
        console.error(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã có lỗi xảy ra trong quá trình thêm sản phẩm.',
        });
        this.loading = false;
      },
    });
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.preview = reader.result;
      this.addProductForm.patchValue({
        image: this.preview
      });
    };
  }
}
