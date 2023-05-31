const express= require('express')
const mongoose= require('mongoose')
const PORT = 1432
const app = express()
app.use(express.json())


const results = new mongoose.Schema ( {
    state:{
    mapped:String
    },
    parties:{
        P1: String,
        P2: String,
        P3: String,
        P4: String
    },
    result:{
       APC: Number,
       PDP: Number,
       LP: Number,
       NNPO: Number
    },
    Collectionofficer:{
        name: String
    },
    isRigged:{
        res: String
    },
    total:{
        totalvt: Number,
        totalLg: Number
    }
})

const user = mongoose.model("election", results)

app.get("/",(req,res) => {
    res.status(200).json("welcome to the 2027 election results")

})

// creating a data

app.post("/createinfo", async(req, res)=>{
    const newData = await new user (req.body);
    newData.save()

    res.status(200).json(newData)
})

// get all datas

app.get("/getallresults", async(req, res) =>{
    const all = await user.find();

    res.status(200).json({
        message: "the available user are" + all.length, data:all
    })
})

// getting one data by id

app.get("/getoneresult/:id", async(req, res) =>{
    const id = req.params.id
    const onecontact = await user.findById(id)
    // console.log(oneuser)

    res.status(200).json({
        message: `the information of user id: ${id}`, 
        data: onecontact
    })
})

// delete a contact

app.delete("/deletedata/:id", async(req, res) =>{
    const contact = req.params.id
    const deleteuser = await user.findByIdAndDelete(contact)
        
        res.status(200).json({
            message: `the deleted user is recongnised with id: ${contact}`,
            data: deleteuser
    })

})

// updating a contact info

app.put("/updatedata/:id", async(req, res)=>{
    const contact = req.params.id
    const update = await user.findById(contact);
    const newupdate = {
        
        state:{
            mapped :req.body.mapped || update.state.mapped
            },
        parties:{
                P1: req.body.P1 || update.parties.P1,
                P2: req.body.P2 || update.parties.P2,
                P3: req.body.P3 || update.parties.P3,
                P4: req.body.P4 || update.parties.P4
            },
        result:{
            APC: req.body.APC || update.result.APC,
            PDP: req.body.PDP || update.result.PDP,
            LP: req.body.LP || update.result.LP,
            NNPO: req.body.NNPO || update.result.NNPO
            },
        Collectionofficer:{
                name: req.body.name || update.Collectionofficer.name
            },
        isRigged:{
                res: req.body.res || update.isRigged.res
            },
        total:{
                totalvt: req.body.totalvt || update.total.totalvt,
                totalLg: req.body.totalLg || update.total.totalLg
            }
    }
    const updated = await user.findByIdAndUpdate(contact, newupdate)

    res.status(200).json({
        message: `the data taged with id: ${contact} has been updated`,
        data: newupdate
    })
})


mongoose.connect("mongodb+srv://ujunwastephen8:rARbdqyyfOzwPgLo@cluster0.tdmydgt.mongodb.net/").then(()=>{
    console.log("connection is true")
});

app.listen(PORT, (req,res)=>{
    console.log(`app is listening to port: ${PORT}`)
})