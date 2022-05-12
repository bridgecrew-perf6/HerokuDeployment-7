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
          console.log("Triggered only when published.");
          //console.log(data.Name);g
          const res = await strapi
            .query("blood-donation-camps")
            .findOne({ id });
          console.log(res);
          const users = await strapi.query("user", "users-permissions").find();
          const emails = users.map((a) => a.email);
          let time = res.Time.toString();
          time = time.substring(0, 5);
          try {
            for (let i = 0; i < emails.length; i++) {
              await strapi.plugins["email"].services.email.send({
                to: emails[i],
                from: "srijan_201800150@smit.smu.edu.in",
                subject: "A Blood Donation Camp Nearby ",
                text: `There is an Upcoming blood donation camp titled   "${res.Name}"\n at ${res.Address} time=${time}.\nPLease check out the website for more info. Link: localhost:3000/camps/${res.slug}   `,
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    },

    
  },
};
