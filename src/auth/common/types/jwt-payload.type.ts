export type JwtPayload = {
  user: {
    sub: number;
    email: string;
    iat: number;
    exp: number;
    tokenId: string;
  };
};

export type AuthotizationHeader = {
  authorization: string;
};

export type JwtPayloadWithToken = JwtPayload & AuthotizationHeader;
