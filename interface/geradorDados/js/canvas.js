dados = []
function setup() {
    c = createCanvas(602, 369);
    c.parent("canvaswrapper") 
    input = createFileInput(handleFile);
    input.parent("fileWrapper")
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
    var contador=0;
    for(let i = 0; i< dados.length; i++){
        element = dados[i]
        if(dados[i].date == appVue.data){
            chaves = dados.map(el => el.date)
            if(contador == 0){
                fill(color(0, 255, 0))
            } else if (i >= chaves.lastIndexOf(dados[i].date)){
                fill(color(255, 0, 0))
            } else {
                fill(color(255, 204, 0));
            }
        circle(element.x, element.y, 10, 10) 

        if(i+1 < dados.length && dados[i].date == dados[i+1].date){
            line(element.x, element.y, dados[i+1].x, dados[i+1].y);
            fill(color(0, 0, 0));
        }
        contador+=1
    } else{
        contador=0
    }
    }
}

function doubleClicked() {

    isDataNova = !dados.some(el => el.date == appVue.data)
    if(isDataNova){
        appVue.datas.push(appVue.data)
        appVue.datas.sort()
    }
    dados.push({
        date: appVue.data,
        x: mouseX,
        y: mouseY,
        stress: appVue.estressado || false
    })
    dados.sort(function(a,b){
        return new Date(b.date) - new Date(a.date)
    });
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
    dados.sort(function(a,b){
        return new Date(b.date) - new Date(a.date)
    });
    json = JSON.stringify(dados);
    console.log(json)
    saveJSON(JSON.stringify(dados), 'dados.json');
}
$("#date").change(function() {
    dados.sort(function(a,b){
        redraw()
        return new Date(b.date) - new Date(a.date)
    });
    let a = dados.find(obj => obj.date === appVue.data)
    if(a){
    appVue.estressado = a.stress
    }
});