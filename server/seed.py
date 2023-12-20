#!/usr/bin/env python3

# Standard library imports
from random import randint, choice

# Remote library imports
from faker import Faker
from flask_bcrypt import Bcrypt
# Local imports
from app import app
from models import db, Car, User, FavoriteCar, ShoppingCart, ForSale, CarImage

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        bcrypt = Bcrypt(app)

        print("Starting seed...")

        Car.query.delete()
        User.query.delete()
        FavoriteCar.query.delete()
        ShoppingCart.query.delete()
        ForSale.query.delete()
        CarImage.query.delete()

        
        year_list = [
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
            2021,
            2022,
            2023,
        ]

        state_list = [
            "AL",
            "AK",
            "AZ",
            "AR",
            "CA",
            "CO",
            "CT",
            "DE",
            "DC",
            "FL",
            "GA",
            "HI",
            "ID",
            "IL",
            "IN",
            "IA",
            "KS",
            "KY",
            "LA",
            "ME",
            "MT",
            "NE",
            "NV",
            "NH",
            "NJ",
        ]

        ####################
        ## USERS

        users_list = []

        for _ in range(0, 5):
            password_hash=bcrypt.generate_password_hash("123").decode('utf-8')
            u = User(first_name=fake.first_name(), last_name=fake.last_name(), city=fake.company(), state=choice(state_list).capitalize(), username=fake.company(), password=password_hash)

            users_list.append(u)

        db.session.add_all(users_list)
        db.session.commit()

        print("seeded users")

        #####################
        ## CARS

        cars_list = []

        for _ in range(0, 5):
            c = Car(
                year=choice(year_list),
                make=fake.company(),
                model=fake.company(),
                body_style=fake.company(),
                body_color=fake.color(),
                total_miles=randint(0, 1000000),
                engine_horse_power=randint(100, 1000),
                engine_torque=randint(150, 1000),
                price=randint(20000, 175000),
                user_obj = choice(users_list)
            )

            cars_list.append(c)

        db.session.add_all(cars_list)
        db.session.commit()

        print("seeded cars")


        #################
        ## Favorite Cars

        # favorite_cars_list = []

        # for _ in range(0, 5):
        #     f = FavoriteCar(
        #         user_id=choice(users_list).id,
        #         car_id=choice(cars_list).id,
        #     )

        #     favorite_cars_list.append(f)

        # db.session.add_all(favorite_cars_list)
        # db.session.commit()

        # print("seeded favorite cars")

        ###############
        ## Shopping Cart

        # shopping_cart_list = []

        # for _ in range(0, 5):
        #     s = ShoppingCart(
        #         user_id=choice(users_list).id,
        #         car_id=choice(cars_list).id
        #         )

        #     shopping_cart_list.append(s)

        # db.session.add_all(shopping_cart_list)
        # db.session.commit()

        # print("seeded shopping cart")

        ############
        # For Sale

        for_sale_list = []
        unique_cars = set()

        while len(unique_cars) < len(cars_list):
            user = choice(users_list)
            car = choice([car for car in cars_list if car.id not in unique_cars])
            
            unique_cars.add(car.id)
            
            b = ForSale(
                owner_id=user.id,
                car_id=car.id
            )

            for_sale_list.append(b)

        db.session.add_all(for_sale_list)
        db.session.commit()

        print("seeded for sale")

        image_list= [
            "https://www.cnet.com/a/img/resize/7411f2fbb73e8a8f323cdb227ca198d4d3d2a3cf/hub/2021/10/13/b8024a0e-b1a4-400c-96d5-1d68ee22e498/2022-bmw-m5-cs-011.jpg?auto=webp&width=1920",
            "https://www.carscoops.com/wp-content/uploads/2020/10/bmw-m5-e60.jpg",
            "https://absautorepair.com/cdn/shop/collections/20190723-_99A2692-Edit-2_1024x1024_2x_95f11bae-4b57-4707-84ca-12914cb713c8_2048x.jpg?v=1659593531",
            "https://www.motortrend.com/uploads/2023/04/2023-Chevrolet-Corvette-Z06-026.jpg",
            "https://wearecurated.com/wp-content/uploads/Mercedes-Benz-C63-Black-Series-White-05949.jpg"
        ]

        car_image_list = []

        for _ in range(0,5):
            i = CarImage(
                image=choice(image_list),
                car_id=choice(cars_list).id
            )

            car_image_list.append(i)

        db.session.add_all(car_image_list)
        db.session.commit()

        print("seeded images")

        