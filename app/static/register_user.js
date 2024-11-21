document.addEventListener('DOMContentLoaded', function () {
    const register_form = document.getElementById('register-user-form');

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    register_form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const token = getCookie('jwt_token');
        console.log('Retrieved Token:', token); // Debugging log

        if (!token) {
            console.error('Token is missing');
            alert('Please log in as admin to register a new user.')
            window.location.href = '/HBnB/login';
            return;
        }

        const first_name = document.getElementById("user_first_name").value;
        const last_name = document.getElementById("user_last_name").value;
        const email = document.getElementById("user_email").value;
        const password = document.getElementById("user_password").value;
        const confirm_password = document.getElementById("confirm_user_password").value;

        if (password === confirm_password) {
            console.log("Passwords match ok");
        } else {
            console.error("Passwords do not match!");
            alert('Second password does not match !');
            window.location.href = "/HBnB/register";
            return;
        }

        const userData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
        };

        try {
            const response = await fetch('/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            console.log('Register user response status:', response.status); // Debugging log

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Error: ${errorData.msg}`);
                return;
            }

            const user_data = await response.json();
            console.log('User registered successfully:', user_data);

            // Redirect to the login page
            window.location.href = '/HBnB/login';

        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
});
