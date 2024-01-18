import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CommentModalComponent } from '../../components/organisms/comment-modal/comment-modal.component';
import { Topic } from '../../interfaces/topic';

dayjs.extend(relativeTime);

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommentModalComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  @Input() id!: number;

  data: Topic | undefined;

  constructor(private location: Location) {}

  handleClose() {
    this.location.back();
  }
}
