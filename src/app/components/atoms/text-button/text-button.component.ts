import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-button',
  standalone: true,
  imports: [],
  templateUrl: './text-button.component.html',
  styleUrl: './text-button.component.scss',
})
export class TextButtonComponent {
  @Input() variant: string = 'primary';

  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
