## MyShop e-poe näidisprojekt
Antud veebirakendus hõlmab endas *backend* ning *frontend* osasid.
**Backend** asub `src/pages/api` kaustas ning **frontend** `src/pages` ilma `api` kaustata.

### Olemasolevad komponendid:
* CategoriesMenu (Kategooriate menüü)
* Footer (Jalus)
* Layout (Kõike ümbritsev *wrapper*, et oleks erinevatel lehtedel ühtlane stiil ning ülesehitus)
* MobileNavbar (Päises asuv menüüriba, mis on nähtav ainult väiksematel ekraanidel (nt mobiilides))
* ProductsBlock (*wrapper* tootete kuvamiseks ühes grupis/plokis)
* ProductTile (Üksiku toote vormistus)

### Olemasolevad leheküljed:
* `/` - avaleht
* `/login` - sisse logimiseks
* `/tooted/{slug}` - üksiku toote vaade `slug`-i järgi
* `/kategooriad/{slug}` - toodete vaade mingi kindla kategooria kohta

### API ressursid:
* `/categories` - tagastab kõik kategooriad JSON tekstina
* `/categories/{slug}/products` - tagastab kõik tooted JSON tekstina, mis on mingi kategooria kohta
* `/products` - tagastab kõik tooted JSON tekstina
* `/products/{slug}` - tagastab ühe toote JSON tekstina

### Teenused:
Teenuste all mõtleme neid JS faile, mis koguvad kokku erinevad äriloogikad ning programmeerimisvõtted mingi objekti (kategooria, toote, jne) kohta. Seal võib leida funktsioone salvestamise, pärimise, muutmise ning muude tegevuste kohta mingi kindla asja kohta

* `auth.js` - tegeleb kasutaja sisse-, väljalogimisega ning sessioni haldamisega
* `categories.js` - hoiab endas kategooriatega seotud funktsioone ning muid tegevusi


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


