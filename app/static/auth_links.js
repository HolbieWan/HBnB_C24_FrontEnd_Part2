document.addEventListener('DOMContentLoaded', function () {
    const navMenu = document.getElementById('nav-menu');
    const jwtToken = getCookie('jwt_token');

    if (jwtToken) {
        const registerPlaceLink = document.createElement("li");
        registerPlaceLink.classList.add("nav-item");
        registerPlaceLink.innerHTML = '<a href="/HBnB/register_place" class="nav-link">Add_place</a>';
        navMenu.appendChild(registerPlaceLink);

        const registerUserLink = document.createElement("li");
        registerUserLink.classList.add("nav-item");
        registerUserLink.innerHTML = '<a href="/HBnB/register_user" class="nav-link">Add_user</a>';
        navMenu.appendChild(registerUserLink);

        const userId = getCookie("user_id");
        if (userId) {
          const userPlacesLink = document.createElement("li");
          userPlacesLink.classList.add("nav-item");
          userPlacesLink.innerHTML = `<a href="/HBnB/${userId}/places" class="nav-link">My_places</a>`;
          navMenu.appendChild(userPlacesLink);
        }

        const logoutLink = document.createElement('li');
        logoutLink.classList.add('nav-item');
        logoutLink.innerHTML = '<a href="#" class="nav-link" id="logout-button">Logout</a>';
        navMenu.appendChild(logoutLink);

        document.getElementById('logout-button').addEventListener('click', async function () {
            await logout();
        });
    } else {
        const loginLink = document.createElement('li');
        loginLink.classList.add('nav-item');
        loginLink.innerHTML = '<a href="/HBnB/login" class="nav-link">Login</a>';
        navMenu.appendChild(loginLink);
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function logout() {
    try {
        const response = await fetch('/api/v1/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie('jwt_token')}`
            }
        });

        if (response.ok) {
            clearCookies();
            window.location.href = '/HBnB';
        } else {
            console.error('Failed to log out');
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

function clearCookies() {
    document.cookie = 'jwt_token=; path=/HBnB; expires=0; secure; SameSite=Strict';
    document.cookie = 'user_id=; path=/HBnB; expires=0; secure; SameSite=Strict';
}
