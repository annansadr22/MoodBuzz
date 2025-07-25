This project detects human emotions in real-time using your webcam and plays music matching your mood directly from YouTube. It combines DeepFace for robust facial emotion recognition and VLC for seamless audio playback.

 Features
 Real-time webcam emotion detection (happy, sad, angry, fear, surprise, disgust, neutral)
 Smooth prediction filtering to reduce false positives
 Automatic YouTube music streaming based on detected emotion
 No local music files required
 Works in Jupyter Notebook or as a standalone script
 Built with Python, OpenCV, DeepFace, VLC, yt-dlp

 How It Works
Captures live video feed from your webcam.

Detects faces and predicts emotions using DeepFace.

Smooths predictions across multiple frames for stability.

Selects and plays a random YouTube song matching the emotion using VLC.

Continuously updates emotion detection and switches music if mood changes.
