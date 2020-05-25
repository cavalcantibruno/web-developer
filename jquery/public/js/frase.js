$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
$("#botao-sync").click(sincronizaPlacar);

function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle(); 
        }, 2000);
    })
    .always(function(){ 
        $("#spinner").toggle();
    });    
}


function trocaFraseAleatoria(data) {
    const frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    
    frase.text(data[numeroAleatorio].texto); 

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {

    var fraseId = $("#frase-id").val();
    var dados = {id : fraseId}; //criacao do objeto JS que guarda a id

    $.get("http://localhost:3000/frases", dados, trocaFrase)

    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    })
    .always(function(){
        $("#spinner").toggle();
    });
    
}

function trocaFrase(data) {

    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

