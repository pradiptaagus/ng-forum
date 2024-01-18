import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TextButtonComponent } from '../../atoms/text-button/text-button.component';

@Component({
  selector: 'app-comment-button',
  standalone: true,
  imports: [TextButtonComponent],
  templateUrl: './comment-button.component.html',
  styleUrl: './comment-button.component.scss',
})
export class CommentButtonComponent {
  @Input() total: number = 0;

  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
