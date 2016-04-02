var express = require("express")
var moment = require('moment')
var fs = require('fs')

var app = express()

app.use(express.static('.'))

app.get("/:timestamp", function(req, res){

    var time = moment(req.params.timestamp, 'MMMM DD, YYYY', true)
    if (!time.isValid()){
        time = moment.unix(req.params.timestamp);
    }

    if(time.isValid()){
        res.json({
            unix: time.format('X'),
            natural: time.format('MMMM DD, YYYY')
        })
    }else{
        res.json({
            unix: null,
            natural: null
        })
    }
})

app.get('*', function(req,res){
    res.set('content-type','text/html')
    res.send(fs.readFileSync(__dirname + '/index.html','utf8'))
})

app.listen(process.env.PORT || 80, function(){
	console.log('server listening')
})
