import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Topic } from '../../../interfaces/topic';
import { TopicService } from '../../../services/topic.service';
import { CommentComponent } from '../../molecules/comment/comment.component';
import { ModalComponent } from '../../molecules/modal/modal.component';

dayjs.extend(relativeTime);

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [
    ModalComponent,
    CommentComponent,
    CommonModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.scss',
})
export class CommentModalComponent implements OnInit {
  @Input() isShow: boolean = false;

  @Input() topicId: number | undefined;

  @Output() onClose = new EventEmitter();

  data: Topic | undefined;

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    if (this.topicId) {
      this.getDetail(this.topicId);
    }
  }

  handleClose() {
    this.onClose.emit();
  }

  getDetail(id: number) {
    this.topicService.getTopicDetail(id).subscribe((data) => {
      this.data = data;
    });
  }

  get time() {
    if (!this.data?.time) {
      return;
    }
    const date = dayjs.unix(this.data.time).fromNow();
    return date;
  }
}
