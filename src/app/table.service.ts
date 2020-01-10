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

  public sendFile(formData) {    
    return this.http.post(`${this.ROOT_URL}/file`, formData, 
    { headers: {
      'Content-Type': "multipart/form-data" },
    })
      .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  } 
  
  public deleteFolder(id: number) {    
    return this.http.delete(`${this.ROOT_URL}/file/`+id)
  }

  public renamingName(name) {
    return this.http.put(`${this.ROOT_URL}/file/`, name)
  }
}