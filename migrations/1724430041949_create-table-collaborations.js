// // 06_create_table_collaborations.js
// exports.up = (pgm) => {
//   pgm.createTable('collaborations', {
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
//   });
// };

// exports.down = (pgm) => {
//   pgm.dropTable('collaborations');
// };
