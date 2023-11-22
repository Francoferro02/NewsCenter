import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle{
  screenWidht: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(private router: Router) {}
  ngOnInit(){
    this.router.navigateByUrl('/');

  }
  title = 'NewsCenter';

  isSideNavCollapsed = false;
   screenWidht = 0;
   

   onToggleSideNav(data : SideNavToggle) : void {
    this.screenWidht = data.screenWidht;
    this.isSideNavCollapsed = data.collapsed; 
  }

  
}
