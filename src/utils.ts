export var mockApi = <T>(duration: number, message: T) => {
    return new Promise<{delay: number, message: T}>((resolve, reject) => {
      setTimeout(() => {
        if(!message){
          reject("Invalid message");
        } else {
          resolve({delay: duration, message});
        }
      }, duration);
    })
  }