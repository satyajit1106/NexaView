import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighDemandComponent } from './high-demand.component';

describe('HighDemandComponent', () => {
  let component: HighDemandComponent;
  let fixture: ComponentFixture<HighDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighDemandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
