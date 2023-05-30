import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
export interface userDataList{
  id: string,
  names: string,
  lastnames: string,
  cc: string,
  email: string,
  phone: string,
  category: string
}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public customerDetail: any = [];
  public selectItems: any;
  public eventsItems: any = [];
  public usersData: any;
  public userCategory: any = [];
  public form: FormGroup;
  public dataSource: MatTableDataSource<userDataList>
  displayedColumns: string[] = ['names', 'lastnames', 'cc', 'phone', 'productInterest','email', 'category'];
  public eventList: userDataList[] = []
  constructor(
    private localStorage: LocalstoreService,
    private myFormBuilder: FormBuilder,
    private _https: AuthService,
    private alert: AlertService,
  ) { 
    this.customerDetail = this.localStorage.getItem(Menssage.customerDetail);
    this.usersData = this.localStorage.getSuccessLogin();
    this.getEvents(this.usersData.user.idClientsProjects);
    this.getCategories()
  }

  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormBuilder.group({
      category: [Menssage.empty, Validators.compose([Validators.required])],
      events: [Menssage.empty, Validators.compose([Validators.required])],
      date: [Menssage.empty, Validators.compose([Validators.required])],
    })
    this.loadData()
  } 
  saveData(){
    console.log(this.form)
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
  //INTENTA TRAER CATEGORIAS
  getCategories(){
    this.alert.loading();
    this._https.getCategory().then((resulta:any)=>{
      console.log(resulta);
      this.userCategory=resulta
      this.alert.messagefin();
    }).catch((err: any) => {
      console.log(err)
      this.alert.error(Menssage.error, Menssage.server);
    });
  }
  loadData() {
    this.dataSource = new MatTableDataSource(this.eventList)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
