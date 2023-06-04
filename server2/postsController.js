const Post = require('./models/post');
const cloudinary = require("cloudinary");
const {User} = require("./models/user");

cloudinary.config({
    cloud_name: 'maticht12345',
    api_key: '296937641242215',
    api_secret: '1Pz4aF1QxcosM4hU6fwRS2bwlWY'
})

exports.create = async (req, res) => {
    try {
        const { title, postedBy, parent, prise, fixPrice, minutes, hours, days, fixTime, description} = req.body;
        const postExists = await Post.findOne({ title, postedBy });
        if (postExists) {
            return res.status(409).json({ error: 'У вас уже есть услуга с таким заголовком' });
        }
        if (title.length === 0) {
            return res.status(400).json({ error: 'Вы не добавили ни одной услуги' });
        }
        const post = await new Post({ title, postedBy, parent, prise, fixPrice, minutes, hours, days, fixTime, description }).save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.viewbyid = async (req, res) => {
    const postedBy = req.query.postedBy;
    try {
        let posts;
        if (postedBy) {
            posts = await Post.find({ postedBy: postedBy });
        } else {
            posts = await Post.find();
        }
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.servProfile = async (req,res) => {
    try{
        const profile = await Post.findById(req.params.ServId).select(
            'title ' +
            'parent ' +
            'postedBy ' +
            'prise ' +
            'fixPrice ' +
            'minutes ' +
            'hours ' +
            'days  ' +
            'fixTime ' +
            'description ' +
            '_id '
        );
        return res.json({profile})
    }catch(err){
        console.log(err)
    }
}

exports.updateServ = async (req, res) => {
    try {
        const servDataToUpdate = { ...req.body }
        if (!servDataToUpdate.prise) delete servDataToUpdate.prise;
        if (!servDataToUpdate.fixPrice) delete servDataToUpdate.fixPrice;
        if (!servDataToUpdate.minutes) delete servDataToUpdate.minutes;
        if (!servDataToUpdate.hours) delete servDataToUpdate.hours;
        if (!servDataToUpdate.days) delete servDataToUpdate.days;
        if (!servDataToUpdate.fixTime) delete servDataToUpdate.fixTime;
        if (!servDataToUpdate.description) delete servDataToUpdate.description;

        const profile = await Post.findByIdAndUpdate(
            req.params.ServId,
            { $set: servDataToUpdate },
            { new: true }
        );
        return res.json({ profile });
    } catch (err) {
        console.log(err);
    }
}

exports.view = async (req, res) => {
    try{
        const all = await Post.find();
        res.json(all);
    }catch (err){
        console.log(err);
    }
}

exports.like = async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $addToSet: {likes: req.user._id},
        }, {new: true});
        const extendedPost = await post.populate('postedBy', 'email image');
        res.json(extendedPost);
    }catch (err){
        console.log(err);
    }
}

exports.unlike = async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: {likes: req.user._id},
        }, {new: true});
        const extendedPost = await post.populate('postedBy', 'email image');
        res.json(extendedPost);
    }catch (err){
        console.log(err);
    }
}

exports.postDelete = async (req, res) => {
    try{
        // const post = await Post.findById(req.params.postId).select('postedBy');
        // if(post.postedBy._id.toString() === req.user._id){
            const deleted = await Post.findByIdAndRemove(req.params.ServId);
            res.json(`DELETED SACSESS ${deleted}`);
        // }
    }catch (err){
        console.log(err);
    }
}
