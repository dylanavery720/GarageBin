exports.seed = function(knex, Promise) {
  return knex('items').del()
  .then(() => {
    return Promise.all([
      knex('items').insert({
        id: 1,
        name: 'Get Lunch',
        reason: 'Not full',
        cleanliness: 'Sparkling',
        created_at: new Date
      }),
      knex('items').insert({
        id: 2,
        name: 'Skip Dinner',
        reason: 'Still Hungry',
        cleanliness: 'Rancid',
        created_at: new Date
      })
    ]);
  });
};
