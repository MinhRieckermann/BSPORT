import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrasileiroSerieBComponent } from './brasileiro-serie-b.component';

describe('BrasileiroSerieBComponent', () => {
  let component: BrasileiroSerieBComponent;
  let fixture: ComponentFixture<BrasileiroSerieBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrasileiroSerieBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrasileiroSerieBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
