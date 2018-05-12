import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomerOrder } from '../model/customer_order';
@Component({
  selector: 'edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  public active = false;
  public editForm: FormGroup = new FormGroup({
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    //'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
});
  public ngOnInit(): void {
  }  
  @Input() public isNew = false;

  @Input() public set model(customerOrder: CustomerOrder) {
      console.log("EditOrderComponent:setModel");
      this.editForm.reset(customerOrder);

      this.active = customerOrder !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<CustomerOrder> = new EventEmitter();

  public onSave(e): void {
    console.log('onSave()');
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;

  }

  public onCancel(e): void {
      e.preventDefault();
      this.closeForm();
  }

  private closeForm(): void {
      this.active = false;
      this.cancel.emit();
  }



}
