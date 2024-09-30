import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagsmenComponent } from './bagsmen.component';

describe('BagsmenComponent', () => {
  let component: BagsmenComponent;
  let fixture: ComponentFixture<BagsmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagsmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagsmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
