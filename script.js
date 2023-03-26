//Codigo para que no cambie la pagina cuando se envia el formulario
window.addEventListener("load", function() {
  const form = document.getElementById('my-form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    document.getElementById("recibido").innerHTML = "¡Un momento, se está cargando tu confirmación!"
    document.getElementById('enviar').disabled = true;
    document.getElementById('code').disabled = true;
    document.getElementById('Json').disabled = true;
    document.getElementById('asistencia').disabled = true;
    document.getElementById('acompanantes').disabled = true;
    document.getElementById('mensajenovios').disabled = true;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
          document.getElementById("recibido").innerHTML = "¡Gracias, hemos recibido tu confirmación!"
          document.getElementById('enviar').disabled = false;
          document.getElementById('code').disabled = false;
          document.getElementById('Json').disabled = false;
          document.getElementById('asistencia').disabled = false;
          document.getElementById('acompanantes').disabled = false;
          document.getElementById('mensajenovios').disabled = false;
    })
  });
});

//Codigo para que se abra el Json
function OpenJson(){
//    https://christianmier.github.io/JyC/
//http://localhost:63342/Wedding/
    fetch("https://christianmier.github.io/JyC/invitados.json")
        .then((response) => response.json())
        .then((json) => readJason(json));
}

//Este codigo se abre con el OpenJson y es para buscar el codigo
function readJason(json){
    document.getElementById("recibido").innerHTML = ""
    var index = -1;
    var val = document.getElementById("code").value //aqui va el id del input (codigo)
    var filteredObj = json.find(function(item, i){
      if(item.codigo === val){
        index = i;
        return i;
      }
    });
    if(index>-1){
        document.getElementById("saludo").innerHTML = "¡Hola " + json[index].nombre + ", por favor confirma tu asistencia!"//aqui va el id del texto que se va a poner
        document.getElementById('assistance').style.display = 'block';
        document.getElementById("Name").value = json[index].nombre;
    //    crear la lista plegable:
        var min = 2;
        window.max = json[index].acompanantes;
        var select = document.getElementById('acompanantes');
    //     Removes the previous list so it is not appended
        for (var i=2; i<select.length;) {
            select.remove(i);
        }
        document.getElementById('acompanantes').value="header"; //Regresa acompanantes al emcabezado al introducir nuevo codigo
        document.getElementById('asistencia').value="header"; //Regresa acompanantes al emcabezado al introducir nuevo codigo
        document.getElementById('enviar').disabled = true; //desabilita el boton de enviar al introducir nuevo codigo

        // agrega mas opciones a la lista despegable si es que tiene mas de 1 invitacion
        if(max > 1){
            for (var i = min; i<=max; i++){
                var opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = i;
                select.appendChild(opt);
                }
            document.getElementById('acompanantes').style.visibility="visible";
        }
        else {
//            document.getElementById('acompanantes').style.visibility="visible";
            document.getElementById('acompanantes').style.visibility="hidden";
            document.getElementById('acompanantes').value=1;
        }
    }
    else{
        document.getElementById("saludo").innerHTML = "!Código incorrecto¡"
    }
}

function AssistanceActivate(){
//es patra que no se active el boton si es que no se ha activado los acmponantes

    if(document.getElementById('acompanantes').value != "header"){
        document.getElementById('enviar').disabled = false;
        }
//        Si no va asistir que no se muestre el menu de asistencias y se ative el boton de enviar
    if(document.getElementById('asistencia').value == "No"){
        document.getElementById('acompanantes').style.visibility="hidden";
        document.getElementById('enviar').disabled = false;
        document.getElementById('acompanantes').value = "header";
    }
    else if (document.getElementById('asistencia').value == "Si")
        if(window.max > 1){
            document.getElementById('acompanantes').style.visibility="visible";
            document.getElementById('acompanantes').value = "header";
        }
        else if (window.max = 1){
            document.getElementById('acompanantes').value=1;
    }
}

function AcompanantesActivate(){
    if(document.getElementById('asistencia').value != "header"){
        document.getElementById('enviar').disabled = false;
    }
}
//Cursos de javascript https://www.w3schools.com/js/js_comments.asp
