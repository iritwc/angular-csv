import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import * as d3 from 'd3-dsv';
import { GCPList, GCP } from './gcp.model';

@Injectable({
  providedIn: 'root'
})
export class GcpService {

  constructor() { }

  parse(csvString: string = ''): Observable<GCPList> {
      // return new Observable<GCPFile>(() => {
      //    const fileData = d3.csvParse(csvString);
      //    return new GCPFile(fileData);
      // }
      // );
      return of(new GCPList(d3.csvParse(csvString)));
  }
  sortBy(lines: GCP[], col: string): Observable<GCP[]> {
      return of(lines.sort((a, b) => {
          if (a[col] > b[col]) {return 1;}
          if (a[col] < b[col]) {return -1;}
          return 0;
        }));
  }
  remove(gcps: GCP[], col: string, value: string): Observable<GCP[]> {
      const i = gcps.findIndex((gcp: GCP) => gcp[col] === value);
      if (i > -1) {
          return of([...gcps.slice(0, i), ...gcps.slice(i + 1)]);
      }
      return of(gcps);
  }
}
