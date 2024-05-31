import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductAdd } from '../../../../../types/Products';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../../types/Category';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule, CommonModule, NgToastModule, NgxPaginationModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  loading: boolean = false;
  product: Product | undefined;
  router = inject(Router);
  productId!: string;
  productService = inject(ProductService);
  file: any;
  preview: any;
  categoryList: Category[] = [];

  updateProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    isShowing: new FormControl(true)
  });

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
        private toast: NgToastService
  ) {}

 ngOnInit(): void {
    // Lấy ID từ route và gọi dịch vụ để lấy thông tin sản phẩm
    this.route.params.pipe(
      switchMap(params => {
        this.productId = params['id'];
        return this.productService.getDetailProductById(this.productId);
      })
    ).subscribe(
      product => {
        // Cập nhật dữ liệu vào form
        this.updateProductForm.patchValue(product);
      },
      error => {
        // Hiển thị thông báo lỗi và ghi log lỗi
        console.error('Error fetching product details:', error);
      }
    );

    // Fetch categories
    this.categoryService.getCategoryListAdmin().subscribe(
      categories => {
        this.categoryList = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit() {
    console.log(this.updateProductForm.value);
    this.loading = true;
    if (!this.productId) return;
    this.productService.updateProductById(this.productId, this.updateProductForm.value).subscribe({
      next: () => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Cập nhật sản phẩm thành công',
          duration: 5000, // Duration of the toast notification
          sticky: false,
        });

        // Delay navigation to give time for the toast notification to display
        setTimeout(() => {
          this.router.navigate(['/admin/products/list']);
        }, 2000); // 5-second delay to match the toast duration
      },
      error: (error) => {
        console.error(error.message);
        this.toast.error({
          detail: 'ERROR',
          summary: 'Có lỗi xảy ra khi cập nhật sản phẩm',
          duration: 5000,
          sticky: true,
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
      this.updateProductForm.patchValue({
        image: this.preview
      });
    };
  }
}
