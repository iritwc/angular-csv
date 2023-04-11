import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import * as d3 from 'd3-dsv';
import { GCPList, GCP, Order } from './gcp.model';

@Injectable({
  providedIn: 'root'
})
export class GcpService {
    gcpList: GCPList;
    sortOrder: Order = Order.none;

    constructor() {
        this.gcpList = new GCPList([]);
    }
    parse(csvString: string = ''): Observable<string[]> {
        this.gcpList = new GCPList(d3.csvParse(csvString));
        this.sortOrder = Order.none;
        return of(this.gcpList.columns);
    }
    sort(col: string): Observable<Order> {
        if (this.sortOrder !== Order.asc) {
            this.sortOrder = Order.asc;
            this.gcpList.gcps = this.gcpList.gcps.sort((a, b) => {
                if (a[col] > b[col]) { return 1; }
                if (a[col] < b[col]) { return -1; }
                return 0;
            });
        } else {
            this.sortOrder = Order.desc;

            this.gcpList.gcps = this.gcpList.gcps.sort((a, b) => {
                if (a[col] < b[col]) { return 1; }
                if (a[col] > b[col]) { return -1; }
                return 0;
            });
        }
        return of(this.sortOrder);
    }
    search(term: string): Observable<GCP[]> {
        console.log('search server - term = ', term);
        if (!term.trim()) {
          return of(this.gcpList.gcps);
        }
        const filtered = this.gcpList.gcps.filter(gcp => gcp.name.toLowerCase().includes(term.trim().toLowerCase()));
        return of (filtered);
    }
    remove(col: string, value: string): Observable<GCP[]> {
        const { gcps } = this.gcpList;
        const i = gcps.findIndex((gcp: GCP) => gcp[col] === value);
        if (i > -1) {
          return of([...gcps.slice(0, i), ...gcps.slice(i + 1)]);
        }
        return of(gcps);
    }
}
