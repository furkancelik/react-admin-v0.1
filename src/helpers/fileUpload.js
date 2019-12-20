import { URL } from "../config";

const futch = (url, opts = {}, onProgress) => {
  return new Promise((res, rej) => {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || "get", url);
    for (var k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
  });
};

export default async function(file, to, setProgress = null) {
  try {
    const data = new FormData();

    if (Array.isArray(file)) {
      file.forEach(item => {
        data.append("files", item);
      });
    } else {
      data.append("file", file);
    }

    data.append("to", to);

    // let response;

    const { response } = await futch(
      `${URL}file-upload`,
      {
        method: "POST",
        body: data
      },
      progressEvent => {
        const progress = progressEvent.loaded / progressEvent.total;
        setProgress && setProgress((progress * 100).toFixed(0));
      }
    );

    let responseJson = JSON.parse(response);

    if (responseJson.errors) {
      throw new Error(responseJson.errors[0].message);
    } else {
      return responseJson;
    }
  } catch (e) {
    throw new Error(e);
  }
}
