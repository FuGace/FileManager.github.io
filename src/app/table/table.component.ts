import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../table.service';
import { beautifyDate } from '../utils';

  export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  @Component({
    selector: 'foldertable',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    providers: [TableService]
  })

  export class TableComponent {
    displayedColumns: string[] = ['icon','name', 'created', 'updated', 'actions'];
    isEdit = false;
    dataSource = [];
    constructor( private tableService: TableService) {}
    
    ngOnInit(){
      // this.dataSource = this.tableService.dataSource
      this.tableService.getRootFolder().subscribe((dataSource) => {           
        this.dataSource = dataSource.data.map((item)=>({...item, createdAt: beautifyDate(item.createdAt), updatedAt: beautifyDate(item.updatedAt)}))
        console.log(this.dataSource)    
      });
    }
    handlelClick(parentFolderId){
      this.tableService.getFolderChildren(parentFolderId).subscribe((dataSource) => {           
        this.dataSource = dataSource.data.map((item)=>({...item, createdAt: beautifyDate(item.createdAt), updatedAt: beautifyDate(item.updatedAt)}))
        console.log(this.dataSource)    
      });
      };
      
    toggleEdit(){
      this.isEdit = !this.isEdit
    }  
  }     
  
