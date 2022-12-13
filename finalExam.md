## 얼굴 인식 프로그램 

연예인 3명(태연, 서현,니티파니), 그리고 제 사진을 모델에 학습시켜 얼굴을 인식하는 프로그램입니다. 

### 결과 

서현 

<img width="325" alt="결과2" src="https://user-images.githubusercontent.com/102898911/207236409-cf423c71-03f6-4ea9-98ea-e7b8effcc1bf.png">

태연 

<img width="304" alt="결과3" src="https://user-images.githubusercontent.com/102898911/207236434-909fa4de-20e5-4f0c-94f2-36dc60a0bf48.png">

오예준 

<img width="242" alt="결과1" src="https://user-images.githubusercontent.com/102898911/207236477-7b7f3a37-9c38-42d0-ad7c-42919774cba5.png">

티파니 


<img width="223" alt="시험 결과물" src="https://user-images.githubusercontent.com/102898911/207376582-83df5785-8bbc-4a89-ae4e-649b0837521f.png">


### Html 코드 

``` Html 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script defer src="face-api.min.js"></script>
  <script defer src="script.js"></script>
  <title>Face Recognition</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
</head>
<body>
  <input type="file" id="imageUpload">
</body>
</html>
```

### JavaScript 코드 

``` JavaScript 

const imageUpload = document.getElementById('imageUpload')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

async function start() {
  const container = document.createElement('div')
  container.style.position = 'relative'
  document.body.append(container)
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image
  let canvas
  document.body.append('Loaded')
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    container.append(image)
    canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
    })
  })
}

function loadLabeledImages() {
  const labels = ['서현','오예준', '태연', '티파니' ]
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/Joon1899/assignment/main/labeled_images/${label}/${i}.png`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
```
```
