import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDealersComponent } from './my-dealers.component';

describe('MyDealersComponent', () => {
  let component: MyDealersComponent;
  let fixture: ComponentFixture<MyDealersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDealersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
