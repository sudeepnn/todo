const express=require("express")
const mongoose=require("mongoose")
const body=require("body-parser")

const app=express()
app.use(body.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static("public"))


mongoose.connect("mongodb+srv://sudeep:test123@cluster0.luggjbt.mongodb.net/todolistdb",{useNewUrlParser:true})

//mongoose.Schema
const todoschema= new mongoose.Schema({task:String})

//mongoose.Model
const todomodle=mongoose.model("task",todoschema)

const t1=new todomodle({task:"gaming"})
// t1.save()

// const t2=new todomodle({task:"study"})
// const t3=new todomodle({task:"music"})

// t2.save()
// t3.save()

app.get("/",function(req,res){
    todomodle.find().then((result) => {
        res.render('index',{tasks:result})
    }).catch((err) => {
        console.log(err)
    });
})

app.post("/",function(req,res){
var todotask=req.body.task
const task=new todomodle({task:todotask})
task.save()
res.redirect("/")
})

app.post("/delete",function(req,res){
    var item=req.body.checkbox
    todomodle.deleteOne({_id:item}).then((result) => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    });

})

app.listen(3000,function(){
    console.log("server is up and running")
})