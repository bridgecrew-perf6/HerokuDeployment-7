const slugify = require("slugify");

module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.name) {
        var text = "XL";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (var i = 0; i < 6; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        data.slug = slugify(text, { lower: true });
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.name) {
        var text = "XL";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (var i = 0; i < 6; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        data.slug = slugify(text, { lower: true });
      }
    },

    async beforeUpdate(params, data) {
      console.log(data);
      if (data.published_at != null) {
        const { id } = params;
        //console.log(id);
        const previousData = await strapi.query("events").findOne({ id });
        const previousPublishedAt = previousData.published_at;
        const currentPublished_at = data.published_at;
        if (currentPublished_at != previousPublishedAt) {
         // console.log("Triggered only when published.");
          const users = await strapi
            .query("user", "users-permissions")
            .find({ role: 3 });
          const res = await strapi.query("events").findOne({ id });

          //console.log(users);
          const results = users.map((a) => {
            if (a.BloodType === res.BloodType) {
              return a.email;
            }
          });
          const emails = results.filter((element) => {
            return element !== undefined;
          });
          const phoneNumbers = users.map((a) => {
            if (a.BloodType === res.BloodType) {
              return a.PhoneNumber;
            }
          });
          const phone = phoneNumbers.filter((element) => {
            return element !== undefined;
          });
          const phones = phone.map((a) => {
            return "+91" + a;
          });
          ///console.log(phones);
          try {
            strapi.services.sms.sendSms(
              `
              You have received a Blood Request.
              \n
              
              Contact Person's Name: "${res.name}" at ${
                res.venue
              },\n Blood Type:${res.BloodType}, \t Units:${
                res.units
              }, \nDate:${new Date(res.date).toLocaleDateString(
                "en-UK"
              )}.\n Contact Details: ${res.Phone}.
                 \n Venue: ${res.venue}

              
              \nPlease check out the website for more info. Link: ${process.env.APP_URL}/${
                res.slug
              }`,
              phones
            );

/*
            for (let i = 0; i < emails.length; i++) {
              await strapi.plugins["email"].services.email.send({
                to: emails[i],
                from: "sikkim.co.blood@gmail.com",
                subject: "You have Received a Blood Request  ",
                text: `Contact Person' Name: "${res.name}" at ${
                  res.venue
                }\n Blood Type=${res.BloodType} \t Units=${
                  res.units
                } \t Needed till Date=${new Date(res.date).toLocaleDateString(
                  "en-UK"
                )}.\n PLease check out the website for more info. Link: ${process.env.APP_URL}/${
                  res.slug
                }`,
              });
            }*/
          } catch (err) {
            console.log(err);
          }
          //console.log(data.Name);g
        }
      }
    },

    async afterCreate(result) {
      /*
      const users = await strapi.query("strapi::user").find();

      const res = result;

      //const data = await strapi.query('users').find();
      //console.log(data);
      const emails = users.map((a) => a.email);
      // console.log(emails);

      try {
        for (let i = 0; i < emails.length; i++) {
          await strapi.plugins["email"].services.email.send({
            to: emails[i],
            from: "srijan_201800150@smit.smu.edu.in",
            subject: "Hey admin someone has posted a request on the site ",
            text: `A Blood Donation Request has been posted on Site.\nHere are some details,\nName:"${
              res.name
            }" at ${res.venue} ${new Date(res.date).toLocaleDateString(
              "en-UK"
            )}\nUnits Required: ${res.units}   of  ${
              res.BloodType
            }.\nPLease check out the Admin site for more info`,
          });
        }
      } catch (err) {
        console.log(err);
      }*/
    },
  },
};
