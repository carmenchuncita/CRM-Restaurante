import { Component, OnInit ,inject} from '@angular/core';
import { MenusService } from '../../service/menus.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports:[CommonModule,RouterLink],
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  public todaysMenu: any | null = null;
private menusService: MenusService = inject(MenusService)!;

public menuList: any = [];
public currentMenu: any = null;
private currentIndex: number = 0;

  ngOnInit(): void {
    this.menusService.getAvailableMenuForToday().subscribe((menu) => {
      this.menuList = menu;
      if (this.menuList.length > 0) {
        this.currentMenu = this.menuList[this.currentIndex];
      }
    });
  }
}
