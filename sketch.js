let bezier_val = new Array();
let clickState = 1;
let input;
let button;
let assignment_arr = new Array("맞습니다", "네", "감사합니다", "안녕하십니까", "즐겁습니다", "좋습니다", "고맙습니다", "대단합니다", "새롭습니다", "인상적입니다", "건강하십시오", "공감합니다", "아름답습니다", "예쁩니다", "멋있습니다", "훌륭합니다", "최고입니다", "행복하십시오", "건강하십시오", "믿습니다", "화이팅");
let countdown = 10;
let picked_assignment = 2;
let completed_assignment = 0;
let prev_assignment = picked_assignment;
let hangang;

function setup() {
  createCanvas(1000, 1000);
  bezier_val[0] = height/2 - 60;
  bezier_val[1] = height/2 - 250;
  bezier_val[2] = height/2 - 200;
  bezier_val[3] = height/2 - 65;
  bezier_val[4] = width/2 - 250;
  bezier_val[5] = height/2 - 200;
  bezier_val[6] = width/2 + 140;
  bezier_val[7] = height/2 - 150;
  bezier_val[8] = height/2 + 70;
  bezier_val[9] = width/2 - 200;
  bezier_val[10] = height/2 + 170;
  bezier_val[11] = width/2 + 190;
  bezier_val[12] = height/2 + 170;
  bezier_val[13] = height/2 + 60;
  hangang = loadImage('assets/hangang.png');

  input = createInput();
  input.position(width/2 - 140, height*3/4 + 1.5);
  button = createButton("과제 제출");
  button.position(width/2 + 60, height*3/4);
  button.mousePressed(struggle);
}

function draw() {
  background(0);
  strokeWeight(0);
  textSize(40);
  fill(255);
  
  if(assignment == assignment_arr[picked_assignment] && completed_assignment < 5){ // 과제 제출에 성공 && 과제 제출량이 5미만이면 다음 과제를 낸다.
    if(prev_assignment != 0 && prev_assignment != 13){
      picked_assignment = random(0,1)<0.5 ? int(random(0, prev_assignment)) : int(random(prev_assignment, 13)) ;
    } else {
      picked_assignment = int(random(1,12));
    }
    prev_assignment = picked_assignment;
    completed_assignment++;
    countdown = 10;
    if(completed_assignment == 4){
      week++;
    }
  }

  text('"'+assignment_arr[picked_assignment]+'"'+"라고 말하세요."+'\n'+"제출기한은 "+countdown+"초 남았습니다.", width/4.5, height/8);
  textSize(25);
  text("제출한 과제 수 : "+completed_assignment, width/2 - 120, height - 170);
  stroke(255);

  noFill();

  if(completed_assignment == 5){
    background(0);
    strokeWeight(0);
    fill(255);
    textSize(40);
    text("5초간 휴식, 현재 "+week+" 주차", width/3.6, height/6);
    countdown = 10;
  }
  
  eyeStateChange();
  strokeWeight(8);
  bezier(width/2 - 380, bezier_val[0], width/2-200, bezier_val[1], width/2+80, bezier_val[2], width/2 + 365, bezier_val[3]);
  strokeWeight(10);
  bezier(width/2 - 400, height/2+30, bezier_val[4], bezier_val[5], bezier_val[6], bezier_val[7], width/2 + 400, height/2 + 20);
  bezier(width/2 - 400, bezier_val[8], bezier_val[9], bezier_val[10], bezier_val[11], bezier_val[12], width/2 + 400, bezier_val[13]);

  if(frameCount%80 == 0){
    countdown--;
    if(countdown < 0){
      countdown = 0;
      gameOver = true;
    }
  }

  if(completed_assignment > temp_assignment){
    effect_bool = true;
  }

  if(effect_bool){
    fill_val = lerp(fill_val, 0, 0.09);
    noStroke();
    fill(255, fill_val);
    rect(0,0,width,height);
    if(fill_val < 3){
      fill_val = 0;
      effect_bool = false;
    }
  } else {
    fill_val = 255;
  }
  


  if(gameOver){
    background(0, 20);
    text(assignment, width/2, height/2);
    input.position(10000, 10000);
    button.position(10000, 10000);
    button.mousePressed(struggle);
    image(hangang,0,0);
  }

  temp_assignment = completed_assignment;
}

let week = 0;
let fill_val = 255;
let effect_bool = false;
let temp_assignment = 0;
let gameOver = false;
let changeSpd = 0.02;

function assignment_check(){
  if(assignment == assignment_arr[picked_assignment]){
    return true;
  }
}

function eyeStateChange(){
  if(completed_assignment != 5){
    bezier_val[0] = lerp(bezier_val[0], height/2 - 60, changeSpd);
    bezier_val[1] = lerp(bezier_val[1], height/2 - 250, changeSpd); 
    bezier_val[2] = lerp(bezier_val[2], height/2 - 200, changeSpd); 
    bezier_val[3] = lerp(bezier_val[3], height/2 - 65, changeSpd); 
    bezier_val[4] = lerp(bezier_val[4], width/2 - 250, changeSpd); 
    bezier_val[5] = lerp(bezier_val[5], height/2 - 200, changeSpd); 
    bezier_val[6] = lerp(bezier_val[6], width/2 + 140, changeSpd); 
    bezier_val[7] = lerp(bezier_val[7], height/2 - 150, changeSpd); 
    bezier_val[8] = lerp(bezier_val[8], height/2 + 60, changeSpd); 
    bezier_val[9] = lerp(bezier_val[9], width/2 - 200, changeSpd); 
    bezier_val[10] = lerp(bezier_val[10], height/2 + 170, changeSpd); 
    bezier_val[11] = lerp(bezier_val[11], width/2 + 190, changeSpd); 
    bezier_val[12] = lerp(bezier_val[12], height/2 + 170, changeSpd); 
    bezier_val[13] = lerp(bezier_val[13], height/2 + 60, changeSpd); 
  } else if(completed_assignment == 5) {
    bezier_val[0] = lerp(bezier_val[0], height/2 - 10, changeSpd);
    bezier_val[1] = lerp(bezier_val[1], height/2 + 30, changeSpd); 
    bezier_val[2] = lerp(bezier_val[2], height/2 + 50, changeSpd); 
    bezier_val[3] = lerp(bezier_val[3], height/2 - 15, changeSpd); 
    bezier_val[4] = lerp(bezier_val[4], width/2 - 210, changeSpd); 
    bezier_val[5] = lerp(bezier_val[5], height/2 + 100, changeSpd); 
    bezier_val[6] = lerp(bezier_val[6], width/2 + 330, changeSpd); 
    bezier_val[7] = lerp(bezier_val[7], height/2 + 70, changeSpd); 
    bezier_val[8] = lerp(bezier_val[8], height/2 + 30, changeSpd); 
    bezier_val[9] = lerp(bezier_val[9], width/2 - 210, changeSpd); 
    bezier_val[10] = lerp(bezier_val[10], height/2 + 100, changeSpd); 
    bezier_val[11] = lerp(bezier_val[11], width/2 + 330, changeSpd); 
    bezier_val[12] = lerp(bezier_val[12], height/2 + 60, changeSpd); 
    bezier_val[13] = lerp(bezier_val[13], height/2 + 20, changeSpd); 
  }
}

let assignment;
function struggle(){
  assignment = input.value();
}

