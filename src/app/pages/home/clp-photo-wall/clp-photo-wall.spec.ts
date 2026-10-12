import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClpPhotoWall } from './clp-photo-wall';

describe('ClpPhotoWall', () => {
  let component: ClpPhotoWall;
  let fixture: ComponentFixture<ClpPhotoWall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClpPhotoWall],
    }).compileComponents();

    fixture = TestBed.createComponent(ClpPhotoWall);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
