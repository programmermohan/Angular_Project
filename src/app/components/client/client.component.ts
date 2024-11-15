import { Component, inject, isDevMode, OnInit } from '@angular/core';
import { Client } from '../../model/class/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from "../../reusableComponents/alert/alert.component";
import { MyButtonComponent } from "../../reusableComponents/my-button/my-button.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  userList$: Observable<any> = new Observable<any>; //for Async Pipe we have used

  ngOnInit(): void {
    this.loadClient();
    this.userList$ = this.clientService.getAllUser();
  }
  currentDate:Date = new Date();
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService)

 

  loadClient() {
    this.clientService.getAllClient().subscribe((res: APIResponseModel) => {
      this.clientList = res.data
    })

  }
  onSaveClient() {
    this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert("client created successfully")
        this.loadClient();
        this.clientObj = new Client();
      }
      else {
        alert(res.message);
      }
    })
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you Sure to delete");
    if (isDelete) {
      this.clientService.deleteClientById(id).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert("client deleted successfully")
          this.loadClient();
          this.clientObj = new Client();
        }
        else {
          alert(res.message);
        }
      })
    }
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }
}
