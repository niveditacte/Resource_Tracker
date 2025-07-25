import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Resource } from '../interfaces';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../Services/http-client.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {

//  resourcesArray: Array<Resource> = []; 

  myForm: FormGroup = new FormGroup({
    // empId: [null],
    resource_Name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    designation: new FormControl('', [Validators.required]),
    reportingTo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    billable: new FormControl('', [Validators.required]),
    technology_Skill: new FormControl('', [Validators.required]),
    project_Allocate: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    ctE_DOJ: new FormControl('', [Validators.required]),
    remarks: new FormControl('')
    
  })
  constructor( private httpclientService:HttpClientService, private router:Router, private activatedroute:ActivatedRoute ){}

  empId? : string ;
  empDetails! : Resource;
  ngOnInit(){
    this.empId = this.activatedroute.snapshot.paramMap.get('empId')!;
    console.log(this.empId);
    if(this.empId){
      this.httpclientService.getEmployeeDetailsById(this.empId).subscribe((response) => {

        console.log(response)
        this.myForm.patchValue(response)
      })
    }
  }
  onSubmit(){
    if (this.empId){
      this.httpclientService.updateEmployeeDetails(this.empId,this.myForm.value).subscribe((response)=>{
      this.router.navigate(['/Home'])
      this.myForm.reset();
      })
    }
    else{
      this.httpclientService.addEmployeeeDetails(this.myForm.value).subscribe((response)=>{
       this.router.navigate(['/Home'])
       this.myForm.reset();
      })
    }
    
  }

}
