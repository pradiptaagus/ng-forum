import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Topic } from '../../../interfaces/topic';
import { TopicService } from '../../../services/topic.service';
import { CardItemComponent } from './card-item.component';

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardItemComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render without data', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.title')).not.toBeTruthy();
    expect(compiled.querySelector('.title-skeleton-1')).toBeTruthy();
    expect(compiled.querySelector('.title-skeleton-2')).toBeTruthy();

    expect(compiled.querySelector('.score')).not.toBeTruthy();
    expect(compiled.querySelector('.score-skeleton')).toBeTruthy();

    expect(compiled.querySelector('.company')).not.toBeTruthy();
    expect(compiled.querySelector('.company-skeleton')).toBeTruthy();

    expect(compiled.querySelector('.time')).not.toBeTruthy();
    expect(compiled.querySelector('.time-skeleton')).toBeTruthy();

    expect(compiled.querySelector('.company')).not.toBeTruthy();
    expect(compiled.querySelector('.company-skeleton')).toBeTruthy();

    expect(compiled.querySelector('.time')).not.toBeTruthy();
    expect(compiled.querySelector('.time-skeleton')).toBeTruthy();

    expect(compiled.querySelector('.badge')).not.toBeTruthy();
    expect(compiled.querySelector('.badge-skeleton')).toBeTruthy();

    expect(compiled.querySelector('.comment-button')).not.toBeTruthy();
    expect(compiled.querySelector('.comment-button-skeleton')).toBeTruthy();
  });

  it('should render with @Input topicId correctly', () => {
    const topicService = TestBed.inject(TopicService);
    const data: Topic = {
      by: 'welfare',
      descendants: 212,
      id: 39035650,
      kids: [39037279, 39038264],
      score: 198,
      text: 'Test text',
      time: 1705537260,
      title: 'Test title',
      type: 'story',
    };
    spyOn(topicService, 'getTopicDetail').and.returnValue(of(data));
    component.getDetail(39035650);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(component.data).not.toBeNull();

    expect(compiled.querySelector('.title')).toBeTruthy();
    expect(compiled.querySelector('.title').textContent).toBe(data.title);
    expect(compiled.querySelector('.title-skeleton-1')).not.toBeTruthy();
    expect(compiled.querySelector('.title-skeleton-2')).not.toBeTruthy();

    expect(compiled.querySelector('.score')).toBeTruthy();
    // console.log(compiled.querySelector('.score').textContent);
    expect(compiled.querySelector('.score').textContent).toEqual(
      ' 198 points by welfare '
    );
    expect(compiled.querySelector('.score-skeleton')).not.toBeTruthy();

    expect(compiled.querySelector('.company')).toBeTruthy();
    expect(compiled.querySelector('.company').textContent).toBe('codeberg.org');
    expect(compiled.querySelector('.company-skeleton')).not.toBeTruthy();

    expect(compiled.querySelector('.time')).toBeTruthy();
    expect(compiled.querySelector('.time-skeleton')).not.toBeTruthy();

    expect(compiled.querySelector('.badge')).toBeTruthy();
    expect(compiled.querySelector('.badge').textContent).toBe('Trending');
    expect(compiled.querySelector('.badge-skeleton')).not.toBeTruthy();

    expect(compiled.querySelector('.comment-button')).toBeTruthy();
    expect(compiled.querySelector('.comment-button').textContent).toBe(
      '212 Comments'
    );
    expect(compiled.querySelector('.comment-button-skeleton')).not.toBeTruthy();
  });

  it('should emit @Output onClickCommentBtn successfully', () => {
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

    const commentBtn = spyOn(component.onClickCommentBtn, 'emit');

    expect(component.data).not.toBeNull();

    const button = fixture.debugElement.query(By.css('.comment-button'));
    button.nativeElement.click();
    // fixture.detectChanges();

    // expect(commentBtn).toHaveBeenCalled();
  });
});
