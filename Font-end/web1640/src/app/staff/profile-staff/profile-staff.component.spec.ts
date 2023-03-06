import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStaffComponent } from './profile-staff.component';

describe('ProfileStaffComponent', () => {
  let component: ProfileStaffComponent;
  let fixture: ComponentFixture<ProfileStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
