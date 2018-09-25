$(document).ready(function(){ //when documento is ready

  $('form').on('submit', function(){

      var item = $('form input'); //equal import field 
      var todo = {item: item.val()}; //equal object
//request post(add item) will be controlled by ajax
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){ //trigger by success
          //do something with the data via front-end framework
          console.log('addicionado');
          location.reload(); //refresh the page, the data add will appear on the page
        }
      });

      return false;

  });
//request delete will be controlled by ajax
  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");//replace space to -
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});