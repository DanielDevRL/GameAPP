import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { CreateGameService } from 'src/app/services/create-game.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [
  ]
})
export class CreateGameComponent implements OnInit {


  form: FormGroup;

  constructor(private fb: FormBuilder,
              private createGameS:CreateGameService,
              private router:Router) {

    this.form = this.fb.group({
      Player1: ['', Validators.required],
      Player2: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    console.log('Contructor');

  }

  createGame() {

    if(this.form.invalid){
      return;
    }

    this.createGameS.createGame(this.form.value).subscribe(data =>{
      console.log('respuesta',data);
      localStorage.setItem('CodGame',data.codGame);
      localStorage.setItem('RoundNumer',data.roundNumer);
      localStorage.setItem('Player1Id', data.player1.idUSer);
      localStorage.setItem('Player1Name', data.player1.userName);
      localStorage.setItem('Player2Id',data.player2.idUSer);
      localStorage.setItem('Player2Name',data.player2.userName);

      this.router.navigateByUrl('/Game');
      

    }, (error) => {
      Swal.fire('Error',error.message,'error');
      
    });
  }

  campoValido(campo: string): boolean {

    if (this.form.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }

  }

  validateNames(): boolean {
    const NamePlayer1 = this.form.get('Player1')?.value;
    const NamePlayer2 = this.form.get('Player2')?.value;

    if (NamePlayer2 != '' && NamePlayer1 != '') {


      if (NamePlayer1 == NamePlayer2) {
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }



  }


}
