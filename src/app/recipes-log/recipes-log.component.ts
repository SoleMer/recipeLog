import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { RecipeDataService } from '../recipe-data.service';
import { Recipe } from './Recipe';

@Component({
  selector: 'app-recipes-log',
  templateUrl: './recipes-log.component.html',
  styleUrls: ['./recipes-log.component.scss']
})
export class RecipesLogComponent implements OnInit {

  recipes$ : Observable<Recipe[]>;
  response: any;
  loading: boolean = false;
  permission$: Observable<boolean>;
  
  constructor(private recipeDataSvc : RecipeDataService ,
    private loginSvc : LoginService) {
    this.recipes$ = recipeDataSvc.recipes.asObservable();
    this.permission$ = loginSvc.permission.asObservable();
  }
  recipe : Recipe = {
    patient_name : "",
    patient_dni : '' 
  };
  
  ngOnInit() {
    this.loginSvc.checkPermission();
    this.getRecipes();
  }

  save() {
    this.loading = true;
    this.recipeDataSvc.saveRecipe(this.recipe)
    .subscribe((r: any) => {
      this.response = r
      console.log(r);
      this.getRecipes();
      this.recipe = {
        patient_name : "",
        patient_dni : '' 
      };
      this.loading = false;
    });
  }

  getRecipes() {
    this.recipeDataSvc.getRecipes()
    .subscribe((r: any) => {
      this.response = r;
    });
  }

}
