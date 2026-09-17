# Building dynamic routes with/without generateStaticParams()

## 1. Building dynamic routes without generateStaticParams()

```node
$ next build
  ▲ Next.js 14.2.35
  - Environments: .env.local

   Creating an optimized production build ...
 ✓ Compiled successfully


info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/basic-features/eslint#disabling-rules
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (10/10)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    523 B           102 kB
├ ○ /_not-found                          155 B          87.4 kB
├ ○ /about                               846 B          93.2 kB
├ ○ /account                             183 B          96.1 kB
├ ○ /account/profile                     155 B          87.4 kB
├ ○ /account/reservations                155 B          87.4 kB
├ ○ /cabins                              184 B           101 kB
├ ƒ /cabins/[cabinId]                    294 B          92.7 kB
└ ○ /icon.png                            0 B                0 B
+ First Load JS shared by all            87.2 kB
  ├ chunks/2200cc46-8888eb43b3e410d8.js  53.6 kB
  ├ chunks/945-67e69556dfc1e382.js       31.7 kB
  └ other shared chunks (total)          1.86 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

```

---

## 2. Building dynamic routes with generateStaticParams()

### The JS function

```js
// @app/cabins/[cabinId]/page.js
// right after generateMetadata() and before Page()
export async function generateStaticParams() {
	const cabins = await getCabins();
	const ids = cabins.map((cabin) => {
		return { cabinId: `${cabin.id}` };
	});

	return ids;

	// Here is a sample ↓↓
	// [
	// 	{ cabinId: '387' },
	// 	{ cabinId: '388' },
	// 	{ cabinId: '389' },
	// 	{ cabinId: '390' },
	// 	{ cabinId: '391' },
	// 	{ cabinId: '392' },
	// 	{ cabinId: '393' },
	// 	{ cabinId: '394' },
	// ]
}
```

### The pnpm build outcome

```node
$ next build
  ▲ Next.js 14.2.35
  - Environments: .env.local

   Creating an optimized production build ...
 ✓ Compiled successfully


info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/basic-features/eslint#disabling-rules
 ✓ Linting and checking validity of types
 ✓ Collecting page data
   Generating static pages (0/18)  [=   ]{ cabinId: '389' }
{ cabinId: '389' }
{ cabinId: '387' }
{ cabinId: '387' }
   Generating static pages (2/18)  [==  ]{ cabinId: '391' }
{ cabinId: '391' }
{ cabinId: '392' }
{ cabinId: '392' }
{ cabinId: '388' }
{ cabinId: '388' }
   Generating static pages (9/18)  [=== ]{ cabinId: '393' }
{ cabinId: '393' }
   Generating static pages (16/18)  [ ===]{ cabinId: '390' }
{ cabinId: '390' }
{ cabinId: '394' }
{ cabinId: '394' }
 ✓ Generating static pages (18/18)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    523 B           102 kB
├ ○ /_not-found                          155 B          87.4 kB
├ ○ /about                               846 B          93.2 kB
├ ○ /account                             183 B          96.1 kB
├ ○ /account/profile                     155 B          87.4 kB
├ ○ /account/reservations                155 B          87.4 kB
├ ○ /cabins                              184 B           101 kB
├ ● /cabins/[cabinId]                    294 B          92.7 kB
├   ├ /cabins/387
├   ├ /cabins/388
├   ├ /cabins/389
├   └ [+5 more paths]
└ ○ /icon.png                            0 B                0 B
+ First Load JS shared by all            87.2 kB
  ├ chunks/2200cc46-8888eb43b3e410d8.js  53.6 kB
  ├ chunks/945-67e69556dfc1e382.js       31.7 kB
  └ other shared chunks (total)          1.86 kB


○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses getStaticProps)
```
