Matriz2D = function() {

    var matriz = [];

    for (var i=0; i<7; i++) {
        matriz.push([]);
    }

    this.agregar = function(pElemento, pFila, pColumna) {
        matriz[pFila][pColumna] = pElemento;
    };

    this.getMatriz = function() {
        return matriz;
    };
};

Dulce = function() {

    var imagen = null;
    var tipo = parseInt(Math.random() * 4) + 1;

    this.getTipo = function() {
        return tipo;
    };

    this.getImagen = function() {
        if (imagen === null) {
            imagen = document.createElement("div");
            $(imagen).css("background-image", "url(image/" + tipo + ".png)");
            $(imagen).addClass("elemento");
        }
        return $(imagen);
    };

};

Tablero = function() {

    var matriz2d = new Matriz2D();
  
    this.getColumnaUIPosicion = function(pPosicion) {
        return $(".col-" + pPosicion);
    };

    this.iniciarJuego = function() {

        for (var i=0; i<7; i++) {
            for (var j=0; j<7; j++) {
                var nDulce = new Dulce();
                matriz2d.agregar(nDulce, i, j);
            }


        }

        this.renderizar();

    };

    this.renderizar = function() {
        for (var i=0; i<7; i++) {
            var colUI = this.getColumnaUIPosicion(i + 1);
            for (var j=0; j<7; j++) {
                var dulce = matriz2d.getMatriz()[i][j];
                colUI.append(dulce.getImagen());
            }
        }
    };

    this.validar = function() {
        setInterval(this.simular, 50);

    };

    var fila = 0;
    var columna = 0;
    var acumulador = 0;

    this.simular = function() {
        var e = matriz2d.getMatriz()[columna][fila];

        if (columna < 6) {
            columna ++;
            e.getImagen().css("background-color", "#f00");
        } else {
            columna = 0;
            fila = (fila < 6) ? fila += 1 : 6;
        }


    };


};

var tablero = new Tablero();
tablero.iniciarJuego();
