import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckComponent } from './check/check.component';
import { RecipesLogComponent } from './recipes-log/recipes-log.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'check',
    pathMatch: 'full',
  },
  {
    path: 'check',
    component: CheckComponent,
  },
  {
    path: 'recipes',
    component: RecipesLogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
