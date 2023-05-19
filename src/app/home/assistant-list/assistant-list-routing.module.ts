import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistantListComponent } from './assistant-list.component';

const routes: Routes = [{ path: '', component: AssistantListComponent }, 
{ path: 'assistantDetail/:token', loadChildren: () => import('./assistant-detail/assistant-detail.module').then(m => m.AssistantDetailModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistantListRoutingModule { }
