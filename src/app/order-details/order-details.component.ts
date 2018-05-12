import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';

import { CustomerOrderService } from '../services/sct.service';

import { Item } from '../model/item'
import { Customer } from '../model/customer'
@Component({
  selector: 'order-details',
  providers: [CustomerOrderService],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {


    /**
     * The category for which details are displayed
     */
    @Input() public customer: any;

    public view: Observable<GridDataResult>;
    public skip = 0;

    constructor(private service: CustomerOrderService) { }

    public ngOnInit(): void {
        this.view = this.service;

        /*load products for the given category*/
        this.service.queryForCategory(this.customer, { skip: this.skip, take: 5 });
    }

    public pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;
        this.service.queryForCategory(this.customer, { skip, take });
    }

}
