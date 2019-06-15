import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ClientListComponent } from './client-list/client-list.component';
import { CommonModule } from '@angular/common';
//const routes: Routes = [{ path:  '', pathMatch:  'full', redirectTo:  'list'},
//{ path: 'list', component: ClientListComponent}, ];

@NgModule({
 //imports: [RouterModule.forRoot(routes), CommonModule],
 imports: [CommonModule],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
