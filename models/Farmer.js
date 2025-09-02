import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
      username: {
         type : String,
         required : true,
         unique : true,
         trim : true
        },
        mobile: {
         type: Number,
         required: true,
         unique: true
       },
       society: {
          type: String,
         required: true
        },
        village: {
            type: String,
            required: true
        },
        
        address: {
            type: String,
            required: true
        },

        aadhar_card: {
            type: String,
            required: false,
            default: ''
        },
        kishan_card: {
            type: String,
            required: false,
            default: ''
        },
        isActive : {
            type : Boolean,
            default: true
        }
        
})


export default mongoose.model('Farmer', farmerSchema);