import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Customer } from '../model/customer';

@Component({
  selector: 'edit-customer',
  templateUrl: './edit-customer.component.html',
  styles: [
    'input[type=text] { width: 100%; }'
  ],
})
export class EditCustomerComponent implements OnInit {
  public active = false;
  public editForm: FormGroup = new FormGroup({
      'id': new FormControl(),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      //'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
  });
  public ngOnInit(): void {
  }  
  @Input() public isNew = false;

  @Input() public set model(customer: Customer) {
      this.editForm.reset(customer);

      this.active = customer !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Customer> = new EventEmitter();

  public onSave(e): void {
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
