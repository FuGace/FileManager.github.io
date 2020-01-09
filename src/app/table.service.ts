import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class TableService {

  private ROOT_URL = 'http://80.93.49.48:8592';
  private dataSource = []; 

  constructor( private http: HttpClient ) { }

  public getRootFolder() {
    return this.http.get(this.ROOT_URL + '/file');
  }

  public getFolderChildren(parentFolderId) {
    const params = { parentFolderId };    
    return this.http.get(`${this.ROOT_URL}/file`, { params });
  }
  
  public getFolderParent(childrenFolderId) {
    const params = { childrenFolderId };    
    return this.http.get(`${this.ROOT_URL}/file`, { params });
  }
  
  public deleteDepartment(parentFolderId){
    const params = { parentFolderId };
    return this.http.delete(`${this.ROOT_URL}/file`, { params })
  }
}

// const url = `${this.ROOT_URL}/${id}`;
// return this.http.delete(url)    