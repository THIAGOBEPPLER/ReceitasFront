import { NovaReceita } from './../../Models/NovaReceita';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingrediente } from 'src/app/Models/Ingreditente.model';
import { ReceitaService } from 'src/app/receita.service';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formF: FormGroup;
  listaId: Array<number> = [];


  listaIngredientes: Ingrediente[];
  ingredientesAdicionados: Array<string> = [];
  novaReceita: NovaReceita = {};



  constructor(private rs: ReceitaService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.rs.getIngreditentes().subscribe((data: Ingrediente[]) => {
      // console.log(data);
      this.listaIngredientes = data;
      console.log(this.listaIngredientes);
    });

    this.formF = this.fb.group({
      nome: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      duracao: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],

      ingredientes: '1-Farinha'
    });
  }
  onAdiciona(): void{
    // console.log(this.formS.value.ingredientes);
    console.log(this.ingredientesAdicionados);
    this.ingredientesAdicionados.push(this.formF.value.ingredientes);
    console.log(this.ingredientesAdicionados);
  }
  onCancela(): void{
    this.formF.patchValue({
      nome: '',
      categoria: '',
      modelo: '',
      descricao: '',
      duracao: ''
    });
    this.ingredientesAdicionados = [];
  }

  onCadastra(): void{

    this.novaReceita.nome = this.formF.value.nome;
    this.novaReceita.categoria = this.formF.value.categoria;
    this.novaReceita.descricao = this.formF.value.descricao;
    this.novaReceita.duracao = this.formF.value.duracao;

    this.ingredientesAdicionados.forEach(i => {
      const parse = (i.split('-', 1)).toString();
      const numero = parseInt(parse, 10);
      this.listaId.push(numero);
      this.ingredientesAdicionados = [];
    });

    this.novaReceita.ingredientes = this.listaId;

    console.log(this.novaReceita);

    this.rs.postCadastra(this.novaReceita).subscribe((data: string) => {
       console.log(data);
    });

    alert('Receita Cadastrada');

    this.formF.patchValue({
      nome: '',
      categoria: '',
      modelo: '',
      descricao: '',
      duracao: ''
    });
    this.listaId = [];
  }
  onRemoveIngrediente(ing: string): void{
    console.log(ing);
    // this.ingredientesAdicionados.pop(ing);
    this.ingredientesAdicionados.splice(
      this.ingredientesAdicionados.indexOf(ing), 1
    );

  }


}
