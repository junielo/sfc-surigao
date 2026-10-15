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
    expect(component.isAssemblyTitleAnimated()).toBe(true);
  });

  it('should trigger title animations on respective animation end callbacks', () => {
    component.onClpAnimationEnd();
    expect(component.isClpTitleAnimated()).toBe(true);
    expect(component.isHouseholdAnimated()).toBe(true);

    component.onHouseholdAnimationEnd();
    expect(component.isHouseholdTitleAnimated()).toBe(true);

    component.onAssemblyAnimationEnd();
    expect(component.isAssemblyTitleAnimated()).toBe(true);
    expect(component.isEventsAnimated()).toBe(true);

    component.onEventsAnimationEnd();
    expect(component.isEventsTitleAnimated()).toBe(true);
  });
});
