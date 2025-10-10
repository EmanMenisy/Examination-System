import { AddEditStudentComponent } from './add-edit-students.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('AddEditStudentsComponent', () => {
  let component: AddEditStudentComponent;
  let fixture: ComponentFixture<AddEditStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
