import { lesson, w, type A1TopicExpansion } from "./helpers";

export const PART_01: Record<string, A1TopicExpansion> = {
  "chao-hoi-gioi-thieu": {
    extraWord: w(
      "thank you",
      "/ˈθæŋk juː/",
      "phrase",
      "cảm ơn",
      "words used to show you are grateful",
      "Thank you for your help.",
    ),
    lessons: [
      lesson(
        "Hỏi thăm & phản hồi",
        "Cách hỏi thăm sức khỏe, trả lời tự nhiên và phản hồi khi bạn bè không khỏe.",
        "Hỏi thăm và trả lời",
        `- **how are you**: hỏi thăm sức khỏe, dùng khi gặp nhau
- **fine / well / great**: trả lời tích cực
- **okay / not bad / so-so**: trả lời trung tính
- **thanks / thank you**: cảm ơn khi được hỏi thăm
- **and you?**: hỏi lại người đối diện
- **take care**: dặn dò giữ gìn sức khỏe

Ví dụ: "Hi, Lan. **How are you?**" — "I'm **fine**, **thanks**. **And you?**"
Khi bạn chưa khỏe: "**Not bad**, but I'm a bit tired." — "**Take care!**"`,
        "fine/well/great = ổn; so-so = tạm được; hỏi lại bằng and you?",
        [
          w("how are you", "/ˌhaʊ ɑː ˈjuː/", "phrase", "bạn có khỏe không?", "a question asking about someone's health", "Hi, Lan. How are you?"),
          w("fine", "/faɪn/", "adj", "khỏe, ổn", "well or okay", "I'm fine, thanks."),
          w("okay", "/ˌəʊˈkeɪ/", "adj", "ổn, được", "fairly good or well", "I'm okay, thank you."),
          w("not bad", "/nɒt ˈbæd/", "phrase", "không tệ, cũng được", "quite good", "Not bad, thanks."),
          w("thanks", "/θæŋks/", "excl", "cảm ơn (thân mật)", "a friendly way to say thank you", "Thanks for asking."),
          w("and you", "/ən ˈjuː/", "phrase", "còn bạn thì sao?", "used to ask the same question back", "I'm fine, and you?"),
          w("well", "/wel/", "adj", "khỏe", "in good health", "I'm well, thank you."),
          w("great", "/ɡreɪt/", "adj", "rất tốt, tuyệt", "very good", "I'm great, thanks!"),
          w("so-so", "/ˈsəʊ səʊ/", "adj", "tạm được, bình thường", "not good and not bad", "So-so, thanks. I'm a bit tired."),
          w("pretty good", "/ˈprɪti ɡʊd/", "phrase", "khá tốt", "quite good", "Pretty good, thanks."),
          w("all right", "/ɔːl ˈraɪt/", "phrase", "ổn, không sao", "okay; not ill or unhappy", "I'm all right, thanks."),
          w("not really", "/nɒt ˈrɪəli/", "phrase", "không hẳn, không thật sự", "used to say no in a soft way", "Not really. I have a cold."),
          w("better", "/ˈbetə/", "adj", "khỏe hơn, tốt hơn", "less ill or improved", "I'm better now, thank you."),
          w("long time no see", "/ˌlɒŋ taɪm nəʊ ˈsiː/", "phrase", "lâu rồi không gặp", "said when you meet someone after a long time", "Long time no see! How are you?"),
          w("take care", "/teɪk ˈkeə/", "phrase", "giữ gìn sức khỏe, bảo trọng", "used to say goodbye and wish someone well", "Take care! See you soon."),
        ],
      ),
      lesson(
        "Giới thiệu người khác",
        "Giới thiệu bạn bè, hàng xóm, đồng nghiệp và bạn cùng lớp bằng mẫu câu This is...",
        "This is... — giới thiệu một người",
        `- **this is**: đây là (dùng khi giới thiệu người)
- **meet**: gặp, làm quen
- **neighbour**: hàng xóm
- **colleague**: đồng nghiệp
- **classmate**: bạn cùng lớp
- **flatmate**: người ở cùng căn hộ

Ví dụ: "Nam, **this is** my **colleague**, Hoa. She works with me."
"**Meet** my **neighbour**, Mr. Brown. He lives next door."`,
        "This is + tên/người; dùng meet khi lần đầu làm quen.",
        [
          w("this is", "/ðɪs ɪz/", "phrase", "đây là (khi giới thiệu)", "used to introduce a person", "This is my neighbour, Mrs. Lan."),
          w("meet", "/miːt/", "v", "gặp, làm quen", "to see and get to know someone", "Come and meet my colleague, Hoa."),
          w("neighbour", "/ˈneɪbə/", "n", "hàng xóm", "a person who lives near you", "Our neighbour is very friendly."),
          w("colleague", "/ˈkɒliːɡ/", "n", "đồng nghiệp", "a person you work with", "She is my colleague at the office."),
          w("classmate", "/ˈklɑːsmeɪt/", "n", "bạn cùng lớp", "a person in your class at school", "Nam is my classmate at school."),
          w("flatmate", "/ˈflætmeɪt/", "n", "người ở cùng căn hộ", "a person who shares a flat with you", "My flatmate comes from Japan."),
          w("teammate", "/ˈtiːmmeɪt/", "n", "đồng đội", "a person on the same team as you", "He is my teammate in the football team."),
          w("boss", "/bɒs/", "n", "sếp, người quản lý", "the person in charge at work", "My boss is kind and funny."),
          w("partner", "/ˈpɑːtnə/", "n", "bạn đời; đối tác", "the person you live with or work with", "This is my partner, Anna."),
          w("friend of mine", "/frend əv ˈmaɪn/", "phrase", "một người bạn của tôi", "a friend that belongs to me", "This is Hoa, a friend of mine."),
          w("know", "/nəʊ/", "v", "biết", "to have information about someone or something", "Do you know my sister, Lan?"),
          w("both", "/bəʊθ/", "det", "cả hai", "the two together", "They are both my classmates."),
          w("also", "/ˈɔːlsəʊ/", "adv", "cũng", "in addition; too", "She is also my neighbour."),
          w("too", "/tuː/", "adv", "cũng", "in addition; also", "He is my friend, too."),
          w("together", "/təˈɡeðə/", "adv", "cùng nhau", "with another person or people", "We work together in the same office."),
        ],
      ),
      lesson(
        "Giao tiếp lịch sự",
        "Những câu nói lịch sự khi nhờ vả, xin lỗi và đáp lại lời cảm ơn.",
        "Nhờ vả, xin lỗi & đáp lời",
        `- **please**: thêm vào câu nhờ vả để lịch sự
- **sorry / excuse me**: xin lỗi; excuse me dùng khi muốn thu hút chú ý
- **no problem / of course / sure**: đáp lại lời nhờ hoặc lời cảm ơn
- **you're welcome / my pleasure**: đáp lại lời cảm ơn
- **after you**: mời người khác đi trước
- **courteous**: lịch sự, nhã nhặn

Ví dụ: "**Excuse me**, could you help me, **please**?" — "**Of course**."
"**Sorry** I'm late." — "**No problem**. **After you**."`,
        "please ở cuối câu nhờ; excuse me khi muốn hỏi hoặc ngắt lời.",
        [
          w("please", "/pliːz/", "adv", "làm ơn, xin vui lòng", "used to ask politely", "Please sit down."),
          w("sorry", "/ˈsɒri/", "adj", "xin lỗi", "used to apologise", "Sorry, I'm late."),
          w("excuse me", "/ɪkˈskjuːz miː/", "phrase", "xin lỗi, cho tôi hỏi", "used to get someone's attention politely", "Excuse me, where is the bank?"),
          w("no problem", "/nəʊ ˈprɒbləm/", "phrase", "không có vấn đề gì", "used to say something is not difficult or annoying", "No problem. I can help you."),
          w("of course", "/əv ˈkɔːs/", "phrase", "tất nhiên", "used to say yes in a friendly way", "Of course you can sit here."),
          w("sure", "/ʃɔː/", "adj", "chắc chắn, được thôi", "used to say yes informally", "Sure, I can help you."),
          w("really", "/ˈrɪəli/", "adv", "thật à, thật sự", "used to show surprise or interest", "Really? That's very kind of you."),
          w("pardon", "/ˈpɑːdn/", "excl", "xin lỗi, bạn nói gì?", "used when you did not hear or understand", "Pardon? Could you say that again?"),
          w("certainly", "/ˈsɜːtnli/", "adv", "chắc chắn rồi, tất nhiên", "used to say yes politely", "Certainly, I'll open the window."),
          w("my pleasure", "/maɪ ˈpleʒə/", "phrase", "rất hân hạnh", "used as a polite reply to thank you", "My pleasure. Have a nice day."),
          w("you're welcome", "/jɔː ˈwelkəm/", "phrase", "không có gì", "used as a polite reply to thank you", "You're welcome. It was no trouble."),
          w("don't mention it", "/ˌdəʊnt ˈmenʃn ɪt/", "phrase", "đừng nhắc đến, không có gì", "used to say something was not a problem", "Don't mention it. I was happy to help."),
          w("after you", "/ˈɑːftə juː/", "phrase", "bạn đi trước đi", "used to let someone go before you", "After you, Mrs. Brown."),
          w("may I", "/meɪ aɪ/", "phrase", "tôi có thể... không?", "used to ask for permission politely", "May I ask you a question?"),
          w("courteous", "/ˈkɜːtiəs/", "adj", "lịch sự, nhã nhặn", "polite and respectful to other people", "The staff are always courteous to guests."),
        ],
      ),
    ],
  },
  "quoc-gia-quoc-tich": {
    extraWord: w(
      "continent",
      "/ˈkɒntɪnənt/",
      "n",
      "châu lục",
      "one of the large areas of land on Earth",
      "Asia is the largest continent.",
    ),
    lessons: [
      lesson(
        "Châu lục & khu vực",
        "Gọi tên châu lục, phương hướng và các vùng trên bản đồ.",
        "Châu lục và phương hướng",
        `- **continent**: châu lục
- **Asia / Europe / Africa / America**: tên các châu lục
- **region / area**: vùng, khu vực
- **east / west / north / south**: đông, tây, bắc, nam
- **island / ocean**: đảo, đại dương
- **map / world**: bản đồ, thế giới

Ví dụ: "Vietnam is in **Asia**, in the **south** of the **continent**."
"**Europe** is a **region** with many small countries."`,
        "in + châu lục; in the north/south/east/west of + nơi.",
        [
          w("Asia", "/ˈeɪʒə/", "n", "châu Á", "the largest continent, in the east", "Vietnam is in Asia."),
          w("Europe", "/ˈjʊərəp/", "n", "châu Âu", "a continent in the west of Asia", "She travels to Europe every summer."),
          w("Africa", "/ˈæfrɪkə/", "n", "châu Phi", "a large continent south of Europe", "Africa is a large continent."),
          w("America", "/əˈmerɪkə/", "n", "châu Mỹ", "the continent with North and South America", "My uncle lives in America."),
          w("region", "/ˈriːdʒən/", "n", "vùng, khu vực", "a large area of a country or the world", "This region is famous for coffee."),
          w("east", "/iːst/", "n", "phía đông", "the direction where the sun rises", "The sun rises in the east."),
          w("west", "/west/", "n", "phía tây", "the direction where the sun goes down", "The sun goes down in the west."),
          w("north", "/nɔːθ/", "n", "phía bắc", "the direction at the top of a map", "Hanoi is in the north of Vietnam."),
          w("south", "/saʊθ/", "n", "phía nam", "the direction at the bottom of a map", "Ho Chi Minh City is in the south."),
          w("area", "/ˈeəriə/", "n", "khu vực, diện tích", "a part of a place", "This area is very quiet."),
          w("island", "/ˈaɪlənd/", "n", "hòn đảo", "land with water all around it", "Phu Quoc is a beautiful island."),
          w("ocean", "/ˈəʊʃn/", "n", "đại dương", "a very large area of sea", "The Pacific is a large ocean."),
          w("map", "/mæp/", "n", "bản đồ", "a drawing of an area or country", "Look at the map of Asia."),
          w("world", "/wɜːld/", "n", "thế giới", "the Earth and all its people", "English is spoken around the world."),
          w("nation", "/ˈneɪʃn/", "n", "quốc gia, dân tộc", "a country and its people", "Vietnam is a peaceful nation."),
        ],
      ),
      lesson(
        "Ngôn ngữ & dân tộc",
        "Nói về ngôn ngữ, cách học nói và văn hoá của các dân tộc.",
        "Ngôn ngữ và văn hoá",
        `- **language**: ngôn ngữ
- **speak / pronounce**: nói, phát âm
- **native / mother tongue**: bản ngữ, tiếng mẹ đẻ
- **foreign / accent**: ngoại ngữ, giọng
- **translate / meaning**: dịch, nghĩa
- **culture / people**: văn hoá, con người/dân tộc

Ví dụ: "She **speaks** three **languages** and has a British **accent**."
"Can you **translate** this **word**? I don't know its **meaning**."`,
        "speak + ngôn ngữ (không cần the); native speaker = người bản ngữ.",
        [
          w("language", "/ˈlæŋɡwɪdʒ/", "n", "ngôn ngữ", "a system of words people use to communicate", "English is a world language."),
          w("speak", "/spiːk/", "v", "nói", "to use your voice to say words", "I speak Vietnamese and English."),
          w("native", "/ˈneɪtɪv/", "adj", "bản ngữ, bản địa", "belonging to a place from birth", "She is a native speaker of English."),
          w("foreign", "/ˈfɒrən/", "adj", "ngoại quốc, nước ngoài", "from a country that is not your own", "He learns two foreign languages."),
          w("accent", "/ˈæksent/", "n", "giọng, âm giọng", "the way you pronounce words", "She has a British accent."),
          w("translate", "/trænzˈleɪt/", "v", "dịch", "to change words from one language to another", "Can you translate this sentence?"),
          w("culture", "/ˈkʌltʃə/", "n", "văn hoá", "the way of life of a group of people", "I love Vietnamese culture."),
          w("people", "/ˈpiːpl/", "n", "người, dân tộc", "more than one person; a nation", "Vietnamese people are very friendly."),
          w("mother tongue", "/ˈmʌðə tʌŋ/", "n", "tiếng mẹ đẻ", "the first language you learn", "Vietnamese is my mother tongue."),
          w("bilingual", "/ˌbaɪˈlɪŋɡwəl/", "adj", "song ngữ", "able to speak two languages", "My cousin is bilingual in English and French."),
          w("dialect", "/ˈdaɪəlekt/", "n", "phương ngữ, tiếng địa phương", "a form of a language used in one area", "This dialect is hard to understand."),
          w("meaning", "/ˈmiːnɪŋ/", "n", "nghĩa", "what a word or sign tells you", "What is the meaning of this word?"),
          w("pronounce", "/prəˈnaʊns/", "v", "phát âm", "to say a word with sounds", "How do you pronounce your name?"),
          w("local", "/ˈləʊkl/", "adj", "địa phương", "from the area where you live", "We eat local food when we travel."),
          w("word", "/wɜːd/", "n", "từ", "a unit of language", "I learn ten new words every day."),
        ],
      ),
      lesson(
        "Giấy tờ & du lịch nước ngoài",
        "Các giấy tờ cần thiết và từ vựng khi đi ra nước ngoài.",
        "Giấy tờ khi ra nước ngoài",
        `- **passport / visa**: hộ chiếu, thị thực
- **abroad / foreigner**: ở nước ngoài, người nước ngoài
- **embassy / border / customs**: đại sứ quán, biên giới, hải quan
- **document / form / application**: giấy tờ, mẫu đơn, đơn xin
- **stamp**: dấu đóng (trong hộ chiếu)
- **luggage / suitcase / flight / trip**: hành lý, va li, chuyến bay, chuyến đi

Ví dụ: "You need a **passport** and a **visa** to travel **abroad**."
"At the **border**, an officer put a **stamp** in my passport."`,
        "go abroad (không dùng to abroad); apply for a visa = xin thị thực.",
        [
          w("passport", "/ˈpɑːspɔːt/", "n", "hộ chiếu", "a document for travelling to other countries", "Don't forget your passport when you travel abroad."),
          w("visa", "/ˈviːzə/", "n", "thị thực", "a document that lets you enter a country", "I need a visa to visit China."),
          w("abroad", "/əˈbrɔːd/", "adv", "ở nước ngoài", "in or to another country", "She works abroad for a year."),
          w("foreigner", "/ˈfɒrənə/", "n", "người nước ngoài", "a person from another country", "He is a foreigner from Australia."),
          w("embassy", "/ˈembəsi/", "n", "đại sứ quán", "the office of a country in another country", "The embassy is near the city centre."),
          w("border", "/ˈbɔːdə/", "n", "biên giới", "the line between two countries", "We crossed the border by bus."),
          w("customs", "/ˈkʌstəmz/", "n", "hải quan", "the place at a border that checks goods", "We went through customs at the border."),
          w("document", "/ˈdɒkjumənt/", "n", "giấy tờ, tài liệu", "a paper with official information", "Please sign this document."),
          w("form", "/fɔːm/", "n", "mẫu đơn", "a paper with spaces for your information", "Fill in this form, please."),
          w("stamp", "/stæmp/", "n", "dấu đóng, tem", "a mark or small paper put on a document", "The officer put a stamp in my passport."),
          w("application", "/ˌæplɪˈkeɪʃn/", "n", "đơn xin", "an official request for something", "I sent my visa application last week."),
          w("luggage", "/ˈlʌɡɪdʒ/", "n", "hành lý", "the bags you take when you travel", "My luggage is very heavy."),
          w("suitcase", "/ˈsuːtkeɪs/", "n", "va li", "a case for clothes when travelling", "She packed her suitcase last night."),
          w("flight", "/flaɪt/", "n", "chuyến bay", "a journey by plane", "Our flight leaves at seven."),
          w("trip", "/trɪp/", "n", "chuyến đi", "a short journey to a place", "We had a great trip to Japan."),
        ],
      ),
    ],
  },
  "gia-dinh-con-nguoi": {
    extraWord: w(
      "baby",
      "/ˈbeɪbi/",
      "n",
      "em bé",
      "a very young child",
      "The baby is sleeping.",
    ),
    lessons: [
      lesson(
        "Họ hàng mở rộng",
        "Từ vựng về họ hàng và các mối quan hệ trong gia đình mở rộng.",
        "Họ hàng và quan hệ gia đình",
        `- **nephew / niece**: cháu trai / cháu gái (của cô, dì, chú, bác)
- **grandson / granddaughter**: cháu trai / cháu gái (của ông bà)
- **relative**: họ hàng, người thân
- **in-law**: quan hệ thông gia (mẹ vợ/chồng, anh vợ/chồng...)
- **twin / only child**: sinh đôi, con một
- **generation / wedding**: thế hệ, đám cưới

Ví dụ: "My **niece** and **nephew** are **twins**."
"We invited all our **relatives** to the **wedding**."`,
        "nephew/niece là cháu của cô, dì, chú, bác; grandson/granddaughter là cháu của ông bà.",
        [
          w("nephew", "/ˈnefjuː/", "n", "cháu trai (của cô, dì, chú, bác)", "the son of your brother or sister", "My nephew is only five years old."),
          w("niece", "/niːs/", "n", "cháu gái (của cô, dì, chú, bác)", "the daughter of your brother or sister", "My niece loves drawing."),
          w("grandson", "/ˈɡrænsʌn/", "n", "cháu trai (của ông bà)", "the son of your child", "Her grandson is at university."),
          w("granddaughter", "/ˈɡrændɔːtə/", "n", "cháu gái (của ông bà)", "the daughter of your child", "His granddaughter is a baby."),
          w("relative", "/ˈrelətɪv/", "n", "họ hàng, người thân", "a member of your family", "All our relatives came to dinner."),
          w("in-law", "/ˈɪn lɔː/", "n", "quan hệ thông gia", "a family member by marriage", "My mother-in-law is a kind woman."),
          w("twin", "/twɪn/", "n", "sinh đôi", "one of two children born at the same time", "My twin brother looks just like me."),
          w("only child", "/ˌəʊnli ˈtʃaɪld/", "n", "con một", "a child with no brothers or sisters", "I am an only child."),
          w("stepmother", "/ˈstepmʌðə/", "n", "mẹ kế", "the woman your father marries after your mother", "My stepmother has two children."),
          w("stepfather", "/ˈstepfɑːðə/", "n", "bố dượng", "the man your mother marries after your father", "Her stepfather works in a hospital."),
          w("half-sister", "/ˈhɑːf sɪstə/", "n", "chị/em gái cùng cha hoặc mẹ", "a sister with only one same parent", "My half-sister lives in Da Nang."),
          w("generation", "/ˌdʒenəˈreɪʃn/", "n", "thế hệ", "all the people born at about the same time", "Three generations live in this house."),
          w("married", "/ˈmærid/", "adj", "đã kết hôn", "having a husband or wife", "My sister is married to a doctor."),
          w("wedding", "/ˈwedɪŋ/", "n", "đám cưới", "a ceremony where two people get married", "We went to my cousin's wedding."),
          w("adopt", "/əˈdɒpt/", "v", "nhận nuôi", "to take a child into your family legally", "They want to adopt a child."),
        ],
      ),
      lesson(
        "Sinh hoạt & sum họp gia đình",
        "Các hoạt động quen thuộc khi các thành viên sống và sum họp cùng nhau.",
        "Sinh hoạt trong gia đình",
        `- **babysit**: trông trẻ
- **look after**: chăm sóc
- **bring up**: nuôi dạy
- **grow up**: lớn lên
- **housework**: việc nhà
- **look alike**: giống nhau

Ví dụ: "I **look after** my little sister and help with the **housework**."
"The twins **look alike** and **grow up** together."`,
        "look after = chăm sóc; bring up = nuôi dạy; grow up = lớn lên; look alike = giống nhau.",
        [
          w("babysit", "/ˈbeɪbisɪt/", "v", "trông trẻ", "to take care of a child for a short time", "I babysit my little cousin on Friday."),
          w("look after", "/lʊk ˈɑːftə/", "phr v", "chăm sóc", "to take care of someone", "I look after my little sister."),
          w("bring up", "/brɪŋ ʌp/", "phr v", "nuôi dạy", "to care for a child until they grow up", "They bring up three children."),
          w("grow up", "/ɡrəʊ ʌp/", "phr v", "lớn lên", "to become an adult", "Children grow up very quickly."),
          w("move house", "/muːv haʊs/", "phrase", "chuyển nhà", "to go and live in a new home", "We move house next month."),
          w("stay at home", "/steɪ ət həʊm/", "phrase", "ở nhà", "to remain in your house", "I stay at home on rainy days."),
          w("housework", "/ˈhaʊswɜːk/", "n", "việc nhà", "the work of cleaning and tidying a house", "We share the housework."),
          w("support", "/səˈpɔːt/", "v", "hỗ trợ", "to help someone", "We support each other."),
          w("argue", "/ˈɑːɡjuː/", "v", "tranh cãi", "to speak angrily with someone", "Brothers sometimes argue."),
          w("trust", "/trʌst/", "v", "tin tưởng", "to believe that someone is good", "I trust my parents."),
          w("miss", "/mɪs/", "v", "nhớ", "to feel sad because someone is not there", "I miss my family when I am away."),
          w("hug", "/hʌɡ/", "v", "ôm", "to put your arms around someone", "She gives her mother a hug."),
          w("kiss", "/kɪs/", "v", "hôn", "to touch someone with your lips", "The mother gives her child a kiss."),
          w("promise", "/ˈprɒmɪs/", "v", "hứa", "to say you will certainly do something", "I promise to call you."),
          w("look alike", "/lʊk əˈlaɪk/", "phrase", "giống nhau", "to have a similar appearance", "The twins look alike."),
        ],
      ),
      lesson(
        "Vai trò & quan hệ gia đình",
        "Từ vựng về vai trò, cách xưng hô và những nét riêng của các thành viên.",
        "Vai trò và quan hệ",
        `- **parent**: bố hoặc mẹ
- **husband / wife**: chồng / vợ
- **eldest**: lớn tuổi nhất
- **couple**: cặp vợ chồng
- **surname / nickname**: họ / biệt danh

Ví dụ: "My **eldest** sister is married, and she and her **husband** have a baby."
"Everyone in the **household** has the same **surname**."`,
        "parent = bố hoặc mẹ; couple = cặp vợ chồng; household = hộ gia đình.",
        [
          w("parent", "/ˈpeərənt/", "n", "bố hoặc mẹ", "a mother or father", "Every parent loves their children."),
          w("husband", "/ˈhʌzbənd/", "n", "chồng", "the man a woman is married to", "Her husband cooks very well."),
          w("wife", "/waɪf/", "n", "vợ", "the woman a man is married to", "His wife is a teacher."),
          w("eldest", "/ˈeldɪst/", "adj", "lớn tuổi nhất", "the oldest of a group", "My eldest sister lives in Hanoi."),
          w("marriage", "/ˈmærɪdʒ/", "n", "hôn nhân", "the relationship between a married couple", "They have a happy marriage."),
          w("couple", "/ˈkʌpl/", "n", "cặp vợ chồng", "two people who are married or partners", "The couple lives near us."),
          w("grown-up", "/ˈɡrəʊn ʌp/", "n", "người lớn", "an adult person", "The children sat with the grown-ups."),
          w("breadwinner", "/ˈbredwɪnə/", "n", "người trụ cột kiếm tiền", "the person who earns money for a family", "My father is the breadwinner."),
          w("homemaker", "/ˈhəʊmmeɪkə/", "n", "người chăm lo gia đình", "a person who manages the home", "My mother is a homemaker."),
          w("household", "/ˈhaʊshəʊld/", "n", "hộ gia đình", "all the people living in one house", "Our household has five people."),
          w("guardian", "/ˈɡɑːdiən/", "n", "người giám hộ", "a person who legally cares for a child", "Her aunt is her guardian."),
          w("nanny", "/ˈnæni/", "n", "bảo mẫu", "a person paid to care for children", "The nanny takes the children to school."),
          w("family tree", "/ˌfæməli ˈtriː/", "n", "cây gia phả", "a diagram of family relationships", "We drew our family tree."),
          w("surname", "/ˈsɜːneɪm/", "n", "họ", "your family name", "My surname is Nguyen."),
          w("nickname", "/ˈnɪkneɪm/", "n", "biệt danh", "a familiar name for a person", "My nickname at school is Bee."),
        ],
      ),
    ],
  },
};
