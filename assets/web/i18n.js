// ===== Rutinal Runtime i18n =====
// Detecta idioma del sistema, aplica traducciones al HTML/DOM en tiempo de renderizado.
// Auto-generado desde strings-*.json. NO editar a mano.
// Uso:
//   window.i18n.t(esString)  → devuelve traducción (o esString si no hay match)
//   window.i18n.setLang('en')
//   window.i18n.getLang()
//   window.i18n.applyAll()   → re-traduce todo el DOM ahora

(function(){
  'use strict';
  const SUPPORTED = ['es','en','pt-BR','fr'];
  const FALLBACK = 'es';
  const STORAGE_KEY = 'rutinal_lang';

  // Mapa: string español → { en, 'pt-BR', fr }
  const MAP = {
  "Rutinal": {
    "en": "Rutinal",
    "pt-BR": "Rutinal",
    "fr": "Rutinal"
  },
  "Vista previa v31.2 · los datos no se guardan al recargar": {
    "en": "Preview v31.2 · data isn't saved on reload",
    "pt-BR": "Pré-visualização v31.2 · os dados não são salvos ao recarregar",
    "fr": "Aperçu v31.2 · les données ne sont pas enregistrées au rechargement"
  },
  "Guardar": {
    "en": "Save",
    "pt-BR": "Salvar",
    "fr": "Enregistrer"
  },
  "Cancelar": {
    "en": "Cancel",
    "pt-BR": "Cancelar",
    "fr": "Annuler"
  },
  "Cerrar": {
    "en": "Close",
    "pt-BR": "Fechar",
    "fr": "Fermer"
  },
  "Eliminar": {
    "en": "Delete",
    "pt-BR": "Excluir",
    "fr": "Supprimer"
  },
  "Editar": {
    "en": "Edit",
    "pt-BR": "Editar",
    "fr": "Modifier"
  },
  "+ Nuevo": {
    "en": "+ New",
    "pt-BR": "+ Novo",
    "fr": "+ Nouveau"
  },
  "+ Nueva": {
    "en": "+ New",
    "pt-BR": "+ Nova",
    "fr": "+ Nouvelle"
  },
  "Buscar": {
    "en": "Search",
    "pt-BR": "Buscar",
    "fr": "Rechercher"
  },
  "Categoría": {
    "en": "Category",
    "pt-BR": "Categoria",
    "fr": "Catégorie"
  },
  "Categorías": {
    "en": "Categories",
    "pt-BR": "Categorias",
    "fr": "Catégories"
  },
  "Nombre": {
    "en": "Name",
    "pt-BR": "Nome",
    "fr": "Nom"
  },
  "Detalle": {
    "en": "Detail",
    "pt-BR": "Detalhe",
    "fr": "Détail"
  },
  "Notas": {
    "en": "Notes",
    "pt-BR": "Notas",
    "fr": "Notes"
  },
  "Color": {
    "en": "Color",
    "pt-BR": "Cor",
    "fr": "Couleur"
  },
  "Tipo": {
    "en": "Type",
    "pt-BR": "Tipo",
    "fr": "Type"
  },
  "Fecha": {
    "en": "Date",
    "pt-BR": "Data",
    "fr": "Date"
  },
  "Inicio": {
    "en": "Start",
    "pt-BR": "Início",
    "fr": "Début"
  },
  "Fin": {
    "en": "End",
    "pt-BR": "Fim",
    "fr": "Fin"
  },
  "Desde": {
    "en": "From",
    "pt-BR": "De",
    "fr": "De"
  },
  "Hasta": {
    "en": "To",
    "pt-BR": "Até",
    "fr": "À"
  },
  "Compartir": {
    "en": "Share",
    "pt-BR": "Compartilhar",
    "fr": "Partager"
  },
  "Copiado al portapapeles.": {
    "en": "Copied to clipboard.",
    "pt-BR": "Copiado para a área de transferência.",
    "fr": "Copié dans le presse-papiers."
  },
  "Conceder permiso": {
    "en": "Grant permission",
    "pt-BR": "Conceder permissão",
    "fr": "Accorder la permission"
  },
  "Activado": {
    "en": "Activated",
    "pt-BR": "Ativado",
    "fr": "Activé"
  },
  "Desactivado": {
    "en": "Deactivated",
    "pt-BR": "Desativado",
    "fr": "Désactivé"
  },
  "días": {
    "en": "days",
    "pt-BR": "dias",
    "fr": "jours"
  },
  "día": {
    "en": "day",
    "pt-BR": "dia",
    "fr": "jour"
  },
  "Hoy": {
    "en": "Today",
    "pt-BR": "Hoje",
    "fr": "Aujourd'hui"
  },
  "Hábitos": {
    "en": "Habits",
    "pt-BR": "Hábitos",
    "fr": "Habitudes"
  },
  "Reloj": {
    "en": "Clock",
    "pt-BR": "Relógio",
    "fr": "Horloge"
  },
  "Día": {
    "en": "Day",
    "pt-BR": "Dia",
    "fr": "Jour"
  },
  "Semana": {
    "en": "Week",
    "pt-BR": "Semana",
    "fr": "Semaine"
  },
  "Diario": {
    "en": "Journal",
    "pt-BR": "Diário",
    "fr": "Journal"
  },
  "Buscar bloques, hábitos, imprevistos, categorías…": {
    "en": "Search blocks, habits, incidents, categories…",
    "pt-BR": "Buscar blocos, hábitos, imprevistos, categorias…",
    "fr": "Rechercher blocs, habitudes, imprévus, catégories…"
  },
  "Escribe para buscar por nombre, detalle, hora o categoría.": {
    "en": "Type to search by name, detail, time, or category.",
    "pt-BR": "Digite para buscar por nome, detalhe, horário ou categoria.",
    "fr": "Tape pour chercher par nom, détail, heure ou catégorie."
  },
  "L-V": {
    "en": "Mon-Fri",
    "pt-BR": "S-S",
    "fr": "L-V"
  },
  "Sáb": {
    "en": "Sat",
    "pt-BR": "Sáb",
    "fr": "Sam"
  },
  "Dom": {
    "en": "Sun",
    "pt-BR": "Dom",
    "fr": "Dim"
  },
  "Ahora": {
    "en": "Now",
    "pt-BR": "Agora",
    "fr": "Maintenant"
  },
  "A continuación": {
    "en": "Next up",
    "pt-BR": "A seguir",
    "fr": "À suivre"
  },
  "restante": {
    "en": "left",
    "pt-BR": "restante",
    "fr": "restant"
  },
  "para empezar": {
    "en": "to start",
    "pt-BR": "para começar",
    "fr": "avant le début"
  },
  "Nada más por hoy. Buen descanso.": {
    "en": "Nothing else today. Enjoy your rest.",
    "pt-BR": "Nada mais por hoje. Bom descanso.",
    "fr": "Rien de plus pour aujourd'hui. Bon repos."
  },
  "Reportar imprevisto": {
    "en": "Report incident",
    "pt-BR": "Reportar imprevisto",
    "fr": "Signaler un imprévu"
  },
  "Algo cambió mi día": {
    "en": "Something changed my day",
    "pt-BR": "Algo mudou no meu dia",
    "fr": "Quelque chose a changé dans ma journée"
  },
  "afectado": {
    "en": "affected",
    "pt-BR": "afetado",
    "fr": "affecté"
  },
  "Imprevisto": {
    "en": "Incident",
    "pt-BR": "Imprevisto",
    "fr": "Imprévu"
  },
  "Lista": {
    "en": "List",
    "pt-BR": "Lista",
    "fr": "Liste"
  },
  "Por horas": {
    "en": "By hour",
    "pt-BR": "Por horário",
    "fr": "Par heures"
  },
  "Sin actividades este día": {
    "en": "No activities this day",
    "pt-BR": "Sem atividades neste dia",
    "fr": "Aucune activité ce jour-là"
  },
  "¿Eliminar este bloque?": {
    "en": "Delete this block?",
    "pt-BR": "Excluir este bloco?",
    "fr": "Supprimer ce bloc ?"
  },
  "¿Eliminar este imprevisto?": {
    "en": "Delete this incident?",
    "pt-BR": "Excluir este imprevisto?",
    "fr": "Supprimer cet imprévu ?"
  },
  "Esta semana": {
    "en": "This week",
    "pt-BR": "Esta semana",
    "fr": "Cette semaine"
  },
  "Semana pasada": {
    "en": "Last week",
    "pt-BR": "Semana passada",
    "fr": "Semaine dernière"
  },
  "Próxima semana": {
    "en": "Next week",
    "pt-BR": "Próxima semana",
    "fr": "Semaine prochaine"
  },
  "Toca un día para ver detalle": {
    "en": "Tap a day to see details",
    "pt-BR": "Toque em um dia para ver detalhes",
    "fr": "Touche un jour pour voir le détail"
  },
  "Tiempo por categoría": {
    "en": "Time by category",
    "pt-BR": "Tempo por categoria",
    "fr": "Temps par catégorie"
  },
  "Metas": {
    "en": "Goals",
    "pt-BR": "Metas",
    "fr": "Objectifs"
  },
  "Sin bloques ni metas esta semana. Toca “Metas” para definirlas.": {
    "en": "No blocks or goals this week. Tap “Goals” to set them.",
    "pt-BR": "Sem blocos nem metas esta semana. Toque em “Metas” para defini-las.",
    "fr": "Aucun bloc ni objectif cette semaine. Touche « Objectifs » pour les définir."
  },
  "Metas semanales": {
    "en": "Weekly goals",
    "pt-BR": "Metas semanais",
    "fr": "Objectifs hebdomadaires"
  },
  "Define cuánto tiempo quieres dedicar por semana a cada categoría. Deja en 0 para no fijar meta.": {
    "en": "Set how much time you want to spend per week on each category. Leave at 0 to skip a goal.",
    "pt-BR": "Defina quanto tempo você quer dedicar por semana a cada categoria. Deixe em 0 para não definir meta.",
    "fr": "Définis combien de temps tu veux consacrer par semaine à chaque catégorie. Laisse à 0 pour ne pas fixer d'objectif."
  },
  "Borrar todas": {
    "en": "Clear all",
    "pt-BR": "Limpar todas",
    "fr": "Tout effacer"
  },
  "LUN": {
    "en": "MON",
    "pt-BR": "SEG",
    "fr": "LUN"
  },
  "MAR": {
    "en": "TUE",
    "pt-BR": "TER",
    "fr": "MAR"
  },
  "MIÉ": {
    "en": "WED",
    "pt-BR": "QUA",
    "fr": "MER"
  },
  "JUE": {
    "en": "THU",
    "pt-BR": "QUI",
    "fr": "JEU"
  },
  "VIE": {
    "en": "FRI",
    "pt-BR": "SEX",
    "fr": "VEN"
  },
  "SÁB": {
    "en": "SAT",
    "pt-BR": "SÁB",
    "fr": "SAM"
  },
  "DOM": {
    "en": "SUN",
    "pt-BR": "DOM",
    "fr": "DIM"
  },
  "Estadísticas": {
    "en": "Statistics",
    "pt-BR": "Estatísticas",
    "fr": "Statistiques"
  },
  "Mejor racha": {
    "en": "Best streak",
    "pt-BR": "Melhor sequência",
    "fr": "Meilleure série"
  },
  "Últimos 30 días": {
    "en": "Last 30 days",
    "pt-BR": "Últimos 30 dias",
    "fr": "30 derniers jours"
  },
  "Actividad": {
    "en": "Activity",
    "pt-BR": "Atividade",
    "fr": "Activité"
  },
  "Menos": {
    "en": "Less",
    "pt-BR": "Menos",
    "fr": "Moins"
  },
  "Más": {
    "en": "More",
    "pt-BR": "Mais",
    "fr": "Plus"
  },
  "Sin hábitos. Toca + para crear.": {
    "en": "No habits yet. Tap + to create one.",
    "pt-BR": "Sem hábitos. Toque em + para criar.",
    "fr": "Aucune habitude. Touche + pour en créer."
  },
  "Sin hábitos aún": {
    "en": "No habits yet",
    "pt-BR": "Ainda sem hábitos",
    "fr": "Aucune habitude pour l'instant"
  },
  "Sin detalle": {
    "en": "No detail",
    "pt-BR": "Sem detalhe",
    "fr": "Aucun détail"
  },
  "Editar hábito": {
    "en": "Edit habit",
    "pt-BR": "Editar hábito",
    "fr": "Modifier l'habitude"
  },
  "Arrastrar para reordenar": {
    "en": "Drag to reorder",
    "pt-BR": "Arraste para reordenar",
    "fr": "Glisser pour réorganiser"
  },
  "Arrastrar": {
    "en": "Drag",
    "pt-BR": "Arrastar",
    "fr": "Glisser"
  },
  "¿Eliminar este hábito? El historial se conserva.": {
    "en": "Delete this habit? History will be kept.",
    "pt-BR": "Excluir este hábito? O histórico é mantido.",
    "fr": "Supprimer cette habitude ? L'historique est conservé."
  },
  "Imprevistos": {
    "en": "Incidents",
    "pt-BR": "Imprevistos",
    "fr": "Imprévus"
  },
  "+ Reportar": {
    "en": "+ Report",
    "pt-BR": "+ Reportar",
    "fr": "+ Signaler"
  },
  "Este mes": {
    "en": "This month",
    "pt-BR": "Este mês",
    "fr": "Ce mois-ci"
  },
  "Top tipo": {
    "en": "Top type",
    "pt-BR": "Tipo principal",
    "fr": "Type principal"
  },
  "Horas afectadas · 12 sem": {
    "en": "Hours affected · 12 wk",
    "pt-BR": "Horas afetadas · 12 sem",
    "fr": "Heures affectées · 12 sem"
  },
  "h/sem": {
    "en": "h/wk",
    "pt-BR": "h/sem",
    "fr": "h/sem"
  },
  "Sin imprevistos. Bien ahí.": {
    "en": "No incidents. Nice work.",
    "pt-BR": "Sem imprevistos. Muito bem.",
    "fr": "Aucun imprévu. Bien joué."
  },
  "Hidratación": {
    "en": "Hydration",
    "pt-BR": "Hidratação",
    "fr": "Hydratation"
  },
  "0 de 8 vasos": {
    "en": "0 of 8 glasses",
    "pt-BR": "0 de 8 copos",
    "fr": "0 sur 8 verres"
  },
  "+ 1 vaso": {
    "en": "+ 1 glass",
    "pt-BR": "+ 1 copo",
    "fr": "+ 1 verre"
  },
  "Historial del diario": {
    "en": "Journal history",
    "pt-BR": "Histórico do diário",
    "fr": "Historique du journal"
  },
  "Bloques del día": {
    "en": "Day's blocks",
    "pt-BR": "Blocos do dia",
    "fr": "Blocs du jour"
  },
  "Sin hábitos": {
    "en": "No habits",
    "pt-BR": "Sem hábitos",
    "fr": "Aucune habitude"
  },
  "¿Cómo estuvo este bloque? Qué hiciste, cómo te sentiste…": {
    "en": "How did this block go? What you did, how you felt…",
    "pt-BR": "Como foi este bloco? O que você fez, como se sentiu…",
    "fr": "Comment s'est passé ce bloc ? Ce que tu as fait, ce que tu as ressenti…"
  },
  "Toca para agregar una nota": {
    "en": "Tap to add a note",
    "pt-BR": "Toque para adicionar uma nota",
    "fr": "Touche pour ajouter une note"
  },
  "Notas por bloques/hábitos guardadas.": {
    "en": "Block/habit notes saved.",
    "pt-BR": "Notas de blocos/hábitos salvas.",
    "fr": "Notes des blocs/habitudes enregistrées."
  },
  "Escribir diario": {
    "en": "Write in journal",
    "pt-BR": "Escrever diário",
    "fr": "Écrire dans le journal"
  },
  "Ver en Día": {
    "en": "View in Day",
    "pt-BR": "Ver no Dia",
    "fr": "Voir dans Jour"
  },
  "Plan 8 semanas": {
    "en": "8-Week Plan",
    "pt-BR": "Plano 8 semanas",
    "fr": "Plan 8 semaines"
  },
  "Título de la semana:": {
    "en": "Week title:",
    "pt-BR": "Título da semana:",
    "fr": "Titre de la semaine :"
  },
  "Editar tarea:": {
    "en": "Edit task:",
    "pt-BR": "Editar tarefa:",
    "fr": "Modifier la tâche :"
  },
  "Nueva tarea:": {
    "en": "New task:",
    "pt-BR": "Nova tarefa:",
    "fr": "Nouvelle tâche :"
  },
  "Título de la nueva semana:": {
    "en": "New week title:",
    "pt-BR": "Título da nova semana:",
    "fr": "Titre de la nouvelle semaine :"
  },
  "+ Tarea": {
    "en": "+ Task",
    "pt-BR": "+ Tarefa",
    "fr": "+ Tâche"
  },
  "Pomodoro": {
    "en": "Pomodoro",
    "pt-BR": "Pomodoro",
    "fr": "Pomodoro"
  },
  "Pomodoro y temporizador": {
    "en": "Pomodoro & timer",
    "pt-BR": "Pomodoro e temporizador",
    "fr": "Pomodoro et minuteur"
  },
  "Enfoque": {
    "en": "Focus",
    "pt-BR": "Foco",
    "fr": "Focus"
  },
  "Descanso corto": {
    "en": "Short break",
    "pt-BR": "Pausa curta",
    "fr": "Pause courte"
  },
  "Descanso largo": {
    "en": "Long break",
    "pt-BR": "Pausa longa",
    "fr": "Pause longue"
  },
  "Descanso largo · ronda completa": {
    "en": "Long break · round complete",
    "pt-BR": "Pausa longa · rodada completa",
    "fr": "Pause longue · série complète"
  },
  "Iniciar": {
    "en": "Start",
    "pt-BR": "Iniciar",
    "fr": "Démarrer"
  },
  "Pausar": {
    "en": "Pause",
    "pt-BR": "Pausar",
    "fr": "Suspendre"
  },
  "Continuar": {
    "en": "Continue",
    "pt-BR": "Continuar",
    "fr": "Continuer"
  },
  "Fase anterior": {
    "en": "Previous phase",
    "pt-BR": "Fase anterior",
    "fr": "Phase précédente"
  },
  "Fase siguiente": {
    "en": "Next phase",
    "pt-BR": "Próxima fase",
    "fr": "Phase suivante"
  },
  "↻ Reiniciar ciclos": {
    "en": "↻ Reset cycles",
    "pt-BR": "↻ Reiniciar ciclos",
    "fr": "↻ Réinitialiser les cycles"
  },
  "¿Reiniciar los ciclos? Volverás al ciclo 1, fase de enfoque.": {
    "en": "Reset cycles? You'll go back to cycle 1, focus phase.",
    "pt-BR": "Reiniciar os ciclos? Você voltará ao ciclo 1, fase de foco.",
    "fr": "Réinitialiser les cycles ? Tu reviendras au cycle 1, phase de focus."
  },
  "Ciclos por ronda": {
    "en": "Cycles per round",
    "pt-BR": "Ciclos por rodada",
    "fr": "Cycles par série"
  },
  "Total": {
    "en": "Total",
    "pt-BR": "Total",
    "fr": "Total"
  },
  "📊 Estadísticas por categoría": {
    "en": "📊 Stats by category",
    "pt-BR": "📊 Estatísticas por categoria",
    "fr": "📊 Statistiques par catégorie"
  },
  "Últimos 7 días": {
    "en": "Last 7 days",
    "pt-BR": "Últimos 7 dias",
    "fr": "7 derniers jours"
  },
  "Sin categoría": {
    "en": "No category",
    "pt-BR": "Sem categoria",
    "fr": "Aucune catégorie"
  },
  "Estadísticas Pomodoro": {
    "en": "Pomodoro Stats",
    "pt-BR": "Estatísticas Pomodoro",
    "fr": "Statistiques Pomodoro"
  },
  "Total acumulado": {
    "en": "Total accumulated",
    "pt-BR": "Total acumulado",
    "fr": "Total accumulé"
  },
  "Sesiones": {
    "en": "Sessions",
    "pt-BR": "Sessões",
    "fr": "Sessions"
  },
  "sesión": {
    "en": "session",
    "pt-BR": "sessão",
    "fr": "session"
  },
  "sesiones": {
    "en": "sessions",
    "pt-BR": "sessões",
    "fr": "sessions"
  },
  "Aún no hay sesiones de enfoque registradas.": {
    "en": "No focus sessions logged yet.",
    "pt-BR": "Ainda não há sessões de foco registradas.",
    "fr": "Aucune session de focus enregistrée pour l'instant."
  },
  "Gestiona todo tu contenido": {
    "en": "Manage all your content",
    "pt-BR": "Gerencie todo o seu conteúdo",
    "fr": "Gère tout ton contenu"
  },
  "Bloques": {
    "en": "Blocks",
    "pt-BR": "Blocos",
    "fr": "Blocs"
  },
  "Plan 8 sem.": {
    "en": "8-wk Plan",
    "pt-BR": "Plano 8 sem.",
    "fr": "Plan 8 sem."
  },
  "Ajustes": {
    "en": "Settings",
    "pt-BR": "Ajustes",
    "fr": "Paramètres"
  },
  "+ Semana": {
    "en": "+ Week",
    "pt-BR": "+ Semana",
    "fr": "+ Semaine"
  },
  "Sin bloques aún": {
    "en": "No blocks yet",
    "pt-BR": "Ainda sem blocos",
    "fr": "Aucun bloc pour l'instant"
  },
  "Sin imprevistos registrados": {
    "en": "No incidents logged",
    "pt-BR": "Sem imprevistos registrados",
    "fr": "Aucun imprévu enregistré"
  },
  "¿Eliminar imprevisto?": {
    "en": "Delete incident?",
    "pt-BR": "Excluir imprevisto?",
    "fr": "Supprimer l'imprévu ?"
  },
  "Todos los días": {
    "en": "Every day",
    "pt-BR": "Todos os dias",
    "fr": "Tous les jours"
  },
  "Lun–Vie": {
    "en": "Mon–Fri",
    "pt-BR": "Seg–Sex",
    "fr": "Lun–Ven"
  },
  "Fin de semana": {
    "en": "Weekend",
    "pt-BR": "Fim de semana",
    "fr": "Week-end"
  },
  "Mi": {
    "en": "W",
    "pt-BR": "Qu",
    "fr": "Me"
  },
  "Sábado": {
    "en": "Saturday",
    "pt-BR": "Sábado",
    "fr": "Samedi"
  },
  "Domingo": {
    "en": "Sunday",
    "pt-BR": "Domingo",
    "fr": "Dimanche"
  },
  "Debe existir al menos una categoría.": {
    "en": "You need at least one category.",
    "pt-BR": "Deve existir pelo menos uma categoria.",
    "fr": "Il doit exister au moins une catégorie."
  },
  "Nueva categoría": {
    "en": "New category",
    "pt-BR": "Nova categoria",
    "fr": "Nouvelle catégorie"
  },
  "Editar categoría": {
    "en": "Edit category",
    "pt-BR": "Editar categoria",
    "fr": "Modifier la catégorie"
  },
  "ej. Estudio": {
    "en": "e.g. Study",
    "pt-BR": "ex. Estudos",
    "fr": "ex. Études"
  },
  "Póngale nombre a la categoría.": {
    "en": "Give the category a name.",
    "pt-BR": "Dê um nome para a categoria.",
    "fr": "Donne un nom à la catégorie."
  },
  "Tema": {
    "en": "Theme",
    "pt-BR": "Tema",
    "fr": "Thème"
  },
  "Sistema": {
    "en": "System",
    "pt-BR": "Sistema",
    "fr": "Système"
  },
  "Claro": {
    "en": "Light",
    "pt-BR": "Claro",
    "fr": "Clair"
  },
  "Oscuro": {
    "en": "Dark",
    "pt-BR": "Escuro",
    "fr": "Sombre"
  },
  "Notificaciones": {
    "en": "Notifications",
    "pt-BR": "Notificações",
    "fr": "Notifications"
  },
  "Activas. Recibirás aviso 5 min antes y al iniciar cada bloque, con acciones rápidas Listo y Posponer 10 min.": {
    "en": "On. You'll get a heads-up 5 min before and when each block starts, with quick actions Done and Snooze 10 min.",
    "pt-BR": "Ativas. Você receberá um aviso 5 min antes e ao iniciar cada bloco, com ações rápidas Feito e Adiar 10 min.",
    "fr": "Activées. Tu recevras un avis 5 min avant et au début de chaque bloc, avec des actions rapides Fait et Reporter 10 min."
  },
  "Android necesita permiso para \"alarmas exactas\" (si no, los avisos pueden retrasarse varios minutos).": {
    "en": "Android needs permission for \"exact alarms\" (otherwise, alerts may be delayed a few minutes).",
    "pt-BR": "O Android precisa de permissão para \"alarmes exatos\" (caso contrário, os avisos podem atrasar alguns minutos).",
    "fr": "Android a besoin de la permission pour les \"alarmes exactes\" (sinon, les avis peuvent être retardés de plusieurs minutes)."
  },
  "Permitir alarmas exactas": {
    "en": "Allow exact alarms",
    "pt-BR": "Permitir alarmes exatos",
    "fr": "Autoriser les alarmes exactes"
  },
  "Recordatorio de hábitos": {
    "en": "Habit reminder",
    "pt-BR": "Lembrete de hábitos",
    "fr": "Rappel d'habitudes"
  },
  "Aviso suave (sin sonido) a la hora que elijas. Solo aparece si aún quedan hábitos por hacer.": {
    "en": "A gentle heads-up (no sound) at the time you choose. Only shows up if you still have habits left to do.",
    "pt-BR": "Aviso suave (sem som) no horário que você escolher. Só aparece se ainda houver hábitos pendentes.",
    "fr": "Avis discret (sans son) à l'heure que tu choisis. N'apparaît que s'il reste des habitudes à faire."
  },
  "Quitar": {
    "en": "Remove",
    "pt-BR": "Remover",
    "fr": "Retirer"
  },
  "Sin recordatorio.": {
    "en": "No reminder set.",
    "pt-BR": "Sem lembrete.",
    "fr": "Aucun rappel."
  },
  "Elige una hora.": {
    "en": "Choose a time.",
    "pt-BR": "Escolha um horário.",
    "fr": "Choisis une heure."
  },
  "Modo Fin de Semana": {
    "en": "Weekend Mode",
    "pt-BR": "Modo Fim de Semana",
    "fr": "Mode week-end"
  },
  "Los sábados y domingos, tu horario cambia automáticamente al de fin de semana. Activa esta opción para además recibir las notificaciones de bloques en silencio (sin sonido ni vibración) esos días.": {
    "en": "On Saturdays and Sundays, your schedule automatically switches to the weekend one. Turn this on to also get block notifications silently (no sound or vibration) on those days.",
    "pt-BR": "No sábado e no domingo, seu horário muda automaticamente para o de fim de semana. Ative esta opção para também receber as notificações de blocos em silêncio (sem som nem vibração) nesses dias.",
    "fr": "Les samedis et dimanches, ton horaire change automatiquement pour celui du week-end. Active cette option pour en plus recevoir les notifications de blocs en silencieux (sans son ni vibration) ces jours-là."
  },
  "Notificaciones normales sab/dom": {
    "en": "Normal notifications on Sat/Sun",
    "pt-BR": "Notificações normais sáb/dom",
    "fr": "Notifications normales sam/dim"
  },
  "Silencio automático sab/dom activo": {
    "en": "Auto-silent on Sat/Sun is on",
    "pt-BR": "Silêncio automático sáb/dom ativo",
    "fr": "Silence automatique sam/dim actif"
  },
  "entre semana": {
    "en": "weekday",
    "pt-BR": "dia de semana",
    "fr": "semaine"
  },
  "sábado": {
    "en": "Saturday",
    "pt-BR": "sábado",
    "fr": "samedi"
  },
  "domingo": {
    "en": "Sunday",
    "pt-BR": "domingo",
    "fr": "dimanche"
  },
  "Hidratación activada": {
    "en": "Hydration on",
    "pt-BR": "Hidratação ativada",
    "fr": "Hydratation activée"
  },
  "Hidratación desactivada": {
    "en": "Hydration off",
    "pt-BR": "Hidratação desativada",
    "fr": "Hydratation désactivée"
  },
  "Meta diaria de agua y recordatorios opcionales. Las notificaciones son suaves (sin sonido).": {
    "en": "Daily water goal and optional reminders. Notifications are silent (no sound).",
    "pt-BR": "Meta diária de água e lembretes opcionais. As notificações são suaves (sem som).",
    "fr": "Objectif quotidien d'eau et rappels optionnels. Les notifications sont discrètes (sans son)."
  },
  "Meta (vasos)": {
    "en": "Goal (glasses)",
    "pt-BR": "Meta (copos)",
    "fr": "Objectif (verres)"
  },
  "ml por vaso (opcional)": {
    "en": "ml per glass (optional)",
    "pt-BR": "ml por copo (opcional)",
    "fr": "ml par verre (optionnel)"
  },
  "Recordatorios al día (0 = sin recordatorios)": {
    "en": "Reminders per day (0 = no reminders)",
    "pt-BR": "Lembretes por dia (0 = sem lembretes)",
    "fr": "Rappels par jour (0 = sans rappels)"
  },
  "Hidratación desactivada.": {
    "en": "Hydration off.",
    "pt-BR": "Hidratação desativada.",
    "fr": "Hydratation désactivée."
  },
  "Sin recordatorios activos.": {
    "en": "No active reminders.",
    "pt-BR": "Sem lembretes ativos.",
    "fr": "Aucun rappel actif."
  },
  "Guardado. Hidratación desactivada.": {
    "en": "Saved. Hydration off.",
    "pt-BR": "Salvo. Hidratação desativada.",
    "fr": "Enregistré. Hydratation désactivée."
  },
  "Guardado. Sin recordatorios activos.": {
    "en": "Saved. No active reminders.",
    "pt-BR": "Salvo. Sem lembretes ativos.",
    "fr": "Enregistré. Aucun rappel actif."
  },
  "No Molestar automático": {
    "en": "Auto Do Not Disturb",
    "pt-BR": "Não Perturbe automático",
    "fr": "Ne pas déranger automatique"
  },
  "Activa el modo No Molestar (solo prioridad) al iniciar bloques de trabajo o enfoque, y lo desactiva al terminar.": {
    "en": "Turns on Do Not Disturb (priority only) when work or focus blocks start, and turns it off when they end.",
    "pt-BR": "Ativa o modo Não Perturbe (só prioridade) ao iniciar blocos de trabalho ou foco, e desativa ao terminar.",
    "fr": "Active le mode Ne pas déranger (priorité uniquement) au début des blocs de travail ou de focus, et le désactive à la fin."
  },
  "Falta el permiso de Android para controlar No Molestar.": {
    "en": "Missing Android permission to control Do Not Disturb.",
    "pt-BR": "Falta a permissão do Android para controlar o Não Perturbe.",
    "fr": "La permission Android pour contrôler Ne pas déranger est manquante."
  },
  "Se activará en bloques de trabajo o enfoque.": {
    "en": "Turns on during work or focus blocks.",
    "pt-BR": "Será ativado em blocos de trabalho ou foco.",
    "fr": "S'activera lors des blocs de travail ou de focus."
  },
  "Datos": {
    "en": "Data",
    "pt-BR": "Dados",
    "fr": "Données"
  },
  "Exportar datos (JSON)": {
    "en": "Export data (JSON)",
    "pt-BR": "Exportar dados (JSON)",
    "fr": "Exporter les données (JSON)"
  },
  "Importar datos (JSON)": {
    "en": "Import data (JSON)",
    "pt-BR": "Importar dados (JSON)",
    "fr": "Importer les données (JSON)"
  },
  "Deshacer última importación": {
    "en": "Undo last import",
    "pt-BR": "Desfazer última importação",
    "fr": "Annuler la dernière importation"
  },
  "Restablecer todo": {
    "en": "Reset everything",
    "pt-BR": "Restaurar tudo",
    "fr": "Tout réinitialiser"
  },
  "Sobre": {
    "en": "About",
    "pt-BR": "Sobre",
    "fr": "À propos"
  },
  "Rutinal · versión 1.0<br>Hecho para el día a día con bloques, hábitos e imprevistos.": {
    "en": "Rutinal · version 1.0<br>Made for everyday life with blocks, habits, and incidents.",
    "pt-BR": "Rutinal · versão 1.0<br>Feito para o dia a dia com blocos, hábitos e imprevistos.",
    "fr": "Rutinal · version 1.0<br>Conçu pour le quotidien avec des blocs, des habitudes et des imprévus."
  },
  "Este archivo no parece un backup válido de Rutinal.": {
    "en": "This file doesn't look like a valid Rutinal backup.",
    "pt-BR": "Este arquivo não parece ser um backup válido do Rutinal.",
    "fr": "Ce fichier ne semble pas être une sauvegarde valide de Rutinal."
  },
  "fecha desconocida": {
    "en": "unknown date",
    "pt-BR": "data desconhecida",
    "fr": "date inconnue"
  },
  "Datos importados. La app se recargará.": {
    "en": "Data imported. The app will reload.",
    "pt-BR": "Dados importados. O app será recarregado.",
    "fr": "Données importées. L'application va se recharger."
  },
  "JSON malformado": {
    "en": "Malformed JSON",
    "pt-BR": "JSON malformado",
    "fr": "JSON mal formé"
  },
  "No hay backup previo disponible.": {
    "en": "No previous backup available.",
    "pt-BR": "Não há backup anterior disponível.",
    "fr": "Aucune sauvegarde précédente disponible."
  },
  "Restaurar tus datos al estado anterior a la última importación?": {
    "en": "Restore your data to the state before the last import?",
    "pt-BR": "Restaurar seus dados ao estado anterior à última importação?",
    "fr": "Restaurer tes données à l'état précédant la dernière importation ?"
  },
  "Estado restaurado. La app se recargará.": {
    "en": "State restored. The app will reload.",
    "pt-BR": "Estado restaurado. O app será recarregado.",
    "fr": "État restauré. L'application va se recharger."
  },
  "¿Borrar TODOS los datos y volver a los valores por defecto? Esto no se puede deshacer.": {
    "en": "Delete ALL data and go back to defaults? This can't be undone.",
    "pt-BR": "Excluir TODOS os dados e voltar aos valores padrão? Isso não pode ser desfeito.",
    "fr": "Effacer TOUTES les données et revenir aux valeurs par défaut ? Cette action ne peut pas être annulée."
  },
  "Confirmar de nuevo: se perderán bloques, hábitos, historial, imprevistos y ajustes.": {
    "en": "Confirm again: you'll lose blocks, habits, history, incidents, and settings.",
    "pt-BR": "Confirme novamente: você vai perder blocos, hábitos, histórico, imprevistos e ajustes.",
    "fr": "Confirme à nouveau : tu perdras les blocs, habitudes, historique, imprévus et paramètres."
  },
  "Nuevo bloque": {
    "en": "New block",
    "pt-BR": "Novo bloco",
    "fr": "Nouveau bloc"
  },
  "Editar bloque": {
    "en": "Edit block",
    "pt-BR": "Editar bloco",
    "fr": "Modifier le bloc"
  },
  "ej. Reunión de equipo": {
    "en": "e.g. Team meeting",
    "pt-BR": "ex. Reunião de equipe",
    "fr": "ex. Réunion d'équipe"
  },
  "Días": {
    "en": "Days",
    "pt-BR": "Dias",
    "fr": "Jours"
  },
  "Solo una vez": {
    "en": "One time only",
    "pt-BR": "Só uma vez",
    "fr": "Une seule fois"
  },
  "Completa nombre, inicio y fin.": {
    "en": "Fill in name, start, and end.",
    "pt-BR": "Preencha nome, início e fim.",
    "fr": "Remplis le nom, le début et la fin."
  },
  "El fin debe ser posterior al inicio.": {
    "en": "End must be after start.",
    "pt-BR": "O fim deve ser depois do início.",
    "fr": "La fin doit être postérieure au début."
  },
  "Elige la fecha del bloque de una sola vez.": {
    "en": "Pick a date for the one-time block.",
    "pt-BR": "Escolha a data do bloco de uma única vez.",
    "fr": "Choisis la date du bloc unique."
  },
  "Selecciona al menos un día.": {
    "en": "Select at least one day.",
    "pt-BR": "Selecione pelo menos um dia.",
    "fr": "Sélectionne au moins un jour."
  },
  "Nuevo hábito": {
    "en": "New habit",
    "pt-BR": "Novo hábito",
    "fr": "Nouvelle habitude"
  },
  "ej. Meditar 10 min": {
    "en": "e.g. Meditate 10 min",
    "pt-BR": "ex. Meditar 10 min",
    "fr": "ex. Méditer 10 min"
  },
  "ej. Todas las mañanas": {
    "en": "e.g. Every morning",
    "pt-BR": "ex. Todas as manhãs",
    "fr": "ex. Tous les matins"
  },
  "¿Por qué lo hago? Meta, plan, recordatorios…": {
    "en": "Why am I doing this? Goal, plan, reminders…",
    "pt-BR": "Por que eu faço isso? Meta, plano, lembretes…",
    "fr": "Pourquoi je le fais ? Objectif, plan, rappels…"
  },
  "Ponle nombre.": {
    "en": "Give it a name.",
    "pt-BR": "Dê um nome.",
    "fr": "Donne-lui un nom."
  },
  "Nuevo imprevisto": {
    "en": "New incident",
    "pt-BR": "Novo imprevisto",
    "fr": "Nouvel imprévu"
  },
  "Editar imprevisto": {
    "en": "Edit incident",
    "pt-BR": "Editar imprevisto",
    "fr": "Modifier l'imprévu"
  },
  "¿Qué pasó?": {
    "en": "What happened?",
    "pt-BR": "O que aconteceu?",
    "fr": "Qu'est-ce qui s'est passé ?"
  },
  "ej. Junta urgente": {
    "en": "e.g. Urgent meeting",
    "pt-BR": "ex. Reunião urgente",
    "fr": "ex. Réunion urgente"
  },
  "Completa todos los campos.": {
    "en": "Fill in all fields.",
    "pt-BR": "Preencha todos os campos.",
    "fr": "Remplis tous les champs."
  },
  "Toca una tarjeta para agregar o editar una nota.": {
    "en": "Tap a card to add or edit a note.",
    "pt-BR": "Toque em um cartão para adicionar ou editar uma nota.",
    "fr": "Touche une carte pour ajouter ou modifier une note."
  },
  "¿Cómo estuvo tu día? Qué aprendiste, cómo te sentiste…": {
    "en": "How was your day? What you learned, how you felt…",
    "pt-BR": "Como foi o seu dia? O que você aprendeu, como se sentiu…",
    "fr": "Comment s'est passée ta journée ? Ce que tu as appris, ce que tu as ressenti…"
  },
  "Nota sobre este hábito…": {
    "en": "Note about this habit…",
    "pt-BR": "Nota sobre este hábito…",
    "fr": "Note à propos de cette habitude…"
  },
  "Sin bloques ese día": {
    "en": "No blocks that day",
    "pt-BR": "Sem blocos nesse dia",
    "fr": "Aucun bloc ce jour-là"
  },
  "Buscar en tu diario…": {
    "en": "Search your journal…",
    "pt-BR": "Buscar no seu diário…",
    "fr": "Rechercher dans ton journal…"
  },
  "Aún no hay entradas en el diario. Toca un día en el calendario para empezar.": {
    "en": "No journal entries yet. Tap a day on the calendar to start.",
    "pt-BR": "Ainda não há entradas no diário. Toque em um dia no calendário para começar.",
    "fr": "Aucune entrée dans le journal pour l'instant. Touche un jour dans le calendrier pour commencer."
  },
  "HOY": {
    "en": "TODAY",
    "pt-BR": "HOJE",
    "fr": "AUJOURD'HUI"
  },
  "Sin texto libre, pero hay notas guardadas.": {
    "en": "No free text, but there are saved notes.",
    "pt-BR": "Sem texto livre, mas há notas salvas.",
    "fr": "Aucun texte libre, mais des notes sont enregistrées."
  },
  "Personal": {
    "en": "Personal",
    "pt-BR": "Pessoal",
    "fr": "Personnel"
  },
  "Trabajo": {
    "en": "Work",
    "pt-BR": "Trabalho",
    "fr": "Travail"
  },
  "Gym": {
    "en": "Gym",
    "pt-BR": "Academia",
    "fr": "Sport"
  },
  "Hobby": {
    "en": "Hobby",
    "pt-BR": "Hobby",
    "fr": "Hobby"
  },
  "Pareja": {
    "en": "Partner",
    "pt-BR": "Parceiro(a)",
    "fr": "Partenaire"
  },
  "Comida": {
    "en": "Food",
    "pt-BR": "Refeição",
    "fr": "Repas"
  },
  "Trabajo urgente": {
    "en": "Urgent work",
    "pt-BR": "Trabalho urgente",
    "fr": "Travail urgent"
  },
  "Salud": {
    "en": "Health",
    "pt-BR": "Saúde",
    "fr": "Santé"
  },
  "Familia": {
    "en": "Family",
    "pt-BR": "Família",
    "fr": "Famille"
  },
  "Tráfico / traslado": {
    "en": "Traffic / commute",
    "pt-BR": "Trânsito / deslocamento",
    "fr": "Trafic / trajet"
  },
  "Técnico / falla": {
    "en": "Technical / failure",
    "pt-BR": "Técnico / falha",
    "fr": "Technique / panne"
  },
  "Social": {
    "en": "Social",
    "pt-BR": "Social",
    "fr": "Social"
  },
  "Otro": {
    "en": "Other",
    "pt-BR": "Outro",
    "fr": "Autre"
  },
  "Ropa gym + salir": {
    "en": "Gym clothes + leave",
    "pt-BR": "Roupa da academia + saída",
    "fr": "Tenue de sport + sortir"
  },
  "Baño + arreglarse": {
    "en": "Shower + get ready",
    "pt-BR": "Banho + se arrumar",
    "fr": "Douche + se préparer"
  },
  "Trabajo mañana": {
    "en": "Morning work",
    "pt-BR": "Trabalho manhã",
    "fr": "Travail matin"
  },
  "Curso teórico": {
    "en": "Theory course",
    "pt-BR": "Curso teórico",
    "fr": "Cours théorique"
  },
  "Trabajo tarde": {
    "en": "Afternoon work",
    "pt-BR": "Trabalho tarde",
    "fr": "Travail après-midi"
  },
  "Traslado": {
    "en": "Commute",
    "pt-BR": "Deslocamento",
    "fr": "Trajet"
  },
  "Vida personal / pareja": {
    "en": "Personal / partner time",
    "pt-BR": "Vida pessoal / parceiro(a)",
    "fr": "Vie personnelle / partenaire"
  },
  "Cierre del día": {
    "en": "Day close-out",
    "pt-BR": "Encerramento do dia",
    "fr": "Clôture de la journée"
  },
  "Hobby del día": {
    "en": "Daily hobby",
    "pt-BR": "Hobby do dia",
    "fr": "Hobby du jour"
  },
  "Dormir": {
    "en": "Sleep",
    "pt-BR": "Dormir",
    "fr": "Dormir"
  },
  "Despertar tranquilo": {
    "en": "Calm wake-up",
    "pt-BR": "Despertar tranquilo",
    "fr": "Réveil tranquille"
  },
  "Videojuegos práctico": {
    "en": "Gaming practice",
    "pt-BR": "Videogame prático",
    "fr": "Jeux vidéo pratique"
  },
  "Gym opcional": {
    "en": "Optional gym",
    "pt-BR": "Academia opcional",
    "fr": "Sport optionnel"
  },
  "Vida social / pareja": {
    "en": "Social / partner time",
    "pt-BR": "Vida social / parceiro(a)",
    "fr": "Vie sociale / partenaire"
  },
  "Dibujo práctico": {
    "en": "Drawing practice",
    "pt-BR": "Desenho prático",
    "fr": "Dessin pratique"
  },
  "Revisión semanal": {
    "en": "Weekly review",
    "pt-BR": "Revisão semanal",
    "fr": "Bilan hebdomadaire"
  },
  "Descanso / familia": {
    "en": "Rest / family",
    "pt-BR": "Descanso / família",
    "fr": "Repos / famille"
  },
  "Cierre + prep semana": {
    "en": "Close-out + week prep",
    "pt-BR": "Encerramento + preparo da semana",
    "fr": "Clôture + prép. semaine"
  },
  "Gym 7:00 am": {
    "en": "Gym 7:00 am",
    "pt-BR": "Academia 7:00",
    "fr": "Sport 7 h 00"
  },
  "Lun a Vie · 90 min": {
    "en": "Mon to Fri · 90 min",
    "pt-BR": "Seg a Sex · 90 min",
    "fr": "Lun à Ven · 90 min"
  },
  "Celular fuera del cuarto": {
    "en": "Phone out of the room",
    "pt-BR": "Celular fora do quarto",
    "fr": "Téléphone hors de la chambre"
  },
  "Todas las noches · 22:00": {
    "en": "Every night · 10:00 pm",
    "pt-BR": "Todas as noites · 22:00",
    "fr": "Tous les soirs · 22 h 00"
  },
  "Dormir 22:45": {
    "en": "Sleep 10:45 pm",
    "pt-BR": "Dormir 22:45",
    "fr": "Dormir 22 h 45"
  },
  "8 horas · sin pantalla": {
    "en": "8 hours · no screens",
    "pt-BR": "8 horas · sem tela",
    "fr": "8 heures · sans écran"
  },
  "Rutina base": {
    "en": "Base routine",
    "pt-BR": "Rotina base",
    "fr": "Routine de base"
  },
  "Comprar reloj despertador": {
    "en": "Buy an alarm clock",
    "pt-BR": "Comprar despertador",
    "fr": "Acheter un réveil"
  },
  "Preparar ropa de gym la noche anterior": {
    "en": "Set out gym clothes the night before",
    "pt-BR": "Preparar a roupa da academia na noite anterior",
    "fr": "Préparer la tenue de sport la veille"
  },
  "Gym 7:00 am cada día (lun-vie)": {
    "en": "Gym 7:00 am every day (Mon-Fri)",
    "pt-BR": "Academia 7:00 todos os dias (seg-sex)",
    "fr": "Sport 7 h 00 chaque jour (lun-ven)"
  },
  "Celular fuera del cuarto desde las 22:00": {
    "en": "Phone out of the room from 10:00 pm",
    "pt-BR": "Celular fora do quarto a partir das 22:00",
    "fr": "Téléphone hors de la chambre à partir de 22 h 00"
  },
  "Dormir 22:45 en punto": {
    "en": "Sleep 10:45 pm sharp",
    "pt-BR": "Dormir 22:45 em ponto",
    "fr": "Dormir à 22 h 45 précises"
  },
  "Consolidar rutina base": {
    "en": "Lock in the base routine",
    "pt-BR": "Consolidar rotina base",
    "fr": "Consolider la routine de base"
  },
  "Mantener los 3 hábitos de semana 1": {
    "en": "Keep up the 3 habits from week 1",
    "pt-BR": "Manter os 3 hábitos da semana 1",
    "fr": "Maintenir les 3 habitudes de la semaine 1"
  },
  "Notar qué día se rompió y por qué": {
    "en": "Notice which day slipped and why",
    "pt-BR": "Anotar em qual dia falhou e por quê",
    "fr": "Noter quel jour ça a échoué et pourquoi"
  },
  "Ajustar horario si algo no cuadra": {
    "en": "Adjust schedule if something's off",
    "pt-BR": "Ajustar horário se algo não encaixar",
    "fr": "Ajuster l'horaire si quelque chose ne colle pas"
  },
  "Configurar Modo Enfoque en Android": {
    "en": "Set up Focus Mode on Android",
    "pt-BR": "Configurar Modo Foco no Android",
    "fr": "Configurer le Mode Focus sur Android"
  },
  "Agregar lectura": {
    "en": "Add reading",
    "pt-BR": "Adicionar leitura",
    "fr": "Ajouter la lecture"
  },
  "Elegir 1 libro físico": {
    "en": "Pick 1 physical book",
    "pt-BR": "Escolher 1 livro físico",
    "fr": "Choisir 1 livre physique"
  },
  "Ponerlo sobre la almohada": {
    "en": "Put it on your pillow",
    "pt-BR": "Deixá-lo sobre o travesseiro",
    "fr": "Le poser sur l'oreiller"
  },
  "Leer 15-30 min antes de dormir (lun/mié/vie)": {
    "en": "Read 15-30 min before bed (Mon/Wed/Fri)",
    "pt-BR": "Ler 15-30 min antes de dormir (seg/qua/sex)",
    "fr": "Lire 15-30 min avant de dormir (lun/mer/ven)"
  },
  "Meta: 3 sesiones esta semana": {
    "en": "Goal: 3 sessions this week",
    "pt-BR": "Meta: 3 sessões esta semana",
    "fr": "Objectif : 3 sessions cette semaine"
  },
  "Curso teórico en comida": {
    "en": "Theory course during lunch",
    "pt-BR": "Curso teórico na hora da refeição",
    "fr": "Cours théorique pendant le repas"
  },
  "Descargar clases de Udemy offline": {
    "en": "Download Udemy classes offline",
    "pt-BR": "Baixar aulas da Udemy offline",
    "fr": "Télécharger des cours Udemy hors ligne"
  },
  "Ver 1 clase durante la comida (lun/mié/vie)": {
    "en": "Watch 1 class during lunch (Mon/Wed/Fri)",
    "pt-BR": "Ver 1 aula durante a refeição (seg/qua/sex)",
    "fr": "Regarder 1 cours pendant le repas (lun/mer/ven)"
  },
  "Al terminar: escribir 2 líneas de lo aprendido": {
    "en": "When done: write 2 lines on what you learned",
    "pt-BR": "Ao terminar: escrever 2 linhas sobre o que aprendeu",
    "fr": "À la fin : écrire 2 lignes sur ce qui a été appris"
  },
  "Agregar dibujo": {
    "en": "Add drawing",
    "pt-BR": "Adicionar desenho",
    "fr": "Ajouter le dessin"
  },
  "Comprar cuaderno + set de lápices": {
    "en": "Buy a notebook + set of pencils",
    "pt-BR": "Comprar caderno + kit de lápis",
    "fr": "Acheter un carnet + un set de crayons"
  },
  "Dibujar 30 min martes y jueves": {
    "en": "Draw 30 min on Tuesdays and Thursdays",
    "pt-BR": "Desenhar 30 min na terça e quinta",
    "fr": "Dessiner 30 min mardi et jeudi"
  },
  "Empezar curso 21 Draw · lección 1": {
    "en": "Start 21 Draw course · lesson 1",
    "pt-BR": "Começar curso 21 Draw · lição 1",
    "fr": "Commencer le cours 21 Draw · leçon 1"
  },
  "Bloques largos": {
    "en": "Long blocks",
    "pt-BR": "Blocos longos",
    "fr": "Blocs longs"
  },
  "Sábado 9:00-11:30 · Videojuegos práctico": {
    "en": "Saturday 9:00-11:30 · Gaming practice",
    "pt-BR": "Sábado 9:00-11:30 · Videogame prático",
    "fr": "Samedi 9 h 00-11 h 30 · Jeux vidéo pratique"
  },
  "Domingo 9:00-11:30 · Dibujo práctico": {
    "en": "Sunday 9:00-11:30 · Drawing practice",
    "pt-BR": "Domingo 9:00-11:30 · Desenho prático",
    "fr": "Dimanche 9 h 00-11 h 30 · Dessin pratique"
  },
  "Domingo 11:30 · Revisión semanal 30 min": {
    "en": "Sunday 11:30 · Weekly review 30 min",
    "pt-BR": "Domingo 11:30 · Revisão semanal 30 min",
    "fr": "Dimanche 11 h 30 · Bilan hebdomadaire 30 min"
  },
  "Ajuste fino": {
    "en": "Fine-tuning",
    "pt-BR": "Ajuste fino",
    "fr": "Ajustement fin"
  },
  "Identificar qué hábitos se rompieron y por qué": {
    "en": "Identify which habits slipped and why",
    "pt-BR": "Identificar quais hábitos falharam e por quê",
    "fr": "Identifier quelles habitudes ont échoué et pourquoi"
  },
  "Reducir o eliminar lo que no funciona": {
    "en": "Cut or reduce what isn't working",
    "pt-BR": "Reduzir ou eliminar o que não funciona",
    "fr": "Réduire ou éliminer ce qui ne fonctionne pas"
  },
  "Confirmar días con pareja (mar, jue, sáb)": {
    "en": "Confirm days with partner (Tue, Thu, Sat)",
    "pt-BR": "Confirmar dias com o parceiro(a) (ter, qui, sáb)",
    "fr": "Confirmer les jours avec le/la partenaire (mar, jeu, sam)"
  },
  "Piloto automático": {
    "en": "Autopilot",
    "pt-BR": "Piloto automático",
    "fr": "Pilote automatique"
  },
  "Hábitos base sin recordatorios": {
    "en": "Base habits without reminders",
    "pt-BR": "Hábitos base sem lembretes",
    "fr": "Habitudes de base sans rappels"
  },
  "Revisar avance en cursos": {
    "en": "Check progress on courses",
    "pt-BR": "Revisar progresso nos cursos",
    "fr": "Vérifier l'avancement des cours"
  },
  "Contar libros leídos + sesiones de dibujo": {
    "en": "Count books read + drawing sessions",
    "pt-BR": "Contar livros lidos + sessões de desenho",
    "fr": "Compter les livres lus + sessions de dessin"
  },
  "Definir siguiente ciclo de 8 semanas": {
    "en": "Set up the next 8-week cycle",
    "pt-BR": "Definir próximo ciclo de 8 semanas",
    "fr": "Définir le prochain cycle de 8 semaines"
  },
  "lunes": {
    "en": "monday",
    "pt-BR": "segunda-feira",
    "fr": "lundi"
  },
  "martes": {
    "en": "tuesday",
    "pt-BR": "terça-feira",
    "fr": "mardi"
  },
  "miércoles": {
    "en": "wednesday",
    "pt-BR": "quarta-feira",
    "fr": "mercredi"
  },
  "jueves": {
    "en": "thursday",
    "pt-BR": "quinta-feira",
    "fr": "jeudi"
  },
  "viernes": {
    "en": "friday",
    "pt-BR": "sexta-feira",
    "fr": "vendredi"
  },
  "Lunes": {
    "en": "Monday",
    "pt-BR": "Segunda",
    "fr": "Lundi"
  },
  "Martes": {
    "en": "Tuesday",
    "pt-BR": "Terça",
    "fr": "Mardi"
  },
  "Miércoles": {
    "en": "Wednesday",
    "pt-BR": "Quarta",
    "fr": "Mercredi"
  },
  "Jueves": {
    "en": "Thursday",
    "pt-BR": "Quinta",
    "fr": "Jeudi"
  },
  "Viernes": {
    "en": "Friday",
    "pt-BR": "Sexta",
    "fr": "Vendredi"
  },
  "dom": {
    "en": "sun",
    "pt-BR": "dom",
    "fr": "dim"
  },
  "lun": {
    "en": "mon",
    "pt-BR": "seg",
    "fr": "lun"
  },
  "mar": {
    "en": "tue",
    "pt-BR": "ter",
    "fr": "mar"
  },
  "mié": {
    "en": "wed",
    "pt-BR": "qua",
    "fr": "mer"
  },
  "jue": {
    "en": "thu",
    "pt-BR": "qui",
    "fr": "jeu"
  },
  "vie": {
    "en": "fri",
    "pt-BR": "sex",
    "fr": "ven"
  },
  "sáb": {
    "en": "sat",
    "pt-BR": "sáb",
    "fr": "sam"
  },
  "Lun": {
    "en": "Mon",
    "pt-BR": "Seg",
    "fr": "Lun"
  },
  "Mar": {
    "en": "Tue",
    "pt-BR": "Ter",
    "fr": "Mar"
  },
  "Mié": {
    "en": "Wed",
    "pt-BR": "Qua",
    "fr": "Mer"
  },
  "Jue": {
    "en": "Thu",
    "pt-BR": "Qui",
    "fr": "Jeu"
  },
  "Vie": {
    "en": "Fri",
    "pt-BR": "Sex",
    "fr": "Ven"
  },
  "enero": {
    "en": "january",
    "pt-BR": "janeiro",
    "fr": "janvier"
  },
  "febrero": {
    "en": "february",
    "pt-BR": "fevereiro",
    "fr": "février"
  },
  "marzo": {
    "en": "march",
    "pt-BR": "março",
    "fr": "mars"
  },
  "abril": {
    "en": "april",
    "pt-BR": "abril",
    "fr": "avril"
  },
  "mayo": {
    "en": "may",
    "pt-BR": "maio",
    "fr": "mai"
  },
  "junio": {
    "en": "june",
    "pt-BR": "junho",
    "fr": "juin"
  },
  "julio": {
    "en": "july",
    "pt-BR": "julho",
    "fr": "juillet"
  },
  "agosto": {
    "en": "august",
    "pt-BR": "agosto",
    "fr": "août"
  },
  "septiembre": {
    "en": "september",
    "pt-BR": "setembro",
    "fr": "septembre"
  },
  "octubre": {
    "en": "october",
    "pt-BR": "outubro",
    "fr": "octobre"
  },
  "noviembre": {
    "en": "november",
    "pt-BR": "novembro",
    "fr": "novembre"
  },
  "diciembre": {
    "en": "december",
    "pt-BR": "dezembro",
    "fr": "décembre"
  },
  "ene": {
    "en": "jan",
    "pt-BR": "jan",
    "fr": "jan"
  },
  "feb": {
    "en": "feb",
    "pt-BR": "fev",
    "fr": "fév"
  },
  "abr": {
    "en": "apr",
    "pt-BR": "abr",
    "fr": "avr"
  },
  "may": {
    "en": "may",
    "pt-BR": "mai",
    "fr": "mai"
  },
  "jun": {
    "en": "jun",
    "pt-BR": "jun",
    "fr": "jui"
  },
  "jul": {
    "en": "jul",
    "pt-BR": "jul",
    "fr": "jul"
  },
  "ago": {
    "en": "aug",
    "pt-BR": "ago",
    "fr": "aoû"
  },
  "sep": {
    "en": "sep",
    "pt-BR": "set",
    "fr": "sep"
  },
  "oct": {
    "en": "oct",
    "pt-BR": "out",
    "fr": "oct"
  },
  "nov": {
    "en": "nov",
    "pt-BR": "nov",
    "fr": "nov"
  },
  "dic": {
    "en": "dec",
    "pt-BR": "dez",
    "fr": "déc"
  },
  "min": {
    "en": "min",
    "pt-BR": "min",
    "fr": "min"
  },
  "ml": {
    "en": "ml",
    "pt-BR": "ml",
    "fr": "ml"
  },
  "vasos": {
    "en": "glasses",
    "pt-BR": "copos",
    "fr": "verres"
  },
  "racha": { "en": "streak", "pt-BR": "sequência", "fr": "série" },
  "Comida": { "en": "Food", "pt-BR": "Alimentação", "fr": "Nutrition" },
  "Desayuno": { "en": "Breakfast", "pt-BR": "Café da manhã", "fr": "Petit-déjeuner" },
  "Cena": { "en": "Dinner", "pt-BR": "Jantar", "fr": "Dîner" },
  "Snack": { "en": "Snack", "pt-BR": "Lanche", "fr": "Collation" },
  "kcal hoy": { "en": "kcal today", "pt-BR": "kcal hoje", "fr": "kcal aujourd'hui" },
  "Buscar alimento": { "en": "Search food", "pt-BR": "Buscar alimento", "fr": "Rechercher aliment" },
  "Escanear": { "en": "Scan", "pt-BR": "Escanear", "fr": "Scanner" },
  "+ Añadir alimento": { "en": "+ Add food", "pt-BR": "+ Adicionar alimento", "fr": "+ Ajouter un aliment" },
  "Añadir alimento": { "en": "Add food", "pt-BR": "Adicionar alimento", "fr": "Ajouter un aliment" },
  "Añadir porción": { "en": "Add portion", "pt-BR": "Adicionar porção", "fr": "Ajouter portion" },
  "Editar porción": { "en": "Edit portion", "pt-BR": "Editar porção", "fr": "Modifier portion" },
  "Cantidad": { "en": "Amount", "pt-BR": "Quantidade", "fr": "Quantité" },
  "porción (100g)": { "en": "serving (100g)", "pt-BR": "porção (100g)", "fr": "portion (100g)" },
  "Añadir": { "en": "Add", "pt-BR": "Adicionar", "fr": "Ajouter" },
  "Busca por nombre... (ej: plátano, leche)": { "en": "Search by name... (e.g. banana, milk)", "pt-BR": "Buscar por nome... (ex: banana, leite)", "fr": "Rechercher par nom... (ex : banane, lait)" },
  "Escribe al menos 2 letras para buscar": { "en": "Type at least 2 letters to search", "pt-BR": "Digite pelo menos 2 letras para buscar", "fr": "Tapez au moins 2 lettres pour rechercher" },
  "Buscando...": { "en": "Searching...", "pt-BR": "Buscando...", "fr": "Recherche..." },
  "Sin resultados. Prueba con otro término.": { "en": "No results. Try another term.", "pt-BR": "Sem resultados. Tente outro termo.", "fr": "Aucun résultat. Essayez un autre terme." },
  "Sin conexión. Intenta de nuevo.": { "en": "No connection. Try again.", "pt-BR": "Sem conexão. Tente novamente.", "fr": "Pas de connexion. Réessayez." },
  "Código de barras": { "en": "Barcode", "pt-BR": "Código de barras", "fr": "Code-barres" },
  "Escanea la app en tu teléfono para usar la cámara. O introduce el código manualmente:": { "en": "Scan the app on your phone to use the camera. Or enter the code manually:", "pt-BR": "Escaneie o app no seu telefone para usar a câmera. Ou digite o código manualmente:", "fr": "Scannez avec l'app de votre téléphone pour utiliser la caméra. Ou saisissez le code manuellement :" },
  "Consultando Open Food Facts...": { "en": "Querying Open Food Facts...", "pt-BR": "Consultando Open Food Facts...", "fr": "Consultation d'Open Food Facts..." },
  "No encontrado": { "en": "Not found", "pt-BR": "Não encontrado", "fr": "Introuvable" },
  "Buscar por nombre": { "en": "Search by name", "pt-BR": "Buscar por nome", "fr": "Rechercher par nom" },
  "Error": { "en": "Error", "pt-BR": "Erro", "fr": "Erreur" },
  "No se pudo consultar. Revisa tu conexión.": { "en": "Could not query. Check your connection.", "pt-BR": "Não foi possível consultar. Verifique sua conexão.", "fr": "Impossible de consulter. Vérifiez votre connexion." },
  "Alimento": { "en": "Food", "pt-BR": "Alimento", "fr": "Aliment" },
  "Sin hábitos todavía": { "en": "No habits yet", "pt-BR": "Sem hábitos ainda", "fr": "Aucune habitude pour l'instant" },
  "¡Día perfecto! +1 punto ganado. Sigue así mañana para mantener la racha": { "en": "Perfect day! +1 point earned. Keep it up tomorrow to keep the streak", "pt-BR": "Dia perfeito! +1 ponto ganho. Continue amanhã para manter a sequência", "fr": "Journée parfaite ! +1 point gagné. Continuez demain pour garder la série" },
  "Completa todos los hábitos para sumar +1 punto y no perder la racha": { "en": "Complete all habits to earn +1 point and keep the streak", "pt-BR": "Complete todos os hábitos para ganhar +1 ponto e manter a sequência", "fr": "Complétez toutes les habitudes pour gagner +1 point et garder la série" },
  "Crea al menos un hábito para empezar tu racha": { "en": "Create at least one habit to start your streak", "pt-BR": "Crie ao menos um hábito para começar sua sequência", "fr": "Créez au moins une habitude pour commencer votre série" },
  "Completa todos los hábitos hoy para empezar una nueva racha": { "en": "Complete all habits today to start a new streak", "pt-BR": "Complete todos os hábitos hoje para começar uma nova sequência", "fr": "Complétez toutes les habitudes aujourd'hui pour démarrer une nouvelle série" },
  "Apunta al código de barras": { "en": "Point at the barcode", "pt-BR": "Aponte para o código de barras", "fr": "Visez le code-barres" },
  "Sin permiso de cámara": { "en": "No camera permission", "pt-BR": "Sem permissão de câmera", "fr": "Pas d'autorisation d'accès à la caméra" },
  "Error al iniciar cámara": { "en": "Failed to start camera", "pt-BR": "Falha ao iniciar câmera", "fr": "Échec du démarrage de la caméra" },
  "Escanear código": { "en": "Scan code", "pt-BR": "Escanear código", "fr": "Scanner un code" },

  "Logros de la semana": { "en": "Weekly achievements", "pt-BR": "Conquistas da semana", "fr": "Défis de la semaine" },
  "3 días perfectos": { "en": "3 perfect days", "pt-BR": "3 dias perfeitos", "fr": "3 journées parfaites" },
  "5 días perfectos": { "en": "5 perfect days", "pt-BR": "5 dias perfeitos", "fr": "5 journées parfaites" },
  "Semana perfecta": { "en": "Perfect week", "pt-BR": "Semana perfeita", "fr": "Semaine parfaite" },
  "Completa todos los hábitos 3 días esta semana": { "en": "Complete all habits 3 days this week", "pt-BR": "Complete todos os hábitos em 3 dias desta semana", "fr": "Complétez toutes les habitudes 3 jours cette semaine" },
  "Completa todos los hábitos 5 días esta semana": { "en": "Complete all habits 5 days this week", "pt-BR": "Complete todos os hábitos em 5 dias desta semana", "fr": "Complétez toutes les habitudes 5 jours cette semaine" },
  "Completa todos los hábitos los 7 días": { "en": "Complete all habits every day", "pt-BR": "Complete todos os hábitos nos 7 dias", "fr": "Complétez toutes les habitudes les 7 jours" },
  "Hidratación al día": { "en": "Hydrated", "pt-BR": "Hidratação em dia", "fr": "Bien hydraté" },
  "Cumple tu meta de agua 3 días": { "en": "Hit your water goal 3 days", "pt-BR": "Atinja sua meta de água em 3 dias", "fr": "Atteignez votre objectif d'eau 3 jours" },
  "10 pomodoros": { "en": "10 pomodoros", "pt-BR": "10 pomodoros", "fr": "10 pomodoros" },
  "Completa 10 sesiones de foco esta semana": { "en": "Finish 10 focus sessions this week", "pt-BR": "Complete 10 sessões de foco nesta semana", "fr": "Terminez 10 sessions de focus cette semaine" },
  "Registra comida 5 días": { "en": "Log meals 5 days", "pt-BR": "Registre refeições 5 dias", "fr": "Enregistrez vos repas 5 jours" },
  "Anota al menos una comida 5 días de la semana": { "en": "Log at least one meal 5 days of the week", "pt-BR": "Registre pelo menos uma refeição em 5 dias da semana", "fr": "Enregistrez au moins un repas 5 jours par semaine" },
  "Sin romper la racha": { "en": "Streak unbroken", "pt-BR": "Sem quebrar a sequência", "fr": "Sans casser la série" },
  "Mantén tu racha activa toda la semana": { "en": "Keep your streak alive all week", "pt-BR": "Mantenha sua sequência ativa a semana toda", "fr": "Gardez votre série active toute la semaine" },
  "Madrugador": { "en": "Early bird", "pt-BR": "Madrugador", "fr": "Lève-tôt" },
  "Marca el primer hábito antes de las 9am 3 días": { "en": "Mark your first habit before 9am on 3 days", "pt-BR": "Marque o primeiro hábito antes das 9h em 3 dias", "fr": "Cochez la première habitude avant 9h pendant 3 jours" },
  "Revisión semanal": { "en": "Weekly review", "pt-BR": "Revisão semanal", "fr": "Bilan hebdomadaire" },
  "Tómalo cuando revises tu semana": { "en": "Check when you review your week", "pt-BR": "Marque quando revisar sua semana", "fr": "Cochez après votre bilan hebdo" },
  "Día de descanso activo": { "en": "Active rest day", "pt-BR": "Dia de descanso ativo", "fr": "Jour de repos actif" },
  "Un día de recuperación consciente": { "en": "A mindful recovery day", "pt-BR": "Um dia de recuperação consciente", "fr": "Une journée de récupération attentive" },

  "Calendario": { "en": "Calendar", "pt-BR": "Calendário", "fr": "Calendrier" },
  "Mes": { "en": "Month", "pt-BR": "Mês", "fr": "Mois" },
  "Día": { "en": "Day", "pt-BR": "Dia", "fr": "Jour" },
  "Semana": { "en": "Week", "pt-BR": "Semana", "fr": "Semaine" },
  "Toca un día para ver detalle": { "en": "Tap a day to see details", "pt-BR": "Toque em um dia para ver detalhes", "fr": "Touchez un jour pour voir les détails" },

  // === v1.4: Nutrición, USDA, anillos ===
  "Cumplí mi meta nutricional": { "en": "Met my nutrition goal", "pt-BR": "Cumpri minha meta nutricional", "fr": "Objectif nutritionnel atteint" },
  "Búsqueda de alimentos (USDA)": { "en": "Food search (USDA)", "pt-BR": "Busca de alimentos (USDA)", "fr": "Recherche d'aliments (USDA)" },
  "Usando DEMO_KEY compartida (30/hora).": { "en": "Using shared DEMO_KEY (30/hour).", "pt-BR": "Usando DEMO_KEY compartilhada (30/hora).", "fr": "Utilise DEMO_KEY partagée (30/heure)." },
  "Usando tu API key personal (1000/hora).": { "en": "Using your personal API key (1000/hour).", "pt-BR": "Usando sua chave API pessoal (1000/hora).", "fr": "Clé API personnelle (1000/heure)." },
  "Key guardada. Ahora tienes 1000 búsquedas/hora.": { "en": "Key saved. Now you have 1000 searches/hour.", "pt-BR": "Chave salva. Agora você tem 1000 buscas/hora.", "fr": "Clé enregistrée. 1000 recherches/heure." },
  "Configuración limpiada. Usando DEMO_KEY (30/hora).": { "en": "Config cleared. Using DEMO_KEY (30/hour).", "pt-BR": "Configuração limpa. Usando DEMO_KEY (30/hora).", "fr": "Réinitialisé. DEMO_KEY (30/heure)." },
  "Formato inválido. La key es una cadena larga de letras/números.": { "en": "Invalid format. The key is a long string of letters/numbers.", "pt-BR": "Formato inválido. A chave é uma cadeia longa de letras/números.", "fr": "Format invalide. Clé = longue chaîne alphanumérique." },
  "Key inválida o sin conexión. Verifica en api.data.gov.": { "en": "Invalid key or offline. Check api.data.gov.", "pt-BR": "Chave inválida ou offline. Verifique em api.data.gov.", "fr": "Clé invalide ou hors ligne. Vérifiez api.data.gov." },
  "Probando key...": { "en": "Testing key...", "pt-BR": "Testando chave...", "fr": "Test de la clé..." },
  "Proteína": { "en": "Protein", "pt-BR": "Proteína", "fr": "Protéines" },
  "Carbos": { "en": "Carbs", "pt-BR": "Carbos", "fr": "Glucides" },
  "Grasa": { "en": "Fat", "pt-BR": "Gordura", "fr": "Lipides" },
  "Configura tu meta en Editar": { "en": "Set your goal in Edit", "pt-BR": "Configure sua meta em Editar", "fr": "Configurez votre objectif dans Éditer" },
  "AUTO": { "en": "AUTO", "pt-BR": "AUTO", "fr": "AUTO" },
  "kcal hoy": { "en": "kcal today", "pt-BR": "kcal hoje", "fr": "kcal aujourd'hui" },
  "de {{n}} meta": { "en": "of {{n}} goal", "pt-BR": "de {{n}} meta", "fr": "sur {{n}} objectif" },
  "Mi nutrición": { "en": "My nutrition", "pt-BR": "Minha nutrição", "fr": "Ma nutrition" },
  "Mis platillos": { "en": "My dishes", "pt-BR": "Meus pratos", "fr": "Mes plats" },
  "Vista previa v1.4 · los datos no se guardan al recargar": { "en": "Preview v1.4 · data isn't saved on reload", "pt-BR": "Pré-visualização v1.4 · os dados não são salvos ao recarregar", "fr": "Aperçu v1.4 · les données ne sont pas enregistrées au rechargement" },
  "Buscar alimento": { "en": "Search food", "pt-BR": "Buscar alimento", "fr": "Rechercher un aliment" },
  "Escanear": { "en": "Scan", "pt-BR": "Escanear", "fr": "Scanner" },
  "Desayuno": { "en": "Breakfast", "pt-BR": "Café da manhã", "fr": "Petit-déjeuner" },
  "Comida": { "en": "Lunch", "pt-BR": "Almoço", "fr": "Déjeuner" },
  "Cena": { "en": "Dinner", "pt-BR": "Jantar", "fr": "Dîner" },
  "Snack": { "en": "Snack", "pt-BR": "Lanche", "fr": "Collation" },
  "+ Añadir alimento": { "en": "+ Add food", "pt-BR": "+ Adicionar alimento", "fr": "+ Ajouter un aliment" },
  "Hoy": { "en": "Today", "pt-BR": "Hoje", "fr": "Aujourd'hui" },
  "Hábitos": { "en": "Habits", "pt-BR": "Hábitos", "fr": "Habitudes" }
};

  // Templates con {{var}} → { en, 'pt-BR', fr }
  const TEMPLATES = {
  "Sin resultados para “{{query}}”.": {
    "en": "No results for “{{query}}”.",
    "pt-BR": "Nenhum resultado para “{{query}}”.",
    "fr": "Aucun résultat pour « {{query}} »."
  },
  "Bloques · {{count}}": {
    "en": "Blocks · {{count}}",
    "pt-BR": "Blocos · {{count}}",
    "fr": "Blocs · {{count}}"
  },
  "Hábitos · {{count}}": {
    "en": "Habits · {{count}}",
    "pt-BR": "Hábitos · {{count}}",
    "fr": "Habitudes · {{count}}"
  },
  "Imprevistos · {{count}}": {
    "en": "Incidents · {{count}}",
    "pt-BR": "Imprevistos · {{count}}",
    "fr": "Imprévus · {{count}}"
  },
  "Categorías · {{count}}": {
    "en": "Categories · {{count}}",
    "pt-BR": "Categorias · {{count}}",
    "fr": "Catégories · {{count}}"
  },
  "Empieza a las {{time}}": {
    "en": "Starts at {{time}}",
    "pt-BR": "Começa às {{time}}",
    "fr": "Commence à {{time}}"
  },
  "racha {{count}}": {
    "en": "streak {{count}}",
    "pt-BR": "sequência {{count}}",
    "fr": "série {{count}}"
  },
  "{{day}}/{{month}} · {{done}}/{{total}} hábitos": {
    "en": "{{day}}/{{month}} · {{done}}/{{total}} habits",
    "pt-BR": "{{day}}/{{month}} · {{done}}/{{total}} hábitos",
    "fr": "{{day}}/{{month}} · {{done}}/{{total}} habitudes"
  },
  "racha {{current}}d · mejor {{best}}d": {
    "en": "streak {{current}}d · best {{best}}d",
    "pt-BR": "sequência {{current}}d · melhor {{best}}d",
    "fr": "série {{current}}j · meilleure {{best}}j"
  },
  "{{pct}}% hoy": {
    "en": "{{pct}}% today",
    "pt-BR": "{{pct}}% hoje",
    "fr": "{{pct}} % aujourd'hui"
  },
  "{{done}}/{{total}}": {
    "en": "{{done}}/{{total}}",
    "pt-BR": "{{done}}/{{total}}",
    "fr": "{{done}}/{{total}}"
  },
  "¿Eliminar hábito \"{{name}}\"? El historial se conserva.": {
    "en": "Delete habit \"{{name}}\"? History will be kept.",
    "pt-BR": "Excluir o hábito \"{{name}}\"? O histórico é mantido.",
    "fr": "Supprimer l'habitude \"{{name}}\" ? L'historique est conservé."
  },
  "{{count}} de {{goal}} vasos": {
    "en": "{{count}} of {{goal}} glasses",
    "pt-BR": "{{count}} de {{goal}} copos",
    "fr": "{{count}} sur {{goal}} verres"
  },
  "{{count}} ml": {
    "en": "{{count}} ml",
    "pt-BR": "{{count}} ml",
    "fr": "{{count}} ml"
  },
  "{{done}} de {{total}} tareas": {
    "en": "{{done}} of {{total}} tasks",
    "pt-BR": "{{done}} de {{total}} tarefas",
    "fr": "{{done}} sur {{total}} tâches"
  },
  "Semana {{n}}": {
    "en": "Week {{n}}",
    "pt-BR": "Semana {{n}}",
    "fr": "Semaine {{n}}"
  },
  "¿Eliminar Semana {{n}}?": {
    "en": "Delete Week {{n}}?",
    "pt-BR": "Excluir Semana {{n}}?",
    "fr": "Supprimer la semaine {{n}} ?"
  },
  "Ciclo {{cycle}} de {{total}}": {
    "en": "Cycle {{cycle}} of {{total}}",
    "pt-BR": "Ciclo {{cycle}} de {{total}}",
    "fr": "Cycle {{cycle}} sur {{total}}"
  },
  "Ciclo {{cycle}} de {{total}} · descanso": {
    "en": "Cycle {{cycle}} of {{total}} · break",
    "pt-BR": "Ciclo {{cycle}} de {{total}} · pausa",
    "fr": "Cycle {{cycle}} sur {{total}} · pause"
  },
  "¿Eliminar \"{{label}}\"?": {
    "en": "Delete \"{{label}}\"?",
    "pt-BR": "Excluir \"{{label}}\"?",
    "fr": "Supprimer \"{{label}}\" ?"
  },
  "Solo {{day}} {{date}} {{month}}": {
    "en": "Only {{day}} {{date}} {{month}}",
    "pt-BR": "Só {{day}} {{date}} {{month}}",
    "fr": "Seulement {{day}} {{date}} {{month}}"
  },
  "Hay {{count}} bloque(s) con esta categoría. Al eliminarla pasarán a Personal. ¿Continuar?": {
    "en": "There are {{count}} block(s) with this category. Deleting it will move them to Personal. Continue?",
    "pt-BR": "Há {{count}} bloco(s) com essa categoria. Ao excluí-la, eles passarão para Pessoal. Continuar?",
    "fr": "Il y a {{count}} bloc(s) avec cette catégorie. En la supprimant, ils passeront en Personnel. Continuer ?"
  },
  "¿Eliminar la categoría \"{{label}}\"?": {
    "en": "Delete category \"{{label}}\"?",
    "pt-BR": "Excluir a categoria \"{{label}}\"?",
    "fr": "Supprimer la catégorie \"{{label}}\" ?"
  },
  "Activo a las {{time}} cada día.": {
    "en": "On at {{time}} every day.",
    "pt-BR": "Ativo às {{time}} todos os dias.",
    "fr": "Actif à {{time}} chaque jour."
  },
  "Hoy aplica el horario de {{kind}}.": {
    "en": "Today follows the {{kind}} schedule.",
    "pt-BR": "Hoje se aplica o horário de {{kind}}.",
    "fr": "Aujourd'hui, l'horaire de {{kind}} s'applique."
  },
  "{{count}} recordatorio(s): {{times}}": {
    "en": "{{count}} reminder(s): {{times}}",
    "pt-BR": "{{count}} lembrete(s): {{times}}",
    "fr": "{{count}} rappel(s) : {{times}}"
  },
  "Guardado. {{count}} recordatorio(s): {{times}}": {
    "en": "Saved. {{count}} reminder(s): {{times}}",
    "pt-BR": "Salvo. {{count}} lembrete(s): {{times}}",
    "fr": "Enregistré. {{count}} rappel(s) : {{times}}"
  },
  "Deshacer importación ({{date}})": {
    "en": "Undo import ({{date}})",
    "pt-BR": "Desfazer importação ({{date}})",
    "fr": "Annuler l'importation ({{date}})"
  },
  "Reemplazar tus datos actuales con este backup?\n\nBackup: {{when}}\nCampos: {{fields}}\n\nEsta acción no se puede deshacer.": {
    "en": "Replace your current data with this backup?\n\nBackup: {{when}}\nFields: {{fields}}\n\nThis can't be undone.",
    "pt-BR": "Substituir seus dados atuais por este backup?\n\nBackup: {{when}}\nCampos: {{fields}}\n\nEsta ação não pode ser desfeita.",
    "fr": "Remplacer tes données actuelles par cette sauvegarde ?\n\nSauvegarde : {{when}}\nChamps : {{fields}}\n\nCette action ne peut pas être annulée."
  },
  "El archivo no es válido: {{error}}": {
    "en": "The file isn't valid: {{error}}",
    "pt-BR": "O arquivo não é válido: {{error}}",
    "fr": "Le fichier n'est pas valide : {{error}}"
  },
  "{{label}}\n{{start}} – {{end}} ({{dur}}){{category_line}}": {
    "en": "{{label}}\n{{start}} – {{end}} ({{dur}}){{category_line}}",
    "pt-BR": "{{label}}\n{{start}} – {{end}} ({{dur}}){{category_line}}",
    "fr": "{{label}}\n{{start}} – {{end}} ({{dur}}){{category_line}}"
  },
  "Categoría: {{label}}": {
    "en": "\nCategory: {{label}}",
    "pt-BR": "\nCategoria: {{label}}",
    "fr": "\nCatégorie : {{label}}"
  },
  "Diario · {{date}}": {
    "en": "Journal · {{date}}",
    "pt-BR": "Diário · {{date}}",
    "fr": "Journal · {{date}}"
  },
  "{{count}} entrada{{plural}} en total": {
    "en": "{{count}} entry{{plural}} total",
    "pt-BR": "{{count}} entrada{{plural}} no total",
    "fr": "{{count}} entrée{{plural}} au total"
  },
  "Sin resultados para “{{query}}”": {
    "en": "No results for “{{query}}”",
    "pt-BR": "Nenhum resultado para “{{query}}”",
    "fr": "Aucun résultat pour « {{query}} »"
  },
  "{{count}} bloque{{plural}}": {
    "en": "{{count}} block{{plural}}",
    "pt-BR": "{{count}} bloco{{plural}}",
    "fr": "{{count}} bloc{{plural}}"
  },
  "{{count}} hábito{{plural}}": {
    "en": "{{count}} habit{{plural}}",
    "pt-BR": "{{count}} hábito{{plural}}",
    "fr": "{{count}} habitude{{plural}}"
  },
  "{{done}}/{{total}} ✓": {
    "en": "{{done}}/{{total}} ✓",
    "pt-BR": "{{done}}/{{total}} ✓",
    "fr": "{{done}}/{{total}} ✓"
  },
  "{{h}} h": {
    "en": "{{h}} h",
    "pt-BR": "{{h}} h",
    "fr": "{{h}} h"
  },
  "{{h}} h {{m}} min": {
    "en": "{{h}} h {{m}} min",
    "pt-BR": "{{h}} h {{m}} min",
    "fr": "{{h}} h {{m}} min"
  },
  "{{min}} min": {
    "en": "{{min}} min",
    "pt-BR": "{{min}} min",
    "fr": "{{min}} min"
  },
  "{{current}} / {{goal}}": {
    "en": "{{current}} / {{goal}}",
    "pt-BR": "{{current}} / {{goal}}",
    "fr": "{{current}} / {{goal}}"
  },
  "{{count}} bloque(s)": {
    "en": "{{count}} block(s)",
    "pt-BR": "{{count}} bloco(s)",
    "fr": "{{count}} bloc(s)"
  }
};

  // Compilar templates a regex ordenados por longitud (más largos primero)
  const TEMPLATE_LIST = Object.keys(TEMPLATES)
    .sort((a,b) => b.length - a.length)
    .map(esTpl => {
      // Extraer nombres de placeholders y construir regex
      const varNames = [];
      // Placeholders tipados: los numéricos capturan solo dígitos (evita que
      // frases como "Crear hábitos" matcheen "{{count}} hábito{{plural}}" y
      // salgan mezclas tipo "Crear habits"), y {{plural}} captura 's' opcional
      // (con (.+?) el singular "1 hábito" jamás matcheaba).
      const NUMERIC_VARS = ['count', 'done', 'total', 'h', 'm', 'current', 'goal'];
      const regexStr = esTpl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{\\\{(\w+)\\\}\\\}/g, (_, name) => {
        varNames.push(name);
        if (name === 'plural') return '(s?)';
        if (NUMERIC_VARS.includes(name)) return '(\\d+)';
        return '(.+?)';
      });
      return { esTpl, regex: new RegExp('^' + regexStr + '$'), varNames };
    });

  function detectSystemLang() {
    const raw = (navigator.language || navigator.userLanguage || FALLBACK).toLowerCase();
    if (raw.startsWith('pt')) return 'pt-BR';
    if (raw.startsWith('en')) return 'en';
    if (raw.startsWith('fr')) return 'fr';
    if (raw.startsWith('es')) return 'es';
    return FALLBACK;
  }
  function getSaved(){ try{return localStorage.getItem(STORAGE_KEY);}catch(e){return null;} }
  function save(l){ try{localStorage.setItem(STORAGE_KEY,l);}catch(e){} }

  let currentLang = getSaved() || detectSystemLang();
  if (!SUPPORTED.includes(currentLang)) currentLang = FALLBACK;

  // Traducir un string ES → idioma actual
  function translate(str) {
    if (!str || currentLang === FALLBACK) return str;
    const trimmed = str.trim();
    if (!trimmed) return str;
    // 1. Match exacto en mapa simple
    if (MAP[trimmed]) {
      const tr = MAP[trimmed][currentLang];
      if (tr) {
        // Preservar espacios/saltos originales del inicio/final
        const leading = str.match(/^\s*/)[0];
        const trailing = str.match(/\s*$/)[0];
        return leading + tr + trailing;
      }
    }
    // 2. Match de template
    for (const {esTpl, regex, varNames} of TEMPLATE_LIST) {
      const m = trimmed.match(regex);
      if (m) {
        const trTpl = TEMPLATES[esTpl][currentLang];
        if (!trTpl) continue;
        // Reemplazar {{var}} con valores capturados
        let out = trTpl;
        varNames.forEach((name, i) => {
          out = out.replace(new RegExp('\\{\\{' + name + '\\}\\}', 'g'), m[i+1]);
        });
        const leading = str.match(/^\s*/)[0];
        const trailing = str.match(/\s*$/)[0];
        return leading + out + trailing;
      }
    }
    return str;
  }

  // Traducir un nodo de texto
  function translateNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const orig = node.__origText || node.nodeValue;
    if (!orig || !orig.trim()) return;
    // Guardar el original para poder cambiar de idioma varias veces
    if (!node.__origText) node.__origText = orig;
    const tr = translate(node.__origText);
    if (tr !== node.nodeValue) node.nodeValue = tr;
  }

  // Recorrer todos los text nodes de un subtree
  function walk(root) {
    if (!root) return;
    // Traducir atributos comunes: placeholder, title, aria-label, alt, value (solo botones)
    if (root.nodeType === Node.ELEMENT_NODE) {
      ['placeholder','title','aria-label','alt'].forEach(attr => {
        const v = root.getAttribute && root.getAttribute(attr);
        if (v) {
          const key = 'orig' + attr.replace(/-([a-z])/g, (_,c)=>c.toUpperCase()).replace(/^./, s=>s.toUpperCase());
          try {
            if (!root.dataset[key]) root.dataset[key] = v;
            const tr = translate(root.dataset[key]);
            if (tr !== v) root.setAttribute(attr, tr);
          } catch(e){}
        }
      });
      // value de <input type="button|submit">
      if (root.tagName === 'INPUT' && ['button','submit','reset'].includes(root.type)) {
        if (root.value) {
          if (!root.dataset.origValue) root.dataset.origValue = root.value;
          const tr = translate(root.dataset.origValue);
          if (tr !== root.value) root.value = tr;
        }
      }
    }
    // Text nodes
    if (root.nodeType === Node.TEXT_NODE) {
      translateNode(root);
      return;
    }
    // Recurse
    if (root.childNodes) {
      root.childNodes.forEach(walk);
    }
  }

  function applyAll() {
    if (currentLang === FALLBACK) {
      // Restaurar originales si venimos de otro idioma
      restoreAll(document.body);
      return;
    }
    walk(document.body);
  }
  function restoreAll(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE && root.__origText) {
      root.nodeValue = root.__origText;
      return;
    }
    if (root.nodeType === Node.ELEMENT_NODE) {
      ['placeholder','title','aria-label','alt'].forEach(attr => {
        const key = 'orig' + attr.replace(/-([a-z])/g, (_,c)=>c.toUpperCase()).replace(/^./, s=>s.toUpperCase());
        try { if (root.dataset && root.dataset[key]) root.setAttribute(attr, root.dataset[key]); } catch(e){}
      });
      if (root.tagName === 'INPUT' && root.dataset.origValue) root.value = root.dataset.origValue;
    }
    if (root.childNodes) root.childNodes.forEach(restoreAll);
  }

  // MutationObserver: cuando se añaden nuevos nodos (renders dinámicos), traducirlos
  let observer = null;
  function startObserver() {
    if (observer) return;
    observer = new MutationObserver(muts => {
      if (currentLang === FALLBACK) return;
      for (const mut of muts) {
        mut.addedNodes.forEach(n => walk(n));
        if (mut.type === 'characterData' && mut.target) translateNode(mut.target);
        if (mut.type === 'attributes' && mut.target && mut.target.getAttribute) {
          const attr = mut.attributeName;
          if (['placeholder','title','aria-label','alt'].includes(attr)) {
            const v = mut.target.getAttribute(attr);
            if (v) {
              const key = 'orig' + attr.replace(/-([a-z])/g, (_,c)=>c.toUpperCase()).replace(/^./, s=>s.toUpperCase());
              try {
                if (!mut.target.dataset[key]) mut.target.dataset[key] = v;
                const tr = translate(mut.target.dataset[key]);
                if (tr !== v) mut.target.setAttribute(attr, tr);
              } catch(e){}
            }
          }
        }
      }
    });
    observer.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ['placeholder','title','aria-label','alt']
    });
  }
  function stopObserver() { if (observer) { observer.disconnect(); observer = null; } }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return false;
    if (lang === currentLang) return true;
    // Restaurar todo a ES primero (para tener base limpia)
    stopObserver();
    restoreAll(document.body);
    currentLang = lang;
    save(lang);
    document.documentElement.setAttribute('lang', lang);
    // Aplicar nuevo idioma
    if (lang !== FALLBACK) walk(document.body);
    startObserver();
    // Notificar app
    try { window.dispatchEvent(new CustomEvent('rutinal:lang-changed', {detail:{lang}})); } catch(e){}
    return true;
  }
  function getLang(){ return currentLang; }
  function getSupportedLangs(){
    return SUPPORTED.map(code => ({
      code,
      label: {'es':'Español','en':'English','pt-BR':'Português (Brasil)','fr':'Français'}[code]
    }));
  }

  // API pública
  window.i18n = {
    t: translate,
    setLang, getLang, getSupportedLangs, applyAll,
    SUPPORTED, FALLBACK
  };

  // Init cuando el DOM esté listo
  function init() {
    document.documentElement.setAttribute('lang', currentLang);
    if (currentLang !== FALLBACK) {
      walk(document.body);
    }
    startObserver();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
