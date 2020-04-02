import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OfertasService } from '../ofertas.service';
import { CarrinhoService } from '../carrinho.service';

import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {
  public oferta: Oferta;
  // public itens: CarrinhoService[] = [];

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertasPorId(parametros.id)
      .then((res: Oferta) => {
        this.oferta = res[0];
      })
    })
  }

  ngOnDestroy(){
    
  }

  public adicionarItemCarrinho(): void{
    this.carrinhoService.incluirItens(this.oferta);
    // console.log(this.carrinhoService.exibirItens());
  }

}
