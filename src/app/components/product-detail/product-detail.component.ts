import { Component, inject, Input, OnInit, DoCheck } from '@angular/core';
import { Product } from '../../../types/Products';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Correct import for Router
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgFor, NgIf, HeaderComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'] // Fixed styleUrls
})
export class ProductDetailComponent implements OnInit, DoCheck {


  productService = inject(ProductService); // Inject ProductService
  route = inject(ActivatedRoute); // Inject ActivatedRoute
  router = inject(Router); // Inject Router

  productList: Product[] = [];
  product: Product | undefined;

  ngOnInit(): void {
    this.getProductDetail();
  }

  ngDoCheck() {
    console.log(this.productList);
  }

  getProductDetail(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.productService.getDetailProductById(id).subscribe(
      (product) => {
        if (product) {
          this.product = product;
        } else {
          this.router.navigate(['/notfound']);
        }
      },
      (error) => {
        console.error('Error fetching product:', error);
        this.router.navigate(['/notfound']);
      }
    );
  }
}
