import os

user_profile = os.environ.get("USERPROFILE", "")
network_dir = os.path.join(user_profile, "AppData", "Local", "Google", "Chrome", "User Data", "Profile 3", "Network")

if os.path.exists(network_dir):
    print("Network directory files:")
    for f in os.listdir(network_dir):
        if f.startswith("Cookies"):
            path = os.path.join(network_dir, f)
            print(f"  {f}: {os.path.getsize(path)} bytes")
else:
    print("Network directory does not exist.")












