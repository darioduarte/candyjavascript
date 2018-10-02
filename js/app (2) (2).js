$(document).ready(function(){

var tablaDulces = new Array();
var filas = new Array();
var igualdades = new Array();
var decenaSegundos = 0;
var unidadSegundos = 0;
var decenaMinutos = 0;
var unidadMinutos = 0;
var temporizador = 0;
var reductorDeMinutos = 0;
var i = 0;
var nuevosDulces = 0;
var score = 0;
var comparativoFilas = false;
var comparativoColumnas =  false;
var igualdadesEcontradas = false;
var targetId = null;
var xs;
var ys;
var xd;
var yd;
var eje = "";
var vecino
var comparacionFilasTermino = false;
var pruebaigualdades = new Array();

Dulce = function () {
  imagen = document.createElement("img");
  var random = parseInt(Math.random()*4+1);
  $(imagen).attr("src","image/"+random+".png");
  $(imagen).addClass("elemento");
  $(imagen).addClass("ui-draggable");
  $(imagen).addClass("ui-draggable-handle");
  $(imagen).addClass("ui-droppable");
  //$(imagen).css("position","relative");
  targetId = $("img").draggable({
     start:function (e) {
       //console.log(e.target.attributes.row.nodeValue, e.target.attributes.col.nodeValue)
       this.row = e.target.attributes.row.nodeValue
       this.col = e.target.attributes.col.nodeValue
       xs = e.clientX
       ys = e.clientY
       console.log(this.row, this.col);
       console.log(xs, "xs", ys,"ys", "start")

     },
    drag: function (e, ui) {
       xd = e.clientX;
       yd = e.clientY;
       posicion = e.target.getBoundingClientRect();
       posicionX = parseInt(e.target.attributes[2].value);
       posicionYAdelante = parseInt(e.target.attributes[3].value)+1;
       // actual = $("#hola"+e.target.attributes[2].value+e.target.attributes[3].value)
       // vecino = $("#hola"+posicionX+posicionYAdelante)
       // posicionVecino = $("#hola"+posicionX+posicionYAdelante).position()
       //$(".elemento").draggable({containment: vecino})
       console.log(ui, "ui");
       console.log(xd, "xd", yd, "yd");
       console.log(posicionX,posicionYAdelante, "pos");
       console.log(e, "drag");
       console.log(vecino, "vecino");
       console.log(posicion, "posicion");
       //console.log(posicionVecino, "posicion vecino");
       //console.log($(".elemento").draggable("option", "containment"), "get containmet");


     },
     containment: ".panel-tablero",
     grid: [100, 100],
     zIndex: 100,
     revert: "valid",
     revertDuration:300
  });

  $(".elemento").droppable({
    drop: function (e, ui) {
      var origen = tablaDulces[parseInt(ui.helper[0].row)][parseInt(ui.helper[0].col)]
      var destino = tablaDulces[e.target.attributes.row.value][e.target.attributes.col.value]
      console.log(destino, "destino");
      console.log(origen, "origen");
      console.log(e, "evento drop");

      // var temp = tablaDulces[parseInt(ui.helper[0].row)][parseInt(ui.helper[0].col)]
      // //origen = destino
      // tablaDulces[parseInt(ui.helper[0].row)][parseInt(ui.helper[0].col)] = tablaDulces[e.target.attributes.row.value][e.target.attributes.col.value], "destino"
      // // destino =  origen osea al temp
      // tablaDulces[e.target.attributes.row.value][e.target.attributes.col.value] = temp

      var srcOrigen = $(origen).attr("src");
      var srcDestino = $(destino).attr("src");
      $(origen).attr("src", srcDestino)
      $(destino).attr("src", srcOrigen)


      compararColumnas();


      console.log(tablaDulces, "drop de tabla dulces");
      /*var srcOrigen = $(origen).attr("src");
      var srcDestino = $(destino).attr("src");
      console.log(srcOrigen,"origen");
      console.log(srcDestino,"destino");
      $(origen).attr("src", srcDestino)
      $(destino).attr("src", srcOrigen)*/

    }
  })

/*  $(".elemento").on("dragstart", function (e) {
    this.row = e.target.attributes.row.nodeValue
    this.col = e.target.attributes.col.nodeValue
    xs = e.clientX
    ys = e.clientY
    console.log(this.row, this.col);
    console.log(xs, "xs", ys,"ys", "start")
  })

  $(".elemento").on("drag", function (e) {
    posicionX = parseInt(e.target.attributes[2].value);
    posicionYAdelante = parseInt(e.target.attributes[3].value)+1;
    actual = $("#hola"+e.target.attributes[2].value+e.target.attributes[3].value)
    vecino = $("#hola"+posicionX+posicionYAdelante)
    //console.log(vecino[0].x, "vecino");
    //console.log(actual[0].x, "actual");
    //console.log(ui, "position actual");
    //console.log( vecino.position(), "actual offset");
    //$(actual).css({"position":"relative", "left" : vecino.offset().left})
    //ui.position.left = vecino.position().left;
    console.log(actual.position(), "actual");
    console.log(vecino.position(), "vecino");
    $(actual).css({"left": vecino.position().left-275})

  })*/

  /*$(".elemento").draggable({
    start:function (e) {
      //console.log(e.target.attributes.row.nodeValue, e.target.attributes.col.nodeValue)
      this.row = e.target.attributes.row.nodeValue
      this.col = e.target.attributes.col.nodeValue
      xs = e.clientX
      ys = e.clientY
      console.log(this.row, this.col);
      console.log(xs, "xs", ys,"ys", "start")
      $(".elemento").draggable({containment:""})
    },
    drag:function (e, ui) {
      posicionX = parseInt(e.target.attributes[2].value);
      posicionYAdelante = parseInt(e.target.attributes[3].value)+1;
      actual = $("#hola"+e.target.attributes[2].value+e.target.attributes[3].value)
      vecino = $("#hola"+posicionX+posicionYAdelante)
      console.log(vecino[0].x, "vecino");
      console.log(actual[0].x, "actual");
      console.log(ui, "position actual");
      console.log( vecino.position(), "actual offset");
      //$(actual).css({"position":"relative", "left" : vecino.offset().left})
      //ui.position.left = vecino.position().left;
        $(".elemento").draggable({containment:vecino})
    },
  })*/

  return imagen
}


Tablero = function () {

  var crearListaDulces = function () {

    for (var i = 0; i < 7; i++) {
      tablaDulces.push(new Array());
      for (var j = 0; j < 7; j++) {
        if (i===6 && j ===6) {
          console.log("lista creada")
        }
        var dulce = new Dulce();
            columnas = $(".col-"+(i+1))
            tablaDulces[i][j] = dulce;
            tablaDulces[i][j].id = "hola"+i+""+""+j+""
            tablaDulces[i][j].setAttribute("row", i)
            tablaDulces[i][j].setAttribute("col", j)
            //columnas.attr("style","justify-content: flex-start")
            //columnas.prepend(tablaDulces[i][j]);
            columnas.addClass("flex-start")
            $(tablaDulces[i][j]).addClass("ui-draggable");
            $(tablaDulces[i][j]).addClass("ui-draggable-handle");
            $(tablaDulces[i][j]).addClass("ui-droppable");
            //$(tablaDulces[i][j]).css("position","relative");
      }
    }
    console.log("crear lista dulces")
  }

crearListaDulces();

renderizar = function () {
   console.log("renderizar")
   var temporizador = setInterval(function () {
     i = i+1;
     if (i<8) {

       for (var j = 0; j < 7; j++) {
         columnas = $(".col-"+(j+1))
         columnas.append(tablaDulces[i-1][j])
         //console.log(tablaDulces[i-1][j]);
       }
     } else {
       //compararColumnas();
       clearInterval(temporizador)
     }
   }, 250)
 }

//Comparo si hay 2 o mas igualdades en una fila o columna, luego las selecciona par aposteriormente aplicar la animacion y elimnarlas.
compararColumnas = function () {
  console.log("comparar");
  for (var i = 0; i < tablaDulces.length; i++) {
    for (var j = 0; j < tablaDulces.length; j++) {
      //Comparar columnas por trios
      if (i+2 < tablaDulces.length) {
        if (tablaDulces[i][j].src === tablaDulces[i+1][j].src && tablaDulces[i+1][j].src === tablaDulces[i+2][j].src) {
          igualdades.push(tablaDulces[i][j]);
          igualdades.push(tablaDulces[(i+1)][j]);
          igualdades.push(tablaDulces[(i+2)][j]);
          $(tablaDulces[i][j]).css("background-color","black");
          $(tablaDulces[i+1][j]).css("background-color","black");
          $(tablaDulces[i+2][j]).css("background-color","black");
          // $(tablaDulces[i][j]).addClass("animacion");
          // $(tablaDulces[i+1][j]).addClass("animacion");
          // $(tablaDulces[i+2][j]).addClass("animacion");
        }
      }else {
        igualdadesEcontradas = true;
      }
      //Comparar filas por trios
      if (j+2 <tablaDulces.length) {
        if (tablaDulces[i][j].src === tablaDulces[i][(j+1)].src && tablaDulces[i][(j+1)].src === tablaDulces[i][(j+2)].src) {
          igualdades.push(tablaDulces[i][j]);
          igualdades.push(tablaDulces[i][j+1]);
          igualdades.push(tablaDulces[i][j+2]);
          $(tablaDulces[i][j]).css("background-color","black");
          $(tablaDulces[i][j+1]).css("background-color","black");
          $(tablaDulces[i][j+2]).css("background-color","black");
          // $(tablaDulces[i][j]).addClass("animacion");
          // $(tablaDulces[i][j+1]).addClass("animacion");
          // $(tablaDulces[i][j+2]).addClass("animacion");
        }
      }else {
        comparacionFilasTermino = true
      }

      if (i === 6 && j === 6 && comparacionFilasTermino && igualdadesEcontradas) {
        console.log("comparación finalizo");
        //animacion();
        comparacionFilasTermino = false;
        igualdadesEcontradas = false;
        console.log(igualdades, "igualdades");
        //filtroIgualdades();

        if (igualdades.length > 3) {
          //igualdadesEcontradas = true
          console.log(igualdadesEcontradas, "igualdad encontrada")
        }else {
          //igualdadesEcontradas = false
          console.log(igualdadesEcontradas, "igualdad NO encontrada");
        }
      }
    }
  }
}

filtroIgualdades = function () {
/*
necesitamos que si hay elementos iguales sean elimnados y nos deje los elemntos puros
para esto el aplicamos el sigueinte algortimo
si la posición es diferente ya que comparamos la primera posicion contra todas las siguientes
si algun elemento de las siguientes posiciones el igual lo borramos, seria algo asi:
si i != j estas son las posiciones y si el arreglo en la posicion i == al arreglo en la posicion j
resumen si el valor del arreglo es igual al valor del arreglo en diferentes posisiones.
*/if (igualdades.length > 2) {
  for (var i = 0; i < igualdades.length; i++) {
    for (var j = 0; j < igualdades.length - 1; j++) {
      if (i !== j) {
        if (igualdades[i].id === igualdades[j].id) {
          console.log(igualdades[i].id);
          igualdades.splice(j, 1);
        }
        if (i === igualdades.length - 1 && j === igualdades.length - 2) {
          console.log(igualdades, "igualdades filtradas");
          //animacion();
        }
      }
    }
  }
} else {
  for (var i = 0; i < igualdades.length; i++) {
    igualdades.splice(i, 1)
  }
}


}

animar = function () {
  if (igualdades.length > 0) {
    for (var i = 0; i < igualdades.length; i++) {
      for (var j = 0; j < 7; j++) {
        for (var k = 0; k < 7; k++) {
          if (tablaDulces[j][k] === igualdades[i]) {
              $(tablaDulces[j][k]).addClass("animacion");
          }
          if (j === 6 && k === 6 && i === igualdades.length - 1) {
            comparativoFilas = false;
            comparativoColumnas = false;
            //console.log(comparativoFilas);
            //console.log(comparativoColumnas);
            //var eliminar = setTimeout(function(){ eliminarIguales() }, 2100);
          }
        }
      }
    }
    console.log("animacion");
  }
}

 eliminarIguales = function () {
  console.log("eliminarIguales");
  $(".flex-start").removeClass("flex-start");
  $(".animacion").remove()
  for (var i = 0; i < igualdades.length; i++) {
    for (var j = 0; j < 7; j++) {
      for (var k = 0; k < 7; k++) {

        if (tablaDulces[j][k] === igualdades[i]) {
            //columnas = $(".col-"+(i+1))
            //columnas.removeClass("flex-start")
            //filtroigualdades.push("hola")
            // $(tablaDulces[j][k]).remove();
            tablaDulces[j][k] = "";
            //aplicar un slice
        }

        if (i === igualdades.length - 1 && j === 6 && k === 6) {
          //ordenar();
          for (var i = 0; i <= igualdades.length+1; i++) {
            igualdades = new Array();
            if (i === igualdades.length ) {
              console.log(igualdades, "eliminar iguales");
            }
          }
        }
      }
    }
  }
}

 ordenar = function () {
  var temp = 0
  console.log("ordenar")
  for (var k = 0; k < 7; k++) {
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        if (k === 5 && i === 5 && j === 6) {
        console.log(tablaDulces, "estado final");
        puntaje()
        //rellenar()
        }
        var actual = tablaDulces[i][j]
        var siguiente = tablaDulces[i+1][j]
        if (actual != "" && siguiente === "") {
          temp = tablaDulces[i][j]
          tablaDulces[i][j] = tablaDulces[i+1][j]
          tablaDulces[i+1][j] =  temp
          //console.log("coincidencia")
        }
      }
    }
  }
}

 puntaje = function () {
  console.log("puntaje");
  nuevosDulces = new Array();
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
      if (tablaDulces[i][j] === "") {
        score = score + 1;
      }
      if (i === 6 && j === 6) {
        $("#score-text").html(score)
      }
    }
  }
}

 rellenar = function () {
  console.log("rellenar");
  for (var i = 6; 0 <= i; i--) {
    for (var j = 6; 0 <= j; j--) {
      var columnas = $(".col-"+(j+1))
      if (tablaDulces[i][j]  === "") {
        tablaDulces[i][j] = new Dulce();
        columnas.prepend(tablaDulces[i][j])
        //tablaDulces[i][j].id = "["+i+"]"+"["+j+"]"
      }
      if (i === 6 && j === 6) {
        //compararFilas();
        //compararColumnas();
        //addId();
        console.log(tablaDulces, "relleno");
      }
    }
  }
}

 addId = function () {
  console.log("addId")
  for (var i = 0; i <= 6; i++) {
    for (var j = 0; j <= 6; j++) {
      $(tablaDulces[i][j]).attr("id", "hola"+i+""+""+j+"")
      $(tablaDulces[i][j]).attr("row", i)
      $(tablaDulces[i][j]).attr("col", j)
    }
  }
}
  console.log(tablaDulces, "tablaDulces")
  //Sconsole.log(tablaDulces.length)
  //console.log(igualdades, "igualdades")
  //console.log(filtroigualdades)
}

Timer = function (tiempo) {
    unidadMinutos = tiempo - reductorDeMinutos;
    unidadSegundos--
    //si cuenta regresiva de 60 segundos han terminado vuelve el conteo a 59 segundos
    if (unidadSegundos === -1 && decenaSegundos == 0) {
      reductorDeMinutos ++
      unidadSegundos = 9;
      decenaSegundos = 5;

      if (unidadMinutos === 0) {

      }
    }
    //si la unidad de segundos termina su cuenta regresiva la decena de segundos disminuye
    if (unidadSegundos === -1) {
      unidadSegundos = 9;
      decenaSegundos--
    }
    if (unidadMinutos === 0 && decenaSegundos === 0 && unidadSegundos === 0) {
      clearInterval(temporizador)
      reductorDeMinutos = 0;
      console.log("timeout")
    }

    $("#timer").html(decenaMinutos+""+unidadMinutos+":"+decenaSegundos+""+unidadSegundos)
}


$(".btn-reinicio").on("click", function () {
  $(this).html("Reiniciar")
  temporizador = setInterval(function () {new Timer(2)}, 1000)
  var tablero = new Tablero();
  renderizar()
})

$(".prueba").on("click", function () {
  // var d = new Dulce
  // dAnimation = $(d)
  // dAnimation.addClass("flex-start");
  // $(".col-1").prepend(dAnimation.animate({top: "250px"}, "slow"))
  // var random = parseInt(Math.random()*4+1)
  // tablaDulces[0][0].src="image/"+random+".png"
  // console.log(tablaDulces);
})



/*
//casilla
cDulce=function () {
  var casilla = $(document).html('<div></div>');
  var random = parseInt(Math.random()*4+1);
  var imagen = "image/"random+'.png';
  $(casilla).addClass('elemento');
  $(casilla).attr('src',imagen)
  console.log(casilla);
  return $(casilla);
}

//dulce=new Cdulce;

matriz=function () {
/*  var columna=$('div[class^="col"]')
  var dulce= Cdulce();

  for (var i = 0; i < columna.length; i++) {
    for (var j = 0; j < 7; j++) {
      columna[i].append(dulce);
  }
console.log(columna);*/

/*var columnas = new Array();
var filas = new Array();
var numeroDeColumnas = $('div[class^="col"]')
for (var i = 0; i < numeroDeColumnas.length; i++) {
  columnas.push([])
}
for (var i = 0; i < numeroDeColumnas.length; i++) {
  for (var j = 0; j < numeroDeColumnas.length; j++) {
    columnas[i][j] = cDulce()
  }
}
console.log(columnas);

renderizar=function (){
  for (var i = 0; i < numeroDeColumnas.length; i++) {
    numeroDeColumnas[i].append(columnas);
  }
}
renderizar();

//}
}

//clase dulce


//eventos
$(".buttons").click(function(){

})



   // jQuery methods go here...*/

});
