import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetReminderDialogComponent } from './set-reminder-dialog.component';

describe('SetReminderDialogComponent', () => {
  let component: SetReminderDialogComponent;
  let fixture: ComponentFixture<SetReminderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetReminderDialogComponent]
    });
    fixture = TestBed.createComponent(SetReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
