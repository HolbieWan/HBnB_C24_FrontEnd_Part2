"""
Front_end controller module
"""

from flask import Blueprint, render_template, session

home_bp = Blueprint('home', __name__)


@home_bp.route('/')
def home():
    return render_template('index.html', current_page='places')

@home_bp.route('/place')
def home_place():
    return render_template('place_details.html', current_page='place-details')

@home_bp.route('/login')
def home_login():
    return render_template('login.html', current_page='login')

@home_bp.route('/register_user')
def home_register_new_user():
    return render_template('register_new_user.html', current_page='register_user')

@home_bp.route('/register_place')
def home_register_new_place():
    return render_template('register_new_place.html', current_page='register-place')

@home_bp.route('/<user_id>/my_account')
def home_user_account(user_id):
    return render_template('user_account.html', current_page='user_places')

@home_bp.route('/places/<place_id>/update_place')
def home_update_place(place_id):
    return render_template('update_place.html', current_page='update_place')

@home_bp.route('/reviews/<place_id>/<review_id>/update_review')
def home_update_review(place_id, review_id):
    return render_template('update_review.html', current_page='update_review')

@home_bp.route('/update_user_datas')
def home_update_user_account():
    return render_template('update_user_datas.html', current_page='update_user_datas')