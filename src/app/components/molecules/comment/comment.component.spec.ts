import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Topic } from '../../../interfaces/topic';
import { TopicService } from '../../../services/topic.service';
import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(component).toBeTruthy();
    expect(component.data).toBeUndefined();
    expect(compiled.querySelector('#name-skeleton')).toBeTruthy();
    expect(compiled.querySelector('#comment-skeleton')).toBeTruthy();
    expect(compiled.querySelector('#time-skeleton')).toBeTruthy();
  });

  it('should use getDetail from ther service', () => {
    const topicService = TestBed.inject(TopicService);
    const data: Topic = {
      by: 'welfare',
      descendants: 212,
      id: 39035650,
      kids: [39037279, 39038264],
      score: 198,
      text: 'Background :<p>My son hasn’t really showed any interest in computers until now. He’s been spending a lot of time over the last couple of weeks designing some sort of a game (on paper) and now he wants me to help him build it, whatever it is. I don’t want to let him down but I also know how much work that goes into a game (he specifically wants it to be 3D).<p>I’m a decent developer, although I’ve  not done game development professionally I did tons of demos on the 90’s so I feel I know the basics of 3D math but I’m pretty sure he will lose interest if I try to teach him x86 assembler :)<p>Joke aside, what can I do? This sounds like a great project for us to explore together and hopefully he can grow interest in software design and development.<p>Are there development kits I can start with (unity?)<p>How do I keep the project “contained” so he feels that he accomplished something but still feels we developed something close to his vision?<p>Thank you HN.',
      time: 1705537260,
      title: "Ask HN: 9-yo son wants to build a game, I'm lost. What can I do?",
      type: 'story',
    };

    spyOn(topicService, 'getTopicDetail').and.returnValue(of(data));
    component.getDetail(39035650);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(component.data).not.toBeNull();
    expect(compiled.querySelector('.name')).toBeTruthy();
    expect(compiled.querySelector('.comment')).toBeTruthy();
    expect(compiled.querySelector('.timestamp')).toBeTruthy();
  });
});
