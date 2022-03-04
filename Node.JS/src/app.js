const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
   res.send('You keep using that word. I do not think it means what you think it means.');
});

//create an order endpoint
app.post('/create',(req,res)=>{
	var newOrder = req.body;
	//var newOrderJSON = JSON.parse(newOrder);
	var fileName = '.\\Node.JS\\data\\orders.json';
	var rawData = fs.readFileSync(fileName);
	var list = JSON.parse(rawData); 
	list.push(newOrder);
	
	var toReturn = JSON.stringify(list);
	fs.writeFile(fileName, toReturn, (err) => {
		if(err){
			res.status(500).send({
				message:"Could not save data. "+err 
			});
			return;
		}
	});
	
	res.send('created');
});

//list all orders by customer endpoint
app.get('/list',(req,res) =>{
	var fileName = '.\\Node.JS\\data\\orders.json';
	var rawData = fs.readFileSync(fileName);
	var list = JSON.parse(rawData);
	var jsonAsArray = Object.keys(list).map(function(key) {
		return list[key];
	}).sort(function (itemA,itemB){
		return itemA.firstName>itemB.firstName;
	});
	res.send(jsonAsArray)
});

//TODO: update order endpoint
app.post('/update',(req,res) =>{
	var id = req.query.id;
	var key = req.query.key;
	var val = req.query.val;
	
	var fileName = '.\\Node.JS\\data\\orders.json';
	var rawData = fs.readFileSync(fileName);
	var list = JSON.parse(rawData);
	
	for(var order in list){
		if(id == list[order].id){
			if(key == "firstName"){
				list[order].firstName = val;
			}
			if(key == "product"){
				list[order].product = val;
			}
			if(key == "price"){
				list[order].price = val;
			}
			if(key == "payment"){
				list[order].payment = val;
			}
			break;
		}
	}
	
	var toReturn = JSON.stringify(list);
	fs.writeFile(fileName, toReturn, (err) => {
		if(err){
			res.status(500).send({
				message:"Could not save data. "+err 
			});
			return;
		}
	});
	
	res.send('updated')
});

//TODO: cancel order endpoint
app.delete('/cancel',(req,res)=>{
	var id = req.query.id;
	
	var fileName = '.\\Node.JS\\data\\orders.json';
	var rawData = fs.readFileSync(fileName);
	var list = JSON.parse(rawData);

	
	for(var order in list){
		if(id == list[order].id){
			list.splice(order,1);//  list[order];
			break;
		}
	}
	
	
	var toReturn = JSON.stringify(list);
	fs.writeFile(fileName, toReturn, (err) => {
		if(err){
			res.status(500).send({
				message:"Could not save data. "+err 
			});
			return;
		}
	});
	
	res.send('deleted')
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;