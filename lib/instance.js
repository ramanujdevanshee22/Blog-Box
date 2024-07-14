import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { adapter } from './adapter';

const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});



module.exports = {
  lucia,

};
