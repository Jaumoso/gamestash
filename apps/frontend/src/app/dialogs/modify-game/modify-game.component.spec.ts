import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyGameComponent } from './modify-game.component';

describe('ModifyGameComponent', () => {
  let component: ModifyGameComponent;
  let fixture: ComponentFixture<ModifyGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
