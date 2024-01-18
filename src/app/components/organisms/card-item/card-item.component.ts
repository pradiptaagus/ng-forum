import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Topic } from '../../../interfaces/topic';
import { TopicService } from '../../../services/topic.service';
import { BadgeComponent } from '../../atoms/badge/badge.component';
import { CommentButtonComponent } from '../../molecules/comment-button/comment-button.component';

dayjs.extend(relativeTime);

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [
    CommentButtonComponent,
    BadgeComponent,
    CommonModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent implements OnInit {
  @Input() topicId: number | undefined;

  @Output() onClickCommentBtn = new EventEmitter();

  data: Topic | undefined;

  isTrending: boolean = false;

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    if (this.topicId) {
      this.getDetail(this.topicId);
    }
  }

  handleClickCommentBtn() {
    this.onClickCommentBtn.emit();
  }

  getDetail(id: number) {
    this.topicService.getTopicDetail(id).subscribe((data) => {
      this.data = data;
      if (data?.descendants && data.descendants > 20) {
        this.isTrending = true;
      }
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
