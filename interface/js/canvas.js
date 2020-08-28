dados = []
function setup() {
    createCanvas(602, 369); 
    input = createFileInput(handleFile);
    input.position(10, height+ 10);
    img = loadImage("img/fundo.jpg");
  }
img = null
  function handleFile(file) {
    if (file.type === 'image') {
      img = loadImage(file.data);
      console.log(img)
    } else {
      img = null;
    }
  }
  
function draw() {
    background(img);
    fill(color(255, 204, 0, .7));
    ellipse(mouseX, mouseY, 10, 10);
    for(let i = 0; i< dados.length; i++){
        element = dados[i]
        switch(i){
            case 0:
                fill(color(0, 255, 0))
                break;
            case dados.length-1:
                fill(color(255, 0, 0))
                break;
            default:
                fill(color(255, 204, 0));
                break
        }
        circle(element.x, element.y, 10, 10) 

        if(i+1 < dados.length){
            line(element.x, element.y, dados[i+1].x, dados[i+1].y);
            fill(color(0, 0, 0));
        }

    }
}

function doubleClicked() {

    dados.push({
        x: mouseX,
        y: mouseY
    })
}
function keyPressed() {
    switch(keyCode){
        case ENTER:
            salvarDados();
            break;
        case BACKSPACE:
            dados = [];
            break;
        case DELETE:
            dados.pop();
    }
    return false;
  }
function salvarDados(){
    json = JSON.stringify(dados);
    console.log(json)
    saveJSON(JSON.stringify(dados), 'dados.json');
}