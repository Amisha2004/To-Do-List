const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');

const date = require(__dirname + "/date.js");

const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true})); //to enable use of body parser
app.use(express.static("public"));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/SignUpuserDB");
    mongoose.createConnection("mongodb://127.0.0.1:27017/todolistDB");
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
 app.post("/list", function(req,res)
 {

    let itemName = req.body.newItem;
    const listName = req.body.list;
     const item= new Item({
        name: itemName
     })
     if(listName=="Today"){
     item.save();
     res.redirect("/list");
     }
 });
 app.post("/delete",async(req,res) => {
        const checkedItem= req.body.checkbox;
        // console.log(checkedItem);
        const listName= req.body.ListName;
        if(listName=="Today"){
            try {
                const deletedItem= await Item.findByIdAndRemove(checkedItem);
                // console.log(deletedItem.name);
                res.redirect("/list");
              } catch (err) {
                console.log(err);
             }
        }
 });

 //passing data to webpage
 app.get("/list",function(req,res)
 {
    Item.find({}).then(function(FoundItems){
        
        if(FoundItems.length==0){
              Item.insertMany(defaultItem).then(function () {
                 console.log("Successfully saved defult items to DB");
               }).catch(function (err) {
            console.log(err);
        });
          res.redirect("/list");
        }
        else{
            res.render("list", {listTitle: "Today", newListItems: FoundItems,  email: req.session.email });
        }
      })
       .catch(function(err){
        console.log(err);
    })
 });
//  app.get("/list", (req, res) => {
//   res.render("list", { email: req.session.email });
// });
 /***************************************************************** */
 var validateEmail = function(email) 
  {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  };

  var signUpuserSchema = new mongoose.Schema({
    email: 
    {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: 
    {
      type: String,
      minlength: 6,
    }
   
  });

  const Signupuser = mongoose.model('signups', signUpuserSchema);

  const person1 = new Signupuser
  ({
    email: "amisha2004@gmail.com",
    password: "Amisha2004",
  });

  // person1.save();
 /**************************************************************** */
 app.get("/",(req,res)=>{
  const email = req.session.email;
  res.render("home", { email: email });
 });
 app.get("/note", (req, res) => {
    res.render("note", { email: req.session.email });
});
app.get("/newpage", (req, res) => {
    res.render("list", { email: req.session.email });
});
app.get("/game", (req, res) => {
  res.render("game", { email: req.session.email });
});
app.get("/tictactoe", (req, res) => {
  res.render("tictactoe", { email: req.session.email });
});
app.get("/chess", (req, res) => {
  res.render("chess", { email: req.session.email });
});
app.get("/login", (req, res) => {
  res.render("login", { email: req.session.email });
});

app.get("/signUp", (req, res) => {
  res.render("signUp", { email: req.session.email });
});

app.get("/forgot", (req, res) => {
  res.render("forgotpage", { email: req.session.email });
});
app.post("/header", (req, res) => {
  const homeInput = req.body.homeInput;

  if (homeInput === "1") {
    res.redirect("/");
  } else if (homeInput === "2") {
    res.redirect("/list");
  } else if (homeInput === "3") {
    res.redirect("/note");
  } else if (homeInput === "4") {
    res.redirect("/game");
  }
  else if(homeInput=="6"){
    req.session.destroy();
    res.redirect("/login");
  }
  else{
    res.redirect("/login")
  }
});
app.post("/home",(req,res)=>{
    res.redirect("/home")
});
app.post("/newpage", (req, res) => {
    const inputName = req.body.game;
    if (inputName === "A") {
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
/******************************************************************************* */
app.post("/signUp", function(req,res)
{
    // console.log(req.body);
    const emailName = req.body.email_uname;
    const passwordName = req.body.psw;
    const confirmpasswordName= req.body.confirmpsw;
    if (passwordName != confirmpasswordName) {
      return res.render('signUp', { email: req.session.email, error: 'Password not matched' });
    }    
     const user = new Signupuser({
        email: emailName,
        password: passwordName,
     })

     user.save().then(() => {
       console.log("User saved Successfully!")
    })
    .catch((error) => {
      console.log("Error saving user:", error);
    });
     res.redirect("/");
});
app.post('/login', (req, res) => {
  const emailName = req.body.email_uname;
  const passwordName = req.body.psw;

  Signupuser.findOne({ email: emailName })
    .then((user) => {
      if (user) {
        if (user.password === passwordName) {
          // User found and password matched, proceed with login
          req.session.email = user.email; // Set email property in session
          res.redirect("/");
        } else {
          // Invalid password
          res.render('login', {email: req.session.email ,error: 'Invalid password' });
        }
      } else {
        // User not found
        res.render('login', {email: req.session.email, error: 'User not found' });
      }
    })
    .catch((error) => {
      // Error occurred during the query
      res.render('login', { email: req.session.email, error: 'An error occurred' });
    });
});

/******************************************************************************* */
 app.listen(3000, function()
 {
    console.log("Server is running on port 3000");
 });
 }
