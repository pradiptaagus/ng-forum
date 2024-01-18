import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentButtonComponent } from './comment-button.component';

describe('CommentButtonComponent', () => {
  let component: CommentButtonComponent;
  let fixture: ComponentFixture<CommentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentButtonComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with @Input total correctly', () => {
    component.total = 10;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toBe('10 Comments');
  });

  it('should emit onClick successfully', () => {
    spyOn(component.onClick, 'emit');
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
