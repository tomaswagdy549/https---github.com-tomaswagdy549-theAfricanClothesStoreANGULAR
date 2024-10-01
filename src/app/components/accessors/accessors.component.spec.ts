import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessorsComponent } from './accessors.component';

describe('AccessorsComponent', () => {
  let component: AccessorsComponent;
  let fixture: ComponentFixture<AccessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
