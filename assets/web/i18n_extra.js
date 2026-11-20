// ===== Rutinal i18n: traducciones adicionales =====
// Se carga ANTES de i18n.js, que las fusiona con su mapa base (estas ganan).
// map: texto exacto en español → traducciones
// tpl: plantillas con {{var}}; {{n}}, {{n2}}… son números, el resto es texto
//      (y el texto capturado también se traduce si está en el mapa)
// ctx: claves con contexto, para elementos con data-i18n-ctx="<ctx>"
window.__I18N_EXTRA = {
 "map": {
  "Calendario": {
   "en": "Calendar",
   "pt-BR": "Calendário",
   "fr": "Calendrier"
  },
  "Ayer": {
   "en": "Yesterday",
   "pt-BR": "Ontem",
   "fr": "Hier"
  },
  "Mañana": {
   "en": "Tomorrow",
   "pt-BR": "Amanhã",
   "fr": "Demain"
  },
  "Volver a hoy": {
   "en": "Back to today",
   "pt-BR": "Voltar para hoje",
   "fr": "Revenir à aujourd'hui"
  },
  "Día anterior": {
   "en": "Previous day",
   "pt-BR": "Dia anterior",
   "fr": "Jour précédent"
  },
  "Día siguiente": {
   "en": "Next day",
   "pt-BR": "Próximo dia",
   "fr": "Jour suivant"
  },
  "Ver todos ›": {
   "en": "See all ›",
   "pt-BR": "Ver todos ›",
   "fr": "Tout voir ›"
  },
  "Crear": {
   "en": "Create",
   "pt-BR": "Criar",
   "fr": "Créer"
  },
  "+ Crear": {
   "en": "+ Create",
   "pt-BR": "+ Criar",
   "fr": "+ Créer"
  },
  "Atrás": {
   "en": "Back",
   "pt-BR": "Voltar",
   "fr": "Retour"
  },
  "Siguiente →": {
   "en": "Next →",
   "pt-BR": "Próximo →",
   "fr": "Suivant →"
  },
  "Importar": {
   "en": "Import",
   "pt-BR": "Importar",
   "fr": "Importer"
  },
  "Restaurar": {
   "en": "Restore",
   "pt-BR": "Restaurar",
   "fr": "Restaurer"
  },
  "Reiniciar": {
   "en": "Reset",
   "pt-BR": "Reiniciar",
   "fr": "Réinitialiser"
  },
  "Registrar": {
   "en": "Log",
   "pt-BR": "Registrar",
   "fr": "Enregistrer"
  },
  "Fijar": {
   "en": "Set",
   "pt-BR": "Definir",
   "fr": "Définir"
  },
  "Corregir": {
   "en": "Fix",
   "pt-BR": "Corrigir",
   "fr": "Corriger"
  },
  "Guardado.": {
   "en": "Saved.",
   "pt-BR": "Salvo.",
   "fr": "Enregistré."
  },
  "Guardar cambios": {
   "en": "Save changes",
   "pt-BR": "Salvar alterações",
   "fr": "Enregistrer les modifications"
  },
  "Resumen": {
   "en": "Summary",
   "pt-BR": "Resumo",
   "fr": "Résumé"
  },
  "Idioma": {
   "en": "Language",
   "pt-BR": "Idioma",
   "fr": "Langue"
  },
  "Minutos": {
   "en": "Minutes",
   "pt-BR": "Minutos",
   "fr": "Minutes"
  },
  "Pausas": {
   "en": "Breaks",
   "pt-BR": "Pausas",
   "fr": "Pauses"
  },
  "Plantillas": {
   "en": "Templates",
   "pt-BR": "Modelos",
   "fr": "Modèles"
  },
  "Temporizador": {
   "en": "Timer",
   "pt-BR": "Temporizador",
   "fr": "Minuteur"
  },
  "Tendencias": {
   "en": "Trends",
   "pt-BR": "Tendências",
   "fr": "Tendances"
  },
  "Corriendo": {
   "en": "Running",
   "pt-BR": "Em andamento",
   "fr": "En cours"
  },
  "En pausa": {
   "en": "Paused",
   "pt-BR": "Pausado",
   "fr": "En pause"
  },
  "¡Tiempo! ⏱": {
   "en": "Time's up! ⏱",
   "pt-BR": "Tempo! ⏱",
   "fr": "Temps écoulé ! ⏱"
  },
  "Hobbies": {
   "en": "Hobbies",
   "pt-BR": "Hobbies",
   "fr": "Loisirs"
  },
  "Auto": {
   "en": "Auto",
   "pt-BR": "Auto",
   "fr": "Auto"
  },
  "Automático": {
   "en": "Automatic",
   "pt-BR": "Automático",
   "fr": "Automatique"
  },
  "Toca para marcar/desmarcar": {
   "en": "Tap to check/uncheck",
   "pt-BR": "Toque para marcar/desmarcar",
   "fr": "Touchez pour cocher/décocher"
  },
  "Toca para renombrar": {
   "en": "Tap to rename",
   "pt-BR": "Toque para renomear",
   "fr": "Touchez pour renommer"
  },
  "Vista previa v1.9.7 · los datos no se guardan al recargar": {
   "en": "Preview v1.9.7 · data isn't saved on reload",
   "pt-BR": "Pré-visualização v1.9.7 · os dados não são salvos ao recarregar",
   "fr": "Aperçu v1.9.7 · les données ne sont pas enregistrées au rechargement"
  },
  "Lun–Vie": {
   "en": "Mon–Fri",
   "pt-BR": "Seg–Sex",
   "fr": "Lun–Ven"
  },
  "Lun – Vie": {
   "en": "Mon – Fri",
   "pt-BR": "Seg – Sex",
   "fr": "Lun – Ven"
  },
  "L-V": {
   "en": "M-F",
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
  "entre semana": {
   "en": "weekday",
   "pt-BR": "dias úteis",
   "fr": "semaine"
  },
  "sábado o domingo": {
   "en": "Saturday or Sunday",
   "pt-BR": "sábado ou domingo",
   "fr": "samedi ou dimanche"
  },
  "Español": {
   "en": "Español",
   "pt-BR": "Español",
   "fr": "Español"
  },
  "Hábitos × Nutrición": {
   "en": "Habits × Nutrition",
   "pt-BR": "Hábitos × Nutrição",
   "fr": "Habitudes × Nutrition"
  },
  "Metas de tiempo": {
   "en": "Time goals",
   "pt-BR": "Metas de tempo",
   "fr": "Objectifs de temps"
  },
  "Elige la duración": {
   "en": "Choose the duration",
   "pt-BR": "Escolha a duração",
   "fr": "Choisissez la durée"
  },
  "Añade rápido": {
   "en": "Quick add",
   "pt-BR": "Adicionar rápido",
   "fr": "Ajout rapide"
  },
  "· afectado": {
   "en": "· affected",
   "pt-BR": "· afetado",
   "fr": "· affecté"
  },
  "Gestionar pausa ›": {
   "en": "Manage pause ›",
   "pt-BR": "Gerenciar pausa ›",
   "fr": "Gérer la pause ›"
  },
  "⏸ Pausar racha (vacaciones) ›": {
   "en": "⏸ Pause streak (vacation) ›",
   "pt-BR": "⏸ Pausar sequência (férias) ›",
   "fr": "⏸ Mettre la série en pause (vacances) ›"
  },
  "⏸ Racha en pausa (modo descanso): hoy no suma ni rompe tu racha.": {
   "en": "⏸ Streak paused (rest mode): today neither adds to nor breaks your streak.",
   "pt-BR": "⏸ Sequência pausada (modo descanso): hoje não soma nem quebra sua sequência.",
   "fr": "⏸ Série en pause (mode repos) : aujourd'hui ne compte pas et ne casse pas votre série."
  },
  "Pausar racha": {
   "en": "Pause streak",
   "pt-BR": "Pausar sequência",
   "fr": "Mettre la série en pause"
  },
  "Programar pausa": {
   "en": "Schedule pause",
   "pt-BR": "Agendar pausa",
   "fr": "Programmer une pause"
  },
  "Sin pausas programadas.": {
   "en": "No pauses scheduled.",
   "pt-BR": "Nenhuma pausa agendada.",
   "fr": "Aucune pause programmée."
  },
  "Los días en pausa no rompen tu racha ni suman puntos: perfectos para vacaciones o semanas de descanso.": {
   "en": "Paused days don't break your streak or add points: perfect for vacations or rest weeks.",
   "pt-BR": "Os dias pausados não quebram sua sequência nem somam pontos: perfeitos para férias ou semanas de descanso.",
   "fr": "Les jours en pause ne cassent pas votre série et ne rapportent pas de points : parfaits pour les vacances ou les semaines de repos."
  },
  "Activa o futura": {
   "en": "Active or upcoming",
   "pt-BR": "Ativa ou futura",
   "fr": "Active ou à venir"
  },
  "Pasada": {
   "en": "Past",
   "pt-BR": "Passada",
   "fr": "Passée"
  },
  "Revisa las fechas.": {
   "en": "Check the dates.",
   "pt-BR": "Verifique as datas.",
   "fr": "Vérifiez les dates."
  },
  "🏋️ Días con gym comes en promedio": {
   "en": "🏋️ On gym days you eat on average",
   "pt-BR": "🏋️ Nos dias de academia você come em média",
   "fr": "🏋️ Les jours de salle, vous mangez en moyenne"
  },
  "🥩 Tu proteína promedio sube": {
   "en": "🥩 Your average protein goes up",
   "pt-BR": "🥩 Sua proteína média sobe",
   "fr": "🥩 Vos protéines moyennes augmentent de"
  },
  "🥩 Tu proteína promedio baja": {
   "en": "🥩 Your average protein goes down",
   "pt-BR": "🥩 Sua proteína média cai",
   "fr": "🥩 Vos protéines moyennes baissent de"
  },
  "📉 El día que más se te escapan los hábitos es el": {
   "en": "📉 The day you miss habits the most is",
   "pt-BR": "📉 O dia em que você mais perde hábitos é",
   "fr": "📉 Le jour où vous manquez le plus vos habitudes est le"
  },
  "🎯 Cumpliste tu meta nutricional": {
   "en": "🎯 You hit your nutrition goal on",
   "pt-BR": "🎯 Você cumpriu sua meta nutricional em",
   "fr": "🎯 Vous avez atteint votre objectif nutritionnel"
  },
  "días registrados en las últimas 2 semanas.": {
   "en": "logged days in the last 2 weeks.",
   "pt-BR": "dias registrados nas últimas 2 semanas.",
   "fr": "jours enregistrés au cours des 2 dernières semaines."
  },
  "Hábitos cumplidos": {
   "en": "Habits completed",
   "pt-BR": "Hábitos cumpridos",
   "fr": "Habitudes accomplies"
  },
  "Notas en bloques": {
   "en": "Notes on blocks",
   "pt-BR": "Notas nos blocos",
   "fr": "Notes sur les blocs"
  },
  "Notas en hábitos": {
   "en": "Notes on habits",
   "pt-BR": "Notas nos hábitos",
   "fr": "Notes sur les habitudes"
  },
  "Sin detalle": {
   "en": "No details",
   "pt-BR": "Sem detalhes",
   "fr": "Sans détails"
  },
  "Sin detalle ·": {
   "en": "No details ·",
   "pt-BR": "Sem detalhes ·",
   "fr": "Sans détails ·"
  },
  "Sin bloques ni metas esta semana. Toca “Metas de tiempo” para definirlas.": {
   "en": "No blocks or goals this week. Tap “Time goals” to set them.",
   "pt-BR": "Sem blocos nem metas nesta semana. Toque em “Metas de tempo” para defini-las.",
   "fr": "Aucun bloc ni objectif cette semaine. Touchez « Objectifs de temps » pour les définir."
  },
  "Define tus metas por semana y aparecerán aquí con casillas para palomearlas.": {
   "en": "Set your goals for each week and they'll show up here with checkboxes to tick off.",
   "pt-BR": "Defina suas metas por semana e elas aparecerão aqui com caixas para marcar.",
   "fr": "Définissez vos objectifs par semaine : ils apparaîtront ici avec des cases à cocher."
  },
  "Crear mis metas semanales": {
   "en": "Create my weekly goals",
   "pt-BR": "Criar minhas metas semanais",
   "fr": "Créer mes objectifs hebdomadaires"
  },
  "▶ Empezar el plan esta semana": {
   "en": "▶ Start the plan this week",
   "pt-BR": "▶ Começar o plano nesta semana",
   "fr": "▶ Commencer le plan cette semaine"
  },
  "↻ Cambiar semana de inicio del plan": {
   "en": "↻ Change the plan's start week",
   "pt-BR": "↻ Mudar a semana de início do plano",
   "fr": "↻ Changer la semaine de début du plan"
  },
  "Metas semanales · plan terminado": {
   "en": "Weekly goals · plan finished",
   "pt-BR": "Metas semanais · plano concluído",
   "fr": "Objectifs hebdomadaires · plan terminé"
  },
  "¿Cambiar la semana de inicio del plan? Las tareas palomeadas se conservan.": {
   "en": "Change the plan's start week? Checked tasks are kept.",
   "pt-BR": "Mudar a semana de início do plano? As tarefas marcadas são mantidas.",
   "fr": "Changer la semaine de début du plan ? Les tâches cochées sont conservées."
  },
  "Sin registro de comida": {
   "en": "No food logged",
   "pt-BR": "Sem registro de alimentação",
   "fr": "Aucun repas enregistré"
  },
  "Registrar comida de este día": {
   "en": "Log food for this day",
   "pt-BR": "Registrar alimentação deste dia",
   "fr": "Enregistrer les repas de ce jour"
  },
  "Ver / editar comida de este día": {
   "en": "View / edit food for this day",
   "pt-BR": "Ver / editar alimentação deste dia",
   "fr": "Voir / modifier les repas de ce jour"
  },
  "Peso": {
   "en": "Weight",
   "pt-BR": "Peso",
   "fr": "Poids"
  },
  "Peso del día en kg (escribe 0 para borrarlo):": {
   "en": "Weight for the day in kg (type 0 to clear it):",
   "pt-BR": "Peso do dia em kg (digite 0 para apagar):",
   "fr": "Poids du jour en kg (tapez 0 pour l'effacer) :"
  },
  "Valor no válido.": {
   "en": "Invalid value.",
   "pt-BR": "Valor inválido.",
   "fr": "Valeur non valide."
  },
  "Diario": {
   "en": "Journal",
   "pt-BR": "Diário",
   "fr": "Journal"
  },
  "Escribir diario": {
   "en": "Write journal",
   "pt-BR": "Escrever diário",
   "fr": "Écrire le journal"
  },
  "Eliminar semana": {
   "en": "Delete week",
   "pt-BR": "Excluir semana",
   "fr": "Supprimer la semaine"
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
   "en": "Title of the new week:",
   "pt-BR": "Título da nova semana:",
   "fr": "Titre de la nouvelle semaine :"
  },
  "Entrevista de hábitos": {
   "en": "Habit interview",
   "pt-BR": "Entrevista de hábitos",
   "fr": "Questionnaire d'habitudes"
  },
  "Rutinal detecta el idioma de tu teléfono automáticamente. Puedes cambiarlo aquí cuando quieras.": {
   "en": "Rutinal detects your phone's language automatically. You can change it here anytime.",
   "pt-BR": "O Rutinal detecta o idioma do seu celular automaticamente. Você pode mudá-lo aqui quando quiser.",
   "fr": "Rutinal détecte automatiquement la langue de votre téléphone. Vous pouvez la changer ici à tout moment."
  },
  "La búsqueda usa el USDA FoodData Central (600 mil+ alimentos). Con la key gratuita compartida tienes 30 búsquedas/hora. Regístrate en": {
   "en": "Search uses USDA FoodData Central (600k+ foods). With the shared free key you get 30 searches/hour. Sign up at",
   "pt-BR": "A busca usa o USDA FoodData Central (mais de 600 mil alimentos). Com a chave gratuita compartilhada você tem 30 buscas/hora. Cadastre-se em",
   "fr": "La recherche utilise USDA FoodData Central (plus de 600 000 aliments). Avec la clé gratuite partagée, vous avez 30 recherches/heure. Inscrivez-vous sur"
  },
  "y pega tu key aquí para tener 1000/hora.": {
   "en": "and paste your key here to get 1000/hour.",
   "pt-BR": "e cole sua chave aqui para ter 1000/hora.",
   "fr": "et collez votre clé ici pour en avoir 1000/heure."
  },
  "Deja vacío para usar DEMO_KEY": {
   "en": "Leave empty to use DEMO_KEY",
   "pt-BR": "Deixe vazio para usar a DEMO_KEY",
   "fr": "Laissez vide pour utiliser DEMO_KEY"
  },
  "Recordatorio de comida": {
   "en": "Meal reminder",
   "pt-BR": "Lembrete de refeição",
   "fr": "Rappel de repas"
  },
  "Si a la hora que elijas todavía no has registrado nada de comida, te lo recordamos con un aviso suave.": {
   "en": "If you haven't logged any food by the time you choose, we'll remind you with a gentle notification.",
   "pt-BR": "Se no horário escolhido você ainda não registrou nenhuma refeição, lembramos você com um aviso suave.",
   "fr": "Si à l'heure choisie vous n'avez encore rien enregistré, nous vous le rappelons par une notification discrète."
  },
  "Respaldo automático semanal en Descargas": {
   "en": "Weekly automatic backup to Downloads",
   "pt-BR": "Backup automático semanal em Downloads",
   "fr": "Sauvegarde automatique hebdomadaire dans Téléchargements"
  },
  "Último respaldo automático:": {
   "en": "Last automatic backup:",
   "pt-BR": "Último backup automático:",
   "fr": "Dernière sauvegarde automatique :"
  },
  "Aún sin respaldos automáticos.": {
   "en": "No automatic backups yet.",
   "pt-BR": "Ainda sem backups automáticos.",
   "fr": "Pas encore de sauvegarde automatique."
  },
  "Acerca de Rutinal": {
   "en": "About Rutinal",
   "pt-BR": "Sobre o Rutinal",
   "fr": "À propos de Rutinal"
  },
  "App local-first: tus datos viven solo en tu dispositivo.": {
   "en": "Local-first app: your data lives only on your device.",
   "pt-BR": "App local-first: seus dados ficam só no seu dispositivo.",
   "fr": "Application local-first : vos données restent uniquement sur votre appareil."
  },
  "Fuentes de datos de alimentos:": {
   "en": "Food data sources:",
   "pt-BR": "Fontes de dados de alimentos:",
   "fr": "Sources des données alimentaires :"
  },
  "(dominio público)": {
   "en": "(public domain)",
   "pt-BR": "(domínio público)",
   "fr": "(domaine public)"
  },
  "— datos disponibles bajo la licencia": {
   "en": "— data available under the",
   "pt-BR": "— dados disponíveis sob a licença",
   "fr": "— données disponibles sous licence"
  },
  "Aviso de salud:": {
   "en": "Health notice:",
   "pt-BR": "Aviso de saúde:",
   "fr": "Avertissement santé :"
  },
  "los cálculos de calorías y macros son informativos y no sustituyen el consejo de un profesional de la salud.": {
   "en": "calorie and macro calculations are for information only and don't replace advice from a health professional.",
   "pt-BR": "os cálculos de calorias e macros são informativos e não substituem a orientação de um profissional de saúde.",
   "fr": "les calculs de calories et de macros sont indicatifs et ne remplacent pas l'avis d'un professionnel de santé."
  },
  "Política de privacidad": {
   "en": "Privacy policy",
   "pt-BR": "Política de privacidade",
   "fr": "Politique de confidentialité"
  },
  "Rutinal · versión 1.0": {
   "en": "Rutinal · version 1.0",
   "pt-BR": "Rutinal · versão 1.0",
   "fr": "Rutinal · version 1.0"
  },
  "Hecho para el día a día con bloques, hábitos e imprevistos.": {
   "en": "Made for everyday life with blocks, habits and incidents.",
   "pt-BR": "Feito para o dia a dia com blocos, hábitos e imprevistos.",
   "fr": "Conçu pour le quotidien avec des blocs, des habitudes et des imprévus."
  },
  "Hoy aplica el horario de": {
   "en": "Today follows the schedule for",
   "pt-BR": "Hoje vale o horário de",
   "fr": "Aujourd'hui, l'horaire appliqué est celui du"
  },
  "El archivo no es un JSON válido.": {
   "en": "The file isn't valid JSON.",
   "pt-BR": "O arquivo não é um JSON válido.",
   "fr": "Le fichier n'est pas un JSON valide."
  },
  "Este archivo parece un respaldo completo de Rutinal. ¿Importarlo? Tus datos actuales se respaldan y podrás deshacer desde Ajustes.": {
   "en": "This file looks like a full Rutinal backup. Import it? Your current data will be backed up and you can undo from Settings.",
   "pt-BR": "Este arquivo parece um backup completo do Rutinal. Importar? Seus dados atuais serão salvos e você poderá desfazer em Ajustes.",
   "fr": "Ce fichier semble être une sauvegarde complète de Rutinal. L'importer ? Vos données actuelles seront sauvegardées et vous pourrez annuler depuis Réglages."
  },
  "Respaldo importado. La app se recargará.": {
   "en": "Backup imported. The app will reload.",
   "pt-BR": "Backup importado. O app será recarregado.",
   "fr": "Sauvegarde importée. L'application va se recharger."
  },
  "Formato no reconocido.": {
   "en": "Unrecognized format.",
   "pt-BR": "Formato não reconhecido.",
   "fr": "Format non reconnu."
  },
  "Este archivo no parece un backup válido de Rutinal.": {
   "en": "This file doesn't look like a valid Rutinal backup.",
   "pt-BR": "Este arquivo não parece um backup válido do Rutinal.",
   "fr": "Ce fichier ne semble pas être une sauvegarde Rutinal valide."
  },
  "Datos importados. La app se recargará.": {
   "en": "Data imported. The app will reload.",
   "pt-BR": "Dados importados. O app será recarregado.",
   "fr": "Données importées. L'application va se recharger."
  },
  "No hay backup previo disponible.": {
   "en": "No previous backup available.",
   "pt-BR": "Nenhum backup anterior disponível.",
   "fr": "Aucune sauvegarde précédente disponible."
  },
  "Restaurar tus datos al estado anterior a la última importación?": {
   "en": "Restore your data to how it was before the last import?",
   "pt-BR": "Restaurar seus dados ao estado anterior à última importação?",
   "fr": "Restaurer vos données à leur état avant la dernière importation ?"
  },
  "Estado restaurado. La app se recargará.": {
   "en": "Data restored. The app will reload.",
   "pt-BR": "Estado restaurado. O app será recarregado.",
   "fr": "État restauré. L'application va se recharger."
  },
  "¿Borrar TODOS los datos y volver a los valores por defecto? Esto no se puede deshacer.": {
   "en": "Delete ALL data and go back to the defaults? This can't be undone.",
   "pt-BR": "Apagar TODOS os dados e voltar aos valores padrão? Isso não pode ser desfeito.",
   "fr": "Effacer TOUTES les données et revenir aux valeurs par défaut ? Cette action est irréversible."
  },
  "Confirmar de nuevo: se perderán bloques, hábitos, historial, imprevistos y ajustes.": {
   "en": "Confirm again: blocks, habits, history, incidents and settings will be lost.",
   "pt-BR": "Confirme de novo: blocos, hábitos, histórico, imprevistos e ajustes serão perdidos.",
   "fr": "Confirmez à nouveau : blocs, habitudes, historique, imprévus et réglages seront perdus."
  },
  "Elige una hora.": {
   "en": "Choose a time.",
   "pt-BR": "Escolha um horário.",
   "fr": "Choisissez une heure."
  },
  "fecha desconocida": {
   "en": "unknown date",
   "pt-BR": "data desconhecida",
   "fr": "date inconnue"
  },
  "JSON malformado": {
   "en": "malformed JSON",
   "pt-BR": "JSON malformado",
   "fr": "JSON mal formé"
  },
  "Bloques ·": {
   "en": "Blocks ·",
   "pt-BR": "Blocos ·",
   "fr": "Blocs ·"
  },
  "Hábitos ·": {
   "en": "Habits ·",
   "pt-BR": "Hábitos ·",
   "fr": "Habitudes ·"
  },
  "Imprevistos ·": {
   "en": "Incidents ·",
   "pt-BR": "Imprevistos ·",
   "fr": "Imprévus ·"
  },
  "Categorías ·": {
   "en": "Categories ·",
   "pt-BR": "Categorias ·",
   "fr": "Catégories ·"
  },
  "Diario ·": {
   "en": "Journal ·",
   "pt-BR": "Diário ·",
   "fr": "Journal ·"
  },
  "Debe existir al menos una categoría.": {
   "en": "There must be at least one category.",
   "pt-BR": "Deve existir pelo menos uma categoria.",
   "fr": "Il doit y avoir au moins une catégorie."
  },
  "Póngale nombre a la categoría.": {
   "en": "Give the category a name.",
   "pt-BR": "Dê um nome à categoria.",
   "fr": "Donnez un nom à la catégorie."
  },
  "Completa nombre, inicio y fin.": {
   "en": "Fill in name, start and end.",
   "pt-BR": "Preencha nome, início e fim.",
   "fr": "Renseignez le nom, le début et la fin."
  },
  "El fin debe ser posterior al inicio.": {
   "en": "The end must be after the start.",
   "pt-BR": "O fim deve ser depois do início.",
   "fr": "La fin doit être après le début."
  },
  "Elige la fecha del bloque de una sola vez.": {
   "en": "Choose the date for the one-time block.",
   "pt-BR": "Escolha a data do bloco único.",
   "fr": "Choisissez la date du bloc ponctuel."
  },
  "Selecciona al menos un día.": {
   "en": "Select at least one day.",
   "pt-BR": "Selecione pelo menos um dia.",
   "fr": "Sélectionnez au moins un jour."
  },
  "Copiado al portapapeles.": {
   "en": "Copied to clipboard.",
   "pt-BR": "Copiado para a área de transferência.",
   "fr": "Copié dans le presse-papiers."
  },
  "Ponle nombre.": {
   "en": "Give it a name.",
   "pt-BR": "Dê um nome.",
   "fr": "Donnez-lui un nom."
  },
  "Completa todos los campos.": {
   "en": "Fill in all the fields.",
   "pt-BR": "Preencha todos os campos.",
   "fr": "Renseignez tous les champs."
  },
  "¿Eliminar este imprevisto?": {
   "en": "Delete this incident?",
   "pt-BR": "Excluir este imprevisto?",
   "fr": "Supprimer cet imprévu ?"
  },
  "¿Eliminar este bloque?": {
   "en": "Delete this block?",
   "pt-BR": "Excluir este bloco?",
   "fr": "Supprimer ce bloc ?"
  },
  "¿Eliminar imprevisto?": {
   "en": "Delete incident?",
   "pt-BR": "Excluir imprevisto?",
   "fr": "Supprimer l'imprévu ?"
  },
  "¿Eliminar este hábito? El historial se conserva.": {
   "en": "Delete this habit? Its history is kept.",
   "pt-BR": "Excluir este hábito? O histórico é mantido.",
   "fr": "Supprimer cette habitude ? L'historique est conservé."
  },
  "¿Reiniciar los ciclos? Volverás al ciclo 1, fase de enfoque.": {
   "en": "Reset the cycles? You'll go back to cycle 1, focus phase.",
   "pt-BR": "Reiniciar os ciclos? Você voltará ao ciclo 1, fase de foco.",
   "fr": "Réinitialiser les cycles ? Vous reviendrez au cycle 1, phase de concentration."
  },
  "Plantillas de hábitos": {
   "en": "Habit templates",
   "pt-BR": "Modelos de hábitos",
   "fr": "Modèles d'habitudes"
  },
  "Elige una plantilla. Puedes editar los hábitos después.": {
   "en": "Choose a template. You can edit the habits afterwards.",
   "pt-BR": "Escolha um modelo. Você pode editar os hábitos depois.",
   "fr": "Choisissez un modèle. Vous pourrez modifier les habitudes ensuite."
  },
  "Reemplazar mis hábitos": {
   "en": "Replace my habits",
   "pt-BR": "Substituir meus hábitos",
   "fr": "Remplacer mes habitudes"
  },
  "Añadir a los actuales": {
   "en": "Add to current ones",
   "pt-BR": "Adicionar aos atuais",
   "fr": "Ajouter aux actuelles"
  },
  "Selecciona una plantilla primero.": {
   "en": "Select a template first.",
   "pt-BR": "Selecione um modelo primeiro.",
   "fr": "Sélectionnez d'abord un modèle."
  },
  "Esto reemplazará tus hábitos actuales. ¿Continuar?": {
   "en": "This will replace your current habits. Continue?",
   "pt-BR": "Isso substituirá seus hábitos atuais. Continuar?",
   "fr": "Cela remplacera vos habitudes actuelles. Continuer ?"
  },
  "Productivo matutino": {
   "en": "Morning productivity",
   "pt-BR": "Produtivo pela manhã",
   "fr": "Productif le matin"
  },
  "Mañanas activas para trabajar mejor": {
   "en": "Active mornings to work better",
   "pt-BR": "Manhãs ativas para trabalhar melhor",
   "fr": "Des matins actifs pour mieux travailler"
  },
  "Despertar 6:30 am": {
   "en": "Wake up 6:30 am",
   "pt-BR": "Acordar 6:30",
   "fr": "Réveil à 6 h 30"
  },
  "Cardio 30 min": {
   "en": "Cardio 30 min",
   "pt-BR": "Cardio 30 min",
   "fr": "Cardio 30 min"
  },
  "Desayuno completo": {
   "en": "Full breakfast",
   "pt-BR": "Café da manhã completo",
   "fr": "Petit-déjeuner complet"
  },
  "Trabajo profundo 90 min": {
   "en": "Deep work 90 min",
   "pt-BR": "Trabalho focado 90 min",
   "fr": "Travail profond 90 min"
  },
  "Celular fuera del cuarto": {
   "en": "Phone out of the bedroom",
   "pt-BR": "Celular fora do quarto",
   "fr": "Téléphone hors de la chambre"
  },
  "Fuerza en el gym": {
   "en": "Strength at the gym",
   "pt-BR": "Força na academia",
   "fr": "Force à la salle"
  },
  "Entrenamiento serio 5 días por semana": {
   "en": "Serious training 5 days a week",
   "pt-BR": "Treino sério 5 dias por semana",
   "fr": "Entraînement sérieux 5 jours par semaine"
  },
  "Gym 6:30 am": {
   "en": "Gym 6:30 am",
   "pt-BR": "Academia 6:30",
   "fr": "Salle à 6 h 30"
  },
  "Proteína en cada comida": {
   "en": "Protein at every meal",
   "pt-BR": "Proteína em cada refeição",
   "fr": "Protéines à chaque repas"
  },
  "Hidratarme 3 L": {
   "en": "Drink 3 L of water",
   "pt-BR": "Beber 3 L de água",
   "fr": "Boire 3 L d'eau"
  },
  "Dormir 8 horas": {
   "en": "Sleep 8 hours",
   "pt-BR": "Dormir 8 horas",
   "fr": "Dormir 8 heures"
  },
  "Descansar activamente sábado": {
   "en": "Active rest on Saturday",
   "pt-BR": "Descanso ativo no sábado",
   "fr": "Repos actif le samedi"
  },
  "Movilidad + estiramientos": {
   "en": "Mobility + stretching",
   "pt-BR": "Mobilidade + alongamentos",
   "fr": "Mobilité + étirements"
  },
  "Estudiante enfocado": {
   "en": "Focused student",
   "pt-BR": "Estudante focado",
   "fr": "Étudiant concentré"
  },
  "Estudio consistente sin quemarte": {
   "en": "Consistent study without burning out",
   "pt-BR": "Estudo constante sem se esgotar",
   "fr": "Étudier régulièrement sans s'épuiser"
  },
  "Repasar apuntes 30 min": {
   "en": "Review notes 30 min",
   "pt-BR": "Revisar anotações 30 min",
   "fr": "Réviser ses notes 30 min"
  },
  "Pomodoros de estudio": {
   "en": "Study pomodoros",
   "pt-BR": "Pomodoros de estudo",
   "fr": "Pomodoros d'étude"
  },
  "Leer 15 min": {
   "en": "Read 15 min",
   "pt-BR": "Ler 15 min",
   "fr": "Lire 15 min"
  },
  "Sin redes en horario clase": {
   "en": "No social media during class",
   "pt-BR": "Sem redes sociais no horário de aula",
   "fr": "Pas de réseaux sociaux pendant les cours"
  },
  "Dev / Freelance": {
   "en": "Dev / Freelance",
   "pt-BR": "Dev / Freelancer",
   "fr": "Dev / Freelance"
  },
  "Ritmo profundo con salud mental": {
   "en": "Deep work with mental health",
   "pt-BR": "Ritmo profundo com saúde mental",
   "fr": "Rythme profond et santé mentale"
  },
  "Standup diario": {
   "en": "Daily standup",
   "pt-BR": "Standup diário",
   "fr": "Standup quotidien"
  },
  "Trabajo profundo 2 h": {
   "en": "Deep work 2 h",
   "pt-BR": "Trabalho focado 2 h",
   "fr": "Travail profond 2 h"
  },
  "Revisar PRs": {
   "en": "Review PRs",
   "pt-BR": "Revisar PRs",
   "fr": "Relire les PR"
  },
  "Caminar 20 min": {
   "en": "Walk 20 min",
   "pt-BR": "Caminhar 20 min",
   "fr": "Marcher 20 min"
  },
  "Cerrar laptop 20:00": {
   "en": "Close laptop at 8:00 pm",
   "pt-BR": "Fechar o notebook às 20:00",
   "fr": "Fermer l'ordinateur à 20 h"
  },
  "Salud mental": {
   "en": "Mental health",
   "pt-BR": "Saúde mental",
   "fr": "Santé mentale"
  },
  "Cuidar la mente y el descanso": {
   "en": "Take care of your mind and rest",
   "pt-BR": "Cuidar da mente e do descanso",
   "fr": "Prendre soin de l'esprit et du repos"
  },
  "Meditar 10 min": {
   "en": "Meditate 10 min",
   "pt-BR": "Meditar 10 min",
   "fr": "Méditer 10 min"
  },
  "Journaling nocturno": {
   "en": "Night journaling",
   "pt-BR": "Diário noturno",
   "fr": "Journal du soir"
  },
  "Caminar sin celular": {
   "en": "Walk without your phone",
   "pt-BR": "Caminhar sem celular",
   "fr": "Marcher sans téléphone"
  },
  "Terapia semanal": {
   "en": "Weekly therapy",
   "pt-BR": "Terapia semanal",
   "fr": "Thérapie hebdomadaire"
  },
  "Motociclista / Hobby": {
   "en": "Motorcyclist / Hobby",
   "pt-BR": "Motociclista / Hobby",
   "fr": "Motard / Loisir"
  },
  "Balance entre trabajo, moto y descanso": {
   "en": "Balance between work, riding and rest",
   "pt-BR": "Equilíbrio entre trabalho, moto e descanso",
   "fr": "Équilibre entre travail, moto et repos"
  },
  "Revisar la moto": {
   "en": "Check the motorcycle",
   "pt-BR": "Revisar a moto",
   "fr": "Vérifier la moto"
  },
  "Sesión de trabajo profundo": {
   "en": "Deep work session",
   "pt-BR": "Sessão de trabalho focado",
   "fr": "Session de travail profond"
  },
  "Rodada de enduro": {
   "en": "Enduro ride",
   "pt-BR": "Trilha de enduro",
   "fr": "Sortie enduro"
  },
  "Todas las noches": {
   "en": "Every night",
   "pt-BR": "Todas as noites",
   "fr": "Tous les soirs"
  },
  "Todos los domingos": {
   "en": "Every Sunday",
   "pt-BR": "Todos os domingos",
   "fr": "Tous les dimanches"
  },
  "1 vez por semana": {
   "en": "Once a week",
   "pt-BR": "1 vez por semana",
   "fr": "1 fois par semaine"
  },
  "3 veces por semana": {
   "en": "3 times a week",
   "pt-BR": "3 vezes por semana",
   "fr": "3 fois par semaine"
  },
  "Lun – Vie · sin interrupciones": {
   "en": "Mon – Fri · no interruptions",
   "pt-BR": "Seg – Sex · sem interrupções",
   "fr": "Lun – Ven · sans interruptions"
  },
  "Lun – Vie · después de clase": {
   "en": "Mon – Fri · after class",
   "pt-BR": "Seg – Sex · depois da aula",
   "fr": "Lun – Ven · après les cours"
  },
  "Lun – Vie · sin Slack": {
   "en": "Mon – Fri · no Slack",
   "pt-BR": "Seg – Sex · sem Slack",
   "fr": "Lun – Ven · sans Slack"
  },
  "Lun – Vie · antes de comer": {
   "en": "Mon – Fri · before lunch",
   "pt-BR": "Seg – Sex · antes do almoço",
   "fr": "Lun – Ven · avant le déjeuner"
  },
  "Lun – Vie · 25/5 x 4": {
   "en": "Mon – Fri · 25/5 x 4",
   "pt-BR": "Seg – Sex · 25/5 x 4",
   "fr": "Lun – Ven · 25/5 x 4"
  },
  "Revisar plan del día": {
   "en": "Review the day's plan",
   "pt-BR": "Revisar o plano do dia",
   "fr": "Revoir le plan de la journée"
  },
  "Cumplir meta calorías": {
   "en": "Hit calorie goal",
   "pt-BR": "Cumprir a meta de calorias",
   "fr": "Atteindre l'objectif calorique"
  },
  "Al cierre del día": {
   "en": "At the end of the day",
   "pt-BR": "No fim do dia",
   "fr": "En fin de journée"
  },
  "Tiempo para mi hobby": {
   "en": "Time for my hobby",
   "pt-BR": "Tempo para meu hobby",
   "fr": "Du temps pour mon loisir"
  },
  "¿En qué áreas quieres enfocarte?": {
   "en": "Which areas do you want to focus on?",
   "pt-BR": "Em quais áreas você quer focar?",
   "fr": "Sur quels domaines voulez-vous vous concentrer ?"
  },
  "Elige una o varias. Ajustaré los hábitos a estas prioridades.": {
   "en": "Pick one or more. I'll tailor the habits to these priorities.",
   "pt-BR": "Escolha uma ou várias. Vou ajustar os hábitos a essas prioridades.",
   "fr": "Choisissez-en un ou plusieurs. J'adapterai les habitudes à ces priorités."
  },
  "Puedes elegir más de una.": {
   "en": "You can choose more than one.",
   "pt-BR": "Você pode escolher mais de uma.",
   "fr": "Vous pouvez en choisir plusieurs."
  },
  "Ejercicio / gym": {
   "en": "Exercise / gym",
   "pt-BR": "Exercício / academia",
   "fr": "Sport / salle"
  },
  "Cardio, fuerza, movimiento": {
   "en": "Cardio, strength, movement",
   "pt-BR": "Cardio, força, movimento",
   "fr": "Cardio, force, mouvement"
  },
  "Trabajo enfocado": {
   "en": "Focused work",
   "pt-BR": "Trabalho focado",
   "fr": "Travail concentré"
  },
  "Deep work, pomodoros, PRs": {
   "en": "Deep work, pomodoros, PRs",
   "pt-BR": "Trabalho focado, pomodoros, PRs",
   "fr": "Travail profond, pomodoros, PR"
  },
  "Sueño y descanso": {
   "en": "Sleep and rest",
   "pt-BR": "Sono e descanso",
   "fr": "Sommeil et repos"
  },
  "Dormir bien, apagar pantallas": {
   "en": "Sleep well, screens off",
   "pt-BR": "Dormir bem, desligar telas",
   "fr": "Bien dormir, éteindre les écrans"
  },
  "Comidas planeadas, hidratación": {
   "en": "Planned meals, hydration",
   "pt-BR": "Refeições planejadas, hidratação",
   "fr": "Repas planifiés, hydratation"
  },
  "Mente / bienestar": {
   "en": "Mind / wellbeing",
   "pt-BR": "Mente / bem-estar",
   "fr": "Esprit / bien-être"
  },
  "Meditar, journaling, terapia": {
   "en": "Meditation, journaling, therapy",
   "pt-BR": "Meditar, diário, terapia",
   "fr": "Méditation, journal, thérapie"
  },
  "Moto, música, arte, gaming": {
   "en": "Riding, music, art, gaming",
   "pt-BR": "Moto, música, arte, games",
   "fr": "Moto, musique, art, jeux vidéo"
  },
  "Horarios base": {
   "en": "Base schedule",
   "pt-BR": "Horários base",
   "fr": "Horaires de base"
  },
  "Los usaré como referencia para el meta de los hábitos.": {
   "en": "I'll use them as a reference for the habits' details.",
   "pt-BR": "Vou usá-los como referência para os detalhes dos hábitos.",
   "fr": "Je les utiliserai comme référence pour les détails des habitudes."
  },
  "Hora de despertar": {
   "en": "Wake-up time",
   "pt-BR": "Hora de acordar",
   "fr": "Heure de réveil"
  },
  "Hora de dormir": {
   "en": "Bedtime",
   "pt-BR": "Hora de dormir",
   "fr": "Heure du coucher"
  },
  "Días de la semana \"activos\"": {
   "en": "\"Active\" days of the week",
   "pt-BR": "Dias \"ativos\" da semana",
   "fr": "Jours \"actifs\" de la semaine"
  },
  "Qué días mantienes rutinas de trabajo/estudio.": {
   "en": "Which days you keep work/study routines.",
   "pt-BR": "Em quais dias você mantém rotinas de trabalho/estudo.",
   "fr": "Les jours où vous gardez vos routines de travail/études."
  },
  "Fin de semana más ligero": {
   "en": "Lighter weekends",
   "pt-BR": "Fim de semana mais leve",
   "fr": "Week-end plus léger"
  },
  "Ritmo constante 7 días": {
   "en": "Steady pace 7 days",
   "pt-BR": "Ritmo constante 7 dias",
   "fr": "Rythme constant 7 jours"
  },
  "¿Cuántos días por semana entrenas?": {
   "en": "How many days a week do you train?",
   "pt-BR": "Quantos dias por semana você treina?",
   "fr": "Combien de jours par semaine vous entraînez-vous ?"
  },
  "Solo si elegiste \"Ejercicio\" — si no, ponlo en 0 o salta al siguiente.": {
   "en": "Only if you chose \"Exercise\" — otherwise set it to 0 or skip to the next one.",
   "pt-BR": "Só se você escolheu \"Exercício\" — se não, deixe em 0 ou pule para o próximo.",
   "fr": "Seulement si vous avez choisi « Sport » — sinon mettez 0 ou passez à la suite."
  },
  "No entreno": {
   "en": "I don't train",
   "pt-BR": "Não treino",
   "fr": "Je ne m'entraîne pas"
  },
  "Base sana": {
   "en": "Healthy base",
   "pt-BR": "Base saudável",
   "fr": "Base saine"
  },
  "Serio": {
   "en": "Serious",
   "pt-BR": "Sério",
   "fr": "Sérieux"
  },
  "Muy intenso": {
   "en": "Very intense",
   "pt-BR": "Muito intenso",
   "fr": "Très intense"
  },
  "Entreno en la mañana": {
   "en": "I train in the morning",
   "pt-BR": "Treino de manhã",
   "fr": "Je m'entraîne le matin"
  },
  "Justo después de despertar": {
   "en": "Right after waking up",
   "pt-BR": "Logo depois de acordar",
   "fr": "Juste après le réveil"
  },
  "Entreno en la tarde / noche": {
   "en": "I train in the afternoon / evening",
   "pt-BR": "Treino à tarde / noite",
   "fr": "Je m'entraîne l'après-midi / le soir"
  },
  "Antes de la cena": {
   "en": "Before dinner",
   "pt-BR": "Antes do jantar",
   "fr": "Avant le dîner"
  },
  "¿Cómo aplicamos los hábitos?": {
   "en": "How should we apply the habits?",
   "pt-BR": "Como aplicamos os hábitos?",
   "fr": "Comment appliquer les habitudes ?"
  },
  "Elige si reemplazar los que ya tienes o sólo añadirlos.": {
   "en": "Choose whether to replace the ones you have or just add them.",
   "pt-BR": "Escolha se quer substituir os que você já tem ou só adicioná-los.",
   "fr": "Choisissez de remplacer celles que vous avez ou simplement de les ajouter."
  },
  "Empiezo de cero con esta configuración": {
   "en": "Start from scratch with this setup",
   "pt-BR": "Começo do zero com esta configuração",
   "fr": "Je repars de zéro avec cette configuration"
  },
  "Conservo lo que tengo, sumo estos": {
   "en": "Keep what I have, add these",
   "pt-BR": "Mantenho o que tenho, somo estes",
   "fr": "Je garde ce que j'ai et j'ajoute celles-ci"
  },
  "Estos son los hábitos que crearé. Puedes editarlos individualmente después.": {
   "en": "These are the habits I'll create. You can edit each one later.",
   "pt-BR": "Estes são os hábitos que vou criar. Você pode editá-los individualmente depois.",
   "fr": "Voici les habitudes que je vais créer. Vous pourrez les modifier une par une ensuite."
  },
  "hábitos a crear": {
   "en": "habits to create",
   "pt-BR": "hábitos a criar",
   "fr": "habitudes à créer"
  },
  "Crear hábitos": {
   "en": "Create habits",
   "pt-BR": "Criar hábitos",
   "fr": "Créer les habitudes"
  },
  "Completa este paso antes de continuar.": {
   "en": "Complete this step before continuing.",
   "pt-BR": "Conclua esta etapa antes de continuar.",
   "fr": "Terminez cette étape avant de continuer."
  },
  "¿Iniciar la entrevista de hábitos?": {
   "en": "Start the habit interview?",
   "pt-BR": "Iniciar a entrevista de hábitos?",
   "fr": "Commencer le questionnaire d'habitudes ?"
  },
  "Nutrición": {
   "en": "Nutrition",
   "pt-BR": "Nutrição",
   "fr": "Nutrition"
  },
  "Alimentación": {
   "en": "Nutrition",
   "pt-BR": "Alimentação",
   "fr": "Alimentation"
  },
  "Empezar entrevista": {
   "en": "Start interview",
   "pt-BR": "Começar entrevista",
   "fr": "Commencer le questionnaire"
  },
  "Rehacer entrevista": {
   "en": "Redo interview",
   "pt-BR": "Refazer entrevista",
   "fr": "Refaire le questionnaire"
  },
  "O edita los campos abajo directamente": {
   "en": "Or edit the fields below directly",
   "pt-BR": "Ou edite os campos abaixo diretamente",
   "fr": "Ou modifiez directement les champs ci-dessous"
  },
  "kcal / día objetivo": {
   "en": "target kcal / day",
   "pt-BR": "kcal / dia (meta)",
   "fr": "kcal / jour visées"
  },
  "kcal / día objetivo ·": {
   "en": "target kcal / day ·",
   "pt-BR": "kcal / dia (meta) ·",
   "fr": "kcal / jour visées ·"
  },
  "meta manual": {
   "en": "manual goal",
   "pt-BR": "meta manual",
   "fr": "objectif manuel"
  },
  "Altura (cm)": {
   "en": "Height (cm)",
   "pt-BR": "Altura (cm)",
   "fr": "Taille (cm)"
  },
  "Peso (kg)": {
   "en": "Weight (kg)",
   "pt-BR": "Peso (kg)",
   "fr": "Poids (kg)"
  },
  "% grasa corporal": {
   "en": "% body fat",
   "pt-BR": "% de gordura corporal",
   "fr": "% de masse grasse"
  },
  "% de grasa corporal": {
   "en": "% body fat",
   "pt-BR": "% de gordura corporal",
   "fr": "% de masse grasse"
  },
  "% grasa": {
   "en": "% fat",
   "pt-BR": "% gordura",
   "fr": "% graisse"
  },
  "(opcional — mejora precisión)": {
   "en": "(optional — improves accuracy)",
   "pt-BR": "(opcional — melhora a precisão)",
   "fr": "(facultatif — améliore la précision)"
  },
  "Nivel de actividad": {
   "en": "Activity level",
   "pt-BR": "Nível de atividade",
   "fr": "Niveau d'activité"
  },
  "Objetivo": {
   "en": "Goal",
   "pt-BR": "Objetivo",
   "fr": "Objectif"
  },
  "Reparto de macros": {
   "en": "Macro split",
   "pt-BR": "Distribuição de macros",
   "fr": "Répartition des macros"
  },
  "Tolerancia para \"meta cumplida\"": {
   "en": "Tolerance for \"goal met\"",
   "pt-BR": "Tolerância para \"meta cumprida\"",
   "fr": "Tolérance pour « objectif atteint »"
  },
  "Ajustar a tu gusto": {
   "en": "Adjust to your liking",
   "pt-BR": "Ajustar do seu jeito",
   "fr": "Ajuster à votre goût"
  },
  "(sobreescribe el cálculo automático)": {
   "en": "(overrides the automatic calculation)",
   "pt-BR": "(substitui o cálculo automático)",
   "fr": "(remplace le calcul automatique)"
  },
  "Prot g": {
   "en": "Prot g",
   "pt-BR": "Prot g",
   "fr": "Prot g"
  },
  "Carb g": {
   "en": "Carb g",
   "pt-BR": "Carb g",
   "fr": "Gluc g"
  },
  "Grasa g": {
   "en": "Fat g",
   "pt-BR": "Gord g",
   "fr": "Lip g"
  },
  "Prot": {
   "en": "Prot",
   "pt-BR": "Prot",
   "fr": "Prot"
  },
  "Carb": {
   "en": "Carb",
   "pt-BR": "Carb",
   "fr": "Gluc"
  },
  "Usando tu meta manual. Los gramos que escribas mandan sobre todo lo demás.": {
   "en": "Using your manual goal. The grams you type override everything else.",
   "pt-BR": "Usando sua meta manual. Os gramas que você digitar têm prioridade sobre todo o resto.",
   "fr": "Votre objectif manuel est utilisé. Les grammes saisis priment sur tout le reste."
  },
  "Deja vacío lo que quieras en automático. Los gramos que escribas mandan sobre todo lo demás.": {
   "en": "Leave empty whatever you want automatic. The grams you type override everything else.",
   "pt-BR": "Deixe vazio o que quiser no automático. Os gramas que você digitar têm prioridade sobre todo o resto.",
   "fr": "Laissez vide ce que vous voulez en automatique. Les grammes saisis priment sur tout le reste."
  },
  "Restablecer cálculo automático": {
   "en": "Reset automatic calculation",
   "pt-BR": "Restaurar cálculo automático",
   "fr": "Rétablir le calcul automatique"
  },
  "¿De dónde salen estos números?": {
   "en": "Where do these numbers come from?",
   "pt-BR": "De onde vêm esses números?",
   "fr": "D'où viennent ces chiffres ?"
  },
  "Tu meta usa las ecuaciones con mayor respaldo científico en nutrición clínica y deportiva:": {
   "en": "Your goal uses the equations with the strongest scientific backing in clinical and sports nutrition:",
   "pt-BR": "Sua meta usa as equações com maior respaldo científico em nutrição clínica e esportiva:",
   "fr": "Votre objectif utilise les équations les mieux étayées scientifiquement en nutrition clinique et sportive :"
  },
  "Metabolismo basal:": {
   "en": "Basal metabolism:",
   "pt-BR": "Metabolismo basal:",
   "fr": "Métabolisme de base :"
  },
  "Katch-McArdle (usa tu masa magra a partir de tu % de grasa — la más precisa cuando conoces tu composición corporal)": {
   "en": "Katch-McArdle (uses your lean mass from your body-fat % — the most accurate when you know your body composition)",
   "pt-BR": "Katch-McArdle (usa sua massa magra a partir do seu % de gordura — a mais precisa quando você conhece sua composição corporal)",
   "fr": "Katch-McArdle (utilise votre masse maigre à partir de votre % de graisse — la plus précise quand vous connaissez votre composition corporelle)"
  },
  "Mifflin-St Jeor (1990), señalada por la Academy of Nutrition and Dietetics como la más precisa en adultos tras revisar decenas de estudios": {
   "en": "Mifflin-St Jeor (1990), named by the Academy of Nutrition and Dietetics as the most accurate in adults after reviewing dozens of studies",
   "pt-BR": "Mifflin-St Jeor (1990), apontada pela Academy of Nutrition and Dietetics como a mais precisa em adultos após revisar dezenas de estudos",
   "fr": "Mifflin-St Jeor (1990), désignée par l'Academy of Nutrition and Dietetics comme la plus précise chez l'adulte après l'examen de dizaines d'études"
  },
  "Gasto total (TDEE):": {
   "en": "Total expenditure (TDEE):",
   "pt-BR": "Gasto total (TDEE):",
   "fr": "Dépense totale (TDEE) :"
  },
  "multiplicadores de actividad estilo FAO/OMS (1.2–1.9). Tu TDEE:": {
   "en": "FAO/WHO-style activity multipliers (1.2–1.9). Your TDEE:",
   "pt-BR": "multiplicadores de atividade estilo FAO/OMS (1,2–1,9). Seu TDEE:",
   "fr": "multiplicateurs d'activité de type FAO/OMS (1,2–1,9). Votre TDEE :"
  },
  "Proteína:": {
   "en": "Protein:",
   "pt-BR": "Proteína:",
   "fr": "Protéines :"
  },
  "1.6–2.2 g/kg según objetivo, el rango del consenso de la International Society of Sports Nutrition (2017) y del meta-análisis de Morton et al. (2018, 49 estudios / 1863 personas).": {
   "en": "1.6–2.2 g/kg depending on goal, the range from the International Society of Sports Nutrition consensus (2017) and the Morton et al. meta-analysis (2018, 49 studies / 1,863 people).",
   "pt-BR": "1,6–2,2 g/kg conforme o objetivo, a faixa do consenso da International Society of Sports Nutrition (2017) e da meta-análise de Morton et al. (2018, 49 estudos / 1.863 pessoas).",
   "fr": "1,6–2,2 g/kg selon l'objectif, la fourchette du consensus de l'International Society of Sports Nutrition (2017) et de la méta-analyse de Morton et al. (2018, 49 études / 1 863 personnes)."
  },
  "Déficit/superávit:": {
   "en": "Deficit/surplus:",
   "pt-BR": "Déficit/superávit:",
   "fr": "Déficit/surplus :"
  },
  "±10–20% moderado, el rango con mejor adherencia y retención de masa magra en la literatura.": {
   "en": "a moderate ±10–20%, the range with the best adherence and lean-mass retention in the literature.",
   "pt-BR": "±10–20% moderado, a faixa com melhor adesão e retenção de massa magra na literatura.",
   "fr": "±10–20 % modéré, la fourchette offrant la meilleure adhésion et préservation de la masse maigre dans la littérature."
  },
  "Reparto restante:": {
   "en": "Remaining split:",
   "pt-BR": "Distribuição restante:",
   "fr": "Répartition restante :"
  },
  "grasa y carbohidratos dentro de los rangos aceptables (AMDR) del Institute of Medicine: grasa 20–35%, carbos 45–65% de las kcal.": {
   "en": "fat and carbs within the Institute of Medicine's acceptable ranges (AMDR): fat 20–35%, carbs 45–65% of kcal.",
   "pt-BR": "gordura e carboidratos dentro das faixas aceitáveis (AMDR) do Institute of Medicine: gordura 20–35%, carboidratos 45–65% das kcal.",
   "fr": "lipides et glucides dans les fourchettes acceptables (AMDR) de l'Institute of Medicine : lipides 20–35 %, glucides 45–65 % des kcal."
  },
  "Aún así, ninguna fórmula te conoce mejor que tú: si sabes lo que te funciona, escribe tu meta arriba y la app la respetará tal cual.": {
   "en": "Still, no formula knows you better than you do: if you know what works for you, type your goal above and the app will use it as is.",
   "pt-BR": "Mesmo assim, nenhuma fórmula conhece você melhor do que você: se sabe o que funciona, escreva sua meta acima e o app vai respeitá-la como está.",
   "fr": "Cela dit, aucune formule ne vous connaît mieux que vous : si vous savez ce qui vous convient, saisissez votre objectif ci-dessus et l'application le respectera tel quel."
  },
  "Sedentario": {
   "en": "Sedentary",
   "pt-BR": "Sedentário",
   "fr": "Sédentaire"
  },
  "Oficina, sin ejercicio": {
   "en": "Office job, no exercise",
   "pt-BR": "Escritório, sem exercício",
   "fr": "Bureau, sans sport"
  },
  "Ligero": {
   "en": "Light",
   "pt-BR": "Leve",
   "fr": "Léger"
  },
  "Ejercicio ligero 1–3 d/sem": {
   "en": "Light exercise 1–3 d/wk",
   "pt-BR": "Exercício leve 1–3 d/sem",
   "fr": "Sport léger 1–3 j/sem"
  },
  "Moderado": {
   "en": "Moderate",
   "pt-BR": "Moderado",
   "fr": "Modéré"
  },
  "Ejercicio 3–5 d/sem": {
   "en": "Exercise 3–5 d/wk",
   "pt-BR": "Exercício 3–5 d/sem",
   "fr": "Sport 3–5 j/sem"
  },
  "Alto": {
   "en": "High",
   "pt-BR": "Alto",
   "fr": "Élevé"
  },
  "Ejercicio duro 6–7 d/sem": {
   "en": "Hard exercise 6–7 d/wk",
   "pt-BR": "Exercício intenso 6–7 d/sem",
   "fr": "Sport intense 6–7 j/sem"
  },
  "Atleta": {
   "en": "Athlete",
   "pt-BR": "Atleta",
   "fr": "Athlète"
  },
  "Ejercicio + trabajo físico": {
   "en": "Exercise + physical job",
   "pt-BR": "Exercício + trabalho físico",
   "fr": "Sport + travail physique"
  },
  "Bajar grasa": {
   "en": "Lose fat",
   "pt-BR": "Perder gordura",
   "fr": "Perdre du gras"
  },
  "Déficit 15%, alta proteína": {
   "en": "15% deficit, high protein",
   "pt-BR": "Déficit de 15%, alta proteína",
   "fr": "Déficit de 15 %, riche en protéines"
  },
  "Mantener": {
   "en": "Maintain",
   "pt-BR": "Manter",
   "fr": "Maintenir"
  },
  "TDEE, balanceado": {
   "en": "TDEE, balanced",
   "pt-BR": "TDEE, equilibrado",
   "fr": "TDEE, équilibré"
  },
  "Ganar músculo": {
   "en": "Build muscle",
   "pt-BR": "Ganhar músculo",
   "fr": "Prendre du muscle"
  },
  "Superávit 10%, alta proteína": {
   "en": "10% surplus, high protein",
   "pt-BR": "Superávit de 10%, alta proteína",
   "fr": "Surplus de 10 %, riche en protéines"
  },
  "Ganar rápido": {
   "en": "Gain fast",
   "pt-BR": "Ganhar rápido",
   "fr": "Prise rapide"
  },
  "Superávit 20%": {
   "en": "20% surplus",
   "pt-BR": "Superávit de 20%",
   "fr": "Surplus de 20 %"
  },
  "Balanceado (30/30/40)": {
   "en": "Balanced (30/30/40)",
   "pt-BR": "Equilibrado (30/30/40)",
   "fr": "Équilibré (30/30/40)"
  },
  "Alto proteína (40/25/35)": {
   "en": "High protein (40/25/35)",
   "pt-BR": "Alta proteína (40/25/35)",
   "fr": "Riche en protéines (40/25/35)"
  },
  "Bajo carbohidrato (30/40/30)": {
   "en": "Low carb (30/40/30)",
   "pt-BR": "Low carb (30/40/30)",
   "fr": "Pauvre en glucides (30/40/30)"
  },
  "Estricta": {
   "en": "Strict",
   "pt-BR": "Rigorosa",
   "fr": "Stricte"
  },
  "Balanceada": {
   "en": "Balanced",
   "pt-BR": "Equilibrada",
   "fr": "Équilibrée"
  },
  "Flexible": {
   "en": "Flexible",
   "pt-BR": "Flexível",
   "fr": "Souple"
  },
  "Sexo biológico": {
   "en": "Biological sex",
   "pt-BR": "Sexo biológico",
   "fr": "Sexe biologique"
  },
  "Sexo": {
   "en": "Sex",
   "pt-BR": "Sexo",
   "fr": "Sexe"
  },
  "Se usa para calcular tu metabolismo basal (fórmula Mifflin-St Jeor).": {
   "en": "Used to calculate your basal metabolism (Mifflin-St Jeor formula).",
   "pt-BR": "Usado para calcular seu metabolismo basal (fórmula Mifflin-St Jeor).",
   "fr": "Sert à calculer votre métabolisme de base (formule Mifflin-St Jeor)."
  },
  "Hombre": {
   "en": "Male",
   "pt-BR": "Homem",
   "fr": "Homme"
  },
  "Mujer": {
   "en": "Female",
   "pt-BR": "Mulher",
   "fr": "Femme"
  },
  "Aplica fórmula masculina de BMR": {
   "en": "Uses the male BMR formula",
   "pt-BR": "Aplica a fórmula masculina de BMR",
   "fr": "Applique la formule BMR masculine"
  },
  "Aplica fórmula femenina de BMR": {
   "en": "Uses the female BMR formula",
   "pt-BR": "Aplica a fórmula feminina de BMR",
   "fr": "Applique la formule BMR féminine"
  },
  "Datos básicos": {
   "en": "Basic info",
   "pt-BR": "Dados básicos",
   "fr": "Informations de base"
  },
  "Edad, altura y peso actual. El peso se guarda con fecha para ver tu progreso.": {
   "en": "Age, height and current weight. Your weight is saved with the date so you can see your progress.",
   "pt-BR": "Idade, altura e peso atual. O peso é salvo com a data para você ver seu progresso.",
   "fr": "Âge, taille et poids actuel. Le poids est enregistré avec la date pour suivre vos progrès."
  },
  "Edad": {
   "en": "Age",
   "pt-BR": "Idade",
   "fr": "Âge"
  },
  "Altura": {
   "en": "Height",
   "pt-BR": "Altura",
   "fr": "Taille"
  },
  "años": {
   "en": "years",
   "pt-BR": "anos",
   "fr": "ans"
  },
  "Peso actual": {
   "en": "Current weight",
   "pt-BR": "Peso atual",
   "fr": "Poids actuel"
  },
  "¿Conoces tu % de grasa corporal?": {
   "en": "Do you know your body-fat %?",
   "pt-BR": "Você sabe seu % de gordura corporal?",
   "fr": "Connaissez-vous votre % de masse grasse ?"
  },
  "Opcional. Si lo sabes (báscula inteligente, DEXA, etc.) usamos Katch-McArdle, más preciso. Si no, sigúe adelante.": {
   "en": "Optional. If you know it (smart scale, DEXA, etc.) we use Katch-McArdle, which is more accurate. If not, just continue.",
   "pt-BR": "Opcional. Se você souber (balança inteligente, DEXA etc.), usamos Katch-McArdle, mais preciso. Se não, siga em frente.",
   "fr": "Facultatif. Si vous le connaissez (balance connectée, DEXA, etc.), nous utilisons Katch-McArdle, plus précis. Sinon, continuez."
  },
  "Este campo es opcional. Déjalo vacío si no lo conoces.": {
   "en": "This field is optional. Leave it empty if you don't know it.",
   "pt-BR": "Este campo é opcional. Deixe vazio se não souber.",
   "fr": "Ce champ est facultatif. Laissez-le vide si vous ne le connaissez pas."
  },
  "— saltar": {
   "en": "— skip",
   "pt-BR": "— pular",
   "fr": "— passer"
  },
  "Nivel de actividad física": {
   "en": "Physical activity level",
   "pt-BR": "Nível de atividade física",
   "fr": "Niveau d'activité physique"
  },
  "Incluye tu ejercicio y tu vida diaria. Sé honesto para no sobreestimar tus kcal.": {
   "en": "Include your exercise and daily life. Be honest so you don't overestimate your kcal.",
   "pt-BR": "Inclua seu exercício e sua rotina diária. Seja honesto para não superestimar suas kcal.",
   "fr": "Incluez votre sport et votre quotidien. Soyez honnête pour ne pas surestimer vos kcal."
  },
  "¿Cuál es tu objetivo?": {
   "en": "What's your goal?",
   "pt-BR": "Qual é o seu objetivo?",
   "fr": "Quel est votre objectif ?"
  },
  "Define cuánto ajustamos las kcal sobre tu TDEE.": {
   "en": "Sets how much we adjust kcal relative to your TDEE.",
   "pt-BR": "Define quanto ajustamos as kcal em relação ao seu TDEE.",
   "fr": "Définit de combien nous ajustons les kcal par rapport à votre TDEE."
  },
  "Cómo se dividen tus kcal entre proteína, grasa y carbohidrato.": {
   "en": "How your kcal are split between protein, fat and carbs.",
   "pt-BR": "Como suas kcal se dividem entre proteína, gordura e carboidrato.",
   "fr": "Comment vos kcal se répartissent entre protéines, lipides et glucides."
  },
  "Elige según tu objetivo (recomendado)": {
   "en": "Chosen based on your goal (recommended)",
   "pt-BR": "Escolhido conforme seu objetivo (recomendado)",
   "fr": "Choisi selon votre objectif (recommandé)"
  },
  "Qué tan estricto es el sistema para marcar el hábito de nutrición como logrado.": {
   "en": "How strict the system is when marking the nutrition habit as done.",
   "pt-BR": "Quão rigoroso o sistema é para marcar o hábito de nutrição como cumprido.",
   "fr": "Le degré d'exigence pour marquer l'habitude nutrition comme atteinte."
  },
  "Estos son tus números. Puedes editar cualquier campo después desde la sección Nutrición.": {
   "en": "These are your numbers. You can edit any field later from the Nutrition section.",
   "pt-BR": "Estes são seus números. Você pode editar qualquer campo depois na seção Nutrição.",
   "fr": "Voici vos chiffres. Vous pourrez modifier n'importe quel champ plus tard dans la section Nutrition."
  },
  "kcal / día": {
   "en": "kcal / day",
   "pt-BR": "kcal / dia",
   "fr": "kcal / jour"
  },
  "Entrevista de nutrición": {
   "en": "Nutrition interview",
   "pt-BR": "Entrevista de nutrição",
   "fr": "Questionnaire nutrition"
  },
  "de 2000 (sugerido)": {
   "en": "of 2000 (suggested)",
   "pt-BR": "de 2000 (sugerido)",
   "fr": "sur 2000 (suggéré)"
  },
  "kcal del día": {
   "en": "kcal today",
   "pt-BR": "kcal do dia",
   "fr": "kcal du jour"
  },
  "Repetir día anterior": {
   "en": "Repeat previous day",
   "pt-BR": "Repetir dia anterior",
   "fr": "Répéter la veille"
  },
  "Repetir lo de ayer": {
   "en": "Repeat yesterday's",
   "pt-BR": "Repetir o de ontem",
   "fr": "Répéter hier"
  },
  "Alimento": {
   "en": "Food",
   "pt-BR": "Alimento",
   "fr": "Aliment"
  },
  "Huevo": {
   "en": "Egg",
   "pt-BR": "Ovo",
   "fr": "Œuf"
  },
  "Carne": {
   "en": "Meat",
   "pt-BR": "Carne",
   "fr": "Viande"
  },
  "Pescado": {
   "en": "Fish",
   "pt-BR": "Peixe",
   "fr": "Poisson"
  },
  "Lácteo": {
   "en": "Dairy",
   "pt-BR": "Laticínio",
   "fr": "Produit laitier"
  },
  "Prot. vegetal": {
   "en": "Plant protein",
   "pt-BR": "Prot. vegetal",
   "fr": "Prot. végétale"
  },
  "Cereal": {
   "en": "Grain",
   "pt-BR": "Cereal",
   "fr": "Céréale"
  },
  "Legumbre": {
   "en": "Legume",
   "pt-BR": "Leguminosa",
   "fr": "Légumineuse"
  },
  "Verdura": {
   "en": "Vegetable",
   "pt-BR": "Verdura",
   "fr": "Légume"
  },
  "Fruta": {
   "en": "Fruit",
   "pt-BR": "Fruta",
   "fr": "Fruit"
  },
  "Fruto seco": {
   "en": "Nut",
   "pt-BR": "Oleaginosa",
   "fr": "Fruit à coque"
  },
  "Grasa": {
   "en": "Fat",
   "pt-BR": "Gordura",
   "fr": "Lipides"
  },
  "Dulce": {
   "en": "Sweet",
   "pt-BR": "Doce",
   "fr": "Sucré"
  },
  "Bebida": {
   "en": "Drink",
   "pt-BR": "Bebida",
   "fr": "Boisson"
  },
  "Platillo": {
   "en": "Dish",
   "pt-BR": "Prato",
   "fr": "Plat"
  },
  "cucharada": {
   "en": "tbsp",
   "pt-BR": "colher de sopa",
   "fr": "c. à soupe"
  },
  "cucharadita": {
   "en": "tsp",
   "pt-BR": "colher de chá",
   "fr": "c. à café"
  },
  "pieza": {
   "en": "piece",
   "pt-BR": "unidade",
   "fr": "pièce"
  },
  "rebanada": {
   "en": "slice",
   "pt-BR": "fatia",
   "fr": "tranche"
  },
  "lata": {
   "en": "can",
   "pt-BR": "lata",
   "fr": "canette"
  },
  "botella 600ml": {
   "en": "600 ml bottle",
   "pt-BR": "garrafa 600 ml",
   "fr": "bouteille 600 ml"
  },
  "vaso": {
   "en": "glass",
   "pt-BR": "copo",
   "fr": "verre"
  },
  "taza": {
   "en": "cup",
   "pt-BR": "xícara",
   "fr": "tasse"
  },
  "media taza": {
   "en": "half cup",
   "pt-BR": "meia xícara",
   "fr": "demi-tasse"
  },
  "caballito": {
   "en": "shot",
   "pt-BR": "dose",
   "fr": "shot"
  },
  "copa": {
   "en": "glass",
   "pt-BR": "taça",
   "fr": "verre"
  },
  "scoop": {
   "en": "scoop",
   "pt-BR": "scoop",
   "fr": "dose"
  },
  "plato": {
   "en": "plate",
   "pt-BR": "prato",
   "fr": "assiette"
  },
  "puñado": {
   "en": "handful",
   "pt-BR": "punhado",
   "fr": "poignée"
  },
  "filete": {
   "en": "fillet",
   "pt-BR": "filé",
   "fr": "filet"
  },
  "porción": {
   "en": "serving",
   "pt-BR": "porção",
   "fr": "portion"
  },
  "porción chica": {
   "en": "small serving",
   "pt-BR": "porção pequena",
   "fr": "petite portion"
  },
  "porción grande": {
   "en": "large serving",
   "pt-BR": "porção grande",
   "fr": "grande portion"
  },
  "Sin platillos guardados": {
   "en": "No saved dishes",
   "pt-BR": "Nenhum prato salvo",
   "fr": "Aucun plat enregistré"
  },
  "Crea uno o guárdalo desde una comida del día": {
   "en": "Create one or save it from a meal of the day",
   "pt-BR": "Crie um ou salve a partir de uma refeição do dia",
   "fr": "Créez-en un ou enregistrez-le depuis un repas du jour"
  },
  "Nuevo platillo": {
   "en": "New dish",
   "pt-BR": "Novo prato",
   "fr": "Nouveau plat"
  },
  "+ Nuevo platillo": {
   "en": "+ New dish",
   "pt-BR": "+ Novo prato",
   "fr": "+ Nouveau plat"
  },
  "Editar platillo": {
   "en": "Edit dish",
   "pt-BR": "Editar prato",
   "fr": "Modifier le plat"
  },
  "Nombre del platillo": {
   "en": "Dish name",
   "pt-BR": "Nome do prato",
   "fr": "Nom du plat"
  },
  "Añadir ingrediente": {
   "en": "Add ingredient",
   "pt-BR": "Adicionar ingrediente",
   "fr": "Ajouter un ingrédient"
  },
  "+ Añadir ingrediente": {
   "en": "+ Add ingredient",
   "pt-BR": "+ Adicionar ingrediente",
   "fr": "+ Ajouter un ingrédient"
  },
  "Editar ingrediente": {
   "en": "Edit ingredient",
   "pt-BR": "Editar ingrediente",
   "fr": "Modifier l'ingrédient"
  },
  "Los valores mostrados son por 1 porción": {
   "en": "Values shown are per 1 serving",
   "pt-BR": "Os valores mostrados são por 1 porção",
   "fr": "Les valeurs affichées sont pour 1 portion"
  },
  "Rinde": {
   "en": "Makes",
   "pt-BR": "Rende",
   "fr": "Donne"
  },
  "porciones": {
   "en": "servings",
   "pt-BR": "porções",
   "fr": "portions"
  },
  "Porciones": {
   "en": "Servings",
   "pt-BR": "Porções",
   "fr": "Portions"
  },
  "ingredientes": {
   "en": "ingredients",
   "pt-BR": "ingredientes",
   "fr": "ingrédients"
  },
  "Cantidad": {
   "en": "Amount",
   "pt-BR": "Quantidade",
   "fr": "Quantité"
  },
  "Añadir platillo": {
   "en": "Add dish",
   "pt-BR": "Adicionar prato",
   "fr": "Ajouter un plat"
  },
  "Guardar como platillo": {
   "en": "Save as dish",
   "pt-BR": "Salvar como prato",
   "fr": "Enregistrer comme plat"
  },
  "Guardar esta comida como un platillo reutilizable": {
   "en": "Save this meal as a reusable dish",
   "pt-BR": "Salvar esta refeição como um prato reutilizável",
   "fr": "Enregistrer ce repas comme plat réutilisable"
  },
  "Guardar platillo": {
   "en": "Save dish",
   "pt-BR": "Salvar prato",
   "fr": "Enregistrer le plat"
  },
  "Mis alimentos": {
   "en": "My foods",
   "pt-BR": "Meus alimentos",
   "fr": "Mes aliments"
  },
  "Crear alimento": {
   "en": "Create food",
   "pt-BR": "Criar alimento",
   "fr": "Créer un aliment"
  },
  "+ Crear alimento": {
   "en": "+ Create food",
   "pt-BR": "+ Criar alimento",
   "fr": "+ Créer un aliment"
  },
  "Editar alimento": {
   "en": "Edit food",
   "pt-BR": "Editar alimento",
   "fr": "Modifier l'aliment"
  },
  "Añadir alimento": {
   "en": "Add food",
   "pt-BR": "Adicionar alimento",
   "fr": "Ajouter un aliment"
  },
  "Marca (opcional)": {
   "en": "Brand (optional)",
   "pt-BR": "Marca (opcional)",
   "fr": "Marque (facultatif)"
  },
  "Foto (opcional)": {
   "en": "Photo (optional)",
   "pt-BR": "Foto (opcional)",
   "fr": "Photo (facultatif)"
  },
  "Añadir foto": {
   "en": "Add photo",
   "pt-BR": "Adicionar foto",
   "fr": "Ajouter une photo"
  },
  "Cambiar foto": {
   "en": "Change photo",
   "pt-BR": "Trocar foto",
   "fr": "Changer la photo"
  },
  "Por 100 g / 100 ml": {
   "en": "Per 100 g / 100 ml",
   "pt-BR": "Por 100 g / 100 ml",
   "fr": "Pour 100 g / 100 ml"
  },
  "Ej: Licuado de avena de mamá": {
   "en": "e.g. Mom's oat smoothie",
   "pt-BR": "Ex.: Vitamina de aveia da mamãe",
   "fr": "Ex. : Smoothie à l'avoine de maman"
  },
  "Ponle un nombre.": {
   "en": "Give it a name.",
   "pt-BR": "Dê um nome.",
   "fr": "Donnez-lui un nom."
  },
  "Indica las kcal por 100 g.": {
   "en": "Enter the kcal per 100 g.",
   "pt-BR": "Informe as kcal por 100 g.",
   "fr": "Indiquez les kcal pour 100 g."
  },
  "Aún no has creado alimentos. Crea el primero o importa los de un amigo.": {
   "en": "You haven't created any foods yet. Create your first one or import a friend's.",
   "pt-BR": "Você ainda não criou alimentos. Crie o primeiro ou importe os de um amigo.",
   "fr": "Vous n'avez pas encore créé d'aliments. Créez le premier ou importez ceux d'un ami."
  },
  "No tienes alimentos que compartir todavía.": {
   "en": "You don't have any foods to share yet.",
   "pt-BR": "Você ainda não tem alimentos para compartilhar.",
   "fr": "Vous n'avez pas encore d'aliments à partager."
  },
  "Importar alimentos": {
   "en": "Import foods",
   "pt-BR": "Importar alimentos",
   "fr": "Importer des aliments"
  },
  "Pega aquí el JSON de alimentos que te compartieron (de Rutinal u otra app compatible):": {
   "en": "Paste here the foods JSON someone shared with you (from Rutinal or another compatible app):",
   "pt-BR": "Cole aqui o JSON de alimentos que compartilharam com você (do Rutinal ou outro app compatível):",
   "fr": "Collez ici le JSON d'aliments qu'on vous a partagé (depuis Rutinal ou une autre application compatible) :"
  },
  "Pega el JSON primero.": {
   "en": "Paste the JSON first.",
   "pt-BR": "Cole o JSON primeiro.",
   "fr": "Collez d'abord le JSON."
  },
  "JSON inválido": {
   "en": "Invalid JSON",
   "pt-BR": "JSON inválido",
   "fr": "JSON non valide"
  },
  "Formato no reconocido. Se espera un export de alimentos de Rutinal.": {
   "en": "Unrecognized format. A Rutinal foods export is expected.",
   "pt-BR": "Formato não reconhecido. Era esperado um export de alimentos do Rutinal.",
   "fr": "Format non reconnu. Un export d'aliments Rutinal est attendu."
  },
  "Copiado al portapapeles. Pégalo en la otra app o guárdalo donde quieras.": {
   "en": "Copied to clipboard. Paste it in the other app or save it wherever you like.",
   "pt-BR": "Copiado para a área de transferência. Cole no outro app ou salve onde quiser.",
   "fr": "Copié dans le presse-papiers. Collez-le dans l'autre application ou enregistrez-le où vous voulez."
  },
  "Copia el texto:": {
   "en": "Copy the text:",
   "pt-BR": "Copie o texto:",
   "fr": "Copiez le texte :"
  },
  "Creado por ti": {
   "en": "Created by you",
   "pt-BR": "Criado por você",
   "fr": "Créé par vous"
  },
  "Base local Rutinal": {
   "en": "Rutinal local database",
   "pt-BR": "Base local do Rutinal",
   "fr": "Base locale Rutinal"
  },
  "Guardar en mis alimentos": {
   "en": "Save to my foods",
   "pt-BR": "Salvar em meus alimentos",
   "fr": "Enregistrer dans mes aliments"
  },
  "Guardado en mis alimentos": {
   "en": "Saved to my foods",
   "pt-BR": "Salvo em meus alimentos",
   "fr": "Enregistré dans mes aliments"
  },
  "Buscando en USDA y Open Food Facts...": {
   "en": "Searching USDA and Open Food Facts...",
   "pt-BR": "Buscando no USDA e no Open Food Facts...",
   "fr": "Recherche dans USDA et Open Food Facts..."
  },
  "USDA sin cupo (DEMO_KEY). Mostrando solo la base local.": {
   "en": "USDA quota used up (DEMO_KEY). Showing only the local database.",
   "pt-BR": "USDA sem cota (DEMO_KEY). Mostrando só a base local.",
   "fr": "Quota USDA épuisé (DEMO_KEY). Affichage de la base locale uniquement."
  },
  "Sin conexión con USDA/OFF. Mostrando solo la base local.": {
   "en": "No connection to USDA/OFF. Showing only the local database.",
   "pt-BR": "Sem conexão com USDA/OFF. Mostrando só a base local.",
   "fr": "Pas de connexion à USDA/OFF. Affichage de la base locale uniquement."
  },
  "Límite de la USDA DEMO_KEY alcanzado y sin resultados en las demás fuentes. Configura tu propia API key gratis en api.data.gov (Editar → Nutrición) o intenta con nombres simples (huevo, arroz, pollo).": {
   "en": "USDA DEMO_KEY limit reached and no results from the other sources. Set up your own free API key at api.data.gov (Edit → Nutrition) or try simple names (egg, rice, chicken).",
   "pt-BR": "Limite da USDA DEMO_KEY atingido e sem resultados nas outras fontes. Configure sua própria chave de API grátis em api.data.gov (Editar → Nutrição) ou tente nomes simples (ovo, arroz, frango).",
   "fr": "Limite de la DEMO_KEY USDA atteinte et aucun résultat dans les autres sources. Configurez votre propre clé API gratuite sur api.data.gov (Modifier → Nutrition) ou essayez des noms simples (œuf, riz, poulet)."
  },
  "Sin conexión con las bases online. Prueba con nombres simples de la base local (huevo, arroz, pollo).": {
   "en": "No connection to the online databases. Try simple names from the local database (egg, rice, chicken).",
   "pt-BR": "Sem conexão com as bases online. Tente nomes simples da base local (ovo, arroz, frango).",
   "fr": "Pas de connexion aux bases en ligne. Essayez des noms simples de la base locale (œuf, riz, poulet)."
  },
  "O escribe el código": {
   "en": "Or type the code",
   "pt-BR": "Ou digite o código",
   "fr": "Ou saisissez le code"
  },
  "Escanear código": {
   "en": "Scan barcode",
   "pt-BR": "Escanear código",
   "fr": "Scanner le code"
  },
  "No se pudo abrir la cámara. Revisa el permiso de cámara de la app, o escribe el código abajo.": {
   "en": "Couldn't open the camera. Check the app's camera permission, or type the code below.",
   "pt-BR": "Não foi possível abrir a câmera. Verifique a permissão de câmera do app ou digite o código abaixo.",
   "fr": "Impossible d'ouvrir l'appareil photo. Vérifiez l'autorisation caméra de l'application ou saisissez le code ci-dessous."
  },
  "Tu dispositivo no soporta el escáner con cámara. Introduce el código manualmente:": {
   "en": "Your device doesn't support the camera scanner. Enter the code manually:",
   "pt-BR": "Seu dispositivo não suporta o leitor com câmera. Digite o código manualmente:",
   "fr": "Votre appareil ne prend pas en charge le scanner. Saisissez le code manuellement :"
  },
  "Consultando bases de datos...": {
   "en": "Checking databases...",
   "pt-BR": "Consultando bases de dados...",
   "fr": "Consultation des bases de données..."
  },
  "El código": {
   "en": "The code",
   "pt-BR": "O código",
   "fr": "Le code"
  },
  "no está en Open Food Facts ni en USDA.": {
   "en": "isn't in Open Food Facts or USDA.",
   "pt-BR": "não está no Open Food Facts nem no USDA.",
   "fr": "n'est ni dans Open Food Facts ni dans USDA."
  },
  "Kcal por día (últimos 14)": {
   "en": "Kcal per day (last 14)",
   "pt-BR": "Kcal por dia (últimos 14)",
   "fr": "Kcal par jour (14 derniers)"
  },
  "Aún no hay días registrados.": {
   "en": "No days logged yet.",
   "pt-BR": "Ainda não há dias registrados.",
   "fr": "Aucun jour enregistré pour l'instant."
  },
  "Peso corporal": {
   "en": "Body weight",
   "pt-BR": "Peso corporal",
   "fr": "Poids corporel"
  },
  "Registra tu peso abajo para ver la tendencia.": {
   "en": "Log your weight below to see the trend.",
   "pt-BR": "Registre seu peso abaixo para ver a tendência.",
   "fr": "Enregistrez votre poids ci-dessous pour voir la tendance."
  },
  "Peso de hoy (kg)": {
   "en": "Today's weight (kg)",
   "pt-BR": "Peso de hoje (kg)",
   "fr": "Poids du jour (kg)"
  },
  "Escribe un peso válido entre 30 y 250 kg (ej. 78.5).": {
   "en": "Enter a valid weight between 30 and 250 kg (e.g. 78.5).",
   "pt-BR": "Digite um peso válido entre 30 e 250 kg (ex.: 78,5).",
   "fr": "Saisissez un poids valide entre 30 et 250 kg (ex. : 78,5)."
  },
  "Todos los días ·": {
   "en": "Every day ·",
   "pt-BR": "Todos os dias ·",
   "fr": "Tous les jours ·"
  },
  "Mifflin-St Jeor (1990), señalada por la Academy of Nutrition and Dietetics como la más precisa en adultos tras revisar decenas de estudios. Tu BMR:": {
   "en": "Mifflin-St Jeor (1990), named by the Academy of Nutrition and Dietetics as the most accurate in adults after reviewing dozens of studies. Your BMR:",
   "pt-BR": "Mifflin-St Jeor (1990), apontada pela Academy of Nutrition and Dietetics como a mais precisa em adultos após revisar dezenas de estudos. Seu BMR:",
   "fr": "Mifflin-St Jeor (1990), désignée par l'Academy of Nutrition and Dietetics comme la plus précise chez l'adulte après l'examen de dizaines d'études. Votre BMR :"
  },
  "Katch-McArdle (usa tu masa magra a partir de tu % de grasa — la más precisa cuando conoces tu composición corporal). Tu BMR:": {
   "en": "Katch-McArdle (uses your lean mass from your body-fat % — the most accurate when you know your body composition). Your BMR:",
   "pt-BR": "Katch-McArdle (usa sua massa magra a partir do seu % de gordura — a mais precisa quando você conhece sua composição corporal). Seu BMR:",
   "fr": "Katch-McArdle (utilise votre masse maigre à partir de votre % de graisse — la plus précise quand vous connaissez votre composition corporelle). Votre BMR :"
  },
  "MÍO": {
   "en": "MINE",
   "pt-BR": "MEU",
   "fr": "PERSO"
  },
  "Todas las noches ·": {
   "en": "Every night ·",
   "pt-BR": "Todas as noites ·",
   "fr": "Tous les soirs ·"
  },
  "Todas las mañanas ·": {
   "en": "Every morning ·",
   "pt-BR": "Todas as manhãs ·",
   "fr": "Tous les matins ·"
  },
  "Review": {
   "en": "Review",
   "pt-BR": "Revisão",
   "fr": "Bilan"
  },
  "Review de comidas": {
   "en": "Meal review",
   "pt-BR": "Revisão de refeições",
   "fr": "Bilan des repas"
  },
  "Genera un PDF con tus comidas, promedios y alimentos más frecuentes.": {
   "en": "Create a PDF with your meals, averages and most frequent foods.",
   "pt-BR": "Gere um PDF com suas refeições, médias e alimentos mais frequentes.",
   "fr": "Générez un PDF avec vos repas, vos moyennes et vos aliments les plus fréquents."
  },
  "Semana": {
   "en": "Week",
   "pt-BR": "Semana",
   "fr": "Semaine"
  },
  "Mes": {
   "en": "Month",
   "pt-BR": "Mês",
   "fr": "Mois"
  },
  "Año": {
   "en": "Year",
   "pt-BR": "Ano",
   "fr": "Année"
  },
  "Generar PDF": {
   "en": "Create PDF",
   "pt-BR": "Gerar PDF",
   "fr": "Générer le PDF"
  },
  "Guardar PDF": {
   "en": "Save PDF",
   "pt-BR": "Salvar PDF",
   "fr": "Enregistrer le PDF"
  },
  "No hay comidas registradas en este periodo.": {
   "en": "No meals logged in this period.",
   "pt-BR": "Nenhuma refeição registrada neste período.",
   "fr": "Aucun repas enregistré sur cette période."
  },
  "Días registrados": {
   "en": "Days logged",
   "pt-BR": "Dias registrados",
   "fr": "Jours enregistrés"
  },
  "kcal promedio": {
   "en": "avg kcal",
   "pt-BR": "kcal média",
   "fr": "kcal moyennes"
  },
  "Proteína prom.": {
   "en": "Avg protein",
   "pt-BR": "Proteína média",
   "fr": "Protéines moy."
  },
  "Carbohidratos prom.": {
   "en": "Avg carbs",
   "pt-BR": "Carboidratos médios",
   "fr": "Glucides moy."
  },
  "Grasa prom.": {
   "en": "Avg fat",
   "pt-BR": "Gordura média",
   "fr": "Lipides moy."
  },
  "Días con meta cumplida": {
   "en": "Days goal met",
   "pt-BR": "Dias com meta cumprida",
   "fr": "Jours objectif atteint"
  },
  "kcal totales": {
   "en": "total kcal",
   "pt-BR": "kcal totais",
   "fr": "kcal totales"
  },
  "Kcal por día": {
   "en": "Kcal per day",
   "pt-BR": "Kcal por dia",
   "fr": "Kcal par jour"
  },
  "Kcal promedio por mes": {
   "en": "Average kcal per month",
   "pt-BR": "Kcal média por mês",
   "fr": "Kcal moyennes par mois"
  },
  "Dentro de la meta": {
   "en": "Within goal",
   "pt-BR": "Dentro da meta",
   "fr": "Dans l'objectif"
  },
  "Arriba de la meta": {
   "en": "Above goal",
   "pt-BR": "Acima da meta",
   "fr": "Au-dessus de l'objectif"
  },
  "Meta": {
   "en": "Goal",
   "pt-BR": "Meta",
   "fr": "Objectif"
  },
  "Carbohidratos": {
   "en": "Carbs",
   "pt-BR": "Carboidratos",
   "fr": "Glucides"
  },
  "kcal promedio por tiempo de comida": {
   "en": "Average kcal per meal",
   "pt-BR": "Kcal média por refeição",
   "fr": "Kcal moyennes par repas"
  },
  "Alimentos más frecuentes": {
   "en": "Most frequent foods",
   "pt-BR": "Alimentos mais frequentes",
   "fr": "Aliments les plus fréquents"
  },
  "Veces": {
   "en": "Times",
   "pt-BR": "Vezes",
   "fr": "Fois"
  },
  "Total": {
   "en": "Total",
   "pt-BR": "Total",
   "fr": "Total"
  },
  "Sin datos": {
   "en": "No data",
   "pt-BR": "Sem dados",
   "fr": "Aucune donnée"
  },
  "Peso inicial": {
   "en": "Starting weight",
   "pt-BR": "Peso inicial",
   "fr": "Poids initial"
  },
  "Peso final": {
   "en": "Final weight",
   "pt-BR": "Peso final",
   "fr": "Poids final"
  },
  "Cambio": {
   "en": "Change",
   "pt-BR": "Variação",
   "fr": "Variation"
  },
  "Día futuro": {
   "en": "Future day",
   "pt-BR": "Dia futuro",
   "fr": "Jour à venir"
  },
  "Sin registro": {
   "en": "Not logged",
   "pt-BR": "Sem registro",
   "fr": "Non enregistré"
  },
  "Tiempo": {
   "en": "Meal",
   "pt-BR": "Refeição",
   "fr": "Repas"
  },
  "Día": {
   "en": "Day",
   "pt-BR": "Dia",
   "fr": "Jour"
  },
  "Alimentos": {
   "en": "Foods",
   "pt-BR": "Alimentos",
   "fr": "Aliments"
  },
  "Días": {
   "en": "Days",
   "pt-BR": "Dias",
   "fr": "Jours"
  },
  "kcal prom.": {
   "en": "avg kcal",
   "pt-BR": "kcal média",
   "fr": "kcal moy."
  },
  "Detalle por día": {
   "en": "Daily detail",
   "pt-BR": "Detalhe por dia",
   "fr": "Détail par jour"
  },
  "Resumen por mes": {
   "en": "Monthly summary",
   "pt-BR": "Resumo por mês",
   "fr": "Résumé par mois"
  },
  "Generado con Rutinal": {
   "en": "Generated with Rutinal",
   "pt-BR": "Gerado com o Rutinal",
   "fr": "Généré avec Rutinal"
  },
  "Se guardó el reporte en Descargas. Ábrelo y usa Imprimir → Guardar como PDF. Actualiza la app para generar el PDF directamente.": {
   "en": "The report was saved to Downloads. Open it and use Print → Save as PDF. Update the app to create the PDF directly.",
   "pt-BR": "O relatório foi salvo em Downloads. Abra-o e use Imprimir → Salvar como PDF. Atualize o app para gerar o PDF diretamente.",
   "fr": "Le rapport a été enregistré dans Téléchargements. Ouvrez-le et utilisez Imprimer → Enregistrer en PDF. Mettez l'application à jour pour générer le PDF directement."
  },
  "No se pudo generar el PDF en este dispositivo.": {
   "en": "Couldn't create the PDF on this device.",
   "pt-BR": "Não foi possível gerar o PDF neste dispositivo.",
   "fr": "Impossible de générer le PDF sur cet appareil."
  },
  "Peso registrado": {
   "en": "Logged weight",
   "pt-BR": "Peso registrado",
   "fr": "Poids enregistré"
  },
  "Promedio diario vs meta": {
   "en": "Daily average vs goal",
   "pt-BR": "Média diária vs meta",
   "fr": "Moyenne quotidienne vs objectif"
  },
  "Meta sugerida: configura tu perfil en Editar → Nutrición.": {
   "en": "Suggested goal: set up your profile in Edit → Nutrition.",
   "pt-BR": "Meta sugerida: configure seu perfil em Editar → Nutrição.",
   "fr": "Objectif suggéré : configurez votre profil dans Modifier → Nutrition."
  },
  "Gym": {
   "en": "Gym",
   "pt-BR": "Academia",
   "fr": "Salle"
  },
  "Hoy toca": {
   "en": "Today's workout",
   "pt-BR": "Treino de hoje",
   "fr": "Séance du jour"
  },
  "Empezar": {
   "en": "Start",
   "pt-BR": "Começar",
   "fr": "Commencer"
  },
  "Continuar": {
   "en": "Continue",
   "pt-BR": "Continuar",
   "fr": "Continuer"
  },
  "Ver entrenamiento": {
   "en": "View workout",
   "pt-BR": "Ver treino",
   "fr": "Voir la séance"
  },
  "Descanso": {
   "en": "Rest",
   "pt-BR": "Descanso",
   "fr": "Repos"
  },
  "No tienes rutina asignada para hoy.": {
   "en": "You don't have a routine assigned for today.",
   "pt-BR": "Você não tem rotina para hoje.",
   "fr": "Aucune routine prévue aujourd'hui."
  },
  "Crea o importa una rutina para empezar.": {
   "en": "Create or import a routine to get started.",
   "pt-BR": "Crie ou importe uma rotina para começar.",
   "fr": "Créez ou importez une routine pour commencer."
  },
  "Entrenar otra rutina hoy": {
   "en": "Train another routine today",
   "pt-BR": "Treinar outra rotina hoje",
   "fr": "Faire une autre routine aujourd'hui"
  },
  "Mis rutinas": {
   "en": "My routines",
   "pt-BR": "Minhas rotinas",
   "fr": "Mes routines"
  },
  "Aún no tienes rutinas.": {
   "en": "You don't have any routines yet.",
   "pt-BR": "Você ainda não tem rotinas.",
   "fr": "Vous n'avez pas encore de routines."
  },
  "+ Nueva rutina": {
   "en": "+ New routine",
   "pt-BR": "+ Nova rotina",
   "fr": "+ Nouvelle routine"
  },
  "Nueva rutina": {
   "en": "New routine",
   "pt-BR": "Nova rotina",
   "fr": "Nouvelle routine"
  },
  "Editar rutina": {
   "en": "Edit routine",
   "pt-BR": "Editar rotina",
   "fr": "Modifier la routine"
  },
  "Importar PDF": {
   "en": "Import PDF",
   "pt-BR": "Importar PDF",
   "fr": "Importer un PDF"
  },
  "Historial": {
   "en": "History",
   "pt-BR": "Histórico",
   "fr": "Historique"
  },
  "Aquí aparecerán tus entrenamientos.": {
   "en": "Your workouts will show up here.",
   "pt-BR": "Seus treinos aparecerão aqui.",
   "fr": "Vos séances apparaîtront ici."
  },
  "Ejercicios e imágenes: free-exercise-db (dominio público)": {
   "en": "Exercises and images: free-exercise-db (public domain)",
   "pt-BR": "Exercícios e imagens: free-exercise-db (domínio público)",
   "fr": "Exercices et images : free-exercise-db (domaine public)"
  },
  "Elige la rutina de hoy": {
   "en": "Choose today's routine",
   "pt-BR": "Escolha a rotina de hoje",
   "fr": "Choisissez la routine du jour"
  },
  "Circuito": {
   "en": "Circuit",
   "pt-BR": "Circuito",
   "fr": "Circuit"
  },
  "alternar ejercicios": {
   "en": "alternate exercises",
   "pt-BR": "alternar exercícios",
   "fr": "alterner les exercices"
  },
  "Periodo": {
   "en": "Phase",
   "pt-BR": "Período",
   "fr": "Période"
  },
  "Calentamiento": {
   "en": "Warm-up",
   "pt-BR": "Aquecimento",
   "fr": "Échauffement"
  },
  "Notas": {
   "en": "Notes",
   "pt-BR": "Notas",
   "fr": "Notes"
  },
  "Indicaciones": {
   "en": "Instructions",
   "pt-BR": "Orientações",
   "fr": "Consignes"
  },
  "Músculos": {
   "en": "Muscles",
   "pt-BR": "Músculos",
   "fr": "Muscles"
  },
  "Tempo": {
   "en": "Tempo",
   "pt-BR": "Cadência",
   "fr": "Tempo"
  },
  "Compartir cargas": {
   "en": "Share loads",
   "pt-BR": "Compartilhar cargas",
   "fr": "Partager les charges"
  },
  "Terminar entrenamiento": {
   "en": "Finish workout",
   "pt-BR": "Terminar treino",
   "fr": "Terminer la séance"
  },
  "✓ Entrenamiento terminado": {
   "en": "✓ Workout finished",
   "pt-BR": "✓ Treino concluído",
   "fr": "✓ Séance terminée"
  },
  "Última vez": {
   "en": "Last time",
   "pt-BR": "Última vez",
   "fr": "Dernière fois"
  },
  "reps": {
   "en": "reps",
   "pt-BR": "reps",
   "fr": "rép."
  },
  "Todavía no registras cargas en este entrenamiento.": {
   "en": "You haven't logged any loads in this workout yet.",
   "pt-BR": "Você ainda não registrou cargas neste treino.",
   "fr": "Vous n'avez encore enregistré aucune charge pour cette séance."
  },
  "Músculo": {
   "en": "Muscle",
   "pt-BR": "Músculo",
   "fr": "Muscle"
  },
  "Secundarios": {
   "en": "Secondary",
   "pt-BR": "Secundários",
   "fr": "Secondaires"
  },
  "Equipo": {
   "en": "Equipment",
   "pt-BR": "Equipamento",
   "fr": "Équipement"
  },
  "Este ejercicio no está vinculado a la base. Vincúlalo para ver su animación y músculos.": {
   "en": "This exercise isn't linked to the database. Link it to see its animation and muscles.",
   "pt-BR": "Este exercício não está vinculado à base. Vincule-o para ver a animação e os músculos.",
   "fr": "Cet exercice n'est pas lié à la base. Liez-le pour voir son animation et ses muscles."
  },
  "Cambiar ejercicio vinculado": {
   "en": "Change linked exercise",
   "pt-BR": "Trocar exercício vinculado",
   "fr": "Changer l'exercice lié"
  },
  "Vincular con la base": {
   "en": "Link to database",
   "pt-BR": "Vincular à base",
   "fr": "Lier à la base"
  },
  "Agregar foto": {
   "en": "Add photo",
   "pt-BR": "Adicionar foto",
   "fr": "Ajouter une photo"
  },
  "Quitar foto": {
   "en": "Remove photo",
   "pt-BR": "Remover foto",
   "fr": "Retirer la photo"
  },
  "‹ Volver": {
   "en": "‹ Back",
   "pt-BR": "‹ Voltar",
   "fr": "‹ Retour"
  },
  "Sin imagen": {
   "en": "No image",
   "pt-BR": "Sem imagem",
   "fr": "Pas d'image"
  },
  "Buscar ejercicio": {
   "en": "Find exercise",
   "pt-BR": "Buscar exercício",
   "fr": "Chercher un exercice"
  },
  "Busca en español o inglés (ej. press inclinado, remo)": {
   "en": "Search in Spanish or English (e.g. incline press, row)",
   "pt-BR": "Busque em espanhol ou inglês (ex. incline press, row)",
   "fr": "Cherchez en espagnol ou en anglais (ex. incline press, row)"
  },
  "Cargando ejercicios…": {
   "en": "Loading exercises…",
   "pt-BR": "Carregando exercícios…",
   "fr": "Chargement des exercices…"
  },
  "Escribe el nombre del ejercicio.": {
   "en": "Type the exercise name.",
   "pt-BR": "Digite o nome do exercício.",
   "fr": "Saisissez le nom de l'exercice."
  },
  "No se pudo cargar la base de ejercicios.": {
   "en": "Couldn't load the exercise database.",
   "pt-BR": "Não foi possível carregar a base de exercícios.",
   "fr": "Impossible de charger la base d'exercices."
  },
  "Nombre del ejercicio": {
   "en": "Exercise name",
   "pt-BR": "Nome do exercício",
   "fr": "Nom de l'exercice"
  },
  "Series × reps": {
   "en": "Sets × reps",
   "pt-BR": "Séries × reps",
   "fr": "Séries × rép."
  },
  "Descanso entre series": {
   "en": "Rest between sets",
   "pt-BR": "Descanso entre séries",
   "fr": "Repos entre les séries"
  },
  "Cambiar imagen": {
   "en": "Change image",
   "pt-BR": "Trocar imagem",
   "fr": "Changer l'image"
  },
  "Vincular": {
   "en": "Link",
   "pt-BR": "Vincular",
   "fr": "Lier"
  },
  "Quitar": {
   "en": "Remove",
   "pt-BR": "Remover",
   "fr": "Retirer"
  },
  "Nombre de la rutina": {
   "en": "Routine name",
   "pt-BR": "Nome da rotina",
   "fr": "Nom de la routine"
  },
  "Ej. Día 1 · Pecho / espalda": {
   "en": "e.g. Day 1 · Chest / back",
   "pt-BR": "Ex. Dia 1 · Peito / costas",
   "fr": "Ex. Jour 1 · Pectoraux / dos"
  },
  "Días de la semana": {
   "en": "Days of the week",
   "pt-BR": "Dias da semana",
   "fr": "Jours de la semaine"
  },
  "Agrega tu primer ejercicio.": {
   "en": "Add your first exercise.",
   "pt-BR": "Adicione seu primeiro exercício.",
   "fr": "Ajoutez votre premier exercice."
  },
  "+ Agregar ejercicio": {
   "en": "+ Add exercise",
   "pt-BR": "+ Adicionar exercício",
   "fr": "+ Ajouter un exercice"
  },
  "Duplicar rutina": {
   "en": "Duplicate routine",
   "pt-BR": "Duplicar rotina",
   "fr": "Dupliquer la routine"
  },
  "Eliminar rutina": {
   "en": "Delete routine",
   "pt-BR": "Excluir rotina",
   "fr": "Supprimer la routine"
  },
  "Ponle nombre a la rutina.": {
   "en": "Give the routine a name.",
   "pt-BR": "Dê um nome à rotina.",
   "fr": "Donnez un nom à la routine."
  },
  "Agrega al menos un ejercicio.": {
   "en": "Add at least one exercise.",
   "pt-BR": "Adicione pelo menos um exercício.",
   "fr": "Ajoutez au moins un exercice."
  },
  "¿Eliminar esta rutina? Tu historial de cargas se conserva.": {
   "en": "Delete this routine? Your load history is kept.",
   "pt-BR": "Excluir esta rotina? Seu histórico de cargas é mantido.",
   "fr": "Supprimer cette routine ? Votre historique de charges est conservé."
  },
  "Leyendo el PDF…": {
   "en": "Reading the PDF…",
   "pt-BR": "Lendo o PDF…",
   "fr": "Lecture du PDF…"
  },
  "Extrayendo fotos de los ejercicios…": {
   "en": "Extracting exercise photos…",
   "pt-BR": "Extraindo fotos dos exercícios…",
   "fr": "Extraction des photos des exercices…"
  },
  "No encontré ejercicios en este PDF. Puedes crear la rutina a mano.": {
   "en": "I couldn't find any exercises in this PDF. You can create the routine manually.",
   "pt-BR": "Não encontrei exercícios neste PDF. Você pode criar a rotina manualmente.",
   "fr": "Aucun exercice trouvé dans ce PDF. Vous pouvez créer la routine à la main."
  },
  "No se pudo leer el PDF.": {
   "en": "Couldn't read the PDF.",
   "pt-BR": "Não foi possível ler o PDF.",
   "fr": "Impossible de lire le PDF."
  },
  "Revisa lo que encontré en el PDF y guarda.": {
   "en": "Check what I found in the PDF and save.",
   "pt-BR": "Revise o que encontrei no PDF e salve.",
   "fr": "Vérifiez ce que j'ai trouvé dans le PDF et enregistrez."
  },
  "ejercicios": {
   "en": "exercises",
   "pt-BR": "exercícios",
   "fr": "exercices"
  },
  "Abdomen": {
   "en": "Abs",
   "pt-BR": "Abdômen",
   "fr": "Abdominaux"
  },
  "Abductores": {
   "en": "Abductors",
   "pt-BR": "Abdutores",
   "fr": "Abducteurs"
  },
  "Aductores": {
   "en": "Adductors",
   "pt-BR": "Adutores",
   "fr": "Adducteurs"
  },
  "Bíceps": {
   "en": "Biceps",
   "pt-BR": "Bíceps",
   "fr": "Biceps"
  },
  "Pantorrillas": {
   "en": "Calves",
   "pt-BR": "Panturrilhas",
   "fr": "Mollets"
  },
  "Pecho": {
   "en": "Chest",
   "pt-BR": "Peito",
   "fr": "Pectoraux"
  },
  "Antebrazos": {
   "en": "Forearms",
   "pt-BR": "Antebraços",
   "fr": "Avant-bras"
  },
  "Glúteos": {
   "en": "Glutes",
   "pt-BR": "Glúteos",
   "fr": "Fessiers"
  },
  "Isquiotibiales": {
   "en": "Hamstrings",
   "pt-BR": "Posteriores da coxa",
   "fr": "Ischio-jambiers"
  },
  "Dorsales": {
   "en": "Lats",
   "pt-BR": "Dorsais",
   "fr": "Dorsaux"
  },
  "Espalda baja": {
   "en": "Lower back",
   "pt-BR": "Lombar",
   "fr": "Bas du dos"
  },
  "Espalda media": {
   "en": "Middle back",
   "pt-BR": "Meio das costas",
   "fr": "Milieu du dos"
  },
  "Cuello": {
   "en": "Neck",
   "pt-BR": "Pescoço",
   "fr": "Cou"
  },
  "Cuádriceps": {
   "en": "Quads",
   "pt-BR": "Quadríceps",
   "fr": "Quadriceps"
  },
  "Hombros": {
   "en": "Shoulders",
   "pt-BR": "Ombros",
   "fr": "Épaules"
  },
  "Trapecios": {
   "en": "Traps",
   "pt-BR": "Trapézios",
   "fr": "Trapèzes"
  },
  "Tríceps": {
   "en": "Triceps",
   "pt-BR": "Tríceps",
   "fr": "Triceps"
  },
  "Barra": {
   "en": "Barbell",
   "pt-BR": "Barra",
   "fr": "Barre"
  },
  "Mancuernas": {
   "en": "Dumbbells",
   "pt-BR": "Halteres",
   "fr": "Haltères"
  },
  "Polea": {
   "en": "Cable",
   "pt-BR": "Polia",
   "fr": "Poulie"
  },
  "Máquina": {
   "en": "Machine",
   "pt-BR": "Máquina",
   "fr": "Machine"
  },
  "Kettlebell": {
   "en": "Kettlebell",
   "pt-BR": "Kettlebell",
   "fr": "Kettlebell"
  },
  "Bandas": {
   "en": "Bands",
   "pt-BR": "Elásticos",
   "fr": "Élastiques"
  },
  "Balón medicinal": {
   "en": "Medicine ball",
   "pt-BR": "Medicine ball",
   "fr": "Médecine-ball"
  },
  "Fitball": {
   "en": "Exercise ball",
   "pt-BR": "Bola suíça",
   "fr": "Ballon de gym"
  },
  "Foam roller": {
   "en": "Foam roller",
   "pt-BR": "Rolo de liberação",
   "fr": "Rouleau de massage"
  },
  "Barra Z": {
   "en": "EZ bar",
   "pt-BR": "Barra W",
   "fr": "Barre EZ"
  },
  "Otro": {
   "en": "Other",
   "pt-BR": "Outro",
   "fr": "Autre"
  },
  "Empieza aquí": {
   "en": "Start here",
   "pt-BR": "Comece aqui",
   "fr": "Commencez ici"
  },
  "Importa el PDF de tu coach o arma tu rutina.": {
   "en": "Import your coach's PDF or build your own routine.",
   "pt-BR": "Importe o PDF do seu coach ou monte sua rotina.",
   "fr": "Importez le PDF de votre coach ou créez votre routine."
  },
  "toca un día para cambiarlo": {
   "en": "tap a day to change it",
   "pt-BR": "toque um dia para mudar",
   "fr": "touchez un jour pour le changer"
  },
  "+ Nueva": {
   "en": "+ New",
   "pt-BR": "+ Nova",
   "fr": "+ Nouvelle"
  },
  "series": {
   "en": "sets",
   "pt-BR": "séries",
   "fr": "séries"
  },
  "Indicaciones del coach": {
   "en": "Coach's instructions",
   "pt-BR": "Orientações do coach",
   "fr": "Consignes du coach"
  },
  "¡A la siguiente serie!": {
   "en": "Next set!",
   "pt-BR": "Próxima série!",
   "fr": "Série suivante !"
  },
  "OK": {
   "en": "OK",
   "pt-BR": "OK",
   "fr": "OK"
  },
  "+30 s": {
   "en": "+30 s",
   "pt-BR": "+30 s",
   "fr": "+30 s"
  },
  "Saltar": {
   "en": "Skip",
   "pt-BR": "Pular",
   "fr": "Passer"
  },
  "toca uno para editarlo": {
   "en": "tap one to edit it",
   "pt-BR": "toque um para editar",
   "fr": "touchez-en un pour le modifier"
  },
  "Listo": {
   "en": "Done",
   "pt-BR": "Pronto",
   "fr": "OK"
  }
 },
 "tpl": {
  "{{n}} de {{n2}} hábitos hoy": {
   "en": "{{n}} of {{n2}} habits today",
   "pt-BR": "{{n}} de {{n2}} hábitos hoje",
   "fr": "{{n}} sur {{n2}} habitudes aujourd'hui"
  },
  "{{n}} de {{n2}} tareas": {
   "en": "{{n}} of {{n2}} tasks",
   "pt-BR": "{{n}} de {{n2}} tarefas",
   "fr": "{{n}} sur {{n2}} tâches"
  },
  "{{n}} de {{n2}} conseguidos": {
   "en": "{{n}} of {{n2}} achieved",
   "pt-BR": "{{n}} de {{n2}} conquistados",
   "fr": "{{n}} sur {{n2}} obtenus"
  },
  "{{n}} de {{n2}}": {
   "en": "{{n}} of {{n2}}",
   "pt-BR": "{{n}} de {{n2}}",
   "fr": "{{n}} sur {{n2}}"
  },
  "racha {{n}}": {
   "en": "streak {{n}}",
   "pt-BR": "sequência {{n}}",
   "fr": "série {{n}}"
  },
  "Ciclo {{n}} de {{n2}}": {
   "en": "Cycle {{n}} of {{n2}}",
   "pt-BR": "Ciclo {{n}} de {{n2}}",
   "fr": "Cycle {{n}} sur {{n2}}"
  },
  "Ciclo {{n}} de {{n2}} · descanso": {
   "en": "Cycle {{n}} of {{n2}} · break",
   "pt-BR": "Ciclo {{n}} de {{n2}} · descanso",
   "fr": "Cycle {{n}} sur {{n2}} · pause"
  },
  "Te faltan {{n}} para el día perfecto": {
   "en": "{{n}} to go for a perfect day",
   "pt-BR": "Faltam {{n}} para o dia perfeito",
   "fr": "Plus que {{n}} pour une journée parfaite"
  },
  "Racha activa. Te faltan {{n}} hábitos para no perderla hoy": {
   "en": "Streak active. {{n}} habits left so you don't lose it today",
   "pt-BR": "Sequência ativa. Faltam {{n}} hábitos para não perdê-la hoje",
   "fr": "Série active. Plus que {{n}} habitudes pour ne pas la perdre aujourd'hui"
  },
  "{{x}} kcal · {{y}}g proteína · no cuenta para la racha": {
   "en": "{{x}} kcal · {{y}}g protein · doesn't count toward the streak",
   "pt-BR": "{{x}} kcal · {{y}}g proteína · não conta para a sequência",
   "fr": "{{x}} kcal · {{y}} g protéines · ne compte pas pour la série"
  },
  "{{n}}% hoy": {
   "en": "{{n}}% today",
   "pt-BR": "{{n}}% hoje",
   "fr": "{{n}} % aujourd'hui"
  },
  "racha {{n}}d · mejor {{n2}}d": {
   "en": "streak {{n}}d · best {{n2}}d",
   "pt-BR": "sequência {{n}}d · melhor {{n2}}d",
   "fr": "série {{n}} j · record {{n2}} j"
  },
  "{{x}} · {{n}}/{{n2}} hábitos": {
   "en": "{{x}} · {{n}}/{{n2}} habits",
   "pt-BR": "{{x}} · {{n}}/{{n2}} hábitos",
   "fr": "{{x}} · {{n}}/{{n2}} habitudes"
  },
  "({{x}} vs días sin gym).": {
   "en": "({{x}} vs non-gym days).",
   "pt-BR": "({{x}} vs dias sem academia).",
   "fr": "({{x}} par rapport aux jours sans salle)."
  },
  "los días que entrenas ({{x}}g vs {{y}}g).": {
   "en": "on training days ({{x}}g vs {{y}}g).",
   "pt-BR": "nos dias em que você treina ({{x}}g vs {{y}}g).",
   "fr": "les jours d'entraînement ({{x}} g contre {{y}} g)."
  },
  "({{n}}% de las veces).": {
   "en": "({{n}}% of the time).",
   "pt-BR": "({{n}}% das vezes).",
   "fr": "({{n}} % du temps)."
  },
  "Empieza a las {{x}}": {
   "en": "Starts at {{x}}",
   "pt-BR": "Começa às {{x}}",
   "fr": "Commence à {{x}}"
  },
  "Tienes un plan de {{n}} semana(s) listo. ¿Cuándo empieza?": {
   "en": "You have a {{n}}-week plan ready. When does it start?",
   "pt-BR": "Você tem um plano de {{n}} semana(s) pronto. Quando começa?",
   "fr": "Vous avez un plan de {{n}} semaine(s) prêt. Quand commence-t-il ?"
  },
  "El plan empieza la semana del {{x}}.": {
   "en": "The plan starts the week of {{x}}.",
   "pt-BR": "O plano começa na semana de {{x}}.",
   "fr": "Le plan commence la semaine du {{x}}."
  },
  "Completaste {{n}} de {{n2}} tareas del plan. ¡Define el siguiente ciclo en Editar → Metas semanales!": {
   "en": "You completed {{n}} of {{n2}} plan tasks. Set up the next cycle in Edit → Weekly goals!",
   "pt-BR": "Você concluiu {{n}} de {{n2}} tarefas do plano. Defina o próximo ciclo em Editar → Metas semanais!",
   "fr": "Vous avez terminé {{n}} tâches du plan sur {{n2}}. Définissez le prochain cycle dans Modifier → Objectifs hebdomadaires !"
  },
  "Metas · Semana {{n}}": {
   "en": "Goals · Week {{n}}",
   "pt-BR": "Metas · Semana {{n}}",
   "fr": "Objectifs · Semaine {{n}}"
  },
  "Metas · Semana {{n}}: {{x}}": {
   "en": "Goals · Week {{n}}: {{x}}",
   "pt-BR": "Metas · Semana {{n}}: {{x}}",
   "fr": "Objectifs · Semaine {{n}} : {{x}}"
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
  "{{n}} sesión · {{n2}} min de enfoque": {
   "en": "{{n}} session · {{n2}} min of focus",
   "pt-BR": "{{n}} sessão · {{n2}} min de foco",
   "fr": "{{n}} session · {{n2}} min de concentration"
  },
  "{{n}} sesiones · {{n2}} min de enfoque": {
   "en": "{{n}} sessions · {{n2}} min of focus",
   "pt-BR": "{{n}} sessões · {{n2}} min de foco",
   "fr": "{{n}} sessions · {{n2}} min de concentration"
  },
  "{{n}} sesión": {
   "en": "{{n}} session",
   "pt-BR": "{{n}} sessão",
   "fr": "{{n}} session"
  },
  "{{n}} sesiones": {
   "en": "{{n}} sessions",
   "pt-BR": "{{n}} sessões",
   "fr": "{{n}} sessions"
  },
  "Activo a las {{x}} cada día.": {
   "en": "Active at {{x}} every day.",
   "pt-BR": "Ativo às {{x}} todos os dias.",
   "fr": "Actif à {{x}} chaque jour."
  },
  "Activo a las {{x}}: solo avisa si no has registrado comida.": {
   "en": "Active at {{x}}: only notifies if you haven't logged food.",
   "pt-BR": "Ativo às {{x}}: só avisa se você não registrou alimentação.",
   "fr": "Actif à {{x}} : ne prévient que si vous n'avez rien enregistré."
  },
  "Último respaldo automático: {{x}}": {
   "en": "Last automatic backup: {{x}}",
   "pt-BR": "Último backup automático: {{x}}",
   "fr": "Dernière sauvegarde automatique : {{x}}"
  },
  "Hoy aplica el horario de {{x}}.": {
   "en": "Today follows the {{x}} schedule.",
   "pt-BR": "Hoje vale o horário de {{x}}.",
   "fr": "Aujourd'hui, c'est l'horaire « {{x}} » qui s'applique."
  },
  "Alimentos importados: {{n}} nuevos, {{n2}} actualizados.": {
   "en": "Foods imported: {{n}} new, {{n2}} updated.",
   "pt-BR": "Alimentos importados: {{n}} novos, {{n2}} atualizados.",
   "fr": "Aliments importés : {{n}} nouveaux, {{n2}} mis à jour."
  },
  "Importados: {{n}} nuevos, {{n2}} actualizados.": {
   "en": "Imported: {{n}} new, {{n2}} updated.",
   "pt-BR": "Importados: {{n}} novos, {{n2}} atualizados.",
   "fr": "Importés : {{n}} nouveaux, {{n2}} mis à jour."
  },
  "Importados: {{n}} nuevos, {{n2}} actualizados, {{n3}} inválidos omitidos.": {
   "en": "Imported: {{n}} new, {{n2}} updated, {{n3}} invalid skipped.",
   "pt-BR": "Importados: {{n}} novos, {{n2}} atualizados, {{n3}} inválidos ignorados.",
   "fr": "Importés : {{n}} nouveaux, {{n2}} mis à jour, {{n3}} non valides ignorés."
  },
  "No se pudo importar: {{x}}": {
   "en": "Couldn't import: {{x}}",
   "pt-BR": "Não foi possível importar: {{x}}",
   "fr": "Importation impossible : {{x}}"
  },
  "Respaldo guardado en Descargas: {{x}}": {
   "en": "Backup saved to Downloads: {{x}}",
   "pt-BR": "Backup salvo em Downloads: {{x}}",
   "fr": "Sauvegarde enregistrée dans Téléchargements : {{x}}"
  },
  "Reemplazar tus datos actuales con este backup? Backup: {{x}} Campos: {{n}} Esta acción no se puede deshacer.": {
   "en": "Replace your current data with this backup?\n\nBackup: {{x}}\nFields: {{n}}\n\nThis can't be undone.",
   "pt-BR": "Substituir seus dados atuais por este backup?\n\nBackup: {{x}}\nCampos: {{n}}\n\nEsta ação não pode ser desfeita.",
   "fr": "Remplacer vos données actuelles par cette sauvegarde ?\n\nSauvegarde : {{x}}\nChamps : {{n}}\n\nCette action est irréversible."
  },
  "El archivo no es válido: {{x}}": {
   "en": "The file isn't valid: {{x}}",
   "pt-BR": "O arquivo não é válido: {{x}}",
   "fr": "Le fichier n'est pas valide : {{x}}"
  },
  "Deshacer importación ({{x}})": {
   "en": "Undo import ({{x}})",
   "pt-BR": "Desfazer importação ({{x}})",
   "fr": "Annuler l'importation ({{x}})"
  },
  "¿Eliminar \"{{x}}\"?": {
   "en": "Delete \"{{x}}\"?",
   "pt-BR": "Excluir \"{{x}}\"?",
   "fr": "Supprimer « {{x}} » ?"
  },
  "¿Eliminar hábito \"{{x}}\"? El historial se conserva.": {
   "en": "Delete habit \"{{x}}\"? Its history is kept.",
   "pt-BR": "Excluir o hábito \"{{x}}\"? O histórico é mantido.",
   "fr": "Supprimer l'habitude « {{x}} » ? L'historique est conservé."
  },
  "¿Eliminar la categoría \"{{x}}\"?": {
   "en": "Delete the category \"{{x}}\"?",
   "pt-BR": "Excluir a categoria \"{{x}}\"?",
   "fr": "Supprimer la catégorie « {{x}} » ?"
  },
  "¿Eliminar \"{{x}}\" de tus alimentos?": {
   "en": "Delete \"{{x}}\" from your foods?",
   "pt-BR": "Excluir \"{{x}}\" dos seus alimentos?",
   "fr": "Supprimer « {{x}} » de vos aliments ?"
  },
  "Hay {{n}} bloque(s) con esta categoría. Al eliminarla pasarán a Personal. ¿Continuar?": {
   "en": "There are {{n}} block(s) in this category. If you delete it they'll move to Personal. Continue?",
   "pt-BR": "Há {{n}} bloco(s) com esta categoria. Ao excluí-la, eles passarão para Pessoal. Continuar?",
   "fr": "{{n}} bloc(s) utilisent cette catégorie. En la supprimant, ils passeront dans Personnel. Continuer ?"
  },
  "Esto borrará tus {{n}} hábitos actuales y abrirá la entrevista para crear nuevos. ¿Continuar?": {
   "en": "This will delete your {{n}} current habits and open the interview to create new ones.\n\nContinue?",
   "pt-BR": "Isso vai apagar seus {{n}} hábitos atuais e abrir a entrevista para criar novos.\n\nContinuar?",
   "fr": "Cela supprimera vos {{n}} habitudes actuelles et ouvrira le questionnaire pour en créer de nouvelles.\n\nContinuer ?"
  },
  "{{x}} · {{n}} hábitos": {
   "en": "{{x}} · {{n}} habits",
   "pt-BR": "{{x}} · {{n}} hábitos",
   "fr": "{{x}} · {{n}} habitudes"
  },
  "Paso {{n}} de {{n2}}": {
   "en": "Step {{n}} of {{n2}}",
   "pt-BR": "Passo {{n}} de {{n2}}",
   "fr": "Étape {{n}} sur {{n2}}"
  },
  "{{n}} días": {
   "en": "{{n}} days",
   "pt-BR": "{{n}} dias",
   "fr": "{{n}} jours"
  },
  "{{n}} días / sem": {
   "en": "{{n}} days / wk",
   "pt-BR": "{{n}} dias / sem",
   "fr": "{{n}} jours / sem"
  },
  "{{x}} · 60–90 min": {
   "en": "{{x}} · 60–90 min",
   "pt-BR": "{{x}} · 60–90 min",
   "fr": "{{x}} · 60–90 min"
  },
  "{{x}} · sin interrupciones": {
   "en": "{{x}} · no interruptions",
   "pt-BR": "{{x}} · sem interrupções",
   "fr": "{{x}} · sans interruptions"
  },
  "{{x}} · al despertar": {
   "en": "{{x}} · on waking up",
   "pt-BR": "{{x}} · ao acordar",
   "fr": "{{x}} · au réveil"
  },
  "{{x}} · {{y}}": {
   "en": "{{x}} · {{y}}",
   "pt-BR": "{{x}} · {{y}}",
   "fr": "{{x}} · {{y}}"
  },
  "Gym {{x}}": {
   "en": "Gym {{x}}",
   "pt-BR": "Academia {{x}}",
   "fr": "Salle {{x}}"
  },
  "Dormir {{x}}": {
   "en": "Sleep {{x}}",
   "pt-BR": "Dormir {{x}}",
   "fr": "Dormir {{x}}"
  },
  "Despertar {{x}}": {
   "en": "Wake up {{x}}",
   "pt-BR": "Acordar {{x}}",
   "fr": "Réveil {{x}}"
  },
  "Desde {{x}}": {
   "en": "From {{x}}",
   "pt-BR": "A partir de {{x}}",
   "fr": "Dès {{x}}"
  },
  "Todos los días · {{x}}": {
   "en": "Every day · {{x}}",
   "pt-BR": "Todos os dias · {{x}}",
   "fr": "Tous les jours · {{x}}"
  },
  "Todas las mañanas · {{x}}": {
   "en": "Every morning · {{x}}",
   "pt-BR": "Todas as manhãs · {{x}}",
   "fr": "Tous les matins · {{x}}"
  },
  "Todas las noches · {{x}}": {
   "en": "Every night · {{x}}",
   "pt-BR": "Todas as noites · {{x}}",
   "fr": "Tous les soirs · {{x}}"
  },
  "Lun – Vie · {{x}}": {
   "en": "Mon – Fri · {{x}}",
   "pt-BR": "Seg – Sex · {{x}}",
   "fr": "Lun – Ven · {{x}}"
  },
  "Lun–Vie · {{x}}": {
   "en": "Mon–Fri · {{x}}",
   "pt-BR": "Seg–Sex · {{x}}",
   "fr": "Lun–Ven · {{x}}"
  },
  "Solo {{x}}": {
   "en": "Only {{x}}",
   "pt-BR": "Só {{x}}",
   "fr": "Seulement {{x}}"
  },
  "{{n}} años": {
   "en": "{{n}} years",
   "pt-BR": "{{n}} anos",
   "fr": "{{n}} ans"
  },
  "Proteína ≈ {{x}} g/kg": {
   "en": "Protein ≈ {{x}} g/kg",
   "pt-BR": "Proteína ≈ {{x}} g/kg",
   "fr": "Protéines ≈ {{x}} g/kg"
  },
  "kcal ±{{n}}% · proteína ≥{{n2}}% · max exceso {{n3}}%": {
   "en": "kcal ±{{n}}% · protein ≥{{n2}}% · max excess {{n3}}%",
   "pt-BR": "kcal ±{{n}}% · proteína ≥{{n2}}% · excesso máx. {{n3}}%",
   "fr": "kcal ±{{n}} % · protéines ≥{{n2}} % · excès max {{n3}} %"
  },
  "Categoría: {{x}}": {
   "en": "Category: {{x}}",
   "pt-BR": "Categoria: {{x}}",
   "fr": "Catégorie : {{x}}"
  },
  "de {{n}} (sugerido)": {
   "en": "of {{n}} (suggested)",
   "pt-BR": "de {{n}} (sugerido)",
   "fr": "sur {{n}} (suggéré)"
  },
  "de {{n}} meta": {
   "en": "of {{n}} goal",
   "pt-BR": "de {{n}} de meta",
   "fr": "sur {{n}} visées"
  },
  "meta {{n}}": {
   "en": "goal {{n}}",
   "pt-BR": "meta {{n}}",
   "fr": "objectif {{n}}"
  },
  "Promedio últimos 7 días ({{n}} con registro)": {
   "en": "Average of the last 7 days ({{n}} logged)",
   "pt-BR": "Média dos últimos 7 dias ({{n}} com registro)",
   "fr": "Moyenne des 7 derniers jours ({{n}} enregistrés)"
  },
  "{{n}} {{x}} · {{n2}} kcal / {{y}}": {
   "en": "{{n}} {{x}} · {{n2}} kcal / {{y}}",
   "pt-BR": "{{n}} {{x}} · {{n2}} kcal / {{y}}",
   "fr": "{{n}} {{x}} · {{n2}} kcal / {{y}}"
  },
  "{{n}} {{x}} · {{y}}g P · {{z}}g C · {{w}}g G": {
   "en": "{{n}} {{x}} · {{y}}g P · {{z}}g C · {{w}}g F",
   "pt-BR": "{{n}} {{x}} · {{y}}g P · {{z}}g C · {{w}}g G",
   "fr": "{{n}} {{x}} · {{y}} g P · {{z}} g G · {{w}} g L"
  },
  "{{x}} ({{n}}g)": {
   "en": "{{x}} ({{n}}g)",
   "pt-BR": "{{x}} ({{n}}g)",
   "fr": "{{x}} ({{n}} g)"
  },
  "{{x}} kcal · P {{y}} · C {{z}} · G {{w}}": {
   "en": "{{x}} kcal · P {{y}} · C {{z}} · F {{w}}",
   "pt-BR": "{{x}} kcal · P {{y}} · C {{z}} · G {{w}}",
   "fr": "{{x}} kcal · P {{y}} · G {{z}} · L {{w}}"
  },
  "Sin resultados para “{{x}}”. Prueba con otro término, o créalo con \"+ Crear alimento\".": {
   "en": "No results for “{{x}}”. Try another term, or create it with \"+ Create food\".",
   "pt-BR": "Nenhum resultado para “{{x}}”. Tente outro termo ou crie com \"+ Criar alimento\".",
   "fr": "Aucun résultat pour « {{x}} ». Essayez un autre terme ou créez-le avec « + Créer un aliment »."
  },
  "Mis alimentos de Rutinal ({{n}})": {
   "en": "My Rutinal foods ({{n}})",
   "pt-BR": "Meus alimentos do Rutinal ({{n}})",
   "fr": "Mes aliments Rutinal ({{n}})"
  },
  "Alimento Rutinal: {{x}}": {
   "en": "Rutinal food: {{x}}",
   "pt-BR": "Alimento Rutinal: {{x}}",
   "fr": "Aliment Rutinal : {{x}}"
  },
  "kcal · P{{x}} C{{y}} G{{z}}": {
   "en": "kcal · P{{x}} C{{y}} F{{z}}",
   "pt-BR": "kcal · P{{x}} C{{y}} G{{z}}",
   "fr": "kcal · P{{x}} G{{y}} L{{z}}"
  },
  "{{x}}g · {{y}} kcal · P{{z}} C{{w}} G{{v}}": {
   "en": "{{x}}g · {{y}} kcal · P{{z}} C{{w}} F{{v}}",
   "pt-BR": "{{x}}g · {{y}} kcal · P{{z}} C{{w}} G{{v}}",
   "fr": "{{x}} g · {{y}} kcal · P{{z}} G{{w}} L{{v}}"
  },
  "{{x}} · P{{y}} C{{z}} G{{w}}": {
   "en": "{{x}} · P{{y}} C{{z}} F{{w}}",
   "pt-BR": "{{x}} · P{{y}} C{{z}} G{{w}}",
   "fr": "{{x}} · P{{y}} G{{z}} L{{w}}"
  },
  "{{n}} kcal · P{{n2}} C{{n3}} G{{n4}}": {
   "en": "{{n}} kcal · P{{n2}} C{{n3}} F{{n4}}",
   "pt-BR": "{{n}} kcal · P{{n2}} C{{n3}} G{{n4}}",
   "fr": "{{n}} kcal · P{{n2}} G{{n3}} L{{n4}}"
  },
  "{{n}} kcal · P{{n2}} C{{n3}} G{{n4}} · ✓": {
   "en": "{{n}} kcal · P{{n2}} C{{n3}} F{{n4}} · ✓",
   "pt-BR": "{{n}} kcal · P{{n2}} C{{n3}} G{{n4}} · ✓",
   "fr": "{{n}} kcal · P{{n2}} G{{n3}} L{{n4}} · ✓"
  },
  "Rutinal - Review de comidas - {{x}}": {
   "en": "Rutinal - Meal review - {{x}}",
   "pt-BR": "Rutinal - Revisão de refeições - {{x}}",
   "fr": "Rutinal - Bilan des repas - {{x}}"
  },
  "{{n}} ejercicios": {
   "en": "{{n}} exercises",
   "pt-BR": "{{n}} exercícios",
   "fr": "{{n}} exercices"
  },
  "{{x}} · {{n}} ejercicios": {
   "en": "{{x}} · {{n}} exercises",
   "pt-BR": "{{x}} · {{n}} exercícios",
   "fr": "{{x}} · {{n}} exercices"
  },
  "{{n}} ejercicios · {{x}}": {
   "en": "{{n}} exercises · {{x}}",
   "pt-BR": "{{n}} exercícios · {{x}}",
   "fr": "{{n}} exercices · {{x}}"
  },
  "{{x}} · {{n}} ejercicios · ✓": {
   "en": "{{x}} · {{n}} exercises · ✓",
   "pt-BR": "{{x}} · {{n}} exercícios · ✓",
   "fr": "{{x}} · {{n}} exercices · ✓"
  },
  "{{n}} ejercicios · ✓": {
   "en": "{{n}} exercises · ✓",
   "pt-BR": "{{n}} exercícios · ✓",
   "fr": "{{n}} exercices · ✓"
  },
  "{{n}} series": {
   "en": "{{n}} sets",
   "pt-BR": "{{n}} séries",
   "fr": "{{n}} séries"
  },
  "{{n}} series · {{x}} kg": {
   "en": "{{n}} sets · {{x}} kg",
   "pt-BR": "{{n}} séries · {{x}} kg",
   "fr": "{{n}} séries · {{x}} kg"
  },
  "{{x}}: ¿qué rutina toca?": {
   "en": "{{x}}: which routine?",
   "pt-BR": "{{x}}: qual rotina?",
   "fr": "{{x}} : quelle routine ?"
  },
  "({{x}}): {{y}}": {
   "en": "({{x}}): {{y}}",
   "pt-BR": "({{x}}): {{y}}",
   "fr": "({{x}}) : {{y}}"
  },
  "Día {{n}}": {
   "en": "Day {{n}}",
   "pt-BR": "Dia {{n}}",
   "fr": "Jour {{n}}"
  },
  "{{x}} (copia)": {
   "en": "{{x}} (copy)",
   "pt-BR": "{{x}} (cópia)",
   "fr": "{{x}} (copie)"
  },
  "· {{x}} · alternar ejercicios": {
   "en": "· {{x}} · alternate exercises",
   "pt-BR": "· {{x}} · alternar exercícios",
   "fr": "· {{x}} · alterner les exercices"
  },
  "Ejercicios ({{n}})": {
   "en": "Exercises ({{n}})",
   "pt-BR": "Exercícios ({{n}})",
   "fr": "Exercices ({{n}})"
  },
  "{{x}}, {{y}}": {
   "en": "{{x}}, {{y}}",
   "pt-BR": "{{x}}, {{y}}",
   "fr": "{{x}}, {{y}}"
  },
  "Hoy · {{x}}": {
   "en": "Today · {{x}}",
   "pt-BR": "Hoje · {{x}}",
   "fr": "Aujourd'hui · {{x}}"
  },
  "Hoy · {{x}} ·": {
   "en": "Today · {{x}} ·",
   "pt-BR": "Hoje · {{x}} ·",
   "fr": "Aujourd'hui · {{x}} ·"
  },
  "{{n}} / {{n2}} series": {
   "en": "{{n}} / {{n2}} sets",
   "pt-BR": "{{n}} / {{n2}} séries",
   "fr": "{{n}} / {{n2}} séries"
  }
 },
 "ctx": {
  "nav:Comida": {
   "en": "Meal",
   "pt-BR": "Refeição",
   "fr": "Repas"
  },
  "macro:P": {
   "en": "P",
   "pt-BR": "P",
   "fr": "P"
  },
  "macro:C": {
   "en": "C",
   "pt-BR": "C",
   "fr": "G"
  },
  "macro:G": {
   "en": "F",
   "pt-BR": "G",
   "fr": "L"
  },
  "set:Objetivo": {
   "en": "Target",
   "pt-BR": "Alvo",
   "fr": "Cible"
  }
 }
};
