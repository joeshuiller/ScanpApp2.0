import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { Menssage, RoutersLink } from '../models/router';
import { LocalstoreService } from '../service/localstore.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    //public menuItems: any[] = [];
    public menuItemsStore: any[];
    public usersData: any;
    public customerDetail: any = [];
    @Input() menuItems: any[] = [];
    ps: any;
    constructor(
        private localStore: LocalstoreService,
        private router: Router,
    ) {
        this.usersData = this.localStore.getSuccessLogin();
        this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    logout(){
        this.localStore.clear();
        this.router.navigate([RoutersLink.login+this.customerDetail.api_token]);
        this.menuItemsStore = []
    } 
}
