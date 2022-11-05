// **** VARIAVEIS - FUNCIONAMENTO ****
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

// **** SELETOR - CONTADOR ****
const turnCounter = document.querySelector("#turn");

// **** SELETOR - CLICÁVEIS ****
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
const spanButton = document.querySelector("#spanButton");

// **** FUNÇÕES - BOTOES NÃO JOGÁVEIS ****
// 1 - #strict
strictButton.addEventListener('change', (event) =>{
      if(strictButton.checked && onButton.checked){
        strict = true;
        strictStat.style.backgroundColor = "red";
      } else {
        strict = false;
        strictStat.style.backgroundColor = "white";
      }
})

// 2 - #on
onButton.addEventListener('click', (event) => {
  if (onButton.checked){
    on = true;
    turnCounter.innerHTML = "-";
    clearColor();
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
    strict = false;
    strictStat.style.backgroundColor = "white";
  }
})

// 3 - #start
startButton.addEventListener('click', (event) => {
  if(on){
    play();
  }
  
})

// **** FUNÇÕES - JOGABILIDADE ****
// funcão - iniciar o jogo
function play(){
  /* retificando que as varíaveis iniciem nulas para que o jogo reinicie sem embate de informações, 
  caso uma partida anterior tenhaa contecido */
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  
  // loop para definir a ordem aleatória em que os botões coloridos vão acender
  for(var i=0; i<10; i++){
    order.push(Math.floor(Math.random()* 4) + 1);
  }
  
  // definindo os turnos
  // o computador inicia, indicando qual botão acenderá
  compTurn = true;
  
  //intervalo de tempo entre as luzes
  intervalId = setInterval(gameTurn, 800);
}

// *** FUNÇÃO - definindo se o turno será do computador ou do usuário
function gameTurn(){
  on = false;
  
  /*se o valor no contador for igual a quantidade de vez que as luzes acenderam,
  a vez do computador acabou e o tempo e cores voltam a seu default*/
  if (flash == turn){
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  
  /*definindo quais cores vão acender e tempo em que vão se manter acesas, 
  quando na vez do computador*/
  if (compTurn){
    clearColor();
    setTimeout(() => {
      if(order[flash] == 1) one();
      if(order[flash] == 2) two();
      if(order[flash] == 3) three();
      if(order[flash] == 4) four();
      flash++;
    }, 400);
  }
}

//Definindo a cor da luz e o audio pertencente a cada botão colorido
function one(){
  if(noise){
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two(){
  if(noise){
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three(){
  if(noise){
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four(){
  if(noise){
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

//Redefinindo a cor da botão para o padrão
function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue"; 
}

//Redefinindo a cor da botão para a cor da 'luz'
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}


//Botões coloridos - Função OnClick
topLeft.addEventListener('click', (event) =>{
  if(on){
    playerOrder.push(1);
    check();
    one();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) =>{
  if(on){
    playerOrder.push(2);
    check();
    two();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) =>{
  if(on){
    playerOrder.push(3);
    check();
    three();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) =>{
  if(on){
    playerOrder.push(4);
    check();
    four();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

// FUNÇÕES - pontuação
function check(){
  // se o usuário clicar na opção errada
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;
  
  //se o usuário acertar tudo sem erros
  if (playerOrder.length == 9 && good) {
    winGame();
  }
  
  if (good == false){
    flashColor();
    turnCounter.innerHTML = "ERROU!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      
      /*Se o modo strict tiver ativado, se o usuário erra o jogo reinicia com uma nova sequência,
      caso contrário, a pontução se mantem e o usuário pode jogar novamente a rodada que 
      errou anteriormente*/
      if(strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    
    noise = false;
  }
      
  // se o usuário clicar na opção correta, sem que o turno seja o último
  if(turn == playerOrder.length && good && !win){
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 1000);
  }
}

// se o usuário passar por todos os turnos
function winGame(){
  flashColor();
  turnCounter.innerHTML = "GANHOU!";
  on = false;
  win = true;
  // quando ganho, o jogo reinicia
  setTimeout(() => {
    onButton.checked = false;
    turnCounter.innerHTML = ""
    clearColor();
  }, 3000)
}

