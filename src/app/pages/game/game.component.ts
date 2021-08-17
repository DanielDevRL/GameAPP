import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateGameService } from 'src/app/services/create-game.service';
import { MovementService } from 'src/app/services/movement.service';
import { RoundService } from 'src/app/services/round.service';
import Swal from 'sweetalert2'

interface ResultRound {
  Id: number;
  IdRound : number;
  CodGame: number;
  Result: string;
  IdUser: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit {

   numberRound;
   player;
   namePler;

   list: any;
  listResutl:any;
   form: FormGroup;

  constructor( private fb: FormBuilder,
    private movement: MovementService,
    private createGameS:CreateGameService,
    private round: RoundService,
    private router:Router) {

    console.log();
    const id  = localStorage.getItem('RoundNumer')
    this.numberRound = id?.toString();
    this.player = 1;

    if(this.player == 1){
      this.namePler = localStorage.getItem('Player1Name');
    }else{
      this.namePler = localStorage.getItem('Player2Name');
    }

   
    this.getListMovement();
    this.listRestul();

    this.form = this.fb.group({
      Movimiento: ['-1',Validators.required],
    });

   }

  ngOnInit(): void {
  }

  getListMovement(){
    this.movement.ListMovement().subscribe(data => {
      this.list = data;      
    });
  }

  submit(){
    if(this.form.get('Movimiento')?.value == '-1'){
      return;
    }


    const CodGame = localStorage.getItem('CodGame');
    const Movement = this.form.get('Movimiento')?.value;

    if(this.player == 1){

      const playerId1 = localStorage.getItem('Player1Id');
 
       this.round.registerRound(CodGame,playerId1,Movement,this.numberRound,false).subscribe(data =>{
          if(data.message == "Siguiente"){

            this.player = 2;
            this.namePler = localStorage.getItem('Player2Name');
            this.form = this.fb.group({
              Movimiento: ['-1',Validators.required],
            });
          }
            
        });

    }else{
      const playerId2 = localStorage.getItem('Player2Id');
      this.round.registerRound(CodGame,playerId2,Movement,this.numberRound,true).subscribe(data =>{
        if(data.message == "Siguiente"){

          this.player = 1;
          this.namePler = localStorage.getItem('Player1Name');
          const newRoud = Number(this.numberRound) +1;
          localStorage.setItem('RoundNumer',newRoud.toString());
          this.numberRound = newRoud.toString();
         
          this.listRestul();


          this.form = this.fb.group({
            Movimiento: ['-1',Validators.required],
          });
        }

        if(data.message == "Ganador"){

          Swal.fire({
            title: 'Ganador!!!' +data.userName,
            text:  'Desea Jugar de nuevo?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI'
          }).then((result) => {
            if (result.isConfirmed) {
             this.reset();
            }else{
              localStorage.removeItem('CodGame');
              localStorage.removeItem('RoundNumer');
              localStorage.removeItem('Player1Id');
              localStorage.removeItem('Player1Name');
              localStorage.removeItem('Player2Id');
              localStorage.removeItem('Player2Name');
              this.router.navigateByUrl('/')

            }
          })

        }
          
      });

    }
  }

  listRestul(){
   const codGame = localStorage.getItem('CodGame');
    this.round.ListResult(codGame).subscribe(datos =>{
     
      this.listResutl = datos;      
    });
  }

  validateGame(){
    const Movimientos = this.form.get('Movimiento')?.value;

    if(Movimientos == '-1'){
      return true;
    }else{
      return false;
    }
  }

  reset(){


    const player1 = localStorage.getItem('Player1Name');
    const player2 = localStorage.getItem('Player2Name');


    this.createGameS.resetGame(player1,player2).subscribe(data =>{
      console.log('respuesta',data);
      localStorage.setItem('CodGame',data.codGame);
      localStorage.setItem('RoundNumer',data.roundNumer);
      localStorage.setItem('Player1Id', data.player1.idUSer);
      localStorage.setItem('Player1Name', data.player1.userName);
      localStorage.setItem('Player2Id',data.player2.idUSer);
      localStorage.setItem('Player2Name',data.player2.userName);
      this.listRestul();
      const id  = localStorage.getItem('RoundNumer')
      this.numberRound = id?.toString();
      this.player = 1;
      this.form = this.fb.group({
        Movimiento: ['-1',Validators.required],
      });

    if(this.player == 1){
      this.namePler = localStorage.getItem('Player1Name');
    }else{
      this.namePler = localStorage.getItem('Player2Name');
    }

    }, (error) => {
      Swal.fire('Error',error.message,'error');
      
    });
  }


}
