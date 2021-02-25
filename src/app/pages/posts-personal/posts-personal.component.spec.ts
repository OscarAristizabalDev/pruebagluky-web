import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPersonalComponent } from './posts-personal.component';

describe('PostsPersonalComponent', () => {
  let component: PostsPersonalComponent;
  let fixture: ComponentFixture<PostsPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
