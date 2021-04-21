import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesLogComponent } from './recipes-log.component';

describe('RecipesLogComponent', () => {
  let component: RecipesLogComponent;
  let fixture: ComponentFixture<RecipesLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
