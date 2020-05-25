let tempoInicial = $("#tempo-digitacao").text();
let campo = $(".campo-digitacao");

$(
    function() {

        atualizaTamanhoFrase();
        inicializaContadores();
        inicializaConometro();
        inicializaMarcador();

        $("#reiniciar").click(reiniciaJogo);
        
        atualizaPlacar();

        $("#usuarios").selectize({
            create: true,
            sortField: 'text'
        });

        $(".tooltip").tooltipster({
            trigger: "custom"
        });
    }
);

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo)
}

function atualizaTamanhoFrase() {
    let frase = $(".frase").text();
    let numPalavra = frase.split(" ").length;
    
    let tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavra);
       
}

function inicializaContadores() {
    campo.on("input",function(){
        var conteudo = campo.val();
    
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $(".contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $(".contador-caracteres").text(qtdCaracteres);

        
    
    });  
}


function inicializaConometro() {
    campo.one("focus",function(){
        let tempoRestante = $("#tempo-digitacao").text();
        const conometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
    
            if (tempoRestante < 1) {
                clearInterval(conometroID);
                finalizaJogo();
            }
            
        },1000);
    }); 
}

function finalizaJogo() {

    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();

}

function inicializaMarcador() {
    campo.on("input",function(){
        let frase = $(".frase").text();
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
    
        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });   
}



function reiniciaJogo() {
    $("#reiniciar").click(function(){
        campo.attr("disabled", false);
        campo.val("");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaConometro();
        campo.toggleClass("campo-desativado");
        campo.removeClass("borda-vermelha");
        campo.removeClass("borda-verde");       
    
    });   
}



//habilitar o node para receber requisições de outro servidor 

  /*
  Abra o arquivo express.js dentro da pasta alura-typer-servidor-cors/servidor/config.
  */

/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000, http://192.168.0.83:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/

