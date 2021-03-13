import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CarsComponent } from './main/cars/cars.component';
// import { HomeComponent } from './main/home/home.component';
// import { DealersComponent } from './main/dealers/dealers.component';
// import { MainComponent } from './main/main.component';
// import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module')
      .then((route) => route.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
