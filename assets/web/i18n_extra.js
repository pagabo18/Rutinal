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
  "Pierna": {
   "en": "Legs",
   "pt-BR": "Perna",
   "fr": "Jambes"
  },
  "Espalda": {
   "en": "Back",
   "pt-BR": "Costas",
   "fr": "Dos"
  },
  "Hombro": {
   "en": "Shoulder",
   "pt-BR": "Ombro",
   "fr": "Épaule"
  },
  "Brazo": {
   "en": "Arms",
   "pt-BR": "Braço",
   "fr": "Bras"
  },
  "Core": {
   "en": "Core",
   "pt-BR": "Core",
   "fr": "Gainage"
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
  },
  "en lugar de": {
   "en": "instead of",
   "pt-BR": "no lugar de",
   "fr": "au lieu de"
  },
  "⇄ Reemplazar ejercicio": {
   "en": "⇄ Replace exercise",
   "pt-BR": "⇄ Substituir exercício",
   "fr": "⇄ Remplacer l'exercice"
  },
  "↺ Volver al original": {
   "en": "↺ Back to original",
   "pt-BR": "↺ Voltar ao original",
   "fr": "↺ Revenir à l'original"
  },
  "Reemplazar ejercicio": {
   "en": "Replace exercise",
   "pt-BR": "Substituir exercício",
   "fr": "Remplacer l'exercice"
  },
  "Solo hoy": {
   "en": "Today only",
   "pt-BR": "Só hoje",
   "fr": "Aujourd'hui seulement"
  },
  "Cambiar en la rutina": {
   "en": "Change in routine",
   "pt-BR": "Mudar na rotina",
   "fr": "Changer dans la routine"
  },
  "Sugerencias para los mismos músculos": {
   "en": "Suggestions for the same muscles",
   "pt-BR": "Sugestões para os mesmos músculos",
   "fr": "Suggestions pour les mêmes muscles"
  },
  "Reemplazar": {
   "en": "Replace",
   "pt-BR": "Substituir",
   "fr": "Remplacer"
  },
  "por:": {
   "en": "with:",
   "pt-BR": "por:",
   "fr": "par :"
  },
  "Primera vez": {
   "en": "First time",
   "pt-BR": "Primeira vez",
   "fr": "Première fois"
  },
  "Elige una carga con la que llegues al RIR indicado y regístrala.": {
   "en": "Pick a load that gets you to the target RIR and log it.",
   "pt-BR": "Escolha uma carga com a qual você chegue ao RIR indicado e registre.",
   "fr": "Choisissez une charge qui vous amène au RIR indiqué et enregistrez-la."
  },
  "Regresar": {
   "en": "Regress",
   "pt-BR": "Regredir",
   "fr": "Régresser"
  },
  "Progresar": {
   "en": "Progress",
   "pt-BR": "Progredir",
   "fr": "Progresser"
  },
  "Mantén la carga.": {
   "en": "Keep the load.",
   "pt-BR": "Mantenha a carga.",
   "fr": "Gardez la charge."
  },
  "Dolor (NPRS)": {
   "en": "Pain (NPRS)",
   "pt-BR": "Dor (NPRS)",
   "fr": "Douleur (NPRS)"
  },
  "Esfuerzo (RPE)": {
   "en": "Effort (RPE)",
   "pt-BR": "Esforço (RPE)",
   "fr": "Effort (RPE)"
  },
  "Sin dolor": {
   "en": "No pain",
   "pt-BR": "Sem dor",
   "fr": "Pas de douleur"
  },
  "Leve": {
   "en": "Mild",
   "pt-BR": "Leve",
   "fr": "Légère"
  },
  "Severo": {
   "en": "Severe",
   "pt-BR": "Grave",
   "fr": "Sévère"
  },
  "Muy mal": {
   "en": "Very bad",
   "pt-BR": "Muito mal",
   "fr": "Très mal"
  },
  "Mal": {
   "en": "Bad",
   "pt-BR": "Mal",
   "fr": "Mal"
  },
  "Normal": {
   "en": "Okay",
   "pt-BR": "Normal",
   "fr": "Normal"
  },
  "Bien": {
   "en": "Good",
   "pt-BR": "Bem",
   "fr": "Bien"
  },
  "Excelente": {
   "en": "Great",
   "pt-BR": "Excelente",
   "fr": "Excellent"
  },
  "¿Cómo te sentiste?": {
   "en": "How did you feel?",
   "pt-BR": "Como você se sentiu?",
   "fr": "Comment vous êtes-vous senti ?"
  },
  "kg de volumen": {
   "en": "kg of volume",
   "pt-BR": "kg de volume",
   "fr": "kg de volume"
  },
  "kg/min (densidad)": {
   "en": "kg/min (density)",
   "pt-BR": "kg/min (densidade)",
   "fr": "kg/min (densité)"
  },
  "Al terminar, ¿cómo te sentiste?": {
   "en": "When you finished, how did you feel?",
   "pt-BR": "Ao terminar, como você se sentiu?",
   "fr": "À la fin, comment vous êtes-vous senti ?"
  },
  "0 sin dolor · 1–3 leve · 4–6 moderado · 7–10 severo": {
   "en": "0 no pain · 1–3 mild · 4–6 moderate · 7–10 severe",
   "pt-BR": "0 sem dor · 1–3 leve · 4–6 moderada · 7–10 grave",
   "fr": "0 pas de douleur · 1–3 légère · 4–6 modérée · 7–10 sévère"
  },
  "Fatiga de la sesión: 10 = esfuerzo máximo": {
   "en": "Session fatigue: 10 = maximum effort",
   "pt-BR": "Fadiga da sessão: 10 = esforço máximo",
   "fr": "Fatigue de la séance : 10 = effort maximal"
  },
  "Notas (opcional)": {
   "en": "Notes (optional)",
   "pt-BR": "Notas (opcional)",
   "fr": "Notes (facultatif)"
  },
  "Ej. molestia en hombro derecho en el press": {
   "en": "e.g. right shoulder discomfort on the press",
   "pt-BR": "Ex. incômodo no ombro direito no supino",
   "fr": "Ex. gêne à l'épaule droite au développé"
  },
  "Guardar y terminar": {
   "en": "Save and finish",
   "pt-BR": "Salvar e terminar",
   "fr": "Enregistrer et terminer"
  },
  "Progreso": {
   "en": "Progress",
   "pt-BR": "Progresso",
   "fr": "Progrès"
  },
  "Esta semana": {
   "en": "This week",
   "pt-BR": "Esta semana",
   "fr": "Cette semaine"
  },
  "Frecuencia (sesiones)": {
   "en": "Frequency (sessions)",
   "pt-BR": "Frequência (sessões)",
   "fr": "Fréquence (séances)"
  },
  "Series (volumen)": {
   "en": "Sets (volume)",
   "pt-BR": "Séries (volume)",
   "fr": "Séries (volume)"
  },
  "RPE promedio (intensidad)": {
   "en": "Avg RPE (intensity)",
   "pt-BR": "RPE médio (intensidade)",
   "fr": "RPE moyen (intensité)"
  },
  "Dolor NPRS promedio": {
   "en": "Avg NPRS pain",
   "pt-BR": "Dor NPRS média",
   "fr": "Douleur NPRS moyenne"
  },
  "Dolor, fatiga y cómo te sentiste": {
   "en": "Pain, fatigue and how you felt",
   "pt-BR": "Dor, fadiga e como você se sentiu",
   "fr": "Douleur, fatigue et ressenti"
  },
  "RPE sesión": {
   "en": "Session RPE",
   "pt-BR": "RPE da sessão",
   "fr": "RPE de la séance"
  },
  "Cómo te sentiste": {
   "en": "How you felt",
   "pt-BR": "Como você se sentiu",
   "fr": "Ressenti"
  },
  "Al terminar cada entrenamiento registra cómo te sentiste para ver la gráfica.": {
   "en": "Log how you felt after each workout to see the chart.",
   "pt-BR": "Registre como você se sentiu ao terminar cada treino para ver o gráfico.",
   "fr": "Notez votre ressenti après chaque séance pour voir le graphique."
  },
  "Volumen por semana (kg)": {
   "en": "Volume per week (kg)",
   "pt-BR": "Volume por semana (kg)",
   "fr": "Volume par semaine (kg)"
  },
  "Series por músculo esta semana": {
   "en": "Sets per muscle this week",
   "pt-BR": "Séries por músculo nesta semana",
   "fr": "Séries par muscle cette semaine"
  },
  "Sin series esta semana.": {
   "en": "No sets this week.",
   "pt-BR": "Nenhuma série nesta semana.",
   "fr": "Aucune série cette semaine."
  },
  "1RM estimado": {
   "en": "Estimated 1RM",
   "pt-BR": "1RM estimado",
   "fr": "1RM estimé"
  },
  "Registra cargas para ver tu 1RM estimado.": {
   "en": "Log loads to see your estimated 1RM.",
   "pt-BR": "Registre cargas para ver seu 1RM estimado.",
   "fr": "Enregistrez des charges pour voir votre 1RM estimé."
  },
  "Criterios": {
   "en": "Criteria",
   "pt-BR": "Critérios",
   "fr": "Critères"
  },
  "Progresión": {
   "en": "Progression",
   "pt-BR": "Progressão",
   "fr": "Progression"
  },
  "Cada 2–3 semanas, modificando solo 1 variable (carga, reps, series o tempo) para no aumentar el riesgo de lesión.": {
   "en": "Every 2–3 weeks, changing only 1 variable (load, reps, sets or tempo) so you don't raise the risk of injury.",
   "pt-BR": "A cada 2–3 semanas, mudando só 1 variável (carga, reps, séries ou cadência) para não aumentar o risco de lesão.",
   "fr": "Toutes les 2–3 semaines, en ne modifiant qu'une variable (charge, rép., séries ou tempo) pour ne pas augmenter le risque de blessure."
  },
  "Regresión": {
   "en": "Regression",
   "pt-BR": "Regressão",
   "fr": "Régression"
  },
  "Si el dolor (NPRS) llega a 4/10 o sube 2 puntos, baja ~10% la carga o 1 serie.": {
   "en": "If pain (NPRS) reaches 4/10 or rises 2 points, lower the load ~10% or drop 1 set.",
   "pt-BR": "Se a dor (NPRS) chegar a 4/10 ou subir 2 pontos, reduza ~10% a carga ou 1 série.",
   "fr": "Si la douleur (NPRS) atteint 4/10 ou augmente de 2 points, baissez la charge d'~10 % ou retirez 1 série."
  },
  "2–3 min entre series.": {
   "en": "2–3 min between sets.",
   "pt-BR": "2–3 min entre séries.",
   "fr": "2–3 min entre les séries."
  },
  "Intensidad": {
   "en": "Intensity",
   "pt-BR": "Intensidade",
   "fr": "Intensité"
  },
  "%1RM, RIR y RPE. El 1RM se estima con tus series (fórmula de Epley).": {
   "en": "%1RM, RIR and RPE. Your 1RM is estimated from your sets (Epley formula).",
   "pt-BR": "%1RM, RIR e RPE. O 1RM é estimado com suas séries (fórmula de Epley).",
   "fr": "%1RM, RIR et RPE. Le 1RM est estimé à partir de vos séries (formule d'Epley)."
  },
  "Frecuencia": {
   "en": "Frequency",
   "pt-BR": "Frequência",
   "fr": "Fréquence"
  },
  "1RM est.": {
   "en": "Est. 1RM",
   "pt-BR": "1RM est.",
   "fr": "1RM est."
  },
  "✓ Entrenamiento terminado · editar cómo me sentí": {
   "en": "✓ Workout finished · edit how I felt",
   "pt-BR": "✓ Treino concluído · editar como me senti",
   "fr": "✓ Séance terminée · modifier mon ressenti"
  },
  "Para reducir el riesgo de lesión, progresa cada 2–3 semanas y cambia solo 1 variable a la vez.": {
   "en": "To reduce injury risk, progress every 2–3 weeks and change only 1 variable at a time.",
   "pt-BR": "Para reduzir o risco de lesão, progrida a cada 2–3 semanas e mude só 1 variável por vez.",
   "fr": "Pour réduire le risque de blessure, progressez toutes les 2–3 semaines et ne changez qu'une variable à la fois."
  },
  "¿Guardar de todos modos?": {
   "en": "Save anyway?",
   "pt-BR": "Salvar mesmo assim?",
   "fr": "Enregistrer quand même ?"
  },
  "cambio hace": {
   "en": "changed",
   "pt-BR": "mudança há",
   "fr": "modifié il y a"
  },
  "días": {
   "en": "days ago",
   "pt-BR": "dias",
   "fr": "jours"
  },
  "Dolor": {
   "en": "Pain",
   "pt-BR": "Dor",
   "fr": "Douleur"
  },
  "Al terminar": {
   "en": "Afterwards",
   "pt-BR": "Ao terminar",
   "fr": "À la fin"
  },
  "kg totales": {
   "en": "total kg",
   "pt-BR": "kg totais",
   "fr": "kg au total"
  },
  "Alta en proteína": {
   "en": "High in protein",
   "pt-BR": "Rica em proteína",
   "fr": "Riche en protéines"
  },
  "Buena proteína": {
   "en": "Good protein",
   "pt-BR": "Boa proteína",
   "fr": "Bon apport en protéines"
  },
  "Buena fibra": {
   "en": "Good fiber",
   "pt-BR": "Boa fibra",
   "fr": "Bon apport en fibres"
  },
  "Mucha azúcar": {
   "en": "High in sugar",
   "pt-BR": "Muito açúcar",
   "fr": "Beaucoup de sucre"
  },
  "Grasa saturada alta": {
   "en": "High saturated fat",
   "pt-BR": "Gordura saturada alta",
   "fr": "Graisses saturées élevées"
  },
  "Mucho sodio": {
   "en": "High in sodium",
   "pt-BR": "Muito sódio",
   "fr": "Beaucoup de sodium"
  },
  "Densa en calorías": {
   "en": "Calorie-dense",
   "pt-BR": "Densa em calorias",
   "fr": "Dense en calories"
  },
  "Ligera": {
   "en": "Light",
   "pt-BR": "Leve",
   "fr": "Léger"
  },
  "Ultraprocesado (NOVA 4)": {
   "en": "Ultra-processed (NOVA 4)",
   "pt-BR": "Ultraprocessado (NOVA 4)",
   "fr": "Ultra-transformé (NOVA 4)"
  },
  "Buena": {
   "en": "Good",
   "pt-BR": "Boa",
   "fr": "Bon"
  },
  "Con moderación": {
   "en": "In moderation",
   "pt-BR": "Com moderação",
   "fr": "Avec modération"
  },
  "Gusto ocasional": {
   "en": "Occasional treat",
   "pt-BR": "Só de vez em quando",
   "fr": "Plaisir occasionnel"
  },
  "para": {
   "en": "for",
   "pt-BR": "para",
   "fr": "pour"
  },
  "Te quedan": {
   "en": "You have",
   "pt-BR": "Restam",
   "fr": "Il vous reste"
  },
  "kcal hoy": {
   "en": "kcal left today",
   "pt-BR": "kcal hoje",
   "fr": "kcal aujourd'hui"
  },
  "Ya te pasaste": {
   "en": "You're over by",
   "pt-BR": "Você já passou",
   "fr": "Vous avez dépassé de"
  },
  "Hoy te caben hasta": {
   "en": "Today you can have up to",
   "pt-BR": "Hoje cabem até",
   "fr": "Aujourd'hui, jusqu'à"
  },
  "Lo que te limita:": {
   "en": "What limits you:",
   "pt-BR": "O que limita:",
   "fr": "Ce qui vous limite :"
  },
  "las calorías que te quedan": {
   "en": "the calories you have left",
   "pt-BR": "as calorias que restam",
   "fr": "les calories qu'il vous reste"
  },
  "la grasa que te queda": {
   "en": "the fat you have left",
   "pt-BR": "a gordura que resta",
   "fr": "les lipides qu'il vous reste"
  },
  "los carbohidratos que te quedan": {
   "en": "the carbs you have left",
   "pt-BR": "os carboidratos que restam",
   "fr": "les glucides qu'il vous reste"
  },
  "el azúcar recomendado del día": {
   "en": "the recommended daily sugar",
   "pt-BR": "o açúcar recomendado do dia",
   "fr": "le sucre recommandé par jour"
  },
  "el sodio recomendado del día": {
   "en": "the recommended daily sodium",
   "pt-BR": "o sódio recomendado do dia",
   "fr": "le sodium recommandé par jour"
  },
  "que es un gusto ocasional (~10% de tus kcal)": {
   "en": "it's an occasional treat (~10% of your kcal)",
   "pt-BR": "é só de vez em quando (~10% das suas kcal)",
   "fr": "c'est un plaisir occasionnel (~10 % de vos kcal)"
  },
  "Hoy ya no te cabe": {
   "en": "No room for it today",
   "pt-BR": "Hoje já não cabe",
   "fr": "Plus de place aujourd'hui"
  },
  "te quedarían": {
   "en": "you'd have left",
   "pt-BR": "restariam",
   "fr": "il vous resterait"
  },
  "Te pasas de lo recomendado por": {
   "en": "Over the recommended amount by",
   "pt-BR": "Você passa do recomendado em",
   "fr": "Vous dépassez la quantité conseillée de"
  },
  "Dentro de tu meta": {
   "en": "Within your goal",
   "pt-BR": "Dentro da sua meta",
   "fr": "Dans votre objectif"
  },
  "Te cabe sin problema": {
   "en": "Fits your day easily",
   "pt-BR": "Cabe sem problema",
   "fr": "Ça rentre sans problème"
  },
  "Una porción de": {
   "en": "A serving of",
   "pt-BR": "Uma porção de",
   "fr": "Une portion de"
  },
  "son": {
   "en": "is",
   "pt-BR": "são",
   "fr": "fait"
  },
  "Calorías": {
   "en": "Calories",
   "pt-BR": "Calorias",
   "fr": "Calories"
  },
  "Proteína": {
   "en": "Protein",
   "pt-BR": "Proteína",
   "fr": "Protéines"
  },
  "Azúcares": {
   "en": "Sugars",
   "pt-BR": "Açúcares",
   "fr": "Sucres"
  },
  "Grasa saturada": {
   "en": "Saturated fat",
   "pt-BR": "Gordura saturada",
   "fr": "Graisses saturées"
  },
  "Fibra": {
   "en": "Fiber",
   "pt-BR": "Fibra",
   "fr": "Fibres"
  },
  "Sodio": {
   "en": "Sodium",
   "pt-BR": "Sódio",
   "fr": "Sodium"
  },
  "Bajo": {
   "en": "Low",
   "pt-BR": "Baixo",
   "fr": "Faible"
  },
  "Medio": {
   "en": "Medium",
   "pt-BR": "Médio",
   "fr": "Moyen"
  },
  "Sobresale": {
   "en": "Stands out",
   "pt-BR": "Destaque",
   "fr": "Excellent"
  },
  "Suficiente": {
   "en": "Enough",
   "pt-BR": "Suficiente",
   "fr": "Suffisant"
  },
  "Poca": {
   "en": "Low",
   "pt-BR": "Pouca",
   "fr": "Peu"
  },
  "Se pasa": {
   "en": "Over",
   "pt-BR": "Passa",
   "fr": "Dépasse"
  },
  "Denso": {
   "en": "Dense",
   "pt-BR": "Denso",
   "fr": "Dense"
  },
  "Tabla nutricional": {
   "en": "Nutrition facts",
   "pt-BR": "Tabela nutricional",
   "fr": "Valeurs nutritionnelles"
  },
  "Tu porción": {
   "en": "Your serving",
   "pt-BR": "Sua porção",
   "fr": "Votre portion"
  },
  "Sobresale / bien": {
   "en": "Stands out / good",
   "pt-BR": "Destaque / bom",
   "fr": "Excellent / bien"
  },
  "Alto o se pasa": {
   "en": "High or over",
   "pt-BR": "Alto ou passa",
   "fr": "Élevé ou dépasse"
  },
  "% = parte de tu meta del día que cubre tu porción": {
   "en": "% = share of your daily goal covered by your serving",
   "pt-BR": "% = parte da sua meta do dia que sua porção cobre",
   "fr": "% = part de votre objectif du jour couverte par votre portion"
  },
  "Sobresale en": {
   "en": "Stands out for",
   "pt-BR": "Destaca-se em",
   "fr": "Points forts"
  },
  "Cuidado con": {
   "en": "Watch out for",
   "pt-BR": "Cuidado com",
   "fr": "Attention à"
  },
  "Cantidad recomendada": {
   "en": "Recommended amount",
   "pt-BR": "Quantidade recomendada",
   "fr": "Quantité recommandée"
  },
  "Puedes comer hasta": {
   "en": "You can eat up to",
   "pt-BR": "Você pode comer até",
   "fr": "Vous pouvez manger jusqu'à"
  },
  "Puedes comerlo sin problema": {
   "en": "You can eat it freely",
   "pt-BR": "Pode comer sem problema",
   "fr": "Vous pouvez en manger sans souci"
  },
  "Mejor déjalo para otro día": {
   "en": "Better leave it for another day",
   "pt-BR": "Melhor deixar para outro dia",
   "fr": "Mieux vaut le garder pour un autre jour"
  },
  "Según las calorías que te quedan hoy.": {
   "en": "Based on the calories you have left today.",
   "pt-BR": "Conforme as calorias que restam hoje.",
   "fr": "Selon les calories qu'il vous reste aujourd'hui."
  },
  "Según la grasa que te queda hoy.": {
   "en": "Based on the fat you have left today.",
   "pt-BR": "Conforme a gordura que resta hoje.",
   "fr": "Selon les lipides qu'il vous reste aujourd'hui."
  },
  "Según los carbohidratos que te quedan hoy.": {
   "en": "Based on the carbs you have left today.",
   "pt-BR": "Conforme os carboidratos que restam hoje.",
   "fr": "Selon les glucides qu'il vous reste aujourd'hui."
  },
  "Para no pasarte del azúcar recomendado al día.": {
   "en": "So you stay within the recommended daily sugar.",
   "pt-BR": "Para não passar do açúcar recomendado por dia.",
   "fr": "Pour ne pas dépasser le sucre recommandé par jour."
  },
  "Para no pasarte del sodio recomendado al día.": {
   "en": "So you stay within the recommended daily sodium.",
   "pt-BR": "Para não passar do sódio recomendado por dia.",
   "fr": "Pour ne pas dépasser le sodium recommandé par jour."
  },
  "Es un gusto ocasional: lo ideal es que no pase de ~10% de tus calorías del día.": {
   "en": "It's an occasional treat: ideally no more than ~10% of your daily calories.",
   "pt-BR": "É para de vez em quando: o ideal é não passar de ~10% das suas calorias do dia.",
   "fr": "C'est un plaisir occasionnel : idéalement pas plus de ~10 % de vos calories du jour."
  },
  "Ya alcanzaste tus calorías de hoy.": {
   "en": "You've already reached today's calories.",
   "pt-BR": "Você já atingiu suas calorias de hoje.",
   "fr": "Vous avez déjà atteint vos calories du jour."
  },
  "Ya alcanzaste tu grasa de hoy.": {
   "en": "You've already reached today's fat.",
   "pt-BR": "Você já atingiu sua gordura de hoje.",
   "fr": "Vous avez déjà atteint vos lipides du jour."
  },
  "Ya alcanzaste tus carbohidratos de hoy.": {
   "en": "You've already reached today's carbs.",
   "pt-BR": "Você já atingiu seus carboidratos de hoje.",
   "fr": "Vous avez déjà atteint vos glucides du jour."
  },
  "Ya alcanzaste el azúcar recomendado de hoy.": {
   "en": "You've already reached today's recommended sugar.",
   "pt-BR": "Você já atingiu o açúcar recomendado de hoje.",
   "fr": "Vous avez déjà atteint le sucre recommandé du jour."
  },
  "Ya alcanzaste el sodio recomendado de hoy.": {
   "en": "You've already reached today's recommended sodium.",
   "pt-BR": "Você já atingiu o sódio recomendado de hoje.",
   "fr": "Vous avez déjà atteint le sodium recommandé du jour."
  },
  "Es más de lo recomendado por": {
   "en": "Over the recommended amount by",
   "pt-BR": "Passa do recomendado em",
   "fr": "Dépasse la quantité recommandée de"
  },
  "Alta en fibra": {
   "en": "High in fiber",
   "pt-BR": "Rica em fibra",
   "fr": "Riche en fibres"
  },
  "Fuente de fibra": {
   "en": "Source of fiber",
   "pt-BR": "Fonte de fibra",
   "fr": "Source de fibres"
  },
  "Baja en azúcar": {
   "en": "Low in sugar",
   "pt-BR": "Pouco açúcar",
   "fr": "Peu de sucre"
  },
  "Baja en grasa saturada": {
   "en": "Low in saturated fat",
   "pt-BR": "Pouca gordura saturada",
   "fr": "Peu de graisses saturées"
  },
  "Baja en sodio": {
   "en": "Low in sodium",
   "pt-BR": "Pouco sódio",
   "fr": "Peu de sodium"
  },
  "Ligera en calorías": {
   "en": "Light in calories",
   "pt-BR": "Leve em calorias",
   "fr": "Léger en calories"
  },
  "Densa en calorías (útil para subir)": {
   "en": "Calorie-dense (useful for gaining)",
   "pt-BR": "Densa em calorias (útil para ganhar)",
   "fr": "Dense en calories (utile pour prendre)"
  },
  "Poco procesado": {
   "en": "Minimally processed",
   "pt-BR": "Pouco processado",
   "fr": "Peu transformé"
  },
  "Mejores opciones del mismo tipo": {
   "en": "Better options of the same kind",
   "pt-BR": "Opções melhores do mesmo tipo",
   "fr": "Meilleures options du même type"
  },
  "Sellos estimados (NOM-051)": {
   "en": "Estimated warning labels (NOM-051)",
   "pt-BR": "Selos estimados (NOM-051)",
   "fr": "Sceaux estimés (NOM-051)"
  },
  "Sin sellos": {
   "en": "No warning labels",
   "pt-BR": "Sem selos",
   "fr": "Aucun sceau"
  },
  "Calculados con la tabla nutricional; pueden diferir del empaque.": {
   "en": "Calculated from the nutrition table; they may differ from the package.",
   "pt-BR": "Calculados com a tabela nutricional; podem diferir da embalagem.",
   "fr": "Calculés à partir du tableau nutritionnel ; ils peuvent différer de l'emballage."
  },
  "Ya cubriste tu proteína de hoy": {
   "en": "You've already covered today's protein",
   "pt-BR": "Você já cobriu sua proteína de hoje",
   "fr": "Vous avez déjà couvert vos protéines du jour"
  },
  "Objetivos y logros": {
   "en": "Goals and achievements",
   "pt-BR": "Objetivos e conquistas",
   "fr": "Objectifs et réussites"
  },
  "Peso, récords, kilómetros y más": {
   "en": "Weight, records, kilometers and more",
   "pt-BR": "Peso, recordes, quilômetros e mais",
   "fr": "Poids, records, kilomètres et plus"
  },
  "Objetivos": {
   "en": "Goals",
   "pt-BR": "Objetivos",
   "fr": "Objectifs"
  },
  "Nuevo objetivo": {
   "en": "New goal",
   "pt-BR": "Novo objetivo",
   "fr": "Nouvel objectif"
  },
  "Editar objetivo": {
   "en": "Edit goal",
   "pt-BR": "Editar objetivo",
   "fr": "Modifier l'objectif"
  },
  "Eliminar objetivo": {
   "en": "Delete goal",
   "pt-BR": "Excluir objetivo",
   "fr": "Supprimer l'objectif"
  },
  "¿Eliminar este objetivo?": {
   "en": "Delete this goal?",
   "pt-BR": "Excluir este objetivo?",
   "fr": "Supprimer cet objectif ?"
  },
  "Logros": {
   "en": "Achievements",
   "pt-BR": "Conquistas",
   "fr": "Réussites"
  },
  "Logrado": {
   "en": "Achieved",
   "pt-BR": "Conquistado",
   "fr": "Atteint"
  },
  "Semana cumplida": {
   "en": "Week completed",
   "pt-BR": "Semana cumprida",
   "fr": "Semaine réussie"
  },
  "Logrado el": {
   "en": "Achieved on",
   "pt-BR": "Conquistado em",
   "fr": "Atteint le"
  },
  "logrado": {
   "en": "achieved",
   "pt-BR": "conquistado",
   "fr": "atteint"
  },
  "logrados": {
   "en": "achieved",
   "pt-BR": "conquistados",
   "fr": "atteints"
  },
  "semana cumplida": {
   "en": "week completed",
   "pt-BR": "semana cumprida",
   "fr": "semaine réussie"
  },
  "semanas cumplidas": {
   "en": "weeks completed",
   "pt-BR": "semanas cumpridas",
   "fr": "semaines réussies"
  },
  "Ahora": {
   "en": "Now",
   "pt-BR": "Agora",
   "fr": "Actuel"
  },
  "Avance": {
   "en": "Progress",
   "pt-BR": "Progresso",
   "fr": "Progression"
  },
  "Faltan": {
   "en": "To go",
   "pt-BR": "Faltam",
   "fr": "Reste"
  },
  "Fecha límite": {
   "en": "Deadline",
   "pt-BR": "Prazo",
   "fr": "Échéance"
  },
  "Fecha límite (opcional)": {
   "en": "Deadline (optional)",
   "pt-BR": "Prazo (opcional)",
   "fr": "Échéance (facultatif)"
  },
  "Pon un objetivo y la app mide sola tu avance con lo que registras: peso, levantamientos, kilómetros o sesiones.": {
   "en": "Set a goal and the app tracks your progress on its own from what you log: weight, lifts, kilometers or sessions.",
   "pt-BR": "Defina um objetivo e o app mede sozinho seu progresso com o que você registra: peso, levantamentos, quilômetros ou sessões.",
   "fr": "Fixez un objectif et l'app mesure seule votre progression avec ce que vous enregistrez : poids, charges, kilomètres ou séances."
  },
  "Llegar a un peso; avanza con tu promedio de 7 días": {
   "en": "Reach a weight; moves with your 7-day average",
   "pt-BR": "Chegar a um peso; avança com sua média de 7 dias",
   "fr": "Atteindre un poids ; suit votre moyenne sur 7 jours"
  },
  "Avanza con cada evaluación de composición corporal": {
   "en": "Moves with each body composition assessment",
   "pt-BR": "Avança a cada avaliação de composição corporal",
   "fr": "Évolue à chaque évaluation de composition corporelle"
  },
  "Récord en un ejercicio": {
   "en": "Record on an exercise",
   "pt-BR": "Recorde em um exercício",
   "fr": "Record sur un exercice"
  },
  "Levantar cierto peso en un ejercicio de tus rutinas": {
   "en": "Lift a given weight on an exercise from your routines",
   "pt-BR": "Levantar certo peso em um exercício das suas rotinas",
   "fr": "Soulever une charge donnée sur un exercice de vos routines"
  },
  "Kilómetros acumulados": {
   "en": "Accumulated kilometers",
   "pt-BR": "Quilômetros acumulados",
   "fr": "Kilomètres cumulés"
  },
  "Sumar distancia en un deporte durante un periodo": {
   "en": "Add up distance in a sport over a period",
   "pt-BR": "Somar distância em um esporte durante um período",
   "fr": "Cumuler de la distance dans un sport sur une période"
  },
  "Marca de tiempo": {
   "en": "Time mark",
   "pt-BR": "Marca de tempo",
   "fr": "Chrono cible"
  },
  "Hacer una distancia en cierto tiempo": {
   "en": "Cover a distance in a given time",
   "pt-BR": "Fazer uma distância em certo tempo",
   "fr": "Parcourir une distance en un temps donné"
  },
  "Sesiones por semana": {
   "en": "Sessions per week",
   "pt-BR": "Sessões por semana",
   "fr": "Séances par semaine"
  },
  "Entrenamientos y actividades cada semana": {
   "en": "Workouts and activities each week",
   "pt-BR": "Treinos e atividades a cada semana",
   "fr": "Entraînements et activités chaque semaine"
  },
  "Objetivo libre": {
   "en": "Custom goal",
   "pt-BR": "Objetivo livre",
   "fr": "Objectif libre"
  },
  "Cualquier número que tú actualizas": {
   "en": "Any number you update yourself",
   "pt-BR": "Qualquer número que você atualiza",
   "fr": "Tout chiffre que vous mettez à jour"
  },
  "Este mes": {
   "en": "This month",
   "pt-BR": "Este mês",
   "fr": "Ce mois-ci"
  },
  "Este año": {
   "en": "This year",
   "pt-BR": "Este ano",
   "fr": "Cette année"
  },
  "Desde que lo creé": {
   "en": "Since I created it",
   "pt-BR": "Desde que criei",
   "fr": "Depuis sa création"
  },
  "Todos los deportes": {
   "en": "All sports",
   "pt-BR": "Todos os esportes",
   "fr": "Tous les sports"
  },
  "Peso al que quieres llegar": {
   "en": "Weight you want to reach",
   "pt-BR": "Peso que você quer atingir",
   "fr": "Poids que vous voulez atteindre"
  },
  "% de grasa al que quieres llegar": {
   "en": "Body fat % you want to reach",
   "pt-BR": "% de gordura que você quer atingir",
   "fr": "% de graisse que vous voulez atteindre"
  },
  "Ejercicio": {
   "en": "Exercise",
   "pt-BR": "Exercício",
   "fr": "Exercice"
  },
  "Peso que quieres levantar": {
   "en": "Weight you want to lift",
   "pt-BR": "Peso que você quer levantar",
   "fr": "Charge que vous voulez soulever"
  },
  "Kilómetros": {
   "en": "Kilometers",
   "pt-BR": "Quilômetros",
   "fr": "Kilomètres"
  },
  "Tiempo objetivo": {
   "en": "Target time",
   "pt-BR": "Tempo alvo",
   "fr": "Temps cible"
  },
  "Nombre del objetivo": {
   "en": "Goal name",
   "pt-BR": "Nome do objetivo",
   "fr": "Nom de l'objectif"
  },
  "Valor inicial": {
   "en": "Starting value",
   "pt-BR": "Valor inicial",
   "fr": "Valeur de départ"
  },
  "Valor actual": {
   "en": "Current value",
   "pt-BR": "Valor atual",
   "fr": "Valeur actuelle"
  },
  "Unidad": {
   "en": "Unit",
   "pt-BR": "Unidade",
   "fr": "Unité"
  },
  "Ej. Dominadas seguidas": {
   "en": "E.g. Pull-ups in a row",
   "pt-BR": "Ex.: Barras seguidas",
   "fr": "Ex. Tractions d'affilée"
  },
  "reps, min, cm…": {
   "en": "reps, min, cm…",
   "pt-BR": "reps, min, cm…",
   "fr": "reps, min, cm…"
  },
  "Escribe la meta.": {
   "en": "Enter the target.",
   "pt-BR": "Escreva a meta.",
   "fr": "Saisissez la cible."
  },
  "Elige el ejercicio.": {
   "en": "Choose the exercise.",
   "pt-BR": "Escolha o exercício.",
   "fr": "Choisissez l'exercice."
  },
  "Escribe la distancia.": {
   "en": "Enter the distance.",
   "pt-BR": "Escreva a distância.",
   "fr": "Saisissez la distance."
  },
  "Ponle nombre al objetivo.": {
   "en": "Name the goal.",
   "pt-BR": "Dê um nome ao objetivo.",
   "fr": "Nommez l'objectif."
  },
  "Se reinicia cada lunes": {
   "en": "Resets every Monday",
   "pt-BR": "Reinicia toda segunda",
   "fr": "Repart chaque lundi"
  },
  "Falta una evaluación de composición corporal": {
   "en": "A body composition assessment is needed",
   "pt-BR": "Falta uma avaliação de composição corporal",
   "fr": "Il manque une évaluation de composition corporelle"
  },
  "Registra una sesión de esa distancia para medir el avance": {
   "en": "Log a session of that distance to measure progress",
   "pt-BR": "Registre uma sessão dessa distância para medir o progresso",
   "fr": "Enregistrez une séance de cette distance pour mesurer la progression"
  },
  "Fases del plan": {
   "en": "Plan phases",
   "pt-BR": "Fases do plano",
   "fr": "Phases du plan"
  },
  "Fase del plan": {
   "en": "Plan phase",
   "pt-BR": "Fase do plano",
   "fr": "Phase du plan"
  },
  "Volumen, definición, semana pico…": {
   "en": "Bulk, cut, peak week…",
   "pt-BR": "Volume, definição, semana de pico…",
   "fr": "Prise de masse, sèche, semaine de pic…"
  },
  "Definición": {
   "en": "Cut",
   "pt-BR": "Definição",
   "fr": "Sèche"
  },
  "Mantenimiento": {
   "en": "Maintenance",
   "pt-BR": "Manutenção",
   "fr": "Maintien"
  },
  "Recomposición": {
   "en": "Recomposition",
   "pt-BR": "Recomposição",
   "fr": "Recomposition"
  },
  "Dieta inversa": {
   "en": "Reverse diet",
   "pt-BR": "Dieta reversa",
   "fr": "Diète inversée"
  },
  "Semana pico": {
   "en": "Peak week",
   "pt-BR": "Semana de pico",
   "fr": "Semaine de pic"
  },
  "Descarga": {
   "en": "Deload",
   "pt-BR": "Deload",
   "fr": "Décharge"
  },
  "Transición": {
   "en": "Transition",
   "pt-BR": "Transição",
   "fr": "Transition"
  },
  "Nueva fase": {
   "en": "New phase",
   "pt-BR": "Nova fase",
   "fr": "Nouvelle phase"
  },
  "Editar fase": {
   "en": "Edit phase",
   "pt-BR": "Editar fase",
   "fr": "Modifier la phase"
  },
  "Eliminar fase": {
   "en": "Delete phase",
   "pt-BR": "Excluir fase",
   "fr": "Supprimer la phase"
  },
  "¿Eliminar esta fase?": {
   "en": "Delete this phase?",
   "pt-BR": "Excluir esta fase?",
   "fr": "Supprimer cette phase ?"
  },
  "Próxima": {
   "en": "Next",
   "pt-BR": "Próxima",
   "fr": "À venir"
  },
  "Terminada": {
   "en": "Finished",
   "pt-BR": "Concluída",
   "fr": "Terminée"
  },
  "de": {
   "en": "of",
   "pt-BR": "de",
   "fr": "sur"
  },
  "semana": {
   "en": "week",
   "pt-BR": "semana",
   "fr": "semaine"
  },
  "semanas": {
   "en": "weeks",
   "pt-BR": "semanas",
   "fr": "semaines"
  },
  "día": {
   "en": "day",
   "pt-BR": "dia",
   "fr": "jour"
  },
  "Empieza el": {
   "en": "Starts on",
   "pt-BR": "Começa em",
   "fr": "Commence le"
  },
  "Sigue": {
   "en": "Next up",
   "pt-BR": "Em seguida",
   "fr": "Ensuite"
  },
  "Empieza": {
   "en": "Starts",
   "pt-BR": "Começa",
   "fr": "Début"
  },
  "Termina": {
   "en": "Ends",
   "pt-BR": "Termina",
   "fr": "Fin"
  },
  "Ej. Definición rumbo a la competencia": {
   "en": "E.g. Cut towards the competition",
   "pt-BR": "Ex.: Definição rumo à competição",
   "fr": "Ex. Sèche avant la compétition"
  },
  "Nutrición de la fase (opcional)": {
   "en": "Phase nutrition (optional)",
   "pt-BR": "Nutrição da fase (opcional)",
   "fr": "Nutrition de la phase (facultatif)"
  },
  "Si pones calorías, mientras dure la fase reemplazan la meta diaria de la pestaña Comida.": {
   "en": "If you set calories, they replace the daily target in the Food tab while the phase lasts.",
   "pt-BR": "Se você definir calorias, elas substituem a meta diária da aba Comida enquanto a fase durar.",
   "fr": "Si vous indiquez des calories, elles remplacent l'objectif quotidien de l'onglet Repas pendant la phase."
  },
  "Ritmo de peso (opcional)": {
   "en": "Weight pace (optional)",
   "pt-BR": "Ritmo de peso (opcional)",
   "fr": "Rythme de poids (facultatif)"
  },
  "Cambio de peso por semana": {
   "en": "Weight change per week",
   "pt-BR": "Mudança de peso por semana",
   "fr": "Variation de poids par semaine"
  },
  "En % de tu peso. Negativo para bajar, positivo para subir. Se compara con tu promedio de 7 días.": {
   "en": "As % of your weight. Negative to lose, positive to gain. Compared with your 7-day average.",
   "pt-BR": "Em % do seu peso. Negativo para baixar, positivo para subir. Comparado com sua média de 7 dias.",
   "fr": "En % de votre poids. Négatif pour perdre, positif pour prendre. Comparé à votre moyenne sur 7 jours."
  },
  "Ritmo de peso": {
   "en": "Weight pace",
   "pt-BR": "Ritmo de peso",
   "fr": "Rythme de poids"
  },
  "En ritmo": {
   "en": "On pace",
   "pt-BR": "No ritmo",
   "fr": "Dans le rythme"
  },
  "Fuera de ritmo": {
   "en": "Off pace",
   "pt-BR": "Fora do ritmo",
   "fr": "Hors rythme"
  },
  "Más lento que el plan": {
   "en": "Slower than plan",
   "pt-BR": "Mais lento que o plano",
   "fr": "Plus lent que prévu"
  },
  "Más rápido que el plan": {
   "en": "Faster than plan",
   "pt-BR": "Mais rápido que o plano",
   "fr": "Plus rapide que prévu"
  },
  "Revisa las fechas: la fase debe terminar después de empezar.": {
   "en": "Check the dates: the phase must end after it starts.",
   "pt-BR": "Revise as datas: a fase deve terminar depois de começar.",
   "fr": "Vérifiez les dates : la phase doit se terminer après son début."
  },
  "Esas fechas se enciman con otra fase.": {
   "en": "Those dates overlap another phase.",
   "pt-BR": "Essas datas se sobrepõem a outra fase.",
   "fr": "Ces dates chevauchent une autre phase."
  },
  "Divide tu plan en etapas con fechas: volumen, definición, mantenimiento, semana pico. Cada fase puede tener sus calorías y su ritmo de peso, y la app cambia sola tus metas cuando toca.": {
   "en": "Split your plan into dated stages: bulk, cut, maintenance, peak week. Each phase can have its own calories and weight pace, and the app switches your targets on its own when the time comes.",
   "pt-BR": "Divida seu plano em etapas com datas: volume, definição, manutenção, semana de pico. Cada fase pode ter suas calorias e seu ritmo de peso, e o app muda suas metas sozinho na hora certa.",
   "fr": "Divisez votre plan en étapes datées : prise de masse, sèche, maintien, semaine de pic. Chaque phase peut avoir ses calories et son rythme de poids, et l'app change vos objectifs toute seule le moment venu."
  },
  "Arma las etapas del plan de tu atleta. Las ve en su app y sus metas de nutrición cambian solas con cada fase.": {
   "en": "Build the stages of your athlete's plan. They see them in their app and their nutrition targets switch on their own with each phase.",
   "pt-BR": "Monte as etapas do plano do seu atleta. Ele as vê no app e as metas de nutrição mudam sozinhas a cada fase.",
   "fr": "Construisez les étapes du plan de votre athlète. Il les voit dans son app et ses objectifs nutritionnels changent tout seuls à chaque phase."
  },
  "Esta fase la definió tu especialista; solo él puede cambiarla.": {
   "en": "Your specialist defined this phase; only they can change it.",
   "pt-BR": "Seu especialista definiu esta fase; só ele pode alterá-la.",
   "fr": "Votre spécialiste a défini cette phase ; lui seul peut la modifier."
  },
  "Este objetivo te lo puso tu especialista; solo él puede quitarlo.": {
   "en": "Your specialist set this goal; only they can remove it.",
   "pt-BR": "Seu especialista definiu este objetivo; só ele pode removê-lo.",
   "fr": "Votre spécialiste a fixé cet objectif ; lui seul peut le retirer."
  },
  "Sin fase en curso hoy.": {
   "en": "No phase in progress today.",
   "pt-BR": "Nenhuma fase em andamento hoje.",
   "fr": "Aucune phase en cours aujourd'hui."
  },
  "meta de la fase": {
   "en": "phase target",
   "pt-BR": "meta da fase",
   "fr": "objectif de la phase"
  },
  "Poner objetivo": {
   "en": "Set a goal",
   "pt-BR": "Definir objetivo",
   "fr": "Fixer un objectif"
  },
  "Tuyo": {
   "en": "Yours",
   "pt-BR": "Seu",
   "fr": "Le vôtre"
  },
  "De": {
   "en": "From",
   "pt-BR": "De",
   "fr": "De"
  },
  "Te puse un objetivo nuevo.": {
   "en": "I set a new goal for you.",
   "pt-BR": "Defini um novo objetivo para você.",
   "fr": "Je vous ai fixé un nouvel objectif."
  },
  "Te armé las fases de tu plan.": {
   "en": "I set up the phases of your plan.",
   "pt-BR": "Montei as fases do seu plano.",
   "fr": "J'ai préparé les phases de votre plan."
  },
  "objetivos": {
   "en": "goals",
   "pt-BR": "objetivos",
   "fr": "objectifs"
  },
  "fases del plan": {
   "en": "plan phases",
   "pt-BR": "fases do plano",
   "fr": "phases du plan"
  },
  "Con la mano": {
   "en": "By hand",
   "pt-BR": "Com a mão",
   "fr": "À la main"
  },
  "Foto del plato": {
   "en": "Plate photo",
   "pt-BR": "Foto do prato",
   "fr": "Photo de l'assiette"
  },
  "Porciones con la mano": {
   "en": "Hand portions",
   "pt-BR": "Porções com a mão",
   "fr": "Portions à la main"
  },
  "Porción con la mano": {
   "en": "Hand portion",
   "pt-BR": "Porção com a mão",
   "fr": "Portion à la main"
  },
  "Para cuando no hay báscula: usa tu mano como medida. Es una estimación, no un pesaje.": {
   "en": "For when there's no scale: use your hand as the measure. It's an estimate, not a weigh-in.",
   "pt-BR": "Para quando não há balança: use sua mão como medida. É uma estimativa, não uma pesagem.",
   "fr": "Quand il n'y a pas de balance : utilisez votre main comme mesure. C'est une estimation, pas une pesée."
  },
  "Palma": {
   "en": "Palm",
   "pt-BR": "Palma",
   "fr": "Paume"
  },
  "Puñado": {
   "en": "Cupped hand",
   "pt-BR": "Punhado",
   "fr": "Poignée"
  },
  "Pulgar": {
   "en": "Thumb",
   "pt-BR": "Polegar",
   "fr": "Pouce"
  },
  "Puño": {
   "en": "Fist",
   "pt-BR": "Punho",
   "fr": "Poing"
  },
  "Proteína: carne, pollo, pescado, huevo": {
   "en": "Protein: meat, chicken, fish, egg",
   "pt-BR": "Proteína: carne, frango, peixe, ovo",
   "fr": "Protéines : viande, poulet, poisson, œuf"
  },
  "Carbohidrato: arroz, pasta, frijol, fruta": {
   "en": "Carbs: rice, pasta, beans, fruit",
   "pt-BR": "Carboidrato: arroz, massa, feijão, fruta",
   "fr": "Glucides : riz, pâtes, haricots, fruits"
  },
  "Grasa: aceite, aguacate, nueces, queso": {
   "en": "Fat: oil, avocado, nuts, cheese",
   "pt-BR": "Gordura: óleo, abacate, nozes, queijo",
   "fr": "Lipides : huile, avocat, noix, fromage"
  },
  "Carbos": {
   "en": "Carbs",
   "pt-BR": "Carbos",
   "fr": "Glucides"
  },
  "Agrega al menos una porción.": {
   "en": "Add at least one portion.",
   "pt-BR": "Adicione pelo menos uma porção.",
   "fr": "Ajoutez au moins une portion."
  },
  "La foto queda guardada en esa comida del día. Tu nutriólogo la ve junto con lo que registras.": {
   "en": "The photo is saved to that meal of the day. Your nutritionist sees it along with what you log.",
   "pt-BR": "A foto fica salva nessa refeição do dia. Seu nutricionista a vê junto com o que você registra.",
   "fr": "La photo est enregistrée dans ce repas du jour. Votre nutritionniste la voit avec ce que vous saisissez."
  },
  "Inicia sesión para guardar fotos.": {
   "en": "Sign in to save photos.",
   "pt-BR": "Entre para salvar fotos.",
   "fr": "Connectez-vous pour enregistrer des photos."
  },
  "Necesitas conexión para subir la foto.": {
   "en": "You need a connection to upload the photo.",
   "pt-BR": "Você precisa de conexão para enviar a foto.",
   "fr": "Il faut une connexion pour envoyer la photo."
  },
  "¿Eliminar esta foto?": {
   "en": "Delete this photo?",
   "pt-BR": "Excluir esta foto?",
   "fr": "Supprimer cette photo ?"
  },
  "Fotos de comidas": {
   "en": "Meal photos",
   "pt-BR": "Fotos das refeições",
   "fr": "Photos des repas"
  },
  "Todavía no sube fotos de sus comidas.": {
   "en": "No meal photos uploaded yet.",
   "pt-BR": "Ainda não enviou fotos das refeições.",
   "fr": "Aucune photo de repas pour l'instant."
  },
  "fotos de comidas": {
   "en": "meal photos",
   "pt-BR": "fotos das refeições",
   "fr": "photos des repas"
  },
  "Perfil de atleta": {
   "en": "Athlete profile",
   "pt-BR": "Perfil de atleta",
   "fr": "Profil d'athlète"
  },
  "Tus deportes, nivel y marcas": {
   "en": "Your sports, level and personal bests",
   "pt-BR": "Seus esportes, nível e marcas",
   "fr": "Vos sports, niveau et records"
  },
  "Marca todos los deportes que practicas. Según lo que elijas cambian las marcas que llenas aquí y lo que la app te ofrece registrar.": {
   "en": "Tick every sport you practice. Your choices change the marks you fill in here and what the app offers you to log.",
   "pt-BR": "Marque todos os esportes que pratica. Conforme a escolha mudam as marcas que preenche aqui e o que o app oferece para registrar.",
   "fr": "Cochez tous les sports que vous pratiquez. Vos choix changent les records à renseigner ici et ce que l'app vous propose d'enregistrer."
  },
  "Nivel": {
   "en": "Level",
   "pt-BR": "Nível",
   "fr": "Niveau"
  },
  "Principiante": {
   "en": "Beginner",
   "pt-BR": "Iniciante",
   "fr": "Débutant"
  },
  "Intermedio": {
   "en": "Intermediate",
   "pt-BR": "Intermediário",
   "fr": "Intermédiaire"
  },
  "Avanzado": {
   "en": "Advanced",
   "pt-BR": "Avançado",
   "fr": "Avancé"
  },
  "Competidor": {
   "en": "Competitor",
   "pt-BR": "Competidor",
   "fr": "Compétiteur"
  },
  "Días de entrenamiento por semana": {
   "en": "Training days per week",
   "pt-BR": "Dias de treino por semana",
   "fr": "Jours d'entraînement par semaine"
  },
  "Objetivo principal": {
   "en": "Main goal",
   "pt-BR": "Objetivo principal",
   "fr": "Objectif principal"
  },
  "Fuerza / Gym": {
   "en": "Strength / Gym",
   "pt-BR": "Força / Academia",
   "fr": "Force / Salle"
  },
  "Running": {
   "en": "Running",
   "pt-BR": "Corrida",
   "fr": "Course à pied"
  },
  "Ciclismo": {
   "en": "Cycling",
   "pt-BR": "Ciclismo",
   "fr": "Cyclisme"
  },
  "Natación": {
   "en": "Swimming",
   "pt-BR": "Natação",
   "fr": "Natation"
  },
  "Box / combate": {
   "en": "Boxing / combat",
   "pt-BR": "Boxe / combate",
   "fr": "Boxe / combat"
  },
  "Funcional / CrossFit": {
   "en": "Functional / CrossFit",
   "pt-BR": "Funcional / CrossFit",
   "fr": "Fonctionnel / CrossFit"
  },
  "Calistenia": {
   "en": "Calisthenics",
   "pt-BR": "Calistenia",
   "fr": "Callisthénie"
  },
  "Escalada": {
   "en": "Climbing",
   "pt-BR": "Escalada",
   "fr": "Escalade"
  },
  "Fisio / rehabilitación": {
   "en": "Physio / rehab",
   "pt-BR": "Fisio / reabilitação",
   "fr": "Kiné / rééducation"
  },
  "Caminata / senderismo": {
   "en": "Walking / hiking",
   "pt-BR": "Caminhada / trilha",
   "fr": "Marche / randonnée"
  },
  "Yoga / movilidad": {
   "en": "Yoga / mobility",
   "pt-BR": "Yoga / mobilidade",
   "fr": "Yoga / mobilité"
  },
  "Deporte de equipo": {
   "en": "Team sport",
   "pt-BR": "Esporte coletivo",
   "fr": "Sport collectif"
  },
  "Cardio y otros deportes": {
   "en": "Cardio and other sports",
   "pt-BR": "Cardio e outros esportes",
   "fr": "Cardio et autres sports"
  },
  "Últimos 7 días": {
   "en": "Last 7 days",
   "pt-BR": "Últimos 7 dias",
   "fr": "7 derniers jours"
  },
  "Registrar actividad": {
   "en": "Log activity",
   "pt-BR": "Registrar atividade",
   "fr": "Enregistrer une activité"
  },
  "Editar actividad": {
   "en": "Edit activity",
   "pt-BR": "Editar atividade",
   "fr": "Modifier l'activité"
  },
  "Eliminar actividad": {
   "en": "Delete activity",
   "pt-BR": "Excluir atividade",
   "fr": "Supprimer l'activité"
  },
  "¿Eliminar esta actividad?": {
   "en": "Delete this activity?",
   "pt-BR": "Excluir esta atividade?",
   "fr": "Supprimer cette activité ?"
  },
  "Deporte": {
   "en": "Sport",
   "pt-BR": "Esporte",
   "fr": "Sport"
  },
  "Tipo de sesión": {
   "en": "Session type",
   "pt-BR": "Tipo de sessão",
   "fr": "Type de séance"
  },
  "Distancia": {
   "en": "Distance",
   "pt-BR": "Distância",
   "fr": "Distance"
  },
  "FC media": {
   "en": "Avg HR",
   "pt-BR": "FC média",
   "fr": "FC moyenne"
  },
  "FC máxima": {
   "en": "Max HR",
   "pt-BR": "FC máxima",
   "fr": "FC max"
  },
  "Desnivel": {
   "en": "Elevation gain",
   "pt-BR": "Desnível",
   "fr": "Dénivelé"
  },
  "Potencia media": {
   "en": "Avg power",
   "pt-BR": "Potência média",
   "fr": "Puissance moyenne"
  },
  "Cadencia": {
   "en": "Cadence",
   "pt-BR": "Cadência",
   "fr": "Cadence"
  },
  "Pasos": {
   "en": "Steps",
   "pt-BR": "Passos",
   "fr": "Pas"
  },
  "Rounds": {
   "en": "Rounds",
   "pt-BR": "Rounds",
   "fr": "Rounds"
  },
  "Minutos por round": {
   "en": "Minutes per round",
   "pt-BR": "Minutos por round",
   "fr": "Minutes par round"
  },
  "Nombre o descripción": {
   "en": "Name or description",
   "pt-BR": "Nome ou descrição",
   "fr": "Nom ou description"
  },
  "Resultado": {
   "en": "Result",
   "pt-BR": "Resultado",
   "fr": "Résultat"
  },
  "Grado máximo": {
   "en": "Max grade",
   "pt-BR": "Grau máximo",
   "fr": "Cotation max"
  },
  "Encadenes": {
   "en": "Sends",
   "pt-BR": "Encadeamentos",
   "fr": "Enchaînements"
  },
  "Intentos": {
   "en": "Attempts",
   "pt-BR": "Tentativas",
   "fr": "Essais"
  },
  "Dolor antes": {
   "en": "Pain before",
   "pt-BR": "Dor antes",
   "fr": "Douleur avant"
  },
  "Dolor después": {
   "en": "Pain after",
   "pt-BR": "Dor depois",
   "fr": "Douleur après"
  },
  "Tiempo total de carrera": {
   "en": "Total running time",
   "pt-BR": "Tempo total de corrida",
   "fr": "Temps total de course"
  },
  "Tiempo por estación": {
   "en": "Time per station",
   "pt-BR": "Tempo por estação",
   "fr": "Temps par station"
  },
  "opcional": {
   "en": "optional",
   "pt-BR": "opcional",
   "fr": "facultatif"
  },
  "Esfuerzo percibido (RPE)": {
   "en": "Perceived effort (RPE)",
   "pt-BR": "Esforço percebido (RPE)",
   "fr": "Effort perçu (RPE)"
  },
  "Categoría": {
   "en": "Category",
   "pt-BR": "Categoria",
   "fr": "Catégorie"
  },
  "Alberca": {
   "en": "Pool",
   "pt-BR": "Piscina",
   "fr": "Bassin"
  },
  "Estilo principal": {
   "en": "Main stroke",
   "pt-BR": "Estilo principal",
   "fr": "Nage principale"
  },
  "Cómo te sentiste, clima, ruta...": {
   "en": "How you felt, weather, route...",
   "pt-BR": "Como se sentiu, clima, rota...",
   "fr": "Ressenti, météo, parcours..."
  },
  "Anota al menos el tiempo o la distancia.": {
   "en": "Enter at least time or distance.",
   "pt-BR": "Anote pelo menos o tempo ou a distância.",
   "fr": "Saisissez au moins le temps ou la distance."
  },
  "Ritmo": {
   "en": "Pace",
   "pt-BR": "Ritmo",
   "fr": "Allure"
  },
  "Velocidad": {
   "en": "Speed",
   "pt-BR": "Velocidade",
   "fr": "Vitesse"
  },
  "sesión": {
   "en": "session",
   "pt-BR": "sessão",
   "fr": "séance"
  },
  "sesiones": {
   "en": "sessions",
   "pt-BR": "sessões",
   "fr": "séances"
  },
  "Rodaje suave": {
   "en": "Easy run",
   "pt-BR": "Rodagem leve",
   "fr": "Footing"
  },
  "Series": {
   "en": "Intervals",
   "pt-BR": "Séries",
   "fr": "Fractionné"
  },
  "Tirada larga": {
   "en": "Long run",
   "pt-BR": "Longão",
   "fr": "Sortie longue"
  },
  "Competencia": {
   "en": "Race",
   "pt-BR": "Competição",
   "fr": "Compétition"
  },
  "Ruta": {
   "en": "Road",
   "pt-BR": "Estrada",
   "fr": "Route"
  },
  "Montaña": {
   "en": "Mountain",
   "pt-BR": "Montanha",
   "fr": "VTT"
  },
  "Rodillo / spinning": {
   "en": "Trainer / spinning",
   "pt-BR": "Rolo / spinning",
   "fr": "Home trainer / spinning"
  },
  "Técnica": {
   "en": "Technique",
   "pt-BR": "Técnica",
   "fr": "Technique"
  },
  "Aeróbico": {
   "en": "Aerobic",
   "pt-BR": "Aeróbico",
   "fr": "Aérobie"
  },
  "Aguas abiertas": {
   "en": "Open water",
   "pt-BR": "Águas abertas",
   "fr": "Eau libre"
  },
  "Saco": {
   "en": "Bag",
   "pt-BR": "Saco",
   "fr": "Sac"
  },
  "Sombra": {
   "en": "Shadow",
   "pt-BR": "Sombra",
   "fr": "Shadow"
  },
  "Manoplas": {
   "en": "Mitts",
   "pt-BR": "Manoplas",
   "fr": "Pattes d'ours"
  },
  "Sparring": {
   "en": "Sparring",
   "pt-BR": "Sparring",
   "fr": "Sparring"
  },
  "Acondicionamiento": {
   "en": "Conditioning",
   "pt-BR": "Condicionamento",
   "fr": "Condition physique"
  },
  "Por tiempo": {
   "en": "For time",
   "pt-BR": "Por tempo",
   "fr": "For time"
  },
  "Simulación completa": {
   "en": "Full simulation",
   "pt-BR": "Simulação completa",
   "fr": "Simulation complète"
  },
  "Media simulación": {
   "en": "Half simulation",
   "pt-BR": "Meia simulação",
   "fr": "Demi-simulation"
  },
  "Estaciones": {
   "en": "Stations",
   "pt-BR": "Estações",
   "fr": "Stations"
  },
  "Carrera comprometida": {
   "en": "Compromised running",
   "pt-BR": "Corrida comprometida",
   "fr": "Course compromise"
  },
  "Fuerza": {
   "en": "Strength",
   "pt-BR": "Força",
   "fr": "Force"
  },
  "Resistencia": {
   "en": "Endurance",
   "pt-BR": "Resistência",
   "fr": "Endurance"
  },
  "Skills": {
   "en": "Skills",
   "pt-BR": "Skills",
   "fr": "Skills"
  },
  "Movilidad": {
   "en": "Mobility",
   "pt-BR": "Mobilidade",
   "fr": "Mobilité"
  },
  "Boulder": {
   "en": "Bouldering",
   "pt-BR": "Boulder",
   "fr": "Bloc"
  },
  "Deportiva": {
   "en": "Sport climbing",
   "pt-BR": "Esportiva",
   "fr": "Voie"
  },
  "Roca": {
   "en": "Rock",
   "pt-BR": "Rocha",
   "fr": "Falaise"
  },
  "Ejercicios en casa": {
   "en": "Home exercises",
   "pt-BR": "Exercícios em casa",
   "fr": "Exercices à domicile"
  },
  "Sesión con fisioterapeuta": {
   "en": "Session with physio",
   "pt-BR": "Sessão com fisioterapeuta",
   "fr": "Séance avec kiné"
  },
  "Readaptación": {
   "en": "Return to play",
   "pt-BR": "Readaptação",
   "fr": "Réathlétisation"
  },
  "Partido": {
   "en": "Match",
   "pt-BR": "Jogo",
   "fr": "Match"
  },
  "Por deporte": {
   "en": "By sport",
   "pt-BR": "Por esporte",
   "fr": "Par sport"
  },
  "Rutinas por deporte": {
   "en": "Routines by sport",
   "pt-BR": "Rotinas por esporte",
   "fr": "Routines par sport"
  },
  "Agregar a mis rutinas": {
   "en": "Add to my routines",
   "pt-BR": "Adicionar às minhas rotinas",
   "fr": "Ajouter à mes routines"
  },
  "Rutinas base para empezar. Al agregarla queda en Mis rutinas y la puedes editar, programar en tu semana y registrar como cualquier otra.": {
   "en": "Starter routines. Once added it sits in My routines and you can edit, schedule and log it like any other.",
   "pt-BR": "Rotinas base para começar. Ao adicionar fica em Minhas rotinas e você pode editar, programar e registrar como qualquer outra.",
   "fr": "Routines de base. Une fois ajoutée, elle est dans Mes routines : modifiez-la, planifiez-la et enregistrez-la comme les autres."
  },
  "Ejemplo general. Tu fisioterapeuta indica los ejercicios y la dosis para tu caso.": {
   "en": "General example. Your physiotherapist sets the exercises and dose for your case.",
   "pt-BR": "Exemplo geral. Seu fisioterapeuta indica os exercícios e a dose para o seu caso.",
   "fr": "Exemple général. Votre kiné indique les exercices et la dose pour votre cas."
  },
  "Marca en 5 km": {
   "en": "5K best",
   "pt-BR": "Marca em 5 km",
   "fr": "Record 5 km"
  },
  "Marca en 10 km": {
   "en": "10K best",
   "pt-BR": "Marca em 10 km",
   "fr": "Record 10 km"
  },
  "Medio maratón": {
   "en": "Half marathon",
   "pt-BR": "Meia maratona",
   "fr": "Semi-marathon"
  },
  "Maratón": {
   "en": "Marathon",
   "pt-BR": "Maratona",
   "fr": "Marathon"
  },
  "Kilómetros por semana": {
   "en": "Kilometers per week",
   "pt-BR": "Quilômetros por semana",
   "fr": "Kilomètres par semaine"
  },
  "Sentadilla (1RM)": {
   "en": "Squat (1RM)",
   "pt-BR": "Agachamento (1RM)",
   "fr": "Squat (1RM)"
  },
  "Press de banca (1RM)": {
   "en": "Bench press (1RM)",
   "pt-BR": "Supino (1RM)",
   "fr": "Développé couché (1RM)"
  },
  "Peso muerto (1RM)": {
   "en": "Deadlift (1RM)",
   "pt-BR": "Levantamento terra (1RM)",
   "fr": "Soulevé de terre (1RM)"
  },
  "Años entrenando": {
   "en": "Years training",
   "pt-BR": "Anos treinando",
   "fr": "Années d'entraînement"
  },
  "Años practicando": {
   "en": "Years practicing",
   "pt-BR": "Anos praticando",
   "fr": "Années de pratique"
  },
  "Mejor tiempo": {
   "en": "Best time",
   "pt-BR": "Melhor tempo",
   "fr": "Meilleur temps"
  },
  "Próxima competencia": {
   "en": "Next competition",
   "pt-BR": "Próxima competição",
   "fr": "Prochaine compétition"
  },
  "Dominadas seguidas": {
   "en": "Pull-ups in a row",
   "pt-BR": "Barras seguidas",
   "fr": "Tractions d'affilée"
  },
  "Flexiones seguidas": {
   "en": "Push-ups in a row",
   "pt-BR": "Flexões seguidas",
   "fr": "Pompes d'affilée"
  },
  "Fondos seguidos": {
   "en": "Dips in a row",
   "pt-BR": "Paralelas seguidas",
   "fr": "Dips d'affilée"
  },
  "Personalizar": {
   "en": "Customize",
   "pt-BR": "Personalizar",
   "fr": "Personnaliser"
  },
  "Apaga lo que no uses: desaparece del menú y de Hoy. Tus datos no se borran y puedes volver a encenderlo cuando quieras.": {
   "en": "Turn off what you don't use: it disappears from the menu and Today. Your data isn't deleted and you can turn it back on anytime.",
   "pt-BR": "Desligue o que não usa: some do menu e de Hoje. Seus dados não são apagados e você pode religar quando quiser.",
   "fr": "Désactivez ce que vous n'utilisez pas : cela disparaît du menu et d'Aujourd'hui. Vos données ne sont pas supprimées et vous pouvez le réactiver à tout moment."
  },
  "Rutinas, registro de entrenamiento y progreso": {
   "en": "Routines, workout logging and progress",
   "pt-BR": "Rotinas, registro de treino e progresso",
   "fr": "Routines, suivi d'entraînement et progression"
  },
  "Registro de alimentos, metas y plan de alimentación": {
   "en": "Food logging, goals and meal plan",
   "pt-BR": "Registro de alimentos, metas e plano alimentar",
   "fr": "Suivi alimentaire, objectifs et plan alimentaire"
  },
  "Hábitos del día, rachas e hidratación": {
   "en": "Daily habits, streaks and hydration",
   "pt-BR": "Hábitos do dia, sequências e hidratação",
   "fr": "Habitudes du jour, séries et hydratation"
  },
  "Peso, medidas y composición corporal": {
   "en": "Weight, measurements and body composition",
   "pt-BR": "Peso, medidas e composição corporal",
   "fr": "Poids, mesures et composition corporelle"
  },
  "El reporte semanal para tu especialista": {
   "en": "The weekly report for your specialist",
   "pt-BR": "O relatório semanal para seu especialista",
   "fr": "Le bilan hebdomadaire pour votre spécialiste"
  },
  "Citas con tus especialistas": {
   "en": "Appointments with your specialists",
   "pt-BR": "Consultas com seus especialistas",
   "fr": "Rendez-vous avec vos spécialistes"
  },
  "Entrenamiento": {
   "en": "Training",
   "pt-BR": "Treino",
   "fr": "Entraînement"
  },
  "Solo palomear ejercicios": {
   "en": "Just tick off exercises",
   "pt-BR": "Só marcar exercícios",
   "fr": "Cocher seulement les exercices"
  },
  "Sin anotar peso ni repeticiones: una palomita por ejercicio": {
   "en": "No weight or reps to enter: one tick per exercise",
   "pt-BR": "Sem anotar peso nem repetições: uma marca por exercício",
   "fr": "Sans saisir poids ni répétitions : une coche par exercice"
  },
  "incluida": {
   "en": "included",
   "pt-BR": "incluída",
   "fr": "incluse"
  },
  "Fórmulas": {
   "en": "Formulas",
   "pt-BR": "Fórmulas",
   "fr": "Formules"
  },
  "fórmulas": {
   "en": "formulas",
   "pt-BR": "fórmulas",
   "fr": "formules"
  },
  "Marca las fórmulas que quieres usar. El % de grasa y el IMC del reporte son el promedio de las que marques; si no marcas ninguna se usa la más completa.": {
   "en": "Tick the formulas you want to use. The report's body fat % and BMI are the average of the ticked ones; with none ticked the most complete one is used.",
   "pt-BR": "Marque as fórmulas que quer usar. O % de gordura e o IMC do relatório são a média das marcadas; sem nenhuma marcada usa-se a mais completa.",
   "fr": "Cochez les formules à utiliser. Le % de graisse et l'IMC du rapport sont la moyenne des formules cochées ; sans sélection, la plus complète est utilisée."
  },
  "Ninguna": {
   "en": "None",
   "pt-BR": "Nenhuma",
   "fr": "Aucune"
  },
  "Aún no hay datos suficientes para ninguna fórmula.": {
   "en": "Not enough data for any formula yet.",
   "pt-BR": "Ainda não há dados suficientes para nenhuma fórmula.",
   "fr": "Pas encore assez de données pour une formule."
  },
  "Promedio de las marcadas": {
   "en": "Average of ticked",
   "pt-BR": "Média das marcadas",
   "fr": "Moyenne des cochées"
  },
  "Fórmula marcada": {
   "en": "Ticked formula",
   "pt-BR": "Fórmula marcada",
   "fr": "Formule cochée"
  },
  "Automático (la más completa)": {
   "en": "Automatic (most complete)",
   "pt-BR": "Automático (a mais completa)",
   "fr": "Automatique (la plus complète)"
  },
  "IMC usado": {
   "en": "BMI used",
   "pt-BR": "IMC usado",
   "fr": "IMC utilisé"
  },
  "Promedio": {
   "en": "Average",
   "pt-BR": "Média",
   "fr": "Moyenne"
  },
  "% de grasa:": {
   "en": "Body fat %:",
   "pt-BR": "% de gordura:",
   "fr": "% de graisse :"
  },
  "promedio de las fórmulas marcadas": {
   "en": "average of ticked formulas",
   "pt-BR": "média das fórmulas marcadas",
   "fr": "moyenne des formules cochées"
  },
  "Completa los pliegues de alguna fórmula para calcular el % de grasa.": {
   "en": "Fill in the skinfolds of a formula to calculate body fat %.",
   "pt-BR": "Preencha as dobras de alguma fórmula para calcular o % de gordura.",
   "fr": "Renseignez les plis d'une formule pour calculer le % de graisse."
  },
  "% de grasa por fórmula": {
   "en": "Body fat % by formula",
   "pt-BR": "% de gordura por fórmula",
   "fr": "% de graisse par formule"
  },
  "en el promedio": {
   "en": "in the average",
   "pt-BR": "na média",
   "fr": "dans la moyenne"
  },
  "usada": {
   "en": "used",
   "pt-BR": "usada",
   "fr": "utilisée"
  },
  "Promedio de las fórmulas elegidas": {
   "en": "Average of chosen formulas",
   "pt-BR": "Média das fórmulas escolhidas",
   "fr": "Moyenne des formules choisies"
  },
  "es el % de grasa que usa todo el reporte": {
   "en": "this is the body fat % used across the report",
   "pt-BR": "é o % de gordura usado em todo o relatório",
   "fr": "c'est le % de graisse utilisé dans tout le rapport"
  },
  "Promedio de todas": {
   "en": "Average of all",
   "pt-BR": "Média de todas",
   "fr": "Moyenne de toutes"
  },
  "Rango entre fórmulas": {
   "en": "Range across formulas",
   "pt-BR": "Faixa entre fórmulas",
   "fr": "Écart entre formules"
  },
  "Índices de peso y talla": {
   "en": "Weight and height indices",
   "pt-BR": "Índices de peso e altura",
   "fr": "Indices poids-taille"
  },
  "Índice ponderal": {
   "en": "Ponderal index",
   "pt-BR": "Índice ponderal",
   "fr": "Indice pondéral"
  },
  "IMC clásico (Quetelet)": {
   "en": "Classic BMI (Quetelet)",
   "pt-BR": "IMC clássico (Quetelet)",
   "fr": "IMC classique (Quetelet)"
  },
  "IMC corregido por talla (Trefethen)": {
   "en": "Height-corrected BMI (Trefethen)",
   "pt-BR": "IMC corrigido pela altura (Trefethen)",
   "fr": "IMC corrigé par la taille (Trefethen)"
  },
  "Jackson-Pollock (4 pliegues)": {
   "en": "Jackson-Pollock (4 skinfolds)",
   "pt-BR": "Jackson-Pollock (4 dobras)",
   "fr": "Jackson-Pollock (4 plis)"
  },
  "Sloan (2 pliegues)": {
   "en": "Sloan (2 skinfolds)",
   "pt-BR": "Sloan (2 dobras)",
   "fr": "Sloan (2 plis)"
  },
  "Masa grasa relativa (RFM)": {
   "en": "Relative fat mass (RFM)",
   "pt-BR": "Massa gorda relativa (RFM)",
   "fr": "Masse grasse relative (RFM)"
  },
  "CUN-BAE (IMC, edad y sexo)": {
   "en": "CUN-BAE (BMI, age and sex)",
   "pt-BR": "CUN-BAE (IMC, idade e sexo)",
   "fr": "CUN-BAE (IMC, âge et sexe)"
  },
  "Deurenberg (IMC, edad y sexo)": {
   "en": "Deurenberg (BMI, age and sex)",
   "pt-BR": "Deurenberg (IMC, idade e sexo)",
   "fr": "Deurenberg (IMC, âge et sexe)"
  },
  "Tu cuerpo": {
   "en": "Your body",
   "pt-BR": "Seu corpo",
   "fr": "Votre corps"
  },
  "Medidas del": {
   "en": "Measured on",
   "pt-BR": "Medidas de",
   "fr": "Mesures du"
  },
  "Registrar peso": {
   "en": "Log weight",
   "pt-BR": "Registrar peso",
   "fr": "Saisir le poids"
  },
  "Peso registrado hoy": {
   "en": "Weight logged today",
   "pt-BR": "Peso registrado hoje",
   "fr": "Poids saisi aujourd'hui"
  },
  "Peso registrado ayer": {
   "en": "Weight logged yesterday",
   "pt-BR": "Peso registrado ontem",
   "fr": "Poids saisi hier"
  },
  "Peso registrado hace": {
   "en": "Weight logged",
   "pt-BR": "Peso registrado há",
   "fr": "Poids saisi il y a"
  },
  "Sin pesajes todavía": {
   "en": "No weigh-ins yet",
   "pt-BR": "Sem pesagens ainda",
   "fr": "Pas encore de pesée"
  },
  "Cambios desde": {
   "en": "Changes since",
   "pt-BR": "Mudanças desde",
   "fr": "Variations depuis"
  },
  "Toca para ver todo": {
   "en": "Tap to see everything",
   "pt-BR": "Toque para ver tudo",
   "fr": "Touchez pour tout voir"
  },
  "Toca para registrar tus medidas y ver % de grasa, masa muscular y más.": {
   "en": "Tap to log your measurements and see body fat %, muscle mass and more.",
   "pt-BR": "Toque para registrar suas medidas e ver % de gordura, massa muscular e mais.",
   "fr": "Touchez pour saisir vos mesures et voir % de graisse, masse musculaire et plus."
  },
  "Cintura-cadera": {
   "en": "Waist-hip",
   "pt-BR": "Cintura-quadril",
   "fr": "Taille-hanches"
  },
  "Gasto diario (kcal)": {
   "en": "Daily expenditure (kcal)",
   "pt-BR": "Gasto diário (kcal)",
   "fr": "Dépense quotidienne (kcal)"
  },
  "Gasto en reposo (kcal)": {
   "en": "Resting expenditure (kcal)",
   "pt-BR": "Gasto em repouso (kcal)",
   "fr": "Dépense au repos (kcal)"
  },
  "Muslo": {
   "en": "Thigh",
   "pt-BR": "Coxa",
   "fr": "Cuisse"
  },
  "Obesidad": {
   "en": "Obesity",
   "pt-BR": "Obesidade",
   "fr": "Obésité"
  },
  "Cambiar a mi perfil de atleta": {
   "en": "Switch to my athlete profile",
   "pt-BR": "Mudar para meu perfil de atleta",
   "fr": "Passer à mon profil d'athlète"
  },
  "Tus propios registros, rutinas y comidas": {
   "en": "Your own logs, routines and meals",
   "pt-BR": "Seus próprios registros, treinos e refeições",
   "fr": "Vos propres saisies, routines et repas"
  },
  "Cambiar a especialista": {
   "en": "Switch to specialist",
   "pt-BR": "Mudar para especialista",
   "fr": "Passer en mode spécialiste"
  },
  "Tus atletas, plantillas y mensajes": {
   "en": "Your athletes, templates and messages",
   "pt-BR": "Seus atletas, modelos e mensagens",
   "fr": "Vos athlètes, modèles et messages"
  },
  "Check-in semanal": {
   "en": "Weekly check-in",
   "pt-BR": "Check-in semanal",
   "fr": "Bilan hebdomadaire"
  },
  "Check-ins": {
   "en": "Check-ins",
   "pt-BR": "Check-ins",
   "fr": "Bilans"
  },
  "Tu reporte semanal y la respuesta": {
   "en": "Your weekly report and the reply",
   "pt-BR": "Seu relatório semanal e a resposta",
   "fr": "Votre bilan hebdomadaire et la réponse"
  },
  "Pendiente": {
   "en": "Pending",
   "pt-BR": "Pendente",
   "fr": "En attente"
  },
  "Respondido": {
   "en": "Answered",
   "pt-BR": "Respondido",
   "fr": "Répondu"
  },
  "Enviado": {
   "en": "Sent",
   "pt-BR": "Enviado",
   "fr": "Envoyé"
  },
  "Semana del": {
   "en": "Week of",
   "pt-BR": "Semana de",
   "fr": "Semaine du"
  },
  "Cuéntale a tu especialista cómo te fue.": {
   "en": "Tell your specialist how it went.",
   "pt-BR": "Conte ao seu especialista como foi.",
   "fr": "Dites à votre spécialiste comment ça s'est passé."
  },
  "Hacer check-in": {
   "en": "Do check-in",
   "pt-BR": "Fazer check-in",
   "fr": "Faire le bilan"
  },
  "Tu especialista aún no lo revisa. Puedes editarlo mientras tanto.": {
   "en": "Your specialist hasn't reviewed it yet. You can edit it meanwhile.",
   "pt-BR": "Seu especialista ainda não revisou. Você pode editar enquanto isso.",
   "fr": "Votre spécialiste ne l'a pas encore revu. Vous pouvez le modifier en attendant."
  },
  "Promedio 7 días": {
   "en": "7-day average",
   "pt-BR": "Média de 7 dias",
   "fr": "Moyenne 7 jours"
  },
  "Ritmo por semana": {
   "en": "Weekly rate",
   "pt-BR": "Ritmo por semana",
   "fr": "Rythme hebdo"
  },
  "registros": {
   "en": "entries",
   "pt-BR": "registros",
   "fr": "relevés"
  },
  "registro": {
   "en": "entry",
   "pt-BR": "registro",
   "fr": "relevé"
  },
  "Falta la semana anterior": {
   "en": "Previous week missing",
   "pt-BR": "Falta a semana anterior",
   "fr": "Semaine précédente manquante"
  },
  "Lo que ya registraste": {
   "en": "What you already logged",
   "pt-BR": "O que você já registrou",
   "fr": "Ce que vous avez déjà saisi"
  },
  "Se toma de tus registros de los últimos 7 días y se envía junto con tus respuestas.": {
   "en": "Taken from your logs of the last 7 days and sent with your answers.",
   "pt-BR": "Vem dos seus registros dos últimos 7 dias e é enviado com suas respostas.",
   "fr": "Tiré de vos saisies des 7 derniers jours et envoyé avec vos réponses."
  },
  "Peso promedio de 7 días": {
   "en": "7-day average weight",
   "pt-BR": "Peso médio de 7 dias",
   "fr": "Poids moyen sur 7 jours"
  },
  "Con al menos 3 pesajes en la semana el promedio es más confiable.": {
   "en": "With at least 3 weigh-ins a week the average is more reliable.",
   "pt-BR": "Com pelo menos 3 pesagens na semana a média é mais confiável.",
   "fr": "Avec au moins 3 pesées par semaine, la moyenne est plus fiable."
  },
  "1 = muy mal · 5 = muy bien": {
   "en": "1 = very bad · 5 = very good",
   "pt-BR": "1 = muito mal · 5 = muito bem",
   "fr": "1 = très mal · 5 = très bien"
  },
  "En hambre y estrés, 5 significa mucho.": {
   "en": "For hunger and stress, 5 means a lot.",
   "pt-BR": "Em fome e estresse, 5 significa muito.",
   "fr": "Pour la faim et le stress, 5 signifie beaucoup."
  },
  "Energía": {
   "en": "Energy",
   "pt-BR": "Energia",
   "fr": "Énergie"
  },
  "Hambre": {
   "en": "Hunger",
   "pt-BR": "Fome",
   "fr": "Faim"
  },
  "Calidad de sueño": {
   "en": "Sleep quality",
   "pt-BR": "Qualidade do sono",
   "fr": "Qualité du sommeil"
  },
  "Estrés": {
   "en": "Stress",
   "pt-BR": "Estresse",
   "fr": "Stress"
  },
  "Digestión": {
   "en": "Digestion",
   "pt-BR": "Digestão",
   "fr": "Digestion"
  },
  "Recuperación muscular": {
   "en": "Muscle recovery",
   "pt-BR": "Recuperação muscular",
   "fr": "Récupération musculaire"
  },
  "Ánimo y motivación": {
   "en": "Mood and motivation",
   "pt-BR": "Ânimo e motivação",
   "fr": "Humeur et motivation"
  },
  "Cumplimiento": {
   "en": "Adherence",
   "pt-BR": "Adesão",
   "fr": "Adhérence"
  },
  "Dieta": {
   "en": "Diet",
   "pt-BR": "Dieta",
   "fr": "Régime"
  },
  "Horas de sueño por noche": {
   "en": "Hours of sleep per night",
   "pt-BR": "Horas de sono por noite",
   "fr": "Heures de sommeil par nuit"
  },
  "Pasos por día (promedio)": {
   "en": "Steps per day (average)",
   "pt-BR": "Passos por dia (média)",
   "fr": "Pas par jour (moyenne)"
  },
  "Cardio en la semana": {
   "en": "Cardio this week",
   "pt-BR": "Cardio na semana",
   "fr": "Cardio de la semaine"
  },
  "En tus palabras": {
   "en": "In your words",
   "pt-BR": "Com suas palavras",
   "fr": "Avec vos mots"
  },
  "¿Qué salió bien?": {
   "en": "What went well?",
   "pt-BR": "O que deu certo?",
   "fr": "Qu'est-ce qui a bien marché ?"
  },
  "¿Qué te costó?": {
   "en": "What was hard?",
   "pt-BR": "O que foi difícil?",
   "fr": "Qu'est-ce qui a été difficile ?"
  },
  "Dudas o comentarios para tu especialista": {
   "en": "Questions or comments for your specialist",
   "pt-BR": "Dúvidas ou comentários para seu especialista",
   "fr": "Questions ou commentaires pour votre spécialiste"
  },
  "Si quieres que revise tu físico, sube y comparte las fotos de esta semana en Fotos de progreso.": {
   "en": "If you want your physique reviewed, upload and share this week's photos in Progress photos.",
   "pt-BR": "Se quiser que revise seu físico, envie e compartilhe as fotos desta semana em Fotos de progresso.",
   "fr": "Pour faire évaluer votre physique, ajoutez et partagez les photos de la semaine dans Photos de progression."
  },
  "Responde al menos tres de las escalas de cómo te sentiste.": {
   "en": "Answer at least three of the how-you-felt scales.",
   "pt-BR": "Responda pelo menos três das escalas de como se sentiu.",
   "fr": "Répondez à au moins trois des échelles de ressenti."
  },
  "Revisa los números: alguno está fuera de rango.": {
   "en": "Check the numbers: one is out of range.",
   "pt-BR": "Revise os números: algum está fora da faixa.",
   "fr": "Vérifiez les chiffres : l'un est hors plage."
  },
  "Envié mi check-in de la semana.": {
   "en": "I sent my weekly check-in.",
   "pt-BR": "Enviei meu check-in da semana.",
   "fr": "J'ai envoyé mon bilan de la semaine."
  },
  "Hacer el check-in de esta semana": {
   "en": "Do this week's check-in",
   "pt-BR": "Fazer o check-in desta semana",
   "fr": "Faire le bilan de cette semaine"
  },
  "Enviado · sin respuesta todavía": {
   "en": "Sent · no reply yet",
   "pt-BR": "Enviado · ainda sem resposta",
   "fr": "Envoyé · pas encore de réponse"
  },
  "Editar este check-in": {
   "en": "Edit this check-in",
   "pt-BR": "Editar este check-in",
   "fr": "Modifier ce bilan"
  },
  "Aún no has enviado ningún check-in. Es el reporte semanal con el que tu especialista ajusta tu plan.": {
   "en": "You haven't sent a check-in yet. It's the weekly report your specialist uses to adjust your plan.",
   "pt-BR": "Você ainda não enviou nenhum check-in. É o relatório semanal com que seu especialista ajusta seu plano.",
   "fr": "Vous n'avez pas encore envoyé de bilan. C'est le rapport hebdomadaire avec lequel votre spécialiste ajuste votre plan."
  },
  "Semanas anteriores": {
   "en": "Previous weeks",
   "pt-BR": "Semanas anteriores",
   "fr": "Semaines précédentes"
  },
  "Sin respuesta": {
   "en": "No reply",
   "pt-BR": "Sem resposta",
   "fr": "Sans réponse"
  },
  "Peso promedio": {
   "en": "Average weight",
   "pt-BR": "Peso médio",
   "fr": "Poids moyen"
  },
  "por semana": {
   "en": "per week",
   "pt-BR": "por semana",
   "fr": "par semaine"
  },
  "Cumplimiento de dieta": {
   "en": "Diet adherence",
   "pt-BR": "Adesão à dieta",
   "fr": "Adhérence au régime"
  },
  "Cumplimiento de entreno": {
   "en": "Training adherence",
   "pt-BR": "Adesão ao treino",
   "fr": "Adhérence à l'entraînement"
  },
  "Horas de sueño": {
   "en": "Hours of sleep",
   "pt-BR": "Horas de sono",
   "fr": "Heures de sommeil"
  },
  "Pasos por día": {
   "en": "Steps per day",
   "pt-BR": "Passos por dia",
   "fr": "Pas par jour"
  },
  "Cómo se sintió": {
   "en": "How they felt",
   "pt-BR": "Como se sentiu",
   "fr": "Ressenti"
  },
  "Respuesta": {
   "en": "Reply",
   "pt-BR": "Resposta",
   "fr": "Réponse"
  },
  "Tu especialista": {
   "en": "Your specialist",
   "pt-BR": "Seu especialista",
   "fr": "Votre spécialiste"
  },
  "Check-ins por revisar": {
   "en": "Check-ins to review",
   "pt-BR": "Check-ins para revisar",
   "fr": "Bilans à revoir"
  },
  "Ya respondiste": {
   "en": "You already replied",
   "pt-BR": "Você já respondeu",
   "fr": "Vous avez déjà répondu"
  },
  "Sin responder": {
   "en": "Not answered",
   "pt-BR": "Sem responder",
   "fr": "Sans réponse"
  },
  "enviado": {
   "en": "sent",
   "pt-BR": "enviado",
   "fr": "envoyé"
  },
  "Tu respuesta": {
   "en": "Your reply",
   "pt-BR": "Sua resposta",
   "fr": "Votre réponse"
  },
  "Agregar otra respuesta": {
   "en": "Add another reply",
   "pt-BR": "Adicionar outra resposta",
   "fr": "Ajouter une autre réponse"
  },
  "Qué se queda igual, qué cambia y en qué enfocarse esta semana.": {
   "en": "What stays, what changes and what to focus on this week.",
   "pt-BR": "O que fica igual, o que muda e no que focar esta semana.",
   "fr": "Ce qui reste, ce qui change et sur quoi se concentrer cette semaine."
  },
  "Todo bien, seguimos igual esta semana.": {
   "en": "All good, we keep the same this week.",
   "pt-BR": "Tudo certo, seguimos igual esta semana.",
   "fr": "Tout va bien, on garde la même chose cette semaine."
  },
  "Bajamos un poco las calorías; te actualizo el plan.": {
   "en": "We lower calories a bit; I'll update your plan.",
   "pt-BR": "Baixamos um pouco as calorias; atualizo seu plano.",
   "fr": "On baisse un peu les calories ; je mets à jour votre plan."
  },
  "Subimos el cardio; te digo cuánto.": {
   "en": "We increase cardio; I'll tell you how much.",
   "pt-BR": "Aumentamos o cardio; te digo quanto.",
   "fr": "On augmente le cardio ; je vous dis de combien."
  },
  "Prioriza el sueño esta semana.": {
   "en": "Prioritize sleep this week.",
   "pt-BR": "Priorize o sono esta semana.",
   "fr": "Priorisez le sommeil cette semaine."
  },
  "Enviar respuesta": {
   "en": "Send reply",
   "pt-BR": "Enviar resposta",
   "fr": "Envoyer la réponse"
  },
  "Escribe tu respuesta.": {
   "en": "Write your reply.",
   "pt-BR": "Escreva sua resposta.",
   "fr": "Écrivez votre réponse."
  },
  "Respondí tu check-in:": {
   "en": "I replied to your check-in:",
   "pt-BR": "Respondi seu check-in:",
   "fr": "J'ai répondu à votre bilan :"
  },
  "Últimas semanas": {
   "en": "Recent weeks",
   "pt-BR": "Últimas semanas",
   "fr": "Dernières semaines"
  },
  "Todas las semanas": {
   "en": "All weeks",
   "pt-BR": "Todas as semanas",
   "fr": "Toutes les semaines"
  },
  "Dieta %": {
   "en": "Diet %",
   "pt-BR": "Dieta %",
   "fr": "Régime %"
  },
  "Entreno %": {
   "en": "Training %",
   "pt-BR": "Treino %",
   "fr": "Entraîn. %"
  },
  "Este atleta aún no envía check-ins. Le aparece en Hoy cada semana; al enviarlo te llega un mensaje.": {
   "en": "This athlete hasn't sent check-ins yet. It shows in Today every week; you get a message when sent.",
   "pt-BR": "Este atleta ainda não enviou check-ins. Aparece em Hoje toda semana; ao enviar você recebe uma mensagem.",
   "fr": "Cet athlète n'a pas encore envoyé de bilan. Il apparaît dans Aujourd'hui chaque semaine ; vous recevez un message à l'envoi."
  },
  "Cambio desde": {
   "en": "Change since",
   "pt-BR": "Mudança desde",
   "fr": "Variation depuis"
  },
  "Al inicio": {
   "en": "At start",
   "pt-BR": "No início",
   "fr": "Au début"
  },
  "Evaluación": {
   "en": "Assessment",
   "pt-BR": "Avaliação",
   "fr": "Évaluation"
  },
  "Composición corporal": {
   "en": "Body composition",
   "pt-BR": "Composição corporal",
   "fr": "Composition corporelle"
  },
  "Mediciones, % de grasa e índices": {
   "en": "Measurements, body fat % and indices",
   "pt-BR": "Medidas, % de gordura e índices",
   "fr": "Mesures, % de graisse et indices"
  },
  "Nueva evaluación": {
   "en": "New assessment",
   "pt-BR": "Nova avaliação",
   "fr": "Nouvelle évaluation"
  },
  "Editar evaluación": {
   "en": "Edit assessment",
   "pt-BR": "Editar avaliação",
   "fr": "Modifier l'évaluation"
  },
  "Evaluación de": {
   "en": "Assessment for",
   "pt-BR": "Avaliação de",
   "fr": "Évaluation de"
  },
  "Aún no hay evaluaciones. Registra peso, talla, pliegues y perímetros; la app calcula IMC, % de grasa, masa libre de grasa, índices y gasto energético.": {
   "en": "No assessments yet. Record weight, height, skinfolds and girths; the app calculates BMI, body fat %, fat-free mass, indices and energy expenditure.",
   "pt-BR": "Ainda não há avaliações. Registre peso, altura, dobras e perímetros; o app calcula IMC, % de gordura, massa livre de gordura, índices e gasto energético.",
   "fr": "Aucune évaluation. Saisissez poids, taille, plis et périmètres ; l'app calcule l'IMC, le % de graisse, la masse maigre, les indices et la dépense énergétique."
  },
  "Fecha": {
   "en": "Date",
   "pt-BR": "Data",
   "fr": "Date"
  },
  "Talla": {
   "en": "Height",
   "pt-BR": "Altura",
   "fr": "Taille"
  },
  "Pliegues cutáneos": {
   "en": "Skinfolds",
   "pt-BR": "Dobras cutâneas",
   "fr": "Plis cutanés"
  },
  "Pliegues": {
   "en": "Skinfolds",
   "pt-BR": "Dobras",
   "fr": "Plis"
  },
  "pliegues": {
   "en": "skinfolds",
   "pt-BR": "dobras",
   "fr": "plis"
  },
  "Perímetros": {
   "en": "Girths",
   "pt-BR": "Perímetros",
   "fr": "Périmètres"
  },
  "Diámetros óseos": {
   "en": "Bone breadths",
   "pt-BR": "Diâmetros ósseos",
   "fr": "Diamètres osseux"
  },
  "Otros datos": {
   "en": "Other data",
   "pt-BR": "Outros dados",
   "fr": "Autres données"
  },
  "Lado derecho, con plicómetro. Puedes escribir 2 o 3 tomas separadas por espacio (ej.": {
   "en": "Right side, with a caliper. You can enter 2 or 3 takes separated by a space (e.g.",
   "pt-BR": "Lado direito, com adipômetro. Você pode digitar 2 ou 3 medidas separadas por espaço (ex.",
   "fr": "Côté droit, avec une pince. Vous pouvez saisir 2 ou 3 prises séparées par un espace (ex."
  },
  "): con dos se promedian y con tres se usa la mediana.": {
   "en": "): two are averaged, three use the median.",
   "pt-BR": "): com duas faz-se a média e com três usa-se a mediana.",
   "fr": ") : deux sont moyennées, trois utilisent la médiane."
  },
  "Para el somatotipo.": {
   "en": "For the somatotype.",
   "pt-BR": "Para o somatotipo.",
   "fr": "Pour le somatotype."
  },
  "% de grasa por bioimpedancia": {
   "en": "Body fat % by bioimpedance",
   "pt-BR": "% de gordura por bioimpedância",
   "fr": "% de graisse par bio-impédance"
  },
  "FC en reposo": {
   "en": "Resting HR",
   "pt-BR": "FC em repouso",
   "fr": "FC au repos"
  },
  "Presión arterial": {
   "en": "Blood pressure",
   "pt-BR": "Pressão arterial",
   "fr": "Tension artérielle"
  },
  "% de grasa objetivo": {
   "en": "Target body fat %",
   "pt-BR": "% de gordura alvo",
   "fr": "% de graisse cible"
  },
  "Método principal de % de grasa": {
   "en": "Main body fat method",
   "pt-BR": "Método principal de % de gordura",
   "fr": "Méthode principale de % de graisse"
  },
  "Automático (el más completo)": {
   "en": "Automatic (most complete)",
   "pt-BR": "Automático (o mais completo)",
   "fr": "Automatique (la plus complète)"
  },
  "Bioimpedancia": {
   "en": "Bioimpedance",
   "pt-BR": "Bioimpedância",
   "fr": "Bio-impédance"
  },
  "Condiciones de la medición, observaciones...": {
   "en": "Measurement conditions, remarks...",
   "pt-BR": "Condições da medição, observações...",
   "fr": "Conditions de mesure, remarques..."
  },
  "Captura al menos edad, peso y talla.": {
   "en": "Enter at least age, weight and height.",
   "pt-BR": "Informe ao menos idade, peso e altura.",
   "fr": "Saisissez au moins l'âge, le poids et la taille."
  },
  "Revisa edad, peso y talla: algún valor está fuera de rango.": {
   "en": "Check age, weight and height: a value is out of range.",
   "pt-BR": "Revise idade, peso e altura: algum valor está fora da faixa.",
   "fr": "Vérifiez âge, poids et taille : une valeur est hors plage."
  },
  "Revisa las mediciones: pliegues en mm, perímetros y diámetros en cm.": {
   "en": "Check the measurements: skinfolds in mm, girths and breadths in cm.",
   "pt-BR": "Revise as medidas: dobras em mm, perímetros e diâmetros em cm.",
   "fr": "Vérifiez les mesures : plis en mm, périmètres et diamètres en cm."
  },
  "Completa los pliegues de algún método para calcular el % de grasa.": {
   "en": "Fill in the skinfolds of one method to calculate body fat %.",
   "pt-BR": "Preencha as dobras de algum método para calcular o % de gordura.",
   "fr": "Renseignez les plis d'une méthode pour calculer le % de graisse."
  },
  "Método:": {
   "en": "Method:",
   "pt-BR": "Método:",
   "fr": "Méthode :"
  },
  "Σ pliegues": {
   "en": "Σ skinfolds",
   "pt-BR": "Σ dobras",
   "fr": "Σ plis"
  },
  "Σ 6 pliegues": {
   "en": "Σ 6 skinfolds",
   "pt-BR": "Σ 6 dobras",
   "fr": "Σ 6 plis"
  },
  "% de grasa": {
   "en": "Body fat %",
   "pt-BR": "% de gordura",
   "fr": "% de graisse"
  },
  "Masa grasa": {
   "en": "Fat mass",
   "pt-BR": "Massa gorda",
   "fr": "Masse grasse"
  },
  "Masa libre de grasa": {
   "en": "Fat-free mass",
   "pt-BR": "Massa livre de gordura",
   "fr": "Masse maigre"
  },
  "Masa muscular": {
   "en": "Muscle mass",
   "pt-BR": "Massa muscular",
   "fr": "Masse musculaire"
  },
  "IMC": {
   "en": "BMI",
   "pt-BR": "IMC",
   "fr": "IMC"
  },
  "IMG": {
   "en": "FMI",
   "pt-BR": "IMG",
   "fr": "IMG"
  },
  "IMLG": {
   "en": "FFMI",
   "pt-BR": "IMLG",
   "fr": "IMM"
  },
  "ICC": {
   "en": "WHR",
   "pt-BR": "RCQ",
   "fr": "RTH"
  },
  "ICT": {
   "en": "WHtR",
   "pt-BR": "RCE",
   "fr": "RTT"
  },
  "Índice de masa grasa": {
   "en": "Fat mass index",
   "pt-BR": "Índice de massa gorda",
   "fr": "Indice de masse grasse"
  },
  "Índice de masa libre de grasa": {
   "en": "Fat-free mass index",
   "pt-BR": "Índice de massa livre de gordura",
   "fr": "Indice de masse maigre"
  },
  "Normalizado": {
   "en": "Normalized",
   "pt-BR": "Normalizado",
   "fr": "Normalisé"
  },
  "del peso": {
   "en": "of body weight",
   "pt-BR": "do peso",
   "fr": "du poids"
  },
  "Cintura": {
   "en": "Waist",
   "pt-BR": "Cintura",
   "fr": "Tour de taille"
  },
  "Área muscular del brazo": {
   "en": "Arm muscle area",
   "pt-BR": "Área muscular do braço",
   "fr": "Surface musculaire du bras"
  },
  "% de grasa por método": {
   "en": "Body fat % by method",
   "pt-BR": "% de gordura por método",
   "fr": "% de graisse par méthode"
  },
  "principal": {
   "en": "main",
   "pt-BR": "principal",
   "fr": "principale"
  },
  "Promedio de los métodos": {
   "en": "Average of methods",
   "pt-BR": "Média dos métodos",
   "fr": "Moyenne des méthodes"
  },
  "Estimado solo con IMC (Deurenberg)": {
   "en": "Estimated from BMI only (Deurenberg)",
   "pt-BR": "Estimado só com IMC (Deurenberg)",
   "fr": "Estimé avec l'IMC seul (Deurenberg)"
  },
  "referencia; no distingue músculo de grasa": {
   "en": "reference; does not tell muscle from fat",
   "pt-BR": "referência; não distingue músculo de gordura",
   "fr": "référence ; ne distingue pas muscle et graisse"
  },
  "Somatotipo (Heath-Carter)": {
   "en": "Somatotype (Heath-Carter)",
   "pt-BR": "Somatotipo (Heath-Carter)",
   "fr": "Somatotype (Heath-Carter)"
  },
  "Endomorfia": {
   "en": "Endomorphy",
   "pt-BR": "Endomorfia",
   "fr": "Endomorphie"
  },
  "Mesomorfia": {
   "en": "Mesomorphy",
   "pt-BR": "Mesomorfia",
   "fr": "Mésomorphie"
  },
  "Ectomorfia": {
   "en": "Ectomorphy",
   "pt-BR": "Ectomorfia",
   "fr": "Ectomorphie"
  },
  "Para el somatotipo completo faltan diámetros de húmero y fémur, brazo contraído y pantorrilla.": {
   "en": "The full somatotype needs humerus and femur breadths, flexed arm and calf.",
   "pt-BR": "Para o somatotipo completo faltam diâmetros de úmero e fêmur, braço contraído e panturrilha.",
   "fr": "Le somatotype complet nécessite les diamètres de l'humérus et du fémur, le bras contracté et le mollet."
  },
  "Gasto energético en reposo": {
   "en": "Resting energy expenditure",
   "pt-BR": "Gasto energético em repouso",
   "fr": "Dépense énergétique au repos"
  },
  "Promedio de las fórmulas": {
   "en": "Average of formulas",
   "pt-BR": "Média das fórmulas",
   "fr": "Moyenne des formules"
  },
  "Gasto total del día": {
   "en": "Total daily expenditure",
   "pt-BR": "Gasto total do dia",
   "fr": "Dépense totale du jour"
  },
  "factor de actividad": {
   "en": "activity factor",
   "pt-BR": "fator de atividade",
   "fr": "facteur d'activité"
  },
  "Peso objetivo": {
   "en": "Target weight",
   "pt-BR": "Peso alvo",
   "fr": "Poids cible"
  },
  "de grasa y la misma masa libre de grasa pesaría": {
   "en": "body fat with the same fat-free mass, weight would be",
   "pt-BR": "de gordura e a mesma massa livre de gordura pesaria",
   "fr": "de graisse et la même masse maigre, le poids serait de"
  },
  "Peso con IMC entre 18.5 y 24.9:": {
   "en": "Weight at BMI 18.5–24.9:",
   "pt-BR": "Peso com IMC entre 18,5 e 24,9:",
   "fr": "Poids pour un IMC de 18,5 à 24,9 :"
  },
  "Frecuencia cardiaca": {
   "en": "Heart rate",
   "pt-BR": "Frequência cardíaca",
   "fr": "Fréquence cardiaque"
  },
  "FC máxima estimada": {
   "en": "Estimated max HR",
   "pt-BR": "FC máxima estimada",
   "fr": "FC max estimée"
  },
  "Zonas por reserva de frecuencia cardiaca (Karvonen).": {
   "en": "Zones by heart rate reserve (Karvonen).",
   "pt-BR": "Zonas por reserva de frequência cardíaca (Karvonen).",
   "fr": "Zones par réserve de fréquence cardiaque (Karvonen)."
  },
  "Zonas por porcentaje de la FC máxima. Con la FC en reposo se calculan por reserva.": {
   "en": "Zones by percentage of max HR. With resting HR they are calculated by reserve.",
   "pt-BR": "Zonas por porcentagem da FC máxima. Com a FC em repouso são calculadas por reserva.",
   "fr": "Zones en pourcentage de la FC max. Avec la FC au repos, elles sont calculées par réserve."
  },
  "Evolución": {
   "en": "Progress",
   "pt-BR": "Evolução",
   "fr": "Évolution"
  },
  "cambios vs.": {
   "en": "changes vs.",
   "pt-BR": "mudanças vs.",
   "fr": "variations vs"
  },
  "sin cambio": {
   "en": "no change",
   "pt-BR": "sem mudança",
   "fr": "inchangé"
  },
  "¿Eliminar esta evaluación?": {
   "en": "Delete this assessment?",
   "pt-BR": "Excluir esta avaliação?",
   "fr": "Supprimer cette évaluation ?"
  },
  "Estimaciones de campo. Sirven para comparar a la misma persona con el mismo método y la misma técnica; no sustituyen una valoración clínica.": {
   "en": "Field estimates. Useful to compare the same person with the same method and technique; they do not replace a clinical assessment.",
   "pt-BR": "Estimativas de campo. Servem para comparar a mesma pessoa com o mesmo método e técnica; não substituem uma avaliação clínica.",
   "fr": "Estimations de terrain. Utiles pour comparer la même personne avec la même méthode et la même technique ; elles ne remplacent pas une évaluation clinique."
  },
  "Registré tu evaluación de composición corporal.": {
   "en": "I recorded your body composition assessment.",
   "pt-BR": "Registrei sua avaliação de composição corporal.",
   "fr": "J'ai enregistré votre évaluation de composition corporelle."
  },
  "Evaluación antropométrica · Rutinal": {
   "en": "Anthropometric assessment · Rutinal",
   "pt-BR": "Avaliação antropométrica · Rutinal",
   "fr": "Évaluation anthropométrique · Rutinal"
  },
  "Subescapular": {
   "en": "Subscapular",
   "pt-BR": "Subescapular",
   "fr": "Sous-scapulaire"
  },
  "Cresta ilíaca (suprailíaco)": {
   "en": "Iliac crest (suprailiac)",
   "pt-BR": "Crista ilíaca (suprailíaca)",
   "fr": "Crête iliaque (supra-iliaque)"
  },
  "Supraespinal": {
   "en": "Supraspinale",
   "pt-BR": "Supraespinal",
   "fr": "Supra-épineux"
  },
  "Abdominal": {
   "en": "Abdominal",
   "pt-BR": "Abdominal",
   "fr": "Abdominal"
  },
  "Pectoral": {
   "en": "Chest",
   "pt-BR": "Peitoral",
   "fr": "Pectoral"
  },
  "Axilar medio": {
   "en": "Midaxillary",
   "pt-BR": "Axilar média",
   "fr": "Axillaire moyen"
  },
  "Muslo anterior": {
   "en": "Front thigh",
   "pt-BR": "Coxa anterior",
   "fr": "Cuisse antérieure"
  },
  "Pantorrilla medial": {
   "en": "Medial calf",
   "pt-BR": "Panturrilha medial",
   "fr": "Mollet médial"
  },
  "Tórax": {
   "en": "Chest",
   "pt-BR": "Tórax",
   "fr": "Thorax"
  },
  "Brazo relajado": {
   "en": "Arm relaxed",
   "pt-BR": "Braço relaxado",
   "fr": "Bras relâché"
  },
  "Brazo contraído": {
   "en": "Arm flexed",
   "pt-BR": "Braço contraído",
   "fr": "Bras contracté"
  },
  "Antebrazo": {
   "en": "Forearm",
   "pt-BR": "Antebraço",
   "fr": "Avant-bras"
  },
  "Abdomen (ombligo)": {
   "en": "Abdomen (navel)",
   "pt-BR": "Abdômen (umbigo)",
   "fr": "Abdomen (nombril)"
  },
  "Cadera": {
   "en": "Hip",
   "pt-BR": "Quadril",
   "fr": "Hanches"
  },
  "Muslo medio": {
   "en": "Mid thigh",
   "pt-BR": "Coxa média",
   "fr": "Mi-cuisse"
  },
  "Pantorrilla": {
   "en": "Calf",
   "pt-BR": "Panturrilha",
   "fr": "Mollet"
  },
  "Húmero (codo)": {
   "en": "Humerus (elbow)",
   "pt-BR": "Úmero (cotovelo)",
   "fr": "Humérus (coude)"
  },
  "Fémur (rodilla)": {
   "en": "Femur (knee)",
   "pt-BR": "Fêmur (joelho)",
   "fr": "Fémur (genou)"
  },
  "Muñeca": {
   "en": "Wrist",
   "pt-BR": "Punho",
   "fr": "Poignet"
  },
  "Ligero (1–3 días/sem)": {
   "en": "Light (1–3 days/wk)",
   "pt-BR": "Leve (1–3 dias/sem)",
   "fr": "Léger (1–3 j/sem)"
  },
  "Moderado (3–5 días/sem)": {
   "en": "Moderate (3–5 days/wk)",
   "pt-BR": "Moderado (3–5 dias/sem)",
   "fr": "Modéré (3–5 j/sem)"
  },
  "Intenso (6–7 días/sem)": {
   "en": "Hard (6–7 days/wk)",
   "pt-BR": "Intenso (6–7 dias/sem)",
   "fr": "Intense (6–7 j/sem)"
  },
  "Muy intenso (doble sesión)": {
   "en": "Very hard (two-a-days)",
   "pt-BR": "Muito intenso (dois treinos)",
   "fr": "Très intense (biquotidien)"
  },
  "Bajo peso": {
   "en": "Underweight",
   "pt-BR": "Baixo peso",
   "fr": "Insuffisance pondérale"
  },
  "Sobrepeso": {
   "en": "Overweight",
   "pt-BR": "Sobrepeso",
   "fr": "Surpoids"
  },
  "Obesidad I": {
   "en": "Obesity I",
   "pt-BR": "Obesidade I",
   "fr": "Obésité I"
  },
  "Obesidad II": {
   "en": "Obesity II",
   "pt-BR": "Obesidade II",
   "fr": "Obésité II"
  },
  "Obesidad III": {
   "en": "Obesity III",
   "pt-BR": "Obesidade III",
   "fr": "Obésité III"
  },
  "Grasa esencial": {
   "en": "Essential fat",
   "pt-BR": "Gordura essencial",
   "fr": "Graisse essentielle"
  },
  "Atlético": {
   "en": "Athletic",
   "pt-BR": "Atlético",
   "fr": "Athlétique"
  },
  "En forma": {
   "en": "Fit",
   "pt-BR": "Em forma",
   "fr": "En forme"
  },
  "Sin riesgo": {
   "en": "No risk",
   "pt-BR": "Sem risco",
   "fr": "Sans risque"
  },
  "Riesgo aumentado": {
   "en": "Increased risk",
   "pt-BR": "Risco aumentado",
   "fr": "Risque accru"
  },
  "Riesgo alto": {
   "en": "High risk",
   "pt-BR": "Risco alto",
   "fr": "Risque élevé"
  },
  "Durnin-Womersley (4 pliegues)": {
   "en": "Durnin-Womersley (4 skinfolds)",
   "pt-BR": "Durnin-Womersley (4 dobras)",
   "fr": "Durnin-Womersley (4 plis)"
  },
  "Jackson-Pollock (7 pliegues)": {
   "en": "Jackson-Pollock (7 skinfolds)",
   "pt-BR": "Jackson-Pollock (7 dobras)",
   "fr": "Jackson-Pollock (7 plis)"
  },
  "Jackson-Pollock (3 pliegues)": {
   "en": "Jackson-Pollock (3 skinfolds)",
   "pt-BR": "Jackson-Pollock (3 dobras)",
   "fr": "Jackson-Pollock (3 plis)"
  },
  "Faulkner (4 pliegues)": {
   "en": "Faulkner (4 skinfolds)",
   "pt-BR": "Faulkner (4 dobras)",
   "fr": "Faulkner (4 plis)"
  },
  "Yuhasz (6 pliegues)": {
   "en": "Yuhasz (6 skinfolds)",
   "pt-BR": "Yuhasz (6 dobras)",
   "fr": "Yuhasz (6 plis)"
  },
  "Perímetros (Marina de EE. UU.)": {
   "en": "Girths (US Navy)",
   "pt-BR": "Perímetros (Marinha dos EUA)",
   "fr": "Périmètres (US Navy)"
  },
  "Bioimpedancia / equipo": {
   "en": "Bioimpedance / device",
   "pt-BR": "Bioimpedância / aparelho",
   "fr": "Bio-impédance / appareil"
  },
  "Katch-McArdle (masa libre de grasa)": {
   "en": "Katch-McArdle (fat-free mass)",
   "pt-BR": "Katch-McArdle (massa livre de gordura)",
   "fr": "Katch-McArdle (masse maigre)"
  },
  "Cunningham (masa libre de grasa)": {
   "en": "Cunningham (fat-free mass)",
   "pt-BR": "Cunningham (massa livre de gordura)",
   "fr": "Cunningham (masse maigre)"
  },
  "Harris-Benedict (rev. 1984)": {
   "en": "Harris-Benedict (rev. 1984)",
   "pt-BR": "Harris-Benedict (rev. 1984)",
   "fr": "Harris-Benedict (rév. 1984)"
  },
  "Z1 · recuperación": {
   "en": "Z1 · recovery",
   "pt-BR": "Z1 · recuperação",
   "fr": "Z1 · récupération"
  },
  "Z2 · base aeróbica": {
   "en": "Z2 · aerobic base",
   "pt-BR": "Z2 · base aeróbica",
   "fr": "Z2 · base aérobie"
  },
  "Z3 · tempo": {
   "en": "Z3 · tempo",
   "pt-BR": "Z3 · tempo",
   "fr": "Z3 · tempo"
  },
  "Z4 · umbral": {
   "en": "Z4 · threshold",
   "pt-BR": "Z4 · limiar",
   "fr": "Z4 · seuil"
  },
  "Z5 · máximo": {
   "en": "Z5 · max",
   "pt-BR": "Z5 · máximo",
   "fr": "Z5 · maximum"
  },
  "Dieta prehecha": {
   "en": "Ready-made diet",
   "pt-BR": "Dieta pronta",
   "fr": "Régime prêt à l'emploi"
  },
  "Dietas prehechas": {
   "en": "Ready-made diets",
   "pt-BR": "Dietas prontas",
   "fr": "Régimes prêts à l'emploi"
  },
  "Por equivalentes": {
   "en": "By exchanges",
   "pt-BR": "Por equivalentes",
   "fr": "Par équivalents"
  },
  "por equivalentes": {
   "en": "by exchanges",
   "pt-BR": "por equivalentes",
   "fr": "par équivalents"
  },
  "Plan por equivalentes": {
   "en": "Exchange plan",
   "pt-BR": "Plano por equivalentes",
   "fr": "Plan par équivalents"
  },
  "Editar plan por equivalentes": {
   "en": "Edit exchange plan",
   "pt-BR": "Editar plano por equivalentes",
   "fr": "Modifier le plan par équivalents"
  },
  "Menú con alimentos y gramos": {
   "en": "Menu with foods and grams",
   "pt-BR": "Cardápio com alimentos e gramas",
   "fr": "Menu avec aliments et grammes"
  },
  "Elige tipo y calorías; se arma sola con equivalentes y la ajustas.": {
   "en": "Pick type and calories; it builds itself with exchanges and you adjust it.",
   "pt-BR": "Escolha tipo e calorias; monta-se sozinha com equivalentes e você ajusta.",
   "fr": "Choisissez le type et les calories ; il se construit avec des équivalents et vous l'ajustez."
  },
  "Tú defines cuántos equivalentes de cada grupo van en cada comida.": {
   "en": "You set how many exchanges of each group go in each meal.",
   "pt-BR": "Você define quantos equivalentes de cada grupo vão em cada refeição.",
   "fr": "Vous définissez combien d'équivalents de chaque groupe vont à chaque repas."
  },
  "Un menú fijo, alimento por alimento.": {
   "en": "A fixed menu, food by food.",
   "pt-BR": "Um cardápio fixo, alimento por alimento.",
   "fr": "Un menu fixe, aliment par aliment."
  },
  "Elige el tipo de plan y las calorías. Se arma con el sistema de equivalentes y lo puedes ajustar antes de guardarlo.": {
   "en": "Pick the plan type and calories. It is built with the exchange system and you can adjust it before saving.",
   "pt-BR": "Escolha o tipo de plano e as calorias. É montado com o sistema de equivalentes e você pode ajustar antes de salvar.",
   "fr": "Choisissez le type de plan et les calories. Il est construit avec le système d'équivalents et vous pouvez l'ajuster avant d'enregistrer."
  },
  "Equilibrada": {
   "en": "Balanced",
   "pt-BR": "Equilibrada",
   "fr": "Équilibré"
  },
  "Baja en carbohidratos": {
   "en": "Low carb",
   "pt-BR": "Baixa em carboidratos",
   "fr": "Pauvre en glucides"
  },
  "Reparto clásico para mantener o bajar de peso sin extremos.": {
   "en": "Classic split to maintain or lose weight without extremes.",
   "pt-BR": "Divisão clássica para manter ou perder peso sem extremos.",
   "fr": "Répartition classique pour maintenir ou perdre du poids sans excès."
  },
  "Para definición o recomposición con entrenamiento de fuerza.": {
   "en": "For cutting or recomposition with strength training.",
   "pt-BR": "Para definição ou recomposição com treino de força.",
   "fr": "Pour la sèche ou la recomposition avec musculation."
  },
  "Más carbohidrato para subir masa muscular y rendir en el entrenamiento.": {
   "en": "More carbs to gain muscle and perform in training.",
   "pt-BR": "Mais carboidrato para ganhar massa muscular e render no treino.",
   "fr": "Plus de glucides pour prendre du muscle et performer à l'entraînement."
  },
  "Menos cereales y fruta, más grasa y proteína.": {
   "en": "Fewer grains and fruit, more fat and protein.",
   "pt-BR": "Menos cereais e fruta, mais gordura e proteína.",
   "fr": "Moins de céréales et de fruits, plus de lipides et de protéines."
  },
  "Calorías del día": {
   "en": "Daily calories",
   "pt-BR": "Calorias do dia",
   "fr": "Calories du jour"
  },
  "Usar y ajustar": {
   "en": "Use and adjust",
   "pt-BR": "Usar e ajustar",
   "fr": "Utiliser et ajuster"
  },
  "Meta kcal": {
   "en": "Goal kcal",
   "pt-BR": "Meta kcal",
   "fr": "Objectif kcal"
  },
  "% Proteína": {
   "en": "% Protein",
   "pt-BR": "% Proteína",
   "fr": "% Protéines"
  },
  "% Carbos": {
   "en": "% Carbs",
   "pt-BR": "% Carbos",
   "fr": "% Glucides"
  },
  "% Grasa": {
   "en": "% Fat",
   "pt-BR": "% Gordura",
   "fr": "% Lipides"
  },
  "Calcular equivalentes para esta meta": {
   "en": "Calculate exchanges for this goal",
   "pt-BR": "Calcular equivalentes para esta meta",
   "fr": "Calculer les équivalents pour cet objectif"
  },
  "Reparto real:": {
   "en": "Actual split:",
   "pt-BR": "Divisão real:",
   "fr": "Répartition réelle :"
  },
  "adecuación ideal: 95–105%": {
   "en": "ideal adequacy: 95–105%",
   "pt-BR": "adequação ideal: 95–105%",
   "fr": "adéquation idéale : 95–105 %"
  },
  "Grupo": {
   "en": "Group",
   "pt-BR": "Grupo",
   "fr": "Groupe"
  },
  "Des": {
   "en": "Bkf",
   "pt-BR": "Café",
   "fr": "P-déj"
  },
  "Com": {
   "en": "Lun",
   "pt-BR": "Alm",
   "fr": "Déj"
  },
  "Col": {
   "en": "Snk",
   "pt-BR": "Lan",
   "fr": "Coll"
  },
  "Colaciones": {
   "en": "Snacks",
   "pt-BR": "Lanches",
   "fr": "Collations"
  },
  "Agregar otro grupo": {
   "en": "Add another group",
   "pt-BR": "Adicionar outro grupo",
   "fr": "Ajouter un autre groupe"
  },
  "Elige…": {
   "en": "Choose…",
   "pt-BR": "Escolha…",
   "fr": "Choisir…"
  },
  "Indicaciones para el atleta (opcional)": {
   "en": "Notes for the athlete (optional)",
   "pt-BR": "Orientações para o atleta (opcional)",
   "fr": "Consignes pour l'athlète (facultatif)"
  },
  "Ponle nombre al plan.": {
   "en": "Give the plan a name.",
   "pt-BR": "Dê um nome ao plano.",
   "fr": "Donnez un nom au plan."
  },
  "Agrega al menos un equivalente.": {
   "en": "Add at least one exchange.",
   "pt-BR": "Adicione ao menos um equivalente.",
   "fr": "Ajoutez au moins un équivalent."
  },
  "Los porcentajes de macros deben sumar 100.": {
   "en": "Macro percentages must add up to 100.",
   "pt-BR": "As porcentagens de macros devem somar 100.",
   "fr": "Les pourcentages de macros doivent totaliser 100."
  },
  "Toca un grupo para ver qué puedes comer y registrarlo.": {
   "en": "Tap a group to see what you can eat and log it.",
   "pt-BR": "Toque em um grupo para ver o que pode comer e registrar.",
   "fr": "Touchez un groupe pour voir ce que vous pouvez manger et l'enregistrer."
  },
  "equivalente": {
   "en": "exchange",
   "pt-BR": "equivalente",
   "fr": "équivalent"
  },
  "equivalentes": {
   "en": "exchanges",
   "pt-BR": "equivalentes",
   "fr": "équivalents"
  },
  "1 equivalente =": {
   "en": "1 exchange =",
   "pt-BR": "1 equivalente =",
   "fr": "1 équivalent ="
  },
  "Cada equivalente aporta cerca de": {
   "en": "Each exchange provides about",
   "pt-BR": "Cada equivalente fornece cerca de",
   "fr": "Chaque équivalent apporte environ"
  },
  "Elige cualquiera de la lista; puedes combinar.": {
   "en": "Pick any from the list; you can combine.",
   "pt-BR": "Escolha qualquer um da lista; pode combinar.",
   "fr": "Choisissez dans la liste ; vous pouvez combiner."
  },
  "Porciones de referencia del Sistema Mexicano de Alimentos Equivalentes. Tu nutriólogo puede indicarte otras.": {
   "en": "Reference portions from the Mexican Food Exchange System. Your nutritionist may give you others.",
   "pt-BR": "Porções de referência do Sistema Mexicano de Alimentos Equivalentes. Seu nutricionista pode indicar outras.",
   "fr": "Portions de référence du Système mexicain d'équivalents alimentaires. Votre nutritionniste peut en indiquer d'autres."
  },
  "Verduras": {
   "en": "Vegetables",
   "pt-BR": "Verduras",
   "fr": "Légumes"
  },
  "Frutas": {
   "en": "Fruit",
   "pt-BR": "Frutas",
   "fr": "Fruits"
  },
  "Cereales": {
   "en": "Grains",
   "pt-BR": "Cereais",
   "fr": "Céréales"
  },
  "Cereales sin grasa": {
   "en": "Grains without fat",
   "pt-BR": "Cereais sem gordura",
   "fr": "Céréales sans graisse"
  },
  "Cereales con grasa": {
   "en": "Grains with fat",
   "pt-BR": "Cereais com gordura",
   "fr": "Céréales avec graisse"
  },
  "Cereales c/grasa": {
   "en": "Grains w/ fat",
   "pt-BR": "Cereais c/ gordura",
   "fr": "Céréales gras"
  },
  "Leguminosas": {
   "en": "Legumes",
   "pt-BR": "Leguminosas",
   "fr": "Légumineuses"
  },
  "Origen animal · muy bajo en grasa": {
   "en": "Animal protein · very low fat",
   "pt-BR": "Origem animal · muito baixo em gordura",
   "fr": "Origine animale · très maigre"
  },
  "Origen animal · bajo en grasa": {
   "en": "Animal protein · low fat",
   "pt-BR": "Origem animal · baixo em gordura",
   "fr": "Origine animale · maigre"
  },
  "Origen animal · moderado en grasa": {
   "en": "Animal protein · medium fat",
   "pt-BR": "Origem animal · moderado em gordura",
   "fr": "Origine animale · mi-gras"
  },
  "Origen animal · alto en grasa": {
   "en": "Animal protein · high fat",
   "pt-BR": "Origem animal · alto em gordura",
   "fr": "Origine animale · gras"
  },
  "AOA muy magro": {
   "en": "Very lean protein",
   "pt-BR": "Proteína muito magra",
   "fr": "Protéine très maigre"
  },
  "AOA magro": {
   "en": "Lean protein",
   "pt-BR": "Proteína magra",
   "fr": "Protéine maigre"
  },
  "AOA moderado": {
   "en": "Medium-fat protein",
   "pt-BR": "Proteína moderada",
   "fr": "Protéine mi-grasse"
  },
  "AOA alto": {
   "en": "High-fat protein",
   "pt-BR": "Proteína gorda",
   "fr": "Protéine grasse"
  },
  "Leche descremada": {
   "en": "Skim milk",
   "pt-BR": "Leite desnatado",
   "fr": "Lait écrémé"
  },
  "Leche semidescremada": {
   "en": "Low-fat milk",
   "pt-BR": "Leite semidesnatado",
   "fr": "Lait demi-écrémé"
  },
  "Leche entera": {
   "en": "Whole milk",
   "pt-BR": "Leite integral",
   "fr": "Lait entier"
  },
  "Leche con azúcar": {
   "en": "Sweetened milk",
   "pt-BR": "Leite com açúcar",
   "fr": "Lait sucré"
  },
  "Leche descr.": {
   "en": "Skim milk",
   "pt-BR": "Leite desn.",
   "fr": "Lait écr."
  },
  "Leche semi": {
   "en": "Low-fat milk",
   "pt-BR": "Leite semi",
   "fr": "Lait demi"
  },
  "Leche c/azúcar": {
   "en": "Sweet milk",
   "pt-BR": "Leite c/ açúcar",
   "fr": "Lait sucré"
  },
  "Grasas": {
   "en": "Fats",
   "pt-BR": "Gorduras",
   "fr": "Lipides"
  },
  "Grasas sin proteína": {
   "en": "Fats without protein",
   "pt-BR": "Gorduras sem proteína",
   "fr": "Lipides sans protéines"
  },
  "Grasas con proteína": {
   "en": "Fats with protein",
   "pt-BR": "Gorduras com proteína",
   "fr": "Lipides avec protéines"
  },
  "Grasas c/prot.": {
   "en": "Fats w/ protein",
   "pt-BR": "Gorduras c/ prot.",
   "fr": "Lipides + prot."
  },
  "Azúcares sin grasa": {
   "en": "Sugars without fat",
   "pt-BR": "Açúcares sem gordura",
   "fr": "Sucres sans graisse"
  },
  "Azúcares con grasa": {
   "en": "Sugars with fat",
   "pt-BR": "Açúcares com gordura",
   "fr": "Sucres avec graisse"
  },
  "Azúcares c/grasa": {
   "en": "Sugars w/ fat",
   "pt-BR": "Açúcares c/ gordura",
   "fr": "Sucres gras"
  },
  "elige qué servicio termina": {
   "en": "choose which service ends",
   "pt-BR": "escolha qual serviço termina",
   "fr": "choisissez le service à arrêter"
  },
  "Dejará de ver:": {
   "en": "Will no longer see:",
   "pt-BR": "Deixará de ver:",
   "fr": "Ne verra plus :"
  },
  "Dejarás de ver:": {
   "en": "You will no longer see:",
   "pt-BR": "Você deixará de ver:",
   "fr": "Vous ne verrez plus :"
  },
  "Terminar todos los servicios": {
   "en": "End all services",
   "pt-BR": "Encerrar todos os serviços",
   "fr": "Arrêter tous les services"
  },
  "Peso de hoy (lb)": {
   "en": "Today's weight (lb)",
   "pt-BR": "Peso de hoje (lb)",
   "fr": "Poids du jour (lb)"
  },
  "y": {
   "en": "and",
   "pt-BR": "e",
   "fr": "et"
  },
  "Si la persona ya es tu atleta, este código le suma los servicios nuevos a la misma relación.": {
   "en": "If the person is already your athlete, this code adds the new services to the same relationship.",
   "pt-BR": "Se a pessoa já é seu atleta, este código soma os novos serviços à mesma relação.",
   "fr": "Si la personne est déjà votre athlète, ce code ajoute les nouveaux services à la même relation."
  },
  "¿Qué servicios le vas a dar? Puedes elegir varios; será una sola relación.": {
   "en": "Which services will you provide? You can pick several; it will be a single relationship.",
   "pt-BR": "Quais serviços você vai oferecer? Pode escolher vários; será uma única relação.",
   "fr": "Quels services allez-vous proposer ? Vous pouvez en choisir plusieurs ; ce sera une seule relation."
  },
  "Elige al menos un servicio.": {
   "en": "Choose at least one service.",
   "pt-BR": "Escolha pelo menos um serviço.",
   "fr": "Choisissez au moins un service."
  },
  "Crear código": {
   "en": "Create code",
   "pt-BR": "Criar código",
   "fr": "Créer le code"
  },
  "Unidades": {
   "en": "Units",
   "pt-BR": "Unidades",
   "fr": "Unités"
  },
  "Cargas del gym": {
   "en": "Gym loads",
   "pt-BR": "Cargas da academia",
   "fr": "Charges de musculation"
  },
  "El perfil de nutrición y las tendencias de comida siguen mostrando el peso en kg.": {
   "en": "The nutrition profile and food trends still show weight in kg.",
   "pt-BR": "O perfil de nutrição e as tendências de alimentação continuam mostrando o peso em kg.",
   "fr": "Le profil nutritionnel et les tendances alimentaires affichent toujours le poids en kg."
  },
  "Peso del día en lb (escribe 0 para borrarlo):": {
   "en": "Weight for the day in lb (type 0 to clear it):",
   "pt-BR": "Peso do dia em lb (digite 0 para apagar):",
   "fr": "Poids du jour en lb (tapez 0 pour l'effacer) :"
  },
  "Cita en 30 minutos": {
   "en": "Appointment in 30 minutes",
   "pt-BR": "Consulta em 30 minutos",
   "fr": "Rendez-vous dans 30 minutes"
  },
  "Crear rutina nueva": {
   "en": "Create new routine",
   "pt-BR": "Criar rotina nova",
   "fr": "Créer une nouvelle routine"
  },
  "O usa una de tu Gym": {
   "en": "Or use one from your Gym",
   "pt-BR": "Ou use uma do seu Gym",
   "fr": "Ou utilisez une de votre Gym"
  },
  "Todavía no tienes rutinas en tu pestaña Gym.": {
   "en": "You don't have routines in your Gym tab yet.",
   "pt-BR": "Você ainda não tem rotinas na aba Gym.",
   "fr": "Vous n'avez pas encore de routines dans l'onglet Gym."
  },
  "Editar plantilla": {
   "en": "Edit template",
   "pt-BR": "Editar modelo",
   "fr": "Modifier le modèle"
  },
  "Rutina de": {
   "en": "Routine for",
   "pt-BR": "Rotina de",
   "fr": "Routine de"
  },
  "Actualicé tu rutina.": {
   "en": "I updated your routine.",
   "pt-BR": "Atualizei sua rotina.",
   "fr": "J'ai mis à jour votre routine."
  },
  "Tu semana": {
   "en": "Your week",
   "pt-BR": "Sua semana",
   "fr": "Votre semaine"
  },
  "Agenda": {
   "en": "Schedule",
   "pt-BR": "Agenda",
   "fr": "Agenda"
  },
  "Citas con tus especialistas o atletas": {
   "en": "Appointments with your specialists or athletes",
   "pt-BR": "Consultas com seus especialistas ou atletas",
   "fr": "Rendez-vous avec vos spécialistes ou athlètes"
  },
  "Fotos de progreso": {
   "en": "Progress photos",
   "pt-BR": "Fotos de progresso",
   "fr": "Photos de progression"
  },
  "Próxima cita": {
   "en": "Next appointment",
   "pt-BR": "Próxima consulta",
   "fr": "Prochain rendez-vous"
  },
  "Próximas citas": {
   "en": "Upcoming appointments",
   "pt-BR": "Próximas consultas",
   "fr": "Prochains rendez-vous"
  },
  "Próximas": {
   "en": "Upcoming",
   "pt-BR": "Próximas",
   "fr": "À venir"
  },
  "No tienes citas próximas.": {
   "en": "You have no upcoming appointments.",
   "pt-BR": "Você não tem consultas próximas.",
   "fr": "Aucun rendez-vous à venir."
  },
  "Abrir agenda": {
   "en": "Open schedule",
   "pt-BR": "Abrir agenda",
   "fr": "Ouvrir l'agenda"
  },
  "Cita": {
   "en": "Appointment",
   "pt-BR": "Consulta",
   "fr": "Rendez-vous"
  },
  "cita": {
   "en": "appointment",
   "pt-BR": "consulta",
   "fr": "rendez-vous"
  },
  "citas": {
   "en": "appointments",
   "pt-BR": "consultas",
   "fr": "rendez-vous"
  },
  "Sin citas este día": {
   "en": "No appointments this day",
   "pt-BR": "Sem consultas neste dia",
   "fr": "Aucun rendez-vous ce jour"
  },
  "Cancelada": {
   "en": "Cancelled",
   "pt-BR": "Cancelada",
   "fr": "Annulé"
  },
  "Nueva cita": {
   "en": "New appointment",
   "pt-BR": "Nova consulta",
   "fr": "Nouveau rendez-vous"
  },
  "Editar cita": {
   "en": "Edit appointment",
   "pt-BR": "Editar consulta",
   "fr": "Modifier le rendez-vous"
  },
  "Con": {
   "en": "With",
   "pt-BR": "Com",
   "fr": "Avec"
  },
  "Motivo": {
   "en": "Reason",
   "pt-BR": "Motivo",
   "fr": "Motif"
  },
  "Hora": {
   "en": "Time",
   "pt-BR": "Hora",
   "fr": "Heure"
  },
  "Duración": {
   "en": "Duration",
   "pt-BR": "Duração",
   "fr": "Durée"
  },
  "Ej. Revisión mensual": {
   "en": "E.g. Monthly check-in",
   "pt-BR": "Ex.: Revisão mensal",
   "fr": "Ex. : Bilan mensuel"
  },
  "Cancelar cita": {
   "en": "Cancel appointment",
   "pt-BR": "Cancelar consulta",
   "fr": "Annuler le rendez-vous"
  },
  "Escribe el motivo de la cita.": {
   "en": "Enter the reason for the appointment.",
   "pt-BR": "Escreva o motivo da consulta.",
   "fr": "Indiquez le motif du rendez-vous."
  },
  "Elige fecha y hora.": {
   "en": "Choose date and time.",
   "pt-BR": "Escolha data e hora.",
   "fr": "Choisissez la date et l'heure."
  },
  "Cambié la cita": {
   "en": "I changed the appointment",
   "pt-BR": "Mudei a consulta",
   "fr": "J'ai modifié le rendez-vous"
  },
  "Agendé una cita": {
   "en": "I scheduled an appointment",
   "pt-BR": "Agendei uma consulta",
   "fr": "J'ai fixé un rendez-vous"
  },
  "Cancelé la cita": {
   "en": "I cancelled the appointment",
   "pt-BR": "Cancelei a consulta",
   "fr": "J'ai annulé le rendez-vous"
  },
  "¿Cancelar esta cita?": {
   "en": "Cancel this appointment?",
   "pt-BR": "Cancelar esta consulta?",
   "fr": "Annuler ce rendez-vous ?"
  },
  "Para agendar necesitas un vínculo activo con un especialista o un atleta.": {
   "en": "To schedule you need an active link with a specialist or an athlete.",
   "pt-BR": "Para agendar você precisa de um vínculo ativo com um especialista ou atleta.",
   "fr": "Pour planifier, il faut un lien actif avec un spécialiste ou un athlète."
  },
  "Tus fotos se guardan en el servidor de Rutinal y solo tú las ves. Tus especialistas solo ven las que marques para compartir.": {
   "en": "Your photos are stored on Rutinal's server and only you can see them. Your specialists only see the ones you mark to share.",
   "pt-BR": "Suas fotos ficam no servidor do Rutinal e só você as vê. Seus especialistas só veem as que você marcar para compartilhar.",
   "fr": "Vos photos sont stockées sur le serveur de Rutinal et vous seul les voyez. Vos spécialistes ne voient que celles que vous partagez."
  },
  "Compartir las fotos nuevas con mis especialistas": {
   "en": "Share new photos with my specialists",
   "pt-BR": "Compartilhar as fotos novas com meus especialistas",
   "fr": "Partager les nouvelles photos avec mes spécialistes"
  },
  "Compartir con mis especialistas": {
   "en": "Share with my specialists",
   "pt-BR": "Compartilhar com meus especialistas",
   "fr": "Partager avec mes spécialistes"
  },
  "Antes y ahora": {
   "en": "Before and now",
   "pt-BR": "Antes e agora",
   "fr": "Avant et maintenant"
  },
  "Todas": {
   "en": "All",
   "pt-BR": "Todas",
   "fr": "Toutes"
  },
  "Aún no tienes fotos. Toma la primera para ver tu cambio con el tiempo.": {
   "en": "You have no photos yet. Take the first one to see your change over time.",
   "pt-BR": "Você ainda não tem fotos. Tire a primeira para ver sua mudança com o tempo.",
   "fr": "Pas encore de photos. Prenez la première pour voir votre évolution."
  },
  "Subiendo…": {
   "en": "Uploading…",
   "pt-BR": "Enviando…",
   "fr": "Envoi…"
  },
  "No se pudo leer la imagen.": {
   "en": "The image could not be read.",
   "pt-BR": "Não foi possível ler a imagem.",
   "fr": "Impossible de lire l'image."
  },
  "Eliminar foto": {
   "en": "Delete photo",
   "pt-BR": "Excluir foto",
   "fr": "Supprimer la photo"
  },
  "¿Eliminar esta foto? No se puede recuperar.": {
   "en": "Delete this photo? It cannot be recovered.",
   "pt-BR": "Excluir esta foto? Não dá para recuperar.",
   "fr": "Supprimer cette photo ? Elle ne pourra pas être récupérée."
  },
  "No ha compartido fotos contigo.": {
   "en": "They haven't shared photos with you.",
   "pt-BR": "Não compartilhou fotos com você.",
   "fr": "Aucune photo partagée avec vous."
  },
  "Total del día": {
   "en": "Day total",
   "pt-BR": "Total do dia",
   "fr": "Total du jour"
  },
  "Plan de": {
   "en": "Plan for",
   "pt-BR": "Plano de",
   "fr": "Plan de"
  },
  "los cambios solo aplican a esta persona": {
   "en": "changes only apply to this person",
   "pt-BR": "as mudanças só valem para esta pessoa",
   "fr": "les changements ne concernent que cette personne"
  },
  "Nombre del plan": {
   "en": "Plan name",
   "pt-BR": "Nome do plano",
   "fr": "Nom du plan"
  },
  "Busca un alimento…": {
   "en": "Search for a food…",
   "pt-BR": "Busque um alimento…",
   "fr": "Cherchez un aliment…"
  },
  "Copiar de un día de mi registro": {
   "en": "Copy from a day in my log",
   "pt-BR": "Copiar de um dia do meu registro",
   "fr": "Copier depuis un jour de mon journal"
  },
  "Editar plan": {
   "en": "Edit plan",
   "pt-BR": "Editar plano",
   "fr": "Modifier le plan"
  },
  "Editar dieta": {
   "en": "Edit diet",
   "pt-BR": "Editar dieta",
   "fr": "Modifier le régime"
  },
  "Nueva dieta": {
   "en": "New diet",
   "pt-BR": "Nova dieta",
   "fr": "Nouveau régime"
  },
  "Agrega al menos un alimento.": {
   "en": "Add at least one food.",
   "pt-BR": "Adicione pelo menos um alimento.",
   "fr": "Ajoutez au moins un aliment."
  },
  "Actualicé tu plan de alimentación.": {
   "en": "I updated your meal plan.",
   "pt-BR": "Atualizei seu plano alimentar.",
   "fr": "J'ai mis à jour votre plan alimentaire."
  },
  "Sin resultados. Prueba con otro nombre.": {
   "en": "No results. Try another name.",
   "pt-BR": "Sem resultados. Tente outro nome.",
   "fr": "Aucun résultat. Essayez un autre nom."
  },
  "Avisos de mensajes": {
   "en": "Message alerts",
   "pt-BR": "Avisos de mensagens",
   "fr": "Alertes de messages"
  },
  "Recibe una notificación cuando te escriban, aunque la app esté cerrada. Rutinal revisa cada 15 minutos, así que el aviso puede tardar un poco.": {
   "en": "Get a notification when someone writes to you, even with the app closed. Rutinal checks every 15 minutes, so the alert may take a little while.",
   "pt-BR": "Receba uma notificação quando te escreverem, mesmo com o app fechado. O Rutinal verifica a cada 15 minutos, então o aviso pode demorar um pouco.",
   "fr": "Recevez une notification quand on vous écrit, même si l'appli est fermée. Rutinal vérifie toutes les 15 minutes, l'alerte peut donc tarder un peu."
  },
  "Activados": {
   "en": "On",
   "pt-BR": "Ativados",
   "fr": "Activées"
  },
  "Desactivados": {
   "en": "Off",
   "pt-BR": "Desativados",
   "fr": "Désactivées"
  },
  "Activar avisos": {
   "en": "Turn alerts on",
   "pt-BR": "Ativar avisos",
   "fr": "Activer les alertes"
  },
  "Desactivar avisos": {
   "en": "Turn alerts off",
   "pt-BR": "Desativar avisos",
   "fr": "Désactiver les alertes"
  },
  "Para avisarte con la app cerrada, Rutinal guarda en este teléfono una sesión aparte que solo revisa si tienes mensajes nuevos. Escribe tu contraseña para activarla.": {
   "en": "To alert you with the app closed, Rutinal keeps a separate session on this phone that only checks whether you have new messages. Enter your password to turn it on.",
   "pt-BR": "Para te avisar com o app fechado, o Rutinal guarda neste telefone uma sessão separada que só verifica se você tem mensagens novas. Digite sua senha para ativá-la.",
   "fr": "Pour vous alerter quand l'appli est fermée, Rutinal garde sur ce téléphone une session distincte qui vérifie seulement si vous avez de nouveaux messages. Saisissez votre mot de passe pour l'activer."
  },
  "La contraseña no es correcta.": {
   "en": "The password is not correct.",
   "pt-BR": "A senha não está correta.",
   "fr": "Le mot de passe est incorrect."
  },
  "Mensaje nuevo": {
   "en": "New message",
   "pt-BR": "Nova mensagem",
   "fr": "Nouveau message"
  },
  "mensajes nuevos": {
   "en": "new messages",
   "pt-BR": "novas mensagens",
   "fr": "nouveaux messages"
  },
  "Mensajes": {
   "en": "Messages",
   "pt-BR": "Mensagens",
   "fr": "Messages"
  },
  "Conversaciones con tus atletas": {
   "en": "Conversations with your athletes",
   "pt-BR": "Conversas com seus atletas",
   "fr": "Conversations avec vos athlètes"
  },
  "Sin mensajes todavía": {
   "en": "No messages yet",
   "pt-BR": "Sem mensagens ainda",
   "fr": "Pas encore de messages"
  },
  "Escribe un mensaje…": {
   "en": "Write a message…",
   "pt-BR": "Escreva uma mensagem…",
   "fr": "Écrivez un message…"
  },
  "Aún no hay mensajes. Escribe el primero.": {
   "en": "No messages yet. Write the first one.",
   "pt-BR": "Ainda não há mensagens. Escreva a primeira.",
   "fr": "Pas encore de messages. Écrivez le premier."
  },
  "Eso ya no está asignado.": {
   "en": "That is no longer assigned.",
   "pt-BR": "Isso não está mais atribuído.",
   "fr": "Ce n'est plus attribué."
  },
  "Pregunta sobre algo que te dejaron": {
   "en": "Ask about something you were given",
   "pt-BR": "Pergunte sobre algo que te deixaram",
   "fr": "Posez une question sur ce qu'on vous a donné"
  },
  "Todavía no tienes rutinas ni planes de este especialista.": {
   "en": "You don't have routines or plans from this specialist yet.",
   "pt-BR": "Você ainda não tem rotinas nem planos deste especialista.",
   "fr": "Vous n'avez pas encore de routines ni de plans de ce spécialiste."
  },
  "Te dejé esto en tu app.": {
   "en": "I left this for you in your app.",
   "pt-BR": "Deixei isto para você no app.",
   "fr": "Je vous ai laissé ceci dans l'appli."
  },
  "Actualicé tus cargas recomendadas.": {
   "en": "I updated your recommended loads.",
   "pt-BR": "Atualizei suas cargas recomendadas.",
   "fr": "J'ai mis à jour vos charges recommandées."
  },
  "Escríbele": {
   "en": "Send a message",
   "pt-BR": "Escreva para ele",
   "fr": "Écrivez-lui"
  },
  "Adjuntar": {
   "en": "Attach",
   "pt-BR": "Anexar",
   "fr": "Joindre"
  },
  "Plan": {
   "en": "Plan",
   "pt-BR": "Plano",
   "fr": "Plan"
  },
  "Copiar resumen": {
   "en": "Copy summary",
   "pt-BR": "Copiar resumo",
   "fr": "Copier le résumé"
  },
  "Resumen de la semana": {
   "en": "Weekly summary",
   "pt-BR": "Resumo da semana",
   "fr": "Résumé de la semaine"
  },
  "Últimos 14 días": {
   "en": "Last 14 days",
   "pt-BR": "Últimos 14 dias",
   "fr": "14 derniers jours"
  },
  "Sin registros en los últimos 7 días.": {
   "en": "No records in the last 7 days.",
   "pt-BR": "Sem registros nos últimos 7 dias.",
   "fr": "Aucune donnée sur les 7 derniers jours."
  },
  "Días con comidas": {
   "en": "Days with meals",
   "pt-BR": "Dias com refeições",
   "fr": "Jours avec repas"
  },
  "semana anterior": {
   "en": "previous week",
   "pt-BR": "semana anterior",
   "fr": "semaine précédente"
  },
  "de la meta": {
   "en": "of target",
   "pt-BR": "da meta",
   "fr": "de l'objectif"
  },
  "Proteína promedio": {
   "en": "Average protein",
   "pt-BR": "Proteína média",
   "fr": "Protéines moyennes"
  },
  "Calorías por día": {
   "en": "Calories per day",
   "pt-BR": "Calorias por dia",
   "fr": "Calories par jour"
  },
  "la línea es la meta": {
   "en": "the line is the target",
   "pt-BR": "a linha é a meta",
   "fr": "la ligne est l'objectif"
  },
  "Proteína por día (g)": {
   "en": "Protein per day (g)",
   "pt-BR": "Proteína por dia (g)",
   "fr": "Protéines par jour (g)"
  },
  "Entrenamientos por semana": {
   "en": "Workouts per week",
   "pt-BR": "Treinos por semana",
   "fr": "Entraînements par semaine"
  },
  "Volumen por semana": {
   "en": "Volume per week",
   "pt-BR": "Volume por semana",
   "fr": "Volume par semaine"
  },
  "Volumen": {
   "en": "Volume",
   "pt-BR": "Volume",
   "fr": "Volume"
  },
  "Dolor máximo": {
   "en": "Max pain",
   "pt-BR": "Dor máxima",
   "fr": "Douleur max"
  },
  "RPE promedio": {
   "en": "Average RPE",
   "pt-BR": "RPE médio",
   "fr": "RPE moyen"
  },
  "Dolor y esfuerzo por sesión": {
   "en": "Pain and effort per session",
   "pt-BR": "Dor e esforço por sessão",
   "fr": "Douleur et effort par séance"
  },
  "Herramientas": {
   "en": "Tools",
   "pt-BR": "Ferramentas",
   "fr": "Outils"
  },
  "Tu contenido": {
   "en": "Your content",
   "pt-BR": "Seu conteúdo",
   "fr": "Votre contenu"
  },
  "Cuenta y app": {
   "en": "Account and app",
   "pt-BR": "Conta e app",
   "fr": "Compte et appli"
  },
  "Tu día, semana y mes": {
   "en": "Your day, week and month",
   "pt-BR": "Seu dia, semana e mês",
   "fr": "Votre jour, semaine et mois"
  },
  "Tu horario del día": {
   "en": "Your daily schedule",
   "pt-BR": "Seu horário do dia",
   "fr": "Votre emploi du temps"
  },
  "Crea y ordena tus hábitos": {
   "en": "Create and reorder your habits",
   "pt-BR": "Crie e ordene seus hábitos",
   "fr": "Créez et ordonnez vos habitudes"
  },
  "Perfil y metas de comida": {
   "en": "Profile and food targets",
   "pt-BR": "Perfil e metas de alimentação",
   "fr": "Profil et objectifs alimentaires"
  },
  "Tema, idioma y recordatorios": {
   "en": "Theme, language and reminders",
   "pt-BR": "Tema, idioma e lembretes",
   "fr": "Thème, langue et rappels"
  },
  "alimento": {
   "en": "food",
   "pt-BR": "alimento",
   "fr": "aliment"
  },
  "alimentos": {
   "en": "foods",
   "pt-BR": "alimentos",
   "fr": "aliments"
  },
  "Sin registrar": {
   "en": "Not logged yet",
   "pt-BR": "Sem registro",
   "fr": "Pas encore enregistré"
  },
  "+ Registrar": {
   "en": "+ Log",
   "pt-BR": "+ Registrar",
   "fr": "+ Enregistrer"
  },
  "Plan de tu especialista": {
   "en": "Your specialist's plan",
   "pt-BR": "Plano do seu especialista",
   "fr": "Plan de votre spécialiste"
  },
  "Registrar el plan": {
   "en": "Log the plan",
   "pt-BR": "Registrar o plano",
   "fr": "Enregistrer le plan"
  },
  "Meta sugerida": {
   "en": "Suggested target",
   "pt-BR": "Meta sugerida",
   "fr": "Objectif suggéré"
  },
  "Meta diaria": {
   "en": "Daily target",
   "pt-BR": "Meta diária",
   "fr": "Objectif quotidien"
  },
  "consumidas": {
   "en": "eaten",
   "pt-BR": "consumidas",
   "fr": "consommées"
  },
  "meta de tu especialista": {
   "en": "target set by your specialist",
   "pt-BR": "meta do seu especialista",
   "fr": "objectif fixé par votre spécialiste"
  },
  "Calcular mi meta": {
   "en": "Calculate my target",
   "pt-BR": "Calcular minha meta",
   "fr": "Calculer mon objectif"
  },
  "Agua": {
   "en": "Water",
   "pt-BR": "Água",
   "fr": "Eau"
  },
  "vasos": {
   "en": "glasses",
   "pt-BR": "copos",
   "fr": "verres"
  },
  "Editar metas": {
   "en": "Edit targets",
   "pt-BR": "Editar metas",
   "fr": "Modifier les objectifs"
  },
  "Carga recomendada por serie": {
   "en": "Recommended load per set",
   "pt-BR": "Carga recomendada por série",
   "fr": "Charge recommandée par série"
  },
  "Carga recomendada": {
   "en": "Recommended load",
   "pt-BR": "Carga recomendada",
   "fr": "Charge recommandée"
  },
  "Cargas por serie": {
   "en": "Loads per set",
   "pt-BR": "Cargas por série",
   "fr": "Charges par série"
  },
  "Escribe la carga de cada serie separada por comas, en": {
   "en": "Type the load for each set separated by commas, in",
   "pt-BR": "Escreva a carga de cada série separada por vírgulas, em",
   "fr": "Saisissez la charge de chaque série séparée par des virgules, en"
  },
  "Si pones menos cargas que series, la última se repite. Déjalo vacío para no recomendar carga.": {
   "en": "If you enter fewer loads than sets, the last one repeats. Leave it empty to recommend no load.",
   "pt-BR": "Se você colocar menos cargas que séries, a última se repete. Deixe vazio para não recomendar carga.",
   "fr": "S'il y a moins de charges que de séries, la dernière se répète. Laissez vide pour ne rien recommander."
  },
  "Esta rutina no tiene ejercicios.": {
   "en": "This routine has no exercises.",
   "pt-BR": "Esta rotina não tem exercícios.",
   "fr": "Cette routine n'a pas d'exercices."
  },
  "Serie": {
   "en": "Set",
   "pt-BR": "Série",
   "fr": "Série"
  },
  "Reps": {
   "en": "Reps",
   "pt-BR": "Reps",
   "fr": "Rép."
  },
  "Hecho": {
   "en": "Done",
   "pt-BR": "Feito",
   "fr": "Fait"
  },
  "+ Agregar serie": {
   "en": "+ Add set",
   "pt-BR": "+ Adicionar série",
   "fr": "+ Ajouter une série"
  },
  "Quitar serie": {
   "en": "Remove set",
   "pt-BR": "Remover série",
   "fr": "Retirer la série"
  },
  "Temporizador de descanso": {
   "en": "Rest timer",
   "pt-BR": "Temporizador de descanso",
   "fr": "Minuteur de repos"
  },
  "Toca para iniciar el descanso": {
   "en": "Tap to start the rest",
   "pt-BR": "Toque para iniciar o descanso",
   "fr": "Touchez pour lancer le repos"
  },
  "lb de volumen": {
   "en": "lb of volume",
   "pt-BR": "lb de volume",
   "fr": "lb de volume"
  },
  "lb/min (densidad)": {
   "en": "lb/min (density)",
   "pt-BR": "lb/min (densidade)",
   "fr": "lb/min (densité)"
  },
  "Volumen por semana (lb)": {
   "en": "Volume per week (lb)",
   "pt-BR": "Volume por semana (lb)",
   "fr": "Volume par semaine (lb)"
  },
  "lb totales": {
   "en": "total lb",
   "pt-BR": "lb totais",
   "fr": "lb au total"
  },
  "restantes": {
   "en": "remaining",
   "pt-BR": "restantes",
   "fr": "restantes"
  },
  "Buenos días": {
   "en": "Good morning",
   "pt-BR": "Bom dia",
   "fr": "Bonjour"
  },
  "Buenas tardes": {
   "en": "Good afternoon",
   "pt-BR": "Boa tarde",
   "fr": "Bon après-midi"
  },
  "Buenas noches": {
   "en": "Good evening",
   "pt-BR": "Boa noite",
   "fr": "Bonsoir"
  },
  "Entrenamiento de hoy": {
   "en": "Today's workout",
   "pt-BR": "Treino de hoje",
   "fr": "Entraînement du jour"
  },
  "Completado": {
   "en": "Completed",
   "pt-BR": "Concluído",
   "fr": "Terminé"
  },
  "En curso": {
   "en": "In progress",
   "pt-BR": "Em andamento",
   "fr": "En cours"
  },
  "Programado": {
   "en": "Scheduled",
   "pt-BR": "Programado",
   "fr": "Prévu"
  },
  "Ver detalle": {
   "en": "View details",
   "pt-BR": "Ver detalhes",
   "fr": "Voir le détail"
  },
  "Ver rutinas": {
   "en": "View routines",
   "pt-BR": "Ver rotinas",
   "fr": "Voir les routines"
  },
  "Comida de hoy": {
   "en": "Today's food",
   "pt-BR": "Alimentação de hoje",
   "fr": "Repas du jour"
  },
  "Te pasaste por": {
   "en": "You're over by",
   "pt-BR": "Você passou em",
   "fr": "Dépassement de"
  },
  "Peso de hoy": {
   "en": "Today's weight",
   "pt-BR": "Peso de hoje",
   "fr": "Poids du jour"
  },
  "Escribe un peso válido.": {
   "en": "Enter a valid weight.",
   "pt-BR": "Digite um peso válido.",
   "fr": "Saisissez un poids valide."
  },
  "Registrado hoy": {
   "en": "Logged today",
   "pt-BR": "Registrado hoje",
   "fr": "Enregistré aujourd'hui"
  },
  "Registrado ayer": {
   "en": "Logged yesterday",
   "pt-BR": "Registrado ontem",
   "fr": "Enregistré hier"
  },
  "Buen trabajo. Ya quedó registrado.": {
   "en": "Nice work. It's logged.",
   "pt-BR": "Bom trabalho. Já ficou registrado.",
   "fr": "Beau travail. C'est enregistré."
  },
  "Hoy no tienes rutina programada.": {
   "en": "No routine scheduled for today.",
   "pt-BR": "Hoje você não tem rotina programada.",
   "fr": "Aucune routine prévue aujourd'hui."
  },
  "Toca para registrar tu peso.": {
   "en": "Tap to log your weight.",
   "pt-BR": "Toque para registrar seu peso.",
   "fr": "Touchez pour enregistrer votre poids."
  },
  "activo": {
   "en": "active",
   "pt-BR": "ativo",
   "fr": "actif"
  },
  "Inicio": {
   "en": "Home",
   "pt-BR": "Início",
   "fr": "Accueil"
  },
  "Abrir modo especialista": {
   "en": "Open specialist mode",
   "pt-BR": "Abrir modo especialista",
   "fr": "Ouvrir le mode spécialiste"
  },
  "Tus atletas, plantillas y notas están en el modo especialista.": {
   "en": "Your athletes, templates and notes are in specialist mode.",
   "pt-BR": "Seus atletas, modelos e notas estão no modo especialista.",
   "fr": "Vos athlètes, modèles et notes sont dans le mode spécialiste."
  },
  "¿Quién eres hoy?": {
   "en": "Who are you today?",
   "pt-BR": "Quem é você hoje?",
   "fr": "Qui êtes-vous aujourd'hui ?"
  },
  "Elige con qué quieres empezar. Puedes cambiar cuando quieras desde arriba.": {
   "en": "Choose where to start. You can switch any time from the top.",
   "pt-BR": "Escolha por onde começar. Você pode trocar quando quiser no topo.",
   "fr": "Choisissez par où commencer. Vous pouvez changer à tout moment en haut."
  },
  "Revisa a tus atletas, arma plantillas y deja rutinas, planes e indicaciones.": {
   "en": "Check on your athletes, build templates and hand out routines, plans and instructions.",
   "pt-BR": "Acompanhe seus atletas, monte modelos e deixe rotinas, planos e orientações.",
   "fr": "Suivez vos athlètes, créez des modèles et donnez routines, plans et consignes."
  },
  "Registra tus comidas, entrenamientos y hábitos, y revisa lo que te dejaron.": {
   "en": "Log your meals, workouts and habits, and check what was assigned to you.",
   "pt-BR": "Registre suas refeições, treinos e hábitos, e veja o que deixaram para você.",
   "fr": "Enregistrez vos repas, entraînements et habitudes, et consultez ce qu'on vous a attribué."
  },
  "Invitar atleta": {
   "en": "Invite athlete",
   "pt-BR": "Convidar atleta",
   "fr": "Inviter un athlète"
  },
  "¿Con qué especialidad lo vas a acompañar?": {
   "en": "Which specialty will you work with them as?",
   "pt-BR": "Com qual especialidade você vai acompanhá-lo?",
   "fr": "Avec quelle spécialité allez-vous l'accompagner ?"
  },
  "Hola": {
   "en": "Hi",
   "pt-BR": "Olá",
   "fr": "Bonjour"
  },
  "Tu resumen de hoy": {
   "en": "Your overview for today",
   "pt-BR": "Seu resumo de hoje",
   "fr": "Votre résumé du jour"
  },
  "Atletas activos": {
   "en": "Active athletes",
   "pt-BR": "Atletas ativos",
   "fr": "Athlètes actifs"
  },
  "Invitaciones pendientes": {
   "en": "Pending invitations",
   "pt-BR": "Convites pendentes",
   "fr": "Invitations en attente"
  },
  "Avisos": {
   "en": "Alerts",
   "pt-BR": "Avisos",
   "fr": "Alertes"
  },
  "Sin registrar:": {
   "en": "Not logging:",
   "pt-BR": "Sem registrar:",
   "fr": "Sans saisie :"
  },
  "Dolor alto esta semana:": {
   "en": "High pain this week:",
   "pt-BR": "Dor alta esta semana:",
   "fr": "Douleur élevée cette semaine :"
  },
  "Todo en orden": {
   "en": "All good",
   "pt-BR": "Tudo em ordem",
   "fr": "Tout va bien"
  },
  "Aún no tienes atletas": {
   "en": "You don't have athletes yet",
   "pt-BR": "Você ainda não tem atletas",
   "fr": "Vous n'avez pas encore d'athlètes"
  },
  "Nadie lleva más de 2 días sin registrar ni reportó dolor alto.": {
   "en": "Nobody has gone more than 2 days without logging or reported high pain.",
   "pt-BR": "Ninguém está há mais de 2 dias sem registrar nem relatou dor alta.",
   "fr": "Personne n'a passé plus de 2 jours sans saisie ni signalé de douleur élevée."
  },
  "Invita a tu primer atleta con un código.": {
   "en": "Invite your first athlete with a code.",
   "pt-BR": "Convide seu primeiro atleta com um código.",
   "fr": "Invitez votre premier athlète avec un code."
  },
  "Actividad reciente": {
   "en": "Recent activity",
   "pt-BR": "Atividade recente",
   "fr": "Activité récente"
  },
  "Las personas que acompañas": {
   "en": "The people you work with",
   "pt-BR": "As pessoas que você acompanha",
   "fr": "Les personnes que vous accompagnez"
  },
  "Buscar por nombre…": {
   "en": "Search by name…",
   "pt-BR": "Buscar por nome…",
   "fr": "Rechercher par nom…"
  },
  "activos": {
   "en": "active",
   "pt-BR": "ativos",
   "fr": "actifs"
  },
  "Nadie coincide con la búsqueda.": {
   "en": "Nobody matches the search.",
   "pt-BR": "Ninguém corresponde à busca.",
   "fr": "Personne ne correspond à la recherche."
  },
  "Aún no tienes atletas. Invita al primero con un código.": {
   "en": "You don't have athletes yet. Invite the first one with a code.",
   "pt-BR": "Você ainda não tem atletas. Convide o primeiro com um código.",
   "fr": "Vous n'avez pas encore d'athlètes. Invitez le premier avec un code."
  },
  "Invitaciones sin usar": {
   "en": "Unused invitations",
   "pt-BR": "Convites não usados",
   "fr": "Invitations non utilisées"
  },
  "Días con comidas (7)": {
   "en": "Days with meals (7)",
   "pt-BR": "Dias com refeições (7)",
   "fr": "Jours avec repas (7)"
  },
  "Promedio diario": {
   "en": "Daily average",
   "pt-BR": "Média diária",
   "fr": "Moyenne quotidienne"
  },
  "Entrenamientos (7 días)": {
   "en": "Workouts (7 days)",
   "pt-BR": "Treinos (7 dias)",
   "fr": "Entraînements (7 jours)"
  },
  "Dolor máximo (7 días)": {
   "en": "Max pain (7 days)",
   "pt-BR": "Dor máxima (7 dias)",
   "fr": "Douleur max (7 jours)"
  },
  "Sin registros de peso en este periodo.": {
   "en": "No weight records in this period.",
   "pt-BR": "Sem registros de peso neste período.",
   "fr": "Aucune pesée sur cette période."
  },
  "Planes": {
   "en": "Plans",
   "pt-BR": "Planos",
   "fr": "Plans"
  },
  "Registros": {
   "en": "Logs",
   "pt-BR": "Registros",
   "fr": "Journal"
  },
  "Terminar vínculo": {
   "en": "End link",
   "pt-BR": "Encerrar vínculo",
   "fr": "Mettre fin au lien"
  },
  "Lo que dejas a tus atletas": {
   "en": "What you hand to your athletes",
   "pt-BR": "O que você deixa para seus atletas",
   "fr": "Ce que vous donnez à vos athlètes"
  },
  "Buscar plantillas…": {
   "en": "Search templates…",
   "pt-BR": "Buscar modelos…",
   "fr": "Rechercher des modèles…"
  },
  "Ninguna plantilla coincide con la búsqueda.": {
   "en": "No template matches the search.",
   "pt-BR": "Nenhum modelo corresponde à busca.",
   "fr": "Aucun modèle ne correspond à la recherche."
  },
  "Aún no tienes plantillas. Crea la primera aquí abajo.": {
   "en": "You don't have templates yet. Create the first one below.",
   "pt-BR": "Você ainda não tem modelos. Crie o primeiro aqui embaixo.",
   "fr": "Vous n'avez pas encore de modèles. Créez le premier ci-dessous."
  },
  "Mensajes con tus atletas": {
   "en": "Messages with your athletes",
   "pt-BR": "Mensagens com seus atletas",
   "fr": "Messages avec vos athlètes"
  },
  "Tú": {
   "en": "You",
   "pt-BR": "Você",
   "fr": "Vous"
  },
  "Sin notas todavía": {
   "en": "No notes yet",
   "pt-BR": "Ainda sem notas",
   "fr": "Pas encore de notes"
  },
  "Cuando tengas atletas, aquí aparecen sus conversaciones.": {
   "en": "Once you have athletes, their conversations show up here.",
   "pt-BR": "Quando você tiver atletas, as conversas aparecem aqui.",
   "fr": "Quand vous aurez des athlètes, leurs conversations apparaîtront ici."
  },
  "Rutina": {
   "en": "Routine",
   "pt-BR": "Rotina",
   "fr": "Routine"
  },
  "Plan de alimentación": {
   "en": "Meal plan",
   "pt-BR": "Plano alimentar",
   "fr": "Plan alimentaire"
  },
  "Metas de nutrición": {
   "en": "Nutrition targets",
   "pt-BR": "Metas de nutrição",
   "fr": "Objectifs de nutrition"
  },
  "Mis plantillas": {
   "en": "My templates",
   "pt-BR": "Meus modelos",
   "fr": "Mes modèles"
  },
  "Para:": {
   "en": "For:",
   "pt-BR": "Para:",
   "fr": "Pour :"
  },
  "Aún no tienes plantillas de este tipo.": {
   "en": "You don't have templates of this kind yet.",
   "pt-BR": "Você ainda não tem modelos deste tipo.",
   "fr": "Vous n'avez pas encore de modèles de ce type."
  },
  "Nueva plantilla": {
   "en": "New template",
   "pt-BR": "Novo modelo",
   "fr": "Nouveau modèle"
  },
  "Asignar": {
   "en": "Assign",
   "pt-BR": "Atribuir",
   "fr": "Attribuer"
  },
  "Eliminar": {
   "en": "Delete",
   "pt-BR": "Excluir",
   "fr": "Supprimer"
  },
  "¿Eliminar esta plantilla? Lo que ya asignaste no cambia.": {
   "en": "Delete this template? What you already assigned doesn't change.",
   "pt-BR": "Excluir este modelo? O que você já atribuiu não muda.",
   "fr": "Supprimer ce modèle ? Ce que vous avez déjà attribué ne change pas."
  },
  "Rutina de tu pestaña Gym": {
   "en": "Routine from your Gym tab",
   "pt-BR": "Rotina da sua aba Gym",
   "fr": "Routine de votre onglet Gym"
  },
  "Primero arma la rutina en tu pestaña Gym; aquí la guardas como plantilla.": {
   "en": "First build the routine in your Gym tab; here you save it as a template.",
   "pt-BR": "Primeiro monte a rotina na sua aba Gym; aqui você a salva como modelo.",
   "fr": "Créez d'abord la routine dans votre onglet Gym ; ici vous l'enregistrez comme modèle."
  },
  "Registra en tu pestaña Comida el menú de un día y guárdalo aquí como plan.": {
   "en": "Log one day's menu in your Meal tab and save it here as a plan.",
   "pt-BR": "Registre na sua aba Refeição o cardápio de um dia e salve aqui como plano.",
   "fr": "Enregistrez le menu d'une journée dans votre onglet Repas et sauvegardez-le ici comme plan."
  },
  "Día de tu registro": {
   "en": "Day from your log",
   "pt-BR": "Dia do seu registro",
   "fr": "Jour de votre journal"
  },
  "Proteína (g)": {
   "en": "Protein (g)",
   "pt-BR": "Proteína (g)",
   "fr": "Protéines (g)"
  },
  "Carbohidratos (g)": {
   "en": "Carbs (g)",
   "pt-BR": "Carboidratos (g)",
   "fr": "Glucides (g)"
  },
  "Grasa (g)": {
   "en": "Fat (g)",
   "pt-BR": "Gordura (g)",
   "fr": "Lipides (g)"
  },
  "Nombre de la plantilla": {
   "en": "Template name",
   "pt-BR": "Nome do modelo",
   "fr": "Nom du modèle"
  },
  "Ese día no tiene comidas registradas.": {
   "en": "That day has no meals logged.",
   "pt-BR": "Esse dia não tem refeições registradas.",
   "fr": "Ce jour n'a aucun repas enregistré."
  },
  "Escribe las calorías diarias (mínimo 800).": {
   "en": "Enter the daily calories (minimum 800).",
   "pt-BR": "Informe as calorias diárias (mínimo 800).",
   "fr": "Saisissez les calories quotidiennes (minimum 800)."
  },
  "Escribe las indicaciones.": {
   "en": "Write the instructions.",
   "pt-BR": "Escreva as orientações.",
   "fr": "Rédigez les consignes."
  },
  "Ponle un nombre a la plantilla.": {
   "en": "Give the template a name.",
   "pt-BR": "Dê um nome ao modelo.",
   "fr": "Donnez un nom au modèle."
  },
  "Atletas": {
   "en": "Athletes",
   "pt-BR": "Atletas",
   "fr": "Athlètes"
  },
  "No tienes atletas a los que puedas asignar este tipo de plantilla.": {
   "en": "You have no athletes you can assign this kind of template to.",
   "pt-BR": "Você não tem atletas a quem atribuir este tipo de modelo.",
   "fr": "Vous n'avez aucun athlète à qui attribuer ce type de modèle."
  },
  "Nota para el atleta (opcional)": {
   "en": "Note for the athlete (optional)",
   "pt-BR": "Nota para o atleta (opcional)",
   "fr": "Note pour l'athlète (facultatif)"
  },
  "Reemplaza lo que ya le hayas asignado de este mismo tipo.": {
   "en": "It replaces what you already assigned of this same kind.",
   "pt-BR": "Substitui o que você já atribuiu deste mesmo tipo.",
   "fr": "Cela remplace ce que vous avez déjà attribué du même type."
  },
  "Elige al menos un atleta.": {
   "en": "Choose at least one athlete.",
   "pt-BR": "Escolha pelo menos um atleta.",
   "fr": "Choisissez au moins un athlète."
  },
  "Aún no hay notas.": {
   "en": "No notes yet.",
   "pt-BR": "Ainda não há notas.",
   "fr": "Pas encore de notes."
  },
  "Escribe una nota…": {
   "en": "Write a note…",
   "pt-BR": "Escreva uma nota…",
   "fr": "Écrivez une note…"
  },
  "Enviar": {
   "en": "Send",
   "pt-BR": "Enviar",
   "fr": "Envoyer"
  },
  "De tus especialistas": {
   "en": "From your specialists",
   "pt-BR": "Dos seus especialistas",
   "fr": "De vos spécialistes"
  },
  "De tu especialista": {
   "en": "From your specialist",
   "pt-BR": "Do seu especialista",
   "fr": "De votre spécialiste"
  },
  "Ya está en tu pestaña Gym, lista para registrar.": {
   "en": "It's already in your Gym tab, ready to log.",
   "pt-BR": "Já está na sua aba Gym, pronta para registrar.",
   "fr": "Elle est déjà dans votre onglet Gym, prête à être enregistrée."
  },
  "Ir a Gym": {
   "en": "Go to Gym",
   "pt-BR": "Ir para Gym",
   "fr": "Aller à Gym"
  },
  "Registrar en hoy": {
   "en": "Log for today",
   "pt-BR": "Registrar hoje",
   "fr": "Enregistrer aujourd'hui"
  },
  "Registrado": {
   "en": "Logged",
   "pt-BR": "Registrado",
   "fr": "Enregistré"
  },
  "Ya se usan como tu meta diaria en Comida.": {
   "en": "They are already used as your daily target in Meal.",
   "pt-BR": "Já são usadas como sua meta diária em Refeição.",
   "fr": "Ils servent déjà d'objectif quotidien dans Repas."
  },
  "Asignado": {
   "en": "Assigned",
   "pt-BR": "Atribuído",
   "fr": "Attribué"
  },
  "Nada asignado todavía.": {
   "en": "Nothing assigned yet.",
   "pt-BR": "Nada atribuído ainda.",
   "fr": "Rien d'attribué pour l'instant."
  },
  "Asignar plantilla": {
   "en": "Assign template",
   "pt-BR": "Atribuir modelo",
   "fr": "Attribuer un modèle"
  },
  "¿Quitar esta asignación? Dejará de aparecerle al atleta.": {
   "en": "Remove this assignment? The athlete will stop seeing it.",
   "pt-BR": "Remover esta atribuição? O atleta deixará de vê-la.",
   "fr": "Retirer cette attribution ? L'athlète ne la verra plus."
  },
  "Especialistas y atletas": {
   "en": "Specialists and athletes",
   "pt-BR": "Especialistas e atletas",
   "fr": "Spécialistes et athlètes"
  },
  "entrenamientos": {
   "en": "workouts",
   "pt-BR": "treinos",
   "fr": "entraînements"
  },
  "rutinas": {
   "en": "routines",
   "pt-BR": "rotinas",
   "fr": "routines"
  },
  "peso": {
   "en": "weight",
   "pt-BR": "peso",
   "fr": "poids"
  },
  "comidas": {
   "en": "meals",
   "pt-BR": "refeições",
   "fr": "repas"
  },
  "metas de nutrición": {
   "en": "nutrition targets",
   "pt-BR": "metas de nutrição",
   "fr": "objectifs de nutrition"
  },
  "agua": {
   "en": "water",
   "pt-BR": "água",
   "fr": "eau"
  },
  "Ese código no existe o ya venció.": {
   "en": "That code doesn't exist or has expired.",
   "pt-BR": "Esse código não existe ou já expirou.",
   "fr": "Ce code n'existe pas ou a expiré."
  },
  "Ese código es tuyo; compártelo con tu atleta.": {
   "en": "That code is yours; share it with your athlete.",
   "pt-BR": "Esse código é seu; compartilhe com seu atleta.",
   "fr": "Ce code est le vôtre ; partagez-le avec votre athlète."
  },
  "Tienes demasiadas invitaciones pendientes. Cancela alguna.": {
   "en": "You have too many pending invitations. Cancel one.",
   "pt-BR": "Você tem convites pendentes demais. Cancele algum.",
   "fr": "Vous avez trop d'invitations en attente. Annulez-en une."
  },
  "Tu cuenta no tiene esa especialidad.": {
   "en": "Your account doesn't have that specialty.",
   "pt-BR": "Sua conta não tem essa especialidade.",
   "fr": "Votre compte n'a pas cette spécialité."
  },
  "Puede ver:": {
   "en": "Can see:",
   "pt-BR": "Pode ver:",
   "fr": "Peut voir :"
  },
  "Podrá ver:": {
   "en": "Will be able to see:",
   "pt-BR": "Poderá ver:",
   "fr": "Pourra voir :"
  },
  "Dejar de compartir": {
   "en": "Stop sharing",
   "pt-BR": "Parar de compartilhar",
   "fr": "Arrêter le partage"
  },
  "Sin registros todavía": {
   "en": "No records yet",
   "pt-BR": "Ainda sem registros",
   "fr": "Aucune donnée pour l'instant"
  },
  "Registró hoy": {
   "en": "Logged today",
   "pt-BR": "Registrou hoje",
   "fr": "A enregistré aujourd'hui"
  },
  "Invitación sin usar": {
   "en": "Unused invitation",
   "pt-BR": "Convite não usado",
   "fr": "Invitation non utilisée"
  },
  "Cancelar invitación": {
   "en": "Cancel invitation",
   "pt-BR": "Cancelar convite",
   "fr": "Annuler l'invitation"
  },
  "Mis atletas": {
   "en": "My athletes",
   "pt-BR": "Meus atletas",
   "fr": "Mes athlètes"
  },
  "Aún no tienes atletas vinculados.": {
   "en": "You don't have any linked athletes yet.",
   "pt-BR": "Você ainda não tem atletas vinculados.",
   "fr": "Vous n'avez pas encore d'athlètes liés."
  },
  "Invitar como": {
   "en": "Invite as",
   "pt-BR": "Convidar como",
   "fr": "Inviter comme"
  },
  "Mis especialistas": {
   "en": "My specialists",
   "pt-BR": "Meus especialistas",
   "fr": "Mes spécialistes"
  },
  "Nadie más ve tus datos.": {
   "en": "Nobody else sees your data.",
   "pt-BR": "Ninguém mais vê seus dados.",
   "fr": "Personne d'autre ne voit vos données."
  },
  "Código de invitación": {
   "en": "Invitation code",
   "pt-BR": "Código do convite",
   "fr": "Code d'invitation"
  },
  "¿Terminar este vínculo? La otra persona dejará de ver los datos.": {
   "en": "End this link? The other person will stop seeing the data.",
   "pt-BR": "Encerrar este vínculo? A outra pessoa deixará de ver os dados.",
   "fr": "Mettre fin à ce lien ? L'autre personne ne verra plus les données."
  },
  "Invitación": {
   "en": "Invitation",
   "pt-BR": "Convite",
   "fr": "Invitation"
  },
  "Comparte este código con tu atleta. Lo escribe en Más → Especialistas y atletas. Vence en 14 días.": {
   "en": "Share this code with your athlete. They enter it in More → Specialists and athletes. It expires in 14 days.",
   "pt-BR": "Compartilhe este código com seu atleta. Ele o digita em Mais → Especialistas e atletas. Expira em 14 dias.",
   "fr": "Partagez ce code avec votre athlète. Il le saisit dans Plus → Spécialistes et athlètes. Il expire dans 14 jours."
  },
  "Volver": {
   "en": "Back",
   "pt-BR": "Voltar",
   "fr": "Retour"
  },
  "Activa primero el respaldo en la nube; sin él no hay datos que compartir.": {
   "en": "Turn on cloud backup first; without it there is no data to share.",
   "pt-BR": "Ative primeiro o backup na nuvem; sem ele não há dados para compartilhar.",
   "fr": "Activez d'abord la sauvegarde dans le cloud ; sans elle, il n'y a rien à partager."
  },
  "Aceptar invitación": {
   "en": "Accept invitation",
   "pt-BR": "Aceitar convite",
   "fr": "Accepter l'invitation"
  },
  "quiere acompañarte como": {
   "en": "wants to work with you as",
   "pt-BR": "quer acompanhar você como",
   "fr": "souhaite vous accompagner comme"
  },
  "No podrá cambiar tus registros. Puedes dejar de compartir cuando quieras desde esta misma pantalla.": {
   "en": "They won't be able to change your records. You can stop sharing any time from this same screen.",
   "pt-BR": "Ele não poderá alterar seus registros. Você pode parar de compartilhar quando quiser nesta mesma tela.",
   "fr": "Il ne pourra pas modifier vos données. Vous pouvez arrêter le partage à tout moment depuis cet écran."
  },
  "Aceptar y compartir": {
   "en": "Accept and share",
   "pt-BR": "Aceitar e compartilhar",
   "fr": "Accepter et partager"
  },
  "Últimos 30 días": {
   "en": "Last 30 days",
   "pt-BR": "Últimos 30 dias",
   "fr": "30 derniers jours"
  },
  "Solo lectura": {
   "en": "Read-only",
   "pt-BR": "Somente leitura",
   "fr": "Lecture seule"
  },
  "Comidas": {
   "en": "Meals",
   "pt-BR": "Refeições",
   "fr": "Repas"
  },
  "Meta diaria:": {
   "en": "Daily target:",
   "pt-BR": "Meta diária:",
   "fr": "Objectif quotidien :"
  },
  "Sin comidas registradas en este periodo.": {
   "en": "No meals logged in this period.",
   "pt-BR": "Sem refeições registradas neste período.",
   "fr": "Aucun repas enregistré sur cette période."
  },
  "Entrenamientos": {
   "en": "Workouts",
   "pt-BR": "Treinos",
   "fr": "Entraînements"
  },
  "Sin series registradas": {
   "en": "No sets logged",
   "pt-BR": "Sem séries registradas",
   "fr": "Aucune série enregistrée"
  },
  "Sin entrenamientos registrados en este periodo.": {
   "en": "No workouts logged in this period.",
   "pt-BR": "Sem treinos registrados neste período.",
   "fr": "Aucun entraînement enregistré sur cette période."
  },
  "Respaldo en la nube": {
   "en": "Cloud backup",
   "pt-BR": "Backup na nuvem",
   "fr": "Sauvegarde dans le cloud"
  },
  "activado": {
   "en": "on",
   "pt-BR": "ativado",
   "fr": "activée"
  },
  "desactivado": {
   "en": "off",
   "pt-BR": "desativado",
   "fr": "désactivée"
  },
  "Con el respaldo activado, tus registros (comidas, entrenamientos, hábitos, peso, rutinas y ajustes de nutrición) se guardan también en el servidor de Rutinal.": {
   "en": "With backup on, your records (meals, workouts, habits, weight, routines and nutrition settings) are also saved on Rutinal's server.",
   "pt-BR": "Com o backup ativado, seus registros (refeições, treinos, hábitos, peso, rotinas e ajustes de nutrição) também são salvos no servidor do Rutinal.",
   "fr": "Avec la sauvegarde activée, vos données (repas, entraînements, habitudes, poids, routines et réglages de nutrition) sont aussi enregistrées sur le serveur de Rutinal."
  },
  "No pierdes nada si cambias de celular o reinstalas la app.": {
   "en": "You lose nothing if you change phones or reinstall the app.",
   "pt-BR": "Você não perde nada se trocar de celular ou reinstalar o app.",
   "fr": "Vous ne perdez rien si vous changez de téléphone ou réinstallez l'app."
  },
  "Solo tú los ves, hasta que aceptes la invitación de un especialista; él verá solo lo de su área.": {
   "en": "Only you can see them, until you accept a specialist's invitation; they will see only their own area.",
   "pt-BR": "Só você os vê, até aceitar o convite de um especialista; ele verá apenas a área dele.",
   "fr": "Vous seul les voyez, jusqu'à ce que vous acceptiez l'invitation d'un spécialiste ; il ne verra que son domaine."
  },
  "Las fotos de alimentos se quedan en tu dispositivo.": {
   "en": "Food photos stay on your device.",
   "pt-BR": "As fotos de alimentos ficam no seu dispositivo.",
   "fr": "Les photos d'aliments restent sur votre appareil."
  },
  "Estado: activado.": {
   "en": "Status: on.",
   "pt-BR": "Status: ativado.",
   "fr": "État : activée."
  },
  "Última sincronización:": {
   "en": "Last sync:",
   "pt-BR": "Última sincronização:",
   "fr": "Dernière synchronisation :"
  },
  "Sincronizar ahora": {
   "en": "Sync now",
   "pt-BR": "Sincronizar agora",
   "fr": "Synchroniser maintenant"
  },
  "Desactivar respaldo": {
   "en": "Turn off backup",
   "pt-BR": "Desativar backup",
   "fr": "Désactiver la sauvegarde"
  },
  "Al desactivarlo, lo que ya se guardó en el servidor se conserva; para borrarlo, pídeselo a quien administra tu cuenta.": {
   "en": "When you turn it off, what was already saved on the server is kept; to delete it, ask whoever manages your account.",
   "pt-BR": "Ao desativar, o que já foi salvo no servidor é mantido; para apagar, peça a quem administra sua conta.",
   "fr": "Si vous la désactivez, ce qui est déjà sur le serveur est conservé ; pour le supprimer, demandez à la personne qui gère votre compte."
  },
  "Activar respaldo": {
   "en": "Turn on backup",
   "pt-BR": "Ativar backup",
   "fr": "Activer la sauvegarde"
  },
  "Ahora no": {
   "en": "Not now",
   "pt-BR": "Agora não",
   "fr": "Pas maintenant"
  },
  "Puedes cambiarlo cuando quieras en Más → Respaldo en la nube.": {
   "en": "You can change this any time in More → Cloud backup.",
   "pt-BR": "Você pode mudar isso quando quiser em Mais → Backup na nuvem.",
   "fr": "Vous pouvez changer cela à tout moment dans Plus → Sauvegarde dans le cloud."
  },
  "Sincronizando...": {
   "en": "Syncing...",
   "pt-BR": "Sincronizando...",
   "fr": "Synchronisation..."
  },
  "Quedó activado, pero no se pudo conectar. Se sincronizará cuando haya internet.": {
   "en": "It's on, but we couldn't connect. It will sync when you're online.",
   "pt-BR": "Ficou ativado, mas não foi possível conectar. Vai sincronizar quando houver internet.",
   "fr": "C'est activé, mais la connexion a échoué. La synchronisation se fera dès que vous serez en ligne."
  },
  "Listo, todo está al día.": {
   "en": "Done, everything is up to date.",
   "pt-BR": "Pronto, está tudo em dia.",
   "fr": "C'est fait, tout est à jour."
  },
  "No se pudo conectar. Inténtalo más tarde.": {
   "en": "Couldn't connect. Try again later.",
   "pt-BR": "Não foi possível conectar. Tente mais tarde.",
   "fr": "Connexion impossible. Réessayez plus tard."
  },
  "¿Desactivar el respaldo en la nube? Tus datos se quedan en este dispositivo.": {
   "en": "Turn off cloud backup? Your data stays on this device.",
   "pt-BR": "Desativar o backup na nuvem? Seus dados ficam neste dispositivo.",
   "fr": "Désactiver la sauvegarde dans le cloud ? Vos données restent sur cet appareil."
  },
  "Este dispositivo tiene datos de otra cuenta": {
   "en": "This device has data from another account",
   "pt-BR": "Este dispositivo tem dados de outra conta",
   "fr": "Cet appareil contient les données d'un autre compte"
  },
  "Para usar la tuya hay que borrarlos de este dispositivo.": {
   "en": "To use yours, they must be deleted from this device.",
   "pt-BR": "Para usar a sua, é preciso apagá-los deste dispositivo.",
   "fr": "Pour utiliser le vôtre, il faut les supprimer de cet appareil."
  },
  "Esos datos no están respaldados en la nube y se perderán.": {
   "en": "That data is not backed up to the cloud and will be lost.",
   "pt-BR": "Esses dados não têm backup na nuvem e serão perdidos.",
   "fr": "Ces données ne sont pas sauvegardées dans le cloud et seront perdues."
  },
  "Esos datos ya están respaldados en la nube.": {
   "en": "That data is already backed up to the cloud.",
   "pt-BR": "Esses dados já têm backup na nuvem.",
   "fr": "Ces données sont déjà sauvegardées dans le cloud."
  },
  "¿Borrarlos y continuar?": {
   "en": "Delete them and continue?",
   "pt-BR": "Apagá-los e continuar?",
   "fr": "Les supprimer et continuer ?"
  },
  "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.": {
   "en": "Too many attempts. Wait a few minutes and try again.",
   "pt-BR": "Muitas tentativas. Espere alguns minutos e tente de novo.",
   "fr": "Trop de tentatives. Attendez quelques minutes et réessayez."
  },
  "La contraseña nueva debe ser distinta a la actual.": {
   "en": "The new password must be different from the current one.",
   "pt-BR": "A nova senha deve ser diferente da atual.",
   "fr": "Le nouveau mot de passe doit être différent de l'actuel."
  },
  "No se pudo crear el usuario.": {
   "en": "Couldn't create the user.",
   "pt-BR": "Não foi possível criar o usuário.",
   "fr": "Impossible de créer l'utilisateur."
  },
  "Actualizamos el inicio de sesión. Entra de nuevo con tu misma contraseña.": {
   "en": "We updated sign-in. Sign in again with your same password.",
   "pt-BR": "Atualizamos o login. Entre de novo com a mesma senha.",
   "fr": "Nous avons mis à jour la connexion. Reconnectez-vous avec le même mot de passe."
  },
  "Especialista": {
   "en": "Specialist",
   "pt-BR": "Especialista",
   "fr": "Spécialiste"
  },
  "Administrador": {
   "en": "Admin",
   "pt-BR": "Administrador",
   "fr": "Administrateur"
  },
  "Coach": {
   "en": "Coach",
   "pt-BR": "Coach",
   "fr": "Coach"
  },
  "Nutriólogo": {
   "en": "Nutritionist",
   "pt-BR": "Nutricionista",
   "fr": "Nutritionniste"
  },
  "Fisioterapeuta": {
   "en": "Physiotherapist",
   "pt-BR": "Fisioterapeuta",
   "fr": "Kinésithérapeute"
  },
  "Nombre (opcional)": {
   "en": "Name (optional)",
   "pt-BR": "Nome (opcional)",
   "fr": "Nom (facultatif)"
  },
  "Teléfono, plan, etc.": {
   "en": "Phone, plan, etc.",
   "pt-BR": "Telefone, plano, etc.",
   "fr": "Téléphone, formule, etc."
  },
  "Especialista en": {
   "en": "Specialist in",
   "pt-BR": "Especialista em",
   "fr": "Spécialiste en"
  },
  "Sin marcar ninguna, la cuenta es solo de atleta.": {
   "en": "With none checked, the account is athlete only.",
   "pt-BR": "Sem marcar nenhuma, a conta é só de atleta.",
   "fr": "Sans aucune case cochée, le compte est seulement athlète."
  },
  "Acceso": {
   "en": "Access",
   "pt-BR": "Acesso",
   "fr": "Accès"
  },
  "Inicia sesión para continuar": {
   "en": "Sign in to continue",
   "pt-BR": "Entre para continuar",
   "fr": "Connectez-vous pour continuer"
  },
  "Usuario": {
   "en": "Username",
   "pt-BR": "Usuário",
   "fr": "Identifiant"
  },
  "Contraseña": {
   "en": "Password",
   "pt-BR": "Senha",
   "fr": "Mot de passe"
  },
  "Ver": {
   "en": "Show",
   "pt-BR": "Ver",
   "fr": "Voir"
  },
  "Ocultar": {
   "en": "Hide",
   "pt-BR": "Ocultar",
   "fr": "Masquer"
  },
  "Entrar": {
   "en": "Sign in",
   "pt-BR": "Entrar",
   "fr": "Se connecter"
  },
  "Entrando...": {
   "en": "Signing in...",
   "pt-BR": "Entrando...",
   "fr": "Connexion..."
  },
  "¿No tienes cuenta? Pídele tu usuario y contraseña a quien te compartió la app.": {
   "en": "No account? Ask whoever shared the app with you for your username and password.",
   "pt-BR": "Não tem conta? Peça seu usuário e senha a quem compartilhou o app com você.",
   "fr": "Pas de compte ? Demandez votre identifiant et votre mot de passe à la personne qui vous a partagé l'app."
  },
  "Usuario o contraseña incorrectos.": {
   "en": "Wrong username or password.",
   "pt-BR": "Usuário ou senha incorretos.",
   "fr": "Identifiant ou mot de passe incorrect."
  },
  "Demasiados intentos. Espera 15 minutos e inténtalo de nuevo.": {
   "en": "Too many attempts. Wait 15 minutes and try again.",
   "pt-BR": "Muitas tentativas. Espere 15 minutos e tente de novo.",
   "fr": "Trop de tentatives. Attendez 15 minutes et réessayez."
  },
  "Tu acceso está desactivado. Contacta a quien te dio la cuenta.": {
   "en": "Your access is disabled. Contact whoever gave you the account.",
   "pt-BR": "Seu acesso está desativado. Fale com quem te deu a conta.",
   "fr": "Votre accès est désactivé. Contactez la personne qui vous a donné le compte."
  },
  "No se pudo conectar. Revisa tu internet e inténtalo de nuevo.": {
   "en": "Couldn't connect. Check your internet and try again.",
   "pt-BR": "Não foi possível conectar. Verifique sua internet e tente de novo.",
   "fr": "Connexion impossible. Vérifiez votre connexion internet et réessayez."
  },
  "La contraseña debe tener al menos 6 caracteres.": {
   "en": "The password must be at least 6 characters long.",
   "pt-BR": "A senha deve ter pelo menos 6 caracteres.",
   "fr": "Le mot de passe doit contenir au moins 6 caractères."
  },
  "El usuario debe tener de 3 a 32 caracteres: letras, números, punto, guion o guion bajo.": {
   "en": "The username must be 3 to 32 characters: letters, numbers, dot, hyphen or underscore.",
   "pt-BR": "O usuário deve ter de 3 a 32 caracteres: letras, números, ponto, hífen ou sublinhado.",
   "fr": "L'identifiant doit contenir de 3 à 32 caractères : lettres, chiffres, point, tiret ou tiret bas."
  },
  "No puedes quitarte tu propio acceso de administrador.": {
   "en": "You can't remove your own admin access.",
   "pt-BR": "Você não pode remover seu próprio acesso de administrador.",
   "fr": "Vous ne pouvez pas retirer votre propre accès administrateur."
  },
  "Tu cuenta no tiene permiso para administrar usuarios.": {
   "en": "Your account isn't allowed to manage users.",
   "pt-BR": "Sua conta não tem permissão para gerenciar usuários.",
   "fr": "Votre compte n'est pas autorisé à gérer les utilisateurs."
  },
  "Tu sesión ya no es válida. Vuelve a iniciar sesión.": {
   "en": "Your session is no longer valid. Sign in again.",
   "pt-BR": "Sua sessão não é mais válida. Entre de novo.",
   "fr": "Votre session n'est plus valide. Reconnectez-vous."
  },
  "Tu acceso ya no está activo. Vuelve a iniciar sesión o contacta a quien te dio la cuenta.": {
   "en": "Your access is no longer active. Sign in again or contact whoever gave you the account.",
   "pt-BR": "Seu acesso não está mais ativo. Entre de novo ou fale com quem te deu a conta.",
   "fr": "Votre accès n'est plus actif. Reconnectez-vous ou contactez la personne qui vous a donné le compte."
  },
  "Conéctate a internet para verificar tu acceso.": {
   "en": "Connect to the internet to verify your access.",
   "pt-BR": "Conecte-se à internet para verificar seu acesso.",
   "fr": "Connectez-vous à internet pour vérifier votre accès."
  },
  "Cuenta": {
   "en": "Account",
   "pt-BR": "Conta",
   "fr": "Compte"
  },
  "Sesión iniciada como": {
   "en": "Signed in as",
   "pt-BR": "Sessão iniciada como",
   "fr": "Connecté en tant que"
  },
  "Administrar usuarios": {
   "en": "Manage users",
   "pt-BR": "Gerenciar usuários",
   "fr": "Gérer les utilisateurs"
  },
  "Cambiar contraseña": {
   "en": "Change password",
   "pt-BR": "Alterar senha",
   "fr": "Changer le mot de passe"
  },
  "Cerrar sesión": {
   "en": "Sign out",
   "pt-BR": "Sair",
   "fr": "Se déconnecter"
  },
  "¿Cerrar sesión? Tus datos se quedan guardados en este dispositivo.": {
   "en": "Sign out? Your data stays saved on this device.",
   "pt-BR": "Sair? Seus dados continuam salvos neste dispositivo.",
   "fr": "Se déconnecter ? Vos données restent enregistrées sur cet appareil."
  },
  "Contraseña actual": {
   "en": "Current password",
   "pt-BR": "Senha atual",
   "fr": "Mot de passe actuel"
  },
  "Contraseña nueva": {
   "en": "New password",
   "pt-BR": "Nova senha",
   "fr": "Nouveau mot de passe"
  },
  "Repite la contraseña nueva": {
   "en": "Repeat the new password",
   "pt-BR": "Repita a nova senha",
   "fr": "Répétez le nouveau mot de passe"
  },
  "Las contraseñas nuevas no coinciden.": {
   "en": "The new passwords don't match.",
   "pt-BR": "As novas senhas não coincidem.",
   "fr": "Les nouveaux mots de passe ne correspondent pas."
  },
  "La contraseña actual no es correcta.": {
   "en": "The current password is wrong.",
   "pt-BR": "A senha atual está incorreta.",
   "fr": "Le mot de passe actuel est incorrect."
  },
  "Contraseña actualizada.": {
   "en": "Password updated.",
   "pt-BR": "Senha atualizada.",
   "fr": "Mot de passe mis à jour."
  },
  "Contraseña actualizada": {
   "en": "Password updated",
   "pt-BR": "Senha atualizada",
   "fr": "Mot de passe mis à jour"
  },
  "Usuarios": {
   "en": "Users",
   "pt-BR": "Usuários",
   "fr": "Utilisateurs"
  },
  "Cargando...": {
   "en": "Loading...",
   "pt-BR": "Carregando...",
   "fr": "Chargement..."
  },
  "Nuevo usuario": {
   "en": "New user",
   "pt-BR": "Novo usuário",
   "fr": "Nouvel utilisateur"
  },
  "Editar usuario": {
   "en": "Edit user",
   "pt-BR": "Editar usuário",
   "fr": "Modifier l'utilisateur"
  },
  "Aún no ha entrado": {
   "en": "Hasn't signed in yet",
   "pt-BR": "Ainda não entrou",
   "fr": "Ne s'est pas encore connecté"
  },
  "tú": {
   "en": "you",
   "pt-BR": "você",
   "fr": "vous"
  },
  "Admin": {
   "en": "Admin",
   "pt-BR": "Admin",
   "fr": "Admin"
  },
  "Activo": {
   "en": "Active",
   "pt-BR": "Ativo",
   "fr": "Actif"
  },
  "Al desactivar o eliminar un usuario, pierde el acceso la próxima vez que su app tenga internet.": {
   "en": "When you disable or delete a user, they lose access the next time their app is online.",
   "pt-BR": "Ao desativar ou excluir um usuário, ele perde o acesso na próxima vez que o app dele tiver internet.",
   "fr": "Lorsque vous désactivez ou supprimez un utilisateur, il perd l'accès dès que son app est de nouveau en ligne."
  },
  "Contraseña nueva (opcional)": {
   "en": "New password (optional)",
   "pt-BR": "Nova senha (opcional)",
   "fr": "Nouveau mot de passe (facultatif)"
  },
  "Generar": {
   "en": "Generate",
   "pt-BR": "Gerar",
   "fr": "Générer"
  },
  "Nota (opcional)": {
   "en": "Note (optional)",
   "pt-BR": "Nota (opcional)",
   "fr": "Note (facultatif)"
  },
  "Nombre, teléfono, etc.": {
   "en": "Name, phone, etc.",
   "pt-BR": "Nome, telefone, etc.",
   "fr": "Nom, téléphone, etc."
  },
  "Acceso activo": {
   "en": "Access enabled",
   "pt-BR": "Acesso ativo",
   "fr": "Accès actif"
  },
  "Administrador (puede dar de alta usuarios)": {
   "en": "Admin (can create users)",
   "pt-BR": "Administrador (pode criar usuários)",
   "fr": "Administrateur (peut créer des utilisateurs)"
  },
  "Eliminar usuario": {
   "en": "Delete user",
   "pt-BR": "Excluir usuário",
   "fr": "Supprimer l'utilisateur"
  },
  "Ese usuario ya existe.": {
   "en": "That username already exists.",
   "pt-BR": "Esse usuário já existe.",
   "fr": "Cet identifiant existe déjà."
  },
  "Usuario creado": {
   "en": "User created",
   "pt-BR": "Usuário criado",
   "fr": "Utilisateur créé"
  },
  "Comparte estos datos con la persona. La contraseña no se podrá volver a ver.": {
   "en": "Share these details with the person. The password can't be shown again.",
   "pt-BR": "Compartilhe estes dados com a pessoa. A senha não poderá ser vista de novo.",
   "fr": "Partagez ces informations avec la personne. Le mot de passe ne pourra plus être affiché."
  },
  "Usuario:": {
   "en": "Username:",
   "pt-BR": "Usuário:",
   "fr": "Identifiant :"
  },
  "Contraseña:": {
   "en": "Password:",
   "pt-BR": "Senha:",
   "fr": "Mot de passe :"
  },
  "Copiar": {
   "en": "Copy",
   "pt-BR": "Copiar",
   "fr": "Copier"
  },
  "Copiado": {
   "en": "Copied",
   "pt-BR": "Copiado",
   "fr": "Copié"
  },
  "No se pudo copiar": {
   "en": "Couldn't copy",
   "pt-BR": "Não foi possível copiar",
   "fr": "Copie impossible"
  },
  "Volver a usuarios": {
   "en": "Back to users",
   "pt-BR": "Voltar para usuários",
   "fr": "Retour aux utilisateurs"
  },
  "¿Eliminar este usuario? Perderá el acceso a la app.": {
   "en": "Delete this user? They will lose access to the app.",
   "pt-BR": "Excluir este usuário? Ele perderá o acesso ao app.",
   "fr": "Supprimer cet utilisateur ? Il perdra l'accès à l'app."
  }
 },
 "tpl": {
  "Registrado hace {{n}} días": {
   "en": "Logged {{n}} days ago",
   "pt-BR": "Registrado há {{n}} dias",
   "fr": "Enregistré il y a {{n}} jours"
  },
  "Sin registros desde hace {{n}} días": {
   "en": "No records for {{n}} days",
   "pt-BR": "Sem registros há {{n}} dias",
   "fr": "Aucune donnée depuis {{n}} jours"
  },
  "Último registro hace {{n}} días": {
   "en": "Last record {{n}} days ago",
   "pt-BR": "Último registro há {{n}} dias",
   "fr": "Dernière donnée il y a {{n}} jours"
  },
  "Comidas registradas: {{n}} de 7 días": {
   "en": "Meals logged: {{n}} of 7 days",
   "pt-BR": "Refeições registradas: {{n}} de 7 dias",
   "fr": "Repas enregistrés : {{n}} jours sur 7"
  },
  "Entrenamientos en 7 días: {{n}}": {
   "en": "Workouts in 7 days: {{n}}",
   "pt-BR": "Treinos em 7 dias: {{n}}",
   "fr": "Entraînements sur 7 jours : {{n}}"
  },
  "Dolor máximo: {{n}}/10": {
   "en": "Max pain: {{n}}/10",
   "pt-BR": "Dor máxima: {{n}}/10",
   "fr": "Douleur max : {{n}}/10"
  },
  "Último acceso: {{x}}": {
   "en": "Last sign-in: {{x}}",
   "pt-BR": "Último acesso: {{x}}",
   "fr": "Dernière connexion : {{x}}"
  },
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
  "{{n}} series · {{x}} {{u}}": {
   "en": "{{n}} sets · {{x}} {{u}}",
   "pt-BR": "{{n}} séries · {{x}} {{u}}",
   "fr": "{{n}} séries · {{x}} {{u}}"
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
  },
  "Dolor {{n}}/10 la última vez: baja ~10% la carga (≈ {{x}} {{u}}) o quita 1 serie. Cambia solo una cosa.": {
   "en": "Pain {{n}}/10 last time: lower the load ~10% (≈ {{x}} {{u}}) or drop 1 set. Change only one thing.",
   "pt-BR": "Dor {{n}}/10 na última vez: reduza ~10% a carga (≈ {{x}} {{u}}) ou tire 1 série. Mude só uma coisa.",
   "fr": "Douleur {{n}}/10 la dernière fois : baissez la charge d'~10 % (≈ {{x}} {{u}}) ou retirez 1 série. Ne changez qu'une chose."
  },
  "El dolor subió de {{n}} a {{n2}}/10: baja ~10% la carga o el volumen.": {
   "en": "Pain went up from {{n}} to {{n2}}/10: lower the load or volume ~10%.",
   "pt-BR": "A dor subiu de {{n}} para {{n2}}/10: reduza ~10% a carga ou o volume.",
   "fr": "La douleur est passée de {{n}} à {{n2}}/10 : baissez la charge ou le volume d'~10 %."
  },
  "Semana {{n}} con esta prescripción: progresa a las 2–3 semanas.": {
   "en": "Week {{n}} on this prescription: progress at 2–3 weeks.",
   "pt-BR": "Semana {{n}} com esta prescrição: progrida em 2–3 semanas.",
   "fr": "Semaine {{n}} avec cette prescription : progressez au bout de 2–3 semaines."
  },
  "Cumpliste el tope de reps: sube solo 1 variable, ej. +{{x}} {{u}} (≈ {{y}} {{u}}).": {
   "en": "You hit the top of the rep range: raise only 1 variable, e.g. +{{x}} {{u}} (≈ {{y}} {{u}}).",
   "pt-BR": "Você atingiu o máximo de reps: suba só 1 variável, ex. +{{x}} {{u}} (≈ {{y}} {{u}}).",
   "fr": "Haut de la fourchette atteint : augmentez une seule variable, ex. +{{x}} {{u}} (≈ {{y}} {{u}})."
  },
  "Mantén la carga hasta llegar a {{n}} reps en todas las series.": {
   "en": "Keep the load until you reach {{n}} reps on every set.",
   "pt-BR": "Mantenha a carga até chegar a {{n}} reps em todas as séries.",
   "fr": "Gardez la charge jusqu'à {{n}} rép. sur toutes les séries."
  },
  "{{n}}×/sem": {
   "en": "{{n}}×/wk",
   "pt-BR": "{{n}}×/sem",
   "fr": "{{n}}×/sem"
  },
  "Usar {{n}} g": {
   "en": "Use {{n}} g",
   "pt-BR": "Usar {{n}} g",
   "fr": "Utiliser {{n}} g"
  },
  "(≈ {{x}} × {{y}})": {
   "en": "(≈ {{x}} × {{y}})",
   "pt-BR": "(≈ {{x}} × {{y}})",
   "fr": "(≈ {{x}} × {{y}})"
  },
  "Te faltan {{n}} g de proteína hoy · esta porción te da {{n2}} g ({{n3}}%)": {
   "en": "You still need {{n}} g of protein today · this serving gives you {{n2}} g ({{n3}}%)",
   "pt-BR": "Faltam {{n}} g de proteína hoje · esta porção dá {{n2}} g ({{n3}}%)",
   "fr": "Il vous manque {{n}} g de protéines aujourd'hui · cette portion en apporte {{n2}} g ({{n3}} %)"
  },
  "Te faltan {{n}} g de proteína hoy y esta porción solo te da {{n2}} g": {
   "en": "You still need {{n}} g of protein today and this serving only gives you {{n2}} g",
   "pt-BR": "Faltam {{n}} g de proteína hoje e esta porção só dá {{n2}} g",
   "fr": "Il vous manque {{n}} g de protéines aujourd'hui et cette portion n'en apporte que {{n2}} g"
  },
  "Te faltan {{n}} kcal para tu meta · esta porción te da {{n2}}": {
   "en": "You still need {{n}} kcal to reach your goal · this serving gives you {{n2}}",
   "pt-BR": "Faltam {{n}} kcal para sua meta · esta porção dá {{n2}}",
   "fr": "Il vous manque {{n}} kcal pour votre objectif · cette portion en apporte {{n2}}"
  },
  "Con {{n}} g cubres {{n2}} g de proteína de los {{n3}} g que te faltan hoy.": {
   "en": "With {{n}} g you cover {{n2}} g of the {{n3}} g of protein you still need today.",
   "pt-BR": "Com {{n}} g você cobre {{n2}} g de proteína dos {{n3}} g que faltam hoje.",
   "fr": "Avec {{n}} g, vous couvrez {{n2}} g des {{n3}} g de protéines qu'il vous manque aujourd'hui."
  },
  "{{n}} kcal/100 g · hasta {{n2}} g": {
   "en": "{{n}} kcal/100 g · up to {{n2}} g",
   "pt-BR": "{{n}} kcal/100 g · até {{n2}} g",
   "fr": "{{n}} kcal/100 g · jusqu'à {{n2}} g"
  },
  "{{n}} kcal/100 g · sin problema": {
   "en": "{{n}} kcal/100 g · eat freely",
   "pt-BR": "{{n}} kcal/100 g · sem problema",
   "fr": "{{n}} kcal/100 g · sans souci"
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
