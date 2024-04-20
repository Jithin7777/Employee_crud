const User=require('../model/userModel')

 const create=async(req,res)=>{
    try {
        const userData=new User(req.body);

if(!userData){
    return res.status(404).json({msg:"User data not found"})
}
 const savedData=await userData.save();
 res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({error:error});
    }
}


const getAll=async(req,res)=>{
    try {
       const userData=await User.find();
       if(!userData){
        return res.status(404).json({msg:"user data not found"});
       } 
       res.status(200).json(userData);
    } catch (error) {
       res.status(500).json({error:error}); 
    }
}


const getOne=async(req,res)=>{
try {
    const id=req.params.id;
    const userExist=await User.findById(id);
    if(!userExist){
      return  res.status(404).json({msg:"User not found"})
    }
    res.status(200).json(userExist)
} catch (error) {
    res.status(500).json({error:error});
   
}
}

const update=async(req,res)=>{
    try {
       const id=req.params.id 
       const userExist=await User.findById(id)
       if(!userExist){
      return  res.status(500).json({msg:"User not found"})
       }
      const updatedData=await User.findByIdAndUpdate(id,req.body,{new:true})
       res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({error:error})
    }
}

const deleteUser=async(req,res)=>{
try {
    const id=req.params.id;
    const userExist=await User.findById(id);
    if(!userExist){
return res.status(404).json({msg:"User not found"});
    }
    await User.findByIdAndDelete(id)
res.status(200).json({msg:"User deleted successfully"});

} catch (error) {
   res.status(500).json({error:error}); 
}
}


module.exports = { create,getAll,getOne,update,deleteUser};