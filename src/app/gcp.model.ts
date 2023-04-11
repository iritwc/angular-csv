export class GCP {
    name: string;
    n: number;
    e: number;
    h: number;
}


export class GCPList {
    gcps: GCP[];
    columns: string[];
    set: any;
    constructor(gcpRows) {
        const set = new Set();
        this.gcps = gcpRows.filter(gcp => {
            if (set.has(gcp.name)) {
                return false;
            } else {
                set.add(gcp.name);
                return true;
            }
        }).map(gcp => gcp as GCP);
        this.columns = (gcpRows.columns) ? gcpRows.columns : [];
    }
}

export enum Order {
    none = 0,
    asc = 1,
    desc = 2
}

