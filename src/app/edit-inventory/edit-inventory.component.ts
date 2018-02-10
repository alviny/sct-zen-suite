import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Item } from '../model/item';
@Component({
    selector: 'edit-inventory',
    styles: [
      'input[type=text] { width: 100%; }'
    ],
    templateUrl: './edit-inventory.component.html',
})
export class EditInventoryComponent{
    public active = false;
    public editForm: FormGroup = new FormGroup({
        'id': new FormControl(),
        'summary': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'price': new FormControl(0),
        //'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
    });

    @Input() public isNew = false;

    @Input() public set model(item: Item) {
        this.editForm.reset(item);

        this.active = item !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Item> = new EventEmitter();

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

