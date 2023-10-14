import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidht: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css'],
})
export class SideNavBarComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidht = 0;
  constructor(private router: Router){

  }

  ngOnInit():void {
    this.screenWidht = window.innerWidth;
  }
  
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidht: this.screenWidht,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidht: this.screenWidht,
    });
  }

  navegateTo(route : string){
    this.router.navigate(['/', route])
  }
}
