import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Oferta } from './shared/oferta.model';
import { URL_API } from './app.api';

@Injectable()
export class OfertasService{
  
  constructor(
    private http: HttpClient
  ){}

  public getOfertas(): Promise<Oferta[]>{
    return this.http.get(`${URL_API}/ofertas/?destaque=true`)
      .toPromise()
      .then((res: any) => res)
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
    return this.http.get(`${URL_API}/ofertas/?categoria=${categoria}`)
      .toPromise()
      .then((res: Oferta[]) => res)
  }

  public getOfertasPorId(id: number): Promise<Oferta>{
    return this.http.get(`${URL_API}/ofertas/?id=${id}`)
      .toPromise()
      .then((res: Oferta) => res)
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((res: any) => res[0])
  }

  public getOndeFicaPorId(id: number): Promise<string>{
    return this.http.get(`${URL_API}/onde-fica/?id=${id}`)
      .toPromise()
      .then((res: any) => res[0])
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]>{
    return this.http.get(`${URL_API}/ofertas/?descricao_oferta_like=${termo}`)
    .pipe(
      retry(10),
      map((resposta: any) => resposta)
    )
  }
}