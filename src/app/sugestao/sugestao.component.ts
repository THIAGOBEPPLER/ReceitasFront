import { getTestBed } from '@angular/core/testing';
import { Ingrediente } from './../Models/Ingreditente.model';
import { ReceitaService } from './../receita.service';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecebeSugestao } from '../Models/RecebeSugestao';


@Component({
  selector: 'app-sugestao',
  templateUrl: './sugestao.component.html',
  styleUrls: ['./sugestao.component.css']
})
export class SugestaoComponent implements OnInit {
  formS: FormGroup;
  ingredientesAdicionados: Array<string> = [];
  busca: string;

  sugestao: RecebeSugestao[];
  listaIngredientes: Ingrediente[];

  constructor(private rs: ReceitaService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.rs.getIngreditentes().subscribe((data: Ingrediente[]) => {
      // console.log(data);
      this.listaIngredientes = data;
      console.log(this.listaIngredientes);
    });

    this.formS = this.fb.group({
      ingredientes: '1-Farinha'
    });
  }
  onAdiciona(): void{
    // console.log(this.formS.value.ingredientes);
    console.log(this.ingredientesAdicionados);
    this.ingredientesAdicionados.push(this.formS.value.ingredientes);
    console.log(this.ingredientesAdicionados);
  }
  onBusca(): void{
    this.busca = '';
    this.ingredientesAdicionados.forEach(i => {
      const numero = (i.split('-', 1)).toString();
      this.busca = this.busca.concat(numero);
      this.busca = this.busca.concat(',');
      this.ingredientesAdicionados = [];
    });
    console.log(this.busca);

    this.rs.getSugestao(this.busca).subscribe((data: RecebeSugestao[]) => {
      // console.log(data);
      this.sugestao = data;
      console.log(this.sugestao);
    });

  }
}
