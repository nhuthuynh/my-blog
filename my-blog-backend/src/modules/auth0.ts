import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

export const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.Auth0_JwksUri
    }),
    audience: process.env.AuthO_Audience,
    issuer: process.env.AuthO_Issuer,
    algorithms: ['RS256']
});

export const checkScopes = (scopes: Array<string> = []) => jwtAuthz(scopes)