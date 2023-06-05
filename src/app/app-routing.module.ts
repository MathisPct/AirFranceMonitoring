import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAirFranceComponent } from './components/view-airfrance/view-airfrance.component';

const routes: Routes = [
  { path: 'decollages', component: ViewAirFranceComponent,
    data: {type:'decollages'}
  },
  {
    path: 'atterissages', component: ViewAirFranceComponent,
    data: {type: 'atterissages'}
  },
  { path: '**', redirectTo: 'decollages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
