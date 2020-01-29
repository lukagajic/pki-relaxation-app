import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowParticipantsComponent } from './show-participants.component';

describe('ShowParticipantsComponent', () => {
  let component: ShowParticipantsComponent;
  let fixture: ComponentFixture<ShowParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
