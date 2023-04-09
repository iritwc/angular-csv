import {DSVRowArray} from 'd3-dsv';

export class GCPFile {
    gcps: string[];
    columns: string[];
    set: any;
    constructor(gcps) {
        // this.set = new Set();
        // this.gcps = gcps.map( gcp => {
        //    if (!this.set.has(gcp.name)) {
        //        this.set.add(gcp.name);
        //        return gcp;
        //    }
        // });
        // this.columns = gcps.columns;
    }
}

