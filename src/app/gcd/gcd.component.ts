import {Component, OnInit} from '@angular/core';
import {GcpService} from '../gcp.service';
import { GCPList } from '../gcp.model';

@Component({
    selector: 'app-gcd',
    templateUrl: './gcd.component.html',
    styleUrls: ['./gcd.component.less']
})
export class GcdComponent implements OnInit {
    reader = new FileReader();
    gcpList: GCPList;
    constructor(private gcpService: GcpService) {}

    ngOnInit() {
        this.subscribeLoadFile();
    }
    subscribeLoadFile() {
        this.reader.onload = (ev) => {
            const result = (ev.target as FileReader).result  as string;
            this.gcpService.parse(result).subscribe(gcpList => {
                this.gcpList = gcpList;
            });
        };
    }
    onUpload(event) {
        const file = event.target.files[0];
        if (!file) { return; }
        this.handleFile(file);
    }
    onSort(event) {
        const col = event.target.value;
        this.gcpService.sortBy(this.gcpList.gcps, col).subscribe(sorted => { this.gcpList.gcps = sorted; });
    }
    handleFile(file) {
        this.reader.readAsText(file);
    }
    onDrop(files) {
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
