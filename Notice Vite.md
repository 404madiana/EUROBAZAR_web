# (iana) Utiliser Vite

La création du projet s'est fait en tapant au terminal `npm create vite@latest` (juste un mémo, pas la peine de le faire).

Pour preview le site localement, `npm run dev` pour lancer le serveur,<br>
puis `o` pour ouvrir la page dans un nouvel onglet web.

# (iana) Déploiement sur GitHub pages

Le chantier du site est prévisualisable sur [https://404madiana.github.io/EUROBAZAR_web/](https://404madiana.github.io/EUROBAZAR_web/).<br>
Ce chantier a pour principe de viualiser la construction en temps réel du site pour les non contributeurs.<br>Il serait alors un aperçu beta du rendement final lors du déploiement sur Vercel.

- Je tiens à remercier [sitek94](https://github.com/sitek94) avec l'[Action Deploy Vite App](https://github.com/sitek94/vite-deploy-demo) pour configurer [deploy.yml](https://github.com/404madiana/EUROBAZAR_web/blob/master/.github/workflows/deploy.yml). Ce fichier permet de build et deployer automatiquement à chaque push d'office sur la branche `master`.
- Je tiens à créditer [EminDevNoth](https://github.com/EminDevNoth) pour son [Workflow runs remover](https://github.com/marketplace/actions/workflow-runs-remover) qui a épargné mon historique de déploiement.

<br/>

_Ci dessous une notice en anglais généré par Vite lors de l'initiation au framework.._

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.