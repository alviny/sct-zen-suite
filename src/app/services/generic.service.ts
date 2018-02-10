import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
};

@Injectable()
export class GenericService<T> extends BehaviorSubject<any[]> {

    constructor(private http: HttpClient, private baseUrl:string) {
        super([]);
    }

    private data: any[] = [];

    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, isNew?: boolean) {
        this.reset();
        if( isNew ){
            this.addItem(data);
        }else{
            this.updateItem(data);
        }
        this.fetch().subscribe(() => this.read(), () => this.read());

    }

    public remove(data: any) {
        this.reset();
        this.deleteItem(data);
        this.fetch().subscribe(() => this.read(), () => this.read());
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.data.find(item => item.id === dataItem.id);

        // revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

    private reset() {
        this.data = [];
    }

    private fetch(): Observable<any[]> {
        console.log('fetching..');
        return this.http
            .jsonp(this.baseUrl, 'callback')
            .pipe(map(res => <any[]>res));
    }
    private updateItem(item:any): void{
        console.log("update")
        let bodyString = JSON.stringify(item);
        let url = this.baseUrl + '/' + item.id;
        this.http.post(url, bodyString,httpOptions )
                 .subscribe(()=> console.log('updated successfully'));
    } 
    private addItem(item:any): void{
        console.log("add");
        let bodyString = JSON.stringify(item);
        this.http.put(this.baseUrl, bodyString,httpOptions )
                 .subscribe(() => console.log('added successfully.'));      
    }
    private deleteItem(item:any): void{

        let bodyString = JSON.stringify(item);
        let url = this.baseUrl + '/' + item.id;
        console.log("deleting " + url);
        this.http.delete(url,httpOptions )
                 .subscribe( ()=> console.log('deleted successfully'));
    }        
}
