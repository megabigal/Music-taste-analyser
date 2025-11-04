from flask import Flask

from app import createApp
from app.routes.userRoutes import api  # Import blueprint
#flask --app main run
app = createApp()
if __name__ == "__main__":
    app.run(debug=True)