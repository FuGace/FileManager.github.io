import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableService } from '../table.service';
import { IdsHelper } from '../app.component';

  
@Component({
  selector: 'foldertable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TableService]
})

export class TableComponent {
  displayedColumns: string[] = ['icon', 'name', 'created', 'updated', 'actions'];
  isEdit = false;
  newName = ''
  newBody = {}
  
  @Input() dataSource: [];
  @Input() parentFolderId: IdsHelper;
  @Output() handleItemClick = new EventEmitter();
  @Output() handleRemoveItem = new EventEmitter();  
  
  constructor( private tableService: TableService) {}  

  getContent(id:number) {
    this.handleItemClick.emit(id);
  }

  handleDelete(id:number) {
    if(confirm('Вы хотите это удалить?')) {
      this.tableService
      .removeObj(id)
      .subscribe(() => {
        this
          .getContent(this.parentFolderId.getLastId())
      })      
    }    
  }

  nameChange(value){
    this.newName = value
    this.newBody = {
      "name": this.newName
    }
  }
  
  addChangeName(parentFolderId){
    this.tableService
    .renamingName(parentFolderId, this.newBody)
    .subscribe(() => {
      this
        .getContent(this.parentFolderId.getLastId())
    })      
  }
}