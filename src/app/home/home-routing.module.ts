import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    redirectTo: 'content',
    pathMatch: 'full'
  }, 
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: 'createEvents', loadChildren: () => import('./create-events/create-events.module').then(m => m.CreateEventsModule) },
  { path: 'createGuest', loadChildren: () => import('./create-guest/create-guest.module').then(m => m.CreateGuestModule) },
  { path: 'assistantList', loadChildren: () => import('./assistant-list/assistant-list.module').then(m => m.AssistantListModule) },
  { path: 'asignEvent', loadChildren: () => import('./asign-event/asign-event.module').then(m => m.AsignEventModule) },
  { path: 'createAgents', loadChildren: () => import('./create-agents/create-agents.module').then(m => m.CreateAgentsModule) },
  { path: 'bulkLoad', loadChildren: () => import('./bulk-load/bulk-load.module').then(m => m.BulkLoadModule) },
  { path: 'content', loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
  { path: 'uploadImages', loadChildren: () => import('./upload-images/upload-images.module').then(m => m.UploadImagesModule) },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
