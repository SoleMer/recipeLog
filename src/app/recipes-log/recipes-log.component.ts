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
  patient: string = ' ';
  number_recipe: number = 0;
  number_folder: number = 0;  
  
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
    //this.getThreeRecipes();
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

  getThreeRecipes() {
    this.recipeDataSvc.getThreeRecipes()
    .subscribe((r: any) => {
      this.response = r;
    });
  }

  searchPatient() {
    this.recipeDataSvc.getPatient(this.patient)
    .subscribe((r: any) => {
      this.response = r;
    });
  }
  searchRecipe() {
    console.log("recipe");
    this.recipeDataSvc.getRecipe(this.number_recipe)
    .subscribe((r: any) => {
      this.response = r;
    });
  }

  searchFolder() {
    console.log("folder");
    this.recipeDataSvc.getFolder(this.number_folder)
    .subscribe((r: any) => {
      this.response = r;
    });
  }

  searchFilter(){
    console.log("filter");
    console.log(this.patient === '');
    if(this.patient === '') this.patient = 'a';
    console.log(this.patient);
    this.recipeDataSvc.getRecipeFilter(this.patient, this.number_recipe, this.number_folder)
    .subscribe((r: any) => {
      this.response = r;
    });
  }

  clearFilter() {
    this.patient = '';
    this.number_recipe = 0;
    this.number_folder = 0;
    this.getRecipes();
  }


}
