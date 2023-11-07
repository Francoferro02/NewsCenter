import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../components/Services/user.service';
import { User } from 'src/app/models/user.model'

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
  @Input() loggedIn: boolean = false;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidht = 0;

  user: User | null;

  constructor(private router: Router, private userService: UserService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.screenWidht = window.innerWidth;

    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      this.updateLoggedInValue(!!user);
      
      // Update the value of loggedIn
    })
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

  navegateTo(route: string) {
    this.router.navigate(['/', route])
  }

  updateLoggedInValue(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    console.log(this.loggedIn);
  }
  
}

