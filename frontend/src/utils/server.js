const url = process.env.REACT_APP_URL;
const headers = {
  "Content-type": "application/json",
};

module.exports.register = async ({ fname, lname, email, uid }) => {
  const response = await fetch(`${url}/user/register`, {
    method: "post",
    headers,
    body: JSON.stringify({ fname, lname, email, uid }),
  });

  const body = await response.json();
};

function analyze(image) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://www.estimatebodyfat.com/analyze", true);

    xhr.onerror = function () {
      alert(xhr.responseText);
    };

    xhr.onload = function (e) {
      if (this.readyState === 4) {
        var response = JSON.parse(e.target.responseText);
        console.log(response["result"]);
        resolve(
          response["result"]
            .split(" to ")
            .reduce((acc, val) => acc + Number(val), 0) / 2
        );
      }
    };

    var fileData = new FormData();
    fileData.append("file", image);
    xhr.send(fileData);
  });
}

module.exports.analyseImage = async (uid, image, target) => {
  const bodyFatPercentage = await analyze(image);
  const response = await fetch(`${url}/user/image`, {
    method: "post",
    headers,
    body: JSON.stringify({ uid, bodyFatPercentage, target }),
  });
  const body = await response.json();
  const { exercises } = body;
  return { bodyFatPercentage, exercises };
};

module.exports.getProgress = async (uid) => {
  const response = await fetch(`${url}/user/progress?uid=${uid}`);
  const body = await response.json();
  return body.data.progress;
};
