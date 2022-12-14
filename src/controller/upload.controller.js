const {AVATAR_PATH} = require('../constants/file-path')
const fs = require('fs')
const path = require('path')

class UploadController {
  async getAvatar(ctx,next){
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${path.basename(ctx.request.url)}`);
  }
}

module.exports = new UploadController();
