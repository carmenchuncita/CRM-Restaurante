import { Component, Input, Output, EventEmitter, Injector } from '@angular/core';
import { NgComponentOutlet, CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav-panel',
  standalone: true,
  imports: [NgComponentOutlet, CommonModule],
  templateUrl: './sidenav-panel.component.html',
  styleUrls: ['./sidenav-panel.component.css'],
})
export class SidenavPanelComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() currentComponent: any;
  @Input() data: any; 
  @Output() close = new EventEmitter<void>();

  customInjector!: Injector;

  ngOnChanges(): void {
    if (this.data) {
      this.customInjector = Injector.create({
        providers: [
          { provide: 'panelData', useValue: this.data },
        ],
      });
    }
  }

  closePanel(): void {
    this.close.emit();
  }
}
