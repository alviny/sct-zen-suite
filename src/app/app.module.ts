import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
 
import { InventoryComponent } from 'app/inventory/inventory.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { GenericService } from 'app/services/generic.service';
import { Item } from './model/item';
import { Customer } from './model/customer';
import { CustomerOrder } from './model/customer_order';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { OrdersComponent } from './orders/orders.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule, AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
@NgModule({
  declarations: [
    InventoryComponent,
    AppComponent,
    EditInventoryComponent,
    CustomersComponent,
    EditCustomerComponent,
    OrdersComponent,
    EditOrderComponent,
    OrderDetailsComponent,
    SearchCustomerComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GridModule,
    DialogModule,
    LayoutModule, 
    InputsModule,
    DropDownsModule
  ],
  providers: [  
    {
      deps: [HttpClient],
      provide: 'InventoryService',
      useFactory: (jsonp:HttpClient) => (new GenericService<Item>(jsonp,'service/item'))
    },
    {
      deps: [HttpClient],
      provide: 'CustomerService',
      useFactory: (jsonp:HttpClient) => (new GenericService<Customer>(jsonp,'service/customer'))
    },
    {
      deps: [HttpClient],
      provide: 'OrderService',
      useFactory: (jsonp:HttpClient) => (new GenericService<CustomerOrder>(jsonp,'service/order'))

    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
