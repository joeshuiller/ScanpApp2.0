import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import Swal from 'sweetalert2';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export interface userDataList{
  id: string,
  assesorName: string,
  companyName: string,
  nit: string,
  eventPlace: string,
  image: any
}
@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.css']
})
export class BulkLoadComponent implements OnInit {
  displayedColumns: string[] = ['id', 'assesorName', 'companyName', 'nit', 'eventPlace', 'image'];
  public eventList: userDataList[]=[]
  public usersData: any;
  public selectItems: any;
  public customerDetail: any = [];
  public form: FormGroup;
  public eventsItems: any = [];
  public images: any = [];
  public file: File;
  public photoSelection: string | ArrayBuffer;
  public dataSource: MatTableDataSource<userDataList>
  constructor(
    private localStorage: LocalstoreService,
    private myFormBuilder: FormBuilder,
    private _https: AuthService,
    private alert: AlertService
  ) { 
    this.customerDetail = this.localStorage.getItem(Menssage.customerDetail);
    this.usersData = this.localStorage.getSuccessLogin();
    this.getEvents(this.usersData.user.idClientsProjects);

  }

  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormBuilder.group({
      events:[Menssage.empty, Validators.compose([Validators.required])],
      images: [Menssage.empty, Validators.compose([Validators.required])]
    })
    this.loadData()
  }
  saveData(){
    console.log(this.form);
  }
  resetForm(){
    this.form.reset()
  }
  getEvents(item: number){
    this.alert.loading();
      this._https.getEvent(item).then((resulta: any)=>{
          console.log(resulta); 
            this.eventsItems = resulta
            this.alert.messagefin(); 
      }).catch((err: any)=>{
        console.log(err)
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  photoSelected(event: HTMLInputEvent): void{
    //para saber si estan subiendo una foto de ser asi continue
    if(event.target.files && event.target.files[0]){
      this.file = <File> event.target.files[0];
      //Ahora previzualiza la imagen
      let reader = new FileReader();
      reader.onload = e => this.photoSelection = reader.result
      reader.readAsDataURL(this.file)
    }
  }
  //VENTANA EMERGENTE
  showModal(){
    Swal.fire(
      'Registro Exitoso',
      'has completado el registro',
      'success'
    )
  }
  //TODO LO DE LA TABLA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData(){
    this.dataSource = new MatTableDataSource(this.eventList)
  }
}
