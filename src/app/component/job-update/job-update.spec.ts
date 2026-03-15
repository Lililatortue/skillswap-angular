import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobUpdate } from './job-update';

describe('JobUpdate', () => {
  let component: JobUpdate;
  let fixture: ComponentFixture<JobUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
