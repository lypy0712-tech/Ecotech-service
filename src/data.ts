import { NavLink, ServiceItem, AdvantageItem, PortfolioItem, ReviewItem } from "./types";

export const NAV_LINKS: NavLink[] = [
  { id: "hero", label: { az: "Əsas", en: "Home", ru: "Главная" } },
  { id: "services", label: { az: "Xidmətlər", en: "Services", ru: "Услуги" } },
  { id: "advantages", label: { az: "Üstünlüklər", en: "Advantages", ru: "Преимущества" } },
  { id: "portfolio", label: { az: "İşlərimiz", en: "Portfolio", ru: "Наши работы" } },
  { id: "reviews", label: { az: "Rəylər", en: "Reviews", ru: "Отзывы" } },
  { id: "contact", label: { az: "Geri Zəng", en: "Callback", ru: "Обратный звонок" } },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: {
      az: "İçməli Su Çənlərinin Təmizlənməsi",
      en: "Drinking Water Tank Cleaning",
      ru: "Очистка резервуаров для питьевой воды",
    },
    description: {
      az: "Evlərdə, hotellərdə və sənaye obyektlərində olan içməli su çənlərinin tam gigiyenik qaydada təmizlənməsi, pas və lil çöküntülərindən təmizlənməsi.",
      en: "Fully hygienic cleaning, rust, and silt sediment removal from drinking water tanks in houses, hotels, and industrial facilities.",
      ru: "Абсолютно гигиеничная очистка, удаление ржавчины и илистого налета из баков питьевой воды в домах, отелях и на промышленных объектах.",
    },
    iconName: "Droplets",
    price: {
      az: "50 AZN-dən",
      en: "From 50 AZN",
      ru: "От 50 AZN",
    },
  },
  {
    id: 2,
    title: {
      az: "Yanacaq və Neft Sisternlərinin Yuyulması",
      en: "Fuel & Oil Cistern Cleaning",
      ru: "Мойка топливных и нефтецистерн",
    },
    description: {
      az: "Ağır neft məhsulları, dizel və benzin qalıqlarının xüsusi təzyiqli isti buxar və neytrallaşdırıcı mayelərlə tam təhlükəsiz şəkildə yuyulması.",
      en: "Completely safe washing of heavy petroleum products, diesel, and gasoline residues using high-pressure hot steam and neutralizing liquids.",
      ru: "Полностью безопасная промывка цистерн от нефтепродуктов, дизеля и бензина с использованием горячего пара под высоким давлением и нейтрализаторов.",
    },
    iconName: "Fuel",
    price: {
      az: "150 AZN-dən",
      en: "From 150 AZN",
      ru: "От 150 AZN",
    },
  },
  {
    id: 3,
    title: {
      az: "Kimyəvi və Sənaye Rezervuarları",
      en: "Chemical & Industrial Reservoirs",
      ru: "Химические и промышленные резервуары",
    },
    description: {
      az: "Aqressiv maddələrin, turşu və qələvilərin saxlandığı sənaye tipli sisternlərin kimyəvi təmizlənməsi, neytrallaşdırma və hava ventilyasiyası.",
      en: "Chemical cleaning, neutralization, and air ventilation of industrial cisterns storing aggressive substances, acids, and alkalis.",
      ru: "Химическая очистка, нейтрализация и вентиляция промышленных цистерн, в которых хранились агрессивные вещества, кислоты и щелочи.",
    },
    iconName: "Settings",
    price: {
      az: "250 AZN-dən",
      en: "From 250 AZN",
      ru: "От 250 AZN",
    },
  },
  {
    id: 4,
    title: {
      az: "Professional Dezinfeksiya Xidməti",
      en: "Professional Disinfection Service",
      ru: "Профессиональная дезинфекция кубов",
    },
    description: {
      az: "Bakteriya, virus, yosun və digər patogen mikroorqanizmlərin tam məhv edilməsi üçün Səhiyyə Nazirliyi tərəfindən sertifikatlaşdırılmış preparatlarla dezinfeksiya.",
      en: "Disinfection using Ministry of Health certified preparations to completely eliminate bacteria, viruses, algae, and other pathogenic microorganisms.",
      ru: "Дезинфекция сертифицированными препаратами Минздрава для полного уничтожения бактерий, вирусов, водорослей и патогенных микроорганизмов.",
    },
    iconName: "ShieldCheck",
    price: {
      az: "40 AZN-dən",
      en: "From 40 AZN",
      ru: "От 40 AZN",
    },
  },
];

export const ADVANTAGES: AdvantageItem[] = [
  {
    id: 1,
    title: {
      az: "100% Zəmanətli Gigiyena",
      en: "100% Guaranteed Hygiene",
      ru: "100% Гарантия Гигиены",
    },
    description: {
      az: "Bütün işlərin keyfiyyətinə rəsmi zəmanət veririk. Bakterioloji və kimyəvi təmizliyi tam təmin edirik.",
      en: "We provide an official guarantee for the quality of all works. We ensure complete bacteriological and chemical cleanliness.",
      ru: "Предоставляем официальную гарантию на качество всех работ. Обеспечиваем полную бактериологическую и химическую чистоту.",
    },
    iconName: "Activity",
  },
  {
    id: 2,
    title: {
      az: "Müasir Alman Avadanlıqları",
      en: "Modern German Equipment",
      ru: "Современное немецкое оборудование",
    },
    description: {
      az: "Kärcher və digər dünya markalarının yüksək təzyiqli, isti sulu və buxarlı peşəkar avadanlıqlarından istifadə edirik.",
      en: "We use high-pressure, hot water, and steam equipment from Kärcher and other world leading brands.",
      ru: "Мы используем профессиональные аппараты высокого давления с подогревом воды и паром от Kärcher и передовых мировых брендов.",
    },
    iconName: "Cpu",
  },
  {
    id: 3,
    title: {
      az: "Fəaliyyət İcazəsi və Sənədlər",
      en: "Licenses & Formal Certification",
      ru: "Лицензии и сертификаты работы",
    },
    description: {
      az: "Qapalı sahələrdə işləmək üçün komandamız sənaye təhlükəsizliyi sertifikatlarına, tibbi müayinə kartlarına malikdir.",
      en: "Our team possesses industrial safety certificates and health medical cards authorized for work in confined spaces.",
      ru: "Наша команда имеет допуски к работам в замкнутых пространствах, сертификаты ТБ и пройденные медицинские книжки.",
    },
    iconName: "FileCheck",
  },
  {
    id: 4,
    title: {
      az: "Ekoloji Təhlükəsizlik",
      en: "Eco-Friendly Safe Process",
      ru: "Экологическая безопасность",
    },
    description: {
      az: "İstifadə etdiyimiz bütün təmizləyici və dezinfeksiyaedici maddələr ekoloji təmizdir və ətraf mühitə, suya zərər vermir.",
      en: "All cleaning and sanitizing agents we use are eco-safe and do not harm the environment or subsequent water usage.",
      ru: "Все очищающие и дезинфицирующие средства экологически безопасны, не наносят вреда воде и окружающей среде.",
    },
    iconName: "Leaf",
  },
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: {
      az: "İçməli su anbarının təmizlənməsi (20 ton)",
      en: "Drinking water reservoir cleanup (20 tons)",
      ru: "Очистка резервуара питьевой воды (20 тонн)",
    },
    description: {
      az: "Sumqayıt şəhərində yerləşən qida istehsalı zavodunun daxili paslanmış və palçıqlanmış içməli su anbarının əsaslı təmizliyi.",
      en: "Deep cleaning of an interior rusted and mud-covered drinking water reservoir of a food production factory in Sumgait city.",
      ru: "Капитальная очистка внутреннего ржавого и илистого резервуара питьевой воды на заводе пищевой промышленности в г. Сумгаит.",
    },
    beforeImg: "cistern_dirty_before", // Will use generated local image path or fallback
    afterImg: "cistern_shiny_after", // Will use generated local image
  },
  {
    id: 2,
    title: {
      az: "Dizel yanacaq çəninin təmizlənməsi (50 ton)",
      en: "Diesel fuel tank washing (50 tons)",
      ru: "Очистка бака для дизельного топлива (50 тонн)",
    },
    description: {
      az: "Bakı şəhərində yanacaqdoldurma məntəqəsinin illərdir təmizlənməyən dizel çəninin dib çöküntülərindən və parafindən təmizlənməsi.",
      en: "Removal of years-built bottom sediments and organic paraffin wax from an active fuel filling station diesel tank in Baku.",
      ru: "Очистка не обслуживаемой годами емкости для дизеля от донных осадков и смолистых фракций на АЗС в г. Баку.",
    },
    beforeImg: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    afterImg: "https://images.unsplash.com/photo-1581091215367-9b6c00b3035a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: {
      az: "Yığım anbarının su quyusu təmizliyi",
      en: "Sewage water sump tank restoration",
      ru: "Реставрация и очистка сточного коллектора",
    },
    description: {
      az: "Böyük bir yaşayış kottec kompleksinin çirkab suları üçün nəzərdə tutulmuş beton yığım anbarının yağ və qumdan tam arındırılması.",
      en: "Complete elimination of oils, silt, and heavy sand from a concrete sump wastewater collection chamber in a villa residential area.",
      ru: "Полное устранение иловых наслоений, тяжелого песка и жиров из бетонной накопительной емкости коттеджного поселка.",
    },
    beforeImg: "https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&q=80&w=800",
    afterImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    author: "Elnur Qasımov",
    company: "“West-Food Azerbaijan” QSC",
    rating: 5,
    text: {
      az: "Zavodumuzun 4 ədəd 30 tonluq su sisternlərini qısa müddətdə təmizlədilər. İşlər yüksək səviyyədə, bütün sanitar normalara uyğun görüldü. Təmizlik aktı və laborator analiz nəticələrini təqdim etdilər. Çox məmnunuq!",
      en: "They cleaned 4 of our 30-ton water cisterns in a record time. The job was executed brilliantly complying with all sanitary codes. Provided the final cleaning certificates and laboratory analysis. Exceeded expectations!",
      ru: "В кратчайшие сроки очистили 4 наших 30-тонных водных резервуара. Работы выполнены на высшем уровне, полностью по саннормам. Предоставили акт выполненных работ и лабораторные анализы воды. С удовольствием рекомендуем!",
    },
    date: "12.04.2026",
  },
  {
    id: 2,
    author: "Sarah Jenkins",
    company: "Baku International School Logistics",
    rating: 5,
    text: {
      az: "Məktəbimizin içməli su çənlərinin təmizlənməsi üçün müraciət etdik. İşini mükəmməl bilən, peşəkar və çox kompotent heyət idi. Sürətli işlədilər və uşaqların sağlamlığı üçün tam təhlükəsiz dezinfeksiya vasitələri istifadə etdiklərini sübut edən sənədlər verdilər.",
      en: "We contacted them for the drinking water reservoirs of our school. Team was highly skilled, professional, and courteous. They worked fast and supplied certificates confirming that disinfection compounds are 100% safe for kids.",
      ru: "Обратились для очистки школьных накопителей питьевой воды. Приехала высококвалифицированная и вежливая бригада. Сделали все оперативно, выдали экологические паспорта средств дезинфекции, гарантирующие абсолютную безвредность для здоровья детей.",
    },
    date: "04.05.2026",
  },
  {
    id: 3,
    author: "Rauf Həsənov",
    company: "“AzelPetrol” YDM Şəbəkəsi",
    rating: 5,
    text: {
      az: "Yanacaqdoldurma məntəqələrindəki yeraltı çənlərin dib çöküntülərini təmizləmək asan məsələ deyil. Bu şirkət Alman texnologiyası tətbiq edərək, texnoloji tullantıları kənarlaşdırdı və çənləri sınaqdan keçirdi. Tam peşəkar xidmət!",
      en: "Cleaning bottom residue from subterranean petrol tanks is notoriously difficult. This firm utilized modern German technology to successfully displace hazardous wastes and examine the joints. Exceptionally competent work!",
      ru: "Очистка донных отложений подземных топливных резервуаров на АЗС — задача крайне сложная. Эта компания применила немецкое оборудование, вывезла все нефтешламы и провела диагностику сварных швов. Настоящие профи!",
    },
    date: "24.05.2026",
  },
];

export const DICTIONARY = {
  hero: {
    tagline: {
      az: "SAYTIN YENİLƏNMİŞ DIZAYNI",
      en: "RENEWED PREMIUM DESIGN",
      ru: "ОБНОВЛЕННЫЙ ДИЗАЙН САЙТА",
    },
    title: {
      az: "Sisternlərin və Çənlərin Peşəkar Təmizlənməsi xidməti",
      en: "Professional Cistern & Tank Cleaning Services",
      ru: "Профессиональная очистка цистерн и резервуаров",
    },
    subtitle: {
      az: "Azərbaycanın istənilən nöqtəsində içməli su, sənaye, neft və kimyəvi rezervuarların yüksək təzyiqlə, buxarla yuyulması, lil, çöküntü və pasdan təmizlənməsi, rəsmi rəylə dezinfeksiyası.",
      en: "High-pressure, steam washing of drinking water, industrial, oil, and chemical reservoirs anywhere in Azerbaijan. Sediments & rust clearing, disinfection with full compliance certification.",
      ru: "Высоконапорная и паровая мойка резервуаров питьевой воды, нефтепродуктов, кислот и щелочей по всему Азербайджану. Очистка от ржавчины и ила с предоставлением официальных актов дезинфекции.",
    },
    ctaButton: {
      az: "Geri zəng sifariş et",
      en: "Request Callback Today",
      ru: "Заказать обратный звонок",
    },
    learnMore: {
      az: "Usluqlarımızla tanış olun",
      en: "Explore Our Services",
      ru: "Наши услуги",
    },
    stats: {
      completedJobs: { az: "Görülən İşlər", en: "Completed Tanks", ru: "Вымытых емкостей" },
      yearsExperience: { az: "İllik Təcrübə", en: "Years Experience", ru: "Лет опыта" },
      happyClients: { az: "Məmnun Müştəri", en: "Happy Clients", ru: "Довольных клиентов" },
      responseMin: { az: "Sürətli reaksiya (dəq)", en: "Response Time (min)", ru: "Минут на отклик" },
    }
  },
  services: {
    title: {
      az: "Göstərdiyimiz Peşəkar Xidmətlər",
      en: "Our Professional Services",
      ru: "Наши профессиональные услуги",
    },
    subtitle: {
      az: "İstənilən ölçüdə və hər növ mayelərin saxlandığı sisternlərlə işləyirik. Müasir standartlar, təhlükəsiz avadanlıq və peşəkar heyət.",
      en: "We handle tanks of any size storing any fluid. Modern safety standards, expert technicians, and efficient equipment.",
      ru: "Работаем с емкостями любого размера и для любых жидкостей. Современные стандарты безопасности, премиум-оборудование и опытный персонал.",
    },
    priceTag: {
      az: "Qiymət",
      en: "Price",
      ru: "Стоимость",
    },
    orderCall: {
      az: "Sifariş et",
      en: "Order Cleaning",
      ru: "Заказать услугу",
    }
  },
  advantages: {
    title: {
      az: "Niyə Məhz Biz?",
      en: "Why Choose Us?",
      ru: "Почему выбирают нас?",
    },
    subtitle: {
      az: "Bizim fərqimiz işimizə olan peşəkar yanaşmamızda, sertifikatlı Alman texnologiyalarımızda və müştəri məmnuniyyətinə verilən dəyərdədir.",
      en: "Our difference lies in our professional workflow, certified German technologies, and the ultimate value we give to customer satisfaction.",
      ru: "Наше отличие в профессиональном подходе, сертифицированных немецких технологиях и безупречной ценности для каждого клиента.",
    },
  },
  portfolio: {
    title: {
      az: "Gördüyümüz İşlərin Keyfiyyəti (Əvvəl və Sonra)",
      en: "Quality of Works (Before & After)",
      ru: "Качество наших работ (До и После)",
    },
    subtitle: {
      az: "Aparılan təmizlik işlərinin möhtəşəm nəticələrini özünüz qiymətləndirin. Slider vasitəsilə daxili səthin necə təmizləndiyini ətraflı görə bilərsiniz.",
      en: "See the amazing quality of our cleaning. Use the interactive slider to slide between dirty 'Before' and pristine clean 'After' status.",
      ru: "Оцените невероятный результат очистки поверхностей. Используйте интерактивный слайдер для перемещения границы «До» и «После».",
    },
    beforeLabel: {
      az: "Əvvəl",
      en: "Before",
      ru: "До",
    },
    afterLabel: {
      az: "Sonra",
      en: "After",
      ru: "После",
    },
    interactiveGuide: {
      az: "Slayderi sağa-sola çəkərək müqayisə edin",
      en: "Drag the slider left and right to inspect the details",
      ru: "Двигайте слайдер влево и вправо для сравнения",
    }
  },
  reviews: {
    title: {
      az: "Müştərilərimizin Rəyləri",
      en: "What Our Clients Say",
      ru: "Что говорят наши клиенты",
    },
    subtitle: {
      az: "Korporativ müştərilərimizin və fərdi ev sahiblərinin xidmətimiz haqqında bildirdiyi real fikirlərlə tanış olun.",
      en: "Read real feedback left by our corporate partners and individual homeowners regarding our tank washing performance.",
      ru: "Ознакомьтесь с реальными отзывами от наших корпоративных партнеров и частных домовладельцев.",
    },
  },
  contact: {
    title: {
      az: "Pulsuz Konsultasiya və Geri Zəng Sifarişi",
      en: "Free Consultation & Callback Request",
      ru: "Бесплатная консультация и заказ звонка",
    },
    subtitle: {
      az: "Suallarınız var və ya dəqiq qiymət bilmək istəyirsiniz? Formu doldurun, mühəndisimiz 5 dəqiqə ərzində sizinlə əlaqə saxlayacaqdır.",
      en: "Do you have questions or want to determine exact quotes? Fill the form, our specialist will phone you back within 5 minutes.",
      ru: "Есть вопросы или хотите узнать точный расчет цены? Заполните форму, и наш инженер свяжется с вами в течение 5 минут.",
    },
    form: {
      nameLabel: { az: "Adınız və Soyadınız", en: "Your Full Name", ru: "Ваше имя и фамилия" },
      namePlaceholder: { az: "Məsələn: Orxan Əliyev", en: "e.g. John Doe", ru: "Например: Орхан Алиев" },
      phoneLabel: { az: "Mobil Telefon Nömrəniz", en: "Your Phone Number", ru: "Ваш номер телефона" },
      phonePlaceholder: { az: "+994 (50) 123-45-67", en: "+994 (50) 123-45-67", ru: "+994 (50) 123-45-67" },
      volumeLabel: { az: "Sisternin Həcmi (m³ / ton) - İxtiyari", en: "Cistern Volume (m³ / tons) - Optional", ru: "Объем цистерны (м³ / тонн) - Необязательно" },
      volumePlaceholder: { az: "Məsələn: 10 ton", en: "e.g. 10 tons", ru: "Например: 10 тонн" },
      serviceLabel: { az: "Tələb Olunan Xidmət Sektoru", en: "Required Cleaning Service Type", ru: "Требуемая услуга" },
      serviceOptions: {
        drinking: { az: "İçməli su çəni təmizlənməsi", en: "Drinking Water Tank", ru: "Очистка бака питьевой воды" },
        petrol: { az: "Yanacaq / Neft çəni təmizliyi", en: "Fuel / Petroleum Tank", ru: "Очистка топливного резервуара" },
        chemical: { az: "Kimyəvi / Sənaye sistern yuyulması", en: "Industrial / Chemical Tank", ru: "Очистка промышленной/хим цистерны" },
        disinfection: { az: "Sadəcə dezinfeksiya işləri", en: "Only Sanitization & Disinfection", ru: "Только дезинфекция куба/бака" },
        other: { az: "Digər xidmətlər", en: "Other Custom Service", ru: "Другая спец-услуга" },
      },
      msgLabel: { az: "Əlavə qeydləriniz (Zəhmət olmasa qeyd edin)", en: "Additional comments / Details", ru: "Дополнительные примечания" },
      msgPlaceholder: { az: "Cisternin vəziyyəti, yeri və digər istəkləriniz...", en: "State details, location, and preferred scheduling...", ru: "Опишите состояние емкости, адрес и желаемое время..." },
      submitBtn: { az: "Mənə geri zəng edilsin", en: "Request My Callback Now", ru: "Заказать обратный звонок" },
      submitting: { az: "Göndərilir...", en: "Sending Request...", ru: "Отправка заявки..." },
      successHeader: { az: "Sifarişiniz Alındı!", en: "Request Received Successfully!", ru: "Заявка успешно принята!" },
      successSub: {
        az: "Təşəkkür edirik! Menecerimiz qeyd etdiyiniz nömrə ilə 5 dəqiqə ərzində əlaqə saxlayacaq.",
        en: "Thank you! Our supervisor is reviewing your request and will call you back within 5 minutes.",
        ru: "Спасибо! Наш менеджер свяжется с вами по указанному номеру в течение 5 минут.",
      }
    }
  },
  footer: {
    rights: {
      az: "Bütün hüquqlar qorunur.",
      en: "All rights reserved.",
      ru: "Все права защищены.",
    },
    address: {
      az: "Sülh Prospekti 148, Bakı, Azərbaycan. AZ1000",
      en: "148 Sulh Avenue, Baku, Azerbaijan. AZ1000",
      ru: "Азербайджан, г. Баку, Проспект Метбуат 42. AZ1000",
    },
    top: {
      az: "Yuxarı",
      en: "Back to Top",
      ru: "Наверх",
    },
    description: {
      az: "Azərbaycanda hər növ su və sənaye sisternlərinin beynəlxalq keyfiyyət standartları ilə təmizlənməsi.",
      en: "Professional cleaning of all types of water and industrial cisterns in Azerbaijan according to international quality codes.",
      ru: "Профессиональная очистка всех видов водных и промышленных цистерн в Азербайджане по международным стандартам качества.",
    },
  },
  notification: {
    newRequest: {
      az: "Yeni sorğu daxil oldu!",
      en: "New callback submission detected!",
      ru: "Новая заявка на звонок!"
    },
    requestCount: {
      az: "Sizdə hazırda {count} aktiv sorğu var. Bunları yoxlamaq üçün idarə panelini aça bilərsiniz.",
      en: "You currently have {count} active callback requests. Toggle dashboard to inspect them.",
      ru: "У вас есть {count} активных заявок. Вы можете посмотреть их в панели администратора."
    },
    adminTitle: {
      az: "Daxil olan Zəng Sifarişləri Paneli (Sifarişçi Testi)",
      en: "Callbacks Live Monitor Dashboard (Client Testing)",
      ru: "Монитор входящих заявок (Тест для Клиента)"
    },
    noRequests: {
      az: "Hələlik heç bir sorğu daxil olmayıb. Aşağıdakı formu dolduraraq sınaqdan keçirin!",
      en: "No callback submissions yet. Fill and submit the form below to test the live updates!",
      ru: "Заявок пока нет. Заполните и отправьте форму внизу, чтобы протестировать!"
    }
  }
};

// Auto-load custom DICTIONARY values if they exist in localStorage
if (typeof window !== "undefined") {
  const cachedDict = localStorage.getItem("aquaclean_custom_dictionary");
  if (cachedDict) {
    try {
      const parsed = JSON.parse(cachedDict);
      // Recursively merge parsed properties into existing DICTIONARY instance to preserve top-level exports
      const mergeObjects = (target: any, source: any) => {
        for (const key in source) {
          if (source[key] && typeof source[key] === "object") {
            if (!target[key]) target[key] = {};
            mergeObjects(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
      };
      mergeObjects(DICTIONARY, parsed);
    } catch (e) {
      console.error("Error loading custom dictionary:", e);
    }
  }
}
