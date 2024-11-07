# Rapport de stage

## À propos

Le but du projet est de fournir une page web permettant de générer un
rapport de stage de manière interactive. Vous pouvez utiliser le résultat sur
[https://epfl-fsd.github.io/rapport-de-stage/](https://epfl-fsd.github.io/rapport-de-stage/).

Les documents officiels du canton se trouvent sur
[vd.ch/formation/orientation/faire-des-stages](https://www.vd.ch/formation/orientation/faire-des-stages).

Ce projet est l'initiative de l'équipe [ISAS-FSD] de l'EPFL, et a été 
principalement développé par [Azecko]. Pour toute question ou remarque, merci de
remplir une [issue].

## Pour améliorer "rapport-de-stage" / contribuer

Après avoir cloné le repo, installer les dépendances nécessaires au bon
fonctionnement du projet :
```bash
pnpm install
```

Pour lancer la version de dévelopement :
```bash
pnpm dev
```

On peut ensuite se rendre sur
[http://localhost:3000/rapport-de-stage](http://localhost:3000/rapport-de-stage)
pour voir les résultats. Le mode développement met à jour la page
automatiquement. Un bon point de départ est de commencer par modifier le fichier
`app/page.tsx`.

Pour aller plus loin, consulter la [documentation de
Next.js](https://nextjs.org/docs).


[ISAS-FSD]: https://go.epfl.ch/isas-fsd
[Azecko]: https://github.com/azecko
[issue]: https://github.com/epfl-fsd/rapport-de-stage/issues
