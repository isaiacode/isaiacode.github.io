/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
                        $section.scrollex({
                            top: '40vh', 
                            bottom: '40vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});
/* =================================================================
   🤖 CHATBOT CONTEXTUEL (ISAIA-BOT) - VERSION FINALE PRO
   ================================================================= */
document.addEventListener('DOMContentLoaded', function() {

    // === 1. CRÉATION DE L'INTERFACE HTML ===
    let container = document.getElementById('chatbot-container');
    let bubble, avatar, messagesContainer, toggleBtn, backBtnFixed;

    if (!container) {
        // Le conteneur global
        container = document.createElement('div');
        container.id = 'chatbot-container';

        // La bulle principale
        bubble = document.createElement('div');
        bubble.id = 'chatbot-bubble';

        // L'avatar du bot (en haut à gauche de la bulle)
        avatar = document.createElement('div');
        avatar.id = 'bot-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        bubble.appendChild(avatar);
        // --- NOUVEAU : L'EASTER EGG DU CHANGEMENT DE COULEUR (Bulle + Avatar) ---
        // On crée des "Thèmes" complets pour garder une belle cohérence
        const themes = [
            { bubble: '#a1a1a127', avatarBg: '#ffffff', icon: '#ffb158' }, // 1. Défaut (Bleu clair/Blanc)
            { bubble: 'rgb(38, 32, 70)', avatarBg: 'rgb(38, 32, 70)', icon: '#ffb158' }, // 2. Thème Cyan/Vert
        ];
        let themeIndex = 0;

        avatar.addEventListener('click', function() {
            // On passe au thème suivant
            themeIndex++;
            if (themeIndex >= themes.length) {
                themeIndex = 0; // On boucle pour revenir au début
            }
            
            // 1. On change le fond de la bulle
            bubble.style.background = themes[themeIndex].bubble;
            
            // 2. On change le fond de l'avatar ET la couleur du petit robot
            avatar.style.background = themes[themeIndex].avatarBg;
            avatar.style.color = themes[themeIndex].icon;
        });


        // La zone de défilement des messages
        messagesContainer = document.createElement('div');
        messagesContainer.id = 'chat-messages';
        bubble.appendChild(messagesContainer);

        // La barre de retour FIXE (en bas de la bulle)
        backBtnFixed = document.createElement('div');
        backBtnFixed.id = 'chat-back-fixed';
        backBtnFixed.innerHTML = '<i class="fas fa-arrow-left"></i> Recommencer ';
        backBtnFixed.style.display = 'none'; // Cachée par défaut
        backBtnFixed.onclick = () => window.goBack();
        bubble.appendChild(backBtnFixed);

        // Le gros bouton d'ouverture/fermeture
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'chatbot-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';

        // On assemble le tout
        container.appendChild(bubble);
        container.appendChild(toggleBtn);
        document.body.appendChild(container);

        // Action d'ouverture/fermeture
        toggleBtn.addEventListener('click', function() {
            bubble.classList.toggle('visible');
            if (bubble.classList.contains('visible')) {
                toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
            }
        });
    }

    // === 2. LE "CERVEAU" DU BOT (L'Arborescence de tes projets) ===
    const botData = {
        "intro": {
            text: "Bonjour ! Je suis l'assistant d'Isaïa. Je vous accompagne dans chaque section, et réponds à vos questions.",
            options: ["Qui est Isaïa Lemaitre ?", "Pourquoi ce Portfolio", "Parle-moi de toi"]
        },
        "Projets": {
            text: "Ici vous pouvez retrouver ses trois projets principaux que vous pouvez explorer plus en détail, mais je peux également vous parler de certains de ses autres projets.",
            options: ["Escape game VR", "Cours sur l'ingénierie pédagogique"]
        },
        "Competences": {
            text: "Cette section résume l'ensemble des compétences acquises à travers ces projets et formations académiques et professionnelles, vous pouvez retrouver plus de détails sur son CV.",
            options: ["Savoir-faire", "Savoir-être"]
        },
        "Reflexion": {
            text: "Issu d'une licence de philosophie et alerte sur les sujets contemporains, Isaïa expose dans cette partie les éléments théoriques qui encadrent sa pratique.",
            options: ["Master de philosophie ?"]
        },
        "Contacts": {
            text: "Merci d'avoir parcouru ce portfolio, voici quelques renseignements pratiques qui pourraient vous servir.",
            options: ["Que recherche Isaïa ?", "Disponibilité/Calendrier"]
        },
        "Projet-CEMEA": {
            text: "Sur cette page est résumé le processus de médiation numérique et d'ingénierie mis en œuvre pour le CEMEA, le contexte de la commande, l'analyse, et la solution. Plus bas la maquette du module intuitif avec une vidéo démonstrative, et enfin les informations générales du projet/dossier.",
            options: ["Maquette", "Dossier"]
        },
        "Projet-Xspeed": {
            text: "Voici l'un des projets personnels d'Isaïa, n'hésitez pas à essayer la démo et à en apprendre plus sur sa conception ; si vous le souhaitez, je peux vous donner des conseils ou des informations complémentaires plus techniques.",
            options: ["Gameplay", "Infos Techniques"]
        },
        "Projet-CC": {
            text: "Ce projet fait partie des projets d'ingénierie pédagogique vus en cours ainsi qu'une mise en pratique de la théorie sur le droit d'auteur.",
            options: ["Projets pédagogiques", "Le droit d'auteur"]
        },
        "Socle et Enjeux": {
            text: "Ici vous avez les détails du cadre théorique qui oriente les choix stratégiques d'Isaïa, souhaitez-vous qu'on approfondisse un sujet ?",
            options: ["I. Enjeux Politiques du Numérique", "II. Éthique de l'Intelligence Artificielle", "III. Fracture & Inclusion"]
        },
        "Qui est Isaïa Lemaitre ?": {
            text: "Isaïa Lemaitre est un étudiant actuellement en première année de Master en Humanités Numériques, passionné de science, de philosophie et de développement.",
            options: ["Pourquoi ce Portfolio", "Parle-moi de toi"]
        },
        "Pourquoi ce Portfolio": {
            text: "Ce portfolio est une occasion idéale de mettre en valeur ses projets et d'appuyer sa recherche d'opportunités professionnelles.",
            options: ["Qui est Isaïa Lemaitre ?", "Parle-moi de toi"]
        },
        "Parle-moi de toi": {
            text: "Oui, je suis un chatbot de type arborescence, j'ai été programmé et designé directement dans le portfolio (HTML, CSS, JS), je m'adapte en fonction de la section du portfolio et je peux aussi changer de couleur si on clique sur mon icône.",
            options: ["Qui est Isaïa Lemaitre ?", "Pourquoi ce Portfolio"]
        },
        "Escape game VR": {
            text: "Un projet d'escape game en réalité virtuelle sur le thème des perspectives, qui a été mis en pause après un changement de politique de l'outil auteur (UNITY).",
            options: ["Cours sur L'ingénierie pédagogique"]
        },
        "Cours sur L'ingénierie pédagogique": {
            text: "L'une des casquettes du médiateur numérique est l'ingénierie pédagogique, Isaïa a réalisé une présentation didactique illustrant tant sur la forme que sur le fond les caractéristiques du métier.",
            options: ["Escape game VR"]
        },
        "Savoir-faire": {
            text: "De par son parcours diversifié, Isaïa fait preuve d'adaptabilité et de curiosité dans divers domaines qu'il rassemble aujourd'hui en ingénierie et médiation numérique et culturelle.",
            options: ["Savoir-être"]
        },
        "Savoir-être": {
            text: "Ses expériences professionnelles étudiantes notamment à l'étranger, ainsi que ses projets à long terme en groupe ou à distance dotent Isaïa d'une force relationnelle et d'une ambition productive et passionnée.",
            options: ["Savoir-faire"]
        },
        "Master de philosophie ?": {
            text: "Bien qu'étant un de ses centres d'intérêt, le Master en Humanités Numériques est à la croisée de son autre passion et permet justement d'allier la réflexion critique à la conception numérique. Et il n'est pas impossible que le master de philosophie se fasse à la suite ou dans plusieurs années.",
            options: []
        },
        "Que recherche Isaïa ?": {
            text: "Actuellement, Isaïa est à la recherche d'une alternance ou d'un stage en tant qu'ingénieur pédagogique ou médiateur numérique, dans le cadre de sa deuxième année de Master en Humanités Numériques.",
            options: ["Disponibilité/Calendrier"]
        },
        "Disponibilité/Calendrier": {
            text: "Profitant d'un enseignement totalement à distance (à l'exception d'une semaine en novembre), Isaïa possède un calendrier complètement adaptable et est disponible dès maintenant.",
            options: ["Date de rentrée", "Que recherche Isaïa ?"]
        },
        "Date de rentrée": {
            text: "La rentrée officielle est le 1er septembre, donc selon la réglementation, Isaïa peut éventuellement commencer dès le 1er juin pour un contrat d'apprentissage.",
            options: []
        },
        "Maquette": {
            text: "Cette maquette conçue par Isaïa est une structure de plusieurs outils/logiciels modulaires fonctionnant ensemble pour transformer une soixantaine de mails en ressources pédagogiques. En l'occurrence il s’agit ici du module “intuitif”. Voulez-vous plus de détails sur ce module ou sur les alternatives ?",
            options: ["Choix des modules", "Module Intuitif", "Module sûr"]
        },
        "Choix des modules": {
            text: "Pour concevoir ces modules, le groupe a analysé et comparé plusieurs solutions et plusieurs logiciels au regard des besoins et objectifs. Mais l'option de modularité est aussi une caractéristique, chaque maillon de la chaîne peut être substitué par un autre, par exemple pour stocker les données individuelles on peut remplacer le Google Sheets par un fichier Excel ou une base MySQL, ou encore utiliser Mistral IA plutôt que Gemini AI. La structure et le résultat sont fixes mais les maillons (logiciels) sont modulables",
            options: ["Module Intuitif", "Module sûr"]
        },
        "Module Intuitif": {
            text: "Le module intuitif fonctionne grâce à des outils publics : Google, Make, Trello, chacun assurant une étape du module comme le montre la première slide. Ce module est très simple à mettre en place et profite de la puissance de l'environnement Google.",
            options: ["Avantages", "Inconvénients"]
        },
        "Avantages": {
            text: "Ce module simple et efficace est parfait pour une maquette dont on peut voir le fonctionnement dans la vidéo, mais c'est également une solution très peu coûteuse en ressources et en maintenance pour les commanditaires.",
            options: ["Inconvénients"]
        },
        "Inconvénients": {
            text: "Les données traitées par le module peuvent être sensibles puisqu'elles relèvent du social et médico-social, il est important que la solution proposée protège complètement ces données et qu'elles soient le moins possible dépendantes d'un tiers privé. Après une analyse de risque/gravité, nous avons jugé qu'il serait intéressant de proposer des alternatives offrant plus de sûreté.",
            options: ["Avantages"]
        },
        "Module sûr": {
            text: "Le module sûr fonctionne avec des outils/logiciels français et permettant une souveraineté des données : Mistral, Bot Python, Nolej, Digipad. Ce module traite les données en réseau presque fermé minimisant le partage d'informations sur des tiers privés et donc le risque de fuite ou de perte d'informations sensibles. Cependant ce module est plus compliqué à mettre en place et à maintenir.",
            options: ["Coût financier", "Fracture Numérique"]
        },
        "Coût financier": {
            text: "La mise en place et la maintenance de ce module (programmation, licences professionnelles) ont un coût non négligeable pour les objectifs et les moyens des commanditaires : ce module coûte environ 500 euros par an pour sécuriser les données, le rendu sera quant à lui sensiblement le même que le module intuitif.",
            options: ["Fracture Numérique"]
        },
        "Fracture Numérique": {
            text: "Un tel dispositif nécessite l'intervention d'un programmeur et une certaine maîtrise d'outils tels que Nolej, cependant cela vient ajouter une charge et une responsabilité numérique qui était justement le point que le module devait solutionner.",
            options: ["Coût financier"]
        },
        "Dossier": {
            text: "Comme indiqué dans \"Réalisation & évolutions\", la maquette, l'analyse, et la solution composent un dossier global, nous pouvons approfondir ensemble les détails de ce dossier.",
            options: ["Méthode", "Médiatisation"]
        },
        "Méthode": {
            text: "La solution, et donc la maquette du module, est le fruit d'une analyse institutionnelle sociologique et numérique des CEMEA Occitanie. À partir d'une étude des besoins et ressources, le groupe a déployé des outils et méthodes d'analyse, de suivi et conception de projet.",
            options: ["Outils/Méthode", "Organisation"]
        },
        "Outils/Méthode": {
            text: "Pour ce dossier le groupe a déployé des méthodes telles que :<br><br>-  Analyse discursive réseau et média, analyse institutionnelle (organigramme, âges...), \"pour le cadre et contexte\" <br><br> -  MVP, triangle d'or, comparaisons risque/gravité, \"pour benchmarker les potentielles solutions\"<br><br>- Macro planning avec jalons, comitologie, diagramme de Gantt, \"pour le suivi\".",
            options: ["Organisation"]
        },
        "Organisation": {
            text: "En groupe de quatre sur une période d'un mois et demi à distance, le groupe s'est organisé avec une répartition des rôles (Organisation, Analyse, Technique, Médiatisation) avec rendez-vous visiophonique hebdomadaire. Pour les travaux ils utilisaient des outils tels que Notion et Google Docs.",
            options: ["Outils/Méthode"]
        },
        "Médiatisation": {
            text: "La fracture numérique étant l'un de nos points d'attention principaux, nous avons décidé d'accompagner la mise en place du module, ceci grâce à une formation ainsi qu’un plan de médiatisation adapté.",
            options: ["Média", "Formation"]
        },
        "Média": {
            text: "Les CEMEA ont une médiathèque en ligne ainsi qu'un Instagram sur lesquels le module sera annoncé, mais après analyse, c'est principalement par mail que les formateurs communiquent (via support numérique). Une campagne par mail sera la méthode principale de diffusion de la mise en place du module et de la formation.",
            options: ["Formation"]
        },
        "Formation": {
            text: "Le module a été pensé pour minimiser la charge d'apprentissage numérique des formateurs. Pour davantage accompagner la mise en place, il est prévu une formation d'une journée, ainsi qu'un tutoriel en ligne asynchrone (similaire à la vidéo maquette) qui viendra compléter la compréhension et la maîtrise de la solution proposée.",
            options: ["Média"]
        },
        "Gameplay": {
            text: "Le jeu utilise des déplacements isométriques (en diagonale), le but du jeu est d'atteindre un certain score (ici 5000 pour la démo). Pour y arriver, il suffit de ramasser les gemmes vertes, chaque gemme rapporte 1 de score qui est multiplié par les différentes incentives.",
            options: ["Incentives", "Isométrie"]
        },
        "Incentives": {
            text: "Ces incentives font le cœur du système \"RogueLite\", par exemple ici : si vous atteignez 100 combos chaque gemme rapporte 2x plus de score, 3x plus pour 200 de combo et ainsi de suite. Ce système de combos est le multiplicateur de base mais il y en a d'autres, notamment les \"modules\".",
            options: ["Modules", "Rogue Lite"]
        },
        "Modules": {
            text: "Les modules sont affichés en haut à droite de l'écran de jeu et ont tous leurs caractéristiques propres. Par exemple, le module “shield” donne un bouclier tous les 100 combos, ou encore le module “chrysalis” qui donne +1 de score pour chaque gemme tant que vous avez un bouclier sur vous. Tous ces modules sont consultables dans le menu de customisation (pour la version démo les modules sont présélectionnés et déjà débloqués).",
            options: ["Rogue Lite"]
        },
        "Rogue Lite": {
            text: "Le système Rogue Lite implique une génération des niveaux aléatoire (la map change à chaque essai) ainsi qu’une progression par la répétition (Die and Retry). Dans cette version démo, le système Rogue Lite est désactivé mais vous pouvez en voir un aperçu sur la slide 4 ; dans la version finie les modules se débloquent au fur et à mesure et de façon aléatoire.",
            options: ["Modules"]
        },
        "Isométrie": {
            text: "Le choix d'un déplacement en diagonale plutôt que vertical/horizontal classique est stratégiquement voulu et adapté à la jouabilité sur mobile. Les deux pouces (ou index et majeur sur clavier) opposés permettent beaucoup plus d'action qu’avec les flèches directionnelles classiques. Cette disposition permet un style de jeu beaucoup plus rapide et actif.",
            options: ["Activer les flèches", "Style rapide"]
        },
        "Activer les flèches": {
            text: "Vous pouvez voir les flèches tactiles dans le jeu via les options et les boutons \"arrows\" et \"edit arrows\" en augmentant l'opacité des flèches (réduite en amont puisque non nécessaire sur une démo PC).",
            options: ["Style rapide"]
        },
        "Style rapide": {
            text: "Le style rapide du jeu est inspiré des jeux de rythme tels que Geometry Dash, Tomb of the Mask ou encore Piano Tiles qui mettent à l'épreuve les réflexes et la vivacité.",
            options: ["Activer les flèches"]
        },
        "Infos Techniques": {
            text: "Le jeu est développé sur le moteur de jeu Godot version 4.4 en GDScript, prévu pour un portage Windows, Android et MacOS et optimisé pour les appareils même les moins puissants.",
            options: ["Optimisation", "Direction artistique"]
        },
        "Optimisation": {
            text: "L'optimisation est un point essentiel du développement et de l'évolution du jeu, d'abord pour les utilisateurs : permettre à tout le monde de pouvoir y jouer. Mais aussi pour le développeur, créer un environnement permettant le moins de répétitions et d'erreurs (scalabilité ou mise à l'échelle) ; de quel type d'optimisation souhaitez-vous parler ?",
            options: ["Optimisation utilisateur", "Optimisation développement"]
        },
        "Optimisation utilisateur": {
            text: "Pour fonctionner sur des appareils faibles, le moteur physique (ramasser des pièces, heurter des murs) fonctionne via une grille à états en valeur binaire (extrêmement léger : mur = 1, pièce = 2...). Autrement dit, les objets ne se déplacent pas réellement, mais des chiffres dans une grille simple changent, puis on affiche la grille avec les textures correspondantes comme on le voit slide 1 et 2.",
            options: ["Optimisation développement"]
        },
        "Optimisation développement": {
            text: "Comme indiqué dans évolutions et stratégies et sur la slide 1 et 2, le système de création de map (le gros du travail) est importable à partir d'une image PNG avec les bonnes couleurs comme identités d'objets. C'est un exemple parmi d'autres de rendre la création plus simple à long terme.",
            options: ["Optimisation utilisateur"]
        },
        "Direction artistique": {
            text: "Un des défis de ce projet a été le choix d'une direction artistique, cette dernière devant être adaptée au niveau non expert d'Isaïa, il a donc fallu rester humble techniquement tout en proposant quelque chose de cohérent tant pour l'image que pour le son.",
            options: ["Image", "Son"]
        },
        "Image": {
            text: "Pour l'image et donc les textures, les principaux outils d'édition sont Canva, Paint, Piskel, Tilesetter.",
            options: ["Son"]
        },
        "Son": {
            text: "Pour le son (pas disponible sur la démo), Isaïa utilise Audacity, Cakewalk, et Studio One pour la création et le mixage. Mais il récupère également des bandes-son libres de droits sur des sites dédiés comme : Sonniss, Freesound ou OpenGameArt.",
            options: ["Image"]
        },
        "Projets pédagogiques": {
            text: "En tant qu'ingénierie des savoirs et de leur transmission notamment dans un monde numérisé, l'ingénierie pédagogique incarne les savoir-faire des humanités numériques, découvrez les autres projets d’Isaïa qui ont nécessité cette expertise.",
            options: ["ChatBot", "Projet CEMEA"] 
        },
        "ChatBot": {
            text: "Vous êtes actuellement en train de communiquer avec un outil de médiation numérique et pédagogique dont le but est l'accompagnement interactif du portfolio. Ce projet, en plus d'être une vitrine technique, ajoute une dimension interactionnelle didactique pour la navigation. Elle offre également une première interaction Homme-Machine-Homme asynchrone avec Isaïa Lemaitre.",
            options: ["Projet CEMEA"]
        },
        "Projet CEMEA": {
            text: "Disponible sur ce portfolio, le projet de module autonome de centralisation est une solution de médiation numérique transformant une soixantaine de mails en ressources pédagogiques adaptées dont vous pouvez voir plus de détails dans la section dédiée.",
            options: ["ChatBot"]
        },
        "Le droit d'auteur": {
            text: "En tant que concepteur numérique, il est primordial pour Isaïa de maîtriser les cadres légaux qui structurent et permettent la transmission des savoirs, comme par exemple l'exception pédagogique ou encore les SGC (Sociétés de Gestion Collective).",
            options: ["Exception pédagogique", "SGC"]
        },
        "Exception pédagogique": {
            text: "L'exception pédagogique est une dérogation légale au droit d’auteur prévue pour autoriser l’usage partiel d’œuvres strictement pour l’enseignement et la recherche, dont la rémunération est forfaitairement assurée par l’État.",
            options: ["SGC"]
        },
        "SGC": {
            text: "Une SGC est un organisme privé mandaté par les auteurs pour percevoir et répartir collectivement les revenus de leurs droits patrimoniaux.",
            options: ["Exception pédagogique"]
        },
        "I. Enjeux Politiques du Numérique": {
            text: "Cette section aborde les enjeux liés à la souveraineté technique des données, mais d'autres enjeux politiques n'y sont pas explicités. Ces derniers jouent un rôle tout aussi important comme les algorithmes de réseaux sociaux, ou encore les réglementations RGPD, copyright...",
            options: ["RGPD", "Algorithme"]
        },
        "RGPD": {
            text: "Règlement Général sur la Protection des Données. C'est la loi européenne qui encadre la collecte et l'utilisation des données personnelles pour redonner aux citoyens le contrôle sur leurs informations.",
            options: ["Algorithme"]
        },
        "Algorithme": {
            text: "Aujourd'hui, les algorithmes isolent les utilisateurs dans des bulles de filtres qui valident et confortent leurs préjugés, ce qui fragmente le débat public et renforce la polarisation politique.",
            options: ["RGPD"]
        },
        "II. Éthique de l'Intelligence Artificielle": {
            text: "Cette section est le cœur de recherche d'Isaïa, si le sujet vous intrigue, vous pouvez retrouver plus de détails dans ce <a href='philo.html' target='_blank' style='color: #ffa734; text-decoration: underline;'>projet de recherche en licence</a>, notamment sur les notions de qualia ou d'IIT.",
            options: ["Qualia", "IIT"]
        },
        "Qualia": {
            text: "Les qualia sont les propriétés qualitatives et subjectives de l'expérience consciente, correspondant à « l'effet que cela fait » de ressentir une sensation ou une émotion particulière.",
            options: ["IIT"]
        },
        "IIT": {
            text: "L'IIT est un modèle mathématique qui prédit l'émergence de la conscience dans tout système complexe dès lors que son organisation structurelle génère une information intégrée.",
            options: ["Qualia"]
        },
        "philo": {
            text: "Ce texte est une ébauche de projet de recherche, l'exercice est d'expliciter les centres d'intérêt et pistes de réflexion dans le cadre d'un éventuel projet de recherche en Master, le tout devant tenir sur trois pages.",
            options: []
        },
        "III. Fracture & Inclusion": {
            text: "Un des rôles essentiels de l'ingénieur numérique est de proposer un parcours et une expérience adaptée et cohérente pour les utilisateurs, mais également de veiller à ce que tout le monde puisse en profiter. Pour ce faire l'ingénieur numérique a à sa disposition un cadre et des outils permettant de créer des solutions inclusives et ergonomiques.",
            options: ["RGAA"]
        },
        "RGAA": {
            text: "Il s'agit d'un Référentiel Général qui liste des critères à respecter pour que les personnes en situation de handicap puissent utiliser les sites internet et les applications mobiles sans difficulté.",
            options: []
        }
    };


   // === 3. MOTEUR DU CHATBOT (Logique & Historique) ===
    let chatHistory = []; 

    window.appendBotTurn = function(key) {
        // 1. On récupère les données
        const node = botData[key];
        
        // 2. Animation de l'avatar au moment où le bot parle
        if (avatar) {
            avatar.classList.remove('avatar-talking'); 
            void avatar.offsetWidth; // Force le "repaint" pour relancer l'animation
            avatar.classList.add('avatar-talking');
        }

        // 3. Création du conteneur du message (bulle + options)
        const turnDiv = document.createElement('div');
        turnDiv.className = 'chat-turn';
        turnDiv.dataset.key = key; 

        // 4. Bulle de texte du bot
        const botMsg = document.createElement('div');
        botMsg.className = 'msg-bot';
        botMsg.innerHTML = node.texte || node.text; // 🪄 Sécurité pour lire ton dictionnaire !
        
        // --- NOUVEAU : LA BULLE DU BOT DEVIENT CLIQUABLE ---
        botMsg.title = "Cliquez pour revenir à ce sujet"; 
        
        botMsg.onclick = function() {
            // Si ce conteneur (turnDiv) est le tout dernier élément de la liste, on bloque le clic !
            if (turnDiv === messagesContainer.lastElementChild) {
                return; 
            }
            // Sinon, on relance la fonction
            appendBotTurn(key); 
        };
        // ---------------------------------------------------

        turnDiv.appendChild(botMsg);

        // 5. Conteneur des boutons d'options
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options-wrapper';
        
        // Sécurité supplémentaire au cas où une bulle n'a pas d'options
        if (node.options) {
            node.options.forEach(opt => {
                const spanBtn = document.createElement('span'); 
                spanBtn.className = 'chat-option';
                spanBtn.innerText = opt;
                spanBtn.onclick = () => handleUserChoice(opt, turnDiv);
                optionsDiv.appendChild(spanBtn);
            });
        }

        turnDiv.appendChild(optionsDiv);
        messagesContainer.appendChild(turnDiv);
        
        // Auto-scroll vers le bas
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // 6. Gestion de la barre fixe de retour
        if (backBtnFixed) {
            backBtnFixed.style.display = chatHistory.length > 0 ? 'block' : 'none';
        }
    };

    // === 4. INTERACTIONS UTILISATEUR ===
    window.handleUserChoice = function(choiceText, currentTurnDiv) {
        // Sauvegarde de l'étape actuelle
        chatHistory.push(currentTurnDiv.dataset.key);

        // Efface les boutons de choix du message précédent
        const optionsWrapper = currentTurnDiv.querySelector('.chat-options-wrapper');
        if (optionsWrapper) optionsWrapper.remove();

        // Crée la bulle de l'utilisateur (à droite)
        const userMsg = document.createElement('div');
        userMsg.className = 'msg-user';
        userMsg.innerText = choiceText;
        currentTurnDiv.appendChild(userMsg);

        // Déclenche la réponse du bot
        setTimeout(() => {
            appendBotTurn(choiceText);
        }, 0); 
    };

    // Fonction de reset du chat
    window.goBack = function() {
        // 1. On vide la mémoire du bot
        chatHistory = [];

        // 2. On efface visuellement tous les messages
        messagesContainer.innerHTML = '';

        // 3. On relance avec la section détectée par ton observer !
        // (Si currentSection est null au tout début, on met "intro" par sécurité)
        appendBotTurn(currentSection || "intro");
    };
    // === 5. DÉTECTEUR DE SCROLL (Médiation Contextuelle) ===
    let currentSection = null;
    let botScrollTimeout; // 🪄 NOUVEAU : La mémoire de notre chronomètre
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id && entry.target.id !== currentSection) {
                currentSection = entry.target.id;
                
                // 🪄 LA CORRECTION : On annule le chronomètre précédent s'il y en a un en cours !
                clearTimeout(botScrollTimeout);
                
                // On lance le nouveau chronomètre et on le sauvegarde dans la variable
                botScrollTimeout = setTimeout(() => {
                    chatHistory = []; 
                    messagesContainer.innerHTML = ''; 
                    // On vérifie que la section existe bien dans le dico avant de l'afficher
                    appendBotTurn(botData[currentSection] ? currentSection : "intro"); 
                }, 100);
            }
        });
    }, { 
        rootMargin: "-40% 0px -40% 0px", 
        threshold: 0 
    });

    // Active l'observation sur toutes les sections du site
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));

}); // FIN DU CHATBOT
})(jQuery); // FIN DU FICHIER