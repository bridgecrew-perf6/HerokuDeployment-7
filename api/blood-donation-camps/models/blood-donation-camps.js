module.exports = {
  lifecycles: {
    //executed after i create a blood camps
    async beforeUpdate(params, data) {
      if (data.published_at != null) {
        const { id } = params;
        console.log(id);
        const previousData = await strapi
          .query("blood-donation-camps")
          .findOne({ id });
        const previousPublishedAt = previousData.published_at;
        const currentPublished_at = data.published_at;
        if (currentPublished_at != previousPublishedAt) {
          //console.log("Triggered only when published.");
          //console.log(data.Name);g
          const res = await strapi
            .query("blood-donation-camps")
            .findOne({ id });
          //console.log(res);
          const users = await strapi.query("user", "users-permissions").find();
          const emails = users.map((a) => a.email);
          //console.log(users);
          const phoneNumbers = users.map((a) => a.PhoneNumber);
          const phone = phoneNumbers.filter((element) => {
            return element !== undefined;
          });
          const phones = phone.map((a) => {
            return "+91" + a;
          });
          // console.log(phones);
          let time = res.Time.toString();
          time = time.substring(0, 5);

          try {
            /*strapi.services.sms.sendSms(
              `There is an Upcoming blood donation camp titled   "${res.Name}"\n at ${res.Address} Date=${res.Date}.\nPLease check out the website for more info.\n Link: ${process.env.APP_URL}/${res.slug}   `,
              phones
            );*/
            /*
            for (let i = 0; i < emails.length; i++) {
              await strapi.plugins["email"].services.email.send({
                to: emails[i],
                from: "sikkim.co.blood@gmail.com",
                subject: "A Blood Donation Camp Nearby ",
                text: `There is an Upcoming blood donation camp titled: "${res.Name}"\n at ${res.Address} Date=${res.Date}.\nPLease check out the website for more info.\n Link: ${process.env.APP_URL}/${res.slug}   `,
              });
            }*/
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
  },
};
