#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session 
from flask_restful import Resource
from sqlalchemy import desc
from flask_bcrypt import Bcrypt


# Local imports
from config import app, db, api
from models import Car, User, FavoriteCar, ShoppingCart, ForSale, CarImage

bcrypt = Bcrypt(app)
URL_PREFIX = '/api'

app.secret_key = '57d79466ee3cf8a8ba325cf06fdc59b6'
 
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'




# CARS
@app.get('/cars')
def get_all_cars():
    cars = Car.query.all()
    cars_to_dict = [ c.to_dict() for c in cars ]
    return cars_to_dict, 200

@app.get('/cars/<int:id>')
def get_car_by_id(id):
    found_car = Car.query.filter(Car.id == id).first ()
    if found_car:
        return found_car.to_dict(), 200
    else:
        return{ "message": "Not Found"}, 404
    
@app.get("/cars/newest")
def get_newest_cars():
    newest_cars = Car.query.order_by(desc(Car.created_at)).limit(10).all()

    if newest_cars:
        cars_list = [car.to_dict() for car in newest_cars]
        return {"newest_cars": cars_list}, 200
    else:
        return {"message": "Not Found"}, 404
    
@app.post("/cars")
def create_car():
    data = request.json
    try:
        new_car = Car(
            year = data.get("year"),
            make = data.get("make"),
            model = data.get("model"),
            body_style = data.get("body_style"),
            body_color = data.get("body_color"),
            total_miles = data.get("total_miles"),
            engine_horse_power = data.get("engine_horse_power"),
            engine_torque = data.get("engine_torque"),
            price = data.get("price"),
            owner_id = data.get("owner_id")
            
        )
        db.session.add(new_car)
        db.session.commit()

        return new_car.to_dict(), 201
    
    except Exception as e:
        return {"error": f"{e}"}, 404
    
@app.patch("/cars/<int:id>")
def patch_cars(id):
    data = request.get_json()
    car = Car.query.filter(Car.id == id).first()
    if not car:
        make_response(jsonify({"error": "no such car"}), 404)
    try:
        for key in data:
            setattr(car, key, data[key])
        db.session.add(car)
        db.session.commit()
        return make_response(jsonify(car.to_dict()), 201)
    except:
        return make_response(jsonify({"error": "could not update car"}), 405)
    
@app.delete("/cars/<int:id>")
def delete_car(id):
    found_car = Car.query.filter(Car.id == id).first ()
    if found_car:
        db.session.delete(found_car)
        db.session.commit()
        return {}, 204
    else:
        return{ "message": "Not Found"}, 404
    



# USERS
    

@app.get('/users')
def get_all_users():
    users = User.query.all()
    users_to_dict = [ u.to_dict() for u in users ]
    return users_to_dict, 200


@app.get('/users/<int:id>')
def get_user_by_id(id):
    found_user = User.query.filter(User.id == id).first ()
    if found_user:
        return found_user.to_dict(), 200
    else:
        return{ "message": "Not Found"}, 404
    

@app.post("/users")
def new_user():
    data = request.json
    try:
        password_hash =bcrypt.generate_password_hash(data["password"]).decode('utf-8')

        new_user = User(
            first_name = data.get("first_name"),
            last_name = data.get("last_name"),
            city = data.get("city"),
            state = data.get("state"),
            username=data.get("username"),
            password=password_hash
        )
        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 201
    
    except Exception as e:
        return {"error": f"{e}"}, 404
    

@app.patch("/users/<int:id>")
def patch_users(id):
    data = request.get_json()
    user = User.query.filter(User.id == id).first()
    if not user:
        make_response(jsonify({"error": "no such user"}), 404)
    try:
        for key in data:
            setattr(user, key, data[key])
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify(user.to_dict()), 201)
    except:
        return make_response(jsonify({"error": "could not update user"}), 405)
    

@app.delete("/users/<int:id>")
def delete_user(id):
    found_user = User.query.filter(User.id == id).first ()
    if found_user:
        db.session.delete(found_user)
        db.session.commit()
        return {}, 204
    else:
        return{ "message": "Not Found"}, 404


#######################################################################
    # USER SIGNUP 

@app.post(URL_PREFIX + '/users')
def create_user():
    try:
        data = request.json
        password_hash =bcrypt.generate_password_hash(data["password"]).decode('utf-8')
        new_user = User(username=data['username'], password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406


#####################################################################
    
# SESSION LOGIN/LOGOUT#

@app.post(URL_PREFIX + '/login')
def login():
    data = request.json
    user = User.query.filter(User.username==data["username"]).first()
    if user and bcrypt.check_password_hash(user.password_hash, data["password"]):
        session["user_id"] = user.id
        return user.to_dict(), 201
    else:
        return{"message": "Invalid Username or password"}, 401
    

@app.get(URL_PREFIX + "/check_session")
def check_session():
    user_id = session.get("user_id")
    user = User.query.filter(User.id == user_id).first()
    if user:
        return user.to_dict(), 200
    else:
        return {"message": "No logged in user"}, 401
    
# deletes cookie upon logout
@app.delete(URL_PREFIX + "/logout")
def logout():
    session.pop('user_id')
    return {}, 204

###########################################################

# Favorite Car
@app.get('/favoritecars')
def get_all_favorite_cars():
    favoritecars = FavoriteCar.query.all()
    favoritecars_to_dict = [ f.to_dict() for f in favoritecars ]
    return favoritecars_to_dict, 200


@app.get('/favoritecars/<int:id>')
def get_favoritecar_by_id(id):
    found_favoritecar = FavoriteCar.query.filter(FavoriteCar.id == id).first ()
    if found_favoritecar:
        return found_favoritecar.to_dict(), 200
    else:
        return{ "message": "Not Found"}, 404
    


@app.post("/favoritecars")
def create_favoritecar():
    data = request.json
    try:
        new_favoritecar = FavoriteCar(
            user_id = data.get("user_id"),
            car_id = data.get("car_id")
            
        )
        db.session.add(new_favoritecar)
        db.session.commit()

        return new_favoritecar.to_dict(), 201
    
    except Exception as e:
        return {"error": f"{e}"}, 404
    


@app.patch("/favoritecars/<int:id>")
def patch_favoritecars(id):
    data = request.get_json()
    favoritecar = FavoriteCar.query.filter(FavoriteCar.id == id).first()
    if not favoritecar:
        make_response(jsonify({"error": "no such favorite"}), 404)
    try:
        for key in data:
            setattr(favoritecar, key, data[key])
        db.session.add(favoritecar)
        db.session.commit()
        return make_response(jsonify(favoritecar.to_dict()), 201)
    except:
        return make_response(jsonify({"error": "could not update favorite"}), 405)
    
@app.delete("/favoritecars/<int:id>")
def delete_favoritecar(id):
    found_favoritecar = FavoriteCar.query.filter(FavoriteCar.id == id).first ()
    if found_favoritecar:
        db.session.delete(found_favoritecar)
        db.session.commit()
        return {}, 204
    else:
        return{ "message": "Not Found"}, 404


# SHOPPING CART
    
@app.get('/shoppingcarts')
def get_all_shopping_carts():
    shoppingcarts = ShoppingCart.query.all()
    shoppingcarts_to_dict = [ s.to_dict() for s in shoppingcarts ]
    return shoppingcarts_to_dict, 200


@app.get('/shoppingcarts/<int:id>')
def get_shoppingcart_by_id(id):
    found_shoppingcart = ShoppingCart.query.filter(ShoppingCart.id == id).first ()
    if found_shoppingcart:
        return found_shoppingcart.to_dict(), 200
    else:
        return{ "message": "Not Found"}, 404
    
@app.post("/shoppingcarts")
def create_shoppingcart():
    data = request.json
    try:
        new_shoppingcart = ShoppingCart(
            user_id = data.get("user_id"),
            car_id = data.get("car_id")
            
        )
        db.session.add(new_shoppingcart)
        db.session.commit()

        return new_shoppingcart.to_dict(), 201
    
    except Exception as e:
        return {"error": f"{e}"}, 404


@app.patch("/shoppingcarts/<int:id>")
def patch_shoppingcarts(id):
    data = request.get_json()
    shoppingcart = ShoppingCart.query.filter(ShoppingCart.id == id).first()
    if not shoppingcart:
        make_response(jsonify({"error": "no such favorite"}), 404)
    try:
        for key in data:
            setattr(shoppingcart, key, data[key])
        db.session.add(shoppingcart)
        db.session.commit()
        return make_response(jsonify(shoppingcart.to_dict()), 201)
    except:
        return make_response(jsonify({"error": "could not update cart"}), 405)
    

@app.delete("/shoppingcarts/<int:id>")
def delete_shoppingcart(id):
    found_shoppingcart = ShoppingCart.query.filter(ShoppingCart.id == id).first ()
    if found_shoppingcart:
        db.session.delete(found_shoppingcart)
        db.session.commit()
        return {}, 204
    else:
        return{ "message": "Not Found"}, 404
    


##############################################


# FORSALE
    
@app.get('/forsale')
def get_all_for_sale():
    forsale = ForSale.query.all()
    forsale_to_dict = [ r.to_dict() for r in forsale ]
    return forsale_to_dict, 200


@app.get('/forsale/<int:id>')
def get_forsale_by_id(id):
    found_forsale = ForSale.query.filter(ForSale.id == id).first ()
    if found_forsale:
        return found_forsale.to_dict(), 200
    else:
        return{ "message": "Not Found"}, 404
    

@app.post("/forsale")
def create_forsale():
    data = request.json
    try:
        new_forsale = ForSale(
            owner_id = data.get("owner_id"),
            car_id = data.get("car_id")
            
        )
        db.session.add(new_forsale)
        db.session.commit()

        return new_forsale.to_dict(), 201
    
    except Exception as e:
        return {"error": f"{e}"}, 404


@app.patch("/forsale/<int:id>")
def patch_forsale(id):
    data = request.get_json()
    forsale = ForSale.query.filter(ForSale.id == id).first()
    if not forsale:
        make_response(jsonify({"error": "cant post sale"}), 404)
    try:
        for key in data:
            setattr(forsale, key, data[key])
        db.session.add(forsale)
        db.session.commit()
        return make_response(jsonify(forsale.to_dict()), 201)
    except:
        return make_response(jsonify({"error": "could not update sale"}), 405)
    
@app.delete("/forsale/<int:id>")
def delete_forsale(id):
    found_forsale = ForSale.query.filter(ForSale.id == id).first ()
    if found_forsale:
        db.session.delete(found_forsale)
        db.session.commit()
        return {}, 204
    else:
        return{ "message": "Not Found"}, 404


###################################################

# CARIMAGE
    
@app.get('/carimage')
def get_all_car_image():
    carimage = CarImage.query.all()
    carimage_to_dict = [ i.to_dict() for i in carimage ]
    return carimage_to_dict, 200


@app.get('/carimage/<int:id>')
def get_carimage_by_id(id):
    found_carimage = CarImage.query.filter(CarImage.id == id).first ()
    if found_carimage:
        return found_carimage.to_dict(), 200
    else:
        return{ "message": "Not Found"}, 404
    

@app.post("/carimage")
def create_carimage():
    data = request.json
    try:
        new_carimage = CarImage(
            image = data.get("image"),
            car_id = data.get("car_id")
            
        )
        db.session.add(new_carimage)
        db.session.commit()

        return new_carimage.to_dict(), 201
    
    except Exception as e:
        return {"error": f"{e}"}, 404


@app.patch("/carimage/<int:id>")
def patch_carimage(id):
    data = request.get_json()
    carimage = CarImage.query.filter(CarImage.id == id).first()
    if not carimage:
        make_response(jsonify({"error": "cant post image"}), 404)
    try:
        for key in data:
            setattr(carimage, key, data[key])
        db.session.add(carimage)
        db.session.commit()
        return make_response(jsonify(carimage.to_dict()), 201)
    except:
        return make_response(jsonify({"error": "could not update image"}), 405)
    

@app.delete("/carimage/<int:id>")
def delete_carimage(id):
    found_carimage = CarImage.query.filter(CarImage.id == id).first ()
    if found_carimage:
        db.session.delete(found_carimage)
        db.session.commit()
        return {}, 204
    else:
        return{ "message": "Not Found"}, 404





# Transaction history

# @app.get('/purchasehistory')
# def get_all_purchase_history():
#     purchasehistory = PurchaseHistory.query.all()
#     purchasehistory_to_dict = [ p.to_dict() for p in purchasehistory ]
#     return purchasehistory_to_dict, 200

# @app.get('/purchasehistory/<int:id>')
# def get_purchasehistory_by_id(id):
#     found_purchasehistory = PurchaseHistory.query.filter(PurchaseHistory.id == id).first ()
#     if found_purchasehistory:
#         return found_purchasehistory.to_dict(), 200
#     else:
#         return{ "message": "Not Found"}, 404
    
# @app.post("/purchasehistory")
# def create_purchasehistory():
#     data = request.json
#     try:
#         new_purchasehistory = PurchaseHistory(
#             seller = data.get("seller"),
#             buyer = data.get("buyer"),
#             item = data.get("item")
            
#         )
#         db.session.add(new_purchasehistory)
#         db.session.commit()

#         return new_purchasehistory.to_dict(), 201
    
#     except Exception as e:
#         return {"error": f"{e}"}, 404
    
# @app.patch("/purchasehistory/<int:id>")
# def patch_purchasehistory(id):
#     data = request.get_json()
#     purchasehistory = PurchaseHistory.query.filter(PurchaseHistory.id == id).first()
#     if not purchasehistory:
#         make_response(jsonify({"error": "no such transaction"}), 404)
#     try:
#         for key in data:
#             setattr(purchasehistory, key, data[key])
#         db.session.add(purchasehistory)
#         db.session.commit()
#         return make_response(jsonify(purchasehistory.to_dict()), 201)
#     except:
#         return make_response(jsonify({"error": "could not update transaction"}), 405)
    
# @app.delete("/purchasehistory/<int:id>")
# def delete_purchasehistory(id):
#     found_purchasehistory = PurchaseHistory.query.filter(PurchaseHistory.id == id).first ()
#     if found_purchasehistory:
#         db.session.delete(found_purchasehistory)
#         db.session.commit()
#         return {}, 204
#     else:
#         return{ "message": "Not Found"}, 404






    



if __name__ == '__main__':
    app.run(port=5555, debug=True)

