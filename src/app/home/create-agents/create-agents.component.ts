import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { LocalstoreService } from 'src/app/service/localstore.service';
import Swal from 'sweetalert2';

export interface userDataList{
  names: string,
  lastnames: string,
  cc: string,
  phone: string,
  email: string,
}
@Component({
  selector: 'app-create-agents',
  templateUrl: './create-agents.component.html',
  styleUrls: ['./create-agents.component.css']
})
export class CreateAgentsComponent implements OnInit {
  displayedColumns: string[] = ['names', 'lastnames', 'cc', 'phone', 'email'];
  public userList: userDataList[]=[]
  public customerDetail: any = [];
  public form: FormGroup;
  public dataSource: MatTableDataSource<userDataList>
  constructor(
    private localStorage: LocalstoreService,
    private myFormBuilder: FormBuilder
  ) { 
    this.customerDetail = this.localStorage.getItem(Menssage.customerDetail)
  }

  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormBuilder.group({
      names: [Menssage.empty, Validators.compose([Validators.required])],
      lastnames: [Menssage.empty, Validators.compose([Validators.required])],
      phone: [Menssage.empty, Validators.compose([Validators.required, Validators.maxLength(10)])],
      cc: [Menssage.empty, Validators.compose([Validators.required])],
      password: [Menssage.empty, Validators.compose([Validators.required])],
      email: [Menssage.empty, Validators.compose([Validators.required, Validators.email])],
    })
    this.loadData()
  }
  saveData(){
    console.log(this.form)
    this.resetForm()
  }
  resetForm(){
    this.form.reset()
  }
  //VENTANA EMERGENTE
  showModal(){
    Swal.fire(
      'Registro Exitoso',
      'has completado el registro',
      'success'
    )
  }
  //PARA LA TABLA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData(){
    this.dataSource = new MatTableDataSource(this.userList)
  }
}
