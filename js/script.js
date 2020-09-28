// L'esercizio di oggi è quello di creare, come fatto in aula, una todo
// list sulla quale sarà possibile svolgere le operazioni di CRUD, usando
// qusta Api: http://157.230.17.132:3016/todos

$(document).ready(function () {

  // FUNZIONI

  // FUNZIONE CHE PRENDE UN ARRAY COME ARGOMENTO E LO STAMPA.
  function renderList(data) {

    // Compilo handlebars.
    var source = $("#list-template").html();
    var template = Handlebars.compile(source);

    // Ciclo l'array e aggiungo le cose da fare alla lista.
    for (var i = 0; i < data.length; i++) {

      var context = {
        "id": data[i].id,
        "text": data[i].text
      };

      var html = template(context);
      $("#to-do-list").append(html);
    }
  }
  // FINE FUNZIONI

  // CODICE

  // Effettuo la chiamata di GET per acquisire la lista.
  $.ajax(
    {
      "url": "http://157.230.17.132:3016/todos",
      "method": "GET",
      "success": function (data) {
        // Passo il data ad una funzione che stampi la lista.
        renderList(data);
      },
      "error": function (err) {
        alert("Errore!");
      }
    }
  );

  // FINE CODICE

  // EVENTI

  // FINE EVENTI




});
