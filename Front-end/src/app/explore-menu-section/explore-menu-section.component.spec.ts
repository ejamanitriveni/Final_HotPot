import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreMenuSectionComponent } from './explore-menu-section.component';

describe('ExploreMenuSectionComponent', () => {
  let component: ExploreMenuSectionComponent;
  let fixture: ComponentFixture<ExploreMenuSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreMenuSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreMenuSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
