import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiUrl } from '../../config';
import { Topic } from '../interfaces/topic';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  constructor(private http: HttpClient) {}

  getTopic() {
    return this.http.get<number[]>(`${apiUrl}/v0/askstories.json?print=pretty`);
  }

  getTopicDetail(id: number) {
    return this.http.get<Topic>(`${apiUrl}/v0/item/${id}.json?print=pretty`);
  }
}
