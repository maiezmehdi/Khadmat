export type Lang = 'fr' | 'dr';

export const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    search: 'Rechercher',
    bookings: 'Réservations',
    profile: 'Profil',
    dashboard: 'Tableau de bord',

    // Brand
    tagline: 'Les pros du quotidien, à portée de main.',
    tagline_sub: 'Trouvez, comparez et réservez des artisans vérifiés en quelques secondes.',

    // Actions
    book_now: 'Réserver maintenant',
    see_pros: 'Voir les pros',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    send: 'Envoyer',
    save: 'Enregistrer',
    learn_more: 'En savoir plus',
    apply: 'Postuler',
    sign_in: 'Se connecter',
    sign_out: 'Se déconnecter',
    get_started: 'Commencer',
    view_all: 'Voir tout',
    back: 'Retour',

    // Status
    status_pending: 'En attente',
    status_confirmed: 'Confirmé',
    status_in_progress: 'En cours',
    status_completed: 'Terminé',
    status_cancelled: 'Annulé',
    status_disputed: 'Litige',

    // Search
    search_placeholder: 'Quel service cherchez-vous ?',
    filter_city: 'Ville',
    filter_rating: 'Note',
    filter_price: 'Prix',
    available_today: 'Disponible aujourd\'hui',
    all_cities: 'Toutes les villes',
    sort_by: 'Trier par',
    sort_rating: 'Meilleure note',
    sort_price: 'Prix croissant',
    sort_distance: 'Distance',
    results_found: 'pros trouvés',

    // Booking
    choose_date: 'Choisir une date',
    choose_time: 'Choisir un créneau',
    your_address: 'Votre adresse',
    add_note: 'Ajouter une note (optionnel)',
    payment_method: 'Mode de paiement',
    pay_on_arrival: 'Paiement à la livraison',
    pay_flouci: 'Paiement Flouci',
    pay_konnect: 'Paiement Konnect',
    booking_confirmed: 'Réservation confirmée !',
    price_from: 'À partir de',
    price_estimate: 'Prix estimé',
    booking_summary: 'Résumé de la réservation',
    confirm_booking: 'Confirmer la réservation',
    booking_success: 'Votre réservation a été envoyée avec succès !',

    // Review
    leave_review: 'Laisser un avis',
    your_experience: 'Comment s\'est passée votre prestation ?',
    submit_review: 'Publier l\'avis',
    reviews: 'avis',
    no_reviews: 'Aucun avis pour l\'instant.',

    // Auth
    phone_number: 'Numéro de téléphone',
    enter_otp: 'Entrez le code reçu par SMS',
    verify: 'Vérifier',
    first_name: 'Prénom',
    last_name: 'Nom',
    your_city: 'Votre ville',
    i_am_client: 'Je cherche des pros',
    i_am_pro: 'Je suis artisan/pro',
    otp_sent: 'Code envoyé au',
    resend_otp: 'Renvoyer le code',
    welcome: 'Bienvenue sur Khadamat',
    enter_phone: 'Entrez votre numéro de téléphone pour continuer',

    // Categories
    plomberie: 'Plomberie',
    electricite: 'Électricité',
    menage: 'Ménage',
    peinture: 'Peinture',
    jardinage: 'Jardinage',
    climatisation: 'Climatisation',
    demenagement: 'Déménagement',
    informatique: 'Informatique',

    // Empty states
    no_pros_found: 'Aucun pro trouvé dans votre zone.',
    no_bookings: 'Vous n\'avez pas encore de réservations.',
    no_notifications: 'Aucune notification.',

    // Pro profile
    verified: 'Vérifié',
    years_exp: 'ans d\'expérience',
    response_time: 'Temps de réponse',
    minutes: 'min',
    service_zone: 'Zone d\'intervention',
    km_radius: 'km autour de',
    portfolio: 'Portfolio',
    services_offered: 'Services proposés',
    per_hour: '/ heure',
    flat_rate: 'forfait',
    quote: 'sur devis',
    available: 'Disponible',
    unavailable: 'Indisponible',

    // Dashboard Pro
    my_bookings: 'Mes réservations',
    pending_requests: 'Demandes en attente',
    upcoming: 'À venir',
    history: 'Historique',
    earnings: 'Gains',
    this_month: 'Ce mois',
    average_rating: 'Note moyenne',
    accept: 'Accepter',
    refuse: 'Refuser',
    mark_done: 'Marquer terminé',
    on_the_way: 'En route',

    // Cities
    tunis: 'Tunis',
    sfax: 'Sfax',
    sousse: 'Sousse',
    monastir: 'Monastir',
    bizerte: 'Bizerte',

    // Misc
    loading: 'Chargement...',
    error: 'Une erreur est survenue.',
    featured_pros: 'Pros disponibles aujourd\'hui',
    top_rated: 'Top notés près de vous',
    indicative_prices: 'Tarifs indicatifs',
    how_it_works: 'Comment ça marche ?',
    step1_title: 'Choisissez un service',
    step1_desc: 'Parcourez nos catégories et trouvez le pro dont vous avez besoin.',
    step2_title: 'Réservez en ligne',
    step2_desc: 'Sélectionnez un créneau, entrez votre adresse et confirmez.',
    step3_title: 'Votre pro arrive',
    step3_desc: 'Votre artisan vérifié arrive à l\'heure convenue.',
    hero_cta: 'Trouver un pro maintenant',
    join_as_pro: 'Rejoindre en tant que pro',
    join_title: 'Vous êtes artisan ?',
    join_desc: 'Rejoignez Khadamat et développez votre activité. Inscription gratuite, commissions raisonnables.',
    commission_rate: '12-15% de commission seulement',
    subscription_label: 'Abonnement pro dès 30 DT/mois',
  },

  dr: {
    // Navigation
    home: 'الرئيسية',
    search: 'ابحث',
    bookings: 'حجوزاتي',
    profile: 'حسابي',
    dashboard: 'لوحة التحكم',

    // Brand
    tagline: 'الحرفيين المضمونين، قريبين منك.',
    tagline_sub: 'لقّي، قارن وحجز حرفيين موثوقين في ثواني.',

    // Actions
    book_now: 'احجز دروا',
    see_pros: 'شوف الحرفيين',
    confirm: 'أكّد',
    cancel: 'الغي',
    send: 'ابعث',
    save: 'احفظ',
    learn_more: 'عرف أكثر',
    apply: 'قدّم',
    sign_in: 'دخّل',
    sign_out: 'اخرج',
    get_started: 'ابدأ',
    view_all: 'شوف الكل',
    back: 'ارجع',

    // Status
    status_pending: 'في الانتظار',
    status_confirmed: 'مؤكد',
    status_in_progress: 'في التنفيذ',
    status_completed: 'خلص',
    status_cancelled: 'ملغي',
    status_disputed: 'نزاع',

    // Search
    search_placeholder: 'شنو تحب تخدم ؟',
    filter_city: 'المدينة',
    filter_rating: 'التقييم',
    filter_price: 'السعر',
    available_today: 'متوفر اليوم',
    all_cities: 'كل المدن',
    sort_by: 'رتّب حسب',
    sort_rating: 'أفضل تقييم',
    sort_price: 'أقل سعر',
    sort_distance: 'المسافة',
    results_found: 'حرفيين لقيناهم',

    // Booking
    choose_date: 'اختار التاريخ',
    choose_time: 'اختار الوقت',
    your_address: 'عنوانك',
    add_note: 'زيد ملاحظة (اختياري)',
    payment_method: 'طريقة الدفع',
    pay_on_arrival: 'دفع عند الوصول',
    pay_flouci: 'دفع بفلوسي',
    pay_konnect: 'دفع بكونكت',
    booking_confirmed: 'الحجز مؤكد !',
    price_from: 'ابتداءً من',
    price_estimate: 'السعر التقريبي',
    booking_summary: 'ملخص الحجز',
    confirm_booking: 'أكّد الحجز',
    booking_success: 'تم إرسال حجزك بنجاح !',

    // Review
    leave_review: 'اترك تقييم',
    your_experience: 'كيفاش مشات الخدمة معاك ؟',
    submit_review: 'انشر التقييم',
    reviews: 'تقييم',
    no_reviews: 'ما كاش تقييمات بعد.',

    // Auth
    phone_number: 'رقم الهاتف',
    enter_otp: 'دخّل الكود اللي وصلك بالSMS',
    verify: 'تحقق',
    first_name: 'الاسم',
    last_name: 'اللقب',
    your_city: 'مدينتك',
    i_am_client: 'نحوّس على حرفي',
    i_am_pro: 'أنا حرفي / مقاول',
    otp_sent: 'الكود تبعثلك على',
    resend_otp: 'عاود ابعث الكود',
    welcome: 'مرحبا بيك في خدامات',
    enter_phone: 'دخّل رقم هاتفك باش تكمّل',

    // Categories
    plomberie: 'سبّاكة',
    electricite: 'كهرباء',
    menage: 'تنظيف',
    peinture: 'صباغة',
    jardinage: 'بستنة',
    climatisation: 'تكييف',
    demenagement: 'نقل عفش',
    informatique: 'كمبيوتر',

    // Empty states
    no_pros_found: 'ما لقيناش حرفي في منطقتك.',
    no_bookings: 'ماعندكش حجوزات بعد.',
    no_notifications: 'ما كاش إشعارات.',

    // Pro profile
    verified: 'موثوق',
    years_exp: 'سنوات خبرة',
    response_time: 'وقت الرد',
    minutes: 'دقيقة',
    service_zone: 'منطقة الخدمة',
    km_radius: 'كلم حول',
    portfolio: 'أعمالي',
    services_offered: 'الخدمات المقدمة',
    per_hour: '/ ساعة',
    flat_rate: 'سعر ثابت',
    quote: 'على طلب',
    available: 'متوفر',
    unavailable: 'غير متوفر',

    // Dashboard Pro
    my_bookings: 'حجوزاتي',
    pending_requests: 'طلبات في الانتظار',
    upcoming: 'القادمة',
    history: 'السابقة',
    earnings: 'الكسب',
    this_month: 'هذا الشهر',
    average_rating: 'معدل التقييم',
    accept: 'قبل',
    refuse: 'رفض',
    mark_done: 'علّم خلصت',
    on_the_way: 'في الطريق',

    // Cities
    tunis: 'تونس',
    sfax: 'صفاقس',
    sousse: 'سوسة',
    monastir: 'المنستير',
    bizerte: 'بنزرت',

    // Misc
    loading: 'تحميل...',
    error: 'صار خطأ.',
    featured_pros: 'حرفيين متوفرين اليوم',
    top_rated: 'الأعلى تقييماً قريبين منك',
    indicative_prices: 'الأسعار التقريبية',
    how_it_works: 'كيفاش تخدم ؟',
    step1_title: 'اختار الخدمة',
    step1_desc: 'شوف الفئات ولقّي الحرفي اللي تحتاجه.',
    step2_title: 'احجز أونلاين',
    step2_desc: 'اختار الوقت، حط عنوانك وأكّد.',
    step3_title: 'الحرفي يجيك',
    step3_desc: 'حرفيك الموثوق يوصلك في الوقت المتفق عليه.',
    hero_cta: 'لقّي حرفي دروا',
    join_as_pro: 'انضم كحرفي',
    join_title: 'أنت حرفي ؟',
    join_desc: 'انضم لخدامات ووسّع نشاطك. التسجيل مجاني والعمولة معقولة.',
    commission_rate: '12-15% عمولة بس',
    subscription_label: 'اشتراك احترافي من 30 دينار/شهر',
  }
};

export function useTranslation(lang: Lang) {
  const t = (key: keyof typeof translations.fr): string => {
    return translations[lang][key] || translations.fr[key] || key;
  };
  return { t };
}

export function getTranslation(lang: Lang, key: keyof typeof translations.fr): string {
  return translations[lang][key] || translations.fr[key] || key;
}
