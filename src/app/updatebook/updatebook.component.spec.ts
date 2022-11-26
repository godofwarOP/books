import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebookComponent } from './updatebook.component';

describe('UpdatebookComponent', () => {
  let component: UpdatebookComponent;
  let fixture: ComponentFixture<UpdatebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatebookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
