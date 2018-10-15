$(document).ready(function(){

var tablaDulces;
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
var movements = 0;
var comparativoFilas = false;
var comparativoColumnas =  false;
var igualdadesEcontradas = false;
var targetId = null;
var xs;
var ys;
var xd;
var yd;
var vecino;
var comparacionFilasTermino = false;
var pruebaigualdades = new Array();
var stop = true;
var dragPermision = true;

Dulce = function () {
  imagen = document.createElement("img");
  var random = parseInt(Math.random()*4+1);
  $(imagen).attr("src","image/"+random+".png");
  $(imagen).addClass("elemento");
  $(imagen).addClass("ui-draggable");
  $(imagen).addClass("ui-draggable-handle");
  $(imagen).addClass("ui-droppable");

  return imagen
}


Tablero = function () {
  iniciar = function (first, second) {
    first();
    second();
  }

  crearListaDulces = function () {
    for (var i = 0; i < 7; i++) {
      tablaDulces.push(new Array());
      for (var j = 0; j < 7; j++) {
        if (i===6 && j ===6) {
          console.log("lista creada")
        }
        var dulce = new Dulce();
            columnas = $(".col-"+(i+1));
            tablaDulces[i][j] = dulce;
            tablaDulces[i][j].id = "hola"+i+""+""+j+"";
            tablaDulces[i][j].setAttribute("row", i);
            tablaDulces[i][j].setAttribute("col", j);
            columnas.addClass("flex-start");
            $(tablaDulces[i][j]).addClass("ui-draggable");
            $(tablaDulces[i][j]).addClass("ui-draggable-handle");
            $(tablaDulces[i][j]).addClass("ui-droppable");
      }
    }
    console.log("crear lista dulces")
    console.log(tablaDulces, "lista creada");
  }

renderizar = function () {
   console.log("renderizar")
   var tempo = setInterval(function () {
     i = i+1;
     if (i<8) {

       for (var j = 0; j < 7; j++) {
         columnas = $(".col-"+(j+1))
         columnas.append(tablaDulces[i-1][j])
         //console.log(tablaDulces[i-1][j]);
       }
     } else {
       compararColumnas()
       clearInterval(tempo);
     }
   }, 250)
 }


//Agregar a los eventos drag and drop sus propiedades y metodos.
addEvents = function () {
    $("img").draggable({
       start:function (e) {
         this.row = e.target.attributes.row.nodeValue
         this.col = e.target.attributes.col.nodeValue
         xs = e.clientX
         ys = e.clientY
         console.log(this.row, this.col);
       },
      drag: function (e, ui) {
         xd = e.clientX;
         yd = e.clientY;
         posicion = e.target.getBoundingClientRect();
         posicionX = parseInt(e.target.attributes[2].value);
         posicionYAdelante = parseInt(e.target.attributes[3].value)+1;
       },
       containment: ".panel-tablero",
       grid: [100, 100],
       zIndex: 100,
       revert: "valid",
       revertDuration:300,
       drag: constrainCandyMovement
    });

  //Remover los eventos
  removeEvent = function () {
    console.log("remover evento");
    for (var i = 0; i < 2; i++) {
      $("img").draggable("disable");
    }
  }

  //Agregar los eventos
  enableEvents = function () {
    console.log("agregar evento");
    $("img").draggable("enable");
  }


  $(".elemento").droppable({
    drop: function (e, ui) {
      console.log("evento drop");
      origen = tablaDulces[parseInt(ui.helper[0].row)][parseInt(ui.helper[0].col)]
      destino = tablaDulces[e.target.attributes.row.value][e.target.attributes.col.value]
      console.log(origen, "origen");
      console.log(destino, "destino");
      //console.log(e, "evento drop");
      // var temp = tablaDulces[parseInt(ui.helper[0].row)][parseInt(ui.helper[0].col)]
      // //origen = destino
      // tablaDulces[parseInt(ui.helper[0].row)][parseInt(ui.helper[0].col)] = tablaDulces[e.target.attributes.row.value][e.target.attributes.col.value], "destino"
      // // destino =  origen osea al temp
      // tablaDulces[e.target.attributes.row.value][e.target.attributes.col.value] = temp
      // Se relizar el el intercambio y luego se compara par encontrar igualdades en caso de no haberlo se revierte este intercambio
      drop = true
      movements++
      intercambiar();
      compararColumnas(true);
      $("#movimientos-text").html(movements)
      console.log(tablaDulces, "drop de tabla dulces");
    }
  })
}

constrainCandyMovement = function (event, candyDrag) {
  candyDrag.position.left = Math.min(500, candyDrag.position.left);
  candyDrag.position.top = Math.min(500, candyDrag.position.top);
  candyDrag.position.right = Math.min(500, candyDrag.position.right);
  candyDrag.position.bottom = Math.min(500, candyDrag.position.bottom);
}

//Comparo si hay 2 o mas igualdades en una fila o columna, luego las selecciona par aposteriormente aplicar la animacion y elimnarlas.
compararColumnas = function (drop) {
  addEvents();
  removeEvent();
  if (stop) {
  console.log("comparar");
  console.log(drop, "comparacion con drop");
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
        }
      }else {
        comparacionFilasTermino = true
      }



      if (i === 6 && j === 6 && comparacionFilasTermino && igualdadesEcontradas) {

        if (igualdades.length < 3) {
          if (drop === true) {
            revertirIntercambio();
          }
        }

        console.log("comparación finalizo");
        comparacionFilasTermino = false;
        igualdadesEcontradas = false;
        console.log(igualdades, "igualdades");
        animar();

          if (igualdades.length > 3) {

            removeEvent();
            console.log(igualdadesEcontradas, "igualdad encontrada");
          }else if(igualdades.length < 3) {

            enableEvents();
            console.log(igualdadesEcontradas, "igualdad NO encontrada");
          }

        }
      }
    }
  }
}

intercambiar = function () {
  console.log("intercambio");
  var srcOrigen = $(origen).attr("src");
  var srcDestino = $(destino).attr("src");
  $(origen).attr("src", srcDestino);
  $(destino).attr("src", srcOrigen);
  console.log($(origen).attr("src"), "src origen intercambio");
  console.log($(destino).attr("src"), "src destino intercambio");
}

revertirIntercambio = function () {
    console.log("revertido");
    var srcOrigen = $(origen).attr("src");
    var srcDestino = $(destino).attr("src");
    $(origen).attr("src", srcDestino)
    $(destino).attr("src", srcOrigen)
    console.log($(origen).attr("src"), "src origen revertido");
    console.log($(destino).attr("src"), "src destino revertido");
    addId();

}

//filtroIgualdades = function (n) {
/*
necesitamos que si hay elementos iguales sean eliminados y nos deje los elemntos puros
para esto el aplicamos el sigueinte algortimo
si la posición es diferente ya que comparamos la primera posicion contra todas las siguientes
si algun elemento de las siguientes posiciones el igual lo borramos, seria algo asi:
si i != j estas son las posiciones y si el arreglo en la posicion i == al arreglo en la posicion j
resumen si el valor del arreglo es igual al valor del arreglo en diferentes posisiones.
*/
/*if (igualdades.length > 2) {
  for (var i = 0; i < igualdades.length; i++) {
    for (var j = 0; j < igualdades.length - 2; j++) {
      if (i !== j) {
        if (igualdades[i].id === igualdades[j].id) {
          console.log(igualdades[i].id);
          igualdades.splice(j, 1);
        }
        if (i === igualdades.length - 1 && j === igualdades.length - 2) {
          console.log(igualdades, "igualdades filtradas");
        }
      }
    }
  }
} else {
  for (var i = 0; i < igualdades.length; i++) {
    igualdades.splice(i, 1)
  }
}

  if (n===1) {
    animar()
  }
}*/


//Generar animaciòn para los dulces que presentan igualdades
animar = function () {
  if (igualdades.length > 0) {
    removeEvent()
    for (var i = 0; i < igualdades.length; i++) {
      for (var j = 0; j < 7; j++) {
        for (var k = 0; k < 7; k++) {
          if (tablaDulces[j][k] === igualdades[i]) {
              $(tablaDulces[j][k]).addClass("animacion");
          }
          if (j === 6 && k === 6 && i === igualdades.length - 1) {
            comparativoFilas = false;
            comparativoColumnas = false;
            // Se crea una secuencia de callback para que las funciones se ejecuten en sincronia
            var eliminar = setTimeout(function(){ callback(eliminarIguales, ordenar, rellenar, addId, compararColumnas) }, 2100);
          }
        }
      }
    }
    console.log("animacion");
  }
}

//Se procede a remover la clase .flex-start para que los dilces caigan, borrar los dulces con la clase aniamción
//Luego en memoria (arreglo tablaDulces) se le agrega "" a los dulces borrados, como para no borrar el elemento del array sino dearlo vacio
 eliminarIguales = function () {
   if (stop) {
     console.log("eliminarIguales");
     $(".flex-start").removeClass("flex-start");
     $(".animacion").remove()
     for (var i = 0; i < igualdades.length; i++) {
       for (var j = 0; j < 7; j++) {
         for (var k = 0; k < 7; k++) {

           if (tablaDulces[j][k] === igualdades[i]) {
               tablaDulces[j][k] = "";
               //aplicar un slice
           }

           if (i === igualdades.length - 1 && j === 6 && k === 6) {

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
}


//Ordenar en memoria los elementos que estan nulos de acuerdo al orden que se presenta en la interfaz grafica.
 ordenar = function () {
   if (stop) {
     var temp = 0
     console.log("ordenar")
     for (var k = 0; k < 7; k++) {
       for (var i = 0; i < 6; i++) {
         for (var j = 0; j < 7; j++) {
           if (k === 5 && i === 5 && j === 6) {
           console.log(tablaDulces, "estado final");
           puntaje()
           }
           var actual = tablaDulces[i][j]
           var siguiente = tablaDulces[i+1][j]
           if (actual != "" && siguiente === "") {
             temp = tablaDulces[i][j]
             tablaDulces[i][j] = tablaDulces[i+1][j]
             tablaDulces[i+1][j] =  temp
           }
         }
       }
     }
   }
}

// El carllback se usa para secuenciar de forma ordenada las funciones que se necesita ejecutar segun el orden el juego.
callback = function (firstStep, second, thirth, fourth, fifth) {
  firstStep();
  second();
  thirth();
  fourth();
  fifth();
}

// el puntaje se marca de acuerdo al número de dulces que se van eliminando en pantalla.
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


// Esta función nos sirve para que los objetos ingresar nuevos dulces en lso objetos nulos en memoria y renderizar en pantalla.
 rellenar = function () {
   if (stop) {
     console.log("rellenar");
     for (var i = 6; 0 <= i; i--) {
       for (var j = 6; 0 <= j; j--) {
         var columnas = $(".col-"+(j+1))
         if (tablaDulces[i][j]  === "") {
           tablaDulces[i][j] = new Dulce();
           columnas.prepend(tablaDulces[i][j])
         }
         if (i === 6 && j === 6) {
           //addId();
           //compararColumnas();
           console.log(tablaDulces, "rellenar");
         }
       }
     }
   }
}

//Al borrar los dulces en interfaz y memoria estos se desordenan y pierden su posición por esta razon se les agregar de nuevo el ID
//para que no pierdan su posición y orden.
 addId = function () {
   if (stop) {
     console.log("addId")
     for (var i = 0; i <= 6; i++) {
       for (var j = 0; j <= 6; j++) {
         $(tablaDulces[i][j]).attr("id", "hola"+i+""+""+j+"")
         $(tablaDulces[i][j]).attr("row", i)
         $(tablaDulces[i][j]).attr("col", j)
       }
     }
   }
}
}


// El timer se usa para medir el tiempo y cuando este termine poder terminar la partida.
Timer = function (tiempo) {

  temporizador = setInterval(function () {
    unidadSegundos--

      if (unidadSegundos === -1) {
        unidadSegundos = 9;
        decenaSegundos--;
        if (decenaSegundos === -1) {
          reductorDeMinutos++;
          decenaSegundos = 5;
          unidadMinutos = tiempo - reductorDeMinutos;
        }
      }

      if (unidadMinutos === 0 && decenaSegundos === 0 && unidadSegundos === 0) {
        clearInterval(temporizador);
        //variable que se encarga de parar la secuencia de funcionamiento.
        stop = false;
        $('div.panel-tablero, div.time').effect('fold');
        $('h1.main-titulo').addClass('title-over').text('Gracias por jugar!');
        $('div.score, div.moves, div.panel-score').width('100%');
        console.log("timeout");
      }

      $("#timer").html(decenaMinutos+""+unidadMinutos+":"+decenaSegundos+""+unidadSegundos)

  }, 1000)
}

// Boton de evento para inicio y reinicio del juego.
  $(".btn-reinicio").on("click", function () {
    if ($(this).text() === 'Reiniciar') {
      //location.reload(true);
      console.log("reiniciar");
      stop = false;
      clearInterval(temporizador);
      tablaDulces = new Array();
      console.log(tablaDulces, "tabla reiniciada");
      crearListaDulces();
      $(".elemento").remove();
      (function () {
        console.log("auto");
        for (var i = 0; i < tablaDulces.length; i++) {
          for (var j = 0; j < tablaDulces.length; j++) {
            $(".col-"+(j+1)).addClass("flex-start")
            $(".col-"+(j+1)).append(tablaDulces[i][j])
            if (i===tablaDulces.length-1 && j === tablaDulces.length-1) {
              stop = true;
            }
          }
        }
      })()
      compararColumnas();
      reductorDeMinutos = 0;
      decenaSegundos = 0;
      unidadSegundos = 0;
      unidadMinutos = 0;
      movements = 0;
      score = 0;
      $('h1.main-titulo').addClass('title-over').text('Match Game');
      //console.log("borrar pantalla");
      $("#movimientos-text").html(movements);
      $("#score-text").html(score);
      $(".panel-tablero").show();
      $(".time").show();
      $('div.panel-score').width('25%');
      $('div.score, div.moves').width('100%');
      var Crono = new Timer(2);
    }else{
     stop = true;
     tablaDulces = new Array();
     var Cronometro = new Timer(2);
     var tablero = new Tablero();
     crearListaDulces();
     renderizar();
     $(this).html("Reiniciar");
    }
  })
});
