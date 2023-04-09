import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcdComponent } from './gcd.component';

describe('GcdComponent', () => {
  let component: GcdComponent;
  let fixture: ComponentFixture<GcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
