import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatWeDo } from './what-we-do';

describe('WhatWeDo', () => {
  let component: WhatWeDo;
  let fixture: ComponentFixture<WhatWeDo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatWeDo],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatWeDo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tiles.length).toBeGreaterThan(0);
  });

  it('should trigger events tile animation after assembly animation ends', () => {
    expect(component.isEventsAnimated()).toBe(false);
    component.isAssemblyAnimated.set(true);
    component.onAssemblyAnimationEnd();
    expect(component.isEventsAnimated()).toBe(true);
  });
});
