const express = require('express');
const router = express.Router();
const { Blog } = require("../models/Blog");

const { auth } = require("../middleware/auth");
const multer = require("multer");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Blog
//=================================

// fieldname: 'file',
// originalname: 'React.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: '1573656172282_React.png',
// path: 'uploads/1573656172282_React.png',
// size: 24031 

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/createPost", (req, res) => {
    let blog = new Blog({ content: req.body.content, writer: req.body.userID });
    console.log(req.body.user)
    blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
    })

    //생각 해보니  세이브 할떄 populate 할필요가 없다.   가져올떄 하면 되니깐...
    // blog.save((err, response) => {
    //     if (err) return res.json({ success: false, err });
    //     Blog.find({ _id: response._id })
    //         .populate('writer')
    //         .exec((err, result) => {
    //             let postInfo = result[0]
    //             if (err) return res.json({ success: false, err });
    //             return res.status(200).json({ success: true,  postInfo });
    //         })
    // });
});


router.get("/getBlogs", (req, res) => {
    Blog.find()
        .populate("writer")
        .exec((err, blogs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs });
        });
});

router.get("/FetchBlogs",(req,res) => {
    var ui = "This"
    Blog.find({content: {$regex: ui} },function(err,pos){
        if(err){
            console.log("nope")
        }
        else{
            console.log(pos)
            res.send(pos)
        }
    })
})

router.post("/FetchBlogs", (req, res) => {
    //console.log(req.body)
    const wor = req.body.word;
    //const $regex = escapeStringRegexp(wor);
    Blog.find({content: {$regex: wor} })
        .exec((err,pos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true ,pos})
            console.log(pos)
        })
});

router.post("/EditPost", (req, res) => {
    var id = req.body.id;
    con = req.body.content;
    Blog.findOneAndUpdate({_id:id},{content:con})
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            //console.log(post)
            res.status(200).json({ success: true, post })
        })
});
router.post("/deletePost",(req,res) =>{
    var id = req.body.postId;
    var usert = req.body.user;
    var writer ="";
    //console.log("logged user is ",usert)
    Blog.findById(id,function(er,rs){
        if(er){
            console.log(er);
        }
        else{
            writer = rs.writer;
            //console.log(rs);
            //console.log(writer);
            usert = String(usert);
            writer = String(writer);
            console.log(usert === writer)
            //console.log("The writer is ",rs.writer)
            if(writer === usert){
                console.log("match")
                Blog.findByIdAndDelete(id,function(err,resp){
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.status(200).json({success:true})
                    }
                })
                }
                else{
                    console.log("mis-match")
                    res.status(200).json({success:false})
                }
        }
    })


})
router.post("/getPost", (req, res) => {
    //console.log(req.body)
    Blog.findOne({ "_id": req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
});

module.exports = router;
