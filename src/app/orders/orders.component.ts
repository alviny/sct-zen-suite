import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';

import { SortDescriptor } from '@progress/kendo-data-query';

import { CustomerOrderService } from '../services/sct.service';
import { CustomerOrder } from '../model/customer_order';
import { Customer} from '../model/customer';
@Component({
  providers: [CustomerOrderService],  
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit,AfterViewInit {
  public view: Observable<GridDataResult>;
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  public skip = 0;

  @ViewChild(GridComponent) grid: GridComponent;

  public customerOrder:CustomerOrder;
  public isNew:boolean;
  constructor(private service: CustomerOrderService) { }

  public ngOnInit(): void {
      // Bind directly to the service as it is a Subject
      this.view = this.service;

      // Fetch the data with the initial state
      //this.loadData();
  }

  public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
      // Save the current state of the Grid component
      this.skip = skip;
      this.pageSize = take;
      this.sort = sort;

      // Reload the data with the new state
      //this.loadData();
  }

  public ngAfterViewInit(): void {
      // Expand the first row initially
      this.grid.expandRow(0);
  }

  private loadData(): void {
      console.log("OrdersComponent::loadData()::call query on service");
      //this.service.query({ skip: this.skip, take: this.pageSize, sort: this.sort });
  }
  public addCustomerOrderHandler() {
    console.log('addHandler::newCustomerOrder');
    this.customerOrder = new CustomerOrder();
    this.customerOrder.customer = new Customer();
    this.isNew = true;
  }
  public saveCustomerOrderHandler(customerOrder:CustomerOrder){
    console.log('saveCustomerOrderHandler');

  }
  public cancelCustomerOrderHandler(){
    console.log('cancelCustomerOrderHandler');

  }
}
