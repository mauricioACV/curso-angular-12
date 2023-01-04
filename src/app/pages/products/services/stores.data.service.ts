import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from './../../../shared/interfaces/stores.interface';
import { Order } from "src/app/shared/interfaces/order.interface";
import { DetailsOrder } from './../../../shared/interfaces/order.interface';

@Injectable({
    providedIn: 'root'
})

export class StoresDataService {
    private apiURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getStores(): Observable<Store[]> {
        return this.http.get<Store[]>(`${this.apiURL}/stores`);
    };

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.apiURL}/orders`, order);
    };

    saveDetailsOder(details: DetailsOrder): Observable<DetailsOrder> {
        return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details);
    };
}