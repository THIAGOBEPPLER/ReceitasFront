import { Ingrediente } from './Ingreditente.model';
export interface EditaReceita {

  id?: number;
  nome?: string;
  categoria?: string;
  descricao?: string;
  duracao?: number;
  ingredientes?: number[];
}
