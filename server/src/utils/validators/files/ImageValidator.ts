import { ParseFilePipeBuilder } from '@nestjs/common';

export default new ParseFilePipeBuilder().addFileTypeValidator({
  fileType: '',
});
