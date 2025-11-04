from flask import Flask
from app.routes.userRoutes import api  # Import blueprint
from flask_cors import CORS
def createApp():
    app = Flask(__name__)
    CORS(app ,origins=["http://localhost:5173"])
    app.config['SECRET_KEY'] = 'rah'
    # Register blueprint
    app.register_blueprint(api, url_prefix='/')
    
    return app