const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true})); //to enable use of body parser
app.use(express.static("public"));
main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
    const itemsSchema = new mongoose.Schema({
        name: {
          type: String,
          required: [true, "Please check your data entry, no name specified"]
        }
      });
      
      const Item = mongoose.model('Items', itemsSchema);
      
      const item1 = new Item({
           name: "Drink Water"
       });
       const item2 = new Item({
        name: "Eat Food"
    });
    const item3 = new Item({
        name: "Read"
    });
    const defaultItem = [item1, item2, item3];
    const listSchema = {
        name: String,
        items: [itemsSchema]
    };
    const List = mongoose.model("List", listSchema);
 //getting data from webpage
 app.post("/", function(req,res)
 {

    let itemName = req.body.newItem;
    const listName = req.body.list;
     const item= new Item({
        name: itemName
     })
     if(listName=="Today"){
     item.save();
     res.redirect("/");
     }
     else{
        List.findOne({name: listName}).then(function(Foundlist){
            Foundlist.items.push(item);
            Foundlist.save();
            res.redirect("/"+ listName);
        })
        .catch(function(err){
         console.log(err);
     });

     }
 });
 app.post("/delete",async(req,res) => {
        const checkedItem= req.body.checkbox;
        const listName= req.body.ListName;
        if(listName=="Today"){
            try {
                const deletedItem= await Item.findByIdAndRemove(checkedItem);
                // console.log(deletedItem.name);
                res.redirect("/");
              } catch (err) {
                console.log(err);
             }
        }
        // else{
        //     console.log("It's not a homePage");
        //     console.log(listName);
        //     await List.findOneAndUpdate(
        //         { name: listName },
        //         { $pull: { items: {_id: checkedItem} } });
        //     res.redirect("/"+listName);
        //     console.log("/"+listName);
        // }
    // console.log(req.body.checkbox);
    // res.redirect("/");
 });

//  app.get("/:customListName",function(req,res){
//     const customListName = req.params.customListName;

//     List.findOne({name: customListName}).then(function(Foundlist){
//          if(!Foundlist){
//              const list = new List({
//                  name: customListName,
//                  items: defaultItem
//             });
//             list.save();
//             res.redirect("/" + customListName);
//          }
//          else{
//             res.render("list", {listTitle: Foundlist.name, newListItems: Foundlist.items});
//          }
//     })
//     .catch(function(err){
//      console.log(err);
//  });
    
//  });
 //passing data to webpage
 app.get("/",function(req,res)
 {
    // let day = date.getDate();
    // res.render("list", {listTitle: day, newListItems: items});
    Item.find({}).then(function(FoundItems){
        
        if(FoundItems.length==0){
            //  const defaultItem = [item1, item2, item3];
              Item.insertMany(defaultItem).then(function () {
                 console.log("Successfully saved defult items to DB");
               }).catch(function (err) {
            console.log(err);
        });
          res.redirect("/");
        }
        else{
            res.render("list", {listTitle: "Today", newListItems: FoundItems});
        }
        // res.render("list", {listTitle: "Today", newListItems: FoundItems});
        // console.log(FoundItems);
    
      })
       .catch(function(err){
        console.log(err);
    })
 });


 app.get("/note", (req, res) => {
    res.render("note");
});
app.get("/newpage", (req, res) => {
    res.render("list");
});
app.get("/game", (req, res) => {
  res.render("game");
});
app.get("/tictactoe", (req, res) => {
  res.render("tictactoe");
});
app.get("/chess", (req, res) => {
  res.render("chess");
});
app.post("/newpage", (req, res) => {
    const inputName = req.body.game;
    if (inputName === "A") {
    //   res.redirect("/");
    //  console.log(inputName);
     res.redirect("/game");
    }
    else if(inputName=="B"){
      res.redirect("/note");
    }
  });
app.post("/note", (req,res)=>{
  res.redirect("/note");
});
app.post("/game", (req,res)=>{
     const gameInput= req.body.gameplay;
     if(gameInput== "chess"){
      res.redirect("/chess");
     }
     else{
      res.redirect("/tictactoe");
     }
});
app.post("/chess", (req,res)=>{
  res.redirect("/chess");
});
app.post("/tictactoe", (req,res)=>{
  res.redirect("/tictactoe");
});
 app.listen(3000, function()
 {
    console.log("Server is running on port 3000");
 });
 }
