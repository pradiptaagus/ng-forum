import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isShow).toBeFalsy();
  });

  it('should render with @Input isShow true correctly', () => {
    component.isShow = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.active'))).toBeTruthy();
  });

  it('should emit @Output onClickBg successfully', () => {
    spyOn(component.onClickBg, 'emit');
    const compiled = fixture.debugElement.nativeElement;
    const modalOverlay = compiled.querySelector('.modal-overlay');
    modalOverlay.click();
    fixture.detectChanges();
    expect(component.onClickBg.emit).toHaveBeenCalled();
  });
});
