import {Component, OnInit, AfterViewInit} from '@angular/core';
import {GcpService} from './gcp.service';
import {GCP} from './gcp.model';
import {MessageService} from '../message.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-gcd',
    templateUrl: './gcd.component.html',
    styleUrls: ['./gcd.component.less']
})
export class GcdComponent implements OnInit {
    reader = new FileReader();
    columns: string[];
    fileName: '';
    term: string;
    list$!: Observable<GCP[]>;
    private searchTerms = new Subject<string>();
    constructor(private gcpService: GcpService, private messageService: MessageService) {}

    ngOnInit() {
        this.subscribeList();
        this.subscribeLoadFile();

    }
    subscribeList() {
        this.list$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            // distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.gcpService.search(term)),
        );
    }
    subscribeLoadFile() {
        this.reader.onload = (ev) => {
            const result = (ev.target as FileReader).result  as string;
            this.gcpService.parse(result).subscribe(columns => {
                this.columns = columns;
                console.log('onload', this.term, this.term);
                this.search(this.term);
            });
        };
    }
    remove(gcp: GCP) {
        this.gcpService.remove(gcp).subscribe( removed => {
            if (removed){
                this.search(this.term);
            }
        }  );
    }
    search(term: string): void {
        console.log(`search term ${term} this.term ${this.term}`);
        this.searchTerms.next(term);
    }
    onSort(event) {
        const col = event.target.value;
        console.log('sort', this.term);
        this.gcpService.sort(col).subscribe(order => this.search(this.term));
    }
    onUpload(event) {
        const file = event.target.files[0];
        if (!file) { return; }
        this.handleFile(file);
    }
    private handleFile(file) {
        this.fileName = file.name;
        this.reader.readAsText(file);
    }
    onDrop(files) {
        const csvRegexp = /^[-\w.\/]*csv[-\w.\/]*$/g;
        // filter out none-csv files
        for (const file of files) {
            if (csvRegexp.test(file.type)) {
                this.handleFile(file);
            } else {
                this.messageService.add(`Error uploadind a file of type ${file.type}. Expected *.csv.`);
            }
        }
    }

}
