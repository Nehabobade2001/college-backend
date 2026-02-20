# 🚀 Quick Start Guide - Role-Based Authentication

## ✅ System Status
Your NestJS application is **RUNNING SUCCESSFULLY** on port 3000!

## 📋 Available API Endpoints

### Admin Panel
- `POST /api/auth/admin/request-otp` - Request OTP for admin login
- `POST /api/auth/admin/verify-otp` - Verify OTP and get access token
- `GET /api/auth/admin/dashboard` - Admin dashboard (Protected)

### Franchise Panel
- `POST /api/auth/franchise/request-otp` - Request OTP for franchise login
- `POST /api/auth/franchise/verify-otp` - Verify OTP and get access token
- `GET /api/auth/franchise/dashboard` - Franchise dashboard (Protected)

### Student Panel
- `POST /api/auth/student/request-otp` - Request OTP for student login
- `POST /api/auth/student/verify-otp` - Verify OTP and get access token
- `GET /api/auth/student/dashboard` - Student dashboard (Protected)

### Common Endpoints
- `GET /api/auth/profile` - Get current user profile (Protected)
- `POST /api/auth/forgot-password` - Request password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP
- `POST /api/auth/logout` - Logout user (Protected)

## 🧪 Testing with cURL

### 1. Request OTP (Admin)
```bash
curl -X POST http://localhost:3000/api/auth/admin/request-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### 2. Verify OTP & Login
```bash
curl -X POST http://localhost:3000/api/auth/admin/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123",
    "otp": 123456
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "roles": ["Admin"]
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Access Protected Route
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Admin Dashboard
```bash
curl -X GET http://localhost:3000/api/auth/admin/dashboard \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📦 Import Postman Collection

1. Open Postman
2. Click **Import** button
3. Select `postman_collection.json` file
4. Collection will be imported with all endpoints ready to test
5. Update `baseUrl` variable if needed (default: http://localhost:3000/api)

## 🔐 Role-Based Access Control

### How to Protect Your Routes

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/auth/jwt.guard';
import { RolesGuard } from '@/common/auth/roles.guard';
import { Roles } from '@/common/decorators/Roles.decorator';

@Controller('api/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Organization Admin')
export class AdminController {
  @Get('users')
  getAllUsers() {
    return { message: 'Admin only route' };
  }
}
```

## 🎯 Key Features Implemented

✅ **Separate Login Endpoints** - Admin, Franchise, Student
✅ **OTP-Based Authentication** - Secure 2-step verification
✅ **JWT Token Management** - Secure token-based auth
✅ **Role-Based Access Control** - Fine-grained permissions
✅ **Password Reset** - Forgot password with OTP
✅ **Logout Functionality** - Token invalidation
✅ **Professional Error Handling** - Standardized responses
✅ **TypeScript Validation** - DTOs with class-validator

## 📁 Project Structure

```
src/
├── common/
│   ├── auth/
│   │   ├── jwt.guard.ts          # JWT authentication
│   │   ├── jwt.strategy.ts       # JWT strategy
│   │   └── roles.guard.ts        # Role authorization
│   ├── decorators/
│   │   ├── Roles.decorator.ts    # @Roles() decorator
│   │   └── CurrentUser.ts        # @CurrentUser() decorator
│   └── const/
│       ├── PermissionConst.ts    # Permission definitions
│       └── CustomStatus.ts       # Status enums
├── modules/
│   └── auth/
│       ├── auth.controller.ts    # REST API endpoints
│       ├── auth.service.ts       # Business logic
│       ├── auth.module.ts        # Module configuration
│       └── auth-controller.dto.ts # Request validation
└── entities/
    ├── User.ts                   # User entity
    ├── Role.ts                   # Role entity
    ├── Permissions.ts            # Permission entity
    └── ...                       # Other entities
```

## 🔧 Environment Variables

Make sure your `.env.development` has:

```env
JWT_SECRET_KEY=your-secret-key-here
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=your-database
```

## 📝 Next Steps

1. **Create Test Users** in your database with different roles
2. **Test All Endpoints** using Postman collection
3. **Customize Permissions** in `PermissionConst.ts`
4. **Add More Roles** as needed (Manager, Teacher, etc.)
5. **Implement Refresh Tokens** for better security
6. **Add Rate Limiting** to prevent abuse
7. **Setup Email/SMS** for OTP delivery

## 🐛 Troubleshooting

### OTP Not Received?
- Check `AppSetting` table for OTP configuration
- OTP is logged in console for development (check terminal)
- Default OTP: `123456` (for testing)

### Unauthorized Error?
- Ensure JWT token is valid and not expired
- Check if user has required role
- Verify `Authorization: Bearer <token>` header format

### Database Connection Error?
- Verify database credentials in `.env.development`
- Ensure MySQL/MariaDB is running
- Run migrations if needed

## 📚 Documentation

- Full API Documentation: `AUTH_DOCUMENTATION.md`
- Postman Collection: `postman_collection.json`
- Permission Constants: `src/common/const/PermissionConst.ts`

## 🎉 Success!

Your professional role-based authentication system is ready to use!

**Test it now:**
```bash
# Quick test
curl http://localhost:3000/api/auth/admin/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

---
**Built with ❤️ using NestJS, TypeORM, and JWT**
