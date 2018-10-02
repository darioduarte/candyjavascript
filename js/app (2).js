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
var rellenar = 0;

Dulce = function () {
  imagen = document.createElement("img");
  var random = parseInt(Math.random()*4+1);
  $(imagen).attr("src","image/"+random+".png");
  $(imagen).addClass("elemento");
  return imagen
}

Tablero = function () {

  crearListaDulces = function () {

    for (var i = 0; i < 7; i++) {
      tablaDulces.push(new Array());
      for (var j = 0; j < 7; j++) {
        var dulce = new Dulce();
            columnas = $(".col-"+(i+1))
            tablaDulces[i][j] = dulce;
            //tablaDulces[i][j].id = "["+i+"]"+"["+j+"]"
            //columnas.attr("style","justify-content: flex-start")
            //columnas.prepend(tablaDulces[i][j]);
            columnas.addClass("flex-start")
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
       compararFilas();
       compararColumnas();
       animacion();
       clearInterval(temporizador)
     }
   }, 250)
 }


 compararColumnas = function () {
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 8; j++) {

        if ($(tablaDulces[i][j]).attr("src")===$(tablaDulces[i][(j+1)]).attr("src")) {
          if ($(tablaDulces[i][(j+1)]).attr("src")===$(tablaDulces[i][(j+2)]).attr("src")) {
              $(tablaDulces[i][j]).css("background-color","black");
              $(tablaDulces[i][j+1]).css("background-color","black");
              $(tablaDulces[i][j+2]).css("background-color","black");
              igualdades.push(tablaDulces[i][j])
              igualdades.push(tablaDulces[i][j+1])
              igualdades.push(tablaDulces[i][j+2])
          }
        }
      }
    }
    console.log("comparar columnas");
  }

  //compararColumnas();

// compararFilas y columnas nos ayudan a encontrar las coincidencias de los dulces en sentido horizontal y vertical
  compararFilas = function () {
    console.log("compararFilas");
   for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {

        var filaActual = tablaDulces[i][j].src
        var filaSiguiente = tablaDulces[(i+1)][j].src
        var filaPosterior = tablaDulces[(i+2)][j].src

           if (filaActual===filaSiguiente) {
              if (filaSiguiente===filaPosterior) {
                  $(tablaDulces[i][j]).css("background-color","black");
                  $(tablaDulces[(i+1)][j]).css("background-color","black");
                  $(tablaDulces[(i+2)][j]).css("background-color","black");
                  igualdades.push(tablaDulces[i][j])
                  igualdades.push(tablaDulces[(i+1)][j])
                  igualdades.push(tablaDulces[(i+2)][j])
            }
          }
      }
    }
    console.log("compararColumnas")
  }

//compararFilas();

animacion = function () {
  for (var i = 0; i < igualdades.length; i++) {
    if (i === igualdades.length - 1) {
      var eliminar = setTimeout(function(){ eliminarIguales(); }, 2100);
    }
    for (var j = 0; j < 7; j++) {
      for (var k = 0; k < 7; k++) {
        if (tablaDulces[j][k] === igualdades[i]) {
            $(tablaDulces[j][k]).addClass("animacion");
            //console.log(tablaDulces[i][j].length)
        }
      }
    }
  }
  console.log("animacion");
}


var eliminarIguales = function () {
  console.log("eliminarIguales");
  $(".flex-start").removeClass("flex-start")
  for (var i = 0; i < igualdades.length; i++) {
    for (var j = 0; j < 7; j++) {
      for (var k = 0; k < 7; k++) {
        if (i === igualdades.length - 1 && j === 6 && k === 6) {
          ordenar();
        }
        if (tablaDulces[j][k] === igualdades[i]) {
            columnas = $(".col-"+(i+1))
            //columnas.removeClass("flex-start")
            //filtroigualdades.push("hola")
            $(tablaDulces[j][k]).detach();
            tablaDulces[j][k] = ""
        }
      }
    }
  }
}

var ordenar = function () {
  var temp = 0
  console.log("ordenar")
  for (var k = 0; k < 7; k++) {
    for (var i = 0; i < 6; i++) {
      if (i === 5) {
        console.log(tablaDulces, "ordenados");
        rellenarVacios();
      }
      for (var j = 0; j < 7; j++) {
        var actual = tablaDulces[i][j]
        var siguiente = tablaDulces[i+1][j]
        if (actual != "" && siguiente === "") {
          temp = tablaDulces[i][j]
          tablaDulces[i][j] = tablaDulces[i+1][j]
          tablaDulces[i+1][j] =  temp
          console.log("coincidencia")
        }
      }
    }
  }
}

var rellenarVacios = function () {
  console.log("rellenarVacios");
  for (var i = 6; 0 <= i; i--) {
    for (var j = 6; 0 <= j; j--) {
      columnas = $(".col-"+(j+1))
      if (tablaDulces[i][j] === "") {
        tablaDulces[i][j] = new Dulce();
        columnas.prepend(tablaDulces[i][j]);
      }
    }
  }
}
  //console.log(imagen)
  console.log(tablaDulces, "tablaDulces")
  console.log(tablaDulces.length)
  console.log(igualdades, "igualdades")
//  console.log(filtroigualdades)


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
  //rellenar = setInterval(function () {renderizar()}, 300)
  renderizar()
})

$(".prueba").on("click", function () {
  var d = new Dulce
  dAnimation = $(d)
  dAnimation.addClass("flex-start");
  $(".col-1").prepend(dAnimation.animate({top: "250px"}, "slow"))
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
