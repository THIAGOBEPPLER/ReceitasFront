import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SugestaoComponent } from './sugestao/sugestao.component';

const routes: Routes = [
  {path: 'cadastro', component: CadastroComponent},
  {path: 'sugestao', component: SugestaoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
