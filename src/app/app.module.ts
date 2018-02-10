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

import { InventoryComponent } from 'app/inventory/inventory.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { GenericService } from 'app/services/generic.service';
import { Item } from './model/item';
@NgModule({
  declarations: [
    InventoryComponent,
    AppComponent,
    EditInventoryComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GridModule,
    DialogModule
  ],
  providers: [  
    {
      deps: [HttpClient],
      provide: 'InventoryService',
      useFactory: (jsonp:HttpClient) => (new GenericService<Item>(jsonp,'service/item'))
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
