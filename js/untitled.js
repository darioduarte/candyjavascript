
var rbh=0;
var rbv=0;
var bnewd=0;
var lencol=["","","","","","",""];
var lenres=["","","","","","",""];
var maximo=0;
var matriz=0;

var intervalo=0;  //variable de tiempo para funcion de desplazamiento
var eliminar=0;   //variable de tiempo para eliminar dulces
var newdulces=0;  //variable de tiempo para nuevos dulces
var tiempo=0;     //variable de tiempo para temporizador

var i=0;
var contador=0;  //contador total
var conc1=0;    //contador columna1

var initialPos;
var espera=0;
var score=0;
var mov=0;

var min=2;
var seg=0;

$(".btn-reinicio").click(function(){
  i=0;
  score=0;
  mov=0;
  $(".panel-score").css("width","25%");
  $(".panel-tablero").show();
  $(".time").show();

  $("#score-text").html("0")
  $("#movimientos-text").html("0")
  $(this).html("REINICIAR")
  clearInterval(intervalo);
  clearInterval(eliminar);
  clearInterval(newdulces);
  clearInterval(tiempo);
  min=2;  //2
  seg=0;  //0
  borrartotal()
  intervalo=setInterval(function(){desplazamiento()},600)
  tiempo=setInterval(function(){timer()},1000)
})
//----------funcion de contador a cero------------------------------------------
function timer()
{
  if(seg!=0)
  {
    seg=seg-1;
  }
  if(seg==0)
  {
    if(min==0)
    {
      clearInterval(eliminar);
      clearInterval(newdulces);
      clearInterval(intervalo);
      clearInterval(tiempo);
      $( ".panel-tablero" ).hide("drop","slow",callback);
      $( ".time" ).hide();
    }
    seg=59;
    min=min-1;
  }
  $("#timer").html("0"+min+":"+seg)
}
//------------------------------------------------------------------------------
function callback()
{
    $( ".panel-score" ).animate({width:'100%'},4000);
}
//----------Funcion de borrado--------------------------------------------------
function borrartotal()
{
  for(var j=1;j<8;j++)
  {
    $(".col-"+j).children("img").detach();
  }
}
//---------------Funcion inicial para llenar el cuadro del juego----------------
function desplazamiento()
{
  i=i+1
  var numero=0;
  var imagen=0;

  $(".elemento").draggable({ disabled: true });
  if(i<8)
  {
    for(var j=1;j<8;j++)
    {
      if($(".col-"+j).children("img:nth-child("+i+")").html()==null)
      {
        console.log($(".col-"+j).children("img:nth-child("+i+")"));
        numero=Math.floor(Math.random() * 4) + 1 ;
        imagen="image/"+numero+".png";
        $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
      }
    }
  }
  if(i==8)
  {
    clearInterval(intervalo);   //desactivar funcion desplazamiento()
    eliminar=setInterval(function(){eliminarhorver()},150)  //activar funcion eliminarhorver
  }
}
//------------------------------------------------------------------------------
//---------------Funcion para eliminar mas de 3 dulces--------------------------
function eliminarhorver()
{
  matriz=0;
  rbh=horizontal()  //funcion busqueda dulces horizontal
  rbv=vertical()    //funcion buscar dulces vertical

  for(var j=1;j<8;j++)
  {
      matriz=matriz+$(".col-"+j).children().length;
  }

  if(rbh==0 && rbv==0 && matriz!=49)  //condicion si no encuentra 3 dulces o mas llamar a funcion para volver a completar el uego
  {
      clearInterval(eliminar);
      bnewd=0;
      newdulces=setInterval(function()
      {
        nuevosdulces()  //Funcion completar nuevos dulces
      },600)
  }
  if(rbh==1 || rbv==1)
  {
    $(".elemento").draggable({ disabled: true });
    $("div[class^='col']").css("justify-content","flex-end")
    $(".activo").hide("pulsate",1000,function(){
      var scoretmp=$(".activo").length;
      $(".activo").remove("img")
      score=score+scoretmp;
      $("#score-text").html(score)  //Cambiar puntuacion
    })
  }

  if(rbh==0 && rbv==0 && matriz==49)
  {
    $(".elemento").draggable({
      disabled: false,
      containment: ".panel-tablero",
      revert: true,
      revertDuration: 0,
      snap: ".elemento",
      snapMode: "inner",
      snapTolerance: 40,
      start: function(event, ui){
        mov=mov+1;
        $("#movimientos-text").html(mov)
      }
    });
  }

  $(".elemento").droppable({
    drop: function (event, ui) {
      var dropped = ui.draggable;
      var droppedOn = this;
      espera=0;
      do{
        espera=dropped.swap($(droppedOn));
      }while(espera==0)
      rbh=horizontal()  //funcion busqueda dulces horizontal
      rbv=vertical()    //funcion buscar dulces vertical
      if(rbh==0 && rbv==0)
      {
        dropped.swap($(droppedOn));
      }
      if(rbh==1 || rbv==1)
      {
        clearInterval(newdulces);
        clearInterval(eliminar);   //desactivar funcion desplazamiento()
        eliminar=setInterval(function(){eliminarhorver()},150)  //activar funcion eliminarhorver
      }
    },
  });
}
//------------------------------------------------------------------------------
