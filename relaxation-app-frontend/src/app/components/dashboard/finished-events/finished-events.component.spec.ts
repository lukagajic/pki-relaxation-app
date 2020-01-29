import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedEventsComponent } from './finished-events.component';

describe('FinishedEventsComponent', () => {
  let component: FinishedEventsComponent;
  let fixture: ComponentFixture<FinishedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
