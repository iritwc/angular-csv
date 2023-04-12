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
        // console.log('sort server ', col);
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
        // console.log('search server ', term);
        if (!term.trim()) {
          return of(this.gcpList.gcps);
        }
        const filtered = this.gcpList.gcps.filter(gcp => gcp.name.toLowerCase().includes(term.trim().toLowerCase()));
        return of (filtered);
    }
    remove(gcp: GCP): Observable<GCP[]> {
        const col = 'name';
        const value = gcp[col];
        const { gcps } = this.gcpList;
        const i = gcps.findIndex((g: GCP) => g[col] === value);
        if (i > -1) {
            return of(gcps.splice(i, 1));
        }
        return of(null);
    }
}
