import mysql from 'mysql2/promise';

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'hms'
    });

    const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', ['coamandubey@gmail.com']);
    const user = users[0];
    if (!user) {
        console.log('User not found');
        await connection.end();
        return;
    }
    console.log('User:', user.name, user.email);

    const [userRoles] = await connection.execute('SELECT * FROM user_roles WHERE userId = ?', [user.id]);
    console.log('User roles:', userRoles);

    if (userRoles.length > 0) {
        for (const ur of userRoles) {
            const [roles] = await connection.execute('SELECT * FROM roles WHERE id = ?', [ur.roleId]);
            console.log('Role:', roles[0].name);

            const [rolePerms] = await connection.execute('SELECT p.* FROM permissions p JOIN role_permissions rp ON p.id = rp.permissionId WHERE rp.roleId = ?', [ur.roleId]);
            console.log(`Role ${roles[0].name} has ${rolePerms.length} permissions.`);
            const centerPerms = rolePerms.filter(p => p.module.toLowerCase().includes('center') || p.route?.toLowerCase().includes('center'));
            console.log('Center perms:', centerPerms);

            console.log('All perms slug:', rolePerms.map(p => p.slug).join(', '));
            console.log('All perms routes:', rolePerms.map(p => p.route).filter(Boolean).join(', '));
        }
    }

    await connection.end();
}
main();
