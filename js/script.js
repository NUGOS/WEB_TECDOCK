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

    switch (id) {
      case "#btn_prod01":
        cod= "#p1";
        producto = "Xiaomi Mi A2";
        precio = 700;
        cantidad = $("#p1").text();
        break;
      case "#btn_prod02":
        cod= "#p2";
        producto = "Xiaomi Mi 8 Se";
        precio = 800;
        cantidad = $("#p2").text();
        break;
      case "#btn_prod03":
        cod= "#p3";
        producto = "Xiaomi Mi 9";
        precio = 2700;
        cantidad = $("#p3").text();
        break;
      case "#btn_prod04":
        cod= "#p4";
        producto = "Redmi Note 7";
        precio = 900;
        cantidad = $("#p4").text();
        break;
      case "#btn_prod05":
        cod= "#p5";
        producto = "Redmi Note 6 Pro";
        precio = 700;
        cantidad = $("#p5").text();
        break;
      case "#btn_prod06":
        cod= "#p6";
        producto = "Xiaomi Mi A2 Lite";
        precio = 500;
        cantidad = $("#p6").text();
        break;
    }

    guardarItem(cod,producto, cantidad, precio);
    document.location.href='carrito.html';
}

function guardarItem(cod, producto, cantidad, precio)
{
    // Verificar si nuestra variable datos no existe
    if (localStorage.getItem("grup_3") == null)
    {
        var arrayFila       = [1, cod, producto, cantidad, precio, precio*cantidad];
        var arrayTabla      = [arrayFila];
        carro               = arrayTabla;
        var arrayTablaJSON  = JSON.stringify(arrayTabla);
        localStorage.setItem("grup_3", arrayTablaJSON);
    }
    else
    {
        var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));
        var posicion = 0;
        var existe = false;

        for(var i=0; i<arrayTabla.length; i++)
        {
            posicion = i + 1;
            arrayTabla[i][0] = posicion;
            if (arrayTabla[i][1] == cod){
              existe = true;
              break;
            }
        }


        if(existe){
          arrayTabla[i][3] = parseInt(arrayTabla[i][3]) + parseInt(cantidad);
          arrayTabla[i][5] = arrayTabla[i][4] * arrayTabla[i][3];
        }else{
          var arrayFilaInsertar = [posicion+1, cod, producto, cantidad, precio, precio*cantidad];
          arrayTabla.push(arrayFilaInsertar);
        }
        // Insertar a arrayTabla

        carro = arrayTabla;

        // Convertir arrayTabla a JSOn(cadena) y guardar en LocalStorage
        localStorage.setItem("grup_3", JSON.stringify(arrayTabla));
    }
    listar();
}

function eliminar(id)
{
    if(localStorage.getItem("grup_3") != null)
    {
        var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));
        for(var i = 0; i<arrayTabla.length; i++)
        {
            if(arrayTabla[i][0] == id)
            {
              arrayTabla.splice(i, 1);
            }
        }
        carro = arrayTabla;
        localStorage.setItem("grup_3", JSON.stringify(arrayTabla));
        listar();
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
}

function actualizar(cod,can){
  if(localStorage.getItem("grup_3") != null)
  {
      var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));
      for(var i = 0; i<arrayTabla.length; i++)
      {

          if(arrayTabla[i][1] == cod)
          {
            var arrayFila = arrayTabla[i];
            var precio = parseInt(arrayFila[4]);
            var monto = precio*can;
            arrayFila.splice(3, 1,can);
            arrayFila.splice(5, 1,monto);
            arrayTabla.splice(i,1,arrayFila);

          }
      }
      localStorage.setItem("grup_3", JSON.stringify(arrayTabla));
    }
}

var total=0;

function disminuirProd(cod)
{
  var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));

  for(var i = 0; i<arrayTabla.length; i++)
  {
    if (arrayTabla[i][1] == cod){
      if (arrayTabla[i][3] > 1){
        arrayTabla[i][3] --;
        arrayTabla[i][5] = arrayTabla[i][3] * arrayTabla[i][4];
        break;
      }else{
        eliminar(arrayTabla[i][0]);
        break;
      }
    }
  }

  // Convertir array a JSON(cadena) y guardar en localStorage
  localStorage.setItem("grup_3", JSON.stringify(arrayTabla));

  listar();
}

function listar()
{
    total = 0;
    $("#tblDatos").html("");
    if(localStorage.getItem("grup_3") != null)
    {
        var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));
        for(var i = 0; i<arrayTabla.length; i++)
        {
            // Crear fila
            var fila = "";
            fila += "<tr>";
            fila += "<td>"+arrayTabla[i][0]+"</td>";
            fila += "<td>"+arrayTabla[i][2]+"</td>";
            fila += "<td>s/ "+arrayTabla[i][4]+"</td>";
            fila += "<td>"+arrayTabla[i][3]+"</td>";
            fila += '<td><button class="btn btn-sm btn-danger btn-tb" onclick="disminuirProd('+"'"+arrayTabla[i][1]+"'"+')">-</button>&nbsp';
            fila += '<button class="btn btn-sm btn-info btn-tb" onclick="guardarItem('+"'"+arrayTabla[i][1]+"'"+','+"'"+arrayTabla[i][2]+"'"+', 1,'+"'"+arrayTabla[i][4]+"'"+')">+</button></td>';
            fila += "<td>s/ "+arrayTabla[i][5]+"</td>";
            fila += "<td>"+'<button class="btn btn-sm btn-danger" onclick="eliminar('+arrayTabla[i][0]+')">X</button></td>';
            fila += "</tr>";

            total = parseInt(total) + parseInt(arrayTabla[i][5]);
            $("#tblDatos").append(fila);
        }
    }
    var fila = "";
    fila += "<tr>";
    fila += "<td></td>";
    fila += "<td></td>";
    fila += "<td></td>";
    fila += "<th colspan=2>"+"Total:"+"</th>";
    fila += "<th>s/ "+total+"</th>";
    fila += "<td></td>";
    fila += "</tr>";
    $("#tblDatos").append(fila);
}

function realizarCompra()
{
  if(localStorage.getItem("grup_3") != null)
  {
    var nombre = $("#txtNombre").val();
    var correo = $("#txtCorreo").val();
    var pais = $("#cboPais").val();

    if(nombre == ""){
      alert("Complete su nombre por favor");
      $("#txtNombre").focus();
    }else{
      if(correo == ""){
        alert("Complete su correo por favor");
        $("#txtCorreo").focus();
      }else{
        if(pais == null){
          alert("Selecciones su país por favor");
          $("#cboPais").focus();
        }else{
          guardarCompra(nombre, correo, pais);
        }
      }
    }
  }else{
    alert("NO HA SELECCIONADO NINGÚN PRODUCTO");
  }

}

function guardarCompra(nombre, correo, pais)
{
  var arrayTabla;
  //Verificar si nuestra variable datos no existe
  if(localStorage.getItem("compra") == null)
  {
      var arrayFila = [1, nombre, correo, pais, localStorage.getItem("datos"), total];
      arrayTabla = [arrayFila];
      var arrayTableJSON = JSON.stringify(arrayTabla);
      localStorage.setItem("compra", arrayTableJSON);
  }else
  {
      var arrayTabla = JSON.parse(localStorage.getItem("compra"));

      // Insertar array a tabla
      var arrayFilaInsertar = [(parseInt(arrayTabla.length)+1), nombre, correo, pais, localStorage.getItem("datos"), total];
      arrayTabla.push(arrayFilaInsertar);

      // Convertir array a JSON(cadena) y guardar en localStorage
      localStorage.setItem("compra", JSON.stringify(arrayTabla));
  }

  alert("Su compra ha sido Registrada\n" + nombre + "-" + pais + "\n" + correo + "\nTotal de la compra: " + total);
  limpiar();
}
