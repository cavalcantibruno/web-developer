const campos = [
    $("#data"),
    $('#quantidade'),
    $('#valor'),
]

const tbody = $("table tbody")

function novaLinha() {
    const linha = $("<tr>");
    const tdVolume = $("<td>").text(campos[1].val() * campos[2].val())
        
    campos.forEach(function(campo) {
        const td = $("<td>").text(campo.val());
        linha.append(td);    
    });

    linha.append(tdVolume);
    tbody.append(linha);

    campos[0].val('');
    campos[1].val(1);
    campos[2].val(0);
    campos[0].focus();
}

$(".form").on("submit", function(event) {
    event.preventDefault();  
    novaLinha()

    
})


/*
var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function(event) {

    event.preventDefault();

    var tr = document.createElement('tr');

    campos.forEach(function(campo) {

        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
  
      });
    
      

    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;

    tr.appendChild(tdVolume);

    tbody.appendChild(tr);

    
    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    campos[0].focus();

  });
  */