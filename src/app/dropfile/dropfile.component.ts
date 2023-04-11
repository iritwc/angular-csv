import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropfile',
  templateUrl: './dropfile.component.html',
  styleUrls: ['./dropfile.component.less']
})
export class DropfileComponent implements OnInit {

  @Output() drop = new EventEmitter<void>();
  isDragging = false;
  constructor() { }

  ngOnInit() {
  }

    onDragenter(e) {
        this.isDragging = true;
        e.stopPropagation();
        e.preventDefault();
    }
    onDragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    onDragleave(e) {
        e.stopPropagation();
        e.preventDefault();
        this.isDragging = false;
    }
    onDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        this.isDragging = false;
        const dt = e.dataTransfer;
        const files = dt.files;
        this.drop.emit(files);
    }

}
