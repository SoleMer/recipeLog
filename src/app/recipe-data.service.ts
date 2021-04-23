import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from './recipes-log/Recipe';

const URL = 'https://recipeslog.000webhostapp.com/api/recipe';
//const URL = '/api/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {

  private _recipes : Recipe[] = [];
  recipes : BehaviorSubject<Recipe[]> = new BehaviorSubject(this._recipes);

  constructor(private http: HttpClient) { }


  public saveRecipe(recipe: Recipe): any {
    return this.http.post(URL,JSON.stringify(recipe));
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(URL)
    .pipe(
      tap((recipes: Recipe[]) => {
        this._recipes = [];
         recipes.forEach(r => {
           this._recipes.push({...r});
         });
         this.recipes.next(this._recipes);
       })
    );
  }

  public getThreeRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(URL)
    .pipe(
      tap((recipes: Recipe[]) => {
        this._recipes = [];
         recipes.forEach(r => {
           this._recipes.push({...r});
         });
         this.recipes.next(this._recipes);
       })
    );
  }

  public getPatient(patient : string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`https://recipeslog.000webhostapp.com/api/recipe/${patient}`)
    .pipe(
      tap((recipes: Recipe[]) => {
        this._recipes = [];
         recipes.forEach(r => {
           this._recipes.push({...r});
         });
         this.recipes.next(this._recipes);
       })
    );
  }

  public getRecipe(recipe : number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`/api/recipeN/${recipe}`)
    .pipe(
      tap((recipes: Recipe[]) => {
        this._recipes = [];
         recipes.forEach(r => {
           this._recipes.push({...r});
         });
         this.recipes.next(this._recipes);
       })
    );
  }

  public getFolder(folder : number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`/api/recipeF/${folder}`)
    .pipe(
      tap((recipes: Recipe[]) => {
        this._recipes = [];
         recipes.forEach(r => {
           this._recipes.push({...r});
         });
         this.recipes.next(this._recipes);
       })
    );
  }

  public getRecipeFilter(patient : string, recipe : number, folder : number): Observable<Recipe[]> {
    console.log(patient);
    return this.http.get<Recipe[]>(`/api/recipe/${patient}/${recipe}/${folder}`)
    .pipe(
      tap((recipes: Recipe[]) => {
        this._recipes = [];
         recipes.forEach(r => {
           this._recipes.push({...r});
         });
         this.recipes.next(this._recipes);
       })
    );
  }
}

