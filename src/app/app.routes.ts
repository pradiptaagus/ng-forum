import { Routes } from '@angular/router';

import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: ':id', component: DetailComponent }],
  },
];
