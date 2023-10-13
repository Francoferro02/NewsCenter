import { Component } from '@angular/core';

interface SideNavToggle{
  screenWidht: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
   title = 'Home Page';

   isSideNavCollapsed = false;
   screenWidht = 0;

   onToggleSideNav(data : SideNavToggle) : void {
    this.screenWidht = data.screenWidht;
    this.isSideNavCollapsed = data.collapsed; 
  }
}
