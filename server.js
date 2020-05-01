const express = require('express');
const methodOverride = require('method-override');
let db = require('./models')
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////

app.get('/',(req,res)=>{
    db.widget.findAll()
    .then(widgets=>{
        res.render('home',{widgets})
    })
    .catch(err=>{
        console.log(err)
        res.render('error')
      })
   
})

app.post('/',(req,res)=>{
    db.widget.findOrCreate({
    where: {
          description: req.body.description,
          quantity: req.body.quantity,
          },
          defaults: req.body
      })
      .then(([widgets,created])=>{
        res.redirect('/')
      })
      .catch(err=>{
        console.log(err)
        res.render('error')
      })
})


app.delete('/',(req,res)=>{
  db.widget.destroy({	
    where: { 
      description: req.body.description,
      quantity: req.body.quantity 
    }	
  })
  .then(deletedwid=>{
    res.redirect('/')
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })	
})
// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(process.env.PORT || 3000)
