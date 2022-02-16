import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tela-Login';
  senha = '';
  disabledButton = true;


  verificarNovaSenha(event: any){

    let novaSenha = event.target.value;
    const validacaoNovaSenha = document.getElementById('novaSenha');

    if(novaSenha.length < 8){
      validacaoNovaSenha.innerText = 'A nova senha tem que conter no minimo 8 caracter';
    }else if(novaSenha.length >= 8 && novaSenha.toLowerCase() == novaSenha){
      validacaoNovaSenha.innerText = 'A nova senha precisa conter um letra Maiúscula';
    }else if(novaSenha.includes('@') || novaSenha.includes('#') || novaSenha.includes('$') || novaSenha.includes('&') || novaSenha.includes('-')){
      validacaoNovaSenha.innerText = '';
    }else{
      validacaoNovaSenha.innerText = 'A nova senha precisa conter pelo menos um caracter especial: @#$&-';
    }

    this.senha = novaSenha;
  }

  verificarRepetirSenha(event: any){
    let repetirSenha = event.target.value;
    const validacaoRepetirSenha = document.getElementById('repetirSenha');

    if(repetirSenha != this.senha){
      validacaoRepetirSenha.innerText = 'A senha repetida está incorreta!';
    }else{
      validacaoRepetirSenha.innerText = '';
      this.disabledButton = false;
    }
  }
}
