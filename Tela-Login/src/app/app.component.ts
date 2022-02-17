import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tela-Login';
  senha = '';
  disabledButton = true;
  showModal = false;
  mostrar: boolean = false;
  closeResult = '';
  titleResult = '';
  textResult = '';
  meuForm: FormGroup;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.meuForm.reset();
  }

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
      this.disabledButton = true;
    }else{
      validacaoRepetirSenha.innerText = '';
      this.disabledButton = false;
    }
  }

  createForm(){
    this.meuForm = this.formBuilder.group({
      senhaAntiga: [''],
      novaSenha: [''],
      repetirSenha: ['']
    })
  }

  open(content) {
    const senhaAntiga = this.meuForm.controls['senhaAntiga'].value;
    
    
    if(senhaAntiga != '12345678'){
      this.titleResult = 'Acesso Negado';
      this.textResult = `A senha antiga que você informou não coincide com a senha armazenada na nossa base de dados!`;
    }else{
      this.titleResult = 'Sucesso'
      this.textResult = 'Parabens!\n Senha alterada com sucesso.'
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.meuForm.reset();
      this.disabledButton = true;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.meuForm.reset();
      this.disabledButton = true;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  toggle () {
    this.mostrar = !this.mostrar;
  }
}
