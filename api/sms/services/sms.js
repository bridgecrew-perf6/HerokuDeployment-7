let sendSms = function(strmes,phones){
    const accountSid = process.env.TWILIO_ACCOUNT_SID ;
    const authToken = process.env.TWILIO_AUTH_TOKEN  ;
    //const myNum = process.env.MYNUM;
    const twilioNum =process.env.TWILIONUM;
    const client = require('twilio')(accountSid, authToken);
    /*
    for(let i=0;i<phones.length;i++)
    {  
      myNum=phones[i]
      
      client.messages
      .create({
         body: strmes,
         from: twilioNum, //the phone number provided by Twillio
         to: myNum // your own phone number
       })
      .then(message => console.log(message.sid));}
  
   */
   const service=client.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);
   const bindings=phones.map(phone=>{
    return JSON.stringify({binding_type:"sms",address:phone});
   });




   service.notifications.create({toBinding:bindings,
    body:strmes
  
  
  
  }).then(notification=>{console.log(notification);})

  .catch(err=>{
    console.log(err)

  })

  }
   
  module.exports = {
    sendSms
  };