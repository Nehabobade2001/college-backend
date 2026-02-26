import fetch from 'node-fetch';

async function main() {
    console.log('Logging in...');
    const loginRes = await fetch('http://localhost:5002/auth/franchise/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'coamandubey@gmail.com',
            password: 'password@123',
            otp: 123456
        })
    });
    const loginData = await loginRes.json();
    console.log('Login success?', loginData?.data?.accessToken ? 'Yes' : 'No');

    if (!loginData?.data?.accessToken) {
        console.log(loginData);
        return;
    }

    const token = loginData.data.accessToken;

    console.log('Fetching profile...');
    const profileRes = await fetch('http://localhost:5002/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const profile = await profileRes.json();
    console.log('Profile fetch status:', profileRes.status);
    if (!profile.data?.roles) {
        console.log('No roles data:', profile.data);
    } else {
        console.log('Profile roles:', JSON.stringify(profile.data.roles, null, 2));
    }
}

main().catch(console.error);
