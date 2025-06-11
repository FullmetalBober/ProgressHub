# ProgressHub

ProgressHub is a web application that helps you track your progress on your project goals.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## How to create GITHUB_PRIVATE_KEY environment variable

To use the Github app, you need to create a private key. You can do this by following these steps:

1. Generate a private key in your Github app settings.
2. Save the private key in a file called `private-key.pem` in the root of your project.
3. Run command `openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private-key.pem -out private-key-pkcs8.key` to convert the private key to PKCS8 format.
4. Transform `private-key-pkcs8.key` to base64 format by running `base64 -w 0 private-key-pkcs8.key > private-key-pkcs8.key.base64`.
5. Copy the content of `private-key-pkcs8.key.base64` and set it as the value of the `GITHUB_PRIVATE_KEY` environment variable in your `.env` file.
6. Make sure to add `private-key.pem`, `private-key-pkcs8.key`, and `private-key-pkcs8.key.base64` to your `.gitignore` file to avoid committing sensitive information.

## License

Licensed under the [MIT License](./LICENSE).
as
asd
asd
sa
da
dsa
dasdad
asdasdsadsda
