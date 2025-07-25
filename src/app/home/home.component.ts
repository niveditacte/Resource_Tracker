import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { Resource } from '../interfaces';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../Services/http-client.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KENDO_GRID, KENDO_BUTTONS, HttpClientModule, CommonModule, DialogModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {


empIdToDelete!:string;
showDialog = false;


  constructor(private httpClientService: HttpClientService, private router: Router) { };
  resourcesArray: Array<Resource> = [];
  // formattedEmpId = 'E' + this.resourcesArray.empId.toString().padStart(4, '0');


  ngOnInit() {
    this.httpClientService.getAllEmployees().subscribe((response) => {
      this.resourcesArray = (response as Array<Resource>)
      console.log(this.resourcesArray)
    })
  }
  onEdit(empId: any) {
    this.router.navigate([`/Add-Edit/${empId}`]);
  }

  onShowClick(empId: any) {
    this.router.navigate([`/Details/${empId}`]);
  }
  openDeleteDialog(empId:string){
    this.empIdToDelete = empId;
    this.showDialog = true;
  }
  onDelete(empId:any) {
    // const confirmDelete = window.confirm("Are you sure to delete the resource?")
    // if (confirmDelete){
    this.httpClientService.deleteEmployeeDetails(this.empIdToDelete).subscribe((response: any) => {
      console.log(response);
      this.showDialog = false;
      this.resourcesArray = this.resourcesArray.filter((d) => d.empId != empId)
    })
    }
  cancelDelete(){
    this.showDialog = false;
  }
   exportToCSV(): void {
    const data = this.resourcesArray
    if(!data || data.length === 0){
      alert("No data to export.");
      return
    }
    const csvRows: string[] = [];
    const headers = [
      'Employee ID',
      'Name',
      'Designation',
      'Reporting To',
      'Billable',
      'Tech Skill',
      'Project Allocation',
      'Location',
      'Email ID',
      'CTE DOJ',
      'Remarks'
    ];
 
    // Add headers
    csvRows.push(headers.join(','));
 
    // Add data rows
    data.forEach(item => {
      const row = [
        item.empId,
        item.resource_Name,
        item.designation,
        item.reportingTo,
        item.billable,
        item.technology_Skill,
        item.project_Allocate,
        item.location,
        item.emailId,
        item.ctE_DOJ,
        item.remarks
      ].map(field => `"${(field??'').toString().replace(/"/g, '""')}"`); // Escape quotes
      csvRows.push(row.join(','));
    });
    console.log('Exporting:', this.resourcesArray);

 
    // Generate CSV Blob
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
 
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'EmployeeDetails.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
   
}
