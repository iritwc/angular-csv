import {Component, OnInit} from '@angular/core';
import {GcpService} from '../gcp.service';
import {DSVRowArray} from 'd3-dsv';

@Component({
    selector: 'app-gcd',
    templateUrl: './gcd.component.html',
    styleUrls: ['./gcd.component.less']
})
export class GcdComponent implements OnInit {

    gcps: DSVRowArray;
    reader = new FileReader();
    columns: string[];
    // gcpFiles: GCPFile[] = [];
    constructor(private gcpService: GcpService) {}

    ngOnInit() {
        this.subscribeLoadFile();
    }
    subscribeLoadFile() {
        this.reader.onload = (ev) => {
            const result = (ev.target as FileReader).result  as string;
            this.gcpService.parse(result).subscribe(gcps => {
                this.columns = gcps.columns;
                this.gcps = gcps;
            });
        };
    }

    onUpload(event) {
        const file = event.target.files[0];
        if (!file) {return;}
        this.handleFile(file);
    }
    onSort(event) {
        const col = event.target.value;
        this.gcpService.sortBy(this.gcps, col).subscribe(sorted => { this.gcps = sorted; });
    }
    handleFile(file) {
        this.reader.readAsText(file);
    }
    onDrop(files) {
        console.log(files)
        const csvRegexp = /^[-\w.\/]*csv[-\w.\/]*$/g;

        for (const file of files) {
            if (csvRegexp.test(file.type)) {
                console.log(file);
                this.handleFile(file);
            } else {
                console.log(`Error uploadind a file of type ${file.type}. Expected *.csv.`);
            }
        }
    }

}
