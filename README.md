### Tech & libraries used:

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- React 18
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- Husky
- Jest and React Testing Library
- Cypress

### Requirements

- Node.js 14+ and npm

### Getting started

Run the following command on your local environment:

```shell
git clone --depth=1 git@github.com:raizal/replicate-exchange.git my-project-name
cd my-project-name
yarn
```

Then, you can run locally in development mode with live reload:

```shell
yarn dev
```

Open http://localhost:3000 with your favorite browser to see your project.

```shell
.
├── README.md                       # README file
├── __mocks__                       # Mocks for testing
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── pages                           # pages routing. will import pages from modules
├── public                          # Public assets folder
├── src
│   ├── components                  # Reusable components
│   ├── modules                     # Modules folder
│   │     └── module-name           # folder name will be based on feature's name 
│   │           ├── api             # folder for data fetching for module
│   │           ├── components      # folder for components used only in the module
│   │           ├── hooks           # hooks folder
│   │           └── pages           # pages for the module
│   ├── styles                      # Shared styles folder
│   ├── types                       # Shared types folder
│   └── utils                       # Utility functions
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

### Deploy to production

You can see the results locally in production mode with:

```shell
$ yarn build
$ yarn start
```
