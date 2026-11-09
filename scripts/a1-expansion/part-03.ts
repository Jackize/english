import { lesson, w, type A1TopicExpansion } from "./helpers";

export const PART_03: Record<string, A1TopicExpansion> = {
  "thuc-an-do-uong": {
    extraWord: w(
      "tea",
      "/tiː/",
      "n",
      "trà",
      "a hot drink made from tea leaves",
      "Would you like a cup of tea?",
    ),
    lessons: [
      lesson(
        "Rau củ & trái cây",
        "15 từ về rau củ, trái cây và cách mua chúng ở chợ.",
        "Rau củ, trái cây & đi chợ",
        `- **apple**: quả táo
- **banana**: quả chuối
- **pear**: quả lê
- **grape**: quả nho
- **potato**: củ khoai tây
- **tomato**: quả cà chua

I eat **an apple** every day.
We buy **potatoes and tomatoes** at the market.`,
        "Dùng a/an với trái cây đếm được số ít: an apple, an orange.",
        [
          w("apple", "/ˈæpl/", "n", "quả táo", "a round red or green fruit", "I eat an apple every day."),
          w("banana", "/bəˈnɑːnə/", "n", "quả chuối", "a long yellow fruit", "Bananas are yellow and sweet."),
          w("pear", "/peə/", "n", "quả lê", "a sweet fruit with a round body", "I eat a pear after lunch."),
          w("grape", "/ɡreɪp/", "n", "quả nho", "a small green or purple fruit", "These grapes are very sweet."),
          w("mango", "/ˈmæŋɡəʊ/", "n", "quả xoài", "a sweet yellow tropical fruit", "Mango is my favourite fruit."),
          w("potato", "/pəˈteɪtəʊ/", "n", "củ khoai tây", "a round vegetable that grows in the ground", "We boil potatoes for dinner."),
          w("tomato", "/təˈmɑːtəʊ/", "n", "quả cà chua", "a soft red fruit used in salads", "Put a tomato in the salad."),
          w("carrot", "/ˈkærət/", "n", "củ cà rốt", "a long orange vegetable", "Rabbits like carrots."),
          w("onion", "/ˈʌnjən/", "n", "củ hành", "a round vegetable with a strong taste", "Cut the onion into small pieces."),
          w("cabbage", "/ˈkæbɪdʒ/", "n", "bắp cải", "a large round green vegetable", "My mother cooks cabbage with meat."),
          w("bean", "/biːn/", "n", "hạt đậu", "a small seed that we eat as a vegetable", "There are beans in the soup."),
          w("corn", "/kɔːn/", "n", "ngô", "a yellow vegetable that grows on a tall plant", "We eat corn in summer."),
          w("lemon", "/ˈlemən/", "n", "quả chanh", "a yellow fruit with a sour taste", "Add some lemon to the fish."),
          w("watermelon", "/ˈwɔːtəmelən/", "n", "quả dưa hấu", "a large green fruit with red inside", "Watermelon is good in hot weather."),
          w("salad", "/ˈsæləd/", "n", "món salad", "a cold dish of vegetables", "I have salad for lunch."),
        ],
      ),
      lesson(
        "Món ăn & cách nấu",
        "15 từ về nguyên liệu, món ăn và các động từ nấu nướng cơ bản.",
        "Nguyên liệu & động từ nấu ăn",
        `- **soup**: súp, canh
- **noodle**: mì, bún
- **turkey**: thịt gà tây
- **beef**: thịt bò
- **cheese**: phô mai
- **salt**: muối

**Boil** the eggs, then **fry** the onions.
My mother **bakes** bread at home.`,
        "boil (luộc), fry (rán), bake (nướng) — ba cách nấu hay gặp ở A1.",
        [
          w("soup", "/suːp/", "n", "súp, canh", "a hot liquid dish", "The soup is very hot."),
          w("noodle", "/ˈnuːdl/", "n", "mì, bún", "long thin pieces of food made from flour", "We eat noodles with beef."),
          w("turkey", "/ˈtɜːki/", "n", "thịt gà tây", "a large bird eaten as meat", "We eat turkey at Christmas."),
          w("beef", "/biːf/", "n", "thịt bò", "meat from a cow", "This beef is very tender."),
          w("pork", "/pɔːk/", "n", "thịt lợn", "meat from a pig", "We cook pork with onions."),
          w("cheese", "/tʃiːz/", "n", "phô mai", "a food made from milk", "I like cheese on my bread."),
          w("butter", "/ˈbʌtə/", "n", "bơ", "a yellow food made from cream", "Put some butter on the bread."),
          w("sugar", "/ˈʃʊɡə/", "n", "đường", "a sweet white food from sugar cane", "Do you take sugar in your tea?"),
          w("salt", "/sɔːlt/", "n", "muối", "a white powder that makes food salty", "Add a little salt to the soup."),
          w("pepper", "/ˈpepə/", "n", "hạt tiêu", "a spice with a hot taste", "Put some pepper on the eggs."),
          w("oil", "/ɔɪl/", "n", "dầu ăn", "a liquid used for cooking", "Heat the oil in the pan."),
          w("boil", "/bɔɪl/", "v", "luộc, đun sôi", "to cook something in very hot water", "Boil the eggs for five minutes."),
          w("fry", "/fraɪ/", "v", "rán, chiên", "to cook food in hot oil", "Fry the onions for two minutes."),
          w("bake", "/beɪk/", "v", "nướng (bằng lò)", "to cook food in an oven", "My mother bakes bread at home."),
          w("delicious", "/dɪˈlɪʃəs/", "adj", "ngon", "tasting very good", "This soup is delicious."),
        ],
      ),
      lesson(
        "Nhà hàng & gọi món",
        "15 từ để gọi món, hỏi hoá đơn và nói về bữa ăn ở nhà hàng.",
        "Ở nhà hàng",
        `- **menu**: thực đơn
- **order**: gọi món
- **dish**: món ăn
- **dessert**: món tráng miệng
- **bill**: hoá đơn
- **table for two**: bàn cho hai người

Can I see the **menu**, please?
We would like a **table for two**.`,
        "Could we have the bill, please? — cách hỏi hoá đơn lịch sự.",
        [
          w("menu", "/ˈmenjuː/", "n", "thực đơn", "a list of food in a restaurant", "Can I see the menu, please?"),
          w("order", "/ˈɔːdə/", "n/v", "đơn gọi món; gọi món", "food asked for in a restaurant; to ask for food", "We order two bowls of soup."),
          w("dish", "/dɪʃ/", "n", "món ăn", "food cooked in a certain way", "This dish is a local speciality."),
          w("dessert", "/dɪˈzɜːt/", "n", "món tráng miệng", "sweet food eaten after a meal", "What would you like for dessert?"),
          w("drink", "/drɪŋk/", "n/v", "đồ uống; uống", "a liquid you have with a meal; to take liquid", "Can I have a cold drink?"),
          w("bill", "/bɪl/", "n", "hoá đơn", "a paper showing how much you must pay", "Could we have the bill, please?"),
          w("tip", "/tɪp/", "n", "tiền boa", "extra money given for good service", "We left a small tip for the waitress."),
          w("table for two", "/ˌteɪbl fə ˈtuː/", "phrase", "bàn cho hai người", "a table with two seats", "A table for two, please."),
          w("chopsticks", "/ˈtʃɒpstɪks/", "n", "đũa", "two thin sticks used for eating", "We eat noodles with chopsticks."),
          w("napkin", "/ˈnæpkɪn/", "n", "khăn ăn", "a cloth or paper for your mouth", "Put the napkin beside the plate."),
          w("straw", "/strɔː/", "n", "ống hút", "a thin tube for drinking", "She drinks juice with a straw."),
          w("hungry", "/ˈhʌŋɡri/", "adj", "đói", "wanting to eat", "I am hungry after school."),
          w("thirsty", "/ˈθɜːsti/", "adj", "khát", "wanting to drink", "The children are thirsty."),
          w("tasty", "/ˈteɪsti/", "adj", "ngon, đậm đà", "having a good taste", "The fish is very tasty."),
          w("waitress", "/ˈweɪtrəs/", "n", "nữ bồi bàn", "a woman who serves food in a restaurant", "The waitress brought the menu."),
        ],
      ),
    ],
  },

  "truong-hoc-hoc-tap": {
    extraWord: w(
      "classroom",
      "/ˈklɑːsruːm/",
      "n",
      "phòng học",
      "a room where lessons happen",
      "Our classroom is on the first floor.",
    ),
    lessons: [
      lesson(
        "Đồ dùng học tập",
        "15 từ về dụng cụ và đồ dùng trong cặp sách của học sinh.",
        "Trong cặp sách",
        `- **ruler**: thước kẻ
- **eraser**: cục tẩy
- **schoolbag**: cặp sách
- **dictionary**: từ điển
- **calculator**: máy tính cầm tay
- **scissors**: cái kéo

My **schoolbag** is very heavy.
Look up the word in your **dictionary**.`,
        "a pair of scissors — luôn dùng số nhiều với scissors.",
        [
          w("ruler", "/ˈruːlə/", "n", "thước kẻ", "a straight tool for measuring", "Can I borrow your ruler?"),
          w("eraser", "/ɪˈreɪzə/", "n", "cục tẩy", "a small object for removing pencil marks", "I need an eraser for this mistake."),
          w("sharpener", "/ˈʃɑːpnə/", "n", "cái gọt bút chì", "a small tool that makes a pencil sharp", "My sharpener is in my pencil case."),
          w("schoolbag", "/ˈskuːlbæɡ/", "n", "cặp sách", "a bag for carrying school things", "My schoolbag is very heavy."),
          w("crayon", "/ˈkreɪɒn/", "n", "bút sáp màu", "a coloured stick for drawing", "The children draw with crayons."),
          w("marker", "/ˈmɑːkə/", "n", "bút dạ", "a thick pen with bright ink", "Write the title with a marker."),
          w("paper", "/ˈpeɪpə/", "n", "giấy", "thin material for writing on", "Take a piece of paper, please."),
          w("folder", "/ˈfəʊldə/", "n", "bìa hồ sơ, thư mục", "a cover for keeping papers together", "Put the test in your folder."),
          w("dictionary", "/ˈdɪkʃənri/", "n", "từ điển", "a book of words and their meanings", "Look up the word in your dictionary."),
          w("calculator", "/ˈkælkjuleɪtə/", "n", "máy tính cầm tay", "a small machine for doing maths", "You can use a calculator in this test."),
          w("board", "/bɔːd/", "n", "bảng", "a flat surface for writing in class", "The teacher writes on the board."),
          w("chalk", "/tʃɔːk/", "n", "phấn", "a soft white stick for writing on a board", "There is no chalk in the drawer."),
          w("glue", "/ɡluː/", "n", "keo dán", "a liquid that sticks things together", "Use glue to stick the picture."),
          w("scissors", "/ˈsɪzəz/", "n", "cái kéo", "a tool with two blades for cutting paper", "Cut the paper with scissors."),
          w("globe", "/ɡləʊb/", "n", "quả địa cầu", "a round model of the earth", "The globe is on the teacher's desk."),
        ],
      ),
      lesson(
        "Môn học",
        "15 từ về các môn học, thời khoá biểu và kết quả học tập.",
        "Các môn học ở trường",
        `- **maths**: môn Toán
- **literature**: môn Văn học
- **science**: môn Khoa học
- **history**: môn Lịch sử
- **geography**: môn Địa lý
- **timetable**: thời khoá biểu

**Maths** is my favourite **subject**.
We have **English** on Monday.`,
        "Tên môn học viết hoa: English, Maths, History, Geography.",
        [
          w("maths", "/mæθs/", "n", "môn Toán", "the study of numbers", "I am good at maths."),
          w("literature", "/ˈlɪtrətʃə/", "n", "môn Văn học", "the study of books and stories", "Literature is my favourite subject."),
          w("science", "/ˈsaɪəns/", "n", "môn Khoa học", "the study of the natural world", "Science is very interesting."),
          w("history", "/ˈhɪstri/", "n", "môn Lịch sử", "the study of the past", "We learn about the past in history."),
          w("geography", "/dʒiˈɒɡrəfi/", "n", "môn Địa lý", "the study of countries and the earth", "In geography we study rivers and mountains."),
          w("art", "/ɑːt/", "n", "môn Mỹ thuật", "drawing and painting as a school subject", "I draw pictures in art."),
          w("drama", "/ˈdrɑːmə/", "n", "môn Kịch", "the study of plays and acting", "We study drama on Friday."),
          w("PE", "/ˌpiː ˈiː/", "n", "môn Thể dục", "physical education; sport at school", "We play football in PE."),
          w("computer studies", "/kəmˈpjuːtə ˌstʌdiz/", "n", "môn Tin học", "the study of computers", "Computer studies is on Tuesday."),
          w("subject", "/ˈsʌbdʒɪkt/", "n", "môn học", "a thing you study at school", "How many subjects do you have?"),
          w("timetable", "/ˈtaɪmteɪbl/", "n", "thời khoá biểu", "a list of lessons and times", "Our timetable changes every term."),
          w("break", "/breɪk/", "n", "giờ ra chơi, giờ nghỉ", "a short time to rest", "We play outside at break."),
          w("term", "/tɜːm/", "n", "học kỳ", "a part of the school year", "The new term starts in September."),
          w("test", "/test/", "n", "bài kiểm tra", "a short exam", "We have a maths test today."),
          w("grade", "/ɡreɪd/", "n", "điểm số", "a mark for school work", "She got a good grade in English."),
        ],
      ),
      lesson(
        "Hoạt động lớp & thi cử",
        "15 từ về hoạt động trong lớp và các bước ôn thi, nhận kết quả.",
        "Học trên lớp & thi cử",
        `- **listen**: nghe
- **repeat**: nhắc lại
- **write**: viết
- **practise**: luyện tập
- **revise**: ôn bài
- **pass**: đỗ, vượt qua

**Listen** to the teacher and **answer** the question.
I **revise** at home before a test.`,
        "pass = đỗ; fail = trượt. Đây là hai kết quả trái ngược nhau.",
        [
          w("listen", "/ˈlɪsn/", "v", "nghe", "to pay attention to sounds", "Listen to the teacher, please."),
          w("repeat", "/rɪˈpiːt/", "v", "nhắc lại", "to say something again", "Please repeat the question."),
          w("write", "/raɪt/", "v", "viết", "to make words on paper", "Write your name at the top."),
          w("discuss", "/dɪˈskʌs/", "v", "thảo luận", "to talk about something with others", "We discuss the story in class."),
          w("answer", "/ˈɑːnsə/", "n/v", "câu trả lời; trả lời", "something you say back to a question", "Answer the question in your notebook."),
          w("question", "/ˈkwestʃən/", "n", "câu hỏi", "something you ask", "I don't understand this question."),
          w("practise", "/ˈpræktɪs/", "v", "luyện tập", "to do something often to get better", "I practise English every day."),
          w("revise", "/rɪˈvaɪz/", "v", "ôn bài", "to study again before a test", "We revise for the exam at home."),
          w("pass", "/pɑːs/", "v", "đỗ, vượt qua", "to succeed in a test", "I hope I pass the exam."),
          w("fail", "/feɪl/", "v", "trượt, không đạt", "to not succeed in a test", "He was sad because he failed the test."),
          w("mark", "/mɑːk/", "n/v", "điểm; chấm điểm", "a number or letter for school work", "The teacher gave me a good mark."),
          w("result", "/rɪˈzʌlt/", "n", "kết quả", "what happens after a test", "The results come out on Friday."),
          w("certificate", "/səˈtɪfɪkət/", "n", "chứng chỉ", "an official paper for a course", "She has a certificate in English."),
          w("group work", "/ˈɡruːp wɜːk/", "n", "làm việc nhóm", "working together in a small group", "We do group work in class."),
          w("presentation", "/ˌpreznˈteɪʃn/", "n", "bài thuyết trình", "a talk in front of the class", "Our group gives a presentation today."),
        ],
      ),
    ],
  },

  "nghe-nghiep-cong-viec": {
    extraWord: w(
      "police officer",
      "/pəˈliːs ˌɒfɪsə/",
      "n",
      "cảnh sát",
      "a person who keeps people safe",
      "The police officer helped the old man.",
    ),
    lessons: [
      lesson(
        "Nơi làm việc",
        "15 từ về những nơi người ta làm việc và các bộ phận trong nơi làm việc.",
        "Mọi người làm việc ở đâu?",
        `- **factory**: nhà máy
- **warehouse**: nhà kho
- **canteen**: căng tin
- **hotel**: khách sạn
- **call centre**: tổng đài
- **reception**: quầy lễ tân

My uncle works in a car **factory**.
Please wait at **reception**.`,
        "work in + nơi làm việc; work at + một địa điểm cụ thể.",
        [
          w("factory", "/ˈfæktri/", "n", "nhà máy", "a building where things are made", "My uncle works in a car factory."),
          w("warehouse", "/ˈweəhaʊs/", "n", "nhà kho", "a large building for storing goods", "He works in a warehouse."),
          w("canteen", "/kænˈtiːn/", "n", "căng tin", "a place where people buy meals at work or school", "We have lunch in the canteen."),
          w("hotel", "/həʊˈtel/", "n", "khách sạn", "a building where people pay to stay", "He works at a hotel near the beach."),
          w("call centre", "/ˈkɔːl ˌsentə/", "n", "tổng đài", "a place where people answer phone calls", "She works at a call centre."),
          w("salon", "/ˈsælɒn/", "n", "tiệm làm tóc, thẩm mỹ", "a place where people get beauty treatments", "My sister works in a salon."),
          w("farm", "/fɑːm/", "n", "nông trại", "land used for growing food or animals", "They grow rice on the farm."),
          w("studio", "/ˈstjuːdiəʊ/", "n", "phòng thu, xưởng vẽ", "a room where art or films are made", "The artist works in a studio."),
          w("workshop", "/ˈwɜːkʃɒp/", "n", "xưởng", "a place where things are made or repaired", "The car is in the workshop."),
          w("workplace", "/ˈwɜːkpleɪs/", "n", "nơi làm việc", "the place where someone works", "Our workplace is very friendly."),
          w("staff room", "/ˈstɑːf ruːm/", "n", "phòng nhân viên", "a room for workers to rest", "The teachers meet in the staff room."),
          w("reception", "/rɪˈsepʃn/", "n", "quầy lễ tân", "the desk at the front of a building", "Please wait at reception."),
          w("security", "/sɪˈkjʊərəti/", "n", "nhân viên bảo vệ; an ninh", "people or systems that keep a place safe", "Security checks your bag at the door."),
          w("cleaner", "/ˈkliːnə/", "n", "nhân viên dọn dẹp", "a person who cleans a building", "The cleaner comes every morning."),
          w("laboratory", "/ləˈbɒrətri/", "n", "phòng thí nghiệm", "a room for scientific work", "The scientist works in a laboratory."),
        ],
      ),
      lesson(
        "Kỹ năng & nhiệm vụ",
        "15 từ về kỹ năng, kinh nghiệm và những việc thường làm trong công việc.",
        "Kỹ năng nghề nghiệp",
        `- **skill**: kỹ năng
- **experience**: kinh nghiệm
- **training**: đào tạo
- **communicate**: giao tiếp
- **customer**: khách hàng
- **deadline**: hạn chót

Good English is a useful **skill**.
We **communicate** by email every day.`,
        "be responsible for + việc gì: chịu trách nhiệm về việc đó.",
        [
          w("skill", "/skɪl/", "n", "kỹ năng", "the ability to do something well", "Good English is a useful skill."),
          w("experience", "/ɪkˈspɪəriəns/", "n", "kinh nghiệm", "knowledge from doing something", "She has five years of experience."),
          w("training", "/ˈtreɪnɪŋ/", "n", "đào tạo, huấn luyện", "teaching for a job", "New staff get two weeks of training."),
          w("communicate", "/kəˈmjuːnɪkeɪt/", "v", "giao tiếp", "to share information with people", "We communicate by email."),
          w("organise", "/ˈɔːɡənaɪz/", "v", "tổ chức, sắp xếp", "to plan and arrange something", "She organises the weekly meeting."),
          w("solve", "/sɒlv/", "v", "giải quyết", "to find an answer to a problem", "Our team can solve this problem."),
          w("repair", "/rɪˈpeə/", "v", "sửa chữa", "to fix something broken", "He repairs cars in the garage."),
          w("serve", "/sɜːv/", "v", "phục vụ", "to give food or help to customers", "They serve lunch from twelve to two."),
          w("customer", "/ˈkʌstəmə/", "n", "khách hàng", "a person who buys something", "The customer wants a refund."),
          w("workmates", "/ˈwɜːkmeɪts/", "n", "bạn đồng nghiệp", "people you work with", "I have lunch with my workmates."),
          w("deadline", "/ˈdedlaɪn/", "n", "hạn chót", "the time when work must finish", "The deadline is Friday at five."),
          w("meeting", "/ˈmiːtɪŋ/", "n", "cuộc họp", "a time when people talk about work", "We have a meeting every Monday."),
          w("report", "/rɪˈpɔːt/", "n/v", "báo cáo", "a written or spoken account of work", "I write a report every month."),
          w("project", "/ˈprɒdʒekt/", "n", "dự án", "a piece of work with a clear goal", "We are working on a new project."),
          w("responsible", "/rɪˈspɒnsəbl/", "adj", "có trách nhiệm", "having a duty to do something", "She is responsible for the staff."),
        ],
      ),
      lesson(
        "Tìm việc & phỏng vấn",
        "15 từ để nói về xin việc, phỏng vấn và hợp đồng lao động.",
        "Xin việc & phỏng vấn",
        `- **apply**: nộp đơn, ứng tuyển
- **CV**: sơ yếu lý lịch
- **interview**: buổi phỏng vấn
- **employer**: nhà tuyển dụng
- **employee**: nhân viên
- **contract**: hợp đồng

I want to **apply** for this job.
My **interview** is on Monday.`,
        "apply for a job — nhớ giới từ for sau apply.",
        [
          w("apply", "/əˈplaɪ/", "v", "nộp đơn, ứng tuyển", "to ask formally for a job", "I want to apply for this job."),
          w("reference", "/ˈrefrəns/", "n", "thư giới thiệu", "a letter about your work or character", "I need a reference from my old boss."),
          w("CV", "/ˌsiː ˈviː/", "n", "sơ yếu lý lịch", "a paper with your education and work history", "Write your experience in your CV."),
          w("interview", "/ˈɪntəvjuː/", "n", "buổi phỏng vấn", "a meeting to get a job", "My interview is on Monday."),
          w("employer", "/ɪmˈplɔɪə/", "n", "nhà tuyển dụng", "a person or company that pays workers", "The employer asked about my skills."),
          w("employee", "/ɪmˈplɔɪiː/", "n", "nhân viên", "a person who works for a company", "Every employee gets a uniform."),
          w("full-time", "/ˌfʊl ˈtaɪm/", "adj/adv", "toàn thời gian", "working all the usual hours of a week", "She has a full-time job."),
          w("part-time", "/ˌpɑːt ˈtaɪm/", "adj/adv", "bán thời gian", "working only some hours", "He works part-time at the weekend."),
          w("uniform", "/ˈjuːnɪfɔːm/", "n", "đồng phục", "special clothes for a job", "Nurses wear a white uniform."),
          w("shift", "/ʃɪft/", "n", "ca làm việc", "a period of work in a day", "I work the night shift."),
          w("day off", "/ˌdeɪ ˈɒf/", "n", "ngày nghỉ", "a day when you do not work", "I have a day off on Monday."),
          w("contract", "/ˈkɒntrækt/", "n", "hợp đồng", "an official paper about a job", "Please read the contract carefully."),
          w("start work", "/ˌstɑːt ˈwɜːk/", "phrase", "bắt đầu làm việc", "to begin a job", "I start work at nine."),
          w("retire", "/rɪˈtaɪə/", "v", "nghỉ hưu", "to stop working at an old age", "My father will retire next year."),
          w("unemployed", "/ˌʌnɪmˈplɔɪd/", "adj", "thất nghiệp", "not having a job", "He is unemployed at the moment."),
        ],
      ),
    ],
  },
};
