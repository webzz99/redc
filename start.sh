# custom startup script for heroku
#!/bin/sh

cd server && gunicorn run:app -b 0.0.0.0:$PORT
# Install required packages from requirements.txt
echo "Installing required packages..."
pip install -r requirements.txt

# Check if the installation was successfull with exit status is 0
if [ $? -eq 0 ]; then
    echo "Packages installed successfully."
else
    echo "Failed to install packages. Exiting..."
    exit 1
fi

# Run the Flask server
echo "Starting the Flask server..."
python start.py