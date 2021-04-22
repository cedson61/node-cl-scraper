// In renderer process (web page).
const { ipcRenderer } = require('electron')

var loadingText = document.getElementById('loadingText');
var searchGoing = false;
//generate table on page

function generateTable(data){

	//delete any previously exisitg table

	try {
  		document.getElementById("allListings").remove()
	}
	catch(err) {
  		
	}

	


	//this code is probably terrible but it works sorry!

	var x = document.createElement("TABLE");
  	x.setAttribute("id", "allListings");
  	document.body.appendChild(x);
  	console.log(data.length);

  	for (index = 0; index < data.length; index += 1){
  		var y = document.createElement("TR");
  		y.setAttribute("id", "listingRow" + index);
  		document.getElementById("allListings").appendChild(y);

  		console.log(data[index].title);
  		console.log(data[index].url);
  		console.log(data[index].price);
  		console.log(data[index].image_urls);

  		var titleCell = document.createElement("TD");
      titleCell.classList.add("title-cell");
  		var urlCell = document.createElement("TD");
      urlCell.classList.add("url-cell");
      urlCell.setAttribute("href", data[index].url);


  		var priceCell = document.createElement("TD");
      priceCell.classList.add("price-cell");
  		var imageCell = document.createElement("TD");
      imageCell.classList.add("image-cell");




      var image = document.createElement("IMG");
      image.setAttribute("src", data[index].image_urls[0]);
      image.setAttribute("class", "listing-image");

      var image1 = document.createElement("IMG");
      image1.setAttribute("src", data[index].image_urls[1]);
      image1.setAttribute("class", "listing-image");

      var image2 = document.createElement("IMG");
      image2.setAttribute("src", data[index].image_urls[2]);
      image2.setAttribute("class", "listing-image");




  		var titleText = document.createTextNode(data[index].title);
  		var urlText = document.createTextNode(data[index].url);
  		var priceText = document.createTextNode(data[index].price);
  		

  		titleCell.appendChild(titleText);
  		urlCell.appendChild(urlText);
  		priceCell.appendChild(priceText);
  		imageCell.appendChild(image);
      imageCell.appendChild(image1);
      imageCell.appendChild(image2);

  		document.getElementById("listingRow" + index).appendChild(titleCell);
  		document.getElementById("listingRow" + index).appendChild(urlCell);
  		document.getElementById("listingRow" + index).appendChild(priceCell);
  		document.getElementById("listingRow" + index).appendChild(imageCell);
  		

  	}

  	


}





ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log("recieved listings from backend...");
  loadingText.innerHTML = "";
  console.log(arg);
  generateTable(arg);
  searchGoing = false;
  
  
})



var beginCrawl = document.getElementById('initiate'); 



beginCrawl.addEventListener('click', (event) => {

  if(!searchGoing){
      searchGoing = true;
      loadingText.innerHTML += "loading... maybe go grab a coffee";
      var queryurlfield = document.getElementById("queryurlfield").value;
      console.log("button clicked...");
      ipcRenderer.send('asynchronous-message', queryurlfield);
  }
    



});







