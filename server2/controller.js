const { User } = require("./models/user");
const Post = require('./models/post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {valid} = require('./mid/middleware')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'maticht12345',
    api_key: '296937641242215',
    api_secret: '1Pz4aF1QxcosM4hU6fwRS2bwlWY'
})




exports.uploadImage = async (req,res) => {
    console.log('upload image >> user._id', req.user._id);
    try{
        const result = await cloudinary.uploader.upload(req.body.image);

        console.log('CLOUDINARY_RESULT', result);
        const user = await User.findByIdAndUpdate(req.user._id, {
                image: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
            },
            {new: true}
        );
        return res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
        });
    }catch (err){
        console.log(err)
    }
}

exports.updateUser = async (req,res) => {
    const users = await User.find()
    res.json(users)
};

exports.userProfile = async (req,res) => {
    try{
        const profile = await User.findById(req.params.userId).select(
            'firstName ' +
            'lastName ' +
            'image ' +
            '_id ' +
            'email ' +
            'nameOrCompany ' +
            'areasActivity ' +
            'phone1  ' +
            'phone2 ' +
            'Facebook TikTok YouTube Instagram WhatsApp Telegram Viber LinkedIn ' +
            'zip ' +
            'workLocation ' +
            'workingHoursMon workingHoursTue workingHoursWed workingHoursThu workingHoursFri workingHoursSat workingHoursSun ' +
            'description ' +
            'services ' +
            'price ' +
            'rating likes savedUsers verified role ' +
            'region street house apartment city ' +
            'profilePoints '
        );
        return res.json({profile})
    }catch(err){
        console.log(err)
    }
}


exports.getAllUsers = async(req,res) => {
    const users = await User.find()
    res.json(users)
}

