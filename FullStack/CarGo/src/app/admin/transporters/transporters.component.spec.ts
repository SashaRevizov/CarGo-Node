/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransportersComponent } from './transporters.component';

describe('TransportersComponent', () => {
  let component: TransportersComponent;
  let fixture: ComponentFixture<TransportersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
