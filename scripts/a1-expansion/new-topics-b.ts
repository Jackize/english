import type { SeedVocabTopic } from "../curriculum-data";
import { lesson, w } from "./helpers";

export const NEW_TOPICS_B: SeedVocabTopic[] = [
  {
    name: "Du lịch & kỳ nghỉ",
    slug: "du-lich-ky-nghi-a1",
    icon: "flight",
    description: "Chuẩn bị hành lý, đi máy bay, nhận phòng khách sạn và xử lý sự cố khi đi du lịch.",
    lessons: [
      lesson(
        "Chuẩn bị chuyến đi",
        "15 từ và cụm từ cần biết trước khi bắt đầu một chuyến đi.",
        "Trước khi lên đường",
        `- **vacation**: kỳ nghỉ
- **excursion**: chuyến đi ngắn
- **guidebook**: sách hướng dẫn
- **backpack**: ba lô
- **checklist**: danh sách cần mang

I put my clothes in the **backpack** and check my **checklist**. The **guidebook** tells us the best places to visit.`,
        "vacation = kỳ nghỉ; excursion = chuyến đi ngắn; destination = điểm đến.",
        [
          w("vacation", "/vəˈkeɪʃn/", "n", "kỳ nghỉ", "a time when you travel for rest", "We go on vacation every summer."),
          w("excursion", "/ɪkˈskɜːʃn/", "n", "chuyến đi ngắn", "a short trip for pleasure", "The hotel offers a day excursion to the island."),
          w("tour", "/tʊə/", "n", "chuyến tham quan", "a journey to see interesting places", "We took a tour of the old city."),
          w("guidebook", "/ˈɡaɪdbʊk/", "n", "sách hướng dẫn du lịch", "a book with information for travellers", "The guidebook has a map of the city."),
          w("backpack", "/ˈbækpæk/", "n", "ba lô", "a bag carried on your back", "She packed her backpack for the trip."),
          w("packing", "/ˈpækɪŋ/", "n", "việc đóng gói hành lý", "putting things into bags for a trip", "I finished my packing last night."),
          w("book a room", "/bʊk ə ruːm/", "phrase", "đặt phòng", "to reserve a room in a hotel", "We booked a room near the beach."),
          w("travel agency", "/ˈtrævl ˌeɪdʒənsi/", "n", "công ty du lịch", "a company that arranges trips", "The travel agency booked our flight."),
          w("insurance", "/ɪnˈʃʊərəns/", "n", "bảo hiểm", "money paid to protect against problems", "Buy travel insurance before you go."),
          w("currency", "/ˈkʌrənsi/", "n", "tiền tệ", "the money used in a country", "What is the currency of Japan?"),
          w("phrasebook", "/ˈfreɪzbʊk/", "n", "sách mẫu câu", "a book of useful phrases in a language", "I use a phrasebook to learn simple words."),
          w("charger", "/ˈtʃɑːdʒə/", "n", "bộ sạc", "a device that puts power into a battery", "Don't forget your phone charger."),
          w("adapter", "/əˈdæptə/", "n", "phích chuyển đổi", "a device that connects different plugs", "You need an adapter in this country."),
          w("checklist", "/ˈtʃeklɪst/", "n", "danh sách kiểm tra", "a list of things to remember", "My checklist has tickets and passports."),
          w("destination", "/ˌdestɪˈneɪʃn/", "n", "điểm đến", "the place you are travelling to", "Da Nang is our final destination."),
        ],
      ),
      lesson(
        "Sân bay & khách sạn",
        "15 từ dùng ở sân bay và khi nhận phòng khách sạn.",
        "Đi máy bay và nhận phòng",
        `- **airline**: hãng hàng không
- **terminal**: nhà ga sân bay
- **boarding pass**: thẻ lên máy bay
- **baggage**: hành lý
- **front desk**: quầy lễ tân

Show your **boarding pass** at the gate. After the **landing**, collect your **baggage** and go to the **front desk**.`,
        "boarding pass = thẻ lên máy bay; baggage = hành lý; check-in/check out = nhận/trả phòng.",
        [
          w("airline", "/ˈeəlaɪn/", "n", "hãng hàng không", "a company that flies planes", "This airline flies to London."),
          w("terminal", "/ˈtɜːmɪnl/", "n", "nhà ga sân bay", "a building at an airport", "Our flight leaves from terminal two."),
          w("boarding pass", "/ˈbɔːdɪŋ pɑːs/", "n", "thẻ lên máy bay", "a card that lets you get on a plane", "Please show your boarding pass."),
          w("check-in", "/ˈtʃek ɪn/", "n", "quầy làm thủ tục", "the place where you register at a hotel or airport", "The check-in desk opens at six."),
          w("take-off", "/ˈteɪk ɒf/", "n", "sự cất cánh", "the moment a plane leaves the ground", "The take-off was smooth."),
          w("landing", "/ˈlændɪŋ/", "n", "sự hạ cánh", "the moment a plane reaches the ground", "We had a safe landing."),
          w("passport control", "/ˈpɑːspɔːt kənˈtrəʊl/", "n", "kiểm soát hộ chiếu", "the place where officials check passports", "We waited at passport control."),
          w("baggage", "/ˈbæɡɪdʒ/", "n", "hành lý", "the bags you take on a journey", "My baggage is very heavy."),
          w("front desk", "/ˌfrʌnt ˈdesk/", "n", "quầy lễ tân", "the desk where hotel guests get help", "Ask for a map at the front desk."),
          w("reservation", "/ˌrezəˈveɪʃn/", "n", "sự đặt chỗ", "an arrangement to keep a room for you", "I have a reservation for two nights."),
          w("key card", "/ˈkiː kɑːd/", "n", "thẻ phòng", "a card that opens your hotel room", "My key card does not work."),
          w("single room", "/ˈsɪŋɡl ruːm/", "n", "phòng đơn", "a room for one person", "I would like a single room, please."),
          w("double room", "/ˈdʌbl ruːm/", "n", "phòng đôi", "a room for two people", "They booked a double room."),
          w("breakfast included", "/ˈbrekfəst ɪnˈkluːdɪd/", "phrase", "đã bao gồm bữa sáng", "breakfast is part of the price", "The room has breakfast included."),
          w("check out", "/tʃek aʊt/", "phr v", "trả phòng", "to leave a hotel and pay", "We check out before noon."),
        ],
      ),
      lesson(
        "Tham quan & hoạt động",
        "15 từ về các hoạt động tham quan và trải nghiệm khi đi du lịch.",
        "Khám phá nơi mới",
        `- **sightseeing**: việc ngắm cảnh
- **tourist**: khách du lịch
- **landmark**: địa danh nổi tiếng
- **souvenir**: quà lưu niệm
- **attraction**: điểm thu hút

We go **sightseeing** in the morning and buy a **souvenir** in the afternoon. The old tower is a famous **landmark**.`,
        "sightseeing = ngắm cảnh; souvenir = quà lưu niệm; attraction = điểm tham quan.",
        [
          w("sightseeing", "/ˈsaɪtsiːɪŋ/", "n", "việc ngắm cảnh", "visiting interesting places", "We went sightseeing around the old town."),
          w("tourist", "/ˈtʊərɪst/", "n", "khách du lịch", "a person who travels for pleasure", "Many tourists visit this beach."),
          w("guide", "/ɡaɪd/", "n", "hướng dẫn viên", "a person who shows you a place", "Our guide told us about the temple."),
          w("landmark", "/ˈlændmɑːk/", "n", "địa danh nổi tiếng", "a famous building or place", "The bridge is a landmark of the city."),
          w("souvenir", "/ˌsuːvəˈnɪə/", "n", "quà lưu niệm", "something you buy to remember a place", "I bought a small souvenir for my sister."),
          w("photograph", "/ˈfəʊtəɡrɑːf/", "n", "bức ảnh", "a picture taken with a camera", "She took a photograph of the lake."),
          w("explore", "/ɪkˈsplɔː/", "v", "khám phá", "to travel around and learn about a place", "We explored the narrow streets."),
          w("adventure", "/ədˈventʃə/", "n", "cuộc phiêu lưu", "an exciting experience", "The trip was a real adventure."),
          w("cruise", "/kruːz/", "n", "chuyến du thuyền", "a holiday on a large boat", "They went on a cruise in the summer."),
          w("hike", "/haɪk/", "v", "đi bộ đường dài", "to walk a long way in the countryside", "We hike in the mountains every year."),
          w("swim", "/swɪm/", "v", "bơi", "to move through water", "Children swim in the hotel pool."),
          w("sunbathe", "/ˈsʌnbeɪð/", "v", "tắm nắng", "to sit in the sun to get brown", "She likes to sunbathe on the beach."),
          w("rent a bike", "/rent ə baɪk/", "phrase", "thuê xe đạp", "to pay to use a bike for a time", "We rent a bike to explore the town."),
          w("ticket office", "/ˈtɪkɪt ˌɒfɪs/", "n", "quầy bán vé", "a place where you buy tickets", "Buy your tickets at the ticket office."),
          w("attraction", "/əˈtrækʃn/", "n", "điểm thu hút", "a place that many visitors like", "The museum is a popular attraction."),
        ],
      ),
      lesson(
        "Sự cố & kỷ niệm",
        "15 từ về những vấn đề có thể gặp và kỷ niệm đáng nhớ trong chuyến đi.",
        "Khi mọi thứ không như ý",
        `- **missing**: bị thất lạc
- **delayed**: bị hoãn
- **cancelled**: bị huỷ
- **refund**: tiền hoàn lại
- **unforgettable**: đáng nhớ

Our flight was **delayed**, and then it was **cancelled**. The airline gave us a **refund**.`,
        "delayed = bị hoãn; cancelled = bị huỷ; refund = hoàn tiền; lost property = nơi nhận đồ thất lạc.",
        [
          w("missing", "/ˈmɪsɪŋ/", "adj", "bị thất lạc", "lost and not found", "My suitcase is missing."),
          w("delayed", "/dɪˈleɪd/", "adj", "bị hoãn", "happening later than planned", "The train was delayed by an hour."),
          w("cancelled", "/ˈkænsld/", "adj", "bị huỷ", "stopped from happening", "Our flight was cancelled."),
          w("missed", "/mɪst/", "adj", "bị lỡ", "not caught or reached in time", "I missed the last bus."),
          w("broken", "/ˈbrəʊkən/", "adj", "bị hỏng", "not working or in pieces", "The key card is broken."),
          w("theft", "/θeft/", "n", "trộm cắp", "the crime of stealing", "Report the theft to the police."),
          w("emergency", "/ɪˈmɜːdʒənsi/", "n", "tình huống khẩn cấp", "a dangerous situation needing fast action", "Call this number in an emergency."),
          w("consulate", "/ˈkɒnsjələt/", "n", "lãnh sự quán", "the office that helps people from another country", "We asked the consulate for help."),
          w("complaint", "/kəmˈpleɪnt/", "n", "lời phàn nàn", "a statement that you are not happy", "She made a complaint about the room."),
          w("refund", "/ˈriːfʌnd/", "n", "tiền hoàn lại", "money returned to you", "I got a refund for the cancelled tour."),
          w("lost property", "/ˌlɒst ˈprɒpəti/", "n", "nơi nhận đồ thất lạc", "a place where lost things are kept", "Ask at lost property for your bag."),
          w("sunburn", "/ˈsʌnbɜːn/", "n", "cháy nắng", "red painful skin from too much sun", "He got sunburn on the beach."),
          w("stomach upset", "/ˈstʌmək ʌpˈset/", "n", "đau bụng nhẹ", "a slight problem with your stomach", "I had a stomach upset after dinner."),
          w("memory", "/ˈmeməri/", "n", "kỷ niệm", "something you remember", "The trip is a happy memory."),
          w("unforgettable", "/ˌʌnfəˈɡetəbl/", "adj", "đáng nhớ", "impossible to forget", "It was an unforgettable holiday."),
        ],
      ),
    ],
  },
  {
    name: "Công nghệ & thiết bị",
    slug: "cong-nghe-thiet-bi",
    icon: "devices",
    description: "Thiết bị hằng ngày, điện thoại, máy tính, internet và cách dùng công nghệ an toàn.",
    lessons: [
      lesson(
        "Thiết bị hằng ngày",
        "15 thiết bị công nghệ quen thuộc trong gia đình và trường học.",
        "Thiết bị quanh ta",
        `- **smartphone**: điện thoại thông minh
- **laptop**: máy tính xách tay
- **tablet**: máy tính bảng
- **battery**: pin
- **screen**: màn hình

I use my **laptop** for homework and my **smartphone** for calls. The **battery** is low, so I need a charger.`,
        "smartphone = điện thoại thông minh; tablet = máy tính bảng; touchpad = bàn di chuột.",
        [
          w("phone", "/fəʊn/", "n", "điện thoại", "a device used to call people", "My phone is on the table."),
          w("smartphone", "/ˈsmɑːtfəʊn/", "n", "điện thoại thông minh", "a phone that can use apps", "She takes photos with her smartphone."),
          w("computer", "/kəmˈpjuːtə/", "n", "máy tính", "an electronic machine for work and games", "The computer is in the study."),
          w("laptop", "/ˈlæptɒp/", "n", "máy tính xách tay", "a small computer you can carry", "I do my homework on a laptop."),
          w("tablet", "/ˈtæblət/", "n", "máy tính bảng", "a flat computer with a touch screen", "He reads books on his tablet."),
          w("television", "/ˈtelɪvɪʒn/", "n", "tivi", "a device for watching programmes", "We watch television after dinner."),
          w("radio", "/ˈreɪdiəʊ/", "n", "đài radio", "a device that receives sound programmes", "My father listens to the radio."),
          w("speaker", "/ˈspiːkə/", "n", "loa", "a device that makes sound", "The speaker is very loud."),
          w("headphone", "/ˈhedfəʊn/", "n", "tai nghe", "a device you wear to listen", "She listens to music with a headphone."),
          w("battery", "/ˈbætri/", "n", "pin", "a device that stores power", "My phone battery is low."),
          w("screen", "/skriːn/", "n", "màn hình", "the flat part you look at", "The screen is too bright."),
          w("keyboard", "/ˈkiːbɔːd/", "n", "bàn phím", "the part with keys for typing", "I type on the keyboard."),
          w("touchpad", "/ˈtʌtʃpæd/", "n", "bàn di chuột", "a flat area used to move the cursor", "Use the touchpad to click."),
          w("webcam", "/ˈwebkæm/", "n", "camera web", "a camera for video calls", "We talked through the webcam."),
          w("printer", "/ˈprɪntə/", "n", "máy in", "a machine that prints on paper", "The printer is out of paper."),
        ],
      ),
      lesson(
        "Điện thoại & máy tính",
        "15 từ về các thao tác trên điện thoại và máy tính.",
        "Gọi điện và dùng máy tính",
        `- **message**: tin nhắn
- **download**: tải xuống
- **upload**: tải lên
- **password**: mật khẩu
- **save**: lưu

I **download** the file and **save** it on my laptop. Please send me a **message** when you finish.`,
        "download = tải xuống; upload = tải lên; log out = đăng xuất; save = lưu.",
        [
          w("call", "/kɔːl/", "v", "gọi điện", "to phone someone", "I call my grandmother every Sunday."),
          w("text", "/tekst/", "v", "nhắn tin", "to send a written message by phone", "She texts me every morning."),
          w("message", "/ˈmesɪdʒ/", "n", "tin nhắn", "a short written note sent to someone", "I got your message."),
          w("dial", "/ˈdaɪəl/", "v", "bấm số, gọi", "to enter a number to make a call", "Dial this number for help."),
          w("reply", "/rɪˈplaɪ/", "v", "trả lời", "to answer someone", "Please reply to my email."),
          w("hang up", "/hæŋ ʌp/", "phr v", "cúp máy", "to end a phone call", "Don't hang up yet."),
          w("download", "/ˌdaʊnˈləʊd/", "v", "tải xuống", "to copy a file from the internet", "I download music every week."),
          w("upload", "/ˌʌpˈləʊd/", "v", "tải lên", "to send a file to the internet", "He uploads photos to the website."),
          w("install", "/ɪnˈstɔːl/", "v", "cài đặt", "to put a program on a device", "I want to install this app."),
          w("app", "/æp/", "n", "ứng dụng", "a program on a phone", "This app helps me learn English."),
          w("password", "/ˈpɑːswɜːd/", "n", "mật khẩu", "a secret word that lets you enter", "Use a strong password."),
          w("username", "/ˈjuːzəneɪm/", "n", "tên đăng nhập", "the name you use on a website", "Enter your username here."),
          w("file", "/faɪl/", "n", "tệp, tập tin", "a saved document or picture", "I sent the file by email."),
          w("email", "/ˈiːmeɪl/", "n", "thư điện tử", "a message sent by computer", "I check my email every day."),
          w("save", "/seɪv/", "v", "lưu", "to keep work in a computer", "Save your work before you go."),
        ],
      ),
      lesson(
        "Internet & mạng xã hội",
        "15 từ về internet, tìm kiếm và mạng xã hội.",
        "Lên mạng và kết nối",
        `- **internet**: mạng internet
- **website**: trang web
- **online**: trực tuyến
- **wifi**: mạng không dây
- **social media**: mạng xã hội

We use **wifi** at home to go **online**. This **website** has videos for English learners.`,
        "online = trực tuyến; wifi = mạng không dây; social media = mạng xã hội.",
        [
          w("internet", "/ˈɪntənet/", "n", "mạng internet", "the system that connects computers", "The internet is slow today."),
          w("website", "/ˈwebsaɪt/", "n", "trang web", "a set of pages on the internet", "Our school has a new website."),
          w("online", "/ˌɒnˈlaɪn/", "adj", "trực tuyến", "connected to the internet", "I buy my books online."),
          w("wifi", "/ˈwaɪfaɪ/", "n", "mạng không dây", "a way to connect to the internet without wires", "What is the wifi password?"),
          w("search", "/sɜːtʃ/", "v", "tìm kiếm", "to look for information", "Search for the word in a dictionary."),
          w("click", "/klɪk/", "v", "nhấp chuột", "to press a button on a mouse", "Click the link to open the page."),
          w("link", "/lɪŋk/", "n", "liên kết", "text that opens another page", "Send me the link to the video."),
          w("post", "/pəʊst/", "v", "đăng tải", "to put something on a website", "She posts photos of her food."),
          w("share", "/ʃeə/", "v", "chia sẻ", "to give something to others online", "I share the video with my friends."),
          w("like", "/laɪk/", "v", "thích (nút like)", "to show you enjoy a post", "Many people like her photo."),
          w("comment", "/ˈkɒment/", "n", "bình luận", "a written opinion about a post", "He left a nice comment."),
          w("follow", "/ˈfɒləʊ/", "v", "theo dõi", "to see someone's new posts", "I follow a famous singer."),
          w("video", "/ˈvɪdiəʊ/", "n", "video", "a recording with moving pictures", "We watched a short video."),
          w("chat", "/tʃæt/", "v", "trò chuyện trực tuyến", "to talk with someone online", "We chat every evening."),
          w("social media", "/ˌsəʊʃl ˈmiːdiə/", "n", "mạng xã hội", "websites where people share posts", "Teenagers use social media a lot."),
        ],
      ),
      lesson(
        "An toàn & sử dụng",
        "15 từ về an toàn và cách dùng công nghệ cân bằng.",
        "Dùng công nghệ an toàn",
        `- **virus**: vi-rút máy tính
- **scam**: lừa đảo
- **privacy**: quyền riêng tư
- **screen time**: thời gian dùng màn hình
- **block**: chặn

Do not open a strange link because it may be a **scam**. Keep your **privacy** safe and **block** bad websites.`,
        "scam = lừa đảo; privacy = quyền riêng tư; screen time = thời gian dùng màn hình.",
        [
          w("virus", "/ˈvaɪrəs/", "n", "vi-rút máy tính", "a program that damages computers", "The virus deleted my files."),
          w("scam", "/skæm/", "n", "lừa đảo", "a dishonest plan to get money", "That email is a scam."),
          w("hack", "/hæk/", "v", "xâm nhập máy tính", "to enter a computer without permission", "Someone tried to hack my account."),
          w("privacy", "/ˈprɪvəsi/", "n", "quyền riêng tư", "keeping your personal information safe", "Check your privacy settings."),
          w("safe", "/seɪf/", "adj", "an toàn", "not in danger", "This website is safe to use."),
          w("danger", "/ˈdeɪndʒə/", "n", "nguy hiểm", "a chance of harm", "There is danger in sharing passwords."),
          w("screen time", "/ˈskriːn taɪm/", "n", "thời gian dùng màn hình", "time spent looking at a screen", "Children need less screen time."),
          w("addicted", "/əˈdɪktɪd/", "adj", "nghiện", "unable to stop doing something", "He is addicted to video games."),
          w("balance", "/ˈbæləns/", "n", "sự cân bằng", "a good mixture of activities", "Try to balance study and rest."),
          w("protect", "/prəˈtekt/", "v", "bảo vệ", "to keep someone or something safe", "Protect your phone with a password."),
          w("update", "/ˌʌpˈdeɪt/", "v", "cập nhật", "to make something more modern", "Update the app every month."),
          w("log out", "/lɒɡ aʊt/", "phr v", "đăng xuất", "to leave a website or account", "Always log out on a public computer."),
          w("delete", "/dɪˈliːt/", "v", "xoá", "to remove a file or message", "Delete that strange email."),
          w("warn", "/wɔːn/", "v", "cảnh báo", "to tell someone about danger", "The app warns me about bad links."),
          w("block", "/blɒk/", "v", "chặn", "to stop someone from contacting you", "Block the person who sends spam."),
        ],
      ),
    ],
  },
  {
    name: "Lễ hội & truyền thống",
    slug: "le-hoi-truyen-thong",
    icon: "celebration",
    description: "Ngày lễ, phong tục, trang trí và lời chúc trong các dịp lễ hội Việt Nam và thế giới.",
    lessons: [
      lesson(
        "Ngày lễ & lễ hội",
        "15 từ về những ngày lễ và lễ hội quen thuộc.",
        "Những dịp đặc biệt",
        `- **festival**: lễ hội
- **celebration**: lễ kỷ niệm
- **parade**: cuộc diễu hành
- **fireworks**: pháo hoa
- **lantern**: đèn lồng

Tet is the biggest **festival** in Vietnam. We watch **fireworks** and carry a **lantern** during the **celebration**.`,
        "festival = lễ hội; parade = diễu hành; fireworks = pháo hoa; lantern = đèn lồng.",
        [
          w("festival", "/ˈfestɪvl/", "n", "lễ hội", "a special time for celebration", "The flower festival is in spring."),
          w("celebration", "/ˌselɪˈbreɪʃn/", "n", "lễ kỷ niệm", "a party or event for something special", "The celebration lasts three days."),
          w("New Year", "/ˌnjuː ˈjɪə/", "n", "năm mới", "the first day of the year", "We visit family at New Year."),
          w("Tet", "/tet/", "n", "Tết", "the Vietnamese New Year festival", "Tet is a time for family."),
          w("Christmas", "/ˈkrɪsməs/", "n", "Giáng sinh", "a Christian festival in December", "Children get gifts at Christmas."),
          w("Mid-Autumn", "/ˌmɪd ˈɔːtəm/", "n", "Trung thu", "a festival in the middle of autumn", "Children carry lanterns at Mid-Autumn."),
          w("parade", "/pəˈreɪd/", "n", "cuộc diễu hành", "a line of people moving through the street", "The parade goes through the town."),
          w("fireworks", "/ˈfaɪəwɜːks/", "n", "pháo hoa", "colourful lights that explode in the sky", "We watch fireworks at midnight."),
          w("costume", "/ˈkɒstjuːm/", "n", "trang phục", "special clothes for a festival", "She wears a beautiful costume."),
          w("traditional", "/trəˈdɪʃənl/", "adj", "truyền thống", "following old customs", "We eat traditional food at Tet."),
          w("custom", "/ˈkʌstəm/", "n", "phong tục", "a usual way of doing things", "Giving lucky money is a custom."),
          w("ceremony", "/ˈserəməni/", "n", "nghi lễ", "a formal event with traditions", "The ceremony starts at eight."),
          w("lucky money", "/ˌlʌki ˈmʌni/", "n", "tiền lì xì", "money given in red envelopes at Tet", "Children receive lucky money."),
          w("mooncake", "/ˈmuːnkeɪk/", "n", "bánh trung thu", "a round cake eaten at Mid-Autumn", "We share a mooncake with tea."),
          w("lantern", "/ˈlæntən/", "n", "đèn lồng", "a light inside a paper or glass cover", "The lantern is red and gold."),
        ],
      ),
      lesson(
        "Phong tục & nghi lễ",
        "15 từ về phong tục thờ cúng và nghi lễ truyền thống.",
        "Phong tục và nghi lễ",
        `- **gift**: món quà
- **incense**: hương
- **ancestor**: tổ tiên
- **worship**: thờ cúng
- **offering**: lễ vật

We light **incense** to **worship** our **ancestors**. The family prepares an **offering** of fruit and flowers.`,
        "ancestor = tổ tiên; worship = thờ cúng; offering = lễ vật; reunion = sum họp.",
        [
          w("gift", "/ɡɪft/", "n", "món quà", "something you give to someone", "She gave me a small gift."),
          w("envelope", "/ˈenvələʊp/", "n", "phong bì", "a paper cover for a letter or money", "Put the money in an envelope."),
          w("incense", "/ˈɪnsens/", "n", "hương", "a stick that burns with a sweet smell", "We light incense at the altar."),
          w("ancestor", "/ˈænsestə/", "n", "tổ tiên", "a family member from long ago", "The family respects its ancestors."),
          w("worship", "/ˈwɜːʃɪp/", "v", "thờ cúng", "to show respect to a god or ancestor", "They worship at the temple."),
          w("temple", "/ˈtempl/", "n", "đền, chùa", "a building for worship", "The temple is on the hill."),
          w("pagoda", "/pəˈɡəʊdə/", "n", "chùa", "a temple with tall towers", "We visited an old pagoda."),
          w("prayer", "/preə/", "n", "lời cầu nguyện", "words spoken to a god", "She says a prayer every night."),
          w("blessing", "/ˈblesɪŋ/", "n", "phúc lành", "good wishes or help from a god", "The old man gives us his blessing."),
          w("ritual", "/ˈrɪtʃuəl/", "n", "nghi thức", "a set of traditional actions", "The ritual takes place in the morning."),
          w("decorate", "/ˈdekəreɪt/", "v", "trang trí", "to make something look attractive", "We decorate the house for Tet."),
          w("reunion", "/ˌriːˈjuːniən/", "n", "sự sum họp", "a meeting of family after a long time", "Tet is a family reunion."),
          w("feast", "/fiːst/", "n", "bữa tiệc lớn", "a large special meal", "They prepared a feast for the guests."),
          w("respect", "/rɪˈspekt/", "n", "sự kính trọng", "a good opinion of someone", "We show respect to old people."),
          w("offering", "/ˈɒfərɪŋ/", "n", "lễ vật", "something given to a god or ancestor", "The offering includes fruit and flowers."),
        ],
      ),
      lesson(
        "Trang trí & hoạt động",
        "15 từ về trang trí và các hoạt động trong lễ hội.",
        "Trang trí và biểu diễn",
        `- **decoration**: đồ trang trí
- **peach blossom**: hoa đào
- **apricot blossom**: hoa mai
- **dragon dance**: múa rồng
- **performance**: màn biểu diễn

We put **peach blossom** and **apricot blossom** at home. The **dragon dance** is the best **performance** at the festival.`,
        "peach blossom = hoa đào; apricot blossom = hoa mai; dragon/lion dance = múa rồng/lân.",
        [
          w("decoration", "/ˌdekəˈreɪʃn/", "n", "đồ trang trí", "something used to make a place pretty", "The decorations are red and gold."),
          w("garland", "/ˈɡɑːlənd/", "n", "vòng hoa", "a ring of flowers for decoration", "They hung a garland above the door."),
          w("peach blossom", "/piːtʃ ˈblɒsəm/", "n", "hoa đào", "pink flowers used at Tet", "Peach blossom brings luck at Tet."),
          w("apricot blossom", "/ˈeɪprɪkɒt ˈblɒsəm/", "n", "hoa mai", "yellow flowers used at Tet", "Apricot blossom is popular in the south."),
          w("gong", "/ɡɒŋ/", "n", "cồng chiêng", "a large metal drum that makes a deep sound", "Someone is playing the gong."),
          w("dragon dance", "/ˈdræɡən dɑːns/", "n", "múa rồng", "a dance with a long dragon puppet", "The dragon dance is very exciting."),
          w("lion dance", "/ˈlaɪən dɑːns/", "n", "múa lân", "a dance with a lion costume", "We watch the lion dance in the street."),
          w("firecracker", "/ˈfaɪəkrækə/", "n", "pháo", "a small firework that makes a loud noise", "The firecracker made a loud sound."),
          w("ribbon", "/ˈrɪbən/", "n", "dải ruy băng", "a long thin piece of cloth", "She ties a ribbon in her hair."),
          w("mask", "/mɑːsk/", "n", "mặt nạ", "a cover for your face", "The child wears a colourful mask."),
          w("float", "/fləʊt/", "n", "xe diễu hành", "a decorated vehicle in a parade", "The float has flowers all over it."),
          w("crowd", "/kraʊd/", "n", "đám đông", "a large group of people", "A big crowd watched the parade."),
          w("stage", "/steɪdʒ/", "n", "sân khấu", "a place where people perform", "The singers are on the stage."),
          w("performance", "/pəˈfɔːməns/", "n", "màn biểu diễn", "a show for an audience", "The performance starts at seven."),
          w("lively", "/ˈlaɪvli/", "adj", "sôi động", "full of energy and activity", "The streets are lively at Tet."),
        ],
      ),
      lesson(
        "Lời chúc & quà tặng",
        "15 từ dùng khi chúc mừng, tặng quà và mời khách trong dịp lễ.",
        "Chúc mừng và tặng quà",
        `- **wish**: lời chúc
- **good luck**: chúc may mắn
- **prosperity**: thịnh vượng
- **present**: món quà
- **invitation**: lời mời

We **wish** you health and **prosperity** in the new year. She gave me a **present** and a card with her **invitation**.`,
        "good luck = chúc may mắn; prosperity = thịnh vượng; red envelope = phong bì đỏ.",
        [
          w("wish", "/wɪʃ/", "v", "chúc", "to hope for good things for someone", "I wish you a happy new year."),
          w("greeting", "/ˈɡriːtɪŋ/", "n", "lời chào", "words you say when you meet someone", "He sends a warm greeting to everyone."),
          w("good luck", "/ˌɡʊd ˈlʌk/", "phrase", "chúc may mắn", "words hoping things go well", "Good luck with your exam!"),
          w("prosperity", "/prɒˈsperəti/", "n", "sự thịnh vượng", "success and wealth", "We wish you health and prosperity."),
          w("wealth", "/welθ/", "n", "sự giàu có", "a large amount of money", "The New Year wish includes wealth."),
          w("happiness", "/ˈhæpinəs/", "n", "niềm vui, hạnh phúc", "the feeling of being happy", "I wish you happiness and health."),
          w("present", "/ˈpreznt/", "n", "món quà", "something you give to someone", "This present is for my mother."),
          w("wrap", "/ræp/", "v", "gói quà", "to cover a present with paper", "I wrap the gift in red paper."),
          w("bouquet", "/buˈkeɪ/", "n", "bó hoa", "a bunch of flowers", "He gave her a bouquet of roses."),
          w("red envelope", "/ˌred ˈenvələʊp/", "n", "phong bì đỏ", "a red packet with lucky money", "Children receive a red envelope at Tet."),
          w("celebrate", "/ˈselɪbreɪt/", "v", "ăn mừng", "to do something special for a happy event", "We celebrate Tet with our family."),
          w("invitation", "/ˌɪnvɪˈteɪʃn/", "n", "lời mời", "a request to come to an event", "I got an invitation to the party."),
          w("guest", "/ɡest/", "n", "khách", "a person you invite to your home", "We have many guests at Tet."),
          w("party", "/ˈpɑːti/", "n", "bữa tiệc", "a social event with food and music", "The party is at my house."),
          w("special", "/ˈspeʃl/", "adj", "đặc biệt", "not ordinary", "Tet is a special time of year."),
        ],
      ),
    ],
  },
  {
    name: "Môi trường & cuộc sống xanh",
    slug: "moi-truong-song-xanh",
    icon: "eco",
    description: "Rác thải, năng lượng, thời tiết cực đoan và những hành động bảo vệ môi trường.",
    lessons: [
      lesson(
        "Rác thải & tái chế",
        "15 từ về rác thải, vật liệu và tái chế.",
        "Giảm rác và tái chế",
        `- **rubbish**: rác
- **litter**: rác vụn
- **plastic**: nhựa
- **recycle**: tái chế
- **environment**: môi trường

Put the **plastic** and **metal** in the bin so we can **recycle** them. **Litter** on the street harms the **environment**.`,
        "rubbish = rác; litter = rác vụn; recycle = tái chế; dustbin = thùng rác.",
        [
          w("rubbish", "/ˈrʌbɪʃ/", "n", "rác", "things you throw away", "Please take out the rubbish."),
          w("litter", "/ˈlɪtə/", "n", "rác vụn", "small pieces of rubbish in public", "Do not drop litter in the park."),
          w("plastic", "/ˈplæstɪk/", "n", "nhựa", "a light man-made material", "This bottle is made of plastic."),
          w("cardboard", "/ˈkɑːdbɔːd/", "n", "bìa cứng", "thick brown paper for boxes", "We recycle cardboard boxes."),
          w("tin", "/tɪn/", "n", "hộp thiếc", "a metal container for food", "Put the empty tin in the bin."),
          w("metal", "/ˈmetl/", "n", "kim loại", "a hard material like iron", "The old metal can be recycled."),
          w("recycle", "/ˌriːˈsaɪkl/", "v", "tái chế", "to use old things again", "We recycle paper and glass."),
          w("reuse", "/ˌriːˈjuːz/", "v", "tái sử dụng", "to use something again", "Reuse your shopping bag."),
          w("reduce", "/rɪˈdjuːs/", "v", "giảm bớt", "to make less", "We should reduce plastic waste."),
          w("dustbin", "/ˈdʌstbɪn/", "n", "thùng rác", "a container for rubbish", "Throw the rubbish in the dustbin."),
          w("sack", "/sæk/", "n", "bao tải", "a large strong bag", "The rubbish goes in a black sack."),
          w("clean up", "/kliːn ʌp/", "phr v", "dọn sạch", "to remove dirt or rubbish", "We clean up the beach every month."),
          w("pollution", "/pəˈluːʃn/", "n", "sự ô nhiễm", "dirt that harms air or water", "Air pollution is a big problem."),
          w("waste", "/weɪst/", "n", "chất thải", "unwanted material", "The factory must not throw waste into the river."),
          w("environment", "/ɪnˈvaɪrənmənt/", "n", "môi trường", "the natural world around us", "We must protect the environment."),
        ],
      ),
      lesson(
        "Nước & năng lượng",
        "15 từ về nguồn nước, năng lượng và cách tiết kiệm.",
        "Tiết kiệm nước và năng lượng",
        `- **electricity**: điện
- **energy**: năng lượng
- **solar**: mặt trời
- **renewable**: tái tạo
- **switch off**: tắt

**Solar** power is a clean source of **energy**. Please **switch off** the light and save **electricity**.`,
        "electricity = điện; solar = năng lượng mặt trời; renewable = tái tạo; conserve = tiết kiệm.",
        [
          w("electricity", "/ɪˌlekˈtrɪsəti/", "n", "điện", "power used for lights and machines", "We use less electricity in summer."),
          w("energy", "/ˈenədʒi/", "n", "năng lượng", "power from the sun, wind or fuel", "Solar energy is clean."),
          w("solar", "/ˈsəʊlə/", "adj", "thuộc mặt trời", "using power from the sun", "The house has solar panels."),
          w("hydropower", "/ˈhaɪdrəʊpaʊə/", "n", "thuỷ điện", "electricity made from moving water", "Hydropower comes from the river."),
          w("conserve", "/kənˈsɜːv/", "v", "tiết kiệm, bảo tồn", "to use less of something", "We conserve water in the dry season."),
          w("switch off", "/swɪtʃ ɒf/", "phr v", "tắt", "to turn off a light or machine", "Switch off the fan when you leave."),
          w("tap", "/tæp/", "n", "vòi nước", "a device that lets water out", "Turn off the tap after washing."),
          w("bulb", "/bʌlb/", "n", "bóng đèn", "the glass part of a lamp", "This bulb uses little power."),
          w("power", "/ˈpaʊə/", "n", "điện năng", "energy used to make machines work", "The storm cut the power."),
          w("fuel", "/ˈfjuːəl/", "n", "nhiên liệu", "material burned for energy", "Cars use a lot of fuel."),
          w("coal", "/kəʊl/", "n", "than đá", "a black rock burned for heat", "Coal is not a clean fuel."),
          w("gas", "/ɡæs/", "n", "khí đốt", "a fuel used for cooking and heating", "We cook with gas."),
          w("renewable", "/rɪˈnjuːəbl/", "adj", "tái tạo", "able to be replaced naturally", "Wind is a renewable energy source."),
          w("windmill", "/ˈwɪndmɪl/", "n", "cối xay gió", "a machine that uses wind power", "The old windmill stands on the hill."),
          w("generator", "/ˈdʒenəreɪtə/", "n", "máy phát điện", "a machine that makes electricity", "The generator starts when power is lost."),
        ],
      ),
      lesson(
        "Thời tiết cực đoan",
        "15 từ về thiên tai và thời tiết nguy hiểm.",
        "Thiên tai và cảnh báo",
        `- **flood**: lũ lụt
- **typhoon**: bão lớn
- **drought**: hạn hán
- **earthquake**: động đất
- **climate change**: biến đổi khí hậu

A **flood** can **destroy** roads and homes. The **warning** tells people to leave before the **typhoon** arrives.`,
        "flood = lũ; typhoon = bão nhiệt đới; drought = hạn hán; landslide = sạt lở.",
        [
          w("flood", "/flʌd/", "n", "lũ lụt", "a large amount of water over dry land", "The flood covered the streets."),
          w("typhoon", "/taɪˈfuːn/", "n", "bão lớn", "a very strong tropical storm", "The typhoon hit the coast at night."),
          w("drought", "/draʊt/", "n", "hạn hán", "a long time with no rain", "The drought killed many plants."),
          w("heat", "/hiːt/", "n", "cái nóng", "high temperature", "The heat is strong at noon."),
          w("fire", "/ˈfaɪə/", "n", "đám cháy", "flames that burn things", "Dry weather can start a forest fire."),
          w("earthquake", "/ˈɜːθkweɪk/", "n", "động đất", "a shaking of the ground", "The earthquake damaged some houses."),
          w("tsunami", "/tsuːˈnɑːmi/", "n", "sóng thần", "a huge wave after an earthquake", "The tsunami warning came early."),
          w("hurricane", "/ˈhʌrɪkən/", "n", "bão cuồng phong", "a violent storm with strong winds", "The hurricane moved across the sea."),
          w("landslide", "/ˈlændslaɪd/", "n", "sạt lở đất", "rock and earth falling down a hill", "Heavy rain caused a landslide."),
          w("damage", "/ˈdæmɪdʒ/", "n", "thiệt hại", "harm to things", "The storm caused great damage."),
          w("destroy", "/dɪˈstrɔɪ/", "v", "phá huỷ", "to damage something completely", "The fire destroyed the old house."),
          w("dangerous", "/ˈdeɪndʒərəs/", "adj", "nguy hiểm", "likely to cause harm", "It is dangerous to drive in a storm."),
          w("warning", "/ˈwɔːnɪŋ/", "n", "cảnh báo", "a message about possible danger", "We heard a flood warning on the radio."),
          w("rescue", "/ˈreskjuː/", "v", "cứu hộ", "to save someone from danger", "The team helped rescue the family."),
          w("climate change", "/ˈklaɪmət tʃeɪndʒ/", "n", "biến đổi khí hậu", "long-term changes in world weather", "Climate change brings more floods."),
        ],
      ),
      lesson(
        "Hành động bảo vệ môi trường",
        "15 từ về những việc mỗi người có thể làm để bảo vệ hành tinh.",
        "Cùng nhau sống xanh",
        `- **plant a tree**: trồng cây
- **preserve**: gìn giữ
- **wildlife**: động vật hoang dã
- **eco-friendly**: thân thiện môi trường
- **volunteer**: tình nguyện

We **plant a tree** at school and **volunteer** for a clean-up day. Small **action** can make a big **difference**.`,
        "preserve = gìn giữ; wildlife = động vật hoang dã; eco-friendly = thân thiện với môi trường.",
        [
          w("plant a tree", "/plɑːnt ə triː/", "phrase", "trồng cây", "to put a young tree in the ground", "We plant a tree every spring."),
          w("preserve", "/prɪˈzɜːv/", "v", "gìn giữ, bảo tồn", "to keep something safe for the future", "We must preserve the forest."),
          w("nature", "/ˈneɪtʃə/", "n", "thiên nhiên", "the natural world", "We enjoy nature on the weekend."),
          w("wildlife", "/ˈwaɪldlaɪf/", "n", "động vật hoang dã", "wild animals and plants", "The park is home to much wildlife."),
          w("eco-friendly", "/ˌiːkəʊ ˈfrendli/", "adj", "thân thiện môi trường", "not harmful to the environment", "This bag is eco-friendly."),
          w("volunteer", "/ˌvɒlənˈtɪə/", "v", "tình nguyện", "to work without being paid", "Students volunteer to clean the beach."),
          w("campaign", "/kæmˈpeɪn/", "n", "chiến dịch", "a planned group of actions", "The campaign asks people to save water."),
          w("community", "/kəˈmjuːnəti/", "n", "cộng đồng", "the people who live in one area", "The whole community joined the clean-up."),
          w("future", "/ˈfjuːtʃə/", "n", "tương lai", "the time that will come", "We protect the planet for the future."),
          w("action", "/ˈækʃn/", "n", "hành động", "something that you do", "We need action, not just words."),
          w("aware", "/əˈweə/", "adj", "có ý thức", "knowing about something", "People are more aware of pollution."),
          w("responsibility", "/rɪˌspɒnsəˈbɪləti/", "n", "trách nhiệm", "a duty you should do", "Looking after nature is our responsibility."),
          w("impact", "/ˈɪmpækt/", "n", "tác động", "a strong effect", "Plastic has a bad impact on the sea."),
          w("global", "/ˈɡləʊbl/", "adj", "toàn cầu", "affecting the whole world", "Climate change is a global problem."),
          w("sustainable", "/səˈsteɪnəbl/", "adj", "bền vững", "able to continue without harming nature", "We need sustainable ways of living."),
        ],
      ),
    ],
  },
];
