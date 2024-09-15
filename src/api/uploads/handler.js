const ClientError = require('../../exceptions/ClientError');

class UploadsHandler {
  constructor(service, validator, albumsService) {
    this._service = service;
    this._validator = validator;
    this._albumsService = albumsService;
    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { id: albumId } = request.params;
    const { cover } = request.payload;
    if (!cover || !cover.hapi) {
      const response = h.response({
        status: 'fail',
        message: 'File upload is invalid payload',
      });
      response.code(400);
      return response;
    }
    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._service.writeFile(cover, cover.hapi);

    const url = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`;
    await this._albumsService.updateCoverAlbumById(albumId, url);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
      cover: {
        coverUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
