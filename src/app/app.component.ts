import { Component } from '@angular/core';

interface SideNavToggle{
  screenWidht: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewsCenter';

  isSideNavCollapsed = false;
   screenWidht = 0;
   

   onToggleSideNav(data : SideNavToggle) : void {
    this.screenWidht = data.screenWidht;
    this.isSideNavCollapsed = data.collapsed; 
  }

  
}
