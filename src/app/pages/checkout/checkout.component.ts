import { Component, OnInit } from '@angular/core';
import { StoresDataService } from './../products/services/stores.data.service';
import { switchMap, tap, delay } from 'rxjs/operators';
import { Store } from './../../shared/interfaces/stores.interface';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { Product } from './../products/interfaces/product.interface';
import { Details } from './../../shared/interfaces/order.interface';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from './../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: '',
  };

  cart: Product[] = [];

  isDelivery: boolean = true;

  stores: Store[] = [];

  constructor(
    private storesDataSvc: StoresDataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productsSvc: ProductsService) {
      this.checkIfCartIsEmpty();
     }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  };

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  };

  onSubmit({ value: formData }: NgForm): void {
    const data: Order = {
      ...formData,
      date: this.getCurrentDate(),
      isDelivery: this.isDelivery,
    };

    this.storesDataSvc.saveOrder(data)
      .pipe(
        tap(res => console.log('order -> ', res)),
        switchMap(({ id: orderId }) => {
          const details = this.prepareDetails();
          return this.storesDataSvc.saveDetailsOder({ details, orderId });
        }),
        tap(() => this.router.navigate(['/checkout/success-order-page'])),
        delay(2000),
        tap(() => this.shoppingCartSvc.resetCart())
      )
      .subscribe();

  };

  getStores(): void {
    this.storesDataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores)
      )
      .subscribe()
  };

  private getCurrentDate(): string {
    return new Date().toLocaleDateString();
  };

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const { id: productId, name: productName, quantity, stock } = product;
      const updateStock = (stock - quantity);
      this.productsSvc.updateStock(productId, updateStock)
        .pipe(
          tap(() => details.push({ productId, productName, quantity }))
        )
        .subscribe();
    });
    return details;
  };

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      )
      .subscribe()
  }

  private checkIfCartIsEmpty(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => {
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products']);
          }
        })
      )
      .subscribe()
  }
}
