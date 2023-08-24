# SSR Performance (Sequential vs. Parallel requests)

This benchmark aimed to compare page loading speed with sequential and parallel requests.

```ts
// Sequential
// Source: https://github.com/LukasPolak/ssr-performance/blob/30da70618b1679992e41fbd09449358cc1fdeef7/src/pages/index.tsx#L20-L36
const classes = await getClasses();
const facilities = await getFacilities();
const instructors = await getInstructors();
const locations = await getLocations();
const sports = await getSports();
```

```ts
// Parallel
// Source: https://github.com/LukasPolak/ssr-performance/blob/f73ebaf203b3a9f19431081092142ebfae81df9f/src/pages/index.tsx#L20-L39
const [classes, facilities, instructors, locations, sports] = await Promise.all(
  [getClasses(), getFacilities(), getInstructors(), getLocations(), getSports()]
);
```

## Approach

- production build
- 5 tests with each variant
- comparing average times, calculate improvement (parallel over sequential in %)

## Sequential

| Test # | DCL  | FCP  | LCP  | TTI  |
| ------ | ---- | ---- | ---- | ---- |
| 1      | 3.72 | 3.73 | 3.73 | 3.81 |
| 2      | 3.97 | 3.98 | 3.98 | 4.06 |
| 3      | 3.85 | 3.85 | 3.85 | 3.94 |
| 4      | 4.51 | 4.61 | 4.61 | 4.61 |
| 5      | 3.95 | 3.95 | 3.95 | 4.04 |

## Parallel

| Test # | DCL  | FCP  | LCP  | TTI  |
| ------ | ---- | ---- | ---- | ---- |
| 1      | 1.04 | 1.05 | 1.05 | 1.13 |
| 2      | 1.04 | 1.04 | 1.04 | 1.13 |
| 3      | 0.92 | 0.92 | 0.92 | 1.01 |
| 4      | 1.02 | 1.02 | 1.02 | 1.11 |
| 5      | 0.92 | 1.02 | 1.02 | 1.02 |

## Average Improvement (in %)

| DCL    | FCP    | LCP    | TTI    |
| ------ | ------ | ------ | ------ |
| 304.86 | 298.42 | 298.42 | 278.89 |

## Known Issues

- Error in the console: `API resolved without sending a response for /api/hello, this may result in stalled requests.`

## Glossary

- DCL - DOM Content Loaded (in seconds)
- FCP - First Contentful Pain (in seconds)
- LCP - Largest Contentful Paint (in seconds)
- TTI - Time to Interactive (in seconds)

## Next.js README

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
