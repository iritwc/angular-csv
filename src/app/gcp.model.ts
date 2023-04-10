export class GCP {
    name: string;
    n: number;
    e: number;
    h: number;
    hide: boolean;
}


export class GCPList {
    gcps: GCP[];
    columns: string[];
    set: any;
    constructor(gcps) {
        this.set = new Set();
        this.gcps = gcps.filter(gcp => {
            if (this.set.has(gcp.name)) {
                return false;
            } else {
                this.set.add(gcp.name);
                return true;
            }
        }).map(gcp => gcp as GCP);
        this.columns = gcps.columns;
    }
}

