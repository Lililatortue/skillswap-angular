import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPosting } from './job-posting';

describe('JobPosting', () => {
  let component: JobPosting;
  let fixture: ComponentFixture<JobPosting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPosting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPosting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
