import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  
  apiUrl : String = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient) {
    console.log('PokedexService');
   }

   getListPokemon(pokemonId: number){
    const url = this.apiUrl + 'pokemon/'+pokemonId;
    return  this.http.get(url);
           
   }

   getAllPokemon(){
     // Just get 1000 pokemons
    const url = this.apiUrl + 'pokemon?limit=1000';
    return  this.http.get(url)
            .pipe(map( (data : any) => {
              return data.results;
        }));
   }

   getSinglePokemon(url:string){
    return  this.http.get(url);
   }
}
