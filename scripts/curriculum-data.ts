export type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface SeedChoice {
  label: string;
  correct?: boolean;
}

export interface SeedQuestion {
  prompt: string;
  explanation?: string;
  choices: SeedChoice[];
}

export interface SeedSection {
  title: string;
  body: string;
  remember?: string;
}

export interface SeedWord {
  word: string;
  ipa?: string;
  wordForm?: string;
  meaningVi: string;
  meaningEn?: string;
  example?: string;
}

export interface SeedGrammarLesson {
  title: string;
  summary: string;
  sections: SeedSection[];
  questions: SeedQuestion[];
}

export interface SeedVocabTopic {
  name: string;
  slug: string;
  icon: string;
  description: string;
  lesson: {
    title: string;
    summary: string;
    sections: SeedSection[];
    words: SeedWord[];
  };
}

export interface SeedLevel {
  code: LevelCode;
  name: string;
  tagline: string;
  description: string;
  grammar: SeedGrammarLesson[];
  vocab: SeedVocabTopic[];
}

function q(
  prompt: string,
  correct: string,
  wrong: [string, string, string],
  explanation?: string,
): SeedQuestion {
  return {
    prompt,
    explanation,
    choices: [
      { label: correct, correct: true },
      { label: wrong[0] },
      { label: wrong[1] },
      { label: wrong[2] },
    ],
  };
}

export const CURRICULUM: SeedLevel[] = [
  {
    code: "A1",
    name: "Khởi đầu",
    tagline: "Nền tảng đầu tiên",
    description:
      "Làm quen với cấu trúc câu cơ bản, đại từ, mạo từ và những mẫu câu dùng hằng ngày.",
    grammar: [
      {
        title: "To be & đại từ nhân xưng",
        summary: "Nắm vững am / is / are và cách dùng đại từ I, you, he, she, it, we, they.",
        sections: [
          {
            title: "Động từ to be ở hiện tại",
            body:
              "Động từ **to be** có ba dạng ở thì hiện tại:\n- I **am** (I'm)\n- He / She / It **is** (He's, She's, It's)\n- You / We / They **are** (You're, They're)\n\nDùng to be để giới thiệu bản thân, mô tả trạng thái, nghề nghiệp hoặc quốc tịch.\n\nVí dụ:\n- I **am** a student. (Tôi là học sinh.)\n- She **is** from Vietnam. (Cô ấy đến từ Việt Nam.)\n- They **are** very friendly. (Họ rất thân thiện.)",
            remember: "I đi với am; he / she / it đi với is; you / we / they đi với are.",
          },
          {
            title: "Phủ định và câu hỏi",
            body:
              "Thêm **not** sau to be để tạo câu phủ định:\n- I **am not** tired.\n- He **is not** (isn't) at home.\n- They **are not** (aren't) ready.\n\nĐảo to be lên đầu câu để đặt câu hỏi:\n- **Are** you Vietnamese? — Yes, I am.\n- **Is** she a teacher? — No, she isn't.\n\nLỗi thường gặp: bỏ to be khi nói về tuổi hoặc nghề nghiệp.\n- Sai: I 20 years old.\n- Đúng: I **am** 20 years old.",
            remember: "Câu hỏi Yes/No với to be: Be + chủ ngữ + ...?",
          },
        ],
        questions: [
          q("Chọn dạng đúng: My sister ___ a doctor.", "is", ["am", "are", "be"], "Chủ ngữ số ít she / he / it đi với is."),
          q("Câu nào đúng ngữ pháp?", "I am a student.", ["I is a student.", "I are a student.", "I be a student."], "I luôn đi với am."),
          q("Điền vào chỗ trống: They ___ not from Hanoi.", "are", ["is", "am", "be"], "They là số nhiều nên dùng are."),
          q("Câu hỏi đúng để hỏi “Bạn có phải người Việt không?” là gì?", "Are you Vietnamese?", ["You are Vietnamese?", "Do you be Vietnamese?", "Is you Vietnamese?"], "Đảo are lên trước chủ ngữ you."),
        ],
      },
      {
        title: "Mạo từ a / an / the",
        summary: "Phân biệt a, an và the trong những ngữ cảnh giao tiếp quen thuộc.",
        sections: [
          {
            title: "A / An — danh từ không xác định",
            body:
              "Dùng **a / an** trước danh từ đếm được số ít khi người nghe chưa biết cụ thể đó là ai / vật gì.\n- **a** đứng trước âm phụ âm: a book, a teacher, a university (âm /juː/).\n- **an** đứng trước âm nguyên âm: an apple, an hour (âm /aʊ/ câm h).\n\nVí dụ:\n- I need **a** pen. (Tôi cần một cây bút — bất kỳ cây nào.)\n- She is **an** engineer.",
            remember: "Chọn a / an theo ÂM đọc đầu tiên, không phải theo chữ cái.",
          },
          {
            title: "The — danh từ xác định",
            body:
              "Dùng **the** khi cả người nói và người nghe đều biết rõ đối tượng:\n- Đã nhắc đến trước đó: I bought a book. **The** book is interesting.\n- Duy nhất: **the** sun, **the** moon, **the** internet.\n- So sánh nhất: **the** best student.\n\nKhông dùng mạo từ với danh từ số nhiều hoặc không đếm được khi nói chung:\n- **Books** are expensive. (Sách nói chung)\n- **Water** is important.",
            remember: "Lần đầu nhắc đến dùng a/an; lần sau nhắc lại dùng the.",
          },
        ],
        questions: [
          q("Chọn mạo từ đúng: I saw ___ elephant at the zoo.", "an", ["a", "the", "no article"], "Elephant bắt đầu bằng nguyên âm /e/ nên dùng an."),
          q("Điền: She is ___ honest person.", "an", ["a", "the", "no article"], "Honest có h câm, đọc bắt đầu bằng nguyên âm /ɒ/."),
          q("Câu nào đúng?", "The sun is hot.", ["Sun is hot.", "A sun is hot.", "An sun is hot."], "Sun là vật duy nhất nên dùng the."),
          q("Chọn câu đúng khi nói chung về sách:", "Books are expensive.", ["The books are expensive.", "A books are expensive.", "An books are expensive."], "Danh từ số nhiều nói chung không dùng mạo từ."),
        ],
      },
      {
        title: "Thì hiện tại đơn",
        summary: "Diễn tả thói quen, sự thật hiển nhiên và lịch trình cố định.",
        sections: [
          {
            title: "Cấu trúc",
            body:
              "Khẳng định: S + V (thêm -s / -es với he, she, it)\n- I **work** in Hanoi.\n- She **works** in a hospital.\n\nPhủ định: S + do/does + not + V\n- I **do not (don't) like** coffee.\n- He **does not (doesn't) play** tennis.\n\nNghi vấn: Do/Does + S + V?\n- **Do** you speak English?\n- **Does** she live here?",
            remember: "Ngôi thứ ba số ít: thêm -s/-es ở khẳng định, dùng doesn't ở phủ định.",
          },
          {
            title: "Cách dùng và trạng từ tần suất",
            body:
              "Dùng hiện tại đơn cho:\n- Thói quen: I **get up** at 6 a.m.\n- Sự thật: Water **boils** at 100°C.\n- Lịch trình: The train **leaves** at 8 p.m.\n\nTrạng từ tần suất: always, usually, often, sometimes, rarely, never. Chúng thường đứng trước động từ thường và sau to be:\n- She **usually** walks to school.\n- He is **never** late.",
            remember: "Hiện tại đơn = thói quen / sự thật, không phải hành động đang diễn ra.",
          },
        ],
        questions: [
          q("Chọn dạng đúng: She ___ to school every day.", "goes", ["go", "going", "gone"], "She là ngôi thứ ba số ít nên động từ thêm -es."),
          q("Câu phủ định đúng là:", "He doesn't like fish.", ["He don't like fish.", "He not like fish.", "He doesn't likes fish."], "Sau doesn't dùng động từ nguyên mẫu."),
          q("Điền: ___ they live in Da Nang?", "Do", ["Does", "Are", "Is"], "Chủ ngữ they dùng trợ động từ do."),
          q("Trạng từ nào phù hợp: I ___ drink coffee in the morning.", "usually", ["yesterday", "tomorrow", "last week"], "Usually là trạng từ tần suất, phù hợp với thì hiện tại đơn."),
        ],
      },
      {
        title: "Giới từ chỉ nơi chốn & thời gian",
        summary: "Dùng in / on / at đúng trong các cụm chỉ vị trí và thời điểm.",
        sections: [
          {
            title: "In / On / At — nơi chốn",
            body:
              "**In** — bên trong một không gian hoặc khu vực:\n- in the room, in Hanoi, in Vietnam\n\n**On** — trên bề mặt hoặc vị trí tiếp xúc:\n- on the table, on the wall, on the second floor\n\n**At** — một điểm cụ thể:\n- at the door, at the bus stop, at home, at school\n\nVí dụ: The keys are **on** the table. My father is **at** work.",
            remember: "In = không gian, on = bề mặt, at = điểm cụ thể.",
          },
          {
            title: "In / On / At — thời gian",
            body:
              "**In** — khoảng thời gian dài: in the morning, in May, in 2026, in winter.\n**On** — ngày cụ thể: on Monday, on 21 October, on my birthday.\n**At** — giờ cụ thể: at 7 o'clock, at noon, at midnight.\n\nLưu ý: at night (không dùng in the night), at the weekend (Anh) / on the weekend (Mỹ).",
            remember: "In + tháng/năm/mùa, on + ngày, at + giờ.",
          },
        ],
        questions: [
          q("Điền: I was born ___ 2005.", "in", ["on", "at", "by"], "Năm dùng giới từ in."),
          q("Điền: The meeting is ___ Monday.", "on", ["in", "at", "by"], "Ngày cụ thể dùng on."),
          q("Điền: She usually wakes up ___ 6 o'clock.", "at", ["in", "on", "by"], "Giờ cụ thể dùng at."),
          q("Chọn cụm đúng:", "at home", ["in home", "on home", "by home"], "Cụm cố định là at home."),
        ],
      },
    ],
    vocab: [
      {
        name: "Chào hỏi & giới thiệu",
        slug: "chao-hoi-gioi-thieu",
        icon: "waving_hand",
        description: "Những từ và mẫu câu đầu tiên để bắt đầu một cuộc trò chuyện.",
        lesson: {
          title: "Chào hỏi & giới thiệu bản thân",
          summary: "8 từ vựng thiết yếu cho lần gặp gỡ đầu tiên.",
          sections: [
            {
              title: "Bắt đầu cuộc trò chuyện",
              body:
                "Khi gặp ai đó, bạn có thể dùng:\n- **Hello / Hi** — xin chào\n- **Good morning / afternoon / evening** — chào theo buổi\n- **Nice to meet you** — rất vui được gặp bạn\n\nĐể giới thiệu tên: **My name is ...** hoặc **I'm ...**\nĐể hỏi tên: **What's your name?**",
              remember: "Nice to meet you — dùng lần đầu gặp; Nice to see you — dùng khi gặp lại.",
            },
          ],
          words: [
            { word: "hello", ipa: "/həˈləʊ/", wordForm: "excl", meaningVi: "xin chào", meaningEn: "used when meeting someone", example: "Hello, my name is Lan." },
            { word: "good morning", ipa: "/ɡʊd ˈmɔːnɪŋ/", wordForm: "phrase", meaningVi: "chào buổi sáng", example: "Good morning, everyone!" },
            { word: "name", ipa: "/neɪm/", wordForm: "n", meaningVi: "tên", meaningEn: "the word someone is called", example: "What is your name?" },
            { word: "friend", ipa: "/frend/", wordForm: "n", meaningVi: "bạn bè", meaningEn: "a person you know and like", example: "She is my best friend." },
            { word: "teacher", ipa: "/ˈtiːtʃə/", wordForm: "n", meaningVi: "giáo viên", example: "Our teacher is very kind." },
            { word: "student", ipa: "/ˈstjuːdənt/", wordForm: "n", meaningVi: "học sinh, sinh viên", example: "I am a student." },
            { word: "nice to meet you", ipa: "/naɪs tə miːt juː/", wordForm: "phrase", meaningVi: "rất vui được gặp bạn", example: "Nice to meet you, Mr. Brown." },
            { word: "goodbye", ipa: "/ɡʊdˈbaɪ/", wordForm: "excl", meaningVi: "tạm biệt", example: "Goodbye, see you tomorrow." },
          ],
        },
      },
      {
        name: "Gia đình & nhà cửa",
        slug: "gia-dinh-nha-cua",
        icon: "home",
        description: "Từ vựng về các thành viên trong gia đình và không gian sống.",
        lesson: {
          title: "Gia đình & các phòng trong nhà",
          summary: "8 từ vựng mô tả gia đình và ngôi nhà của bạn.",
          sections: [
            {
              title: "Mô tả gia đình",
              body:
                "Dùng **have / has** để nói về thành viên gia đình:\n- I **have** two brothers.\n- She **has** one sister.\n\nDùng **there is / there are** để mô tả ngôi nhà:\n- **There is** a kitchen.\n- **There are** three bedrooms.",
              remember: "There is + số ít; There are + số nhiều.",
            },
          ],
          words: [
            { word: "family", ipa: "/ˈfæməli/", wordForm: "n", meaningVi: "gia đình", example: "My family has four people." },
            { word: "mother", ipa: "/ˈmʌðə/", wordForm: "n", meaningVi: "mẹ", example: "My mother is a nurse." },
            { word: "father", ipa: "/ˈfɑːðə/", wordForm: "n", meaningVi: "bố", example: "My father works in a factory." },
            { word: "sister", ipa: "/ˈsɪstə/", wordForm: "n", meaningVi: "chị/em gái", example: "My sister is ten years old." },
            { word: "brother", ipa: "/ˈbrʌðə/", wordForm: "n", meaningVi: "anh/em trai", example: "I have one brother." },
            { word: "house", ipa: "/haʊs/", wordForm: "n", meaningVi: "ngôi nhà", example: "They live in a big house." },
            { word: "bedroom", ipa: "/ˈbedruːm/", wordForm: "n", meaningVi: "phòng ngủ", example: "There are two bedrooms upstairs." },
            { word: "kitchen", ipa: "/ˈkɪtʃɪn/", wordForm: "n", meaningVi: "nhà bếp", example: "My mother is cooking in the kitchen." },
          ],
        },
      },
    ],
  },
  {
    code: "A2",
    name: "Sơ cấp",
    tagline: "Giao tiếp tự tin hơn",
    description:
      "Kể lại việc đã xảy ra, so sánh và nói về kế hoạch tương lai trong các tình huống quen thuộc.",
    grammar: [
      {
        title: "Thì quá khứ đơn",
        summary: "Kể lại sự việc đã xảy ra và hoàn thành trong quá khứ.",
        sections: [
          {
            title: "Cấu trúc và động từ bất quy tắc",
            body:
              "Khẳng định: S + V-ed / V2\n- I **visited** my grandparents yesterday.\n- She **went** to the market.\n\nPhủ định: S + did not (didn't) + V\n- I **didn't see** him.\n\nNghi vấn: Did + S + V?\n- **Did** you **finish** your homework?\n\nMột số động từ bất quy tắc thường gặp: go → went, see → saw, have → had, buy → bought, eat → ate.",
            remember: "Sau didn't và Did luôn dùng động từ nguyên mẫu.",
          },
          {
            title: "Dấu hiệu nhận biết",
            body:
              "Quá khứ đơn thường đi với:\n- yesterday, last night / week / year\n- two days ago, in 2010, when I was young\n\nVí dụ:\n- We **moved** here **in 2018**.\n- **When** I was a child, I **lived** in the countryside.",
            remember: "Có mốc thời gian đã kết thúc → quá khứ đơn.",
          },
        ],
        questions: [
          q("Chọn dạng đúng: I ___ to the cinema last night.", "went", ["go", "goes", "going"], "Last night là quá khứ, go chuyển thành went."),
          q("Câu phủ định đúng:", "She didn't come to the party.", ["She didn't came to the party.", "She not came to the party.", "She don't come to the party."], "Sau didn't dùng come (nguyên mẫu)."),
          q("Điền: ___ you see the match yesterday?", "Did", ["Do", "Are", "Were"], "Câu hỏi quá khứ dùng Did + S + V."),
          q("Từ nào là dấu hiệu của thì quá khứ đơn?", "last week", ["tomorrow", "every day", "now"], "Last week chỉ thời gian đã kết thúc."),
        ],
      },
      {
        title: "So sánh hơn & so sánh nhất",
        summary: "So sánh hai hay nhiều đối tượng bằng tính từ ngắn và dài.",
        sections: [
          {
            title: "So sánh hơn",
            body:
              "Tính từ ngắn (1 âm tiết): thêm **-er** + than\n- tall → **taller than**\n- big → **bigger than** (gấp đôi phụ âm)\n\nTính từ dài (2 âm tiết trở lên): **more** + adjective + than\n- expensive → **more expensive than**\n- careful → **more careful than**\n\nBất quy tắc: good → better, bad → worse, far → farther / further.",
            remember: "So sánh hơn luôn đi với than.",
          },
          {
            title: "So sánh nhất",
            body:
              "Tính từ ngắn: **the** + adj + **-est**\n- the tallest, the biggest, the happiest\n\nTính từ dài: **the most** + adjective\n- the most expensive, the most beautiful\n\nBất quy tắc: good → the best, bad → the worst, far → the farthest.\n\nVí dụ: This is **the most interesting** book I have ever read.",
            remember: "So sánh nhất luôn có the trước tính từ.",
          },
        ],
        questions: [
          q("Chọn dạng đúng: My house is ___ than yours.", "bigger", ["big", "biggest", "more big"], "Big là tính từ ngắn, gấp đôi phụ âm rồi thêm -er."),
          q("Điền: This is ___ most beautiful beach in Vietnam.", "the", ["a", "an", "no article"], "So sánh nhất dùng the."),
          q("Chọn câu đúng:", "She is more careful than her brother.", ["She is carefuller than her brother.", "She is most careful than her brother.", "She is more careful that her brother."], "Careful là tính từ dài nên dùng more ... than."),
          q("Dạng so sánh nhất của “good” là:", "the best", ["the goodest", "the most good", "better"], "Good có dạng bất quy tắc best."),
        ],
      },
      {
        title: "Tương lai: will vs be going to",
        summary: "Phân biệt quyết định tức thời, dự đoán và kế hoạch đã định.",
        sections: [
          {
            title: "Will",
            body:
              "Dùng **will + V** cho:\n- Quyết định tức thời: It's cold. I **will close** the window.\n- Dự đoán dựa trên ý kiến: I think it **will rain** tomorrow.\n- Lời hứa, đề nghị: I **will help** you.\n\nPhủ định: won't. Nghi vấn: Will + S + V?",
            remember: "Will = quyết định ngay lúc nói, dự đoán chủ quan.",
          },
          {
            title: "Be going to",
            body:
              "Dùng **am/is/are going to + V** cho:\n- Kế hoạch đã định trước: I **am going to visit** my aunt this weekend.\n- Dự đoán có bằng chứng: Look at those clouds! It **is going to rain**.\n\nSo sánh:\n- I'm going to buy a car. (đã quyết định)\n- I'll buy a car. (quyết định ngay lúc nói)",
            remember: "Be going to = kế hoạch có trước hoặc dự đoán có căn cứ.",
          },
        ],
        questions: [
          q("Chọn câu phù hợp: Bạn quyết định ngay lúc nói sẽ trả lời điện thoại.", "I'll answer it.", ["I'm going to answer it.", "I answer it.", "I answered it."], "Quyết định tức thời dùng will."),
          q("Điền: Look at the sky! It ___ snow.", "is going to", ["will", "is", "does"], "Có bằng chứng trước mắt nên dùng be going to."),
          q("Câu nào diễn tả kế hoạch đã định?", "We are going to move to Hanoi next month.", ["We will move to Hanoi next month.", "We move to Hanoi next month.", "We moved to Hanoi next month."], "Kế hoạch có trước dùng be going to."),
          q("Dạng phủ định của will là:", "won't", ["willn't", "don't will", "not will"], "Will + not = won't."),
        ],
      },
      {
        title: "Danh từ đếm được & không đếm được",
        summary: "Dùng some, any, much, many, a few, a little chính xác.",
        sections: [
          {
            title: "Đếm được và không đếm được",
            body:
              "**Đếm được** có dạng số ít và số nhiều: a book → two books, an apple → three apples.\n\n**Không đếm được** không có dạng số nhiều và không dùng a/an: water, rice, money, information, advice, furniture.\n\nLỗi thường gặp:\n- Sai: I need some informations.\n- Đúng: I need some **information**.",
            remember: "Information, advice, furniture, news là danh từ không đếm được.",
          },
          {
            title: "Lượng từ",
            body:
              "**Some** — dùng trong câu khẳng định và lời mời: some water, some apples.\n**Any** — dùng trong câu phủ định và nghi vấn: I don't have any money. Do you have any questions?\n\n**Many** + danh từ đếm được số nhiều: many books.\n**Much** + danh từ không đếm được: much time.\n\n**A few** + đếm được: a few friends.\n**A little** + không đếm được: a little sugar.",
            remember: "Many / a few đi với đếm được; much / a little đi với không đếm được.",
          },
        ],
        questions: [
          q("Chọn từ đúng: How ___ money do you need?", "much", ["many", "few", "a few"], "Money là danh từ không đếm được nên dùng much."),
          q("Điền: There aren't ___ chairs in the room.", "any", ["some", "much", "a little"], "Câu phủ định dùng any."),
          q("Chọn câu đúng:", "She gave me some advice.", ["She gave me some advices.", "She gave me an advice.", "She gave me many advice."], "Advice là danh từ không đếm được."),
          q("Chọn cụm đúng:", "a few books", ["a few book", "a little books", "much books"], "A few đi với danh từ đếm được số nhiều."),
        ],
      },
    ],
    vocab: [
      {
        name: "Du lịch & phương tiện",
        slug: "du-lich-phuong-tien",
        icon: "flight",
        description: "Từ vựng cần thiết cho một chuyến đi trong và ngoài nước.",
        lesson: {
          title: "Một chuyến đi trọn vẹn",
          summary: "8 từ vựng về sân bay, khách sạn và phương tiện di chuyển.",
          sections: [
            {
              title: "Ở sân bay",
              body:
                "Các bước cơ bản:\n1. Check in at the **check-in desk**.\n2. Show your **passport** and **ticket**.\n3. Go through security and wait at the **gate**.\n\nHành lý: **luggage** (không đếm được) — How much luggage do you have?",
              remember: "Luggage không có dạng số nhiều; dùng “a piece of luggage”.",
            },
          ],
          words: [
            { word: "airport", ipa: "/ˈeəpɔːt/", wordForm: "n", meaningVi: "sân bay", example: "We arrived at the airport early." },
            { word: "ticket", ipa: "/ˈtɪkɪt/", wordForm: "n", meaningVi: "vé", example: "I bought a return ticket." },
            { word: "luggage", ipa: "/ˈlʌɡɪdʒ/", wordForm: "n", meaningVi: "hành lý", example: "Your luggage is too heavy." },
            { word: "passport", ipa: "/ˈpɑːspɔːt/", wordForm: "n", meaningVi: "hộ chiếu", example: "Don't forget your passport." },
            { word: "hotel", ipa: "/həʊˈtel/", wordForm: "n", meaningVi: "khách sạn", example: "The hotel is near the beach." },
            { word: "journey", ipa: "/ˈdʒɜːni/", wordForm: "n", meaningVi: "chuyến đi, hành trình", example: "The journey took five hours." },
            { word: "train", ipa: "/treɪn/", wordForm: "n", meaningVi: "tàu hoả", example: "We travelled by train." },
            { word: "book", ipa: "/bʊk/", wordForm: "v", meaningVi: "đặt (vé, phòng)", example: "I booked a room online." },
          ],
        },
      },
      {
        name: "Sức khoẻ & cơ thể",
        slug: "suc-khoe-co-the",
        icon: "health_and_safety",
        description: "Mô tả triệu chứng và trao đổi với bác sĩ.",
        lesson: {
          title: "Khi bạn cảm thấy không khoẻ",
          summary: "8 từ vựng để nói về triệu chứng và chăm sóc sức khoẻ.",
          sections: [
            {
              title: "Mô tả triệu chứng",
              body:
                "Dùng **have** + triệu chứng:\n- I **have a headache**.\n- She **has a sore throat**.\n\nDùng **feel** + tính từ:\n- I **feel tired**.\n- He **feels sick**.\n\nLời khuyên với should:\n- You **should see** a doctor.\n- You **shouldn't drink** cold water.",
              remember: "A headache, a stomachache, a sore throat — dùng a/an.",
            },
          ],
          words: [
            { word: "headache", ipa: "/ˈhedeɪk/", wordForm: "n", meaningVi: "đau đầu", example: "I have a bad headache." },
            { word: "medicine", ipa: "/ˈmedsn/", wordForm: "n", meaningVi: "thuốc", example: "Take this medicine after meals." },
            { word: "doctor", ipa: "/ˈdɒktə/", wordForm: "n", meaningVi: "bác sĩ", example: "You should see a doctor." },
            { word: "hospital", ipa: "/ˈhɒspɪtl/", wordForm: "n", meaningVi: "bệnh viện", example: "She works at a hospital." },
            { word: "healthy", ipa: "/ˈhelθi/", wordForm: "adj", meaningVi: "khoẻ mạnh", example: "Eating vegetables keeps you healthy." },
            { word: "exercise", ipa: "/ˈeksəsaɪz/", wordForm: "n/v", meaningVi: "tập thể dục", example: "I exercise every morning." },
            { word: "sleep", ipa: "/sliːp/", wordForm: "v/n", meaningVi: "ngủ, giấc ngủ", example: "You need to sleep more." },
            { word: "pain", ipa: "/peɪn/", wordForm: "n", meaningVi: "cơn đau", example: "I feel a sharp pain in my back." },
          ],
        },
      },
    ],
  },
  {
    code: "B1",
    name: "Trung cấp",
    tagline: "Xử lý tình huống đa dạng",
    description:
      "Diễn đạt trải nghiệm, giả định và giải thích ý kiến — nền tảng để bước vào luyện thi IELTS.",
    grammar: [
      {
        title: "Thì hiện tại hoàn thành",
        summary: "Nói về trải nghiệm và hành động kéo dài đến hiện tại.",
        sections: [
          {
            title: "Cấu trúc",
            body:
              "Khẳng định: S + have/has + V3/ed\n- I **have visited** Hue twice.\n- She **has finished** her report.\n\nPhủ định: haven't / hasn't + V3\nNghi vấn: Have/Has + S + V3?\n- **Have** you ever **eaten** sushi?",
            remember: "Have/has + quá khứ phân từ (V3).",
          },
          {
            title: "Cách dùng & since / for",
            body:
              "Dùng cho:\n- Trải nghiệm: I **have been** to Japan.\n- Hành động bắt đầu trong quá khứ và còn tiếp diễn: I **have lived** here **for** five years.\n- Kết quả hiện tại: She **has lost** her keys. (nên giờ không vào được nhà)\n\n**Since** + mốc thời gian: since 2020.\n**For** + khoảng thời gian: for three months.\n\nPhân biệt: I **saw** him yesterday (quá khứ đơn) ≠ I **have seen** him today (hiện tại hoàn thành).",
            remember: "Since + mốc, for + khoảng; không dùng hiện tại hoàn thành với thời gian đã kết thúc.",
          },
        ],
        questions: [
          q("Chọn dạng đúng: She ___ in Hanoi since 2019.", "has lived", ["lived", "lives", "is living"], "Since 2019 → hiện tại hoàn thành."),
          q("Điền: I have studied English ___ three years.", "for", ["since", "in", "ago"], "For + khoảng thời gian."),
          q("Câu nào đúng?", "I have never been to Paris.", ["I never went to Paris ever.", "I have never go to Paris.", "I never have went to Paris."], "Never đứng sau have/has và trước V3."),
          q("Chọn câu đúng với “yesterday”:", "I saw her yesterday.", ["I have seen her yesterday.", "I have saw her yesterday.", "I seen her yesterday."], "Yesterday là thời gian đã kết thúc nên dùng quá khứ đơn."),
        ],
      },
      {
        title: "Động từ khuyết thiếu",
        summary: "Dùng can, could, should, must, have to để diễn đạt khả năng và nghĩa vụ.",
        sections: [
          {
            title: "Khả năng và lời khuyên",
            body:
              "**Can / could** — khả năng: She **can swim**. I **could** read at the age of four.\n**Should / shouldn't** — lời khuyên: You **should** revise tonight. You **shouldn't** stay up late.\n\nSau động từ khuyết thiếu luôn là động từ nguyên mẫu, không thêm -s/-ed/to:\n- Sai: She can swims.\n- Đúng: She **can swim**.",
            remember: "Modal + V (nguyên mẫu, không to).",
          },
          {
            title: "Nghĩa vụ và sự cần thiết",
            body:
              "**Must** — nghĩa vụ mạnh, do người nói tự thấy: I **must** finish this today.\n**Have to** — nghĩa vụ do hoàn cảnh/quy định: I **have to** wear a uniform at work.\n**Mustn't** — cấm: You **mustn't** smoke here.\n**Don't have to** — không cần thiết: You **don't have to** come early.\n\nLưu ý: mustn't ≠ don't have to.",
            remember: "Mustn't = bị cấm; don't have to = không bắt buộc.",
          },
        ],
        questions: [
          q("Chọn câu đúng:", "You should take a rest.", ["You should to take a rest.", "You should taking a rest.", "You should takes a rest."], "Sau should là động từ nguyên mẫu."),
          q("Điền: Visitors ___ smoke in the building.", "mustn't", ["don't have to", "shouldn't to", "can't to"], "Cấm hút thuốc → mustn't."),
          q("Câu nào diễn tả nghĩa vụ do quy định?", "We have to submit the form by Friday.", ["We must submit the form by Friday because I want to.", "We can submit the form by Friday.", "We should submit the form by Friday."], "Have to diễn tả nghĩa vụ khách quan."),
          q("Chọn câu đúng:", "She can speak three languages.", ["She can speaks three languages.", "She can to speak three languages.", "She cans speak three languages."], "Sau can dùng động từ nguyên mẫu."),
        ],
      },
      {
        title: "Câu điều kiện loại 1 & 2",
        summary: "Diễn đạt điều kiện có thật ở hiện tại/tương lai và điều kiện giả định.",
        sections: [
          {
            title: "Điều kiện loại 1 — có thật",
            body:
              "Cấu trúc: **If + hiện tại đơn, will + V**\n- If it **rains**, we **will stay** at home.\n- If you **study** hard, you **will pass** the exam.\n\nDùng để nói về khả năng có thể xảy ra ở hiện tại hoặc tương lai.\n\nMệnh đề if không dùng will:\n- Sai: If it will rain...\n- Đúng: If it **rains**...",
            remember: "Loại 1: If + present simple, will + V.",
          },
          {
            title: "Điều kiện loại 2 — giả định",
            body:
              "Cấu trúc: **If + quá khứ đơn, would + V**\n- If I **had** more time, I **would learn** Japanese.\n- If I **were** you, I **would apologise**. (dùng were cho mọi ngôi trong câu giả định)\n\nDiễn tả điều không có thật hoặc khó xảy ra ở hiện tại.\n\nLưu ý: không dùng would trong mệnh đề if.",
            remember: "Loại 2: If + past simple, would + V.",
          },
        ],
        questions: [
          q("Điền: If you study hard, you ___ the exam.", "will pass", ["would pass", "passed", "will passing"], "Điều kiện loại 1 dùng will + V."),
          q("Điền: If I ___ you, I would take the job.", "were", ["am", "will be", "would be"], "Câu giả định dùng were cho mọi ngôi."),
          q("Chọn câu đúng:", "If it rains, we will cancel the trip.", ["If it will rain, we cancel the trip.", "If it rains, we would cancel the trip.", "If it rained, we will cancel the trip."], "Loại 1: hiện tại đơn + will."),
          q("Câu nào là điều kiện loại 2?", "If she had a car, she would drive to work.", ["If she has a car, she will drive to work.", "If she had a car, she will drive to work.", "If she has a car, she would drive to work."], "Loại 2 dùng quá khứ đơn + would."),
        ],
      },
      {
        title: "Mệnh đề quan hệ",
        summary: "Dùng who, which, that, where, whose để nối và bổ sung thông tin.",
        sections: [
          {
            title: "Đại từ quan hệ cơ bản",
            body:
              "**Who** — người: The man **who** lives next door is a chef.\n**Which** — vật: The book **which** I bought is interesting.\n**That** — người hoặc vật (mệnh đề xác định): The film **that** we watched was boring.\n**Where** — nơi chốn: The city **where** I was born is small.\n**Whose** — sở hữu: The girl **whose** father is a doctor is my friend.",
            remember: "Who = người, which = vật, where = nơi, whose = sở hữu.",
          },
          {
            title: "Xác định và không xác định",
            body:
              "Mệnh đề xác định (không có dấu phẩy) — cần thiết để hiểu câu:\n- The students **who studied hard** passed.\n\nMệnh đề không xác định (có dấu phẩy) — bổ sung thông tin, không dùng that:\n- My father, **who is 60**, still works.\n\nCó thể lược bỏ đại từ quan hệ khi nó là tân ngữ:\n- The book **(which)** I bought is new.",
            remember: "Mệnh đề không xác định dùng dấu phẩy và không dùng that.",
          },
        ],
        questions: [
          q("Điền: The woman ___ helped me was very kind.", "who", ["which", "where", "whose"], "Chỉ người làm chủ ngữ → who."),
          q("Điền: This is the house ___ I grew up.", "where", ["which", "who", "whose"], "Nơi chốn → where."),
          q("Chọn câu đúng:", "The book that I bought is expensive.", ["The book who I bought is expensive.", "The book where I bought is expensive.", "The book whose I bought is expensive."], "Vật → which/that."),
          q("Điền: That's the boy ___ bicycle was stolen.", "whose", ["who", "which", "where"], "Sở hữu → whose."),
        ],
      },
    ],
    vocab: [
      {
        name: "Công việc & học tập",
        slug: "cong-viec-hoc-tap",
        icon: "work",
        description: "Từ vựng để nói về nghề nghiệp, tuyển dụng và việc học.",
        lesson: {
          title: "Công việc & kỹ năng",
          summary: "8 từ vựng thường gặp trong môi trường làm việc và học thuật.",
          sections: [
            {
              title: "Nói về kinh nghiệm",
              body:
                "Mẫu câu hữu ích:\n- I **applied for** a position as a marketing assistant.\n- I have three years of **experience** in this field.\n- The **deadline** is next Friday.\n\nKhi phỏng vấn, hãy nêu **skills** và thành tích cụ thể thay vì chỉ nói “I am hard-working”.",
              remember: "Apply for a job / position; apply to a company.",
            },
          ],
          words: [
            { word: "apply", ipa: "/əˈplaɪ/", wordForm: "v", meaningVi: "ứng tuyển, nộp đơn", example: "I applied for the job online." },
            { word: "interview", ipa: "/ˈɪntəvjuː/", wordForm: "n/v", meaningVi: "buổi phỏng vấn", example: "She has an interview tomorrow." },
            { word: "salary", ipa: "/ˈsæləri/", wordForm: "n", meaningVi: "mức lương", example: "The salary is competitive." },
            { word: "deadline", ipa: "/ˈdedlaɪn/", wordForm: "n", meaningVi: "hạn chót", example: "We must meet the deadline." },
            { word: "colleague", ipa: "/ˈkɒliːɡ/", wordForm: "n", meaningVi: "đồng nghiệp", example: "My colleagues are supportive." },
            { word: "degree", ipa: "/dɪˈɡriː/", wordForm: "n", meaningVi: "bằng cấp", example: "She has a degree in economics." },
            { word: "research", ipa: "/rɪˈsɜːtʃ/", wordForm: "n/v", meaningVi: "nghiên cứu", example: "He is doing research on climate change." },
            { word: "skill", ipa: "/skɪl/", wordForm: "n", meaningVi: "kỹ năng", example: "Communication is an important skill." },
          ],
        },
      },
      {
        name: "Môi trường",
        slug: "moi-truong",
        icon: "eco",
        description: "Từ vựng về biến đổi khí hậu, ô nhiễm và bảo vệ hành tinh.",
        lesson: {
          title: "Bảo vệ môi trường",
          summary: "8 từ vựng cốt lõi cho chủ đề môi trường trong IELTS.",
          sections: [
            {
              title: "Vấn đề và giải pháp",
              body:
                "Cấu trúc hay dùng khi viết luận:\n- One major **cause** of pollution is plastic waste.\n- Governments should **reduce** carbon emissions.\n- We need to **recycle** more and use renewable **energy**.\n\nCollocation: environmental **protection**, climate **change**, global **warming**.",
              remember: "Climate change (không “climate changing”); renewable energy.",
            },
          ],
          words: [
            { word: "pollution", ipa: "/pəˈluːʃn/", wordForm: "n", meaningVi: "sự ô nhiễm", example: "Air pollution is a serious problem." },
            { word: "recycle", ipa: "/ˌriːˈsaɪkl/", wordForm: "v", meaningVi: "tái chế", example: "We should recycle paper and glass." },
            { word: "climate", ipa: "/ˈklaɪmət/", wordForm: "n", meaningVi: "khí hậu", example: "Climate change affects everyone." },
            { word: "energy", ipa: "/ˈenədʒi/", wordForm: "n", meaningVi: "năng lượng", example: "Solar energy is renewable." },
            { word: "wildlife", ipa: "/ˈwaɪldlaɪf/", wordForm: "n", meaningVi: "động vật hoang dã", example: "The forest is home to rare wildlife." },
            { word: "plastic", ipa: "/ˈplæstɪk/", wordForm: "n/adj", meaningVi: "nhựa", example: "Plastic bags harm marine life." },
            { word: "reduce", ipa: "/rɪˈdjuːs/", wordForm: "v", meaningVi: "giảm", example: "We must reduce our waste." },
            { word: "environment", ipa: "/ɪnˈvaɪrənmənt/", wordForm: "n", meaningVi: "môi trường", example: "Everyone can protect the environment." },
          ],
        },
      },
    ],
  },
  {
    code: "B2",
    name: "Trung cao cấp",
    tagline: "Tư duy học thuật",
    description:
      "Kiểm soát thì phức hợp, câu điều kiện nâng cao và diễn đạt quan điểm mạch lạc.",
    grammar: [
      {
        title: "Thì quá khứ hoàn thành",
        summary: "Diễn tả hành động xảy ra trước một mốc quá khứ khác.",
        sections: [
          {
            title: "Cấu trúc và cách dùng",
            body:
              "Cấu trúc: **had + V3/ed**\n- When I arrived, the train **had left**.\n- She **had finished** the report before the meeting started.\n\nDùng để nhấn mạnh hành động xảy ra TRƯỚC một hành động khác trong quá khứ.\n\nDấu hiệu: before, after, by the time, already, when.\n- **By the time** we got there, the film **had ended**.",
            remember: "Quá khứ hoàn thành = “quá khứ của quá khứ”.",
          },
          {
            title: "Phân biệt với quá khứ đơn",
            body:
              "Quá khứ đơn: chuỗi hành động theo thứ tự.\n- I **woke up**, **had** breakfast, and **went** to work.\n\nQuá khứ hoàn thành: hành động xảy ra trước.\n- I **had had** breakfast before I **left** home.\n\nLưu ý: “had had” là hoàn toàn đúng (had + quá khứ phân từ của have).",
            remember: "Dùng had + V3 khi cần làm rõ thứ tự trước – sau.",
          },
        ],
        questions: [
          q("Điền: By the time we arrived, the show ___.", "had started", ["started", "has started", "was starting"], "Hành động xảy ra trước một mốc quá khứ → quá khứ hoàn thành."),
          q("Chọn câu đúng:", "She had left before I called.", ["She left before I had called.", "She has left before I called.", "She had leave before I called."], "Hành động rời đi xảy ra trước → had left."),
          q("Điền: I ___ never seen such a beautiful beach before that trip.", "had", ["have", "was", "did"], "Trước một chuyến đi trong quá khứ → had never seen."),
          q("Dấu hiệu nào thường đi với quá khứ hoàn thành?", "by the time", ["tomorrow", "every day", "at the moment"], "By the time + quá khứ đơn thường đi với quá khứ hoàn thành."),
        ],
      },
      {
        title: "Câu điều kiện loại 3 & hỗn hợp",
        summary: "Diễn đạt điều không có thật trong quá khứ và hệ quả hiện tại.",
        sections: [
          {
            title: "Điều kiện loại 3",
            body:
              "Cấu trúc: **If + had + V3, would have + V3**\n- If I **had studied** harder, I **would have passed** the exam.\n- If they **had left** earlier, they **wouldn't have missed** the flight.\n\nDiễn tả điều không xảy ra trong quá khứ và kết quả giả định của nó.",
            remember: "Loại 3: If + had V3, would have V3.",
          },
          {
            title: "Điều kiện hỗn hợp",
            body:
              "Kết hợp quá khứ và hiện tại:\n- If I **had taken** that job, I **would be** rich now. (quá khứ → hiện tại)\n- If I **were** more organised, I **wouldn't have missed** the deadline. (hiện tại → quá khứ)\n\nDùng để nói hệ quả hiện tại của một quyết định trong quá khứ, hoặc ngược lại.",
            remember: "Hỗn hợp: vế if ở quá khứ, vế chính ở hiện tại (hoặc ngược lại).",
          },
        ],
        questions: [
          q("Điền: If I had known, I ___ you.", "would have told", ["would tell", "will tell", "had told"], "Loại 3 dùng would have + V3."),
          q("Chọn câu đúng:", "If she had studied medicine, she would be a doctor now.", ["If she studied medicine, she would have been a doctor now.", "If she had studied medicine, she will be a doctor now.", "If she studies medicine, she would be a doctor now."], "Điều kiện hỗn hợp: quá khứ → hiện tại."),
          q("Điền: If they ___ earlier, they wouldn't have missed the train.", "had left", ["left", "have left", "would leave"], "Loại 3 dùng had + V3 trong mệnh đề if."),
          q("Câu nào diễn tả điều không có thật trong quá khứ?", "If I had saved money, I would have bought a house.", ["If I save money, I will buy a house.", "If I saved money, I would buy a house.", "If I have money, I buy a house."], "Loại 3 diễn tả điều không xảy ra trong quá khứ."),
        ],
      },
      {
        title: "Câu bị động nâng cao",
        summary: "Dùng bị động với modal, thì tiếp diễn và cấu trúc tường thuật.",
        sections: [
          {
            title: "Bị động với modal và các thì",
            body:
              "Công thức chung: **be + V3** (chia theo thì)\n- Hiện tại đơn: The room **is cleaned** every day.\n- Quá khứ đơn: The bridge **was built** in 1990.\n- Hiện tại hoàn thành: The report **has been finished**.\n- Modal: The form **must be submitted** by Friday.\n- Tiếp diễn: The road **is being repaired**.",
            remember: "Modal + be + V3; have/has + been + V3.",
          },
          {
            title: "Khi nào dùng bị động?",
            body:
              "Dùng bị động khi:\n- Không biết hoặc không cần nêu người thực hiện: My bike **was stolen**.\n- Muốn nhấn mạnh đối tượng: The vaccine **was developed** by a team of scientists.\n- Văn phong học thuật, báo cáo: The data **were collected** over six months.\n\nNếu nêu tác nhân, dùng **by**: The novel was written **by** Nam Cao.",
            remember: "Bị động giúp câu học thuật khách quan và tập trung vào kết quả.",
          },
        ],
        questions: [
          q("Chọn dạng bị động đúng: The letter ___ yesterday.", "was sent", ["sent", "is sent", "has sent"], "Quá khứ đơn bị động: was + V3."),
          q("Điền: All applications must ___ by 5 p.m.", "be submitted", ["submitted", "be submit", "being submitted"], "Modal + be + V3."),
          q("Chọn câu bị động đúng:", "The problem is being solved.", ["The problem is solving.", "The problem being solved.", "The problem is solve."], "Hiện tại tiếp diễn bị động: is being + V3."),
          q("Điền: The results ___ published next month.", "will be", ["will", "are being", "have"], "Tương lai bị động: will be + V3."),
        ],
      },
      {
        title: "Tường thuật & mệnh đề danh ngữ",
        summary: "Thuật lại lời nói và dùng mệnh đề làm chủ ngữ/tân ngữ.",
        sections: [
          {
            title: "Reported speech",
            body:
              "Khi thuật lại, lùi thì thường gặp:\n- hiện tại đơn → quá khứ đơn\n- quá khứ đơn → quá khứ hoàn thành\n- will → would, can → could\n\nVí dụ:\n- “I **am** tired,” she said. → She said she **was** tired.\n- “I **will** call you,” he said. → He said he **would** call me.\n\nĐại từ và trạng từ chỉ thời gian cũng thay đổi: today → that day, tomorrow → the next day.",
            remember: "Reported speech: lùi thì, đổi đại từ và trạng từ thời gian.",
          },
          {
            title: "Mệnh đề danh ngữ",
            body:
              "Mệnh đề danh ngữ có thể làm chủ ngữ hoặc tân ngữ:\n- **What she said** surprised everyone. (chủ ngữ)\n- I don't know **whether he will come**. (tân ngữ)\n- **That he passed** the exam is amazing.\n\nCấu trúc thường gặp: what / whether / that / how / why + mệnh đề.",
            remember: "Mệnh đề danh ngữ hoạt động như một danh từ trong câu.",
          },
        ],
        questions: [
          q("Chọn câu tường thuật đúng: “I am busy,” he said.", "He said he was busy.", ["He said he is busy.", "He said I was busy.", "He said he were busy."], "Lùi thì hiện tại đơn → quá khứ đơn."),
          q("Điền: She said she ___ the next day.", "would come", ["will come", "comes", "came"], "Will → would trong tường thuật."),
          q("Chọn câu có mệnh đề danh ngữ làm chủ ngữ:", "What he did was unacceptable.", ["He did what was unacceptable.", "He said what he did.", "What did he do was unacceptable."], "What he did đóng vai trò chủ ngữ."),
          q("Điền: I don't know ___ she will accept the offer.", "whether", ["that", "what", "which"], "Whether diễn tả sự không chắc chắn (có/không)."),
        ],
      },
    ],
    vocab: [
      {
        name: "Xã hội & văn hoá",
        slug: "xa-hoi-van-hoa",
        icon: "groups",
        description: "Từ vựng để thảo luận về cộng đồng, thế hệ và bản sắc.",
        lesson: {
          title: "Con người & cộng đồng",
          summary: "8 từ vựng học thuật cho chủ đề xã hội.",
          sections: [
            {
              title: "Phân tích xã hội",
              body:
                "Cấu trúc hữu ích:\n- There is a **gap** between generations.\n- Cultural **identity** plays an important role.\n- **Diversity** makes a community stronger.\n\nTrong IELTS Writing, hãy dùng ví dụ cụ thể thay vì nhận định chung chung.",
              remember: "Generation gap, cultural identity, social values — các collocation phổ biến.",
            },
          ],
          words: [
            { word: "tradition", ipa: "/trəˈdɪʃn/", wordForm: "n", meaningVi: "truyền thống", example: "Tet is an important tradition in Vietnam." },
            { word: "generation", ipa: "/ˌdʒenəˈreɪʃn/", wordForm: "n", meaningVi: "thế hệ", example: "Each generation has different values." },
            { word: "community", ipa: "/kəˈmjuːnəti/", wordForm: "n", meaningVi: "cộng đồng", example: "The local community supports the project." },
            { word: "identity", ipa: "/aɪˈdentəti/", wordForm: "n", meaningVi: "bản sắc", example: "Language is part of cultural identity." },
            { word: "custom", ipa: "/ˈkʌstəm/", wordForm: "n", meaningVi: "phong tục", example: "It is a custom to give lucky money." },
            { word: "diversity", ipa: "/daɪˈvɜːsəti/", wordForm: "n", meaningVi: "sự đa dạng", example: "Cultural diversity enriches society." },
            { word: "behaviour", ipa: "/bɪˈheɪvjə/", wordForm: "n", meaningVi: "hành vi", example: "Social media can influence behaviour." },
            { word: "values", ipa: "/ˈvæljuːz/", wordForm: "n", meaningVi: "giá trị", example: "Family values remain important." },
          ],
        },
      },
      {
        name: "Truyền thông & công nghệ",
        slug: "truyen-thong-cong-nghe",
        icon: "devices",
        description: "Từ vựng về báo chí, mạng xã hội và quyền riêng tư.",
        lesson: {
          title: "Thời đại số",
          summary: "8 từ vựng quan trọng khi bàn về công nghệ và truyền thông.",
          sections: [
            {
              title: "Lợi ích và rủi ro",
              body:
                "Mẫu câu cân bằng:\n- On the one hand, social **media** connects people.\n- On the other hand, it can threaten **privacy**.\n- **Digital** platforms shape public opinion.\n\nDùng **influence** như động từ hoặc danh từ:\n- It **influences** young people.\n- It has a strong **influence** on society.",
              remember: "Social media (số nhiều), digital platform, online privacy.",
            },
          ],
          words: [
            { word: "media", ipa: "/ˈmiːdiə/", wordForm: "n", meaningVi: "truyền thông", example: "The media reported the story widely." },
            { word: "broadcast", ipa: "/ˈbrɔːdkɑːst/", wordForm: "v/n", meaningVi: "phát sóng", example: "The match will be broadcast live." },
            { word: "device", ipa: "/dɪˈvaɪs/", wordForm: "n", meaningVi: "thiết bị", example: "Most students own a digital device." },
            { word: "platform", ipa: "/ˈplætfɔːm/", wordForm: "n", meaningVi: "nền tảng", example: "The platform has millions of users." },
            { word: "privacy", ipa: "/ˈprɪvəsi/", wordForm: "n", meaningVi: "quyền riêng tư", example: "Online privacy is a growing concern." },
            { word: "digital", ipa: "/ˈdɪdʒɪtl/", wordForm: "adj", meaningVi: "kỹ thuật số", example: "We live in a digital age." },
            { word: "influence", ipa: "/ˈɪnfluəns/", wordForm: "n/v", meaningVi: "ảnh hưởng", example: "Advertising influences consumer behaviour." },
            { word: "content", ipa: "/ˈkɒntent/", wordForm: "n", meaningVi: "nội dung", example: "Creators produce online content." },
          ],
        },
      },
    ],
  },
  {
    code: "C1",
    name: "Cao cấp",
    tagline: "Học thuật & tinh tế",
    description:
      "Sử dụng đảo ngữ, câu chẻ và danh hoá để viết học thuật tự nhiên như người bản xứ.",
    grammar: [
      {
        title: "Đảo ngữ (Inversion)",
        summary: "Nhấn mạnh bằng cách đảo trợ động từ lên trước chủ ngữ.",
        sections: [
          {
            title: "Đảo ngữ với trạng từ phủ định",
            body:
              "Khi câu bắt đầu bằng trạng từ phủ định, trợ động từ đứng trước chủ ngữ:\n- **Never have I seen** such a performance.\n- **Rarely does she complain** about her workload.\n- **Not only did he finish** the project, but he also helped others.\n- **No sooner had we left** than it started raining.\n\nCấu trúc: Trạng từ + trợ động từ + S + V.",
            remember: "Never / Rarely / Seldom / Not only / No sooner → đảo ngữ.",
          },
          {
            title: "Đảo ngữ với điều kiện và so sánh",
            body:
              "Câu điều kiện bỏ if:\n- **Had I known**, I would have acted differently. (= If I had known)\n- **Were she here**, she would help us.\n- **Should you need** help, please call me.\n\nSo sánh:\n- **So impressive was** the speech that everyone applauded.\n- **Such was** his influence that the policy changed.",
            remember: "Had / Were / Should + S + ... thay cho mệnh đề if.",
          },
        ],
        questions: [
          q("Chọn câu đảo ngữ đúng:", "Never have I seen such a beautiful sunset.", ["Never I have seen such a beautiful sunset.", "Never have seen I such a beautiful sunset.", "I never have seen such a beautiful sunset."], "Never đứng đầu câu → đảo trợ động từ have lên trước chủ ngữ."),
          q("Viết lại: If I had known the truth, I would have told you.", "Had I known the truth, I would have told you.", ["If had I known the truth, I would have told you.", "Had known I the truth, I would have told you.", "I had known the truth, would have told you."], "Bỏ if và đảo had lên đầu câu."),
          q("Điền: Not only ___ she finish early, but she also helped others.", "did", ["does", "has", "was"], "Not only + trợ động từ did + S + V."),
          q("Chọn câu đảo ngữ với “so”:", "So difficult was the exam that many students failed.", ["So difficult the exam was that many students failed.", "So was difficult the exam that many students failed.", "So difficult did the exam that many students failed."], "So + adj + be + S + that ..."),
        ],
      },
      {
        title: "Câu chẻ (Cleft sentences)",
        summary: "Tách câu để nhấn mạnh thông tin quan trọng.",
        sections: [
          {
            title: "It-cleft",
            body:
              "Cấu trúc: **It is/was + thông tin nhấn mạnh + that/who + phần còn lại**\n- **It was Lan who** broke the news.\n- **It is the lack of funding that** worries us.\n- **It was in 2019 that** they first met.\n\nDùng để làm nổi bật người, vật, thời gian hoặc địa điểm.",
            remember: "It is/was ... that/who ...",
          },
          {
            title: "What-cleft",
            body:
              "Cấu trúc: **What + S + V + is/was + thông tin nhấn mạnh**\n- **What I need is** more time.\n- **What surprised me was** his calm reaction.\n- **What we should focus on is** quality, not quantity.\n\nCũng có thể dùng **The thing that ...**, **All (that) ...**:\n- **All I want is** a quiet room.",
            remember: "What ... is/was ... — nhấn mạnh vào thông tin sau is/was.",
          },
        ],
        questions: [
          q("Chọn câu chẻ đúng nhấn mạnh “Lan”:", "It was Lan who solved the problem.", ["It was Lan that solved the problem.", "It is Lan who solved the problem yesterday.", "Lan it was who solved the problem."], "It was + người + who + V."),
          q("Viết lại nhấn mạnh “more time”: I need more time.", "What I need is more time.", ["It is more time what I need.", "What I need more time.", "More time is what I need it."], "What + S + V + is + thông tin nhấn mạnh."),
          q("Điền: It was not until midnight ___ he finished the report.", "that", ["when", "which", "who"], "Cấu trúc nhấn mạnh: It was not until ... that ..."),
          q("Câu nào nhấn mạnh “the quality of the data”?", "What matters most is the quality of the data.", ["It matters most the quality of the data.", "The quality of the data it matters most.", "What the quality of the data matters most."], "What matters most is + thông tin nhấn mạnh."),
        ],
      },
      {
        title: "Rút gọn mệnh đề quan hệ",
        summary: "Dùng phân từ hiện tại và quá khứ để câu văn gọn và học thuật hơn.",
        sections: [
          {
            title: "Phân từ hiện tại (V-ing)",
            body:
              "Khi mệnh đề quan hệ ở thể chủ động, có thể rút gọn bằng V-ing:\n- The man **who is standing** there is my uncle. → The man **standing** there is my uncle.\n- Students **who study** abroad often become independent. → Students **studying** abroad often become independent.\n\nDùng khi hành động đang diễn ra hoặc mang tính chủ động.",
            remember: "Chủ động → V-ing.",
          },
          {
            title: "Phân từ quá khứ (V3)",
            body:
              "Khi mệnh đề quan hệ ở thể bị động, rút gọn bằng V3:\n- The book **which was written** by Nam Cao is famous. → The book **written** by Nam Cao is famous.\n- The data **which were collected** last year are reliable. → The data **collected** last year are reliable.\n\nCũng có thể dùng **to + V** khi diễn tả mục đích hoặc việc cần làm:\n- She was the first person **to arrive**.",
            remember: "Bị động → V3; mục đích / thứ tự → to + V.",
          },
        ],
        questions: [
          q("Rút gọn câu: The girl who is sitting next to me is my sister.", "The girl sitting next to me is my sister.", ["The girl sat next to me is my sister.", "The girl who sitting next to me is my sister.", "The girl is sitting next to me is my sister."], "Chủ động → V-ing."),
          q("Rút gọn: The report which was published yesterday caused a stir.", "The report published yesterday caused a stir.", ["The report publishing yesterday caused a stir.", "The report which publishing yesterday caused a stir.", "The report was published yesterday caused a stir."], "Bị động → V3."),
          q("Điền: The data ___ last month show a clear trend.", "collected", ["collecting", "which collected", "collect"], "Dữ liệu được thu thập → quá khứ phân từ."),
          q("Chọn câu đúng:", "She was the first student to finish the test.", ["She was the first student finishing the test.", "She was the first student finished the test.", "She was the first student who finish the test."], "The first + to V."),
        ],
      },
      {
        title: "Danh hoá & từ nối học thuật",
        summary: "Chuyển động từ/tính từ thành danh từ và dùng liên kết logic.",
        sections: [
          {
            title: "Nominalisation",
            body:
              "Danh hoá giúp văn phong học thuật cô đọng và khách quan:\n- They decided to invest more. → Their **decision** to invest more ...\n- The economy grew rapidly. → The rapid **growth** of the economy ...\n- People consume too much energy. → Excessive energy **consumption** ...\n\nCác hậu tố thường gặp: -tion, -ment, -ness, -ity, -ance.",
            remember: "Danh hoá = biến hành động thành danh từ để câu trang trọng hơn.",
          },
          {
            title: "Từ nối logic",
            body:
              "Nhóm từ nối học thuật:\n- Nguyên nhân: **owing to**, **due to**, **as a result of**\n- Kết quả: **consequently**, **therefore**, **thus**\n- Tương phản: **nevertheless**, **whereas**, **in contrast**\n- Bổ sung: **furthermore**, **moreover**, **in addition**\n\nVí dụ: The policy was unpopular. **Nevertheless**, it was implemented.\n\nLưu ý: **Whereas** nối hai mệnh đề trong cùng câu; **however** có thể đứng đầu câu mới.",
            remember: "Dùng therefore / consequently cho kết quả; nevertheless / whereas cho tương phản.",
          },
        ],
        questions: [
          q("Chọn dạng danh hoá của “decide”:", "decision", ["deciding", "decisive", "decidedly"], "Decide → decision."),
          q("Chọn từ nối phù hợp: The plan was expensive; ___, it was approved.", "nevertheless", ["therefore", "moreover", "because"], "Tương phản: tuy đắt nhưng vẫn được duyệt."),
          q("Viết lại học thuật hơn: People consume too much energy.", "Excessive energy consumption is a problem.", ["People are consuming too much energy problem.", "Energy is consumed too much by people.", "Too much energy people consume."], "Danh hoá consumption giúp câu học thuật hơn."),
          q("Điền: The delay was ___ to technical problems.", "due", ["because", "although", "despite"], "Due to + danh từ = bởi vì."),
        ],
      },
    ],
    vocab: [
      {
        name: "Động từ học thuật",
        slug: "dong-tu-hoc-thuat",
        icon: "science",
        description: "Những động từ then chốt trong bài đọc và bài viết IELTS.",
        lesson: {
          title: "Động từ phân tích & lập luận",
          summary: "8 động từ học thuật giúp diễn đạt chính xác.",
          sections: [
            {
              title: "Sử dụng trong Writing Task 2",
              body:
                "Mẫu câu:\n- The data **indicate** a clear upward trend.\n- This essay will **evaluate** both sides of the argument.\n- The author **demonstrates** that early intervention works.\n\nTránh lặp “say” hoặc “show”; chọn động từ phù hợp với mức độ chắc chắn.",
              remember: "Indicate / suggest = mức độ chắc chắn thấp hơn demonstrate / prove.",
            },
          ],
          words: [
            { word: "analyse", ipa: "/ˈænəlaɪz/", wordForm: "v", meaningVi: "phân tích", example: "We need to analyse the results carefully." },
            { word: "evaluate", ipa: "/ɪˈvæljueɪt/", wordForm: "v", meaningVi: "đánh giá", example: "The study evaluates the policy's impact." },
            { word: "demonstrate", ipa: "/ˈdemənstreɪt/", wordForm: "v", meaningVi: "chứng minh, thể hiện", example: "The findings demonstrate a strong link." },
            { word: "indicate", ipa: "/ˈɪndɪkeɪt/", wordForm: "v", meaningVi: "chỉ ra, cho thấy", example: "The survey indicates growing concern." },
            { word: "imply", ipa: "/ɪmˈplaɪ/", wordForm: "v", meaningVi: "ngụ ý", example: "His comment implies that change is needed." },
            { word: "justify", ipa: "/ˈdʒʌstɪfaɪ/", wordForm: "v", meaningVi: "biện minh, chứng minh là đúng", example: "Can you justify this decision?" },
            { word: "derive", ipa: "/dɪˈraɪv/", wordForm: "v", meaningVi: "bắt nguồn, rút ra", example: "The word derives from Latin." },
            { word: "establish", ipa: "/ɪˈstæblɪʃ/", wordForm: "v", meaningVi: "thiết lập, xác lập", example: "The study establishes a clear connection." },
          ],
        },
      },
      {
        name: "Danh từ trừu tượng",
        slug: "danh-tu-truu-tuong",
        icon: "psychology",
        description: "Từ vựng nâng cao để diễn đạt ý tưởng phức tạp.",
        lesson: {
          title: "Diễn đạt ý tưởng trừu tượng",
          summary: "8 danh từ học thuật thường xuất hiện trong bài đọc C1.",
          sections: [
            {
              title: "Xây dựng lập luận",
              body:
                "Mẫu câu:\n- There is a growing **tendency** for young people to delay marriage.\n- The **significance** of this finding cannot be overstated.\n- The **implication** is that policy must change.\n\nHãy học danh từ theo cụm: a significant **implication**, a strong **tendency**, a theoretical **framework**.",
              remember: "Học collocation cùng danh từ trừu tượng để dùng tự nhiên.",
            },
          ],
          words: [
            { word: "significance", ipa: "/sɪɡˈnɪfɪkəns/", wordForm: "n", meaningVi: "tầm quan trọng, ý nghĩa", example: "The significance of the discovery is enormous." },
            { word: "tendency", ipa: "/ˈtendənsi/", wordForm: "n", meaningVi: "xu hướng", example: "There is a tendency to overwork." },
            { word: "assumption", ipa: "/əˈsʌmpʃn/", wordForm: "n", meaningVi: "giả định", example: "The argument rests on a false assumption." },
            { word: "implication", ipa: "/ˌɪmplɪˈkeɪʃn/", wordForm: "n", meaningVi: "hàm ý, hệ quả", example: "The implications for education are significant." },
            { word: "framework", ipa: "/ˈfreɪmwɜːk/", wordForm: "n", meaningVi: "khung, cấu trúc", example: "The study proposes a new framework." },
            { word: "perspective", ipa: "/pəˈspektɪv/", wordForm: "n", meaningVi: "góc nhìn", example: "Consider the issue from another perspective." },
            { word: "criteria", ipa: "/kraɪˈtɪəriə/", wordForm: "n (pl)", meaningVi: "tiêu chí", example: "The criteria for selection are strict." },
            { word: "phenomenon", ipa: "/fəˈnɒmɪnən/", wordForm: "n", meaningVi: "hiện tượng", example: "Urban migration is a global phenomenon." },
          ],
        },
      },
    ],
  },
  {
    code: "C2",
    name: "Thành thạo",
    tagline: "Tinh chỉnh như người bản xứ",
    description:
      "Làm chủ sắc thái, ẩn ý và văn phong học thuật ở mức độ gần người bản ngữ.",
    grammar: [
      {
        title: "Điều kiện ẩn & đảo ngữ điều kiện",
        summary: "Những cấu trúc điều kiện không dùng “if” trong văn phong trang trọng.",
        sections: [
          {
            title: "Điều kiện với unless, otherwise, but for",
            body:
              "**Unless** = if not: **Unless** you apply now, you will miss the deadline.\n**Otherwise** = nếu không thì: Leave now; **otherwise** you'll be late.\n**But for** + noun = nếu không có: **But for** her support, I would have failed.\n**Provided / as long as** = với điều kiện là: You can go **provided** you finish your work.",
            remember: "Unless = if not; but for + danh từ.",
          },
          {
            title: "Đảo ngữ điều kiện",
            body:
              "Trong văn phong trang trọng, bỏ if và đảo trợ động từ:\n- **Had it not been for** the rain, the event would have succeeded.\n- **Were it not for** his help, we would still be stuck.\n- **Should you require** further information, please contact us.\n\nCác cấu trúc này tương đương với câu điều kiện loại 2 và loại 3.",
            remember: "Had it not been for / Were it not for + noun.",
          },
        ],
        questions: [
          q("Chọn câu đúng với “unless”:", "Unless you hurry, we will miss the train.", ["Unless you don't hurry, we will miss the train.", "Unless you hurried, we will miss the train.", "Unless you will hurry, we will miss the train."], "Unless đã mang nghĩa phủ định, không thêm don't."),
          q("Điền: But ___ your advice, I would have made a mistake.", "for", ["of", "with", "by"], "Cấu trúc cố định: but for + noun."),
          q("Chọn câu đảo ngữ điều kiện đúng:", "Had it not been for the storm, the flight would have departed.", ["If it had not been for the storm, the flight would depart.", "Had not it been for the storm, the flight would have departed.", "Were it not been for the storm, the flight would have departed."], "Had it not been for + noun, would have + V3."),
          q("Điền: ___ you need any help, please let me know.", "Should", ["Would", "Could", "Might"], "Should + S + V diễn tả điều kiện trang trọng."),
        ],
      },
      {
        title: "Hedging & nhấn mạnh học thuật",
        summary: "Giảm nhẹ khẳng định và tăng sức nặng cho lập luận.",
        sections: [
          {
            title: "Hedging",
            body:
              "Trong học thuật, tránh khẳng định tuyệt đối. Dùng:\n- **may / might / could**: This **may** explain the results.\n- **appear / seem**: The data **appear** to support the hypothesis.\n- **tend to**: Young people **tend to** prefer online learning.\n- **it is likely that**: **It is likely that** the trend will continue.\n- **to some extent**: The theory is valid **to some extent**.",
            remember: "Hedging giúp câu văn thận trọng và đáng tin hơn.",
          },
          {
            title: "Nhấn mạnh",
            body:
              "Dùng để làm nổi bật luận điểm:\n- **It is worth noting that** ...\n- **What is particularly striking is** ...\n- **Not only ... but also** ...\n- **Above all**, ...\n- **Indeed**, ...\n\nVí dụ: **What is particularly striking is** the speed of change. **Indeed**, the figures doubled in two years.",
            remember: "Đan xen hedging và nhấn mạnh để lập luận cân bằng, thuyết phục.",
          },
        ],
        questions: [
          q("Câu nào dùng hedging phù hợp trong học thuật?", "The results may indicate a broader trend.", ["The results prove the trend forever.", "The results are always true.", "The results must be correct."], "May indicate giảm nhẹ mức độ khẳng định."),
          q("Chọn cụm nhấn mạnh phù hợp:", "What is particularly striking is the rapid decline.", ["What is particularly striking the rapid decline.", "It particularly striking is the rapid decline.", "The rapid decline what is particularly striking."], "Cấu trúc what-cleft để nhấn mạnh."),
          q("Điền: The findings ___ to support the hypothesis.", "appear", ["appears", "appearing", "appeared to be appear"], "The findings (số nhiều) + appear to + V."),
          q("Chọn câu thận trọng nhất:", "The policy could have some positive effects.", ["The policy has only positive effects.", "The policy will definitely solve everything.", "The policy is the best solution ever."], "Could have some = hedging, tránh tuyệt đối hoá."),
        ],
      },
      {
        title: "Song song & so sánh nâng cao",
        summary: "Dùng cấu trúc song song và so sánh kép để câu văn cân đối.",
        sections: [
          {
            title: "Cấu trúc song song",
            body:
              "Các thành phần nối bằng and / or / not only ... but also phải cùng dạng:\n- She likes **reading**, **writing**, and **travelling**. (V-ing)\n- The job requires **patience**, **creativity**, and **attention to detail**. (danh từ)\n- **Not only did he apologise, but he also offered** compensation.\n\nLỗi thường gặp: trộn lẫn danh từ và động từ trong cùng danh sách.",
            remember: "Các mục trong danh sách phải cùng từ loại/cấu trúc.",
          },
          {
            title: "So sánh kép & so sánh nhấn mạnh",
            body:
              "**The more ..., the more ...**: **The more** we practise, **the better** we become.\n**Far / much / considerably + comparative**: The situation is **far more** complex than expected.\n**By far the + superlative**: This is **by far the most** convincing argument.\n**No sooner ... than**: **No sooner had** we arrived **than** it began to rain.",
            remember: "The + comparative, the + comparative.",
          },
        ],
        questions: [
          q("Chọn câu song song đúng:", "The course develops writing, speaking, and listening skills.", ["The course develops writing, speak, and to listen.", "The course develops writing, speaking, and listen skills.", "The course develops to write, speaking, and listening."], "Các kỹ năng phải cùng dạng danh từ/V-ing."),
          q("Điền: The more you read, ___ your vocabulary becomes.", "the richer", ["richer", "the richest", "more rich"], "Cấu trúc so sánh kép: the more ..., the + comparative."),
          q("Chọn cụm nhấn mạnh so sánh đúng:", "by far the most effective", ["by far most effective", "far the most effective", "the far most effective"], "By far + the + superlative."),
          q("Điền: No sooner had she arrived ___ she was asked to speak.", "than", ["then", "that", "when"], "No sooner ... than ..."),
        ],
      },
      {
        title: "Collocation, register & idiom học thuật",
        summary: "Chọn từ đi cùng nhau tự nhiên và đúng văn phong.",
        sections: [
          {
            title: "Collocation & register",
            body:
              "Collocation là các từ thường đi cùng nhau:\n- **conduct** research (không “do research” trong văn phong học thuật)\n- **draw** a conclusion\n- **play** a crucial role\n- **pose** a threat\n- **raise** awareness\n\nRegister: tránh từ quá khẩu ngữ trong bài luận.\n- Khẩu ngữ: a lot of problems → Học thuật: **numerous difficulties**\n- Khẩu ngữ: kids → Học thuật: **children / young people**",
            remember: "Học collocation theo cụm, không học từ đơn lẻ.",
          },
          {
            title: "Idiom học thuật",
            body:
              "Một số thành ngữ phù hợp văn phong bán trang trọng/học thuật:\n- **a double-edged sword**: Technology is **a double-edged sword**.\n- **the tip of the iceberg**: These cases are just **the tip of the iceberg**.\n- **in the long run**: **In the long run**, education pays off.\n- **at odds with**: The policy is **at odds with** public opinion.\n- **bear in mind**: **Bear in mind** that correlation is not causation.",
            remember: "Dùng idiom tiết chế; ưu tiên chính xác và tự nhiên.",
          },
        ],
        questions: [
          q("Chọn collocation đúng:", "conduct research", ["make research", "do a research", "perform a research"], "Conduct research là collocation học thuật chuẩn."),
          q("Điền: The new law has ___ a threat to small businesses.", "posed", ["made", "given", "done"], "Collocation: pose a threat."),
          q("Thành ngữ nào phù hợp: “Công nghệ vừa có lợi vừa có hại”?", "a double-edged sword", ["the tip of the iceberg", "in the long run", "at odds with"], "A double-edged sword = con dao hai lưỡi."),
          q("Chọn câu đúng register học thuật:", "Numerous difficulties arose during the study.", ["A lot of problems came up during the study.", "Lots of stuff went wrong in the study.", "The study had a bunch of issues."], "Numerous difficulties phù hợp văn phong học thuật."),
        ],
      },
    ],
    vocab: [
      {
        name: "Collocation học thuật",
        slug: "collocation-hoc-thuat",
        icon: "menu_book",
        description: "Các cụm từ cố định giúp bài viết tự nhiên và chính xác.",
        lesson: {
          title: "Cụm từ học thuật thông dụng",
          summary: "8 collocation quan trọng cho IELTS Writing và Speaking.",
          sections: [
            {
              title: "Học theo cụm",
              body:
                "Đừng học “role” riêng lẻ; hãy học **play a vital role in**.\nĐừng học “conclusion” riêng lẻ; hãy học **draw a conclusion**.\n\nMẫu câu:\n- Education **plays a vital role in** social mobility.\n- We can **draw a conclusion** from the data.\n- Climate change **poses a serious threat to** coastal cities.",
              remember: "Collocation đúng giúp tăng band từ vựng (Lexical Resource).",
            },
          ],
          words: [
            { word: "play a role", wordForm: "phrase", meaningVi: "đóng vai trò", meaningEn: "to have an effect or function", example: "Parents play a key role in a child's development." },
            { word: "draw a conclusion", wordForm: "phrase", meaningVi: "rút ra kết luận", example: "It is difficult to draw a conclusion from such limited data." },
            { word: "pose a threat", wordForm: "phrase", meaningVi: "gây ra mối đe dọa", example: "Plastic waste poses a threat to marine life." },
            { word: "gain insight", wordForm: "phrase", meaningVi: "hiểu sâu hơn", example: "The interviews helped us gain insight into consumer habits." },
            { word: "reach a consensus", wordForm: "phrase", meaningVi: "đạt được đồng thuận", example: "The committee failed to reach a consensus." },
            { word: "take into account", wordForm: "phrase", meaningVi: "xem xét, tính đến", example: "We must take costs into account." },
            { word: "raise awareness", wordForm: "phrase", meaningVi: "nâng cao nhận thức", example: "Campaigns raise awareness of mental health." },
            { word: "bridge the gap", wordForm: "phrase", meaningVi: "thu hẹp khoảng cách", example: "Education can bridge the gap between rich and poor." },
          ],
        },
      },
      {
        name: "Thành ngữ & sắc thái",
        slug: "thanh-ngu-sac-thai",
        icon: "auto_awesome",
        description: "Thành ngữ và cách diễn đạt tinh tế ở trình độ C2.",
        lesson: {
          title: "Nói tự nhiên như người bản xứ",
          summary: "8 thành ngữ và cụm diễn đạt mang sắc thái học thuật.",
          sections: [
            {
              title: "Dùng đúng ngữ cảnh",
              body:
                "Thành ngữ giúp câu văn sinh động nhưng dễ sai nếu dùng quá nhiều. Hãy dùng 1–2 cụm trong cả bài:\n- The benefits are clear **in the long run**.\n- His statement is **at odds with** the evidence.\n- **Bear in mind** that the sample is small.",
              remember: "Ưu tiên độ chính xác; thành ngữ chỉ dùng khi thật phù hợp.",
            },
          ],
          words: [
            { word: "a blessing in disguise", wordForm: "idiom", meaningVi: "trong cái rủi có cái may", example: "Losing that job was a blessing in disguise." },
            { word: "the tip of the iceberg", wordForm: "idiom", meaningVi: "phần nổi của tảng băng chìm", example: "These reported cases are just the tip of the iceberg." },
            { word: "cut corners", wordForm: "idiom", meaningVi: "làm tắt, làm ẩu để tiết kiệm", example: "The builder cut corners to reduce costs." },
            { word: "in the long run", wordForm: "phrase", meaningVi: "về lâu dài", example: "Investing in education pays off in the long run." },
            { word: "bear in mind", wordForm: "phrase", meaningVi: "ghi nhớ, lưu ý", example: "Bear in mind that the results are preliminary." },
            { word: "on the whole", wordForm: "phrase", meaningVi: "nhìn chung", example: "On the whole, the policy has been effective." },
            { word: "a double-edged sword", wordForm: "idiom", meaningVi: "con dao hai lưỡi", example: "Social media is a double-edged sword." },
            { word: "at odds with", wordForm: "phrase", meaningVi: "mâu thuẫn với", example: "The decision is at odds with the company's values." },
          ],
        },
      },
    ],
  },
];
