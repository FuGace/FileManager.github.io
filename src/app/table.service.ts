import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class TableService {

  private ROOT_URL = 'http://80.93.49.48:8592';

  constructor( private http: HttpClient ) { }

  public getRootFolder() {
    return this.http.get(this.ROOT_URL + '/file');
  }

  public getFolderChildren(parentFolderId) {
    const params = { parentFolderId };
    console.log(params)
    return this.http.get(`${this.ROOT_URL}/file`, { params });
  }  
}

  