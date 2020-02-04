exports.seed = function (knex) {
    return knex("projects").insert([
        {
            name: 1,
            description: "solve prime number theory",
            funding_goal: "test",
            user_id: 1
        },
        {
            name: 134,
            description: "solve prime number theory",
            funding_goal: "test1",
            user_id: 1
        },
        {
            name: 134,
            description: "solve prime number theory",
            funding_goal: "test1",
            user_id: 2
        },
    ]);
};