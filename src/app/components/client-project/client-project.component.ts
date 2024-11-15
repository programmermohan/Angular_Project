import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from "../../reusableComponents/alert/alert.component";

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("", [Validators.required, Validators.minLength(5)]), //Required Validation and Min Length Validation
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl("", Validators.email), //Email Validation
    clientId: new FormControl("")
  })

  clientSvr = inject(ClientService);

  employeeList: Employee[] = [];
  ClientList: Client[] = [];

  //creating signal is like creating a variable
  firstName = signal("Angular 18");
  projectList = signal<ClientProject[]>([])

  ngOnInit(): void {
    const fName = this.firstName();
    this.getAllClient();
    this.getAllEmployee();
    this.getAllClientProject();
  }

  //Changing the Signal variable value , using user input
  changeFname(newName: string){
    this.firstName.set(newName);

    this.firstName.set('React');
  }

  changeFirstName() // change firstname method without user input
  {
    this.firstName.set('React');
  }

  getAllEmployee() {
    this.clientSvr.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data
    })
  }

  getAllClientProject() {
    this.clientSvr.getAllClientProject().subscribe((res: APIResponseModel) => {
      this.projectList.set(res.data);
    })
  }

  getAllClient() {
    this.clientSvr.getAllClient().subscribe((res: APIResponseModel) => {
      this.ClientList = res.data
    })
  }
  onSaveProject(){
    const formValue = this.projectForm.value;
    this.clientSvr.addClientProjectUpdate(formValue).subscribe((res: APIResponseModel) =>
    {
      if(res.result)
      {
        alert('project created successfully');
      }
      else{
        alert(res.message);
      }
    })
  }
}
