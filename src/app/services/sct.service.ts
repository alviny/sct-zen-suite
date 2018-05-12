import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';

export abstract class SctService extends BehaviorSubject<GridDataResult> {
    private BASE_URL = '/service/';
    constructor(
        private http: HttpClient,
        protected tableName: string
    ) {
        super(null);
    }

    public query(state: any): void {
        this.fetch(this.tableName, state)
            .subscribe(x => super.next(x));
    }

    protected fetch(tableName: string, state: any): Observable<GridDataResult> {
        const queryStr = `${toODataString(state)}&$count=true`;

        return this.http
            .get(`${this.BASE_URL}${tableName}?${queryStr}`)
            .pipe(
                map(response => (<GridDataResult>{
                    data: response['value'],
                    total: parseInt(response['@odata.count'], 10)
                }))
            );
    }
}

@Injectable()
export class CustomerOrderService extends SctService {
    constructor(http: HttpClient) { super(http, 'customer-order'); }

    public queryForCategory({ id }: { id: number }, state?: any): void {
        this.query(Object.assign({}, state, {
            filter: {
                filters: [{
                    field: 'id', operator: 'eq', value: id
                }],
                logic: 'and'
            }
        }));
    }

    public queryForProductName(ProductName: string, state?: any): void {
        this.query(Object.assign({}, state, {
            filter: {
                filters: [{
                    field: 'ProductName', operator: 'contains', value: ProductName
                }],
                logic: 'and'
            }
        }));
    }

}

@Injectable()
export class ItemService extends SctService {
    constructor(http: HttpClient) { super(http, 'Items'); }

    queryAll(st?: any): Observable<GridDataResult> {
        const state = Object.assign({}, st);
        delete state.skip;
        delete state.take;

        return this.fetch(this.tableName, state);
    }
}
