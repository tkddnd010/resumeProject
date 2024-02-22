import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Resumes',
  tableName: 'resumes',
  columns: {
    resumeid: {
      primary: true,
      type: 'int',
      generated: true,
    },
    userId: {
      type: 'varchar',
    },
    title: {
      type: 'varchar',
    },
    coment: {
      type: 'varchar',
    },
    status: {
      type: 'varchar',
    },
    createdAt: {
      type: 'datetime',
    },
  },
});
