import { withAuth } from 'next-auth/middleware';

const protectedRoutes = [
  {
    path: '/categories',
    methods: ['POST', 'PUT', 'DELETE'],
  },
  {
    path: '/menu-items',
    methods: ['POST', 'PUT', 'DELETE'],
  },
  {
    path: '/orders',
    methods: ['GET'],
  },
  {
    path: '/profile',
    methods: ['GET', 'PUT'],
  },
  {
    path: '/users',
    methods: ['GET'],
  },
];

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const {
        nextUrl: { pathname },
        method,
      } = req;

      const isProtectedRoute =
        protectedRoutes.findIndex(
          (route) =>
            `/api${route.path}` === pathname && route.methods.includes(method),
        ) > -1;

      if (isProtectedRoute && !token) return false;
      return true;
    },
  },
});

export const config = {
  matcher: '/api/:path*',
};
