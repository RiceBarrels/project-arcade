---
title: Politique de confidentialité
updated: 2026-10-20
---

::: draft
**BROUILLON — doit être revu par un avocat.** Description factuelle du fonctionnement du site, rédigée en langage clair, pas un avis juridique. Les éléments marqués **[TO CONFIRM]** (à confirmer) n'ont pas été confirmés par le responsable du site. Ne pas publier avant confirmation et révision.
:::

::: summary
**La version courte :** Nous recueillons ce dont nous avons besoin pour faire fonctionner la bibliothèque de prêt, nous le stockons chez notre fournisseur de base de données, et nous ne l'utilisons pas à des fins publicitaires.
:::

## Ce que nous recueillons

- **Informations de compte :** votre adresse e-mail (vérifiée à l'inscription) et vos informations de connexion.
- **Profil :** nom affiché, ville ou secteur, et tout autre détail de profil que vous choisissez d'ajouter.
- **Annonces :** titres, descriptions, catégories, état, secteur de récupération, prix que vous fixez (frais et montant de dédommagement) et photos que vous mettez en ligne.
- **Historique des emprunts :** demandes, inscriptions dans les files, approbations, marquages de remise et de retour (en bon état ou endommagé) et notes associées.
- **Signalements :** les signalements que vous envoyez, et ceux faits à votre sujet ou au sujet de vos annonces.
- **Commentaires :** si vous utilisez « Envoyer des commentaires », nous stockons votre message, le type choisi (bug, idée ou autre), la page sur laquelle vous vous trouviez et une courte note sur votre navigateur. Si vous avez ouvert une session, vos commentaires sont liés à votre compte. Si vous ajoutez des coordonnées pour vous répondre, nous les stockons aussi. [TO CONFIRM: champs exacts, d'après supabase/08-feedback.sql, qui n'existait pas encore au moment de la rédaction de ce texte.]
- **Données techniques de base :** lorsque vous visitez le site, nos fournisseurs d'hébergement et de mesure d'audience traitent des informations techniques de base, comme les pages que vous consultez, votre localisation approximative (pays ou région), ainsi que votre type de navigateur et d'appareil. Voir « Mesure d'audience et cookies » ci-dessous. [TO CONFIRM: journaux du serveur et traitement des adresses IP par Vercel et Supabase. NEEDS REVIEW.]

## Où elles sont stockées

Votre compte, votre profil, vos annonces, votre historique des emprunts et vos photos sont stockés chez Supabase (base de données, authentification et stockage de fichiers). Les données sont stockées au Canada (région Supabase ca-central-1). Le site web est hébergé par Vercel.

## Ce que les autres utilisateurs peuvent voir

Votre profil public est visible par les autres utilisateurs. Il montre votre nom affiché, votre ville ou votre secteur (si vous l'avez ajouté), votre bio, le mois et l'année de votre inscription, ainsi que vos annonces avec leurs photos. Il montre aussi des décomptes simples : le nombre d'objets que vous avez proposés, prêtés et empruntés, le nombre d'objets rendus en bon état et le nombre d'objets endommagés ou perdus (en tant que prêteur et en tant qu'emprunteur). Il n'indique pas à qui vous avez prêté ni auprès de qui vous avez emprunté. [NEEDS REVIEW: vérifié par rapport à components/profile-stats.tsx et à la page de profil le 2026-10-20 ; à revérifier si le profil change.] Votre adresse exacte ne doit pas figurer dans les annonces. Votre adresse e-mail n'est jamais affichée publiquement. Une fois une demande approuvée, le prêteur et l'emprunteur communiquent uniquement par la messagerie interne du site.

## Mesure d'audience et cookies (BROUILLON, à revoir)

Nous utilisons Vercel Web Analytics pour compter les visites des pages, afin de voir quelles parties du site sont utilisées. D'après la documentation de Vercel (page « Privacy and Compliance », dernière mise à jour : 2026-06-26) :
- Ce service n'utilise pas de cookies tiers. Les visiteurs sont distingués les uns des autres au moyen d'une valeur de hachage (hash) créée à partir de la requête entrante.
- Les informations de session du visiteur ne sont pas stockées de façon permanente ; elles sont supprimées au bout de 24 heures.
- Ce service ne recueille pas d'informations qui permettraient à quiconque de vous suivre d'un site web ou d'une application à l'autre, et il ne sert qu'à établir des statistiques d'ensemble.
- Chaque page vue peut inclure : l'heure, le chemin de la page, la page de provenance, la localisation approximative (pays, région, ville), le système d'exploitation et sa version, le navigateur et sa version, ainsi que le type d'appareil (mobile, tablette ou ordinateur de bureau).

Avant l'envoi d'une page vue, nous retirons du chemin de la page les identifiants d'objets, de prêts et de profils, et nous supprimons les paramètres de requête ainsi que tout ce qui suit le signe #. Les liens de nos e-mails (les pages /auth/... qui s'ouvrent lorsque vous cliquez sur un lien d'inscription ou de réinitialisation du mot de passe) ne sont pas du tout transmis, et les autres pages ne sont transmises que sous la forme de leur chemin, par exemple /en/login. Nous n'envoyons pas votre identifiant d'utilisateur. Nous ne pouvons pas modifier la page de provenance, que l'outil de mesure d'audience inclut de lui-même. [NEEDS REVIEW: d'après la vérification du code faite par le développeur le 2026-10-20.]

Nous n'utilisons pas ces données pour afficher de la publicité, et nous ne les vendons pas.

Cookies : le site définit deux types de cookies, tous deux nécessaires à son fonctionnement.
- Un cookie de connexion, défini par notre fournisseur de connexion (Supabase), maintient votre session ouverte. Il peut être divisé en plusieurs parties.
- Un cookie de langue mémorise la langue que vous avez choisie. Il dure 1 an.

Le site enregistre aussi votre réglage « Vibrer au toucher » et votre progression dans les écrans de prise en main dans le stockage local de votre navigateur, sur votre propre appareil. Il ne s'agit pas d'un cookie, et ces données ne nous sont pas envoyées.

Nous ne définissons pas de cookies publicitaires ni de cookies de suivi intersites. [NEEDS REVIEW: d'après la vérification du code faite par le développeur le 2026-10-20 ; à revérifier à chaque ajout.]

[TO CONFIRM: à vérifier auprès de Vercel ou dans le tableau de bord, car ce n'est pas indiqué dans la page de documentation ci-dessus : (1) si les adresses IP sont stockées ou seulement utilisées brièvement pour déterminer la localisation approximative ; (2) combien de temps les données agrégées de mesure d'audience sont conservées ; (3) où les données de mesure d'audience sont stockées et traitées. Ne publier aucune affirmation sur ces points avant vérification.]

## Comment nous les utilisons

Pour faire fonctionner le site : afficher les annonces, gérer les files et les demandes, permettre aux prêteurs et aux emprunteurs de communiquer, traiter les signalements et assurer la sécurité du site.

## Ce que nous ne faisons pas

- Nous ne vendons pas vos données.
- Nous n'affichons pas de publicité.
- Le site ne prend aucun paiement, donc nous ne recueillons aucune information de carte ou de compte bancaire.

## Partage

Nous partageons des données avec les fournisseurs de services nécessaires au fonctionnement du site (comme les fournisseurs de base de données et d'hébergement). Nous pouvons divulguer des informations si la loi l'exige. [TO CONFIRM / avocat : liste complète des sous-traitants.]

## Conservation et suppression des données

*Commentaires :* si vous supprimez votre compte, vos commentaires sont conservés, mais ne vous sont plus liés. [TO CONFIRM: correspond à `user_id ON DELETE SET NULL` dans supabase/08-feedback.sql ; reste à préciser la durée de conservation et si les coordonnées de réponse sont elles aussi supprimées.]

Vous pouvez supprimer votre compte vous-même dans les paramètres de votre compte. Dans ce cas, votre profil, vos objets et leurs photos, ainsi que votre place dans les files sont supprimés. Vos demandes en attente et approuvées sont fermées, et le texte des messages que vous avez envoyés est remplacé par « [message removed] ». L'historique des emprunts (nom de l'objet, dates, montant de dédommagement, notes sur les dommages et statut), les messages envoyés par l'autre personne dans vos conversations et les signalements sont conservés, mais ne vous sont plus liés. Vous ne pouvez pas supprimer votre compte tant que vous avez des objets actuellement remis. [TO CONFIRM: durée de conservation des journaux et des dossiers conservés. L'avocat doit vérifier toute obligation légale de conservation. Fondé sur supabase/05-messages-and-deletion.sql, qui n'a pas encore été exécuté.]

## Vos choix

Vous pouvez modifier votre profil et vos annonces dans l'application, et supprimer votre compte à tout moment. Pour toute autre question sur vos données, contactez-nous à [contact email].

## Âge

Le site s'adresse aux personnes de 18 ans ou plus. Nous ne recueillons pas sciemment de données auprès de personnes de moins de 18 ans.

## Modifications

Nous pouvons mettre à jour cette politique, et nous modifierons la date ci-dessus le cas échéant.

## Contact

[contact email]
