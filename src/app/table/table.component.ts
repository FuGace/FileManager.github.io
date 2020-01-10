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
  
  @Input() dataSource: [];
  @Input() parentFolderId: [];
  @Output() handleItemClick = new EventEmitter();
  @Output() handleRemoveItem = new EventEmitter();  
  
  constructor( private tableService: TableService) {}

  getContent(id:number) {    
    this.handleItemClick.emit(id);
  }

  handleDelete(id:number) {    
    if(confirm('Вы хотите это удалить?')) {
      this.tableService.deleteFolder(id).subscribe(() => {
        this.getContent(this.parentFolderId[this.parentFolderId.length - 1])
      })
      
    }    
  }

  valueInput(value){
    this.tableService.renamingName(value).subscribe(() => {
      this.getContent(this.parentFolderId[this.parentFolderId.length - 1])
    })
  }
}