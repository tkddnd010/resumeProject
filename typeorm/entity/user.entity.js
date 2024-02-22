import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Users',
  tableName: 'users',
  columns: {
    userid: {
      primary: true,
      type: 'int',
      generated: true,
    },
    clientId: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    grade: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
  },
});
