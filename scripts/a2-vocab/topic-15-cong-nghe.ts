import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 15: Công nghệ & truyền thông. */
export const TOPIC_15: SeedVocabTopic = {
  name: "Công nghệ & truyền thông",
  slug: "cong-nghe-truyen-thong",
  icon: "devices",
  description:
    "Từ vựng về thiết bị, internet, mạng xã hội, an toàn số và công nghệ hiện đại.",
  lessons: [
    {
      title: "Thiết bị công nghệ",
      summary:
        "20 từ/cụm từ về máy tính, điện thoại, phụ kiện và các thiết bị số thường dùng.",
      sections: [
        {
          title: "Thiết bị chính",
          body: `- **device**: thiết bị
- **smartphone / laptop / desktop**: điện thoại thông minh / máy tính xách tay / máy để bàn
- **tablet** — lưu ý: ở bài sức khỏe, tablet là viên thuốc
- **smartwatch / console**: đồng hồ thông minh / máy chơi game

Mẫu câu:
- My **laptop** is five years old.
- He wears a **smartwatch** when he runs.`,
          remember: "device là từ chung cho mọi thiết bị điện tử.",
        },
        {
          title: "Phụ kiện và linh kiện",
          body: `- **keyboard / mouse / monitor**: bàn phím / chuột / màn hình
- **printer / scanner**: máy in / máy quét
- **headphones / speaker**: tai nghe / loa
- **charger / battery / cable**: sạc / pin / dây cáp
- **hard drive / USB / webcam**: ổ cứng / USB / webcam

Mẫu câu:
- The **battery** only lasts a few hours.
- I need a new **charger** for my phone.`,
          remember: "headphones luôn số nhiều; earphones là tai nghe nhỏ.",
        },
      ],
      words: [
        w("device", "/dɪˈvaɪs/", "n", "thiết bị", "a machine made for a particular purpose", "This device tracks your heart rate."),
        w("smartphone", "/ˈsmɑːtfəʊn/", "n", "điện thoại thông minh", "a mobile phone with internet access", "I use my smartphone for everything."),
        w("laptop", "/ˈlæptɒp/", "n", "máy tính xách tay", "a small portable computer", "She takes her laptop to every meeting."),
        w("desktop", "/ˈdesktɒp/", "n", "máy tính để bàn", "a computer that stays on a desk", "The desktop is faster than my laptop."),
        w("keyboard", "/ˈkiːbɔːd/", "n", "bàn phím", "the set of keys used for typing", "My keyboard has a broken key."),
        w("mouse", "/maʊs/", "n", "chuột máy tính", "a device used to control a computer", "Click the left button on the mouse."),
        w("monitor", "/ˈmɒnɪtə(r)/", "n", "màn hình", "a screen for a computer", "The monitor is too small for design work."),
        w("printer", "/ˈprɪntə(r)/", "n", "máy in", "a machine that prints documents", "The printer is out of paper."),
        w("scanner", "/ˈskænə(r)/", "n", "máy quét", "a device that copies documents digitally", "Use the scanner to save the form."),
        w("headphones", "/ˈhedfəʊnz/", "n", "tai nghe", "devices worn over the ears for sound", "I listen to music with headphones."),
        w("speaker", "/ˈspiːkə(r)/", "n", "loa", "a device that produces sound", "The speaker is connected by Bluetooth."),
        w("charger", "/ˈtʃɑːdʒə(r)/", "n", "bộ sạc", "a device used to charge a battery", "I left my charger at the hotel."),
        w("battery", "/ˈbætri/", "n", "pin", "a device that stores electrical power", "My phone battery is almost dead."),
        w("cable", "/ˈkeɪbl/", "n", "dây cáp", "a wire that connects devices", "This cable is too short."),
        w("USB", "/ˌjuː es ˈbiː/", "n", "cổng USB", "a standard connection for devices", "Save the file on a USB drive."),
        w("hard drive", "/ˈhɑːd draɪv/", "n", "ổ cứng", "a device for storing computer data", "The hard drive is nearly full."),
        w("webcam", "/ˈwebkæm/", "n", "webcam", "a camera connected to a computer", "She turned on her webcam for the call."),
        w("smartwatch", "/ˈsmɑːtwɒtʃ/", "n", "đồng hồ thông minh", "a watch with computer features", "My smartwatch counts my steps."),
        w("console", "/ˈkɒnsəʊl/", "n", "máy chơi game", "a device for playing video games", "He bought a new games console."),
        w("drone", "/drəʊn/", "n", "máy bay không người lái", "a small aircraft controlled remotely", "The drone filmed the whole beach."),
      ],
    },
    {
      title: "Internet & ứng dụng",
      summary:
        "20 từ/cụm từ về trang web, tải xuống, tài khoản, mật khẩu và lưu trữ trực tuyến.",
      sections: [
        {
          title: "Truy cập internet",
          body: `- **internet / wifi**: internet / wifi
- **website / webpage**: trang web / trang
- **browser / search engine**: trình duyệt / công cụ tìm kiếm
- **link**: liên kết
- **download / upload**: tải xuống / tải lên

Mẫu câu:
- The **wifi** is very slow here.
- **Download** the app before you travel.`,
          remember: "website là cả trang web; webpage là một trang cụ thể.",
        },
        {
          title: "Tài khoản và ứng dụng",
          body: `- **app**: ứng dụng
- **account / profile**: tài khoản / hồ sơ
- **username / password**: tên đăng nhập / mật khẩu
- **log in / log out**: đăng nhập / đăng xuất
- **sign up**: đăng ký
- **notification**: thông báo
- **cloud storage**: lưu trữ đám mây
- **install**: cài đặt

Mẫu câu:
- I can't **log in** to my account.
- Choose a strong **password**.`,
          remember: "log in to something — đăng nhập vào tài khoản.",
        },
      ],
      words: [
        w("internet", "/ˈɪntənet/", "n", "internet", "the global network connecting computers", "I found the answer on the internet."),
        w("website", "/ˈwebsaɪt/", "n", "trang web", "a set of pages on the internet", "The company has a new website."),
        w("webpage", "/ˈwebpeɪdʒ/", "n", "trang web cụ thể", "one page on a website", "Open the webpage and click the link."),
        w("browser", "/ˈbraʊzə(r)/", "n", "trình duyệt", "software used to access the internet", "Which browser do you use?"),
        w("search engine", "/ˈsɜːtʃ endʒɪn/", "n", "công cụ tìm kiếm", "a website that finds information online", "Type the question into a search engine."),
        w("link", "/lɪŋk/", "n", "liên kết", "a word or image that opens another page", "Click the link in the email."),
        w("download", "/ˌdaʊnˈləʊd/", "v/n", "tải xuống", "to copy files from the internet", "I downloaded the album last night."),
        w("upload", "/ˌʌpˈləʊd/", "v/n", "tải lên", "to send files to the internet", "Upload your photo to the form."),
        w("install", "/ɪnˈstɔːl/", "v", "cài đặt", "to put software on a device", "Install the app before you start."),
        w("app", "/æp/", "n", "ứng dụng", "a program designed for a phone", "I use an app to learn vocabulary."),
        w("account", "/əˈkaʊnt/", "n", "tài khoản", "an arrangement allowing access to a service", "Create an account to save your progress."),
        w("password", "/ˈpɑːswɜːd/", "n", "mật khẩu", "a secret word used to access an account", "Never share your password."),
        w("username", "/ˈjuːzəneɪm/", "n", "tên đăng nhập", "the name you use on a website", "My username is easy to remember."),
        w("log in", "/ˌlɒɡ ˈɪn/", "phr v", "đăng nhập", "to enter an account with a password", "Log in to see your messages."),
        w("log out", "/ˌlɒɡ ˈaʊt/", "phr v", "đăng xuất", "to leave an account", "Always log out on public computers."),
        w("sign up", "/ˌsaɪn ˈʌp/", "phr v", "đăng ký", "to create a new account", "Sign up for a free trial."),
        w("profile", "/ˈprəʊfaɪl/", "n", "hồ sơ cá nhân", "the information about you on a website", "She updated her profile picture."),
        w("notification", "/ˌnəʊtɪfɪˈkeɪʃn/", "n", "thông báo", "a message alerting you about something", "I turned off notifications at night."),
        w("cloud storage", "/ˌklaʊd ˈstɔːrɪdʒ/", "n", "lưu trữ đám mây", "online space for saving files", "I keep my photos in cloud storage."),
        w("wifi", "/ˈwaɪfaɪ/", "n", "wifi", "a wireless internet connection", "Do you know the wifi password?"),
      ],
    },
    {
      title: "Mạng xã hội & an toàn số",
      summary:
        "20 từ/cụm từ về đăng bài, theo dõi, nội dung lan truyền và bảo vệ bản thân trên mạng.",
      sections: [
        {
          title: "Hoạt động trên mạng xã hội",
          body: `- **platform**: nền tảng
- **post**: bài đăng; đăng bài
- **comment / like**: bình luận / thích
- **follow / follower**: theo dõi / người theo dõi
- **influencer**: người có ảnh hưởng
- **viral / hashtag**: lan truyền / thẻ chủ đề

Mẫu câu:
- She **posted** a photo of her trip.
- The video went **viral** overnight.`,
          remember: "go viral = lan truyền nhanh trên mạng.",
        },
        {
          title: "An toàn và nội dung",
          body: `- **content / settings**: nội dung / cài đặt
- **block**: chặn
- **fake news / misinformation**: tin giả / thông tin sai lệch
- **cyberbullying**: bắt nạt trên mạng
- **screen time**: thời gian dùng màn hình
- **online safety / digital footprint**: an toàn trực tuyến / dấu vết số
- **livestream / emoji**: phát trực tiếp / biểu tượng cảm xúc

Mẫu câu:
- Check your privacy **settings**.
- Too much **screen time** is bad for your eyes.`,
          remember: "digital footprint là dấu vết bạn để lại trên internet.",
        },
      ],
      words: [
        w("forum", "/ˈfɔːrəm/", "n", "diễn đàn trực tuyến", "a website where people discuss topics", "This forum is popular with young people."),
        w("post", "/pəʊst/", "n/v", "bài đăng; đăng bài", "something published online; to publish it", "He posted a video of his dog."),
        w("comment", "/ˈkɒment/", "n/v", "bình luận; bình luận", "a written opinion about a post", "She left a kind comment."),
        w("like", "/laɪk/", "n/v", "lượt thích; thích", "a symbol showing you enjoy a post", "The photo got a thousand likes."),
        w("follow", "/ˈfɒləʊ/", "v", "theo dõi", "to subscribe to someone's posts", "I follow several travel bloggers."),
        w("follower", "/ˈfɒləʊə(r)/", "n", "người theo dõi", "a person who follows an account", "She has a million followers."),
        w("influencer", "/ˈɪnfluənsə(r)/", "n", "người có ảnh hưởng", "a person who affects what others buy", "The influencer recommended the product."),
        w("viral", "/ˈvaɪrəl/", "adj", "lan truyền nhanh", "spreading quickly online", "The song became viral on social media."),
        w("hashtag", "/ˈhæʃtæɡ/", "n", "thẻ chủ đề", "a word with # used to group posts", "Use the hashtag to join the conversation."),
        w("content", "/ˈkɒntent/", "n", "nội dung", "the material published online", "She creates content about cooking."),
        w("settings", "/ˈsetɪŋz/", "n", "cài đặt", "the options that control an app", "Change the language in the settings."),
        w("block", "/blɒk/", "v", "chặn", "to stop someone contacting you online", "I blocked the account that sent spam."),
        w("fake news", "/ˌfeɪk ˈnjuːz/", "n", "tin giả", "false information presented as news", "Check the source before sharing fake news."),
        w("misinformation", "/ˌmɪsɪnfəˈmeɪʃn/", "n", "thông tin sai lệch", "false information spread by mistake or on purpose", "Misinformation spreads quickly online."),
        w("cyberbullying", "/ˈsaɪbəbʊliɪŋ/", "n", "bắt nạt trên mạng", "bullying using digital technology", "The school has a policy against cyberbullying."),
        w("screen time", "/ˈskriːn taɪm/", "n", "thời gian dùng màn hình", "time spent using phones or computers", "Parents should limit children's screen time."),
        w("online safety", "/ˌɒnlaɪn ˈseɪfti/", "n", "an toàn trực tuyến", "protecting yourself on the internet", "Online safety should be taught at school."),
        w("digital footprint", "/ˌdɪdʒɪtl ˈfʊtprɪnt/", "n", "dấu vết số", "the record you leave on the internet", "Your digital footprint can last for years."),
        w("livestream", "/ˈlaɪvstriːm/", "n/v", "phát trực tiếp", "a video broadcast in real time", "The concert was shown as a livestream."),
        w("emoji", "/ɪˈməʊdʒi/", "n", "biểu tượng cảm xúc", "a small picture used in messages", "She replied with a smiling emoji."),
      ],
    },
    {
      title: "Công nghệ & tương lai",
      summary:
        "20 từ/cụm từ về trí tuệ nhân tạo, robot, dữ liệu, phần mềm và an ninh mạng.",
      sections: [
        {
          title: "Công nghệ mới",
          body: `- **technology / digital**: công nghệ / kỹ thuật số
- **artificial intelligence**: trí tuệ nhân tạo
- **robot / automation**: robot / tự động hóa
- **algorithm**: thuật toán
- **innovation / gadget**: sự đổi mới / thiết bị tiện ích

Mẫu câu:
- **Artificial intelligence** is changing many jobs.
- This **gadget** can translate speech instantly.`,
          remember: "AI viết tắt của artificial intelligence.",
        },
        {
          title: "Dữ liệu và an ninh",
          body: `- **data / database**: dữ liệu / cơ sở dữ liệu
- **software / hardware**: phần mềm / phần cứng
- **program / code**: chương trình / mã
- **network**: mạng
- **cybercrime / hacker / virus**: tội phạm mạng / tin tặc / vi-rút
- **backup**: bản sao lưu
- **virtual**: ảo

Mẫu câu:
- Always make a **backup** of important files.
- A **hacker** tried to access the system.`,
          remember: "software và hardware không đếm được; không thêm -s.",
        },
      ],
      words: [
        w("technology", "/tekˈnɒlədʒi/", "n", "công nghệ", "scientific knowledge used in practical ways", "Technology is developing very quickly."),
        w("digital", "/ˈdɪdʒɪtl/", "adj", "kỹ thuật số", "using computer technology", "We live in a digital age."),
        w("artificial intelligence", "/ˌɑːtɪfɪʃl ɪnˈtelɪdʒəns/", "n", "trí tuệ nhân tạo", "computer systems that can perform human-like tasks", "Artificial intelligence can write and translate text."),
        w("robot", "/ˈrəʊbɒt/", "n", "robot", "a machine that can perform tasks automatically", "Robots work on the factory floor."),
        w("automation", "/ˌɔːtəˈmeɪʃn/", "n", "tự động hóa", "the use of machines to do work", "Automation has reduced the number of jobs."),
        w("algorithm", "/ˈælɡərɪðəm/", "n", "thuật toán", "a set of rules used by a computer", "The algorithm decides which videos you see."),
        w("data", "/ˈdeɪtə/", "n", "dữ liệu", "information stored or processed by computers", "The company collects data about users."),
        w("software", "/ˈsɒftweə(r)/", "n", "phần mềm", "programs used by a computer", "We need new software for the design team."),
        w("hardware", "/ˈhɑːdweə(r)/", "n", "phần cứng", "the physical parts of a computer", "The hardware is old but still works."),
        w("program", "/ˈprəʊɡræm/", "n/v", "chương trình; lập trình", "a set of instructions for a computer", "He wrote a program to sort the data."),
        w("code", "/kəʊd/", "n/v", "mã; viết mã", "instructions written for a computer", "She learned to code at university."),
        w("network", "/ˈnetwɜːk/", "n", "mạng", "computers connected to each other", "The office network is down."),
        w("database", "/ˈdeɪtəbeɪs/", "n", "cơ sở dữ liệu", "an organised collection of information", "Customer details are stored in a database."),
        w("cybercrime", "/ˈsaɪbəkraɪm/", "n", "tội phạm mạng", "crime committed using computers", "Cybercrime costs companies millions."),
        w("hacker", "/ˈhækə(r)/", "n", "tin tặc", "a person who illegally accesses computer systems", "Hackers stole personal information."),
        w("virus", "/ˈvaɪrəs/", "n", "vi-rút máy tính", "a program that damages computers", "The virus deleted all his files."),
        w("backup", "/ˈbækʌp/", "n", "bản sao lưu", "a copy of data kept in case of loss", "Keep a backup on an external drive."),
        w("innovation", "/ˌɪnəˈveɪʃn/", "n", "sự đổi mới", "a new idea or method", "The company is known for innovation."),
        w("gadget", "/ˈɡædʒɪt/", "n", "thiết bị tiện ích", "a small useful electronic device", "He loves buying kitchen gadgets."),
        w("virtual", "/ˈvɜːtʃuəl/", "adj", "ảo", "created by computer technology", "We had a virtual meeting yesterday."),
      ],
    },
  ],
};
