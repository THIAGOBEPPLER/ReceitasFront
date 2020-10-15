import { Ingrediente } from './Ingreditente.model';
export interface NovaReceita {

  nome?: string;
  categoria?: string;
  descricao?: string;
  duracao?: number;
  ingredientes?: number[];
}
