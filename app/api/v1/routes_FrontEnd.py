"""
Front_end controller module
"""

from flask import Blueprint, render_template

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

# @home_bp.route('/add_review')
# def home_add_review():
#     return render_template('add_review.html', current_page='add-review')

@home_bp.route('/register')
def home_register_new_user():
    return render_template('register_new_user.html', current_page='register')