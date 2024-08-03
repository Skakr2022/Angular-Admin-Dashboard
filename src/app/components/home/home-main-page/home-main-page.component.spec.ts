import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainPageComponent } from './home-main-page.component';

describe('HomeMainPageComponent', () => {
  let component: HomeMainPageComponent;
  let fixture: ComponentFixture<HomeMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMainPageComponent]
    });
    fixture = TestBed.createComponent(HomeMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
