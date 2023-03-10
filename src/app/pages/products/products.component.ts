import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  template: `
    <section class="products">
      <app-product 
      (addToCartClick)="addToCart($event)"
      [product]="product" *ngFor="let product of products">
      </app-product>
    </section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor(private productSvc: ProductsService, private shoppingCartSvc: ShoppingCartService) { }
  ngOnInit(): void {
    this.productSvc.getProducts()
      .pipe(
        tap((productsList: Product[]) => this.products = productsList)
      )
      .subscribe();
  }

  addToCart(product: Product): void {
    console.log('add to cart', product);
    this.shoppingCartSvc.updateCart(product);
  }
}
