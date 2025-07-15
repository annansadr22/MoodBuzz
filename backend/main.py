from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from io import BytesIO

app = FastAPI()

# ✅ Allow frontend to call backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load the trained emotion model
model = load_model("emotion_cnn_model.h5")
emotion_classes = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

@app.get("/")
def root():
    return {"message": "MoodBuzz API is live 🚀"}

@app.post("/predict-emotion/")
async def predict_emotion(file: UploadFile = File(...)):
    contents = await file.read()
    np_arr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_GRAYSCALE)

    # ✅ Preprocess image to match model input
    img = cv2.resize(img, (48, 48))
    img = img / 255.0
    img = img.reshape(1, 48, 48, 1)

    # ✅ Predict
    pred = model.predict(img)[0]
    emotion_idx = np.argmax(pred)
    confidence = float(np.max(pred))
    label = emotion_classes[emotion_idx]

    return {
        "mood": label,
        "confidence": f"{confidence:.2f}"
    }
