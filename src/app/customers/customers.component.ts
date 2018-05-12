import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject } from '@angular/core';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Customer } from '../model/customer';

import { map } from 'rxjs/operators/map';
import { GenericService } from 'app/services/generic.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
      sort: [],
      skip: 0,
      take: 10
  };

  public editDataItem: Customer;
  public isNew: boolean;
  private editService: GenericService<Customer>;

  constructor(@Inject('CustomerService') editServiceFactory: any) {
      this.editService = editServiceFactory;
  }

  public ngOnInit(): void {
      this.view = this.editService.pipe(map(data => process(data, this.gridState)));

      this.editService.read();
  }

  public onStateChange(state: State) {
      this.gridState = state;

      this.editService.read();
  }

  public addCustomerHandler() {
      this.editDataItem = new Customer();
      this.isNew = true;
  }

  public editCustomerHandler({dataItem}) {
      this.editDataItem = dataItem;
      this.isNew = false;
  }

  public cancelCustomerHandler() {
      this.editDataItem = undefined;
  }

  public saveCustomerHandler(customer: Customer) {
      this.editService.save(customer, this.isNew);

      this.editDataItem = undefined;
  }

  public removeCustomerHandler({dataItem}) {
      this.editService.remove(dataItem);
  }
  public addOrderHandler({dataItem}){
      this.editDataItem = dataItem;
      this.isNew = false;
      console.log('AddOrderHandler' + dataItem);
  }
}
