import { Component, EventEmitter, Output } from '@angular/core';

interface SideNavToggle{
  screenWidht: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidht = 0;
  toggleCollapse() : void {
  this.collapsed = !this.collapsed;
  this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidht: this.screenWidht});
  }

  closeSidenav() : void {
  this.collapsed = false;
  this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidht: this.screenWidht});
  }
}
