import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAndDeadlineComponent } from './event-and-deadline.component';

describe('EventAndDeadlineComponent', () => {
  let component: EventAndDeadlineComponent;
  let fixture: ComponentFixture<EventAndDeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAndDeadlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAndDeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
