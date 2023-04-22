import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empForm!: FormGroup
  editMode: boolean = false
  employees!: []

  constructor(
    private fb: FormBuilder,
    private _empService: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getEmpList()

    this.empForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required],
      dept: ['']
    })
  }

  getEmpList() {
    this._empService.getEmpList().subscribe((res: any) => {
      console.log(res)
      this.employees = res
    })
  }

  onEditEmp(emp: any) {
    this.editMode = true
    this.empForm.patchValue(emp)
  }

  onDeleteEmp(id: any) {
    if (confirm('Do you want to delete this Employee?')) {
      this._empService.deleteEmp(id).subscribe(
        (res: any) => {
          console.log('Deleted Successfully')
          this.getEmpList()
        },
        (err: any) => {
          console.log(err)
        }
      )
    }


  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      if (this.editMode) {
        this._empService.updateEmp(this.empForm.value)
      } else {
        this._empService.addEmp(this.empForm.value).subscribe(
          (res: any) => {
            console.log(res)
            this.getEmpList()
          },
          (err: any) => {
            console.log(err)
          }
        )
      }
      this.empForm.reset({

      })
    }
  }

  openModal(content:any) {
		this.modalService.open(content)
	}

  onCloseModal() {
    this.editMode = false
  }

}
