var Item = require('models').Item;

exports.getData = function(req, res){
    Item.find({},function(er,items){
        if(er){console.log('er:',er);throw er;}
        res.json(items);
    });
};
exports.insertData = function(req, res){
    var item = new Item(req.body);
    item.save(function(er,added){
        if(er){console.log('er:',er);throw er;}
        console.log('items:',added);
        res.send({res: 'save item!'});
    });
};
exports.editData = function(req, res){console.log('id:',req.params.id);
    delete req.body.id;
    Item.findOneAndUpdate({_id: req.params.id},req.body,function(er,item){
        if(er) throw er;
        Item.find({},function(er,items){
            if(er)throw er;
            res.json(items);
        });
    });
};
exports.deleteData = function(req,res){console.log('id:',req.params.id);
    Item.remove({_id: req.params.id},function(er){console.log(1);
        if(er) throw er;
        console.log(123);
        res.send({res: 'remove item!'});
    })
}