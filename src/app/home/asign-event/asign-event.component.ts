import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import Swal from 'sweetalert2';

export interface userDataList {
  names: string,
  lastnames: string,
  event: string,
  eventPlace: string,
  action: any
}
@Component({
  selector: 'app-asign-event',
  templateUrl: './asign-event.component.html',
  styleUrls: ['./asign-event.component.css']
})
export class AsignEventComponent implements OnInit {
  displayedColumns: string[] = ['names', 'lastnames', 'event', 'eventPlace', 'action'];
  public eventList: userDataList[] = []
  public customerDetail: any = [];
  public eventsItems: any = [];
  public usersItems: any = []
  public selectItems: any;
  public usersData: any;
  public dataSource: MatTableDataSource<userDataList>
  public form: FormGroup
  constructor(
    private localStorage: LocalstoreService,
    private myFormBuilder: FormBuilder,
    private _https: AuthService,
    private alert: AlertService,
  ) {
    this.customerDetail = this.localStorage.getItem(Menssage.customerDetail)
    this.usersData = this.localStorage.getSuccessLogin();
    this.getEvents(this.usersData.user.idClientsProjects);
    this.getUsers(this.usersData.user.idClientsProjects)
  }

  ngOnInit(): void {
    this.initial()
  }
  initial() {
    this.form = this.myFormBuilder.group({
      events: [Menssage.empty, Validators.compose([Validators.nullValidator])],
      users: [Menssage.empty, Validators.compose([Validators.nullValidator])]
    })
    this.loadData()
  }
  saveData(){
    console.log(this.form);
  }
  getEvents(item: number) {
    this.alert.loading();
    this._https.getEvent(item).then((resulta: any) => {
      console.log(resulta);
      this.eventsItems = resulta
      this.alert.messagefin();
    }).catch((err: any) => {
      console.log(err)
      this.alert.error(Menssage.error, Menssage.server);
    });
  }
  //INTENTANDO TRAER USUARIOS
  getUsers(item: number) {
    this.alert.loading();
    this._https.getUsersData(item).then((resultado: any) => {
      console.log(resultado);
      this.usersItems = resultado;
      this.alert.messagefin();
    }).catch((err: any) => {
      console.log(err);
      this.alert.error(Menssage.error, Menssage.server)
    })
  }
  //VENTANA EMERGENTE
  showModal(){
    Swal.fire(
      'Registro Exitoso',
      'has completado el registro',
      'success'
    )
  }
  //TABLA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData() {
    this.dataSource = new MatTableDataSource(this.eventList)
  }
}
