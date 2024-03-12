import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResOwnerSignUpComponent } from './res-owner-sign-up.component';

describe('ResOwnerSignUpComponent', () => {
  let component: ResOwnerSignUpComponent;
  let fixture: ComponentFixture<ResOwnerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResOwnerSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResOwnerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
