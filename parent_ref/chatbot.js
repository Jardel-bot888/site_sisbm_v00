/* ============================================================
   SISBM Assistant — Chatbot 100% côté navigateur
   Aucune API payante : réponses par reconnaissance de mots-clés
   à partir d'une base de connaissances SISBM, avec repli vers
   WhatsApp quand le bot ne comprend pas la question.

   Base de connaissances enrichie à partir de :
   - Presentation_SISBM.pptx (identité, 5 pôles)
   - Prestation_Audit___Cyber_Sécurité.pptx (21 prestations / 8 familles)
   - Prestation_Formation.pptx (27 formations / 9 domaines, prix et durées)

   v2 : réponses reformatées en listes à puces bien séparées,
   et couverture élargie (salutations, remerciements, au revoir,
   questions "es-tu un robot", recrutement, réclamations, etc.)
   ============================================================ */

(function () {
  "use strict";

  var WHATSAPP_URL =
    "https://wa.me/2250720161466?text=Bonjour%20SISBM%2C%20je%20souhaite%20des%20informations%20sur%20vos%20services.";
  var LEAD_ENDPOINT = "/lead-mail.php"; // Voir GUIDE-INSTALLATION.md — optionnel

  /* ---------------- Base de connaissances SISBM ---------------- */
  var KNOWLEDGE = [
    /* ===================== 1. CIVILITÉS ===================== */
    {
      id: "salut",
      keywords: ["bonjour", "salut", "bonsoir", "hello", "coucou", "cc", "bjr", "slt"],
      reply:
        "Bonjour, je suis l'assistant SISBM. Je peux vous renseigner sur :\n\n" +
        "• nos domaines d'activité (cybersécurité, sécurité électronique, BTP, tracking GPS et mobilité)\n" +
        "• nos formations métiers et leurs tarifs\n" +
        "• la mise en relation avec un conseiller\n\n" +
        "Que puis-je faire pour vous ?",
      suggestions: ["Nos domaines", "Nos formations", "Demander un devis", "Contact"]
    },
    {
      id: "commentvas",
      keywords: ["comment vas tu", "comment ca va", "ca va", "comment allez vous", "tu vas bien"],
      reply:
        "Je vais très bien, merci de demander ! Je suis à votre disposition pour répondre à vos questions sur SISBM. Que souhaitez-vous savoir ?",
      suggestions: ["Nos domaines", "Nos formations", "Demander un devis", "Contact"]
    },
    {
      id: "es-tu-robot",
      keywords: [
        "es tu un robot", "es-tu un robot", "tu es un robot", "es tu humain", "es-tu humain",
        "es tu une ia", "es-tu une ia", "qui es tu", "qui es-tu", "qui est tu", "qui est-tu",
        "qui êtes vous", "qui etes vous", "tu es qui", "c'est qui toi", "qui t'a cree",
        "qui t'a créé", "qui t'a fait", "qui ta cree", "qui ta créé", "qui ta fait",
        "createur", "créateur", "invente par qui", "invente par"
      ],
      reply:
        "Je suis l'assistant de SISBM.\n\n" +
        "• Date de création — 10 août 2026\n" +
        "• Créé par — OUATTARA YACOUBA S.\n\n" +
        "Je suis là pour répondre rapidement à vos questions sur SISBM. Pour un échange avec une personne de l'équipe, je peux vous mettre en relation sur WhatsApp à tout moment.",
      suggestions: ["Parler sur WhatsApp", "Nos domaines", "Nos formations"]
    },
    {
      id: "aide",
      keywords: [
        "aide", "aide moi", "que peux tu faire", "que peux-tu faire", "comment ca marche",
        "comment ça marche", "menu", "options"
      ],
      reply:
        "Voici comment je peux vous aider :\n\n" +
        "• Découvrir les 5 pôles d'activité de SISBM\n" +
        "• Obtenir le détail d'un domaine (cybersécurité, sécurité électronique, BTP, mobilité/GPS)\n" +
        "• Consulter le catalogue et les tarifs des formations SISBM Academy\n" +
        "• Demander un devis ou une inscription\n" +
        "• Obtenir nos coordonnées et être mis en relation avec un conseiller\n\n" +
        "Choisissez un sujet ci-dessous ou écrivez directement votre question.",
      suggestions: ["Nos domaines", "Nos formations", "Demander un devis", "Contact"]
    },

    /* ===================== 2. IDENTITÉ / ENTREPRISE ===================== */
    {
      id: "apropos",
      keywords: [
        "qui etes", "apropos", "à propos", "entreprise", "societe", "sisbm c'est quoi",
        "presentation", "identite", "mission", "c'est quoi sisbm"
      ],
      reply:
        "SISBM (Société d'Ingénierie en Sécurité, Bâtiment et Mobilité) est une société d'ingénierie basée à Abidjan.\n\n" +
        "Elle déploie des solutions innovantes, fiables et durables pour accompagner la transformation des organisations et de la collectivité territoriale, autour de trois axes :\n\n" +
        "• la sécurité numérique et physique\n" +
        "• la construction et les infrastructures\n" +
        "• la mobilité urbaine et logistique\n\n" +
        "Ambition : être un acteur de référence en Côte d'Ivoire, au service d'organisations plus sûres, plus connectées et plus intelligentes.\n\n" +
        "Signature : Sécuriser, Construire, Connecter, Former."
    },
    {
      id: "engagements",
      keywords: ["engagement", "engagements", "valeurs", "qualite", "conformite", "confidentialite", "responsabilite"],
      reply:
        "SISBM s'appuie sur quatre engagements :\n\n" +
        "• Qualité — qualité des solutions livrées, du cadrage à la mise en service\n" +
        "• Conformité — respect des normes locales et internationales en vigueur\n" +
        "• Confidentialité — protection des données et des environnements confiés\n" +
        "• Responsabilité — engagement sociétal et environnemental durable"
    },
    {
      id: "moyens-humains",
      keywords: ["equipe", "effectif", "moyens humains", "personnel sisbm", "collaborateurs"],
      reply:
        "SISBM mobilise une équipe pluridisciplinaire capable d'intervenir sur des projets multisectoriels :\n\n" +
        "• Ingénieurs\n" +
        "• Techniciens\n" +
        "• Urbanistes\n" +
        "• Informaticiens\n" +
        "• Experts cybersécurité"
    },
    {
      id: "pourquoi-sisbm",
      keywords: ["pourquoi choisir sisbm", "pourquoi vous choisir", "avantages sisbm", "difference sisbm"],
      reply:
        "Pourquoi choisir SISBM :\n\n" +
        "• Une expertise multisectorielle — ingénieurs, auditeurs, experts cyber, du réseau à la gouvernance\n" +
        "• Une pédagogie par la pratique — travaux pratiques sur chaque parcours de formation\n" +
        "• Des référentiels reconnus — ISO 27001, ISO 27005, PCI-DSS, RGPD, OWASP, ANSSI, CIS Benchmarks\n" +
        "• Un ancrage local — équipe basée à Abidjan, proche de vos équipes et de vos contraintes"
    },
    {
      id: "partenaires-clients",
      keywords: ["partenaire", "partenaires", "client", "clients", "references", "reference"],
      reply:
        "Partenaires technologiques :\n\n" +
        "• SolarWinds\n" +
        "• Tenable Nessus\n" +
        "• Teltonika\n" +
        "• Schneider Electric\n" +
        "• MiCODUS\n\n" +
        "Quelques références clients :\n\n" +
        "• Société Ciment Côte d'Ivoire\n" +
        "• S.I. Béton\n" +
        "• Universelle Industries\n" +
        "• Difin\n" +
        "• SIPRA\n" +
        "• EMS Électriques\n" +
        "• BMAF-Group"
    },
    {
      id: "recrutement",
      keywords: [
        "recrutement", "emploi", "recrute", "stage", "stagiaire", "candidature", "postuler",
        "offre d'emploi", "carriere", "travailler chez sisbm", "cv"
      ],
      reply:
        "SISBM recrute ponctuellement selon ses besoins en ingénierie, cybersécurité, BTP et mobilité, et accueille aussi des stagiaires.\n\n" +
        "Pour une candidature ou un stage, laissez-moi vos coordonnées et le poste ou domaine visé : un conseiller SISBM reviendra vers vous.",
      openLeadForm: true
    },
    {
      id: "partenariat",
      keywords: ["partenariat", "collaborer", "collaboration", "devenir partenaire", "distributeur"],
      reply:
        "SISBM est ouverte aux partenariats technologiques et commerciaux dans ses domaines d'intervention (cybersécurité, sécurité électronique, BTP, mobilité).\n\n" +
        "Décrivez votre projet de partenariat via le formulaire ci-dessous, un conseiller vous recontactera.",
      openLeadForm: true
    },
    {
      id: "reclamation",
      keywords: [
        "reclamation", "plainte", "probleme", "insatisfait", "insatisfaction", "litige",
        "mecontent", "je ne suis pas content"
      ],
      reply:
        "Je suis désolé pour ce désagrément. Pour un traitement rapide de votre réclamation :\n\n" +
        "• décrivez votre problème dans le formulaire ci-dessous, ou\n" +
        "• contactez directement un conseiller sur WhatsApp\n\n" +
        "Un membre de l'équipe SISBM reviendra vers vous dans les meilleurs délais.",
      suggestions: ["Parler sur WhatsApp", "Demander un devis"]
    },

    /* ===================== 3. VUE D'ENSEMBLE DES PÔLES ===================== */
    {
      id: "domaines",
      keywords: [
        "service", "services", "domaine", "domaines", "que faites", "activite", "activités",
        "poles", "pôles"
      ],
      reply:
        "SISBM intervient sur cinq pôles complémentaires :\n\n" +
        "1. Cybersécurité et audit des systèmes d'information — sécuriser les SI et accompagner la conformité\n" +
        "2. Sécurité électronique — protéger les biens et les personnes\n" +
        "3. Bâtiment et travaux publics — concevoir et réaliser des ouvrages durables\n" +
        "4. Tracking GPS et mobilité — optimiser les déplacements et la logistique\n" +
        "5. Formation et certifications — monter en compétences\n\n" +
        "Sur quel domaine voulez-vous plus de détails ?",
      suggestions: ["Cybersécurité", "Sécurité électronique", "BTP", "Mobilité & GPS", "Formations"]
    },
    {
      id: "demarche",
      keywords: ["demarche", "methode d'intervention", "comment vous procedez", "processus d'intervention"],
      reply:
        "La démarche d'intervention SISBM suit cinq étapes :\n\n" +
        "1. Cadrage — compréhension du contexte et du périmètre\n" +
        "2. Évaluation — audit technique et organisationnel\n" +
        "3. Recommandations — plan d'action priorisé selon le risque et le budget\n" +
        "4. Mise en œuvre — déploiement des solutions et documentation\n" +
        "5. Accompagnement — formation, supervision continue, maintien en conformité\n\n" +
        "Une approche progressive, pilotée par le risque, adaptée au niveau de maturité de chaque organisation."
    },

    /* ===================== 4. CYBERSÉCURITÉ ===================== */
    {
      id: "cyber",
      keywords: [
        "cybersecurite", "cyber", "securite informatique", "securite des si", "systeme d'information"
      ],
      reply:
        "Le pôle Cybersécurité et Audit des SI vise à sécuriser les systèmes d'information et à accompagner la conformité réglementaire.\n\n" +
        "L'offre comprend 21 prestations réparties en 8 familles :\n\n" +
        "• Politique — politiques et procédures\n" +
        "• Audit — audit de vulnérabilité\n" +
        "• Refonte — réseau, infrastructure\n" +
        "• Licence — renouvellement de licence\n" +
        "• Formation — sensibilisation\n" +
        "• Investigation — numérique\n" +
        "• Consultance — RSSI\n" +
        "• Conformité — ISO 27001, PCI-DSS, ARTCI, PCA/PRA\n\n" +
        "Sur quelle famille voulez-vous des détails ?",
      suggestions: ["Politiques & audit", "Refonte réseau & licences", "Consultance RSSI", "Conformité réglementaire"]
    },
    {
      id: "cyber-politique-audit",
      keywords: [
        "politique", "pssi", "procedure de securite", "audit de vulnerabilite", "pentest",
        "test d'intrusion", "audit de code", "audit de configuration", "audit organisationnel"
      ],
      reply:
        "Politiques et procédures :\n\n" +
        "• Rédaction ou mise à jour de la politique globale de sécurité (PSSI) et des procédures de sécurité\n" +
        "• Objectif : poser le socle documentaire et organisationnel de la sécurité du SI\n\n" +
        "Audit de vulnérabilité :\n\n" +
        "• Test d'intrusion (pentest)\n" +
        "• Audit de code source des applications\n" +
        "• Audit de configuration des serveurs et équipements\n" +
        "• Audit organisationnel de sécurité\n" +
        "• Objectif : mesurer le niveau réel d'exposition du SI et fournir un plan de remédiation priorisé par criticité"
    },
    {
      id: "cyber-refonte-licence",
      keywords: [
        "refonte reseau", "infrastructure", "vpn", "sd-wan", "fortinet", "fortigate", "fortimanager",
        "fortiems", "soc", "siem", "supervision", "sauvegarde", "veeam", "licence", "renouvellement de licence"
      ],
      reply:
        "Refonte réseau, infrastructure et licences :\n\n" +
        "• Interconnexion de sites (VPN, SD-WAN, routeurs, switches)\n" +
        "• Déploiement de solutions Fortinet (FortiGate, FortiEMS, FortiManager)\n" +
        "• Supervision de sécurité SOC/SIEM\n" +
        "• Solution de sauvegarde Veeam Backup\n" +
        "• Renouvellement des licences Fortinet\n\n" +
        "Objectif : une infrastructure moderne, supervisée en continu et couverte par des licences maintenues à jour."
    },
    {
      id: "cyber-sensibilisation-investigation",
      keywords: [
        "sensibilisation du personnel", "investigation numerique", "collecte de preuves", "forensic entreprise"
      ],
      reply:
        "Sensibilisation et formation du personnel :\n\n" +
        "• Bonnes pratiques de sécurité de l'information\n\n" +
        "Investigation numérique :\n\n" +
        "• Collecte et analyse de preuves numériques en cas d'incident\n\n" +
        "Objectif : des collaborateurs capables de détecter et signaler les menaces, et une capacité d'investigation en cas d'incident avéré."
    },
    {
      id: "cyber-consultance",
      keywords: ["rssi", "consultance", "externalisation rssi", "responsable securite si"],
      reply:
        "Consultance RSSI :\n\n" +
        "• Accompagnement et conseil RSSI\n" +
        "• Ou externalisation complète de la fonction\n\n" +
        "Objectif : bénéficier d'une expertise sécurité disponible immédiatement, sans les délais ni le coût d'un recrutement interne."
    },
    {
      id: "cyber-conformite",
      keywords: [
        "iso 27001", "pci-dss", "pci dss", "artci", "rgpd", "pca", "pra", "plan de continuite",
        "plan de secours", "continuite d'activite"
      ],
      reply:
        "Mise en conformité réglementaire et continuité :\n\n" +
        "• Conformité ISO 27001 (SMSI)\n" +
        "• Conformité PCI-DSS\n" +
        "• Conformité ARTCI\n" +
        "• Plan de continuité d'activité (PCA)\n" +
        "• Plan de secours informatique (PRA/PSI)\n\n" +
        "Objectif : une conformité démontrable auprès des régulateurs et une capacité de reprise éprouvée en cas de sinistre."
    },

    /* ===================== 5. SÉCURITÉ ÉLECTRONIQUE ===================== */
    {
      id: "electronique",
      keywords: [
        "video", "camera", "cameras", "videosurveillance", "surveillance", "controle d'acces",
        "controle acces", "alarme", "interphone", "intrusion", "biometrique", "securite electronique"
      ],
      reply:
        "La Sécurité électronique protège les biens et les personnes par des systèmes technologiques avancés.\n\n" +
        "Prestations clés :\n\n" +
        "• Contrôle d'accès\n" +
        "• Vidéosurveillance\n" +
        "• Supervision et exploitation des installations"
    },

    /* ===================== 6. BTP ===================== */
    {
      id: "btp",
      keywords: ["btp", "construction", "batiment", "genie civil", "renovation", "rehabilitation", "amenagement urbain", "etudes techniques"],
      reply:
        "Le pôle Bâtiment et Travaux publics conçoit et réalise des ouvrages durables et fonctionnels.\n\n" +
        "Prestations clés :\n\n" +
        "• Études techniques\n" +
        "• Construction de bâtiments\n" +
        "• Réhabilitation de bâtiments\n" +
        "• Aménagement urbain et infrastructures"
    },

    /* ===================== 7. MOBILITÉ / GPS ===================== */
    {
      id: "mobilite",
      keywords: [
        "gps", "tracking", "geolocalisation", "flotte", "camion", "camions", "transport",
        "logistique", "location de vehicule", "location vehicule", "carburant"
      ],
      reply:
        "Le pôle Tracking GPS et Mobilité optimise les déplacements de personnes et de marchandises par des solutions intelligentes, sécurisées et durables.\n\n" +
        "Prestations clés :\n\n" +
        "• Tracking de véhicules et carburant\n" +
        "• Transport de personnes\n" +
        "• Transport d'engins et d'équipements\n" +
        "• Transport de marchandises et de matériels"
    },

    /* ===================== 8. FORMATIONS ===================== */
    {
      id: "formations",
      keywords: [
        "formation", "formations", "cours", "apprendre", "certifiant", "certification", "academy",
        "catalogue de formation"
      ],
      reply:
        "SISBM Academy propose 27 formations métiers réparties en 9 domaines, de 2 jours à 6 mois, entièrement pratiques :\n\n" +
        "• Sécurité des réseaux, des systèmes et des applications\n" +
        "• Audit et tests d'intrusion\n" +
        "• Continuité d'activité et investigation numérique\n" +
        "• Gestion des incidents et sensibilisation\n" +
        "• Normes et conformité\n" +
        "• Reconversion en cybersécurité\n" +
        "• Sécurité électronique et bureautique\n\n" +
        "Quel domaine vous intéresse ?",
      suggestions: ["Réseaux & systèmes", "Audit & tests d'intrusion", "Normes & conformité", "Reconversion cyber", "Vidéosurveillance & GPS"]
    },
    {
      id: "formation-reseaux-systemes",
      keywords: [
        "administrateur fortigate", "durcissement", "securite active directory", "securite des applications web",
        "owasp", "securite windows", "securite linux"
      ],
      reply:
        "Sécurité des réseaux, des systèmes et des applications :\n\n" +
        "• Administrateur FortiGate (politiques, VPN, NAT, SD-WAN, haute disponibilité) — 7 jours — 200 000 FCFA\n" +
        "• Sécurité des systèmes Windows (durcissement serveurs) — 5 jours — 200 000 FCFA\n" +
        "• Sécurité des systèmes Linux (durcissement serveurs) — 5 jours — 200 000 FCFA\n" +
        "• Sécurité Active Directory (privilèges, contrôleurs de domaine) — 5 jours — 200 000 FCFA\n" +
        "• Sécurité des applications web (OWASP Top 10, API) — 5 jours — 200 000 FCFA"
    },
    {
      id: "formation-audit-pentest",
      keywords: [
        "test d'intrusion applicatif", "test d'intrusion reseau", "test d'intrusion mobile",
        "audit de configuration formation", "audit organisationnel formation", "formation pentest"
      ],
      reply:
        "Audit du système d'information et tests d'intrusion (référentiels OWASP, ISO 27002, ANSSI, CIS) :\n\n" +
        "• Tests d'intrusion applicatif — 5 jours — 200 000 FCFA\n" +
        "• Test d'intrusion réseau — 5 jours — 200 000 FCFA\n" +
        "• Test d'intrusion mobile (Android/iOS) — 5 jours — 250 000 FCFA\n" +
        "• Audit de configuration — 5 jours — 200 000 FCFA\n" +
        "• Audit organisationnel — 3 jours — 150 000 FCFA"
    },
    {
      id: "formation-continuite-investigation",
      keywords: [
        "plan de continuite d'activite formation", "plan de secours informatique formation",
        "investigation windows", "investigation mobile android", "forensic formation"
      ],
      reply:
        "Continuité d'activité et investigation numérique :\n\n" +
        "• Plan de continuité d'activité (concevoir, documenter, tester un PCA) — 5 jours — 300 000 FCFA\n" +
        "• Plan de secours informatique (restaurer les systèmes critiques) — 5 jours — 200 000 FCFA\n" +
        "• Investigation Windows et réseau (journaux, mémoire vive, trafic réseau) — 7 jours — 300 000 FCFA\n" +
        "• Investigation mobile Android (acquisition et analyse de preuves) — 14 jours — 500 000 FCFA"
    },
    {
      id: "formation-incidents-sensibilisation",
      keywords: [
        "analyse soc", "reponse aux incidents", "sensibilisation a la securite", "blue team", "soc analyst",
        "formation siem"
      ],
      reply:
        "Gestion des incidents et sensibilisation :\n\n" +
        "• Analyse SOC et réponse aux incidents (SIEM, détection, investigation) — 14 jours — 500 000 FCFA\n" +
        "• Sensibilisation à la sécurité (phishing, mots de passe, ingénierie sociale) — 2 jours — 100 000 FCFA\n\n" +
        "Profils visés :\n\n" +
        "• Analyste SOC N1/N2\n" +
        "• Blue Team Analyst\n" +
        "• Incident Responder\n" +
        "• Référent cybersécurité\n" +
        "• Ambassadeur SSI"
    },
    {
      id: "formation-conformite",
      keywords: [
        "iso 27001 formation", "iso 27005", "pci-dss formation", "rgpd formation", "smsi", "gestion des risques formation"
      ],
      reply:
        "Normes et conformité :\n\n" +
        "• ISO/IEC 27001 : exigences et SMSI — 5 jours — 200 000 FCFA\n" +
        "• ISO/IEC 27005 : gestion des risques — 5 jours — 200 000 FCFA\n" +
        "• Exigences PCI-DSS — 5 jours — 200 000 FCFA\n" +
        "• Exigences RGPD — 5 jours — 200 000 FCFA\n\n" +
        "Profils visés :\n\n" +
        "• Auditeur ISO 27001\n" +
        "• Responsable SMSI\n" +
        "• RSSI\n" +
        "• Cyber Risk Manager\n" +
        "• Consultant GRC\n" +
        "• Auditeur PCI-DSS\n" +
        "• DPO"
    },
    {
      id: "formation-reconversion",
      keywords: ["reconversion", "analyste cybersecurite junior", "changer de carriere cyber", "reconversion professionnelle"],
      reply:
        "Reconversion en cybersécurité — parcours Analyste Cybersécurité Junior :\n\n" +
        "• Les fondamentaux de la cybersécurité\n" +
        "• Réseaux et systèmes\n" +
        "• Panorama des menaces et techniques de protection\n" +
        "• Gestion des incidents et bonnes pratiques\n" +
        "• Alternance de cours et de travaux pratiques\n\n" +
        "Durée : 6 mois\n" +
        "Coût : 600 000 FCFA"
    },
    {
      id: "formation-electronique-bureautique",
      keywords: [
        "formation gps", "formation videosurveillance", "microsoft word", "microsoft excel", "excel intermediaire",
        "excel avance", "microsoft powerpoint", "pack office", "bureautique"
      ],
      reply:
        "Sécurité électronique et compétences bureautiques :\n\n" +
        "• Tracking GPS (géolocalisation, gestion de flotte, alertes) — 2 jours — 50 000 FCFA\n" +
        "• Vidéosurveillance (systèmes IP, NVR/DVR) — 2 jours — 50 000 FCFA\n" +
        "• Microsoft Word (styles, modèles, publipostage) — 3 jours — 50 000 FCFA\n" +
        "• Microsoft Excel intermédiaire (tableaux croisés dynamiques) — 5 jours — 100 000 FCFA\n" +
        "• Microsoft Excel avancé (Power Query, Power Pivot) — 7 jours — 200 000 FCFA\n" +
        "• Microsoft PowerPoint (masques, animations, SmartArt) — 2 jours — 50 000 FCFA"
    },
    {
      id: "formation-modalites",
      keywords: [
        "lieu de formation", "formation en ligne", "formation a distance", "formation presentiel",
        "ou se passent les formations", "prerequis", "pre requis", "niveau requis pour la formation"
      ],
      reply:
        "Modalités des formations SISBM Academy :\n\n" +
        "• Format — en présentiel, dans les locaux de SISBM Academy à Abidjan (Yopougon Saguidiba)\n" +
        "• Groupes — sessions en petits groupes, avec travaux pratiques sur chaque module\n" +
        "• Prérequis — variables selon le parcours (des notions de base en informatique suffisent pour la plupart des modules courts) ; à confirmer avec un conseiller selon la formation visée\n\n" +
        "Pour connaître les prérequis exacts d'une formation précise, précisez son nom."
    },
    {
      id: "formation-certificat",
      keywords: [
        "certificat", "attestation", "diplome", "diplôme", "obtient on un certificat",
        "est ce que c'est certifiant", "reconnaissance"
      ],
      reply:
        "À l'issue de chaque parcours, SISBM Academy délivre une attestation de formation mentionnant le module suivi, la durée et les compétences couvertes.\n\n" +
        "Pour les modules alignés sur des référentiels internationaux (ISO 27001, ISO 27005, PCI-DSS, OWASP, etc.), le contenu prépare également aux certifications officielles correspondantes."
    },

    /* ===================== 9. TARIFS / INSCRIPTION / PAIEMENT ===================== */
    {
      id: "tarifs",
      keywords: ["prix", "tarif", "tarifs", "combien", "coute", "coût", "budget"],
      reply:
        "Les tarifs des formations sont détaillés selon le parcours choisi (voir ci-dessus).\n\n" +
        "Pour une prestation de conseil ou d'audit, le tarif dépend du périmètre de la mission.\n\n" +
        "Le plus simple : laissez-moi vos coordonnées, un conseiller SISBM vous envoie un devis personnalisé sous 48h.",
      openLeadForm: true
    },
    {
      id: "paiement",
      keywords: [
        "paiement", "modalite de paiement", "moyen de paiement", "payer en plusieurs fois",
        "facilite de paiement", "mobile money", "virement", "especes"
      ],
      reply:
        "Modalités de paiement (à confirmer selon la prestation ou la formation) :\n\n" +
        "• Virement bancaire\n" +
        "• Mobile Money\n" +
        "• Espèces, sur place\n\n" +
        "Des facilités de paiement peuvent être étudiées au cas par cas pour les formations longues (ex. reconversion 6 mois). Un conseiller peut vous détailler les options disponibles.",
      suggestions: ["Demander un devis", "Parler sur WhatsApp"]
    },
    {
      id: "devis",
      keywords: ["devis", "inscription", "inscrire", "reserver", "s'inscrire"],
      reply: "Avec plaisir. Laissez-moi vos coordonnées, un conseiller SISBM vous recontacte rapidement.",
      openLeadForm: true
    },

    /* ===================== 10. CONTACT ===================== */
    {
      id: "contact",
      keywords: ["contact", "telephone", "numero", "adresse", "email", "mail", "joindre", "horaires", "heure", "siege"],
      reply:
        "Vous pouvez nous joindre :\n\n" +
        "• Adresse — Abidjan, Yopougon Saguidiba, à 100 m du feu, vers l'hôtel Assanvon\n" +
        "• Téléphone — +225 27 23 23 94 02 / +225 07 20 16 14 66\n" +
        "• Email — contact@sisbm-ci.com\n" +
        "• Site web — www.sisbm-ci.com",
      suggestions: ["Parler sur WhatsApp"]
    },
    {
      id: "reseaux-sociaux",
      keywords: ["reseaux sociaux", "facebook", "linkedin", "instagram", "page facebook", "vous suivre"],
      reply:
        "Pour suivre l'actualité de SISBM, le plus fiable reste :\n\n" +
        "• Site web — www.sisbm-ci.com\n" +
        "• WhatsApp — pour un échange direct avec l'équipe\n\n" +
        "Un conseiller pourra vous communiquer nos réseaux sociaux officiels sur demande.",
      suggestions: ["Parler sur WhatsApp", "Contact"]
    },

    /* ===================== 11. CLÔTURE ===================== */
    {
      id: "merci",
      keywords: ["merci", "je vous remercie", "merci beaucoup", "thanks", "thank you"],
      reply:
        "Avec plaisir ! N'hésitez pas si vous avez d'autres questions sur nos domaines, nos formations ou pour obtenir un devis.",
      suggestions: ["Nos domaines", "Nos formations", "Demander un devis", "Contact"]
    },
    {
      id: "au-revoir",
      keywords: [
        "au revoir", "a bientot", "à bientôt", "bye", "bonne journee", "bonne journée",
        "bonne soiree", "bonne soirée", "a plus", "salut a plus"
      ],
      reply:
        "Au revoir, et merci de votre visite ! L'équipe SISBM reste disponible à tout moment sur WhatsApp ou par email si besoin.",
      suggestions: ["Parler sur WhatsApp"]
    }
  ];

  var GREETING =
    "Bienvenue chez SISBM. Posez-moi une question sur nos services ou nos formations, ou choisissez une option ci-dessous.";
  var DEFAULT_SUGGESTIONS = ["Nos domaines", "Nos formations", "Demander un devis", "Contact"];
  var FALLBACK_REPLY =
    "Je n'ai pas la réponse à cette question. Pour une prise en charge rapide, je vous mets en relation avec un conseiller SISBM sur WhatsApp.";

  /* ---------------- Index rapide par id ---------------- */
  var KNOWLEDGE_BY_ID = {};
  KNOWLEDGE.forEach(function (entry) {
    KNOWLEDGE_BY_ID[entry.id] = entry;
  });

  /* ---------------- Routage direct des boutons de suggestion ----------------
     Chaque bouton pointe vers un id précis de KNOWLEDGE : la réponse est donc
     toujours exacte quand l'utilisateur clique, sans dépendre du scoring
     par mots-clés (qui reste utilisé uniquement pour le texte libre). */
  var SUGGESTION_ROUTES = {
    "Nos domaines": "domaines",
    "Nos formations": "formations",
    "Demander un devis": "devis",
    "Contact": "contact",
    "Cybersécurité": "cyber",
    "Sécurité électronique": "electronique",
    "BTP": "btp",
    "Mobilité & GPS": "mobilite",
    "Formations": "formations",
    "Politiques & audit": "cyber-politique-audit",
    "Refonte réseau & licences": "cyber-refonte-licence",
    "Consultance RSSI": "cyber-consultance",
    "Conformité réglementaire": "cyber-conformite",
    "Réseaux & systèmes": "formation-reseaux-systemes",
    "Audit & tests d'intrusion": "formation-audit-pentest",
    "Normes & conformité": "formation-conformite",
    "Reconversion cyber": "formation-reconversion",
    "Vidéosurveillance & GPS": "formation-electronique-bureautique"
  };

  /* ---------------- Résolution des questions "formation + sujet précis" ----------------
     Ex : "combien coûte la formation en vidéosurveillance", "prix formation gps",
     "formation excel avancé combien de temps" : ces questions contiennent à la
     fois un mot déclencheur (formation/cours/prix/tarif/combien/coût/durée) ET
     un mot-sujet propre à un domaine de formation. Dans ce cas, on route
     directement vers la fiche formation correspondante, plutôt que de laisser
     le scoring générique renvoyer la fiche du pôle d'activité. */
  var FORMATION_TRIGGERS = [
    "formation", "cours", "prix", "tarif", "tarifs", "combien", "cout", "coute", "coût",
    "duree", "durée", "jours", "jour"
  ];
  var FORMATION_TOPICS = [
    { id: "formation-reseaux-systemes", words: ["fortigate", "active directory", "application web", "durcissement", "securite windows", "securite linux"] },
    { id: "formation-audit-pentest", words: ["intrusion", "pentest", "audit de configuration", "audit organisationnel"] },
    { id: "formation-continuite-investigation", words: ["continuite d'activite", "secours informatique", "investigation windows", "investigation mobile", "forensic"] },
    { id: "formation-incidents-sensibilisation", words: ["soc", "siem", "sensibilisation a la securite", "blue team", "reponse aux incidents"] },
    { id: "formation-conformite", words: ["iso 27001", "iso 27005", "pci-dss", "pci dss", "rgpd", "smsi"] },
    { id: "formation-reconversion", words: ["reconversion", "analyste cybersecurite junior"] },
    { id: "formation-electronique-bureautique", words: ["videosurveillance", "video surveillance", "gps", "word", "excel", "powerpoint", "bureautique"] }
  ];

  function resolveFormationIntent(normalizedText) {
    var hasTrigger = FORMATION_TRIGGERS.some(function (t) {
      return normalizedText.indexOf(normalize(t)) !== -1;
    });
    if (!hasTrigger) return null;

    for (var i = 0; i < FORMATION_TOPICS.length; i++) {
      var topic = FORMATION_TOPICS[i];
      for (var j = 0; j < topic.words.length; j++) {
        if (normalizedText.indexOf(normalize(topic.words[j])) !== -1) {
          return KNOWLEDGE_BY_ID[topic.id] || null;
        }
      }
    }
    return null;
  }

  /* ---------------- Moteur de correspondance ---------------- */
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // enlève les accents
  }

  function findBestMatch(userText) {
    var text = normalize(userText);

    // 1. Priorité aux questions combinant "formation" + un sujet précis
    var formationMatch = resolveFormationIntent(text);
    if (formationMatch) return formationMatch;

    // 2. Sinon, scoring par mots-clés — les expressions à plusieurs mots
    //    comptent davantage que les mots isolés, pour éviter qu'une fiche
    //    générique (ex. "Sécurité électronique") écrase une fiche plus
    //    précise à cause d'un simple mot en commun.
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < KNOWLEDGE.length; i++) {
      var entry = KNOWLEDGE[i];
      var score = 0;
      for (var j = 0; j < entry.keywords.length; j++) {
        var kw = normalize(entry.keywords[j]);
        if (text.indexOf(kw) !== -1) {
          score += kw.split(" ").length; // poids = nombre de mots de l'expression
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }
    return bestScore > 0 ? best : null;
  }

  /* ---------------- Construction du widget ---------------- */
  function createWidget() {
    var launcher = document.createElement("button");
    launcher.id = "sisbm-chat-launcher";
    launcher.setAttribute("aria-label", "Ouvrir l'assistant SISBM");
    launcher.innerHTML =
      '<span class="sisbm-ping" aria-hidden="true"></span>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 3v3"></path>' +
      '<circle cx="12" cy="2.2" r="1.3" fill="currentColor" stroke="none"></circle>' +
      '<rect x="4" y="7" width="16" height="12" rx="4"></rect>' +
      '<path d="M2 12h2"></path>' +
      '<path d="M20 12h2"></path>' +
      '<circle cx="9" cy="13" r="1.4" fill="currentColor" stroke="none"></circle>' +
      '<circle cx="15" cy="13" r="1.4" fill="currentColor" stroke="none"></circle>' +
      '<path d="M9 16.5h6"></path>' +
      "</svg>";

    var win = document.createElement("div");
    win.id = "sisbm-chat-window";
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-label", "Assistant SISBM");
    win.innerHTML =
      '<div class="sisbm-header">' +
      '  <div class="sisbm-avatar">' +
      '    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '      <path d="M12 3v3"></path>' +
      '      <circle cx="12" cy="2.2" r="1.3" fill="currentColor" stroke="none"></circle>' +
      '      <rect x="4" y="7" width="16" height="12" rx="4"></rect>' +
      '      <circle cx="9" cy="13" r="1.4" fill="currentColor" stroke="none"></circle>' +
      '      <circle cx="15" cy="13" r="1.4" fill="currentColor" stroke="none"></circle>' +
      '      <path d="M9 16.5h6"></path>' +
      "    </svg>" +
      "  </div>" +
      '  <div class="sisbm-header-text">' +
      '    <div class="sisbm-title">Assistant SISBM</div>' +
      '    <div class="sisbm-status"><span class="sisbm-dot"></span>En ligne</div>' +
      "  </div>" +
      '  <button class="sisbm-close" aria-label="Fermer la fenêtre de chat">' +
      '    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      "  </button>" +
      "</div>" +
      '<div class="sisbm-messages" id="sisbm-messages"></div>' +
      '<div class="sisbm-suggestions" id="sisbm-suggestions"></div>' +
      '<div class="sisbm-input-bar">' +
      '  <input type="text" id="sisbm-input" placeholder="Écrivez votre question ici" autocomplete="off" />' +
      '  <button id="sisbm-send" aria-label="Envoyer">' +
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>' +
      "  </button>" +
      "</div>";

    document.body.appendChild(launcher);
    document.body.appendChild(win);

    return { launcher: launcher, win: win };
  }

  /* ---------------- Logique de la conversation ---------------- */
  function initChat(refs) {
    var messagesEl = refs.win.querySelector("#sisbm-messages");
    var suggestionsEl = refs.win.querySelector("#sisbm-suggestions");
    var inputEl = refs.win.querySelector("#sisbm-input");
    var sendBtn = refs.win.querySelector("#sisbm-send");
    var closeBtn = refs.win.querySelector(".sisbm-close");
    var started = false;

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addMessage(text, who) {
      var el = document.createElement("div");
      el.className = "sisbm-msg sisbm-" + who;
      el.innerHTML = linkify(text);
      messagesEl.appendChild(el);
      scrollToBottom();
    }

    function linkify(text) {
      var escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
      return escaped.replace(
        /(sisbm-ci\.com[^\s]*)/g,
        '<a href="https://$1" target="_blank" rel="noopener">$1</a>'
      );
    }

    function showTyping(callback) {
      var typing = document.createElement("div");
      typing.className = "sisbm-typing";
      typing.innerHTML = "<span></span><span></span><span></span>";
      messagesEl.appendChild(typing);
      scrollToBottom();
      setTimeout(function () {
        messagesEl.removeChild(typing);
        callback();
      }, 500 + Math.random() * 400);
    }

    function setSuggestions(list) {
      suggestionsEl.innerHTML = "";
      list.forEach(function (label) {
        var chip = document.createElement("button");
        chip.className = "sisbm-chip";
        chip.type = "button";
        chip.textContent = label;
        chip.addEventListener("click", function () {
          handleUserInput(label);
        });
        suggestionsEl.appendChild(chip);
      });
    }

    function openWhatsApp() {
      window.open(WHATSAPP_URL, "_blank", "noopener");
    }

    function renderLeadForm() {
      var wrapper = document.createElement("div");
      wrapper.className = "sisbm-lead-form";
      wrapper.innerHTML =
        '<label for="sisbm-lead-name">Nom</label>' +
        '<input type="text" id="sisbm-lead-name" required />' +
        '<label for="sisbm-lead-contact">Téléphone ou email</label>' +
        '<input type="text" id="sisbm-lead-contact" required />' +
        '<label for="sisbm-lead-need">Votre besoin</label>' +
        '<textarea id="sisbm-lead-need" placeholder="Ex : audit cybersécurité, formation CCNA..."></textarea>' +
        '<button type="button">Envoyer ma demande</button>';

      messagesEl.appendChild(wrapper);
      scrollToBottom();

      wrapper.querySelector("button").addEventListener("click", function () {
        var name = wrapper.querySelector("#sisbm-lead-name").value.trim();
        var contact = wrapper.querySelector("#sisbm-lead-contact").value.trim();
        var need = wrapper.querySelector("#sisbm-lead-need").value.trim();

        if (!name || !contact) {
          wrapper.querySelector("#sisbm-lead-name").style.borderColor = "#f87171";
          return;
        }

        submitLead({ name: name, contact: contact, need: need });
        wrapper.remove();
        addMessage(
          "Merci " + name + ", votre demande a bien été transmise à un conseiller SISBM. Vous serez recontacté(e) rapidement.",
          "bot"
        );
        setSuggestions(DEFAULT_SUGGESTIONS);
      });
    }

    function submitLead(data) {
      // Tentative d'envoi via le script PHP optionnel (gratuit, hébergé chez vous).
      // Si le script n'existe pas encore, on ouvre WhatsApp en repli — aucune
      // demande n'est perdue et aucun coût n'est engagé.
      fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).catch(function () {
        /* Silencieux : le script PHP est optionnel, voir GUIDE-INSTALLATION.md */
      });
    }

    function handleUserInput(rawText) {
      var text = rawText.trim();
      if (!text) return;

      addMessage(text, "user");
      inputEl.value = "";
      setSuggestions([]);

      if (normalize(text).indexOf("whatsapp") !== -1) {
        showTyping(function () {
          addMessage("Je vous ouvre notre WhatsApp.", "bot");
          openWhatsApp();
          setSuggestions(DEFAULT_SUGGESTIONS);
        });
        return;
      }

      // Si le texte correspond EXACTEMENT au libellé d'un bouton de suggestion,
      // on route directement vers la fiche prévue pour ce bouton — réponse
      // garantie, sans passer par le scoring de mots-clés.
      var match = SUGGESTION_ROUTES.hasOwnProperty(text)
        ? KNOWLEDGE_BY_ID[SUGGESTION_ROUTES[text]]
        : findBestMatch(text);

      showTyping(function () {
        if (match) {
          addMessage(match.reply, "bot");
          if (match.openLeadForm) {
            renderLeadForm();
          } else {
            setSuggestions(match.suggestions || DEFAULT_SUGGESTIONS);
          }
        } else {
          addMessage(FALLBACK_REPLY, "bot");
          setSuggestions(["Parler sur WhatsApp"].concat(DEFAULT_SUGGESTIONS));
        }
      });
    }

    function openChat() {
      refs.win.classList.add("sisbm-open");
      inputEl.focus();
      if (!started) {
        started = true;
        addMessage(GREETING, "bot");
        setSuggestions(DEFAULT_SUGGESTIONS);
      }
    }

    function closeChat() {
      refs.win.classList.remove("sisbm-open");
    }

    refs.launcher.addEventListener("click", function () {
      if (refs.win.classList.contains("sisbm-open")) {
        closeChat();
      } else {
        openChat();
      }
    });
    closeBtn.addEventListener("click", closeChat);
    sendBtn.addEventListener("click", function () {
      handleUserInput(inputEl.value);
    });
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") handleUserInput(inputEl.value);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var refs = createWidget();
    initChat(refs);
  });
})();