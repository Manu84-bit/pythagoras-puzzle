
window.onload = ()=>{

var squarePiece = document.getElementById("piece-wrapper1");
var wrappers = document.getElementsByClassName("piece-wrapper");
var canvas = document.getElementById("canvas");
var initX, initY, mousePressX, mousePressY;

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

function repositionElement(x, y, wrapper) {
    wrapper.style.left = x + 'px';
    wrapper.style.top = y + 'px';
}

// function getCurrentRotation(el) {
//     var st = window.getComputedStyle(el, null);
//     var tm = st.getPropertyValue("-webkit-transform") ||
//         st.getPropertyValue("-moz-transform") ||
//         st.getPropertyValue("-ms-transform") ||
//         st.getPropertyValue("-o-transform") ||
//         st.getPropertyValue("transform")
//     "none";
//     if (tm != "none") {
//         var values = tm.split('(')[1].split(')')[0].split(',');
//         var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
//         return (angle < 0 ? angle + 360 : angle);
//     }
//     return 0;
// }


// drag support
function draggable(el){
    el.addEventListener('mousedown', function (event) {
        event.preventDefault();

        if (event.target.className.indexOf("dot") > -1) {
            return;
        }
    
        initX = this.offsetLeft;
        initY = this.offsetTop;
        mousePressX = event.clientX;
        mousePressY = event.clientY;
    
    
        function eventMoveHandler(event) {
            repositionElement(initX + (event.clientX - mousePressX),
                initY + (event.clientY - mousePressY), el);
        }
    
        el.addEventListener('mousemove', eventMoveHandler, false);
        el.addEventListener('mouseup', function eventEndHandler() {
            el.removeEventListener('mousemove', eventMoveHandler, false);
            window.removeEventListener('mouseup', eventEndHandler);
            el.removeEventListener('mouseup', eventEndHandler);

        }, false);
    
    }, false);
}


// for(let i=0; i < wrappers.length; i++){
//     draggable(wrappers[i]);
// }

function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e.preventDefault();
      //To prevent movement when rotating
      if (e.target.className.indexOf("dot") > -1) {
        return;
    }

      // get the mouse cursor position at startup:
     
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";


    }
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  for(let i=0; i < wrappers.length; i++){
    dragElement(wrappers[i]);
}
// handle rotation
function rotateBox(deg, el) {
    el.style.transform = `rotate(${deg}deg)`;
}

function rotable(el, querySelector, rotateId){
    var rotate = document.getElementById(rotateId);

    
rotate.addEventListener('mousedown', function (event) {
  
    initX = this.offsetLeft;
    initY = this.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;

    var arrow = document.querySelector(querySelector);
    var arrowRects = arrow.getBoundingClientRect();
    var arrowX = arrowRects.left + arrowRects.width / 2;
    var arrowY = arrowRects.top + arrowRects.height / 2;

    function eventMoveHandler(event) {
        var angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2;
        rotateBox(angle * 180 / Math.PI, el);
    }

    window.addEventListener('mousemove', eventMoveHandler, false);

    window.addEventListener('mouseup', function eventEndHandler() {
        window.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);
}, false);

}


rotable(squarePiece, "#square", "rotate");

for(let i=1; i < wrappers.length; i++){
    rotable(wrappers[i], "#poly" + `${i}`, "rotate" + `${i}`);
}


//Reposition pieces 
var posX = 100
var posY = 120
for(i= 0 ; i < wrappers.length; i++){
    if( i>0){
        posY = 240;
    }
    if(i>=3){
        posY = 340;
    }
    if(i==2 || i == 4){
        posX = 250;
    }
    if(i== 3){
        posX = 100;
    }
    repositionElement(posX, posY, wrappers[i]);
}
}