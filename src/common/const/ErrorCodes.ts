export function getEnumKeyValuePairs<T>(
  enumObj: T,
): { key: string; value: string }[] {
  return Object.keys(enumObj)
    .filter((key) => typeof enumObj[key as keyof T] === 'string') // Filter out numeric values in reverse-mapped enums (if any)
    .map((key) => ({
      key,
      value: enumObj[key as keyof T] as string,
    }))
}

export enum ErrorCodes {
  CANNOT_DELETE_SUPER_ADMIN = 'Cannot delete this user',
  CANNOT_DELETE_LOGGED_IN_USER = 'Cannot delete the logged in user',
  CANNOT_CHANGE_SUPER_ADMIN = 'Cannot change the super admin',
  // 400 - Bad Request Errors
  BAD_REQUEST = 'Bad Request',
  INVALID_INPUT = 'The input provided is not valid. Please check your request data.',
  // 401 - Unauthorized Errors
  UNAUTHORIZED = 'You are not authorized to access this resource.',
  INVALID_TOKEN = 'The token provided is invalid or expired. Please log in again.',
  NOT_AUTHENTICATED_LOGIN = 'You are not authenticated. Please log in to access this resource.',
  NOT_UNAUTHORIZED_ACTION = 'You are not authorized to perform this action.',

  // 403 - Forbidden Errors
  FORBIDDEN = 'Access is forbidden.',
  INVALID_CREDENTIALS = 'Invalid credentials provided. Please check your username and password.',
  ACCESS_DENIED = 'You do not have permission to access this resource.',

  // 404 - Not Found Errors
  NOT_FOUND = 'Not Found',
  ITEM_NOT_FOUND = 'Item not found, Please check the given item ID',

  // 409 - Conflict Errors
  CONFLICT = 'Conflict',
  DUPLICATE_ENTRY = 'A resource with the same unique identifier already exists.',

  // 500 - Internal Server Errors
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  SERVER_ERROR = 'An unexpected error occurred on the server. Please try again later.',

  // 503 - Service Unavailable
  SERVICE_UNAVAILABLE = 'Service is Unavailable. Please try again later.',
  MAINTENANCE_MODE = 'The service is temporarily unavailable due to maintenance. Please try again later.',

  // Custom Error Codes
  ID_NOT_FOUND = 'Please provide a valid ID.',
  USER_NOT_FOUND = 'User with {{email}} not found, Please provide a valid email address',
  INVALID_ROLE = 'Invalid role provided, Please check the role ID',
  ROLE_ASSIGNED_TO_USER = 'Role is assigned to user, Please remove the role from the user and try again',
  UNAUTHORIZED_ACTION = 'You are not authorized to perform this action',
  DUPLICATE_EMAIL_INPUT = 'User with this {{email}} already exists, Please provide a unique email address',
  USER_WITH_ROLE_NOT_FOUND = 'User with this role not found, Please provide a valid role ID',
  USER_CANNOT_CHANGE_EMAIL = 'User cannot change his/her email, Please provide a valid email address',

  // AUTHENTICATION ERRORS and MESSAGES
  AUTH_TOKEN = 'Authentication token is required',
  AUTH_TOKEN_INVALID = 'Invalid token provided',
  AUTH_TOKEN_EXPIRED = 'Token has expired, Please log in again',
  AUTH_TOKEN_NOT_FOUND = 'Authentication Token is not found ',

  INVALID_OTP_INPUT = 'Invalid OTP {{otp}} provided, Please provide a valid OTP',
  INVALID_PASSWORD_INPUT = 'Invalid {{password}} provided, Please provide a valid password',
  USER_ACTIVATION_IS_PENDING = 'User activation is pending, Please activate the user and try again',
  USER_IS_INACTIVE = 'User with {{email}} is inactive, Please activate the user and try again',
  USER_IS_BLOCKED = 'User with {{email}} is blocked, Please contact the administrator',
  INVALID_USER_AND_PASSWORD = 'Email and password both are required to login, Please provide a valid email and password',
  INVALID_USER_TYPE = 'Invalid user type provided, Please provide a valid user type',
  USER_CAN_NOT_BE_HARD_DELETED = 'User can not be deleted permanently from User list, Please use soft delete option',

  // ROLE ERRORS and MESSAGES
  ROLE_NOT_FOUND = 'Role with {{roleId}} not found, Please provide a valid role ID',
  NO_ROLES_FOUND = 'No roles found, Please provide a valid role ID',
  PERMISSIONS_NOT_FOUND = 'Permissions not found, Please provide a valid permission ID',
  CANNOT_DELETE_PRIMARY_ROLE = 'Primary role cannot be deleted, Please provide a valid role ID',
  ROLE_CAN_NOT_BE_HARD_DELETED = 'Role can not be deleted permanently from Role list, Please use soft delete option',

  // Application Specific Error Codes
  APP_SETTINGS_NOT_FOUND = 'Application settings not found, Please check the application settings',
  INVALID_2FA_SETTINGS = 'Invalid 2FA settings provided, At least one of the captcha, OTP SMS and OTP Email should be enabled',
  NO_FILES_UPLOADED = 'No files uploaded, Please upload at least one file',
  FILE_UPLOAD_FAILED = 'File upload failed, Please try again',
  NO_FILE_FOUND = 'No file found, Please provide a valid file',

  // File Upload Error Codes
  INVALID_FILE_FORMAT = 'Invalid file format: {{name}} , Please provide a valid file with format ({{allowed}})',
  INVALID_FILE_SIZE = 'Invalid file size, Please provide a file with size less than 20MB',
  INVALID_FILE_TYPE = 'Invalid file: {{name}}, Extension: {{type}}, Valid Types: ({{allowed}})',
  ZERO_BYTE_FILE = 'File was saved as 0 bytes, Please provide a valid file',

  // Project Error Codes
  PROJECT_NOT_FOUND = 'Project not found, Please provide a valid project ID',
  PROJECT_ALREADY_EXISTS = 'Project with this name already exists, Please provide a unique project name',
  PROJECT_NAME_ALREADY_EXISTS = 'Project with this name: {{name}}, already exists in the this organization, Please provide a unique project name',
  PROJECT_CAN_NOT_BE_HARD_DELETED = 'Project can not be deleted permanently from Project list, Please use soft delete option',

  // Organization Error Codes
  ORGANIZATION_NOT_FOUND = 'Organization not found, Please provide a valid organization ID',
  ORGANIZATION_ALREADY_EXISTS = 'Organization with this name already exists, Please provide a unique organization name',
  ORGANIZATION_CAN_NOT_BE_HARD_DELETED = 'Organization can not be deleted permanently from Organization list, Please use soft delete option',

  // Module Error Codes
  MODULE_NOT_FOUND = 'Module not found, Please provide a valid module ID',
  MODULE_CAN_NOT_BE_HARD_DELETED = 'Module can not be deleted permanently from Module list, Please use soft delete option',

  // Coupon Error Codes
  COUPON_NOT_FOUND = 'Coupon not found, Please provide a valid coupon ID',
  COUPON_ALREADY_REDEEMED = 'Coupon is already redeemed, Please provide a valid coupon',
  COUPON_EXPIRED = 'Coupon is expired, Please provide a valid coupon',
  COUPON_CAN_NOT_BE_HARD_DELETED = 'Coupon can not be deleted permanently from Coupon list, Please use soft delete option',
  INVALID_COUPON_CODE = 'Invalid coupon code "{{couponCode}}" provided, Please provide a valid coupon code',

  // Offer Error Codes
  OFFER_NOT_FOUND = 'Offer not found, Please provide a valid offer ID',
  OFFER_DISCOUNT_VALUE_EXCEEDS_MAX_AMOUNT = 'Offer discount value exceeds the maximum amount, Please provide a valid discount value',
  OFFER_START_DATE_GREATER_THAN_END_DATE = 'Offer start date cannot be greater than end date, Please provide a valid start and end date',
  OFFER_USAGE_LIMIT_MUST_BE_GREATER_THAN_ZERO = 'Offer usage limit must be greater than zero, Please provide a valid usage limit',
  OFFER_EXPIRED = 'Offer is expired',

  // Package Error Codes
  PACKAGE_NOT_FOUND = 'Package not found, Please provide a valid package ID',
  DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE = 'Discounted price must be less than the original price',
  OFFER_MIN_ORDER_AMOUNT_MUST_BE_LESS_THAN_PRICE = 'Your Price must be greater than the minimum order amount',
  OFFER_IS_ALREADY_USED = 'Offer is already used, Please provide a valid offer',
  OFFER_CAN_NOT_BE_APPLIED = 'Offer can not be applied, Please provide a valid offer',
  OFFER_CAN_NOT_BE_HARD_DELETED = 'Offer can not be deleted permanently from Offer list, Please use soft delete option',
  PACKAGE_CAN_NOT_BE_HARD_DELETED = 'Package can not be deleted permanently from Package list, Please use soft delete option',

  // Plan Error Codes
  PLAN_NOT_FOUND = 'Plan not found, Please provide a valid plan ID',
  PLAN_NAME_ALREADY_EXISTS = 'Plan with this name: {{name}}, already exists in the this organization, Please provide a unique plan name',
  PLAN_CAN_NOT_BE_HARD_DELETED = 'Plan can not be deleted permanently from Plan list, Please use soft delete option',

  // Subscription Error Codes
  SUBSCRIPTION_NOT_FOUND = 'Subscription not found, Please provide a valid subscription ID',
  SUBSCRIPTION_CAN_NOT_BE_HARD_DELETED = 'Subscription can not be deleted permanently from Subscription list, Please use soft delete option',
}
