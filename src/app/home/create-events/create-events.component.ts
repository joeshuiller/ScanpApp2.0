import { Component, OnInit } from '@angular/core';
import { Menssage } from 'src/app/models/router';
import { LocalstoreService } from 'src/app/service/localstore.service';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent implements OnInit {
  public customerDetail: any = [];
  constructor(
    private localStorage: LocalstoreService
  ) { 
    this.customerDetail = this.localStorage.getItem(Menssage.customerDetail)
  }

  ngOnInit(): void {
  }

}
