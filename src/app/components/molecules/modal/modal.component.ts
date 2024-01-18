import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnChanges, OnDestroy {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isShow = changes['isShow'].currentValue;

    switch (isShow) {
      case true:
        this.document.body.style.overflow = 'hidden';
        break;
      case false:
        this.document.body.style.overflow = 'unset';
        break;
    }
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = 'unset';
  }

  @Input() isShow: boolean = false;

  @Output() onClickBg = new EventEmitter();

  handleClickBg() {
    this.onClickBg.emit();
  }
}
