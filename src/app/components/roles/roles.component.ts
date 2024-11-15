import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  rolelist:IRole[] = [];
  http = inject(HttpClient);
  
ngOnInit(): void {
this.getAllRoles()
}

getAllRoles(){
this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles")
.subscribe((res:APIResponseModel) => {
this.rolelist = res.data;
});
}



















  // firstName:string = "Angular Tutorial";
// AngularVersion = "Version 18";
// version :number = 18;
// isactive:boolean = false;

// currentDate:Date = new Date();
// inputType:string = "button";
// selectedState:string = ''

// showWelcomeAlert(){
// alert("welcome to angular tutorial");
// }

// showMesage(message: string){
// alert(message);
// }



}
