import { Component, OnInit, Inject } from '@angular/core';
import { GenericService } from 'app/services/generic.service';
import { Customer } from '../model/customer';
import { State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { map } from 'rxjs/operators/map';
import { interval } from 'rxjs/observable/interval';
import { bufferCount } from 'rxjs/operators/bufferCount';
@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {
  public listItems: Observable<Customer>;
  private view: Observable<Customer>;
  private customerService: GenericService<Customer>;
  private gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  ngOnInit(): void {
    interval(1000).pipe(
      map((x) =>  console.log('data:' + x)),
      bufferCount(5)
    );    

  }
  constructor(@Inject('CustomerService') service: any) {
    this.view = service;

    this.view.read();

  } 
  public valueChange(value: any): void {
    console.log('valueChange:'+value);
  }

  public filterChange(filter: any): void {
      console.log('filterChange:'+ filter);
  }

  public open(): void {
    console.log('open');
  }

  public close(): void {
    console.log('close');
  }

  public focus(): void {
    console.log('focus');
  }

  public blur(): void {
    console.log('blur');
  }
}
