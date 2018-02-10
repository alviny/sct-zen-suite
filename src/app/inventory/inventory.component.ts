import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject } from '@angular/core';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Item } from '../model/item';
import { EditService } from '../services/edit.service';

import { map } from 'rxjs/operators/map';
import { GenericService } from 'app/services/generic.service';

@Component({
  selector: 'inventory',
  templateUrl: 'inventory.component.html',
})
export class InventoryComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    public editDataItem: Item;
    public isNew: boolean;
    private editService: GenericService<Item>;

    constructor(@Inject('InventoryService') editServiceFactory: any) {
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

    public addHandler() {
        this.editDataItem = new Item();
        this.isNew = true;
    }

    public editHandler({dataItem}) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(item: Item) {
        this.editService.save(item, this.isNew);

        this.editDataItem = undefined;
    }

    public removeHandler({dataItem}) {
        this.editService.remove(dataItem);
    }
}
