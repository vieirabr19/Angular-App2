import { ItemCarrinho } from './shared/item.carrinho.model';
import { Oferta } from './shared/oferta.model';

export class CarrinhoService {
  public itens: ItemCarrinho[] = [];

  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }

  public incluirItens(oferta: Oferta): void{
    // itens no carrinho
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    );

    // verifica se o item já está no CarrinhoService, se estiver, soma a quantidade
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    if(itemCarrinhoEncontrado){
      itemCarrinhoEncontrado.quantidade += 1;
    }else{
      this.itens.push(itemCarrinho);
    }
  }

  public totalItemCarrinho(): number{
    let total: number = 0;
    this.itens.map((item: ItemCarrinho) => {
      total = total + (item.valor * item.quantidade);
    })
    return total;
  }

  // Adiciona quantidade no carrinho
  public addQuantidadeCarrinho(itemCarrinho: ItemCarrinho): void{
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    
    // incrementar qualidade
    if(itemCarrinhoEncontrado){
      itemCarrinhoEncontrado.quantidade += 1;
    }
  }

  // Subtrai quantidade no carrinho
  public removeQuantidadeCarrinho(itemCarrinho: ItemCarrinho): void{    
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    itemCarrinho.quantidade -= 1;
    if(itemCarrinho.quantidade === 0){
      this.itens.splice(this.itens.indexOf(itemCarrinho), 1);
    }
    // if(itemCarrinhoEncontrado){
    //   // descrementar qualidade
    //   itemCarrinhoEncontrado.quantidade -= 1;
    //   // verifica se a quantidade é 0, se for, exclui do carrinho
    //   if(itemCarrinhoEncontrado.quantidade === 0){
    //     this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
    //   }
    // }
  }

  // Limpar carrinho
  public limparCarrinho(): void{
    this.itens = [];
  }
}
