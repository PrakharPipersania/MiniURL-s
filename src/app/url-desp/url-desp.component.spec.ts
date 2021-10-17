import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlDespComponent } from './url-desp.component';

describe('UrlDespComponent', () => {
  let component: UrlDespComponent;
  let fixture: ComponentFixture<UrlDespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlDespComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlDespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
