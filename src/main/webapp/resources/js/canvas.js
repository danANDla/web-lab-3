var canvas, ctx, xsend, ysend, img_src;
var canvasflag = false;

function initpng(event, ui){
    let radius = ui.value;
    console.log("init canvas", radius);
    canvas = document.getElementById('responsive-canvas');
    ctx = canvas.getContext("2d");
    let heightRatio = 1;
    canvas.height = canvas.width * heightRatio;
    let img = new Image();
    switch (radius) {
        case 1:
            img_src = "./resources/img/1.png";
            break;
        case 1.5:
            img_src = "./resources/img/1_5.png";
            break;
        case 2:
            img_src = "./resources/img/2.png";
            break;
        case 2.5:
            img_src = "./resources/img/2_5.png";
            break;
        case 3:
            img_src = "./resources/img/3.png";
            break;
        case 3.5:
            img_src = "./resources/img/3_5.png";
            break;
        case 4:
            img_src = "./resources/img/4.png";
            break;
        default:
            img_src = "./resources/img/1.png";
            break;
    }
    img.src = img_src;
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    canvas.addEventListener("click", function (e) {
        mouse(e)
    }, false);
}

function init() {
    console.log("init canvas", 1);
    canvas = document.getElementById('responsive-canvas');
    ctx = canvas.getContext("2d");
    let heightRatio = 1;
    canvas.height = canvas.width * heightRatio;
    let img = new Image();
    img.src = "./resources/img/1.png";
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    canvas.addEventListener("click", function (e) {
        mouse(e)
    }, false);
}

function draw(posx, posy, color) {
    let img = new Image();
    img.src = img_src;
    img.onload = function() {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(posx, posy, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

function coord(x, y, r, hit){
    canvas = document.getElementById('responsive-canvas');
    x=parseFloat(x);
    y=parseFloat(y);
    r=parseInt(r,10);
    console.log(x,y,r);
    let offsetx=(canvas.width*150)/300;
    let offsety=(canvas.height*150)/300;
    let posx=offsetx+x/r*150/300*canvas.width;
    let posy=offsety-y/r*150/300*canvas.width;
    let color;
    if(hit === true){
        color = "#59ab42";
    }
    else{
        color = "#ab2a3d";
        console.log("fuck");
    }
    draw(posx,posy,color);
    console.log(posx, posy, hit);
}

function mouse(e){
    // let r = $("input[name='r-input']:checked").val();
    //let r = document.getElementById("main-f:rslider").getValue();
    let r = document.getElementById("main-f:output").innerText;
    console.log(parseFloat(r));
    if (typeof r == 'undefined') {
        document.getElementById("r-invite").style.color = "#AC2205";
        document.getElementById("r-invite").style.fontWeight = "300";
    }
    else{
        document.getElementById("r-invite").style.color = "white";
        document.getElementById("r-invite").style.fontWeight = "300";
        canvas = document.getElementById('responsive-canvas');
        let posx=getMouesPosition(e).x;
        let posy=getMouesPosition(e).y;
        posx=parseFloat(posx);
        posy=parseFloat(posy);
        let offsetx=(canvas.width*150)/300;
        let offsety=(canvas.height*150)/300;
        xsend=(posx-offsetx)*parseFloat(r)*300/(107*canvas.width);
        ysend=-(posy-offsety)*parseFloat(r)*300/(107*canvas.width);
        console.log(xsend, ysend);
        canvasflag = true;
        draw(posx,posy,"#000000");
    }
}

function getMouesPosition(e) {
    let mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
    let mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
    return {x: mouseX, y: mouseY};
}