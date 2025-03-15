from flask import Flask, jsonify
from flask_migrate import Migrate
from database import db
from models import user, relationship, habit, habit_log, goal  # Import models

# Initialize Flask app
app = Flask(__name__)

# Database Configuration (Ensure correct DB URI)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habit_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Habit Tracker API!"})

# Example route for getting all users
@app.route('/users', methods=['GET'])
def get_users():
    from models.user import User  # Import inside function to avoid circular imports
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])  # Ensure your User model has a `to_dict()` method

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
