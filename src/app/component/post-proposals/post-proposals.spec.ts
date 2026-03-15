import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProposals } from './post-proposals';

describe('PostProposals', () => {
  let component: PostProposals;
  let fixture: ComponentFixture<PostProposals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostProposals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostProposals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
