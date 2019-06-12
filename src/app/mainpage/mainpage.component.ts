import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
  providers: [NgbCarouselConfig] 
})
export class MainpageComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
 
  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  constructor(public dialog: MatDialog,config: NgbCarouselConfig) { 
    
  }

  ngOnInit() {
  }

}
