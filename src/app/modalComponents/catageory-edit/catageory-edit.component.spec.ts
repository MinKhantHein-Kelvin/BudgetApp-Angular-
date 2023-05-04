import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatageoryEditComponent } from './catageory-edit.component';

describe('CatageoryEditComponent', () => {
  let component: CatageoryEditComponent;
  let fixture: ComponentFixture<CatageoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatageoryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatageoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
