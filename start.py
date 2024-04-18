import logging
import os
from server.server_app import create_app

# Set PYTHONPATH to the current root directory
current_root_directory = os.path.dirname(os.path.abspath(__file__))
os.environ['PYTHONPATH'] = current_root_directory

# Import and create the Flask app
app = create_app()

if __name__ == '__main__':
    # Run the Flask app
    app.run(host="0.0.0.0", debug=True, port=8080)
