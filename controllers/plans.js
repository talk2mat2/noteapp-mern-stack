const Plans= require('../models/plans')


exports.GetPlans=async (req,res)=>{

await Plans.findOne({}).then(item=>{
    return res.status(200).json({userData:item,status:true,mesage:"succes"})
}).catch(err=>{
    console.log(err)
    return res.status(501).json({userData:{business:0,premium:0},status:false,mesage:"not found"})
})
}
exports.setPlans=async (req,res)=>{
   
    const {business,premium}=req.body;
   
    await Plans.deleteMany({}).catch(err=>{
        console.log(err)
    })
const newPlans =new Plans({business:parseInt(business),premium:parseInt(premium)})
        
await newPlans.save((err,success)=>res.status(200).json({userData:success,status:true,mesage:"success"}))

}