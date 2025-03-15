from database import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

class HabitLog(db.Model, SerializerMixin):
    __tablename__ = 'habit_logs'

    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'), nullable=False)
    date = db.Column(db.Date, default=datetime.utcnow, nullable=False)
    status = db.Column(db.Boolean, default=False)  # True = Completed, False = Missed

    # Relationship with Habit (Many-to-One)
    habit = db.relationship('Habit', back_populates='logs')

    def __init__(self, habit_id, date=None, status=False):
        self.habit_id = habit_id
        self.date = date if date else datetime.utcnow()
        self.status = status

    def save(self):
        """Save habit log entry to the database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete habit log entry from the database."""
        db.session.delete(self)
        db.session.commit()
