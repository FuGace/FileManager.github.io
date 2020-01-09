import { Component } from '@angular/core';
import { TableService } from './table.service';
import { beautifyDate } from './utils';
import { map } from 'rxjs/operators';


interface ParendId{
  id: string  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TableService]
})

export class AppComponent {
  dataSource = [];
  parentFolderId = [];

  constructor( private tableService: TableService) {}

  ngOnInit() {
    this.tableService.getRootFolder().subscribe((newDataSource) => {
      this.dataSource = newDataSource.data.map((item) => ({...item, createdAt: beautifyDate(item.createdAt), updatedAt: beautifyDate(item.updatedAt)})) 
    });
  }

  handleReturn() {
    console.log(1, this.dataSource)
    this.parentFolderId.pop();
    const lastChildId = this.parentFolderId[this.parentFolderId.length - 1]
    const fetchMethod = lastChildId ? 'getFolderChildren' : 'getRootFolder'
    this.tableService[fetchMethod](lastChildId)
      .subscribe((dataSource) => {           
        this.dataSource = dataSource.data.map((item) => ({
            ...item,
            createdAt: beautifyDate(item.createdAt),
            updatedAt: beautifyDate(item.updatedAt)
          })
        )
        console.log(2, this.dataSource)
      })
  };
  
  handleClick(parentFolderId){
    this.tableService.getFolderChildren(parentFolderId).subscribe((newDataSource) => {           
      this.dataSource = newDataSource.data.map((item)=>({...item, createdAt: beautifyDate(item.createdAt), updatedAt: beautifyDate(item.updatedAt)}))
    });
    this.parentFolderId.push(parentFolderId);
  };
}