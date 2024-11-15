import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../services/master.service';
import { APIResponseModel, IDesignation } from '../model/interface/role';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {

  designationList: IDesignation[] = [];
  isLoader:boolean = true;

  ngOnInit(): void {
    this.masterService.getDesignation().subscribe((result: APIResponseModel) => {
      this.designationList = result.data;
      this.isLoader = false;
    }, error => {
      alert("API error/Network down");
      this.isLoader = false;
    })
  }

  masterService = inject(MasterService)

}
