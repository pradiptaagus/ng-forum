import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: string = 'primary';

  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
