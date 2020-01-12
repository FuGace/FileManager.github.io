import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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

  public sendFile(formData) {
    const myHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "multipart/form-data")  
    return this.http.post(
      `${this.ROOT_URL}/file`, 
      formData, 
      { headers: myHeaders }
    )    
  } 
  
  public removeObj(parentFolderId: number) {    
    return this.http.delete(
      `${this.ROOT_URL}/file/` + parentFolderId)
  }

  public renamingName(parentFolderId: number, newBody) {
    return this.http.put(
      `${this.ROOT_URL}/file/` + parentFolderId, newBody)
  }  
}