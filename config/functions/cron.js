"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  "*/1 * * * *": async () => {
    // Fetch data that have the `yourDateAttributeName_lt` lower than the now.
    const data = await strapi.query("events").find({
      date_lt: new Date(),
      _limit: 100000,
    });

    // Delete all entries fetched.
    data.forEach((entry) =>
      strapi.query("events").delete({
        id: entry.id,
      })
    );
  },
};
