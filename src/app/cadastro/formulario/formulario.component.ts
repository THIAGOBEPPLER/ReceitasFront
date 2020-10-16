import { EditaReceita } from './../../Models/EditaReceita';
import { NovaReceita } from './../../Models/NovaReceita';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingrediente } from 'src/app/Models/Ingreditente.model';
import { ReceitaService } from 'src/app/receita.service';
import { BrowserModule } from '@angular/platform-browser';
import { ComunicacaoService } from 'src/app/comunicacao.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formF: FormGroup;
  listaId: Array<number> = [];
  modoEdicao = false;
  receitaEditadaId = 0;

  listaIngredientes: Ingrediente[];
  ingredientesAdicionados: Array<string> = [];
  novaReceita: NovaReceita = {};

  editaReceita: EditaReceita = {};
  evento: Subscription;




  constructor(private rs: ReceitaService, private fb: FormBuilder, private cs: ComunicacaoService) { }

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

    this.evento = this.cs.getAtualiza().subscribe((receita: EditaReceita) => {
      this.edicao(receita);
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
    this.modoEdicao = false;
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
  edicao(receita: EditaReceita): void{
    this.modoEdicao = true;
    console.log(receita.id);


    this.receitaEditadaId = receita.id;

    this.formF.patchValue({
      nome: receita.nome,
      categoria: receita.categoria,
      descricao: receita.descricao,
      duracao: receita.duracao
    });

    this.ingredientesAdicionados = [];
    // let ingredientesAux: string[];

    receita.ingredientes.forEach(i => {
      this.listaIngredientes.forEach(li => {
        let x = i.toString();
        if (i == li.id){
            x = x.concat('-', li.nome);
            this.ingredientesAdicionados.push(x);
          }
      });
    });

  }
  onEdita(): void{
    this.editaReceita.id = this.receitaEditadaId;
    this.editaReceita.nome = this.formF.value.nome;
    this.editaReceita.categoria = this.formF.value.categoria;
    this.editaReceita.descricao = this.formF.value.descricao;
    this.editaReceita.duracao = this.formF.value.duracao;

    this.listaId  = [];

    this.ingredientesAdicionados.forEach(i => {
      const parse = (i.split('-', 1)).toString();
      const numero = parseInt(parse, 10);
      this.listaId.push(numero);
      this.ingredientesAdicionados = [];
    });

    this.editaReceita.ingredientes = this.listaId;

    console.log(this.editaReceita.ingredientes);


    // metodo
    this.rs.putEdita(this.editaReceita).subscribe((data: string) => {
      console.log(data);
   });

    alert('receita editada');


    this.formF.patchValue({
      nome: '',
      categoria: '',
      modelo: '',
      descricao: '',
      duracao: ''
    });
    this.ingredientesAdicionados = [];
    this.modoEdicao = false;

  }


}
