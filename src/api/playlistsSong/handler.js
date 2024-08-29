const ClientError = require('../../exceptions/ClientError');

class PlaylistSongsHandler {
  constructor(service, validator, playlistsService, songsService) {
    this._service = service;
    this._validator = validator;
    this._playlistService = playlistsService;
    this._songService = songsService;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistsSongsHandler = this.getPlaylistsSongsHandler.bind(this);
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistSongsAccess(playlistId, credentialId);

    await this._songService.verifySong(songId);
    const playlistSongId = await this._service.addSongToPlaylist({
      playlistId,
      songId,
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
      data: {
        playlistSongId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsSongsHandler(request) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    // Verifikasi kepemilikan atau kolaborasi
    await this._playlistService.verifyPlaylistSongsAccess(playlistId, credentialId);

    const playlist = await this._service.getSongsFromPlaylist(playlistId, credentialId);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongByIdHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    // Validasi songId
    await this._playlistService.verifyPlaylistSongsAccess(playlistId, credentialId);

    await this._service.deleteSongFromPlaylist(playlistId, songId);

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistSongsHandler;
