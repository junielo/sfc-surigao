import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsCarousel } from './events-carousel';

describe('EventsCarousel', () => {
  let component: EventsCarousel;
  let fixture: ComponentFixture<EventsCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
