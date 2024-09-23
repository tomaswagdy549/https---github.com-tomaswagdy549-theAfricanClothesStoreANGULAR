import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRefundPolicyComponent } from './return-refund-policy.component';

describe('ReturnRefundPolicyComponent', () => {
  let component: ReturnRefundPolicyComponent;
  let fixture: ComponentFixture<ReturnRefundPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRefundPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnRefundPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
