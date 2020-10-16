import { EditaReceita } from './Models/EditaReceita';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacaoService {

  constructor() { }

  private subject = new Subject<EditaReceita>();

  sendAtualiza(receita: EditaReceita): void{
    this.subject.next(receita);
  }
  getAtualiza(): Observable<EditaReceita>{
    return this.subject.asObservable();
  }
}
