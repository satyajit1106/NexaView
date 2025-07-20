import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatIcon, RouterOutlet, RouterLink],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isOpen input', () => {
    it('should have default value of true', () => {
      expect(component.isOpen).toBe(true);
    });

    it('should accept custom value through input', () => {
      component.isOpen = false;
      fixture.detectChanges();
      expect(component.isOpen).toBe(false);
    });
  });

  describe('profile visibility', () => {
    it('should initialize with isProfileVisible as false', () => {
      expect(component.isProfileVisible).toBe(false);
    });

    it('should toggle isProfileVisible from false to true', () => {
      component.toggleProfile();
      expect(component.isProfileVisible).toBe(true);
    });

    it('should toggle isProfileVisible from true to false', () => {
      component.isProfileVisible = true;
      component.toggleProfile();
      expect(component.isProfileVisible).toBe(false);
    });

    it('should toggle isProfileVisible multiple times correctly', () => {
      expect(component.isProfileVisible).toBe(false);
      component.toggleProfile();
      expect(component.isProfileVisible).toBe(true);
      component.toggleProfile();
      expect(component.isProfileVisible).toBe(false);
      component.toggleProfile();
      expect(component.isProfileVisible).toBe(true);
    });
  });

  describe('template interactions', () => {
    it('should have mat-icon component', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('mat-icon')).toBeTruthy();
    });
  });
});
