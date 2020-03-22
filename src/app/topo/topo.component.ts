import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';

import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  // public ofertasList: Oferta[];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if(termo.trim() === ''){
          return of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
      }),
      catchError((erro: any) => {
        console.log('Erro', erro);
        return of([]);

      })
    )

    // this.ofertas.subscribe((ofertas: Oferta[]) => {
    //   console.log(ofertas)
    //   this.ofertasList = ofertas;
    // });
  }

  public pesquisa(termoDaBusca: string): void{
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next('');
  }

}

