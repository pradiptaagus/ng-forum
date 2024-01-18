import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { Topic } from '../../../interfaces/topic';
import { TopicService } from '../../../services/topic.service';

dayjs.extend(relativeTime);

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @Input() commentId!: number;
  @Input() parentId?: number;

  data: Topic | undefined;

  isShowDencendant: boolean = false;

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    if (this.commentId) {
      this.getDetail(this.commentId);
    }
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

  toggleDencendantVisibility() {
    this.isShowDencendant = !this.isShowDencendant;
  }
}
