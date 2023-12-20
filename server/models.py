from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates


from config import db

###### USER ######
class User(db.Model, SerializerMixin):
   
    __tablename__ = "users_table"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String,nullable = False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    password_hash = db.Column(db.String)
    
    # car to user 
    owned_cars = db.relationship("Car", back_populates="user_obj", cascade="all, delete-orphan")

    #shopping cart to user
    shopping_cart = db.relationship("ShoppingCart", back_populates="user_obj", cascade="all, delete-orphan")

    # favorite car to user
    favorite_cars = db.relationship("FavoriteCar", back_populates="user_obj", cascade="all, delete-orphan")

    # for sale to user
    for_sale = db.relationship("ForSale", back_populates="user_obj", cascade="all, delete-orphan")

    serialize_rules = ("-owned_cars", "-shopping_cart", "-favorite_cars", "-for_sale")
    
    @validates('name')
    def validate_name(self, key, val):
        if 2 <= len(val) <= 35 and val.capitalize():
            return val
        else:
            raise ValueError("Name must be between 2-35 characters and case sensititve")
        
    @validates('state')
    def validate_state(self, key, val):
        if 1 <= len(val) <= 2 and val.capitalize():
            return val
        else:
            raise ValueError("State must be 2 characters and case sensititve")
        
###### CAR ######
class Car(db.Model, SerializerMixin):

    __tablename__ = "cars_table"

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable = False)
    make = db.Column(db.String, nullable = False)
    model = db.Column(db.String, nullable = False)
    body_style = db.Column(db.String, nullable=False)
    body_color = db.Column(db.String, nullable = False)
    total_miles = db.Column(db.Integer, nullable = False)
    engine_horse_power = db.Column(db.Integer, nullable = False)
    engine_torque = db.Column(db.Integer, nullable = False)
    price = db.Column(db.Integer, nullable = False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now(), nullable=True)

    # car to owner relationship
    user_obj = db.relationship("User", back_populates="owned_cars")

    # cars to shopping cart relationship
    shopping_cart = db.relationship("ShoppingCart", back_populates="car_obj", cascade="all, delete-orphan")

    # cars to favorite car relationship
    favorite_cars = db.relationship("FavoriteCar", back_populates="car_obj", cascade="all, delete-orphan")
    
    # cars to for sale relationship
    for_sale = db.relationship("ForSale", back_populates="car_obj", cascade="all, delete-orphan")

    images = db.relationship("CarImage", back_populates="car_obj", cascade="all, delete-orphan")
    
    serialize_rules = ("-user_obj.owned_cars", "-shopping_cart.car_obj", "-favorite_cars.car_obj", "-for_sale.car_obj", "-images.car_obj")

###### Favorited Cars #######
class FavoriteCar(db.Model, SerializerMixin):

    __tablename__ = "favorite_cars_table"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"), nullable = False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars_table.id"), nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_obj = db.relationship("User", back_populates="favorite_cars")
    car_obj = db.relationship("Car", back_populates="favorite_cars")

    serialize_rules = ("-user_obj", "-car_obj.favorite_cars")


###### SHOPPING CART ######
class ShoppingCart(db.Model, SerializerMixin):

    __tablename__ = "shopping_cart_table"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars_table.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_obj = db.relationship("User", back_populates="shopping_cart")
    car_obj = db.relationship("Car", back_populates="shopping_cart")

    serialize_rules = ("-user_obj", "-car_obj.shopping_cart")


###### FOR SALE MODEL ######
    
class ForSale(db.Model, SerializerMixin):
    __tablename__ = "for_sale_table"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users_table.id"), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars_table.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    car_obj = db.relationship("Car", back_populates="for_sale")
    user_obj = db.relationship("User", back_populates="for_sale")

    serialize_rules=("-car_obj.for_sale", "-user_obj")

###### CAR IMAGES TABLE ######
class CarImage(db.Model, SerializerMixin):
    __tablename__ = "car_images_table"
    
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars_table.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    car_obj = db.relationship("Car", back_populates="images")

    serialize_rules=("-car_obj.images",)


# # PURCHASE HISTORY 

# class PurchaseHistory(db.Model, SerializerMixin):

#     __tablename__ = "purchase_history"

#     id = db.Column(db.Integer, primary_key=True)
#     seller = db.Column(db.Integer, nullable=False)
#     buyer = db.Column(db.Integer, nullable=False)
#     item = db.Column(db.Integer, nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())


# # for sale 

