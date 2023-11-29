import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() menuShow: boolean = false;
  @Output() menu = new EventEmitter<void>();

  ejecutarMenu() {
    this.menu.emit();
  }
}
