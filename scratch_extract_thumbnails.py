import cv2
import os

reels_dir = "public/assets/reels"
os.makedirs(reels_dir, exist_ok=True)

for i in range(1, 8):
    video_path = f"{reels_dir}/reel_{i}.mp4"
    thumb_path = f"{reels_dir}/reel_{i}_thumb.jpg"
    
    if not os.path.exists(video_path):
        print(f"Video {video_path} does not exist. Skipping.")
        continue
        
    print(f"Extracting frame from {video_path}...")
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        print(f"Error opening video file {video_path}")
        continue
        
    # Get frame rate to jump to 1 second (or frame number 30)
    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps <= 0:
        fps = 30
    
    # Set frame position to 1 second
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(fps * 1.0))
    
    ret, frame = cap.read()
    if not ret:
        # Fallback to the first frame if jumping to 1 second fails
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        ret, frame = cap.read()
        
    if ret:
        # Save as JPG
        cv2.imwrite(thumb_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
        print(f"Successfully saved thumbnail: {thumb_path}")
    else:
        print(f"Could not read frame from {video_path}")
        
    cap.release()

print("Thumbnail extraction complete!")
