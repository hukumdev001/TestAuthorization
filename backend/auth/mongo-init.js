db.createUser({
    user: 'niraj',
    pwd: 'niraj',
    roles: [
      {
        role: 'dbOwner',
        db: 'publishers',
      },
    ],
  });