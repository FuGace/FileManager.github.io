import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableService } from '../table.service';

  
@Component({
  selector: 'foldertable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TableService]
})

export class TableComponent {
  displayedColumns: string[] = ['icon', 'name', 'created', 'updated', 'actions'];
  isEdit = false;       
  
  @Input() dataSource: []
  @Input() parentFolderId: []
  @Output() handleItemClick = new EventEmitter();
  @Output() handleRemoveItem = new EventEmitter();
  
  constructor( private tableService: TableService) {
    console.log(this.dataSource)
  }

  handleClick(id) {
    console.log(id)
    this.handleItemClick.emit(id);
  }

  handleRemove(id){}
}