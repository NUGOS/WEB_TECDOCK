$(document).ready(function () {

    //SCRIPT PARA FIJAR LA BARRA AL HACER SCROLL
    var altura = $("#navegacion").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollTop() > altura ){
  			$("#navegacion").addClass('nav-fixed');
  		} else {
  			$("#navegacion").removeClass('nav-fixed');
  		}
  	});

    //SCRIPTS PARA ANIMACIONES DE ANUNCIOS
    var anun1 = $("#anuncio1").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio1").addClass('e-izquierda');
  		} else {
  			$("#anuncio1").removeClass('e-izquierda');
  		}
  	});
    var anun2 = $("#anuncio2").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio2").addClass('e-derecha');
  		} else{
  			$("#anuncio2").removeClass('e-derecha');
  		}
  	});
    var anun3 = $("#anuncio3").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio3").addClass('e-arriba');
  		} else {
  			$("#anuncio3").removeClass('e-arriba');
  		}
  	});
});

$.fn.scrollBottom = function() {
    return this.scrollTop() + this.height();
};

var carro;

function abrir_tienda(){
  document.location.href='tienda.html';
  if (localStorage.getItem("user") == null) {
    alert("No has iniciado Sesión, hazlo para recibir ofertas especiales");
  }
}

function abrir(sig){
  document.location.href=sig;
}

function agregar(id){
    var producto;
    var precio;
    var cantidad;
    var cod;
    var monto;
    var sig;

    switch (id) {
      case "#btn_prod01":
        cod= "#p1";
        producto = "Xiaomi Mi A2";
        precio = 700;
        cantidad = $("#p1").text();
        monto = parseInt(precio)*parseInt(cantidad);
        break;
      case "#btn_prod02":
        cod= "#p2";
        producto = "Xiaomi Mi 8 Se";
        precio = 800;
        cantidad = $("#p2").text();
        monto = parseInt(precio)*parseInt(cantidad);
        break;
      case "#btn_prod03":
        cod= "#p3";
        producto = "Xiaomi Mi 9";
        precio = 2700;
        cantidad = $("#p3").text();
        monto = parseInt(precio)*parseInt(cantidad);
        break;
      case "#btn_prod04":
        cod= "#p4";
        producto = "Redmi Note 7";
        precio = 900;
        cantidad = $("#p4").text();
        monto = parseInt(precio)*parseInt(cantidad);
        break;
      case "#btn_prod05":
        cod= "#p5";
        producto = "Redmi Note 6 Pro";
        precio = 700;
        cantidad = $("#p5").text();
        monto = parseInt(precio)*parseInt(cantidad);
        break;
      case "#btn_prod06":
        cod= "#p6";
        producto = "Xiaomi Mi A2 Lite";
        precio = 500;
        cantidad = $("#p6").text();
        monto = parseInt(precio)*parseInt(cantidad);
        break;
    }

    // Mostrar en consola
    console.log("Producto: ", producto);
    console.log("Precio: ", precio);
    guardarItem(cod,producto,cantidad, precio, monto);
    $(id).attr("disabled", true);
}

function guardarItem(cod,producto,cantidad,precio,monto)
{
    // Verificar si nuestra variable datos no existe
    if (localStorage.getItem("datos") == null)
    {
        var arrayFila       = [1,cod, producto,cantidad,precio,monto];
        var arrayTabla      = [arrayFila];
        carro               = arrayTabla;
        var arrayTablaJSON  = JSON.stringify(arrayTabla);
        localStorage.setItem("datos", arrayTablaJSON);
    }
    else
    {
        var arrayTabla = JSON.parse(localStorage.getItem("datos"));
        var posicion = 0;
        for(var i=0; i<arrayTabla.length; i++)
        {
            posicion = i + 1;
            arrayTabla[i][0] = posicion;
        }

        // Insertar a arrayTabla
        var arrayFilaInsertar = [posicion+1, cod, producto,cantidad,precio,monto];
        arrayTabla.push(arrayFilaInsertar);

        carro = arrayTabla;

        // Convertir arrayTabla a JSOn(cadena) y guardar en LocalStorage
        localStorage.setItem("datos", JSON.stringify(arrayTabla));
    }
}

function eliminar(id)
{
    if(localStorage.getItem("datos") != null)
    {
        var arrayTabla = JSON.parse(localStorage.getItem("datos"));
        for(var i = 0; i<arrayTabla.length; i++)
        {
            if(arrayTabla[i][0] == id)
            {
              valBtn(arrayTabla[i][2]);
              arrayTabla.splice(i, 1);
            }
        }
        carro = arrayTabla;
        localStorage.setItem("datos", JSON.stringify(arrayTabla));
        listar();
        montoTotal();
    }
}

function cantidad(s,id){
      var cont = parseInt($(id).text());
      if(s==0 && cont>1){
        cont=cont-1;
      }
      if(s==1){
        cont=cont+1;
      }
      $(id).text(cont);
      actualizar(id,cont);
      listar();
}

function btnAll(){
  for(var i=1;i<7;i++){
    var cod = "#btn_prod0"+i;
    var cod2 = "#p"+i;
    $(cod2).text("1");
    $(cod).attr("disabled", false);
  }
}

function valBtn(producto){
  switch (producto) {
    case "Xiaomi Mi A2":
      $("#btn_prod01").attr("disabled", false);
      break;
    case "Xiaomi Mi 8 Se":
      $("#btn_prod02").attr("disabled", false);
      break;
    case "Xiaomi Mi 9":
      $("#btn_prod03").attr("disabled", false);
      break;
    case "Redmi Note 7":
      $("#btn_prod04").attr("disabled", false);
      break;
    case "Redmi Note 6 Pro":
      $("#btn_prod05").attr("disabled", false);
      break;
    case "Xiaomi Mi A2 Lite":
      $("#btn_prod06").attr("disabled", false);
      break;
  }
}
