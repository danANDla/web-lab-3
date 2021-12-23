var canvas, ctx, xsend, ysend, img_src, radius;
var canvasflag = false;

function initpng(event, ui){
    radius = ui.value;
    console.log("initpng canvas", radius);
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
    drawall();
}

function init() {
    radius = 1;
    console.log(document.getElementById("main-f:output").value);
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

function draw(posx, posy, color) {
    console.log("Draw", posx, posy, radius);
    let img = new Image();
    if(img_src === undefined) img_src = "./resources/img/1.png";
    img.src = img_src;
    img.onload = function() {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(posx, posy, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

function drawall(){
    console.log("Draw all for radius", radius);
    canvas = document.getElementById('responsive-canvas');
    $(".ishit-true").each( function (){
        let rowrad = $(this).find("td:nth-child(3)").text();
        if(parseFloat(rowrad) === radius ){
            let rowx = $(this).find("td:nth-child(1)").text();
            let rowy = $(this).find("td:nth-child(2)").text();
            let offsetx=(canvas.width*150)/300;
            let offsety=(canvas.height*150)/300;
            let posx=offsetx+parseFloat(rowx)/radius*107/300*canvas.width;
            let posy=offsety-parseFloat(rowy)/radius*107/300*canvas.width;
            draw(posx, posy, "#59ab42")
        }
    });
    $(".ishit-false").each( function (){
        let rowrad = $(this).find("td:nth-child(3)").text();
        if(parseFloat(rowrad) === radius ){
            let rowx = $(this).find("td:nth-child(1)").text();
            let rowy = $(this).find("td:nth-child(2)").text();
            let offsetx=(canvas.width*150)/300;
            let offsety=(canvas.height*150)/300;
            let posx=offsetx+parseFloat(rowx)/radius*107/300*canvas.width;
            let posy=offsety-parseFloat(rowy)/radius*107/300*canvas.width;
            draw(posx, posy, "#ab2a3d");
        }
    });
}

function coord(x, y, r, hit){
    canvas = document.getElementById('responsive-canvas');
    x=parseFloat(x);
    y=parseFloat(y);
    r=parseInt(r,10);
    console.log(x,y,r);
    let offsetx=(canvas.width*150)/300;
    let offsety=(canvas.height*150)/300;
    let posx=offsetx+x/r*107/300*canvas.width;
    let posy=offsety-y/r*107/300*canvas.width;
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
    console.log(parseFloat(radius));
    if (typeof radius == 'undefined') {
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
        xsend=(posx-offsetx)*parseFloat(radius)*300/(107*canvas.width);
        ysend=-(posy-offsety)*parseFloat(radius)*300/(107*canvas.width);
        console.log(xsend, ysend);
        canvasflag = true;
        document.getElementById('hid-f:xhid').value=xsend;
        document.getElementById('hid-f:yhid').value=ysend;
        console.log("AAAAA", document.getElementById('hid-f:xhid').value, document.getElementById('hid-f:yhid').value);
        document.getElementById('hid-f:rhid').value=parseFloat(radius);
        document.getElementById("hid-f:submithid").click();
        document.getElementById("hid-f:xhid").value = null;
        document.getElementById("hid-f:yhid").value = null;
        draw(posx,posy,"#000000");
    }
}

function getMouesPosition(e) {
    let mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
    let mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
    return {x: mouseX, y: mouseY};
}

function setR(){
    console.log("setR")
    radius = document.getElementById("main-f:output").innerText;
    radius = parseFloat(radius);
}