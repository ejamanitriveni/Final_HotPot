import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResOwnerSignInComponent } from './res-owner-sign-in.component';

describe('ResOwnerSignInComponent', () => {
  let component: ResOwnerSignInComponent;
  let fixture: ComponentFixture<ResOwnerSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResOwnerSignInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResOwnerSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
