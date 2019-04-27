 //initialize
 
 $(document).ready(function() {
    initialSetup();
  });
//hide result if not search
  function initialSetup(){
      $('#para3').hide();
      // $('#tv').hide();
      // $('#movie').hide();
      // $('#game').hide();
      
  };

//Scroll to top button
$(window).on('scroll',function () {
  if($(window).scrollTop()>100) {
      $("#toTop").fadeIn();
  } else {
      $("#toTop").fadeOut();
  }
});
$("#toTop").on('click',function(event) {
    $("html, body").animate({ scrollTop: 0 }, 300);
    return false;
});

//Scroll to TV section
$("#btnTV").click(function() {
  $([document.documentElement, document.body]).animate({
      scrollTop: $("#tv").offset().top
  }, 300);
});
// $('#btnTV').on('click', function(event) {
//   $('#tv').show();
//   $('#movie').hide();
//   $('#game').hide();
  
// });

//Scroll to Movie section
$("#btnMovie").click(function() {
  $([document.documentElement, document.body]).animate({
      scrollTop: $("#movie").offset().top
  }, 300);
});
// $('#btnMovie').on('click', function(event) {
//   $('#movie').show();
//   $('#tv').hide();
//   $('#game').hide();
// });

//Scroll to Game section
$("#btnGame").click(function() {
  $([document.documentElement, document.body]).animate({
      scrollTop: $("#game").offset().top
  }, 300);
});
// $('#btnGame').on('click', function(event) {
//   $('#game').show();
//   $('#tv').hide();
//   $('#movie').hide();
// });


//get seartch input
  function getpokename(){
   // $('#ready').addClass("disabled");
    var input = document.getElementById("search").value;
    useApi(input);
  }
  // scroll down animation
  scrollingElement = (document.scrollingElement || document.body)
  function scrollSmoothToBottom () {
    $(scrollingElement).animate({
     scrollTop: document.body.scrollHeight
        }, 600);
     }

  //call Pokemon Api for Pokemon stats
  function useApi(item){
    var requests = new XMLHttpRequest();
    var address = "https://pokeapi.co/api/v2/pokemon/";
    var requestaddress = address.concat(item.toLowerCase());
    //console.log(requestaddress);
    console.log(requestaddress);
    //using GET method
    requests.open('GET',requestaddress);
    requests.send();
    var statsarray;
    var listone=[];
    //requests.setRequestHeader('Content-Type','application/json');
    requests.onload = function(e){
      console.log("yes")
      //Check return type and content
      if(requests.readyState === 4 ){
          //console.log("4")
        if(requests.status === 200){
          console.log(requests.responseText);
          //parse the results
          var response = JSON.parse(requests.responseText);
          console.log(response.stats);
          statsarray = response.stats;
          //Append stats to a list
          for (var i=0;i<6;i++) {
            listone.push(statsarray[i].base_stat);
          }
          //Write the HTML structure for displaying stats
          $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats1.png' class='img1', alt='Speed icon'></div><h5 class='card-title text-muted'> Speed</h5><p class='card-text stats color1' id='speed1'>container[0]</p></div></div>"); 
          $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats2.png' class='img1', alt='Special_Defense_icon'></div><h5 class='card-title text-muted'> Special Defense</h5><p class='card-text stats color2' id='speed2'>container[1]</p></div></div>"); 
          $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats3.png' class='img1', alt='Special_Attack_icon'></div><h5 class='card-title text-muted'> Special Attack</h5><p class='card-text stats color3' id='speed3'>container[2]</p></div></div>"); 
          $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats4.png' class='img1', alt='Defense_icon'></div><h5 class='card-title text-muted'> Defense</h5><p class='card-text stats color4' id='speed4'>container[3]</p></div></div>"); 
          $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats5.png' class='img1', alt='Attack_icon'></div><h5 class='card-title text-muted'> Attack</h5><p class='card-text stats color5' id='speed5'>container[4]</p></div></div>"); 
          $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats6.png' class='img1', alt='Hp_icon'></div><h5 class='card-title text-muted'> Hp</h5><p class='card-text stats color6' id='speed6'>container[5]</p></div></div>"); 
              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball' ><h3 class='card-title'> Speed</h3><p class='card-text' id='speed2'>container[1]</p></div></div>"); 



              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed3'>Details of this attribute</p></div></div>"); 

              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed4'>Details of this attribute</p></div></div>"); 

              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed5'>Details of this attribute</p></div></div>"); 

              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed6'>Details of this attribute</p></div></div>"); 
          //write the stats data to HTML 
              document.getElementById("speed1").innerHTML=statsarray[0].base_stat;
              document.getElementById("speed2").innerHTML=statsarray[1].base_stat;
              document.getElementById("speed3").innerHTML=statsarray[2].base_stat;
              document.getElementById("speed4").innerHTML=statsarray[3].base_stat;
              document.getElementById("speed5").innerHTML=statsarray[4].base_stat;
            document.getElementById("speed6").innerHTML=statsarray[5].base_stat;
            document.getElementById("pokemonname").innerHTML="Here are the stats for "+item.toLowerCase();
          // console.log(statsarray[0]);
          // console.log(statsarray[0].base_stat);

        }
      }
    }
    requests.onerror=function(e){
      console.error(requests.statusText);
    }
  //   console.log(listone);
  //   writeContent(listone);
  // }

  //display results (DOM manipulation)
  // function writeContent(container){
  //   $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed1'>container[0]</p></div></div>"); 
  //   $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text'>container[1]</p></div></div>"); 
  //   $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text'>Details of this attribute</p></div></div>"); 
  //   $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text'>Details of this attribute</p></div></div>"); 
  //   $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text'>Details of this attribute</p></div></div>"); 
  //   $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text'>Details of this attribute</p></div></div>"); 



    // document.getElementById("speed1").innerHTML=container[0];
        // $('#search-container').append('<div class="container"><div class="row"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12><div class="card"><img src="images/pokeball.png" class="card-img-top", alt="Pokeball"> <h3 class="card-title"> <a href = "http://localhost:5000/getname/items/{{pokes}}">{{pokes}}</a> </h3><p class="card-text">Details of the pokemon:Lorem ipsum dolor sit amet consectetur adipisicing elit</p><button type="button" class="btn btn-primary">View Details</button></div></div></div></div>'); 
    $('#para3').show();
    // $('#para4').show();

  }



