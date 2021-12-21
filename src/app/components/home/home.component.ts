import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pokemonList: any[] = [];
  allPokemonList: any[] = [];
  pokemonFilterName: any[] = [];


  minNumber: number =  1;
  maxNumber: number =  10;
  pokemonSelected : any;

  constructor(private pokeedex : PokedexService) {
    this.getPokemonList();
    this.getAllPokemon();
  }

  ngOnInit(): void {
  }


  getAllPokemon(){
    this.allPokemonList = [];
    this.pokeedex.getAllPokemon().subscribe( (data : any) => {
      this.allPokemonList  = data;
    });
  }

  getPokemonList(){
    this.pokemonList = [];
    for (let i = this.minNumber; i <= this.maxNumber; i++) {
      // You can delete pipe(delay(1000)) is just for simulate a time to obtain data
      this.pokeedex.getListPokemon(i).pipe(delay(1000)).subscribe( (data : any) => {
        this.pokemonList.push(data);
      });
    }
  }

  nextPage(){
    this.minNumber = this.maxNumber + 1;
    this.maxNumber= this.maxNumber + 10;
    this.getPokemonList();
    console.log('Consultand desde' + this.minNumber +  ' a ' + this.maxNumber);
  }
  previousPage(){
    this.minNumber = this.minNumber - 10;
    this.maxNumber= this.maxNumber - 10;
    this.getPokemonList()
    console.log('Consultand desde' + this.minNumber +  ' a ' +  this.maxNumber);
  }
  showInfo(item: any) {
    this.pokemonSelected = item;
  }

  filterByName(name:String){

    if(name == ""){
      this.pokemonFilterName = [];
    }else{
      this.pokemonFilterName = [];
      this.allPokemonList.forEach(pokemon => {
        let nameP = pokemon.name;
        if(nameP.includes(name)){
          this.pokemonFilterName.push(pokemon)
        }
      });
    }
  }

  showItemFilter(item:any){
    this.pokeedex.getSinglePokemon(item.url).subscribe( (data : any) => {
      this.pokemonSelected =  data
      console.log(this.pokemonSelected);
    });
  }
}
