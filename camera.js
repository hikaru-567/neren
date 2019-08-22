window.onload = () => {
    const video  = document.querySelector("#camera");
    const canvas = document.querySelector("#picture");
  
    /** カメラ設定 */
    const constraints = {
      video: {
        width: 250,
        height: 160,
        facingMode: "user"   // フロントカメラを利用する
      }
    };
  
    /*
     * カメラを<video>と同期
     */
    navigator.mediaDevices.getUserMedia(constraints)
    .then( (stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    })
    .catch( (err) => {
      console.log(err.name + ": " + err.message);
    });
    

    //10秒ごとに画像取得
    setInterval( () => {
      const ctx = canvas.getContext("2d");

      // canvasに画像を貼り付ける
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

/*blobにしてみた
      etTimeout( () => {

        canvas.toBlob(function(blob) {
          var img = document.getElementById('picture');
          img.src = window.URL.createObjectURL(blob);
        }, 'image/jpeg', 0.95);

      },3000);
*/

      /*画像(png)として表示してみた
      var cvs = document.getElementById("picture");
      var png = cvs.toDataURL();
      document.getElementById("newImg").src = png;*/

    }, 10000);
      
};
  