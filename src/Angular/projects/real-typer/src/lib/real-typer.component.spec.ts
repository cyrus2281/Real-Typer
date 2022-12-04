import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTyperComponent } from './real-typer.component';

describe('RealTyperComponent', () => {
  let component: RealTyperComponent;
  let fixture: ComponentFixture<RealTyperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealTyperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTyperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
