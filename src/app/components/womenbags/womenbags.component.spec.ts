import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenbagsComponent } from './womenbags.component';

describe('WomenbagsComponent', () => {
  let component: WomenbagsComponent;
  let fixture: ComponentFixture<WomenbagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomenbagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenbagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
