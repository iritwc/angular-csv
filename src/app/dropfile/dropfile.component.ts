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
        console.log('drag enter');
        this.isDragging = true;
        e.stopPropagation();
        e.preventDefault();
    }
    onDragover(e) {
        console.log('drag over');
        e.stopPropagation();
        e.preventDefault();
    }
    onDragleave(e) {
        console.log('drag end', e);
        e.stopPropagation();
        e.preventDefault();
        this.isDragging = false;
    }
    onDrop(e) {
        console.log('drop');
        e.stopPropagation();
        e.preventDefault();
        this.isDragging = false;
        const dt = e.dataTransfer;
        const files = dt.files;
        this.drop.emit(files);
    }

}
