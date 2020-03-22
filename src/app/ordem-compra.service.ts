import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL_API } from './app.api';
import { Pedido } from './shared/pedido.model';

@Injectable()
export class OrdemCompraService{

    constructor(
      private http: HttpClient
    ){}

  public efetivarCompra(pedido: Pedido): Observable<any>{
    return this.http.post(`${URL_API}/pedidos`, pedido).pipe(
      map((resposta: any) => resposta.id)
    )
  }
}