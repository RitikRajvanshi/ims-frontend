import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-component/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';



export const routes: Routes = [

{
  path:'' , component:AdminComponent,

  children:[
   {path:'', component:AdminDashboardComponent},
   {path:'admin-dashboard', component:AdminDashboardComponent},
  ]
  
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
