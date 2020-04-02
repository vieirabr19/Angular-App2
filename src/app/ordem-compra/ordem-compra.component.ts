import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OrdemCompraService } from '../ordem-compra.service';
import { CarrinhoService } from '../carrinho.service';

import { Pedido } from '../shared/pedido.model';
import { ItemCarrinho } from '../shared/item.carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  // ID do pedido cadastrado
  public idPedidoCompra: number;
  // itens adicionados no carrinho
  public itensCarrinho: ItemCarrinho[];

  // válida formulário com FormGroup
  public formulario: FormGroup = new FormGroup({
    "endereco": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    "numero": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "complemento": new FormControl(null),
    "formaPagamento": new FormControl(null, [Validators.required])
  });

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
    // console.log(this.itensCarrinho);
  }

  // Valida os campos do formulário
  public confirmarCompra(): void {
    if(this.formulario.status === "INVALID"){
      // muda para a classe ng-touched ao clicar sem preencher os campos
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    }
    else{
      if(this.carrinhoService.exibirItens().length === 0){
        alert("Você não selecionou nenhum item no carrinho.");
      }
      else{
        let pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
        );
        
        this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) => {
          this.idPedidoCompra = idPedido;
          this.carrinhoService.limparCarrinho();
        })
      }
    }
  }

  // adiciona quantidade no carrinho
  public addQuantidadeCarrinho(item: ItemCarrinho): void{
    this.carrinhoService.addQuantidadeCarrinho(item);
  }

  // remove quantidade no carrinho
  public removeQuantidadeCarrinho(item: ItemCarrinho): void{
    this.carrinhoService.removeQuantidadeCarrinho(item);
  }
}
