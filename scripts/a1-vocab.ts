import type { SeedVocabTopic, SeedWord } from "./curriculum-data";

function w(
  word: string,
  ipa: string,
  wordForm: string,
  meaningVi: string,
  meaningEn: string,
  example: string,
): SeedWord {
  return { word, ipa, wordForm, meaningVi, meaningEn, example };
}

/**
 * 18 chủ đề từ vựng A1, mỗi chủ đề 14 từ/cụm từ.
 * Nội dung ưu tiên từ vựng nền tảng, collocations và mẫu câu dùng được ngay.
 */
export const A1_VOCAB: SeedVocabTopic[] = [
  {
    name: "Chào hỏi & giới thiệu",
    slug: "chao-hoi-gioi-thieu",
    icon: "waving_hand",
    description: "Chào hỏi đúng thời điểm, giới thiệu bản thân và làm quen với người mới.",
    lesson: {
      title: "Chào hỏi & giới thiệu bản thân",
      summary: "14 từ/cụm từ giúp bạn mở đầu cuộc trò chuyện, giới thiệu tên và chào tạm biệt tự nhiên.",
      sections: [
        {
          title: "Chào hỏi theo thời điểm",
          body: `- **Good morning** dùng buổi sáng (trước 12 giờ).
- **Good afternoon** dùng buổi chiều (12 giờ đến khoảng 6 giờ tối).
- **Good evening** dùng buổi tối khi gặp nhau.
- **Goodnight** dùng khi chia tay vào buổi tối hoặc trước khi đi ngủ.

**Hello** và **hi** dùng được cả ngày; **hi** thân mật hơn.`,
          remember: "Gặp nhau: good morning/afternoon/evening. Chia tay buổi tối: goodnight.",
        },
        {
          title: "Giới thiệu bản thân",
          body: `Các mẫu câu cơ bản:
- **My name is Lan.** / **I'm Lan.**
- **Nice to meet you.** — **Nice to meet you, too.**
- **This is my friend, Nam.**
- **I'm from Vietnam.**

Khi muốn hỏi tên: **What's your name?**
Khi muốn hỏi thăm: **How are you?** — **I'm fine, thank you.**`,
          remember: "Nice to meet you = rất vui được gặp bạn; dùng khi gặp lần đầu.",
        },
        {
          title: "Chào tạm biệt & lỗi thường gặp",
          body: `- **Goodbye** / **Bye** / **See you later**.
- **Welcome** dùng để chào mừng: **Welcome to our school!**
- **Introduce** là động từ: **Let me introduce my sister.**

Lỗi thường gặp:
- Không nói "I am fine, thanks you" → **thank you**.
- **Goodnight** viết liền, dùng khi chia tay/đi ngủ, không dùng để chào khi mới gặp.`,
          remember: "See you later = hẹn gặp lại; welcome to + nơi chốn.",
        },
      ],
      words: [
        w("hello", "/həˈləʊ/", "excl", "xin chào", "used when meeting someone", "Hello, my name is Lan."),
        w("hi", "/haɪ/", "excl", "chào (thân mật)", "a friendly greeting", "Hi, Nam! How are you?"),
        w("good morning", "/ɡʊd ˈmɔːnɪŋ/", "phrase", "chào buổi sáng", "a greeting used in the morning", "Good morning, everyone!"),
        w("good afternoon", "/ɡʊd ˌɑːftəˈnuːn/", "phrase", "chào buổi chiều", "a greeting used in the afternoon", "Good afternoon, Mrs. Brown."),
        w("good evening", "/ɡʊd ˈiːvnɪŋ/", "phrase", "chào buổi tối", "a greeting used in the evening", "Good evening! Welcome to our hotel."),
        w("goodnight", "/ɡʊdˈnaɪt/", "excl", "chúc ngủ ngon", "said when leaving at night or going to bed", "Goodnight, Mum. See you tomorrow."),
        w("goodbye", "/ɡʊdˈbaɪ/", "excl", "tạm biệt", "said when leaving someone", "Goodbye! Have a nice day."),
        w("name", "/neɪm/", "n", "tên", "the word someone or something is called", "My name is Minh."),
        w("friend", "/frend/", "n", "bạn bè", "a person you know and like", "Lan is my best friend."),
        w("nice to meet you", "/naɪs tə miːt juː/", "phrase", "rất vui được gặp bạn", "a polite phrase used when meeting someone", "Nice to meet you, Mr. Nam."),
        w("pleased to meet you", "/pliːzd tə miːt juː/", "phrase", "hân hạnh được gặp bạn", "a polite phrase used when meeting someone", "Pleased to meet you, Ms. Hoa."),
        w("see you later", "/siː juː ˈleɪtə/", "phrase", "hẹn gặp lại", "a friendly way to say goodbye", "See you later, Lan!"),
        w("welcome", "/ˈwelkəm/", "excl", "chào mừng", "used to greet someone arriving", "Welcome to Hanoi!"),
        w("introduce", "/ˌɪntrəˈdjuːs/", "v", "giới thiệu", "to tell someone another person's name", "Let me introduce my brother."),
      ],
    },
  },
  {
    name: "Quốc gia & quốc tịch",
    slug: "quoc-gia-quoc-tich",
    icon: "public",
    description: "Hỏi và trả lời về quốc gia, quốc tịch và ngôn ngữ bằng các mẫu câu đơn giản.",
    lesson: {
      title: "Quốc gia, quốc tịch & ngôn ngữ",
      summary: "14 từ về quốc gia, người và ngôn ngữ, kèm cách dùng to be và from.",
      sections: [
        {
          title: "Hỏi quốc gia và quốc tịch",
          body: `- **Where are you from?** — I'm from **Vietnam**.
- **What nationality are you?** — I'm **Vietnamese**.
- **Where is she from?** — She's from **Japan**.

Dùng **from + quốc gia** khi nói nguồn gốc:
- I'm from **Korea**.
- They're from **Australia**.`,
          remember: "from + quốc gia; to be + quốc tịch.",
        },
        {
          title: "Quốc gia và tính từ quốc tịch",
          body: `- Vietnam → **Vietnamese**
- England → **English**
- Japan → **Japanese**
- Korea → **Korean**
- China → **Chinese**
- Australia → **Australian**

Tên quốc gia và quốc tịch luôn viết hoa chữ cái đầu.`,
          remember: "Vietnam → Vietnamese; China → Chinese; Japan → Japanese.",
        },
        {
          title: "Ngôn ngữ & lỗi thường gặp",
          body: `**English**, **Japanese**, **Korean**, **Chinese** vừa là tính từ quốc tịch, vừa là tên ngôn ngữ:
- She is **Korean**.
- She speaks **Korean**.

Lỗi thường gặp:
- Không nói "I am Vietnam" → **I am from Vietnam** hoặc **I am Vietnamese**.
- Không dùng mạo từ trước tên quốc gia: **in Vietnam**, không nói "in the Vietnam".`,
          remember: "Nói nguồn gốc: from + country; nói người: nationality.",
        },
      ],
      words: [
        w("country", "/ˈkʌntri/", "n", "quốc gia", "an area of land with its own government", "Vietnam is a beautiful country."),
        w("nationality", "/ˌnæʃəˈnæləti/", "n", "quốc tịch", "the country you belong to", "What is your nationality?"),
        w("Vietnam", "/ˌvjetˈnæm/", "n", "Việt Nam", "a country in Southeast Asia", "I am from Vietnam."),
        w("Vietnamese", "/ˌvjetnəˈmiːz/", "adj/n", "người Việt Nam; tiếng Việt", "relating to Vietnam, its people or language", "My teacher is Vietnamese."),
        w("England", "/ˈɪŋɡlənd/", "n", "nước Anh", "a country in the United Kingdom", "She lives in England."),
        w("English", "/ˈɪŋɡlɪʃ/", "adj/n", "tiếng Anh; người Anh", "the language of England; relating to England", "I study English every day."),
        w("Japan", "/dʒəˈpæn/", "n", "Nhật Bản", "a country in East Asia", "Japan is famous for cherry blossoms."),
        w("Japanese", "/ˌdʒæpəˈniːz/", "adj/n", "người Nhật; tiếng Nhật", "relating to Japan, its people or language", "He speaks Japanese."),
        w("Korea", "/kəˈriːə/", "n", "Hàn Quốc", "a country in East Asia", "My friend is from Korea."),
        w("Korean", "/kəˈriːən/", "adj/n", "người Hàn; tiếng Hàn", "relating to Korea, its people or language", "She is Korean."),
        w("China", "/ˈtʃaɪnə/", "n", "Trung Quốc", "a large country in East Asia", "China is a big country."),
        w("Chinese", "/ˌtʃaɪˈniːz/", "adj/n", "người Trung Quốc; tiếng Trung", "relating to China, its people or language", "They study Chinese at school."),
        w("Australia", "/ɒˈstreɪliə/", "n", "nước Úc", "a country in the southern hemisphere", "My cousin lives in Australia."),
        w("Australian", "/ɒˈstreɪliən/", "adj/n", "người Úc", "relating to Australia or its people", "This is an Australian film."),
      ],
    },
  },
  {
    name: "Gia đình & con người",
    slug: "gia-dinh-con-nguoi",
    icon: "family_restroom",
    description: "Nói về các thành viên trong gia đình, tuổi tác và quan hệ họ hàng.",
    lesson: {
      title: "Gia đình & các thành viên",
      summary: "14 từ về gia đình, kèm cách dùng tính từ sở hữu và sở hữu cách.",
      sections: [
        {
          title: "Các thành viên trong gia đình",
          body: `- **Parents** = bố mẹ (số nhiều); **mother** = mẹ, **father** = bố.
- **Grandmother / grandfather** = bà / ông.
- **Aunt / uncle** = cô, dì / chú, bác.
- **Cousin** = anh, chị, em họ.
- **Son / daughter** = con trai / con gái.
- **Child** = đứa trẻ; số nhiều là **children**.`,
          remember: "Parents, grandparents, children là danh từ số nhiều.",
        },
        {
          title: "Nói về gia đình",
          body: `Dùng **have/has** để nói số lượng thành viên:
- I **have** one brother and two sisters.
- She **has** a big family.

Dùng tính từ sở hữu trước danh từ:
- **my** mother, **his** father, **their** children.

Sở hữu cách:
- **my mother's name** (tên của mẹ tôi)
- **my parents' house** (nhà của bố mẹ tôi)`,
          remember: "My mother's name = tên của mẹ tôi.",
        },
        {
          title: "Mẫu câu giới thiệu",
          body: `- This is **my sister**. She is ten years old.
- My **grandmother** lives in the countryside.
- We visit our **cousins** every summer.

Lỗi thường gặp:
- Không nói "I have 20 years old" → **I am 20 years old**.
- **Children** là số nhiều; không nói "childrens".`,
          remember: "Child → children; nói tuổi dùng I am ... years old.",
        },
      ],
      words: [
        w("family", "/ˈfæməli/", "n", "gia đình", "a group of parents and children", "My family has four people."),
        w("mother", "/ˈmʌðə/", "n", "mẹ", "a female parent", "My mother is a nurse."),
        w("father", "/ˈfɑːðə/", "n", "bố", "a male parent", "My father works in a factory."),
        w("parents", "/ˈpeərənts/", "n", "bố mẹ", "a mother and father", "My parents live in Hue."),
        w("sister", "/ˈsɪstə/", "n", "chị/em gái", "a female sibling", "My sister is ten years old."),
        w("brother", "/ˈbrʌðə/", "n", "anh/em trai", "a male sibling", "I have one brother."),
        w("grandmother", "/ˈɡrænmʌðə/", "n", "bà", "the mother of your mother or father", "My grandmother cooks very well."),
        w("grandfather", "/ˈɡrænfɑːðə/", "n", "ông", "the father of your mother or father", "My grandfather is seventy."),
        w("aunt", "/ɑːnt/", "n", "cô, dì, bác gái", "the sister of your mother or father", "My aunt lives in Da Nang."),
        w("uncle", "/ˈʌŋkl/", "n", "chú, bác trai", "the brother of your mother or father", "My uncle has a farm."),
        w("cousin", "/ˈkʌzn/", "n", "anh/chị/em họ", "the child of your aunt or uncle", "My cousin is my best friend."),
        w("son", "/sʌn/", "n", "con trai", "a male child", "Their son is at school."),
        w("daughter", "/ˈdɔːtə/", "n", "con gái", "a female child", "Her daughter is a baby."),
        w("child", "/tʃaɪld/", "n", "đứa trẻ, con", "a young person", "The child is playing in the garden."),
      ],
    },
  },
  {
    name: "Nhà cửa & đồ vật",
    slug: "nha-cua-do-vat",
    icon: "chair",
    description: "Mô tả ngôi nhà, các phòng và đồ vật quen thuộc bằng there is/are.",
    lesson: {
      title: "Nhà cửa & đồ vật trong nhà",
      summary: "14 từ về phòng và nội thất, kèm mẫu câu there is/are và giới từ chỉ nơi chốn.",
      sections: [
        {
          title: "Các phòng trong nhà",
          body: `- **Living room**: phòng khách
- **Bedroom**: phòng ngủ
- **Bathroom**: phòng tắm
- **Kitchen**: nhà bếp
- **Room**: phòng (nói chung)

**House** là ngôi nhà; **flat** là căn hộ (Anh), **apartment** là cách nói của Mỹ.`,
          remember: "Living room, bedroom, bathroom, kitchen.",
        },
        {
          title: "Đồ vật và giới từ",
          body: `Đồ vật quen thuộc: **door, window, table, chair, bed, sofa, fridge**.

Mẫu câu:
- There is a **table** in the kitchen.
- There are two **chairs** in the room.
- The cat is **under** the table.
- The picture is **on** the wall.

Dùng **in** cho không gian kín, **on** cho bề mặt.`,
          remember: "in the room, on the table, under the bed.",
        },
        {
          title: "Collocations thường dùng",
          body: `- **open / close the door**
- **open / close the window**
- **make the bed**
- **sit on the chair**
- **watch TV in the living room**
- **cook in the kitchen**
- **sleep in the bedroom**`,
          remember: "make the bed = dọn giường; sit on the chair = ngồi trên ghế.",
        },
      ],
      words: [
        w("house", "/haʊs/", "n", "ngôi nhà", "a building where people live", "They live in a big house."),
        w("flat", "/flæt/", "n", "căn hộ", "a set of rooms on one floor (British English)", "I live in a small flat."),
        w("room", "/ruːm/", "n", "phòng", "a part of a building with walls", "My room is upstairs."),
        w("bedroom", "/ˈbedruːm/", "n", "phòng ngủ", "a room for sleeping", "There are two bedrooms upstairs."),
        w("bathroom", "/ˈbɑːθruːm/", "n", "phòng tắm", "a room with a bath or shower", "The bathroom is next to my bedroom."),
        w("kitchen", "/ˈkɪtʃɪn/", "n", "nhà bếp", "a room where people cook", "My mother is cooking in the kitchen."),
        w("living room", "/ˈlɪvɪŋ ruːm/", "n", "phòng khách", "a room for relaxing and watching TV", "We watch TV in the living room."),
        w("door", "/dɔː/", "n", "cửa ra vào", "a thing you open to enter a room", "Please close the door."),
        w("window", "/ˈwɪndəʊ/", "n", "cửa sổ", "an opening in a wall with glass", "Open the window, please."),
        w("table", "/ˈteɪbl/", "n", "cái bàn", "a piece of furniture with a flat top", "The books are on the table."),
        w("chair", "/tʃeə/", "n", "cái ghế", "a seat for one person", "There is a chair next to the desk."),
        w("bed", "/bed/", "n", "cái giường", "a piece of furniture for sleeping", "My bed is very comfortable."),
        w("sofa", "/ˈsəʊfə/", "n", "ghế sofa", "a long soft seat for two or more people", "The cat is sleeping on the sofa."),
        w("fridge", "/frɪdʒ/", "n", "tủ lạnh", "a cold cupboard for keeping food fresh", "There is some milk in the fridge."),
      ],
    },
  },
  {
    name: "Thời gian & lịch",
    slug: "thoi-gian-lich",
    icon: "schedule",
    description: "Các ngày trong tuần, buổi trong ngày và cách nói hôm nay, ngày mai, hôm qua.",
    lesson: {
      title: "Ngày, buổi & mốc thời gian",
      summary: "14 từ về thứ, buổi và các mốc thời gian, kèm giới từ in/on/at.",
      sections: [
        {
          title: "Các ngày trong tuần",
          body: `**Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.**

- Các ngày luôn viết hoa.
- Dùng **on** trước thứ: **on Monday**, **on Friday**.
- **On Mondays** = vào các ngày thứ Hai (lặp lại).

Ví dụ: I have English **on Tuesday**.`,
          remember: "on + thứ: on Monday, on Sunday.",
        },
        {
          title: "Các buổi trong ngày",
          body: `- **Morning**: buổi sáng → **in the morning**
- **Afternoon**: buổi chiều → **in the afternoon**
- **Evening**: buổi tối → **in the evening**
- **Night**: ban đêm → **at night**

**Today** = hôm nay, **tomorrow** = ngày mai, **yesterday** = hôm qua.

Các từ này không cần giới từ: **today**, **tomorrow morning**, **yesterday evening**.`,
          remember: "in the morning/afternoon/evening; at night.",
        },
        {
          title: "Mẫu câu thường gặp",
          body: `- **What day is it today?** — It's Monday.
- I go to school **on weekdays**.
- We visit our grandparents **at the weekend**.
- She arrived **yesterday**.
- See you **tomorrow**!

Lỗi thường gặp: không nói "in Monday" → **on Monday**.`,
          remember: "on Monday, in the morning, at night, yesterday/today/tomorrow.",
        },
      ],
      words: [
        w("Monday", "/ˈmʌndeɪ/", "n", "thứ Hai", "the first day of the working week", "I have English on Monday."),
        w("Tuesday", "/ˈtjuːzdeɪ/", "n", "thứ Ba", "the day after Monday", "We play football on Tuesday."),
        w("Wednesday", "/ˈwenzdeɪ/", "n", "thứ Tư", "the day after Tuesday", "My class starts on Wednesday."),
        w("Thursday", "/ˈθɜːzdeɪ/", "n", "thứ Năm", "the day after Wednesday", "She works late on Thursday."),
        w("Friday", "/ˈfraɪdeɪ/", "n", "thứ Sáu", "the day after Thursday", "We often eat out on Friday."),
        w("Saturday", "/ˈsætədeɪ/", "n", "thứ Bảy", "the day after Friday", "I visit my aunt on Saturday."),
        w("Sunday", "/ˈsʌndeɪ/", "n", "Chủ nhật", "the day after Saturday", "We relax on Sunday."),
        w("today", "/təˈdeɪ/", "adv", "hôm nay", "on this day", "Today is my birthday."),
        w("tomorrow", "/təˈmɒrəʊ/", "adv", "ngày mai", "the day after today", "See you tomorrow!"),
        w("yesterday", "/ˈjestədeɪ/", "adv", "hôm qua", "the day before today", "I was at home yesterday."),
        w("morning", "/ˈmɔːnɪŋ/", "n", "buổi sáng", "the early part of the day", "I drink coffee in the morning."),
        w("afternoon", "/ˌɑːftəˈnuːn/", "n", "buổi chiều", "the time after midday", "We have class in the afternoon."),
        w("evening", "/ˈiːvnɪŋ/", "n", "buổi tối", "the time before night", "I watch TV in the evening."),
        w("night", "/naɪt/", "n", "ban đêm", "the dark part of the day", "I read at night."),
      ],
    },
  },
  {
    name: "Thói quen hằng ngày",
    slug: "thoi-quen-hang-ngay",
    icon: "routine",
    description: "Kể lại một ngày của bạn bằng các động từ và cụm từ chỉ thói quen.",
    lesson: {
      title: "Một ngày của tôi",
      summary: "14 cụm từ chỉ hoạt động hằng ngày, kèm thì hiện tại đơn và trạng từ tần suất.",
      sections: [
        {
          title: "Trình tự một ngày",
          body: `Một ngày thường bắt đầu:
- I **wake up** at six.
- I **get up** at six fifteen.
- I **brush my teeth** and **wash my face**.
- I **have breakfast** at seven.
- I **go to school / go to work** at seven thirty.
- I **come home** at five.
- I **do my homework** and **watch TV**.
- I **have dinner** at seven.
- I **go to bed** at ten.`,
          remember: "wake up (tỉnh dậy) khác get up (ra khỏi giường).",
        },
        {
          title: "Hiện tại đơn với thói quen",
          body: `Dùng thì hiện tại đơn:
- I **get up** at six every day.
- She **gets up** at six.
- He **brushes** his teeth.
- She **watches** TV in the evening.
- He **goes** to work by bus.

Với he/she/it: thêm -s/-es và đổi **have → has**.`,
          remember: "She gets up, brushes, watches, goes, has.",
        },
        {
          title: "Collocations cần nhớ",
          body: `- **have breakfast / lunch / dinner**
- **go to work / go to school**
- **come home**
- **do homework**
- **watch TV**
- **go to bed**

Lỗi thường gặp:
- Không nói "I go to the school" khi nói đi học nói chung → **go to school**.
- **Go to bed** = đi ngủ; **sleep** = ngủ.`,
          remember: "have + bữa ăn; go to + school/work/bed.",
        },
      ],
      words: [
        w("wake up", "/weɪk ʌp/", "phrase", "thức dậy", "to stop sleeping", "I wake up at six every day."),
        w("get up", "/ɡet ʌp/", "phrase", "ra khỏi giường", "to get out of bed", "She gets up at six thirty."),
        w("brush your teeth", "/brʌʃ jɔː tiːθ/", "phrase", "đánh răng", "to clean your teeth with a brush", "I brush my teeth after breakfast."),
        w("wash your face", "/wɒʃ jɔː feɪs/", "phrase", "rửa mặt", "to clean your face with water", "He washes his face every morning."),
        w("have breakfast", "/hæv ˈbrekfəst/", "phrase", "ăn sáng", "to eat a morning meal", "We have breakfast at seven."),
        w("have lunch", "/hæv lʌntʃ/", "phrase", "ăn trưa", "to eat a midday meal", "I have lunch at school."),
        w("have dinner", "/hæv ˈdɪnə/", "phrase", "ăn tối", "to eat an evening meal", "My family has dinner at seven."),
        w("go to work", "/ɡəʊ tə wɜːk/", "phrase", "đi làm", "to travel to your job", "My father goes to work by bus."),
        w("go to school", "/ɡəʊ tə skuːl/", "phrase", "đi học", "to go to a place to learn", "The children go to school every day."),
        w("come home", "/kʌm həʊm/", "phrase", "về nhà", "to return to your home", "I come home at five o'clock."),
        w("do homework", "/duː ˈhəʊmwɜːk/", "phrase", "làm bài tập", "to complete school work at home", "She does her homework after dinner."),
        w("watch TV", "/wɒtʃ ˌtiːˈviː/", "phrase", "xem TV", "to look at television programmes", "We watch TV in the evening."),
        w("go to bed", "/ɡəʊ tə bed/", "phrase", "đi ngủ", "to get into bed to sleep", "I go to bed at ten."),
        w("sleep", "/sliːp/", "v", "ngủ", "to rest with your eyes closed", "The baby sleeps for ten hours."),
      ],
    },
  },
  {
    name: "Thức ăn & đồ uống",
    slug: "thuc-an-do-uong",
    icon: "restaurant",
    description: "Gọi món, nói về bữa ăn và phân biệt danh từ đếm được/không đếm được.",
    lesson: {
      title: "Thức ăn, đồ uống & bữa ăn",
      summary: "14 từ về món ăn, đồ uống, kèm some/any và cách dùng danh từ không đếm được.",
      sections: [
        {
          title: "Ba bữa chính",
          body: `- **Breakfast**: bữa sáng
- **Lunch**: bữa trưa
- **Dinner**: bữa tối

Dùng **have** với các bữa ăn:
- I **have breakfast** at seven.
- We **have lunch** at twelve.
- They **have dinner** at seven.`,
          remember: "have breakfast/lunch/dinner (không dùng eat breakfast? eat cũng đúng nhưng have phổ biến hơn).",
        },
        {
          title: "Đếm được và không đếm được",
          body: `- Đếm được: **egg → eggs**, **vegetable → vegetables**.
- Không đếm được: **rice, bread, meat, fish, fruit, milk, water, coffee**.

Dùng đơn vị:
- a bowl of **rice**
- a piece of **bread**
- a glass of **water**
- a cup of **coffee**
- a bottle of **milk**`,
          remember: "Không nói a rice / a water; dùng a bowl of rice / a glass of water.",
        },
        {
          title: "Mẫu câu gọi món",
          body: `- I'd like **some rice and fish**, please.
- Can I have **a cup of coffee**?
- Would you like **some fruit**?
- There is **some milk** in the fridge.
- There aren't **any eggs**.

**Some** dùng trong câu khẳng định/lời mời; **any** dùng trong phủ định/câu hỏi.`,
          remember: "some + khẳng định/lời mời; any + phủ định/câu hỏi.",
        },
      ],
      words: [
        w("food", "/fuːd/", "n", "thức ăn", "things that people eat", "Vietnamese food is delicious."),
        w("breakfast", "/ˈbrekfəst/", "n", "bữa sáng", "the first meal of the day", "I have breakfast at seven."),
        w("lunch", "/lʌntʃ/", "n", "bữa trưa", "a meal in the middle of the day", "We have lunch at school."),
        w("dinner", "/ˈdɪnə/", "n", "bữa tối", "the main evening meal", "My family has dinner together."),
        w("rice", "/raɪs/", "n", "cơm, gạo", "small white grains used as food", "We eat rice every day."),
        w("bread", "/bred/", "n", "bánh mì", "a food made from flour and baked", "I have bread and eggs for breakfast."),
        w("egg", "/eɡ/", "n", "quả trứng", "a round food from a chicken", "She eats two eggs every morning."),
        w("meat", "/miːt/", "n", "thịt", "food from animals", "He doesn't eat much meat."),
        w("fish", "/fɪʃ/", "n", "cá (thực phẩm)", "an animal that lives in water, used as food", "We had fish for dinner."),
        w("vegetable", "/ˈvedʒtəbl/", "n", "rau củ", "a plant used as food", "Eat more vegetables every day."),
        w("fruit", "/fruːt/", "n", "trái cây", "the sweet part of a plant that people eat", "I like tropical fruit."),
        w("milk", "/mɪlk/", "n", "sữa", "a white drink from cows", "There is some milk in the fridge."),
        w("water", "/ˈwɔːtə/", "n", "nước", "a clear liquid that people drink", "Please drink more water."),
        w("coffee", "/ˈkɒfi/", "n", "cà phê", "a hot drink made from coffee beans", "She drinks coffee every morning."),
      ],
    },
  },
  {
    name: "Trường học & học tập",
    slug: "truong-hoc-hoc-tap",
    icon: "school",
    description: "Nói về trường lớp, dụng cụ học tập và các hoạt động học tập.",
    lesson: {
      title: "Trường học & dụng cụ học tập",
      summary: "14 từ về trường lớp, đồ dùng và hoạt động học tập, kèm mẫu câu at school / in class.",
      sections: [
        {
          title: "Trường lớp và người học",
          body: `- **School**: trường học
- **Class**: lớp học
- **Teacher**: giáo viên
- **Student**: học sinh, sinh viên
- **Lesson**: bài học
- **Library**: thư viện

Dùng **at school** khi nói ở trường; **in class** khi nói trong giờ học:
- My son is **at school** now.
- Please listen **in class**.`,
          remember: "at school, in class, in the library.",
        },
        {
          title: "Đồ dùng học tập",
          body: `- **Book**: sách
- **Notebook**: vở
- **Pen**: bút mực
- **Pencil**: bút chì
- **Desk**: bàn học

Mẫu câu:
- There is a **pen** on the desk.
- My **notebook** is in my bag.
- I need a **pencil** for the exam.`,
          remember: "on the desk, in the bag, in the notebook.",
        },
        {
          title: "Hoạt động học tập",
          body: `- **learn English**: học tiếng Anh
- **do homework**: làm bài tập
- **take an exam**: làm bài kiểm tra
- **go to the library**: đến thư viện

Ví dụ:
- I **learn** English every day.
- She **does** her homework after school.
- We **take** an exam on Friday.

Lỗi thường gặp: **homework** không đếm được, không nói "a homework" hay "homeworks".`,
          remember: "do homework, take an exam, learn English.",
        },
      ],
      words: [
        w("school", "/skuːl/", "n", "trường học", "a place where children learn", "My school is near my house."),
        w("class", "/klɑːs/", "n", "lớp học", "a group of students taught together", "There are thirty students in my class."),
        w("teacher", "/ˈtiːtʃə/", "n", "giáo viên", "a person who teaches", "Our teacher is very kind."),
        w("student", "/ˈstjuːdənt/", "n", "học sinh, sinh viên", "a person who studies", "I am a student."),
        w("book", "/bʊk/", "n", "sách", "pages with words or pictures", "This book is very interesting."),
        w("notebook", "/ˈnəʊtbʊk/", "n", "vở", "a book for writing notes", "Write the answer in your notebook."),
        w("pen", "/pen/", "n", "bút mực", "a tool for writing with ink", "Can I borrow your pen?"),
        w("pencil", "/ˈpensl/", "n", "bút chì", "a tool for writing or drawing", "I draw with a pencil."),
        w("desk", "/desk/", "n", "bàn học", "a table used for studying or working", "My books are on the desk."),
        w("lesson", "/ˈlesn/", "n", "bài học", "a period of teaching", "Today's lesson is about families."),
        w("homework", "/ˈhəʊmwɜːk/", "n", "bài tập về nhà", "school work done at home", "I do my homework after dinner."),
        w("exam", "/ɪɡˈzæm/", "n", "bài kiểm tra, kỳ thi", "a test of knowledge", "We have an English exam tomorrow."),
        w("library", "/ˈlaɪbrəri/", "n", "thư viện", "a place with books to read or borrow", "She studies in the library."),
        w("learn", "/lɜːn/", "v", "học", "to get knowledge or a skill", "I want to learn English."),
      ],
    },
  },
  {
    name: "Nghề nghiệp & công việc",
    slug: "nghe-nghiep-cong-viec",
    icon: "work",
    description: "Hỏi về nghề nghiệp, nơi làm việc và các công việc quen thuộc.",
    lesson: {
      title: "Nghề nghiệp & nơi làm việc",
      summary: "14 từ về nghề nghiệp, công việc và mẫu câu What do you do?",
      sections: [
        {
          title: "Hỏi và nói về nghề nghiệp",
          body: `- **What do you do?** — I'm a **teacher**.
- **Where do you work?** — I work in a **school**.
- **What does she do?** — She's a **nurse**.

Dùng **a/an** trước nghề nghiệp số ít:
- He is **a doctor**.
- She is **an engineer**.`,
          remember: "What do you do? = Bạn làm nghề gì?",
        },
        {
          title: "Nơi làm việc",
          body: `- **office**: văn phòng
- **company**: công ty
- **hospital**: bệnh viện
- **school**: trường học

Dùng **in** với nơi làm việc:
- She works **in an office**.
- He works **in a hospital**.

Dùng **for** với công ty:
- I work **for a small company**.`,
          remember: "work in an office / work for a company.",
        },
        {
          title: "Job và work",
          body: `- **Job** là danh từ đếm được: a job, two jobs.
- **Work** là danh từ không đếm được: I have a lot of work.
- **Work** cũng là động từ: I work in Hanoi.

Lỗi thường gặp:
- Không nói "I am a work" → **I have a job** / **I work**.
- Không nói "go to the work" → **go to work**.`,
          remember: "a job (đếm được) / work (không đếm được).",
        },
      ],
      words: [
        w("job", "/dʒɒb/", "n", "công việc", "the work someone does for money", "She has a new job in a hotel."),
        w("work", "/wɜːk/", "n/v", "công việc; làm việc", "a job or activity done for money", "I work in an office."),
        w("doctor", "/ˈdɒktə/", "n", "bác sĩ", "a person who treats sick people", "My father is a doctor."),
        w("nurse", "/nɜːs/", "n", "y tá", "a person who cares for sick people", "The nurse is very kind."),
        w("engineer", "/ˌendʒɪˈnɪə/", "n", "kỹ sư", "a person who designs or builds things", "He is an engineer."),
        w("farmer", "/ˈfɑːmə/", "n", "nông dân", "a person who works on a farm", "My grandfather is a farmer."),
        w("driver", "/ˈdraɪvə/", "n", "tài xế", "a person who drives a vehicle", "The bus driver is friendly."),
        w("cook", "/kʊk/", "n/v", "đầu bếp; nấu ăn", "a person who cooks food; to prepare food", "She is a cook in a restaurant."),
        w("waiter", "/ˈweɪtə/", "n", "bồi bàn", "a man who serves food in a restaurant", "The waiter brought our drinks."),
        w("shop assistant", "/ʃɒp əˈsɪstənt/", "n", "nhân viên bán hàng", "a person who helps customers in a shop", "The shop assistant is very helpful."),
        w("office", "/ˈɒfɪs/", "n", "văn phòng", "a room or building where people work", "My mother works in an office."),
        w("company", "/ˈkʌmpəni/", "n", "công ty", "a business organization", "He works for a big company."),
        w("manager", "/ˈmænɪdʒə/", "n", "quản lý", "a person who controls a team or business", "She is the manager of the shop."),
        w("salary", "/ˈsæləri/", "n", "tiền lương", "money paid for a job", "His salary is good."),
      ],
    },
  },
  {
    name: "Sở thích & thời gian rảnh",
    slug: "so-thich-thoi-gian-ranh",
    icon: "sports_soccer",
    description: "Nói về sở thích, hoạt động giải trí và cách dùng like/enjoy + V-ing.",
    lesson: {
      title: "Sở thích & hoạt động giải trí",
      summary: "14 từ về sở thích, kèm cấu trúc like/enjoy + V-ing và play/go + hoạt động.",
      sections: [
        {
          title: "Hỏi về sở thích",
          body: `- **What do you do in your free time?**
- **What are your hobbies?**
- I **like** listening to music.
- She **enjoys** swimming.

Dùng **in my free time** = vào thời gian rảnh của tôi.`,
          remember: "in my free time = vào lúc rảnh.",
        },
        {
          title: "Like / enjoy + V-ing",
          body: `- I **like reading** books.
- He **loves playing** football.
- She **enjoys cooking**.
- They **hate getting up** early.

**Enjoy** luôn đi với V-ing:
- She enjoys **shopping**. (không nói "enjoys to shop")`,
          remember: "like/love/enjoy + V-ing; enjoy không đi với to V.",
        },
        {
          title: "Collocations với play / go / listen",
          body: `- **play football / tennis / chess**
- **go swimming / shopping / dancing**
- **listen to music**
- **watch films**
- **read books**
- **travel** (không cần giới từ)

Ví dụ:
- I **play football** on Sundays.
- We **go swimming** in summer.
- She **listens to music** every evening.`,
          remember: "play + môn thể thao; go + V-ing; listen to + music.",
        },
      ],
      words: [
        w("hobby", "/ˈhɒbi/", "n", "sở thích", "an activity you enjoy in your free time", "My hobby is reading."),
        w("free time", "/friː taɪm/", "n", "thời gian rảnh", "time when you are not working or studying", "I play tennis in my free time."),
        w("music", "/ˈmjuːzɪk/", "n", "âm nhạc", "sounds made by instruments or voices", "She listens to music every day."),
        w("film", "/fɪlm/", "n", "phim", "a story shown in a cinema or on TV", "We watched a funny film."),
        w("reading", "/ˈriːdɪŋ/", "n", "việc đọc sách", "the activity of reading", "Reading is my favourite hobby."),
        w("sport", "/spɔːt/", "n", "thể thao", "a physical game or activity", "He plays a lot of sport."),
        w("football", "/ˈfʊtbɔːl/", "n", "bóng đá", "a game played by two teams with a ball", "They play football after school."),
        w("swimming", "/ˈswɪmɪŋ/", "n", "bơi lội", "the activity of moving through water", "Swimming is good exercise."),
        w("cooking", "/ˈkʊkɪŋ/", "n", "việc nấu ăn", "the activity of preparing food", "My mother enjoys cooking."),
        w("shopping", "/ˈʃɒpɪŋ/", "n", "việc mua sắm", "the activity of buying things", "We go shopping at the weekend."),
        w("travel", "/ˈtrævl/", "v/n", "du lịch", "to go to different places", "I want to travel around Vietnam."),
        w("dance", "/dɑːns/", "v", "nhảy múa", "to move your body to music", "She likes to dance."),
        w("sing", "/sɪŋ/", "v", "hát", "to make music with your voice", "He can sing very well."),
        w("play", "/pleɪ/", "v", "chơi", "to take part in a game or activity", "The children play in the park."),
      ],
    },
  },
  {
    name: "Quần áo & mua sắm",
    slug: "quan-ao-mua-sam",
    icon: "checkroom",
    description: "Gọi tên trang phục, hỏi giá và mua sắm trong cửa hàng.",
    lesson: {
      title: "Quần áo, giá cả & mua sắm",
      summary: "14 từ về trang phục và mua sắm, kèm mẫu câu How much...? và danh từ luôn số nhiều.",
      sections: [
        {
          title: "Trang phục thường mặc",
          body: `- **shirt**: áo sơ mi
- **T-shirt**: áo phông
- **trousers**: quần dài
- **skirt**: váy
- **dress**: đầm
- **shoes**: giày
- **jacket**: áo khoác

**Trousers** và **shoes** luôn ở dạng số nhiều:
- These trousers are new.
- a pair of shoes = một đôi giày.`,
          remember: "trousers/shoes là số nhiều; a pair of trousers/shoes.",
        },
        {
          title: "Mua sắm và hỏi giá",
          body: `- **shop**: cửa hàng
- **market**: chợ
- **price**: giá
- **money**: tiền

Mẫu câu:
- **How much is this shirt?** — It's 200,000 dong.
- **How much are these shoes?** — They're 500,000 dong.
- Can I **try it on**? (Tôi có thể thử không?)
- I'd like to **buy** this bag.`,
          remember: "How much is + số ít; How much are + số nhiều.",
        },
        {
          title: "Lỗi thường gặp",
          body: `- **Clothes** là danh từ số nhiều: My clothes **are** new.
- **Money** không đếm được: I don't have **much money**. (không nói "many money")
- Không nói "a trousers" → **a pair of trousers**.
- **Price** là giá; **prize** là giải thưởng — không nhầm lẫn.`,
          remember: "clothes are; money is; a pair of trousers.",
        },
      ],
      words: [
        w("clothes", "/kləʊðz/", "n", "quần áo", "things people wear", "My clothes are in the wardrobe."),
        w("shirt", "/ʃɜːt/", "n", "áo sơ mi", "a shirt with a collar and buttons", "He wears a white shirt to work."),
        w("T-shirt", "/ˈtiː ʃɜːt/", "n", "áo phông", "a simple cotton shirt with short sleeves", "I like this blue T-shirt."),
        w("trousers", "/ˈtraʊzəz/", "n", "quần dài", "clothing for the legs", "These trousers are too long."),
        w("skirt", "/skɜːt/", "n", "váy", "clothing for women that hangs from the waist", "She is wearing a red skirt."),
        w("dress", "/dres/", "n", "đầm, váy liền", "a piece of clothing for women or girls", "The dress is very beautiful."),
        w("shoes", "/ʃuːz/", "n", "giày", "things you wear on your feet", "My new shoes are comfortable."),
        w("jacket", "/ˈdʒækɪt/", "n", "áo khoác", "a short coat", "Take a jacket; it's cold."),
        w("hat", "/hæt/", "n", "mũ", "a covering for the head", "He wears a hat in the sun."),
        w("bag", "/bæɡ/", "n", "túi", "a container for carrying things", "This bag is very heavy."),
        w("shop", "/ʃɒp/", "n", "cửa hàng", "a place where you buy things", "The shop opens at nine."),
        w("market", "/ˈmɑːkɪt/", "n", "chợ", "a place with many shops or stalls", "We buy fruit at the market."),
        w("price", "/praɪs/", "n", "giá", "the amount of money something costs", "The price is too high."),
        w("money", "/ˈmʌni/", "n", "tiền", "coins and notes used to buy things", "I need some money for the bus."),
      ],
    },
  },
  {
    name: "Giao thông & đi lại",
    slug: "giao-thong-di-lai",
    icon: "directions_bus",
    description: "Nói về phương tiện, nhà ga, sân bay và cách di chuyển trong thành phố.",
    lesson: {
      title: "Phương tiện & đi lại",
      summary: "14 từ về giao thông, kèm cách dùng by bus, take a taxi, on foot.",
      sections: [
        {
          title: "Phương tiện thường dùng",
          body: `- **bus**: xe buýt
- **train**: tàu hỏa
- **car**: ô tô
- **motorbike**: xe máy
- **bike**: xe đạp
- **plane**: máy bay
- **taxi**: taxi

Dùng **by + phương tiện**:
- by bus, by train, by car, by plane, by taxi.
- **on foot** = đi bộ (không nói by foot).`,
          remember: "by bus / by train / by car; on foot.",
        },
        {
          title: "Nhà ga, sân bay và vé",
          body: `- **station**: nhà ga
- **airport**: sân bay
- **ticket**: vé
- **journey**: hành trình
- **road**: con đường

Mẫu câu:
- We wait at the **station**.
- I arrive at the **airport** at six.
- I need a **ticket** to Hanoi.
- The **journey** takes two hours.`,
          remember: "at the station / at the airport; a ticket to + nơi.",
        },
        {
          title: "Động từ đi lại",
          body: `- **take a bus / taxi**: bắt xe buýt / taxi
- **catch a train**: bắt tàu
- **ride a bike / motorbike**: đi xe đạp / xe máy
- **drive a car**: lái ô tô
- **walk**: đi bộ
- **travel**: đi lại, du lịch

Ví dụ: I **take the bus** to work. / She **rides her bike** to school.`,
          remember: "take a bus, catch a train, ride a bike, drive a car.",
        },
      ],
      words: [
        w("transport", "/ˈtrænspɔːt/", "n", "giao thông, phương tiện", "the system of moving people or things", "Public transport is cheap here."),
        w("bus", "/bʌs/", "n", "xe buýt", "a large vehicle for many passengers", "I go to school by bus."),
        w("train", "/treɪn/", "n", "tàu hỏa", "a vehicle that runs on rails", "We took the train to Hue."),
        w("car", "/kɑː/", "n", "ô tô", "a road vehicle with four wheels", "My father drives a car."),
        w("motorbike", "/ˈməʊtəbaɪk/", "n", "xe máy", "a vehicle with two wheels and an engine", "He goes to work by motorbike."),
        w("bike", "/baɪk/", "n", "xe đạp", "a vehicle with two wheels that you pedal", "She rides her bike to school."),
        w("plane", "/pleɪn/", "n", "máy bay", "a vehicle that flies", "The plane leaves at nine."),
        w("taxi", "/ˈtæksi/", "n", "taxi", "a car with a driver that you pay for", "Let's take a taxi to the airport."),
        w("station", "/ˈsteɪʃn/", "n", "nhà ga", "a place where trains or buses stop", "I'll meet you at the station."),
        w("airport", "/ˈeəpɔːt/", "n", "sân bay", "a place where planes take off and land", "We arrived at the airport early."),
        w("ticket", "/ˈtɪkɪt/", "n", "vé", "a piece of paper that lets you travel", "I bought a train ticket."),
        w("journey", "/ˈdʒɜːni/", "n", "hành trình", "the act of travelling from one place to another", "The journey takes three hours."),
        w("road", "/rəʊd/", "n", "con đường", "a way for cars and other vehicles", "Be careful when you cross the road."),
        w("walk", "/wɔːk/", "v", "đi bộ", "to move on foot", "I walk to school every day."),
      ],
    },
  },
  {
    name: "Địa điểm trong thành phố",
    slug: "dia-diem-thanh-pho",
    icon: "location_city",
    description: "Gọi tên các địa điểm quen thuộc và hỏi đường bằng Where is...?",
    lesson: {
      title: "Địa điểm trong thành phố",
      summary: "14 địa điểm quen thuộc, kèm mẫu câu hỏi đường và giới từ chỉ vị trí.",
      sections: [
        {
          title: "Địa điểm quen thuộc",
          body: `- **hospital**: bệnh viện
- **bank**: ngân hàng
- **supermarket**: siêu thị
- **restaurant**: nhà hàng
- **café**: quán cà phê
- **cinema**: rạp chiếu phim
- **museum**: bảo tàng
- **post office**: bưu điện
- **pharmacy**: hiệu thuốc

**City** là thành phố lớn; **town** là thị trấn.`,
          remember: "hospital, bank, supermarket, restaurant, cinema.",
        },
        {
          title: "Hỏi đường",
          body: `- **Where is the bank?** — It's on Main Street.
- **Is there a pharmacy near here?** — Yes, there is.
- **How do I get to the museum?** — Go straight and turn left.

Dùng **on** với tên đường: **on Nguyen Hue Street**.
Dùng **at** với địa điểm cụ thể: **at the cinema**, **at the station**.`,
          remember: "on + tên đường; at + địa điểm.",
        },
        {
          title: "Mẫu câu và lưu ý",
          body: `- I'm going to the **supermarket**.
- She works at the **hospital**.
- We often meet at the **café**.
- The **post office** is next to the bank.

Lỗi thường gặp:
- Không nói "go to hospital" khi nói đến bệnh viện với tư cách khách → **go to the hospital**.
- **Café** có dấu é; viết thường vẫn dùng được trong tiếng Anh hiện đại.`,
          remember: "at the café / at the cinema / at the hospital.",
        },
      ],
      words: [
        w("city", "/ˈsɪti/", "n", "thành phố", "a large town", "Hanoi is a busy city."),
        w("town", "/taʊn/", "n", "thị trấn", "a place with houses and shops, smaller than a city", "My hometown is a small town."),
        w("street", "/striːt/", "n", "đường phố", "a road in a town or city", "The bank is on this street."),
        w("park", "/pɑːk/", "n", "công viên", "a public area with grass and trees", "Children play in the park."),
        w("hospital", "/ˈhɒspɪtl/", "n", "bệnh viện", "a place where sick people are treated", "My mother works in a hospital."),
        w("university", "/ˌjuːnɪˈvɜːsəti/", "n", "trường đại học", "a place for higher education", "My sister studies at a university."),
        w("bank", "/bæŋk/", "n", "ngân hàng", "a place that keeps and lends money", "I need to go to the bank."),
        w("supermarket", "/ˈsuːpəmɑːkɪt/", "n", "siêu thị", "a large shop selling food and household goods", "We buy food at the supermarket."),
        w("restaurant", "/ˈrestrɒnt/", "n", "nhà hàng", "a place where you buy and eat meals", "There is a good restaurant near here."),
        w("café", "/ˈkæfeɪ/", "n", "quán cà phê", "a place that sells coffee and light meals", "Let's meet at the café."),
        w("cinema", "/ˈsɪnəmə/", "n", "rạp chiếu phim", "a place where you watch films", "We went to the cinema last night."),
        w("museum", "/mjuˈziːəm/", "n", "bảo tàng", "a place with interesting objects to see", "The museum is open on Sunday."),
        w("post office", "/ˈpəʊst ɒfɪs/", "n", "bưu điện", "a place where you send letters and parcels", "The post office is next to the bank."),
        w("pharmacy", "/ˈfɑːməsi/", "n", "hiệu thuốc", "a shop that sells medicine", "Is there a pharmacy near here?"),
      ],
    },
  },
  {
    name: "Sức khỏe & cơ thể",
    slug: "suc-khoe-co-the",
    icon: "health_and_safety",
    description: "Gọi tên bộ phận cơ thể và nói về các vấn đề sức khỏe thường gặp.",
    lesson: {
      title: "Cơ thể & sức khỏe",
      summary: "14 từ về bộ phận cơ thể, triệu chứng và cách nói I have a headache.",
      sections: [
        {
          title: "Bộ phận cơ thể",
          body: `- **head**: đầu
- **eye**: mắt
- **ear**: tai
- **nose**: mũi
- **mouth**: miệng
- **hand**: bàn tay
- **arm**: cánh tay
- **leg**: chân
- **foot**: bàn chân

Số nhiều bất quy tắc: **foot → feet**, **tooth → teeth**.`,
          remember: "foot → feet; tooth → teeth.",
        },
        {
          title: "Nói về sức khỏe",
          body: `- **health**: sức khỏe
- **medicine**: thuốc
- **headache**: đau đầu
- **tired**: mệt

Mẫu câu:
- I have a **headache**.
- She is **tired**.
- You should take this **medicine**.
- How are you feeling? — I'm fine, thanks.`,
          remember: "I have a headache / I'm tired.",
        },
        {
          title: "Lời khuyên đơn giản",
          body: `- You should **see a doctor**.
- You should **rest**.
- Drink **water** and take your **medicine**.
- **Don't** work too much.

Lưu ý: **headache** là danh từ đếm được: a headache, two headaches. **Health** là danh từ không đếm được.`,
          remember: "see a doctor, take medicine, get some rest.",
        },
      ],
      words: [
        w("health", "/helθ/", "n", "sức khỏe", "the condition of your body or mind", "Good health is important."),
        w("body", "/ˈbɒdi/", "n", "cơ thể", "the whole physical form of a person", "Exercise is good for your body."),
        w("head", "/hed/", "n", "đầu", "the part of the body above the neck", "My head hurts."),
        w("eye", "/aɪ/", "n", "mắt", "one of the two organs you see with", "She has brown eyes."),
        w("ear", "/ɪə/", "n", "tai", "one of the two organs you hear with", "He has a pain in his ear."),
        w("nose", "/nəʊz/", "n", "mũi", "the part of the face used for smelling", "My nose is cold."),
        w("mouth", "/maʊθ/", "n", "miệng", "the part of the face used for eating and speaking", "Open your mouth, please."),
        w("hand", "/hænd/", "n", "bàn tay", "the part of the body at the end of the arm", "Wash your hands before dinner."),
        w("arm", "/ɑːm/", "n", "cánh tay", "the part of the body between the shoulder and hand", "He broke his arm."),
        w("leg", "/leɡ/", "n", "chân", "the part of the body used for standing and walking", "My legs are tired."),
        w("foot", "/fʊt/", "n", "bàn chân", "the part of the body at the end of the leg", "My foot hurts."),
        w("medicine", "/ˈmedsn/", "n", "thuốc", "something you take when you are ill", "Take this medicine twice a day."),
        w("headache", "/ˈhedeɪk/", "n", "cơn đau đầu", "a pain in your head", "I have a bad headache."),
        w("tired", "/ˈtaɪəd/", "adj", "mệt", "needing rest or sleep", "I'm tired after work."),
      ],
    },
  },
  {
    name: "Thời tiết & mùa",
    slug: "thoi-tiet-mua",
    icon: "wb_sunny",
    description: "Nói về thời tiết, bốn mùa và các tính từ miêu tả thời tiết.",
    lesson: {
      title: "Thời tiết & bốn mùa",
      summary: "14 từ về thời tiết và mùa, kèm mẫu câu What's the weather like?",
      sections: [
        {
          title: "Hỏi về thời tiết",
          body: `- **What's the weather like today?**
- It's **sunny**.
- It's **hot** and **humid**.
- It's **cold** in winter.

Dùng **It's + tính từ** để miêu tả thời tiết:
- It's **rainy** today.
- It's **windy** outside.`,
          remember: "What's the weather like? — It's + adj.",
        },
        {
          title: "Bốn mùa",
          body: `- **spring**: mùa xuân
- **summer**: mùa hè
- **autumn** (Anh) / **fall** (Mỹ): mùa thu
- **winter**: mùa đông

Dùng **in + mùa**:
- **in spring**, **in summer**, **in autumn**, **in winter**.

Ví dụ: It's often hot **in summer**.`,
          remember: "in spring/summer/autumn/winter.",
        },
        {
          title: "Tính từ thời tiết",
          body: `- **sunny**: có nắng
- **rainy**: có mưa
- **cloudy**: nhiều mây
- **windy**: nhiều gió
- **hot**: nóng
- **cold**: lạnh
- **warm**: ấm
- **cool**: mát

Lỗi thường gặp: **rain** là mưa (danh từ/động từ); **rainy** là tính từ:
- It **rains** a lot. / It's **rainy** today.`,
          remember: "sun → sunny, rain → rainy, wind → windy, cloud → cloudy.",
        },
      ],
      words: [
        w("weather", "/ˈweðə/", "n", "thời tiết", "the condition of the air outside", "The weather is nice today."),
        w("sunny", "/ˈsʌni/", "adj", "có nắng", "with a lot of sunshine", "It's sunny in Da Nang."),
        w("rainy", "/ˈreɪni/", "adj", "có mưa", "with a lot of rain", "It's rainy in June."),
        w("cloudy", "/ˈklaʊdi/", "adj", "nhiều mây", "with many clouds", "The sky is cloudy today."),
        w("windy", "/ˈwɪndi/", "adj", "nhiều gió", "with a lot of wind", "It's windy at the beach."),
        w("hot", "/hɒt/", "adj", "nóng", "having a high temperature", "It's very hot in summer."),
        w("cold", "/kəʊld/", "adj", "lạnh", "having a low temperature", "It's cold in winter."),
        w("warm", "/wɔːm/", "adj", "ấm", "pleasantly hot", "The weather is warm today."),
        w("cool", "/kuːl/", "adj", "mát", "slightly cold in a pleasant way", "It's cool in the evening."),
        w("spring", "/sprɪŋ/", "n", "mùa xuân", "the season between winter and summer", "Flowers grow in spring."),
        w("summer", "/ˈsʌmə/", "n", "mùa hè", "the hottest season", "We go to the beach in summer."),
        w("autumn", "/ˈɔːtəm/", "n", "mùa thu", "the season between summer and winter", "The leaves fall in autumn."),
        w("winter", "/ˈwɪntə/", "n", "mùa đông", "the coldest season", "It snows in winter in some countries."),
        w("season", "/ˈsiːzn/", "n", "mùa", "one of the four parts of the year", "Which season do you like best?"),
      ],
    },
  },
  {
    name: "Số đếm & số lượng",
    slug: "so-dem-so-luong",
    icon: "pin",
    description: "Đếm từ 1 đến 100, hỏi số lượng và dùng số trong tuổi, giá tiền, số điện thoại.",
    lesson: {
      title: "Số đếm & số lượng",
      summary: "14 từ về số đếm, kèm cách dùng số khi nói tuổi, giá tiền và số lượng.",
      sections: [
        {
          title: "Số từ 1 đến 12",
          body: `- 1 **one**, 2 **two**, 3 **three**, 4 **four**, 5 **five**, 6 **six**
- 7 **seven**, 8 **eight**, 9 **nine**, 10 **ten**, 11 **eleven**, 12 **twelve**

Từ 13 đến 19 thường kết thúc bằng **-teen**: thirteen, fourteen, fifteen...
Các số tròn chục: twenty (20), thirty (30), forty (40), fifty (50)...
**One hundred** = 100.`,
          remember: "one, two, three... twelve; twenty; one hundred.",
        },
        {
          title: "Dùng số trong câu",
          body: `- Tuổi: I am **twenty** years old.
- Số lượng: She has **two** brothers.
- Giá tiền: It costs **fifty** thousand dong.
- Số điện thoại: My number is **oh-nine-one-two**...

Dùng **how many** để hỏi số lượng đếm được:
- **How many** books do you have? — **Three**.`,
          remember: "How many + danh từ số nhiều?",
        },
        {
          title: "Lỗi thường gặp",
          body: `- Không thêm -s vào **hundred** khi nói một trăm chính xác: **two hundred books** (không nói "two hundreds books").
- Số thứ tự: first (1st), second (2nd), third (3rd), fourth (4th).
- **One** + danh từ số ít; **two** trở lên + danh từ số nhiều: one book, two books.`,
          remember: "two hundred books; first, second, third.",
        },
      ],
      words: [
        w("one", "/wʌn/", "number", "một", "the number 1", "I have one sister."),
        w("two", "/tuː/", "number", "hai", "the number 2", "There are two cats."),
        w("three", "/θriː/", "number", "ba", "the number 3", "She has three books."),
        w("four", "/fɔː/", "number", "bốn", "the number 4", "My family has four people."),
        w("five", "/faɪv/", "number", "năm", "the number 5", "I get up at five o'clock."),
        w("six", "/sɪks/", "number", "sáu", "the number 6", "The class starts at six."),
        w("seven", "/ˈsevn/", "number", "bảy", "the number 7", "There are seven days in a week."),
        w("eight", "/eɪt/", "number", "tám", "the number 8", "She works eight hours a day."),
        w("nine", "/naɪn/", "number", "chín", "the number 9", "The shop opens at nine."),
        w("ten", "/ten/", "number", "mười", "the number 10", "I have ten fingers."),
        w("eleven", "/ɪˈlevn/", "number", "mười một", "the number 11", "My brother is eleven years old."),
        w("twelve", "/twelv/", "number", "mười hai", "the number 12", "There are twelve months in a year."),
        w("twenty", "/ˈtwenti/", "number", "hai mươi", "the number 20", "She is twenty years old."),
        w("hundred", "/ˈhʌndrəd/", "number", "trăm", "the number 100", "There are two hundred students."),
      ],
    },
  },
  {
    name: "Màu sắc & hình dạng",
    slug: "mau-sac-hinh-dang",
    icon: "palette",
    description: "Gọi tên màu sắc, hình dạng và mô tả đồ vật xung quanh bằng tính từ đơn giản.",
    lesson: {
      title: "Màu sắc & hình dạng",
      summary: "14 từ về màu sắc và hình dạng, kèm mẫu câu What colour is...?",
      sections: [
        {
          title: "Màu sắc cơ bản",
          body: `- **red**: đỏ, **blue**: xanh dương, **green**: xanh lá
- **yellow**: vàng, **black**: đen, **white**: trắng
- **brown**: nâu, **orange**: cam, **pink**: hồng
- **purple**: tím, **grey**: xám

Màu sắc là tính từ, đứng trước danh từ:
- a **red** car, a **blue** shirt, **green** eyes.`,
          remember: "a red car / blue eyes; màu sắc đứng trước danh từ.",
        },
        {
          title: "Hỏi và trả lời về màu",
          body: `- **What colour is your bag?** — It's **black**.
- **What colour are your shoes?** — They're **white**.
- **What is your favourite colour?** — **Blue**.

**Colour** là danh từ (màu sắc); **colourful** là tính từ (nhiều màu sắc).`,
          remember: "What colour is + số ít? / What colour are + số nhiều?",
        },
        {
          title: "Hình dạng",
          body: `- **circle**: hình tròn
- **square**: hình vuông

Mẫu câu:
- The table is **square**.
- The clock is a **circle**.
- We sit in a **circle**.

Lỗi thường gặp: **orange** vừa là quả cam, vừa là màu cam; ngữ cảnh quyết định nghĩa.`,
          remember: "a circle / a square; The table is square.",
        },
      ],
      words: [
        w("colour", "/ˈkʌlə/", "n", "màu sắc", "red, blue, green, etc.", "What is your favourite colour?"),
        w("red", "/red/", "adj", "màu đỏ", "the colour of blood", "She has a red bag."),
        w("blue", "/bluː/", "adj", "màu xanh dương", "the colour of the sky", "The sky is blue today."),
        w("green", "/ɡriːn/", "adj", "màu xanh lá", "the colour of grass", "The leaves are green."),
        w("yellow", "/ˈjeləʊ/", "adj", "màu vàng", "the colour of the sun", "The sun is yellow."),
        w("black", "/blæk/", "adj", "màu đen", "the darkest colour", "He wears black shoes."),
        w("white", "/waɪt/", "adj", "màu trắng", "the colour of snow", "The wall is white."),
        w("brown", "/braʊn/", "adj", "màu nâu", "the colour of wood or coffee", "She has brown eyes."),
        w("orange", "/ˈɒrɪndʒ/", "adj/n", "màu cam; quả cam", "a colour between red and yellow; a fruit", "The sun is orange in the evening."),
        w("pink", "/pɪŋk/", "adj", "màu hồng", "a light red colour", "She likes pink flowers."),
        w("purple", "/ˈpɜːpl/", "adj", "màu tím", "a colour between red and blue", "My sister has a purple dress."),
        w("grey", "/ɡreɪ/", "adj", "màu xám", "a colour between black and white", "The cat is grey."),
        w("circle", "/ˈsɜːkl/", "n", "hình tròn", "a round shape", "Draw a circle on the paper."),
        w("square", "/skweə/", "n/adj", "hình vuông; vuông", "a shape with four equal sides", "The table is square."),
      ],
    },
  },
  {
    name: "Động vật & thiên nhiên",
    slug: "dong-vat-thien-nhien",
    icon: "pets",
    description: "Gọi tên động vật, cây cối và các cảnh quan thiên nhiên quen thuộc.",
    lesson: {
      title: "Động vật & thiên nhiên",
      summary: "14 từ về động vật và thiên nhiên, kèm mẫu câu there is/are và giới từ chỉ vị trí.",
      sections: [
        {
          title: "Động vật quanh em",
          body: `- **dog**: con chó
- **cat**: con mèo
- **bird**: con chim
- **horse**: con ngựa
- **cow**: con bò
- **chicken**: con gà

Mẫu câu:
- I have a **dog**.
- There are two **cats** in the garden.
- The **birds** are in the tree.`,
          remember: "a dog / two dogs; there is a cat / there are cats.",
        },
        {
          title: "Cây cối và cảnh quan",
          body: `- **tree**: cây
- **flower**: hoa
- **grass**: cỏ
- **river**: con sông
- **mountain**: ngọn núi
- **sea**: biển
- **sky**: bầu trời

Dùng giới từ:
- **in the sea**, **in the river**, **in the sky**
- **on the mountain**, **under the tree**`,
          remember: "in the sea/river/sky; on the mountain; under the tree.",
        },
        {
          title: "Miêu tả thiên nhiên",
          body: `- The **sky** is blue today.
- There are many **flowers** in the park.
- The **river** is long and wide.
- We can see the **mountains** from here.

Lỗi thường gặp:
- **Chicken** vừa là con gà vừa là thịt gà; tùy ngữ cảnh.
- **Fish** số nhiều thường vẫn là **fish** khi nói về loài/cá nói chung.`,
          remember: "in the sky, in the sea, on the mountain.",
        },
      ],
      words: [
        w("animal", "/ˈænɪml/", "n", "động vật", "a living thing that is not a plant", "The zoo has many animals."),
        w("dog", "/dɒɡ/", "n", "con chó", "a common animal kept as a pet", "My dog is very friendly."),
        w("cat", "/kæt/", "n", "con mèo", "a small animal kept as a pet", "The cat is sleeping."),
        w("bird", "/bɜːd/", "n", "con chim", "an animal with wings and feathers", "A bird is singing outside."),
        w("horse", "/hɔːs/", "n", "con ngựa", "a large animal people can ride", "She rides a horse."),
        w("cow", "/kaʊ/", "n", "con bò", "a large farm animal that gives milk", "The cows are in the field."),
        w("chicken", "/ˈtʃɪkɪn/", "n", "con gà; thịt gà", "a farm bird, or its meat", "We have chicken for dinner."),
        w("tree", "/triː/", "n", "cái cây", "a tall plant with a trunk and branches", "There is a big tree in the garden."),
        w("flower", "/ˈflaʊə/", "n", "bông hoa", "the colourful part of a plant", "These flowers are beautiful."),
        w("grass", "/ɡrɑːs/", "n", "cỏ", "a green plant that covers the ground", "The children play on the grass."),
        w("river", "/ˈrɪvə/", "n", "con sông", "a long natural stream of water", "The river flows through the city."),
        w("mountain", "/ˈmaʊntən/", "n", "ngọn núi", "a very high hill", "We climbed the mountain."),
        w("sea", "/siː/", "n", "biển", "a large area of salt water", "I like swimming in the sea."),
        w("sky", "/skaɪ/", "n", "bầu trời", "the space above the earth", "The sky is blue today."),
      ],
    },
  },
];
