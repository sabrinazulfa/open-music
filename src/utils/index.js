const mapAlbumToModel = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year,
});

const mapSongsToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

module.exports = { mapAlbumToModel, mapSongsToModel };
