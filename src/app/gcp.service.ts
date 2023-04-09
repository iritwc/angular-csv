import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import * as d3 from 'd3-dsv';
import {DSVRowArray} from 'd3-dsv';

@Injectable({
  providedIn: 'root'
})
export class GcpService {

  constructor() { }

  parse(csvString: string = ''): Observable<DSVRowArray> {
      // return new Observable<GCPFile>(() => {
      //    const fileData = d3.csvParse(csvString);
      //    return new GCPFile(fileData);
      // }
      // );
      return of(d3.csvParse(csvString));
  }
  sortBy(lines: DSVRowArray, col: string): Observable<DSVRowArray> {
      return of(lines.sort((a, b) => {
          if (a[col] > b[col]) {return 1;}
          if (a[col] < b[col]) {return -1;}
          return 0;
        }));
  }
}
