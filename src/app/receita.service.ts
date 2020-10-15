import { EditaReceita } from './Models/EditaReceita';
import { RecebeBusca } from './Models/RecebeBusca';
import { RecebeSugestao } from './Models/RecebeSugestao';
import { Ingrediente } from './Models/Ingreditente.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NovaReceita } from './Models/NovaReceita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private urlReceita = 'http://localhost:49466/api/receita/';
  private urlIngrediente = 'http://localhost:49466/api/ingrediente/';


  constructor(private http: HttpClient) { }

  getIngreditentes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.urlIngrediente);
  }
  getSugestao(busca: string): Observable<RecebeSugestao[]> {
    const url = this.urlIngrediente.concat('sugestao');
    let params = new HttpParams();
    params = params.append('ingredientes', busca);
    return this.http.get<RecebeSugestao[]>(url, {params});
  }

  getBusca(nome: string, categoria: string ): Observable<RecebeBusca[]> {
    let params = new HttpParams();
    params = params.append('nome', nome);
    params = params.append('categoria', categoria);
    return this.http.get<RecebeBusca[]>(this.urlReceita, {params});
  }

  deleteReceita(id: number): Observable<string> {
    const idS = id.toString();
    const url = this.urlReceita.concat(idS);
    return this.http.delete<string>(url);
  }
  getReceita(id: number): Observable<EditaReceita>{
    const idS = id.toString();
    const url = this.urlReceita.concat(idS);
    return this.http.get<EditaReceita>(url);
  }


  postCadastra( receita: NovaReceita): Observable<string> {
    return this.http.post<string>(this.urlReceita, receita);
  }

}
