import { lesson, w, type A1TopicExpansion } from "./helpers";

export const PART_02: Record<string, A1TopicExpansion> = {
  "nha-cua-do-vat": {
    extraWord: w(
      "home",
      "/həʊm/",
      "n",
      "nhà, tổ ấm",
      "the place where you live",
      "I go home at five o'clock.",
    ),
    lessons: [
      lesson(
        "Các phòng & khu vực trong nhà",
        "15 từ về các phòng, khu vực và bộ phận của ngôi nhà, kèm giới từ chỉ vị trí.",
        "Phòng và khu vực",
        `- **hall**: hành lang — The hall is small.
- **garden**: khu vườn — We have a garden behind the house.
- **garage**: nhà để xe — The car is in the garage.
- **balcony**: ban công — I drink tea on the balcony.
- **floor**: tầng, sàn nhà — The kitchen is on the ground floor.

**Stairs** là cầu thang, **roof** là mái nhà.`,
        "in the garden, on the balcony, on the ground floor.",
        [
          w("hall", "/hɔːl/", "n", "hành lang", "a passage inside a house", "The hall is small."),
          w("garden", "/ˈɡɑːdn/", "n", "khu vườn", "a piece of land with plants", "We have a garden behind the house."),
          w("garage", "/ˈɡærɑːʒ/", "n", "nhà để xe", "a building for a car", "The car is in the garage."),
          w("balcony", "/ˈbælkəni/", "n", "ban công", "a small platform outside a window", "I drink tea on the balcony."),
          w("floor", "/flɔː/", "n", "tầng, sàn nhà", "the flat surface you walk on", "The kitchen is on the ground floor."),
          w("wall", "/wɔːl/", "n", "bức tường", "a side of a room or building", "There is a picture on the wall."),
          w("roof", "/ruːf/", "n", "mái nhà", "the top cover of a building", "The roof is red."),
          w("stairs", "/steəz/", "n", "cầu thang", "steps for going up or down", "She is going up the stairs."),
          w("toilet", "/ˈtɔɪlət/", "n", "nhà vệ sinh", "a room with a toilet", "The toilet is next to the bathroom."),
          w("dining room", "/ˈdaɪnɪŋ ruːm/", "n", "phòng ăn", "a room where you eat meals", "We eat in the dining room."),
          w("attic", "/ˈætɪk/", "n", "gác mái", "a room under the roof", "The boxes are in the attic."),
          w("basement", "/ˈbeɪsmənt/", "n", "tầng hầm", "a room below the ground floor", "The washing machine is in the basement."),
          w("yard", "/jɑːd/", "n", "sân", "an open area next to a building", "The children play in the yard."),
          w("gate", "/ɡeɪt/", "n", "cổng", "a door in a wall or fence", "Please close the gate."),
          w("entrance", "/ˈentrəns/", "n", "lối vào", "the way into a place", "Wait at the entrance."),
        ],
      ),
      lesson(
        "Đồ nội thất trong nhà",
        "15 từ về đồ nội thất quen thuộc, kèm mẫu câu miêu tả vị trí đồ vật.",
        "Nội thất và cách dùng",
        `- **cupboard**: tủ (đựng đồ) — The plates are in the cupboard.
- **shelf**: cái kệ — The books are on the shelf.
- **drawer**: ngăn kéo — My socks are in the drawer.
- **armchair**: ghế bành — Grandpa is sitting in the armchair.
- **wardrobe**: tủ quần áo — My clothes are in the wardrobe.

**Carpet** là thảm trải kín sàn, **rug** là thảm nhỏ.`,
        "in the cupboard, on the shelf, in the drawer.",
        [
          w("cupboard", "/ˈkʌbəd/", "n", "tủ đựng đồ", "a piece of furniture with shelves and doors", "The plates are in the cupboard."),
          w("shelf", "/ʃelf/", "n", "cái kệ", "a flat board for putting things on", "The books are on the shelf."),
          w("drawer", "/drɔː/", "n", "ngăn kéo", "a box that slides in and out of furniture", "My socks are in the drawer."),
          w("lamp", "/læmp/", "n", "đèn", "a light you can turn on and off", "Turn on the lamp, please."),
          w("curtain", "/ˈkɜːtn/", "n", "rèm cửa", "cloth that covers a window", "Please open the curtains."),
          w("carpet", "/ˈkɑːpɪt/", "n", "thảm trải sàn", "a thick cover for a whole floor", "The carpet is soft."),
          w("armchair", "/ˈɑːmtʃeə/", "n", "ghế bành", "a soft chair with sides for your arms", "Grandpa is sitting in the armchair."),
          w("dresser", "/ˈdresə/", "n", "tủ có ngăn kéo", "a piece of furniture with drawers", "The clothes are in the dresser."),
          w("wardrobe", "/ˈwɔːdrəʊb/", "n", "tủ quần áo", "a cupboard for clothes", "My clothes are in the wardrobe."),
          w("bookcase", "/ˈbʊkkeɪs/", "n", "tủ sách", "a piece of furniture with shelves for books", "There is a bookcase in the living room."),
          w("pillow", "/ˈpɪləʊ/", "n", "gối", "a soft bag for your head", "The pillow is soft."),
          w("blanket", "/ˈblæŋkɪt/", "n", "chăn", "a thick cover for sleeping", "I need a warm blanket."),
          w("mattress", "/ˈmætrəs/", "n", "đệm giường", "the soft part of a bed", "The mattress is new."),
          w("rug", "/rʌɡ/", "n", "thảm nhỏ", "a small carpet", "There is a small rug by the bed."),
          w("stool", "/stuːl/", "n", "ghế đẩu", "a small seat without a back", "She is sitting on a stool."),
        ],
      ),
      lesson(
        "Đồ dùng hằng ngày",
        "15 từ về đồ dùng trong nhà, kèm mẫu câu dùng trong sinh hoạt hằng ngày.",
        "Đồ dùng quen thuộc",
        `- **key**: chìa khóa — This is the key to my flat.
- **plate**: cái đĩa — The plate is on the table.
- **cup**: cái cốc — I drink tea from a cup.
- **spoon**: cái thìa — I eat soup with a spoon.
- **broom**: cái chổi — The broom is behind the door.

**Knife** số nhiều là **knives**.`,
        "a glass of water, a cup of tea, a bowl of soup.",
        [
          w("key", "/kiː/", "n", "chìa khóa", "a small metal object for opening a door", "This is the key to my flat."),
          w("vase", "/vɑːz/", "n", "lọ hoa", "a container for flowers", "There are flowers in the vase."),
          w("plate", "/pleɪt/", "n", "cái đĩa", "a flat dish for food", "The plate is on the table."),
          w("bowl", "/bəʊl/", "n", "cái bát", "a deep dish for soup or cereal", "I eat soup from a bowl."),
          w("cup", "/kʌp/", "n", "cái cốc", "a small container for hot drinks", "I drink tea from a cup."),
          w("glass", "/ɡlɑːs/", "n", "cái ly", "a container for cold drinks", "Can I have a glass of water?"),
          w("spoon", "/spuːn/", "n", "cái thìa", "a tool for eating soup", "I eat soup with a spoon."),
          w("fork", "/fɔːk/", "n", "cái nĩa", "a tool with points for eating", "Use a fork, please."),
          w("knife", "/naɪf/", "n", "con dao", "a tool with a sharp edge", "The knife is sharp."),
          w("bin", "/bɪn/", "n", "thùng rác", "a container for rubbish", "Put the paper in the bin."),
          w("soap", "/səʊp/", "n", "xà phòng", "something you use to wash", "Wash your hands with soap."),
          w("brush", "/brʌʃ/", "n", "bàn chải", "a tool for cleaning or tidying hair", "I need a brush for my hair."),
          w("basket", "/ˈbɑːskɪt/", "n", "cái giỏ", "a container made of thin sticks or plastic", "The fruit is in the basket."),
          w("bucket", "/ˈbʌkɪt/", "n", "cái xô", "a round container with a handle", "The bucket is full of water."),
          w("broom", "/bruːm/", "n", "cái chổi", "a brush with a long handle", "The broom is behind the door."),
        ],
      ),
    ],
  },

  "thoi-gian-lich": {
    extraWord: w(
      "week",
      "/wiːk/",
      "n",
      "tuần",
      "a period of seven days",
      "There are seven days in a week.",
    ),
    lessons: [
      lesson(
        "Tháng & ngày",
        "15 từ về các tháng, ngày tháng và dịp đặc biệt, kèm giới từ in/on.",
        "Mười hai tháng",
        `- **January**: tháng Một — My birthday is in January.
- **June**: tháng Sáu — School ends in June.
- **September**: tháng Chín — School starts in September.
- **December**: tháng Mười Hai — We buy gifts in December.
- **birthday**: sinh nhật — My birthday is on Monday.

Dùng **in** trước tháng, **on** trước ngày cụ thể.`,
        "in + tháng: in July; on + ngày: on 5 May.",
        [
          w("January", "/ˈdʒænjuəri/", "n", "tháng Một", "the first month of the year", "My birthday is in January."),
          w("February", "/ˈfebruəri/", "n", "tháng Hai", "the second month of the year", "It is cold in February."),
          w("March", "/mɑːtʃ/", "n", "tháng Ba", "the third month of the year", "Spring starts in March."),
          w("April", "/ˈeɪprəl/", "n", "tháng Tư", "the fourth month of the year", "We have a holiday in April."),
          w("May", "/meɪ/", "n", "tháng Năm", "the fifth month of the year", "The flowers open in May."),
          w("June", "/dʒuːn/", "n", "tháng Sáu", "the sixth month of the year", "School ends in June."),
          w("July", "/dʒuˈlaɪ/", "n", "tháng Bảy", "the seventh month of the year", "July is hot."),
          w("August", "/ˈɔːɡəst/", "n", "tháng Tám", "the eighth month of the year", "We go to the beach in August."),
          w("September", "/sepˈtembə/", "n", "tháng Chín", "the ninth month of the year", "School starts in September."),
          w("October", "/ɒkˈtəʊbə/", "n", "tháng Mười", "the tenth month of the year", "The leaves fall in October."),
          w("November", "/nəʊˈvembə/", "n", "tháng Mười Một", "the eleventh month of the year", "It often rains in November."),
          w("December", "/dɪˈsembə/", "n", "tháng Mười Hai", "the twelfth month of the year", "We buy gifts in December."),
          w("date", "/deɪt/", "n", "ngày, ngày tháng", "a particular day of the month", "What is the date today?"),
          w("birthday", "/ˈbɜːθdeɪ/", "n", "sinh nhật", "the day you were born", "My birthday is on Monday."),
          w("holiday", "/ˈhɒlədeɪ/", "n", "kỳ nghỉ", "a time when you do not work", "We go on holiday in July."),
        ],
      ),
      lesson(
        "Giờ giấc",
        "15 từ và cụm từ để hỏi và nói giờ, kèm cách dùng o'clock, half past, quarter.",
        "Nói giờ trong ngày",
        `- **hour**: giờ (60 phút) — I study for one hour.
- **minute**: phút — Wait a minute.
- **o'clock**: đúng giờ — It's six o'clock.
- **half past**: rưỡi — School starts at half past seven.
- **quarter past**: mười lăm phút — It's quarter past six.

**Quarter to** = kém 15 phút; **noon** = 12 giờ trưa, **midnight** = 12 giờ đêm.`,
        "half past six = 6:30; quarter to nine = 8:45.",
        [
          w("hour", "/ˈaʊə/", "n", "giờ (60 phút)", "a period of sixty minutes", "I study for one hour."),
          w("minute", "/ˈmɪnɪt/", "n", "phút", "a period of sixty seconds", "Wait a minute."),
          w("second", "/ˈsekənd/", "n", "giây", "a very short period of time", "There are sixty seconds in a minute."),
          w("clock", "/klɒk/", "n", "đồng hồ treo tường", "a machine that shows the time", "The clock is on the wall."),
          w("watch", "/wɒtʃ/", "n", "đồng hồ đeo tay", "a small clock you wear on your wrist", "My watch is new."),
          w("o'clock", "/əˈklɒk/", "adv", "đúng giờ", "used to say the exact hour", "It's six o'clock."),
          w("half past", "/hɑːf pɑːst/", "phrase", "rưỡi", "thirty minutes after the hour", "School starts at half past seven."),
          w("quarter past", "/ˈkwɔːtə pɑːst/", "phrase", "mười lăm phút", "fifteen minutes after the hour", "It's quarter past six."),
          w("quarter to", "/ˈkwɔːtə tə/", "phrase", "kém mười lăm phút", "fifteen minutes before the hour", "It's quarter to nine."),
          w("noon", "/nuːn/", "n", "giữa trưa", "twelve o'clock in the day", "We have lunch at noon."),
          w("midnight", "/ˈmɪdnaɪt/", "n", "nửa đêm", "twelve o'clock at night", "The party ends at midnight."),
          w("early", "/ˈɜːli/", "adj", "sớm", "before the usual time", "I get up early."),
          w("late", "/leɪt/", "adj", "muộn, trễ", "after the usual time", "He is often late."),
          w("now", "/naʊ/", "adv", "bây giờ", "at this moment", "I am busy now."),
          w("then", "/ðen/", "adv", "sau đó, rồi", "after that", "I have breakfast, then I go to work."),
        ],
      ),
      lesson(
        "Tần suất & khoảng thời gian",
        "15 từ chỉ mức độ thường xuyên và các khoảng thời gian quen thuộc.",
        "Bao lâu một lần?",
        `- **always**: luôn luôn — She always smiles.
- **usually**: thường thường — I usually get up at six.
- **often**: thường xuyên — We often eat fish.
- **sometimes**: thỉnh thoảng — I sometimes walk to school.
- **never**: không bao giờ — I never drink coffee at night.

Trạng từ tần suất đứng **trước động từ thường**, sau **to be**.`,
        "always > usually > often > sometimes > never.",
        [
          w("always", "/ˈɔːlweɪz/", "adv", "luôn luôn", "every time", "She always smiles."),
          w("usually", "/ˈjuːʒuəli/", "adv", "thường thường", "most of the time", "I usually get up at six."),
          w("often", "/ˈɒfn/", "adv", "thường xuyên", "many times", "We often eat fish."),
          w("sometimes", "/ˈsʌmtaɪmz/", "adv", "thỉnh thoảng", "on some occasions", "I sometimes walk to school."),
          w("never", "/ˈnevə/", "adv", "không bao giờ", "not at any time", "I never drink coffee at night."),
          w("daily", "/ˈdeɪli/", "adj", "hằng ngày", "happening every day", "I read the news daily."),
          w("weekly", "/ˈwiːkli/", "adj", "hằng tuần", "happening every week", "We have a weekly meeting."),
          w("monthly", "/ˈmʌnθli/", "adj", "hằng tháng", "happening every month", "I pay the rent monthly."),
          w("year", "/jɪə/", "n", "năm", "a period of twelve months", "There are twelve months in a year."),
          w("weekend", "/ˌwiːkˈend/", "n", "cuối tuần", "Saturday and Sunday", "We relax at the weekend."),
          w("weekday", "/ˈwiːkdeɪ/", "n", "ngày trong tuần", "Monday to Friday", "I get up early on weekdays."),
          w("century", "/ˈsentʃəri/", "n", "thế kỷ", "a period of one hundred years", "The house is a century old."),
          w("moment", "/ˈməʊmənt/", "n", "chốc lát, lúc", "a very short time", "Wait a moment, please."),
          w("soon", "/suːn/", "adv", "sớm, chẳng bao lâu", "in a short time from now", "See you soon!"),
          w("ago", "/əˈɡəʊ/", "adv", "trước đây", "before now", "I moved here two years ago."),
        ],
      ),
    ],
  },

  "thoi-quen-hang-ngay": {
    extraWord: w(
      "get dressed",
      "/ɡet drest/",
      "phrase",
      "mặc quần áo",
      "to put on your clothes",
      "I get dressed after breakfast.",
    ),
    lessons: [
      lesson(
        "Buổi sáng & vệ sinh",
        "15 từ về các bước chuẩn bị buổi sáng và đồ dùng vệ sinh cá nhân.",
        "Chuẩn bị buổi sáng",
        `- **shower**: tắm vòi sen — I take a shower every morning.
- **comb**: cái lược / chải tóc — I comb my hair.
- **toothbrush**: bàn chải đánh răng — My toothbrush is blue.
- **toothpaste**: kem đánh răng — There is no toothpaste left.
- **shampoo**: dầu gội — This shampoo smells nice.

**Leave home** = rời nhà; **catch the bus** = bắt xe buýt.`,
        "take a shower, brush my teeth, comb my hair.",
        [
          w("shower", "/ˈʃaʊə/", "n", "vòi sen, việc tắm", "a wash under falling water", "I take a shower every morning."),
          w("shave", "/ʃeɪv/", "v", "cạo râu", "to cut hair from your face", "My father shaves every morning."),
          w("comb", "/kəʊm/", "n", "cái lược", "a tool for tidying hair", "I comb my hair."),
          w("mirror", "/ˈmɪrə/", "n", "cái gương", "glass you can see yourself in", "She is looking in the mirror."),
          w("toothbrush", "/ˈtuːθbrʌʃ/", "n", "bàn chải đánh răng", "a brush for cleaning teeth", "My toothbrush is blue."),
          w("toothpaste", "/ˈtuːθpeɪst/", "n", "kem đánh răng", "a paste for cleaning teeth", "There is no toothpaste left."),
          w("shampoo", "/ʃæmˈpuː/", "n", "dầu gội đầu", "a liquid for washing hair", "This shampoo smells nice."),
          w("towel", "/ˈtaʊəl/", "n", "khăn tắm", "cloth for drying your body", "I dry my hands with a towel."),
          w("put on", "/pʊt ɒn/", "phr v", "mặc vào", "to put clothes on your body", "Put on your coat before you go out."),
          w("leave home", "/liːv həʊm/", "phrase", "rời nhà", "to go out of your house", "I leave home at seven."),
          w("catch the bus", "/kætʃ ðə bʌs/", "phrase", "bắt xe buýt", "to get on a bus in time", "I catch the bus to work."),
          w("hurry", "/ˈhʌri/", "v", "vội vàng", "to move quickly", "Hurry up, we are late!"),
          w("alarm", "/əˈlɑːm/", "n", "chuông báo thức", "a sound that wakes you up", "My alarm rings at six."),
          w("routine", "/ruːˈtiːn/", "n", "thói quen, nếp sinh hoạt", "things you do regularly", "My morning routine is simple."),
          w("habit", "/ˈhæbɪt/", "n", "thói quen", "something you do often", "Reading is a good habit."),
        ],
      ),
      lesson(
        "Việc nhà",
        "15 từ và cụm từ về các việc nhà thường làm, kèm trạng từ tần suất.",
        "Việc nhà mỗi ngày",
        `- **clean**: dọn dẹp — I clean my room every Saturday.
- **sweep**: quét nhà — I sweep the floor after dinner.
- **wash the dishes**: rửa bát — I wash the dishes after dinner.
- **do the laundry**: giặt quần áo — I do the laundry on Saturday.
- **make the bed**: dọn giường — I make the bed every morning.

**Take out the rubbish** = đổ rác; **water the plants** = tưới cây.`,
        "clean the room, do the laundry, make the bed.",
        [
          w("clean", "/kliːn/", "v", "dọn dẹp, lau chùi", "to remove dirt from something", "I clean my room every Saturday."),
          w("tidy", "/ˈtaɪdi/", "v", "dọn gọn gàng", "to put things in the right place", "Please tidy your desk."),
          w("sweep", "/swiːp/", "v", "quét nhà", "to clean the floor with a broom", "I sweep the floor after dinner."),
          w("mop", "/mɒp/", "v", "lau nhà", "to clean the floor with water", "I mop the floor every Friday."),
          w("wash the dishes", "/wɒʃ ðə ˈdɪʃɪz/", "phrase", "rửa bát", "to clean the plates after a meal", "I wash the dishes after dinner."),
          w("do the laundry", "/duː ðə ˈlɔːndri/", "phrase", "giặt quần áo", "to wash clothes", "I do the laundry on Saturday."),
          w("iron", "/ˈaɪən/", "v", "ủi quần áo", "to make clothes smooth with heat", "I iron my shirt before work."),
          w("water the plants", "/ˈwɔːtə ðə plɑːnts/", "phrase", "tưới cây", "to give water to plants", "I water the plants every morning."),
          w("take out the rubbish", "/teɪk aʊt ðə ˈrʌbɪʃ/", "phrase", "đổ rác", "to remove the rubbish from a house", "Please take out the rubbish."),
          w("make the bed", "/meɪk ðə bed/", "phrase", "dọn giường", "to tidy the bed after sleeping", "I make the bed every morning."),
          w("prepare", "/prɪˈpeə/", "v", "chuẩn bị, nấu", "to make food ready", "I prepare dinner every evening."),
          w("set the table", "/set ðə ˈteɪbl/", "phrase", "dọn bàn ăn", "to put plates and cutlery on the table", "Can you set the table, please?"),
          w("vacuum", "/ˈvækjuːm/", "v", "hút bụi", "to clean the floor with a machine", "I vacuum the living room on Sundays."),
          w("dust", "/dʌst/", "v", "lau bụi", "to remove dust from furniture", "I dust the shelves every week."),
          w("chores", "/tʃɔːz/", "n", "việc nhà", "small jobs you do at home", "I do the chores at the weekend."),
        ],
      ),
      lesson(
        "Buổi tối & giấc ngủ",
        "15 từ về thư giãn buổi tối, chuẩn bị đi ngủ và giấc ngủ.",
        "Thư giãn và ngủ ngon",
        `- **relax**: thư giãn — I relax with a book.
- **rest**: nghỉ ngơi — You should rest after work.
- **take a bath**: tắm bồn — I take a bath before bed.
- **pyjamas**: bộ đồ ngủ — I wear pyjamas in winter.
- **bedtime**: giờ đi ngủ — My bedtime is ten o'clock.

**Turn off** = tắt; **lights out** = giờ tắt đèn.`,
        "turn off the light, an early night, lights out at ten.",
        [
          w("relax", "/rɪˈlæks/", "v", "thư giãn", "to rest and feel calm", "I relax with a book."),
          w("rest", "/rest/", "v", "nghỉ ngơi", "to stop working for a time", "You should rest after work."),
          w("read", "/riːd/", "v", "đọc", "to look at words and understand them", "I read before bed."),
          w("listen to music", "/ˈlɪsn tə ˈmjuːzɪk/", "phrase", "nghe nhạc", "to hear music for pleasure", "I listen to music in the evening."),
          w("take a bath", "/teɪk ə bɑːθ/", "phrase", "tắm bồn", "to wash in a bath", "I take a bath before bed."),
          w("pyjamas", "/pəˈdʒɑːməz/", "n", "bộ đồ ngủ", "clothes you wear in bed", "I wear pyjamas in winter."),
          w("exhausted", "/ɪɡˈzɔːstɪd/", "adj", "kiệt sức", "extremely tired", "I feel exhausted after work."),
          w("sleepy", "/ˈsliːpi/", "adj", "buồn ngủ", "ready to sleep", "The baby is sleepy."),
          w("dream", "/driːm/", "n", "giấc mơ", "pictures in your mind while sleeping", "I had a strange dream last night."),
          w("wake up at night", "/weɪk ʌp ət naɪt/", "phrase", "thức giấc ban đêm", "to stop sleeping during the night", "I sometimes wake up at night."),
          w("turn off", "/tɜːn ɒf/", "phrase", "tắt (điện, đèn)", "to stop a machine or light", "Please turn off the light."),
          w("lights out", "/laɪts aʊt/", "phrase", "giờ tắt đèn", "the time when lights must be switched off", "Lights out is at ten o'clock."),
          w("early night", "/ˈɜːli naɪt/", "phrase", "đi ngủ sớm", "going to bed earlier than usual", "I need an early night tonight."),
          w("bedtime", "/ˈbedtaɪm/", "n", "giờ đi ngủ", "the time you go to bed", "My bedtime is ten o'clock."),
          w("sweet dreams", "/ˌswiːt ˈdriːmz/", "phrase", "chúc ngủ ngon", "words you say before someone sleeps", "Sweet dreams, children."),
        ],
      ),
    ],
  },
};
