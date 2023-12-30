import fs from'fs'
import path from 'path';
export const filePath = path.join(path.resolve(), 'data/users.json')

const jsonFile=fs.readFileSync('./data/users.json').toString()

export const getAllUsers = (req, res, next) => {
  res.send(jsonFile);
};

export const getUser=(req,res,next)=>{

  let users=JSON.parse(jsonFile);
    let userId=req.params.id;

    let foundUser=users.find(user=>user.uniqid===userId);

    res.send(foundUser)

}

export const createNewUser=(req,res,next)=>{

    let users=JSON.parse(jsonFile);
    let newUser=req.body ;
    
    if(users.find(e=>e.uniqid===newUser.uniqid ||e.firstName===newUser.firstName)){
      res.status(400).send('User already exists');
return;
    }

    users.push(newUser);

    fs.writeFileSync('./data/users.json' ,JSON.stringify(users));
    res.send(users)

}

export const updateUser=(req,res,next)=>{

  let updatedUserID= req.params.id ;
  const updatedUser=req.body;
  const users= JSON.parse(jsonFile);

  const updatedArray=users.map(user=>{
    if( user.uniqid===updatedUserID){
      return{...user,...updatedUser}
    }
    else{
    return user ;
    }
  })
  console.log(updatedArray);
  fs.writeFileSync('./data/users.json' ,JSON.stringify(updatedArray));
  res.send('success')
}

export const withdrawMoney=(req,res,next)=>{
const users=JSON.parse(jsonFile);
  let userID=req.params.id ;
  const updatedmount=req.body;
  console.log(updatedmount.amount);


  const updatedArray=users.map(user=>{
    if( user.uniqid===userID){
      user.cash=user.cash-updatedmount.amount ;
      return{...user,...user}
    }
    else{
    return user ;
    }
  })
  
  console.log(updatedArray)
  fs.writeFileSync('./data/users.json' ,JSON.stringify(updatedArray));
  res.send('success withdrow')
}

export const depositMoney=(req,res,next)=>{

  const users=JSON.parse(jsonFile);
  let userID=req.params.id ;
  const updatedmount=req.body;
  console.log(updatedmount.cash);


  const updatedArray=users.map(user=>{
    if( user.uniqid===userID){
      user.cash=user.cash+updatedmount.cash ;
      return{...user,...user}
    }
    else{
    return user ;
    }
  })
  
  console.log(updatedArray)
  fs.writeFileSync('./data/users.json' ,JSON.stringify(updatedArray));
  res.send('success deposit')
}

export const updateCredit=(req,res,next)=>{

  const users=JSON.parse(jsonFile);
  let userID=req.params.id ;
  let updatedmount=req.body;
 

  if(updatedmount.credit >0){
  const updatedArray=users.map(user=>{
    if (user.uniqid === userID) {
      user.credit = updatedmount.credit ;
      return { ...user ,...user}; // No need for spreading ...user twice
    } else {
      return user;
    }
  });

  fs.writeFileSync('./data/users.json' ,JSON.stringify(updatedArray));
  res.send('success')
}
else{
  res.send('amout is not accepted');
}


}

export const transafer=(req,res,next)=>{
  let users=JSON.parse(jsonFile);
  let fromUserID=req.params.idFrom ;
  let toUserID=req.params.idTo;
  let transmount=req.body.amount;


  let fromUser = users.find(user => user.uniqid === fromUserID);
  let toUser = users.find(user => user.uniqid === toUserID);

  if (!fromUser || !toUser) {
    return res.status(404).send('Error: One or both users not found.');
  }

  // Check if the fromUser has enough cash for the transfer
  if (fromUser.cash < transmount) {
    return res.status(400).send('Error: Insufficient funds for the transfer.');
  }

users = users.map(user => {
  if (user.uniqid === fromUserID) {
    return { ...user, cash: user.cash - transmount };
  } else if (user.uniqid === toUserID) {
    return { ...user, cash: user.cash + transmount };
  } else {
    return user;
  }
});

fs.writeFileSync('./data/users.json' ,JSON.stringify(users));
res.send('success transafer')

}
