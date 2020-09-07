import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardReplyComponent } from './post-card-reply.component';

describe('PostCardReplyComponent', () => {
  let component: PostCardReplyComponent;
  let fixture: ComponentFixture<PostCardReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
