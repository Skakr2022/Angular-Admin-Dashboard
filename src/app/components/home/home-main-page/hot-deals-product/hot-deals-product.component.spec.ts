import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealsProductComponent } from './hot-deals-product.component';

describe('HotDealsProductComponent', () => {
  let component: HotDealsProductComponent;
  let fixture: ComponentFixture<HotDealsProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotDealsProductComponent]
    });
    fixture = TestBed.createComponent(HotDealsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
