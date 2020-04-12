$(function(){
  for (var i in data.songs){
      document.getElementById("content").innerHTML +=
    "<div class='col m4 s12'>"
      + "<a href='" + data.songs[i].url + "' style='text-decoration: none; color:black;'>"
        + "<div class='card'>"
          + "<div class='card-content' style='height:110px;'>"
            + "<p id='cardtext' style='font-size: 18px;'>" + data.songs[i].title + "</p>"
            + "<small style='color:orange; font-size:15px;'>" + data.songs[i].author + "</small>"
          + "</div>"
        + "</div>"
      + "</a>"
    + "</div>";
  }
});

$(function(){
  $(".addFavorites").on("click", function(){
       try {
        $(this).attr('disabled', true);
        
           var propIdToAdd = $(this).closest("body").attr("id");
           
           var myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
           
           if(myFavouriteProp == null) {
               myFavouriteProp = [];
              
           }
           
           if(myFavouriteProp != null) {
               for ( var j = 0; j < myFavouriteProp.length; j++) {
                   
                   if ( propIdToAdd == myFavouriteProp[j]) {
                       
                    swal.fire({
                      icon: 'error',
                      text: 'song already in favorites',
                      width: 350,
                      showConfirmButton: true,
                    });
                       myFavouriteProp = [];
                   }
        
                   
               }
           }
           
          myFavouriteProp.push(propIdToAdd);
            
          localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));         
       }
       
       catch (e) {
           if (e==QUOTA_EXCEEDED_ERR) {
               console.log("Error: Local storage limit exceeds");
           }
           
           else {
               console.log("ERROR: Saving to local storge.");
           }
       }
  });
});

$(function() {

      console.log("Restoring array data from local storage");
		
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		
		var output = "<ul>";
		
		if (myFavouriteProp != null) {
			
			for (var i = 0; i < data.songs.length; i++) {
				for (j = 0; j < myFavouriteProp.length; j++) {
					
					if (data.songs[i].id == myFavouriteProp[j]) {
						
            output+= "<div class='col m4 s12'>"
     + "<a href='" + data.songs[i].url + "' style='text-decoration: none; color:black'>"
        + "<div class='card'>"
          + "<div class='card-content' style='height:100px;'>"
            + "<p id='cardtext' style='font-size:16px;'>" + data.songs[i].title + "</p>"
            + "<small style='color:orange; font-size:13px;'>" + data.songs[i].author + "</small>"
            + "</a>"
            + "<button class='btn-flat removeFavourites'><i class='mdi mdi-cancel'></i></button>"
          + "</div>"
        + "</div>"
    + "</div>";
					}
				}
			}
		}
		output+="</ul>";
		
		document.getElementById("favorites").innerHTML = output;
    

});

$(function() {
	$( ".removeFavourites" ).on("click", function(){
		
			$(this).attr('disabled', true);
			
			var propIdToRemove = $(this).closest("div").attr("id");
			 
			 myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
			
			
			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {
					
					if ( propIdToRemove == myFavouriteProp[j]) {
						
						alert("This Property has been removed");
						
						delete myFavouriteProp[j];
						
						localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
						
						myFavouriteProp[j] = [];
					}
				}
			}
			
			if(myFavouriteProp == null) {
				alert("You have no favourite items");
			}
		});
	});

$(function() {
	$( ".clearFavourites" ).on("click", function(){

    swal.fire({
      title: 'Are you sure?',
      text: "You will clear all your favorites",
      icon: 'warning',
      showCalcelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes delete',
    }).then((result) => {
      if(result.value){
        swal.fire(
          'Deleted',
          'favorites have been deleted',
          'success'
        )

        $("#favorites").remove();

      }
    })
		
		
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		
		localStorage.clear();
		
	});
	
});

//Dialpad logic
function getOutput(){
  return document.getElementById("search").value;
}
function printOutput(num){
  document.getElementById("search").value = num;
}

var number = document.getElementsByClassName("number");
for(var i=0; i<number.length; i++){ 
  number[i].addEventListener('click', function(){
      var output = getOutput();
        output=output+this.id;
        printOutput(output);

        if(output > 332){
        output=output+this.id;
        printOutput(332);
      }
  });
}

var del = document.getElementById("delete");
del.addEventListener('click', function(){
  var output = getOutput();
  output = output.substr(0,output.length-1);
  printOutput(output);
});

var find = document.getElementById("findSong");
find.addEventListener('click', function(){
  var output = getOutput();
  if(output == ""){
    swal.fire({
      icon: 'error',
      text: 'Enter Song number to Search',
      width: 350,
      showConfirmButton: true,
    });
  }else{
    for (var i in data.songs){
      if(output == data.songs[i].number){
        window.open(data.songs[i].url, "_self");
      }
    }
  }
});

//send email
var sendEmail = document.getElementById("sendEmail");
sendEmail.addEventListener('click', function() {
  window.open('mailto:brianowino01@gmail.com?subject=Web App Hymnals v1.0 &body');
});

//about app
var about = document.getElementById("aboutApp");
about.addEventListener('click', function() {
  swal.fire({
    title: '<strong>SDA Hymnals <u>v1.0.0</u> </strong>',
    icon: 'info',
    html: '<p> This is a collection of Seventh Day Adventist Hymns. It is a desire of the developer that everyone who uses this application is blessed and encouraged even as we wait for the second coming of christ. Amen!</p>',
    footer: '<a>Revelation 22:12</a>'
  })
});
 
//dark mode toggle
function switchMode(){
  localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'light' : 'dark'); localStorage.getItem('mode') === 'dark' ? document.querySelector('body').classList.add('dark') : document.querySelector('body').classList.remove('dark')
}
if(localStorage.getItem('mode') === 'dark'){
  document.querySelector('body').classList.add('dark');
  localStorage.getItem('mode') === 'dark';
  console.log("darkmode enabled");
}

//slider image on the sidenav header
$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
  });
});

//calling service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}