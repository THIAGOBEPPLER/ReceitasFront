import { ComunicacaoService } from './../../comunicacao.service';
import { EditaReceita } from './../../Models/EditaReceita';
import { RecebeBusca } from './../../Models/RecebeBusca';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceitaService } from 'src/app/receita.service';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  formB: FormGroup;
  busca: RecebeBusca[];
  editaReceita: EditaReceita;


  constructor(private rs: ReceitaService,
              private fb: FormBuilder,
              private cs: ComunicacaoService){ }

  ngOnInit(): void {
    this.formB = this.fb.group({
      nome: '',
      categoria: ''
    });


  }

  onBuscar(): void{
    this.rs.getBusca(this.formB.value.nome, this.formB.value.categoria)
    .subscribe((data: RecebeBusca[]) => {
      // console.log(data);
      this.busca = data;
      console.log(this.busca);
    });
  }
  onExcluir(id: number): void {
    // this.onBuscar();
    console.log(id);

    this.rs.deleteReceita(id).subscribe();
    alert('Deletado.');
    this.onBuscar();
  }
  onEditar(id: number): void {
    // this.onBuscar();
    console.log(id);

    this.rs.getReceita(id).subscribe((data: EditaReceita) => {
      // console.log(data);
    this.editaReceita = data;
    console.log(this.editaReceita);
    this.cs.sendAtualiza(this.editaReceita);
    });


  }

}
