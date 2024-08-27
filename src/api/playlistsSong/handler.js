const ClientError = require('../../exceptions/ClientError');

class PlaylistSongsHandler {
  constructor(service, playlistService, songService, validator) {
    this._service = service;
    this._playlistService = playlistService;
    this._songService = songService; // Menambahkan songService untuk validasi lagu
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    // Validasi songId
    this._validator.validateSongId(songId);

    // Verifikasi bahwa songId adalah id lagu yang valid
    await this._songService.verifySongExists(songId);

    // Verifikasi kepemilikan atau kolaborasi
    await this._playlistService.verifyPlaylistAccess(playlistId, credentialId);

    const playlistSongId = await this._service.addSongToPlaylist(playlistId, songId, credentialId);

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

  async getPlaylistSongsHandler(request) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    // Verifikasi kepemilikan atau kolaborasi
    await this._playlistService.verifyPlaylistAccess(playlistId, credentialId);

    const playlist = await this._service.getSongsFromPlaylist(playlistId, credentialId);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongByIdHandler(request, h) {
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    // Validasi songId
    this._validator.validateSongId(songId);

    // Verifikasi bahwa songId adalah id lagu yang valid
    await this._songService.verifySongExists(songId);

    // Verifikasi kepemilikan atau kolaborasi
    await this._playlistService.verifyPlaylistAccess(playlistId, credentialId);

    await this._service.deleteSongFromPlaylist(playlistId, songId, credentialId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistSongsHandler;
