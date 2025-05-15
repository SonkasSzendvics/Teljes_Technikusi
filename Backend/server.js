const express = require('express')
const server = express()
const JWT = require('jsonwebtoken')
const cors = require('cors')
const dbHandler = require('./dbHandler')
require('dotenv').config()

server.use(express.json())
server.use(cors())

dbHandler.artworks.sync({alter:true})
dbHandler.users.sync({alter:true})

const PORT = process.env.PORT
const SECRET = process.env.SECRET

function Auth(){
    return async(req,res,next) =>{
        const header = req.headers.authorization
        try {
            const token = await JWT.verify(header, SECRET)
            next()
        } catch (error) {
            res.json({'messages':'Auth hiba'+error}).status(401).end()
        }
    }
}

server.post('/login', async(req,res)=>{
    const oneUser = await dbHandler.users.findOne({
        where:{
            username:req.body.loginUser,
            password:req.body.loginPass
        }
    })
    if(!oneUser){
        res.status(401).json({'messages':'Hibás felhasználónév vagy jelszó'}).end()
        return
    }
    const token = await JWT.sign({username:req.body.loginUser},SECRET,{expiresIn:'1h'})
    res.status(200).json({'messages':'Sikeres bejelentkezés', token:token}).end()
})

server.post('/register', async(req,res)=>{
    const oneUser = await dbHandler.users.findOne({
        where:{
            username: req.body.regUser,
        }
    })
    if(oneUser){
        res.status(409).json({'messages':'Felhasználónév már foglalt'}).end()
        return
    }

    await dbHandler.users.create({
        username:req.body.regUser,
        password:req.body.regPass
    })
    res.status(201).json({'messages':'Sikeres regisztráció'}).end()

})

server.get('/artworks', async(req,res)=>{
    const artWorks = await dbHandler.artworks.findAll()
    res.json(artWorks).status(200).end()
})

server.post('/artworks', Auth(), async(req,res) =>{
    const oneArtwork = await dbHandler.artworks.findOne({
        where:{
            title:req.body.newTitle
        }
    })
    if(oneArtwork){
        res.json({'messages':"Már létezik ilyen című műalkotás"}).status(409).end()
        return
    }

    await dbHandler.artworks.create({
        title:req.body.newTitle,
        value:req.body.newValue
    })

    res.json({'messages':"Új műalkotás sikeresen hozzáadva"}).status(201).end()
})

server.delete('/artworks/:id', Auth(), async(req,res) =>{
    const oneArtwork = await dbHandler.artworks.findOne({
        where:{
            id:req.params.id
        }
    })
    if(!oneArtwork){
        res.json({'messages':"A megadott műalkotás nem található"}).status(404).end()
        return
    }

    await dbHandler.artworks.destroy({
        where:{
            id:req.params.id
        }
    })
    res.json({'messages':"Műalkotás sikeresen törölve"}).status(201).end()
})





server.listen(PORT,() => console.log('A szerver fut a '+PORT +'-on'))