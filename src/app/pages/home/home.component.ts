import {
  IInfiniteScrollEvent,
  InfiniteScrollModule,
} from 'ngx-infinite-scroll';

import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { CardItemComponent } from '../../components/organisms/card-item/card-item.component';
import { NavbarComponent } from '../../components/organisms/navbar/navbar.component';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NavbarComponent,
    CardItemComponent,
    RouterOutlet,
    InfiniteScrollModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  topicIdList: number[] = [];
  renderedTopicIdList: number[] = [];
  itemPerPage = 20;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  constructor(private topicService: TopicService, private router: Router) {}

  ngOnInit(): void {
    this.getTopic();
  }

  handleShowDetail(id: number) {
    this.router.navigate([id]);
  }

  getTopic() {
    this.topicService.getTopic().subscribe((data) => {
      this.topicIdList = data;
      this.renderedTopicIdList = data.slice(0, this.itemPerPage);
    });
  }

  onScrollDown(event: IInfiniteScrollEvent) {
    console.log('scrolled down!!', event);

    if (this.renderedTopicIdList.length < this.topicIdList.length) {
      const newList = this.topicIdList.slice(
        this.renderedTopicIdList.length - 1,
        this.renderedTopicIdList.length + this.itemPerPage
      );
      this.renderedTopicIdList = this.renderedTopicIdList.concat(newList);
    }
  }
}
