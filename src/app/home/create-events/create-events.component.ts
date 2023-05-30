import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { LocalstoreService } from 'src/app/service/localstore.service';
import Swal from 'sweetalert2'
//Esta interface me permite autocompletar el event de photoSelected
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
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'assesorName', 'companyName', 'nit', 'eventPlace', 'image'];
  public eventList: userDataList[]=[]
  public dataSource: MatTableDataSource<userDataList>
  public file: File;
  public photoSelection: string | ArrayBuffer;
  public customerDetail: any = [];
  public form: FormGroup;
  constructor(
    private localStorage: LocalstoreService,
    private myFormBuilder: FormBuilder,
  ) { 
    this.customerDetail = this.localStorage.getItem(Menssage.customerDetail)
  }
  
  ngOnInit(): void {
    this.inital()
  }
  inital(){
    this.form = this.myFormBuilder.group({
      assesorName: [Menssage.empty, Validators.compose([Validators.required])],
      companyName: [Menssage.empty, Validators.compose([Validators.required])],
      nit: [Menssage.empty, Validators.compose([Validators.required, Validators.maxLength(12)])],
      date: [Menssage.empty, Validators.compose([Validators.required])],
      eventPlace: [Menssage.empty, Validators.compose([Validators.required])],
      image: [Menssage.empty, Validators.compose([Validators.nullValidator])]
    })
    this.loadData()
  }
  saveData(){
    console.log(this.form);
    this.resetForm()
  }
  resetForm(){
    this.form.reset()
    
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
      'para ingresar un nuevo registro limpia el formulario',
      'success'
    )
  }
  //PARA LA TABLA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData(){
    this.dataSource = new MatTableDataSource(this.eventList)
  }
  
}
