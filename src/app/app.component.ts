import { Component } from '@angular/core';
import { TableService } from './table.service';
import { beautifyDate } from './utils';
import { map } from 'rxjs/operators';

export class IdsHelper {
  ids = [];

  getLastId = () => this.ids[this.ids.length - 1] || null
  addId = (id: number) => this.ids.push(id)
  removeLastId = () => this.ids.pop()
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TableService]
})
export class AppComponent {
  dataSource = [];
  parentFolderId = new IdsHelper()
  nameFolder = '';

  constructor(private tableService: TableService) {}

  isEdit = true;

  ngOnInit() {
    this.tableService.getRootFolder()
      .subscribe((newDataSource) => {
      this.dataSource = newDataSource["data"].map((item) => ({
        ...item, 
        createdAt: beautifyDate(item.createdAt), 
        updatedAt: beautifyDate(item.updatedAt)
        })
      ) 
    })
  }

  getContent(parentFolderId) {
    this.tableService.getFolderChildren(parentFolderId || '')
      .subscribe((newDataSource) => {           
      this.dataSource = newDataSource["data"].map((item)=>({
        ...item,
        createdAt: beautifyDate(item.createdAt),
        updatedAt: beautifyDate(item.updatedAt)
        })
      )
    })
    this.parentFolderId.addId(parentFolderId);
  };

  handleReturn() {    
    this.parentFolderId.removeLastId();
    const lastChildId = this.parentFolderId.getLastId()
    const fetchMethod = lastChildId ? 'getFolderChildren' : 'getRootFolder'
    this.tableService[fetchMethod](lastChildId)
      .subscribe((dataSource) => {           
      this.dataSource = dataSource["data"].map((item) => ({
        ...item,
        createdAt: beautifyDate(item.createdAt),
        updatedAt: beautifyDate(item.updatedAt)
        })
      )        
    })
  }

  folderNameChange(value) {
    this.nameFolder = value    
  };
  
  addFolder() {  
    const formData: any = new FormData();    
    const requestObj = {
      fileTypeEnum: "FOLDER",
      parentFolderId : this.parentFolderId.getLastId(),
      name: this.nameFolder
    }
    const blobRequestObj = new Blob([JSON.stringify(requestObj)], {
      type: 'application/json',
    });    
    formData.append("requestObj", blobRequestObj);    
    this.tableService
      .sendFile(formData)
      .toPromise()
      .then(() => {        
        return this.getContent(this.parentFolderId.getLastId())
      })
  }  
}