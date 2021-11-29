class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string' && typeof message === 'string') {
      throw new Error("two String params,only one params")
    }
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }
    data && (this.data = data);
    message && (this.message = message);
  } 
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}