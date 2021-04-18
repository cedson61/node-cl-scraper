// In renderer process (web page).
const { ipcRenderer } = require('electron')


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
  		var urlCell = document.createElement("TD");
  		var priceCell = document.createElement("TD");
  		var imageCell = document.createElement("TD");

  		var titleText = document.createTextNode(data[index].title);
  		var urlText = document.createTextNode(data[index].url);
  		var priceText = document.createTextNode(data[index].price);
  		var imageText = document.createTextNode(data[index].image_urls[0]);

  		titleCell.appendChild(titleText);
  		urlCell.appendChild(urlText);
  		priceCell.appendChild(priceText);
  		imageCell.appendChild(imageText);

  		document.getElementById("listingRow" + index).appendChild(titleCell);
  		document.getElementById("listingRow" + index).appendChild(urlCell);
  		document.getElementById("listingRow" + index).appendChild(priceCell);
  		document.getElementById("listingRow" + index).appendChild(imageCell);
  		

  	}

  	


}





ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log("recieved listings from backend...");
  console.log(arg);
  generateTable(arg);
  
  
})



var beginCrawl = document.getElementById('initiate'); 

beginCrawl.addEventListener('click', (event) => {
    var queryurlfield = document.getElementById("queryurlfield").value;
    console.log("button clicked...");
    ipcRenderer.send('asynchronous-message', queryurlfield);

});







