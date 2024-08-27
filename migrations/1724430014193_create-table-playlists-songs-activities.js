// // 05_create_table_playlist_activities.js
// exports.up = (pgm) => {
//   pgm.createTable('playlist_activities', {
//     id: {
//       type: 'VARCHAR(50)',
//       primaryKey: true,
//     },
//     playlist_id: {
//       type: 'VARCHAR(50)',
//       notNull: true,
//       references: '"playlists"',
//       onDelete: 'CASCADE',
//     },
//     user_id: {
//       type: 'VARCHAR(50)',
//       notNull: true,
//       references: '"users"',
//       onDelete: 'CASCADE',
//     },
//     action: {
//       type: 'TEXT',
//       notNull: true,
//     },
//     time: {
//       type: 'TIMESTAMP',
//       notNull: true,
//       default: pgm.func('current_timestamp'),
//     },
//   });
// };

// exports.down = (pgm) => {
//   pgm.dropTable('playlist_activities');
// };
