 //initialize
 
 $(document).ready(function() {
    initialSetup();
  });
//hide result if not search
  function initialSetup(){
      $('#pokeprofile').hide();
      $('#error-msg').hide();
      $('#letter-msg').hide();
      // $('#tv').hide();
      // $('#movie').hide();
      // $('#game').hide();
      
  };
//enable enter key  
  $("#search").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#ready").click();
    }
});
//Capitalize first letter
function jsUcfirst(value) 
{
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}
//get random pokemon
$("#randpoke").click(function() {
  console.log("clicked!");
  randId = Math.floor(Math.random() * (807)) + 1;
  console.log("randomID",randId);
  useApi(String(randId));

});
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
    $('#error-msg').hide();
    $('#letter-msg').hide();
    console.log("input",input);
    console.log("checking letters", /^[a-zA-Z]+$/.test(input));
    if(/^[a-zA-Z]+$/.test(input)){
      useApi(input);
    }
    else {
      console.log("not letters!");
      $('#letter-msg').show();
    }
    
  }
  // scroll down to search result animation
  scrollingElement = (document.scrollingElement || document.body)
  function scrollSmoothToBottom () {
    $(scrollingElement).animate({
     scrollTop: $("#pokename").offset().top
      }, 300);
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
    $("#poketype").empty();
    var statsarray;
    var listone=[];
    var pokeid = 1;
    var listtwo = [];
    var listType = [];
    var listAblt = [];
     //sends request
     requests.send();
      
    //requests.setRequestHeader('Content-Type','application/json');
    // requests.onload = function(){
    //   if(request.status == 200){

    //   }
    // }

    requests.onload = function(e){
      console.log("yes")
      //Check return type and content
      if(requests.readyState === 4 ){
          console.log("4")
        if(requests.status === 200){
          console.log("request.responseText",requests.responseText);
         
          //parse the results
          var response = JSON.parse(requests.responseText);
          console.log("stats", response.stats);
          pokeid = response.id;
          console.log("response id",response.id)
          moves = response.moves[0];
          //var listtwo = []
          // console.log(len(response.moves));
          console.log("first move",moves.move.name);
          for (var i=0;i<5;i++){
            listtwo.push(response.moves[i].move.name);
          }
          if (pokeid < 10) {
              var newpokeid = "00".concat(pokeid);
            }
            else if (pokeid < 100){
                var newpokeid = "0".concat(pokeid);
          }
          else {
            var newpokeid = pokeid;
          }
          //get picture
          var name = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/".concat(newpokeid,".png");
          console.log("name",name);
          $('#aloha').attr('src',name);
         
          //get type
          // console.log("types",response.types);
          typeTotal = response.types.length;
          typeArray = response.types;
          for (var i=0;i<typeTotal;i++){
            listType.push(jsUcfirst(typeArray[i].type.name));
            console.log("types name",listType[i]);
          }
          //get ability
          // console.log("ability",response.abilities[1].ability.name)
          // console.log("ability length",response.abilities.length)
          abltTotal = response.abilities.length;
          for (var i=0;i<abltTotal;i++){
            listAblt.push(jsUcfirst(response.abilities[i].ability.name));
          }
          // get stats
          statsarray = response.stats;
          //Append stats to a list
          for (var i=0;i<6;i++) {
            listone.push(statsarray[i].base_stat);
          }
          //Write HTML for Pokemon name
          // document.getElementById("pokename").innerHTML = jsUcfirst(item.toLowerCase());
          document.getElementById("pokename").innerHTML = jsUcfirst(response.forms[0].name);
          //Write the HTML for types
          // document.getElementById("poketype").innerHTML = listType.join(' ');
          for (var i=0;i<typeTotal;i++){
            $('#poketype').append('<p class="poketype">'+listType[i]+'</p>');
          }
          //Write the HTML for abilities
          for (var i=0;i<abltTotal;i++){
            $('#pokeablt').append('<p class="pokeablt">'+listAblt[i]+'</p>');
          }

           //write the HTML for moves
           for(var i=0;i<5;i++){
            newid = "move".concat(i);
            document.getElementById(newid).innerHTML = jsUcfirst(listtwo[i]);
          }
          // document.getElementById(newid).innerHTML = jsUcfirst(listtwo[i]);

          //write the stats data to HTML 
          console.log("stats title", jsUcfirst(item.toLowerCase()))
          document.getElementById("pokestats").innerHTML = "Stats for "+ jsUcfirst(response.forms[0].name);
          // $('#pokestats').text = (jsUcfirst(item.toLowerCase()));
          // document.getElementById("pokestats").innerHTML="Here are the stats for "+jsUcfirst(item.toLowerCase());
          document.getElementById("stat1").innerHTML=statsarray[0].base_stat;
          document.getElementById("stat2").innerHTML=statsarray[1].base_stat;
          document.getElementById("stat3").innerHTML=statsarray[2].base_stat;
          document.getElementById("stat4").innerHTML=statsarray[3].base_stat;
          document.getElementById("stat5").innerHTML=statsarray[4].base_stat;
          document.getElementById("stat6").innerHTML=statsarray[5].base_stat;
          
          $('#pokeprofile').show();
          scrollSmoothToBottom();
          //Write the HTML structure for displaying stats
          // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats1.png' class='img1', alt='Speed icon'></div><h5 class='card-title text-muted'> Speed</h5><p class='card-text stats color1' id='speed1'>container[0]</p></div></div>"); 
          // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats2.png' class='img1', alt='Special_Defense_icon'></div><h5 class='card-title text-muted'> Special Defense</h5><p class='card-text stats color2' id='speed2'>container[1]</p></div></div>"); 
          // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats3.png' class='img1', alt='Special_Attack_icon'></div><h5 class='card-title text-muted'> Special Attack</h5><p class='card-text stats color3' id='speed3'>container[2]</p></div></div>"); 
          // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats4.png' class='img1', alt='Defense_icon'></div><h5 class='card-title text-muted'> Defense</h5><p class='card-text stats color4' id='speed4'>container[3]</p></div></div>"); 
          // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats5.png' class='img1', alt='Attack_icon'></div><h5 class='card-title text-muted'> Attack</h5><p class='card-text stats color5' id='speed5'>container[4]</p></div></div>"); 
          // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card margin'><div><img src='images/stats6.png' class='img1', alt='Hp_icon'></div><h5 class='card-title text-muted'> Hp</h5><p class='card-text stats color6' id='speed6'>container[5]</p></div></div>"); 
              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball' ><h3 class='card-title'> Speed</h3><p class='card-text' id='speed2'>container[1]</p></div></div>"); 



              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed3'>Details of this attribute</p></div></div>"); 

              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed4'>Details of this attribute</p></div></div>"); 

              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed5'>Details of this attribute</p></div></div>"); 

              // $('#search-container').append("<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='card'><img src='images/shield.png' class='card-img-top', alt='Pokeball'><h3 class='card-title'> Speed</h3><p class='card-text' id='speed6'>Details of this attribute</p></div></div>"); 
         
          
              
              
         
              // document.getElementById("pokemonname").innerHTML="Here are the stats for "+item.toLowerCase();
              
          // console.log(statsarray[0]);
          // console.log(statsarray[0].base_stat);
        }
        else {
          console.log("No such result");
          $('#error-msg').show();

        }
      }
    
    }
    
    requests.onerror=function(e){
      console.error("onerror runs now",requests.statusText);
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
       
   

  }



