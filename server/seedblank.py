from app import app
from models import db, Car, User, FavoriteCar, ShoppingCart, ForSale, CarImage

if __name__ == "__main__":
    with app.app_context():

        print("Starting blank seed...")

        Car.query.delete()
        User.query.delete()
        FavoriteCar.query.delete()
        ShoppingCart.query.delete()
        ForSale.query.delete()
        CarImage.query.delete()

        db.session.commit()

        print("Completed blank seed.")