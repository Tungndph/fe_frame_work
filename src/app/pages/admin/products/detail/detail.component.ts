import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductDetailComponent } from '../../../../components/product-detail/product-detail.component';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../../types/Products';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgFor, NgIf, ProductDetailComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'] // Đảm bảo "styleUrls" là số nhiều
})
export class DetailComponent implements OnInit {
  productService = inject(ProductService); // Inject ProductService
  route = inject(ActivatedRoute); // Inject ActivatedRoute
  router = inject(Router); // Inject Router

  productList: Product[] = [];
  product: Product | undefined;

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.productService.getDetailProductById(id).subscribe(
({
          next: (product) => {
            this.product = product;
          },
          error: (error) => {

          },
        }
      )

    );
  }
}
