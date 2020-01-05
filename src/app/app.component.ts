import { Component } from '@angular/core';
import { TableService } from './table.service';
import { beautifyDate } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TableService ]
})
export class AppComponent {




//   ngOnInit() {
//     // this.folders = this.foldersService.folders
//   //   this.foldersService.getFolders().subscribe((folders) => {           
//   //     this.folders = folders.data.map((item)=>({...item,updatedAt: beautifyDate(item.updatedAt)}))
//   //     console.log(this.folders)    
//   //   });    
//   // }
    
}