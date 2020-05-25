$("#btnPesquisar").click(function(event){
    event.preventDefault();
    
      $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/emails",
        success: onInserirLinha, 
        error: function(){
            console.log('Erro Requisição');
        },
        complete: function(){
            // $('.load-gif').addClass('js-no')
        }
      })   
      
      let inputProposta = $('.inputProposta').val();
      
      if(inputProposta.length == 0){
        inputProposta = 'NA';
        console.log(inputProposta);
      }
      
      
});

function onInserirLinha(dadosDoServer) {
    
    $('.load-gif').removeClass('js-no')

    dadosDoServer.forEach(contrato => {
      const linha = $('<tr>')
      const colunaCheck = $('<td>').append($('<input>').attr('type', 'checkbox').addClass('js-selecao'))
      const colunaProposta = $('<td>').text(contrato.proposta)
      const colunaCliente = $('<td>').text(contrato.cliente)
      const colunaValor = $('<td>').text(contrato.valor)
      const colunaVencimento = $('<td>').text(contrato.vencimento)
      const colunaEmail = $('<td>').text(contrato.email)

      linha.append(colunaCheck)
      linha.append(colunaProposta)
      linha.append(colunaCliente)
      linha.append(colunaValor)
      linha.append(colunaVencimento)
      linha.append(colunaEmail)

      $('.table tbody').append( linha ); 

      multiSelecao()
    });
}

function multiSelecao() {
    const selecionarTodos = $('.js-selecao-todos')
    const selecionarLinha = $('.js-selecao')

    selecionarTodos.click(function(){
        
        const status = selecionarTodos.prop('checked');
        const rowFilterDisable = selecionarLinha.filter(':disabled');
            
        selecionarLinha.prop('checked', status);
        rowFilterDisable.prop('checked', false);

        MostrarQunatidade()
            
    });
    
    selecionarLinha.click(function(){
    
        let selecaoFilterChecados = selecionarLinha.filter(':checked');
        selecionarTodos.prop('checked', selecaoFilterChecados.length >= selecionarLinha.length);
           
        MostrarQunatidade()    
    });

    function MostrarQunatidade() {
    
        let rowFilterCheck = selecionarLinha.filter(':checked');
        $('#qtdSelecionada').text(rowFilterCheck.length);
    
    } 
    
}

$('#bntEnviar').click(function onEnviarInfo(event){
 
        event.preventDefault();
        const selecionarLinha = $('.js-selecao')
        
        const contrato = {
                cliente: $('.cliente').val(),
                valor: $('.valor').val(),
                vencimento: $('.vencimento').val(),
                email: $('.email').val()
            }

        $.ajax({
            url: 'http://localhost:8080/api/email',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log(data)
            },
            error: function(){
                console.log('Erro Requisição');
            },
            complete: function(){
                // $('.load-gif').addClass('js-no')
                console.log('ok');   
            },                
            data: JSON.stringify(contrato)
        });

        let rowFilterCheck = selecionarLinha.filter(':checked');
        rowFilterCheck.attr('disabled', true);
        rowFilterCheck.prop('checked', false);
        
    })  









