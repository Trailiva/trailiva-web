export const API_BASE_URL = 'http://localhost:9001/api/v1/trailiva';
export const ACCESS_TOKEN = 'accessToken';
export const VERIFICATION_TOKEN = 'verificationToken'
export const TOKEN_EXPIRY_DATE = 'tokenExpiryDate'
export const AUTH_HEADER = {Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)};