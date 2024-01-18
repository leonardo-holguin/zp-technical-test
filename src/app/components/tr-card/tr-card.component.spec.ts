import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrCardComponent } from './tr-card.component';

describe('TrCardComponent', () => {
  let component: TrCardComponent;
  let fixture: ComponentFixture<TrCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
