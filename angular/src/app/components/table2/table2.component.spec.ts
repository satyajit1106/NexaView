import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Table2Component } from './table2.component';

describe('Table2Component', () => {
  let component: Table2Component;
  let fixture: ComponentFixture<Table2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Table2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
