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

  // FUNZIONE CHE PRENDE UN OGGETTO COME ARGOMENTO E LO STAMPA.
  function renderElement(data) {

    // Compilo handlebars, il context e aggiungo alla lista.
    var source = $("#list-template").html();
    var template = Handlebars.compile(source);

    var context = {
      "id": data.id,
      "text": data.text
    };

    var html = template(context);
    $("#to-do-list").append(html);
  }

  // FINE FUNZIONI

  // CODICE

  // Effettuo la chiamata di GET per acquisire la lista.
  $.ajax(
    {
      "url": "http://157.230.17.132:3016/todos",
      "method": "GET",
      "success": function (data) {
        console.log(data);
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

  // 1. Al click sul bottone, parte una chiamata POST che aggiunge la cosa
  //    da fare scritta nell'input al server e alla lista stampata.
  $("#to-do-button").click(
    function () {

      var elemento = $("#to-do-input").val();
      // Pulisco il campo.
      $("#to-do-input").val("");

      if (elemento != "") {

        $.ajax(
          {
            "url": "http://157.230.17.132:3016/todos",
            "method": "POST",
            "data": {
              "text": elemento
            },
            "success": function (data) {
              // Passo il data ad una funzione che stampa l'elemento.
              renderElement(data);
            },
            "error": function (err) {
              alert("Errore!");
            }
          }
        );
      }
    }
  );

  // 2. Al click sulla X rossa, viene effettuata una chiamata DELETE che
  //    elimina l'elemento dal server e dalla lista.
  $("#to-do-list").on("click", ".delete",
    function () {

        var id = $(this).parent("li").attr("id");
        var elemento = $(this).parent("li");

        $.ajax(
          {
            "url": "http://157.230.17.132:3016/todos/" + id,
            "method": "DELETE",
            "success": function (data) {
              elemento.remove();
            },
            "error": function (err) {
              alert("Errore!");
            }
          }
        );

    }
  );

  // 3. Al click sul bottone, parte una chiamata PATCH che modifica l'elemento
  //    sul server e sulla lista.
  $("#to-do-list").on("click", ".modify-button",
    function () {

        var value = $(this).siblings(".modify-input").val();
        $(this).siblings(".modify-input").val("");

        if (value != "") {

          var id = $(this).parent("li").attr("id");
          var elemento = $(this).siblings(".text");

          $.ajax(
            {
              "url": "http://157.230.17.132:3016/todos/" + id,
              "method": "PATCH",
              "data": {
                "text": value
              },
              "success": function (data) {

                elemento.text(data.text);
              },
              "error": function (err) {
                alert("Errore!");
              }
            }
          );
        }

    }
  );

  $("#to-do-list").on("click", ".edit",
    function () {

      $(this).siblings(".modify-input, .modify-button").toggle();
    }
  );
  // FINE EVENTI




});
