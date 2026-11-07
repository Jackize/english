import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 03: Bạn bè & giao tiếp xã hội. */
export const TOPIC_03: SeedVocabTopic = {
  name: "Bạn bè & giao tiếp xã hội",
  slug: "ban-be-giao-tiep",
  icon: "groups",
  description:
    "Từ vựng để làm quen, rủ bạn đi chơi, giữ liên lạc và xử lý những bất đồng trong quan hệ.",
  lessons: [
    {
      title: "Làm quen & gặp gỡ",
      summary:
        "20 từ/cụm từ về người quen, đồng nghiệp, cách chào hỏi và tạo ấn tượng ban đầu.",
      sections: [
        {
          title: "Những người quanh bạn",
          body: `- **acquaintance**: người quen (chưa thân)
- **stranger**: người lạ
- **classmate**: bạn cùng lớp
- **colleague**: đồng nghiệp
- **neighbour**: hàng xóm
- **mate / buddy**: bạn thân (thân mật)

Mẫu câu:
- He is an **acquaintance** from work, not a close friend.
- My **classmates** and I often study together.`,
          remember: "acquaintance thân thiết hơn stranger nhưng chưa phải friend.",
        },
        {
          title: "Tạo ấn tượng đầu tiên",
          body: `- **greet**: chào hỏi
- **handshake**: cái bắt tay
- **eye contact**: giao tiếp bằng mắt
- **small talk**: chuyện xã giao ngắn
- **compliment**: lời khen; khen
- **get on well (with)**: hợp nhau
- **hit it off**: hợp ngay từ lần đầu

Mẫu câu:
- We **hit it off** at the party.
- She **gets on well with** her colleagues.`,
          remember: "get on well with somebody = có quan hệ tốt với ai.",
        },
      ],
      words: [
        w("acquaintance", "/əˈkweɪntəns/", "n", "người quen", "someone you know but not well", "She is an acquaintance from my old job."),
        w("stranger", "/ˈstreɪndʒə(r)/", "n", "người lạ", "a person you do not know", "Do not share personal details with strangers."),
        w("classmate", "/ˈklɑːsmeɪt/", "n", "bạn cùng lớp", "someone in the same class as you", "I met my best friend when we were classmates."),
        w("colleague", "/ˈkɒliːɡ/", "n", "đồng nghiệp", "a person you work with", "My colleagues organised a leaving party."),
        w("neighbour", "/ˈneɪbə(r)/", "n", "hàng xóm", "a person who lives near you", "Our neighbours invited us for tea."),
        w("mate", "/meɪt/", "n", "bạn thân (thân mật)", "a friend, especially in informal British English", "He is an old mate from university."),
        w("buddy", "/ˈbʌdi/", "n", "bạn thân (Mỹ)", "a close friend, informal", "My gym buddy keeps me motivated."),
        w("companion", "/kəmˈpæniən/", "n", "bạn đồng hành", "a person who spends time with you", "A dog can be a loyal companion."),
        w("get on well", "/ˌɡet ɒn ˈwel/", "phrase", "hợp nhau, có quan hệ tốt", "to have a good relationship", "I get on well with my flatmate."),
        w("hit it off", "/ˌhɪt ɪt ˈɒf/", "idiom", "hợp nhau ngay từ đầu", "to like each other immediately", "They hit it off at the party."),
        w("approach", "/əˈprəʊtʃ/", "v", "tiếp cận, đến gần", "to come near or speak to someone", "He approached me and said hello."),
        w("greet", "/ɡriːt/", "v", "chào hỏi", "to say hello to someone", "She greeted every guest at the door."),
        w("handshake", "/ˈhændʃeɪk/", "n", "cái bắt tay", "the act of shaking hands", "A firm handshake makes a good impression."),
        w("eye contact", "/ˈaɪ kɒntækt/", "n", "giao tiếp bằng mắt", "looking directly into someone's eyes", "Good eye contact shows confidence."),
        w("small talk", "/ˈsmɔːl tɔːk/", "n", "chuyện xã giao", "polite conversation about unimportant things", "We made small talk while waiting for the bus."),
        w("compliment", "/ˈkɒmplɪmənt/", "n/v", "lời khen; khen", "a nice remark about someone", "She paid me a compliment on my cooking."),
        w("invite", "/ɪnˈvaɪt/", "v", "mời", "to ask someone to come to an event", "They invited us to their new flat."),
        w("invitation", "/ˌɪnvɪˈteɪʃn/", "n", "lời mời", "a written or spoken request to attend", "I received an invitation to the wedding."),
        w("host", "/həʊst/", "n/v", "chủ nhà; đăng cai tổ chức", "a person who invites guests", "Our host made everyone feel welcome."),
        w("hostess", "/ˈhəʊstəs/", "n", "nữ chủ nhà", "a woman who invites and looks after guests", "The hostess introduced the guests to each other."),
      ],
    },
    {
      title: "Hoạt động xã hội",
      summary:
        "20 từ/cụm từ về tụ tập, đi chơi, tổ chức tiệc và những hoạt động giải trí cùng bạn bè.",
      sections: [
        {
          title: "Rủ nhau đi chơi",
          body: `- **hang out**: đi chơi, tụ tập
- **meet up**: gặp nhau
- **get together**: sum họp, tụ họp
- **night out**: buổi tối đi chơi
- **outing**: chuyến đi chơi ngắn

Mẫu câu:
- Do you want to **hang out** this weekend?
- Let's **meet up** for coffee.`,
          remember: "hang out là cách nói thân mật; meet up trung tính hơn.",
        },
        {
          title: "Tổ chức một buổi tụ tập",
          body: `- **throw a party**: tổ chức tiệc
- **potluck**: tiệc mỗi người mang một món
- **RSVP**: xác nhận tham dự
- **get-together**: buổi gặp mặt
- **sleepover**: ngủ qua đêm tại nhà bạn
- **game night**: đêm chơi trò chơi

Mẫu câu:
- We are **throwing a party** on Saturday.
- Please **RSVP** by Friday.`,
          remember: "RSVP đọc là /ˌɑːr es viː ˈpiː/, nghĩa là hãy trả lời thư mời.",
        },
      ],
      words: [
        w("hang out", "/ˌhæŋ ˈaʊt/", "phr v", "đi chơi, tụ tập", "to spend time with friends informally", "We often hang out at the park."),
        w("meet up", "/ˌmiːt ˈʌp/", "phr v", "gặp nhau", "to meet someone by arrangement", "Let's meet up after work."),
        w("night out", "/ˌnaɪt ˈaʊt/", "n", "buổi tối đi chơi", "an evening spent enjoying yourself", "We had a great night out in town."),
        w("throw a party", "/ˌθrəʊ ə ˈpɑːti/", "phrase", "tổ chức tiệc", "to organise a party", "They threw a party for their anniversary."),
        w("potluck", "/ˈpɒtlʌk/", "n", "tiệc mỗi người mang một món", "a meal where each guest brings food", "We are having a potluck dinner on Friday."),
        w("karaoke", "/ˌkæriˈəʊki/", "n", "hát karaoke", "singing popular songs with recorded music", "We sang karaoke until midnight."),
        w("coffee shop", "/ˈkɒfi ʃɒp/", "n", "quán cà phê", "a place that serves coffee and light meals", "We met at a small coffee shop near the station."),
        w("theatre", "/ˈθɪətə(r)/", "n", "rạp hát, nhà hát", "a building where plays and shows are performed", "Let's go to the theatre on Friday."),
        w("bowling", "/ˈbəʊlɪŋ/", "n", "trò chơi bowling", "a game in which you roll a ball at pins", "We went bowling for my birthday."),
        w("dancing", "/ˈdɑːnsɪŋ/", "n", "khiêu vũ", "moving your body to music", "There was dancing after dinner."),
        w("clubbing", "/ˈklʌbɪŋ/", "n", "đi hộp đêm", "going to nightclubs", "He enjoys clubbing with his friends."),
        w("gig", "/ɡɪɡ/", "n", "buổi biểu diễn nhạc sống", "a live music performance", "We saw a great gig at a small venue."),
        w("sleepover", "/ˈsliːpəʊvə(r)/", "n", "buổi ngủ qua đêm", "a night when friends stay at your house", "My daughter is having a sleepover tonight."),
        w("game night", "/ˈɡeɪm naɪt/", "n", "đêm chơi trò chơi", "an evening spent playing games", "Sunday is our family game night."),
        w("outing", "/ˈaʊtɪŋ/", "n", "chuyến đi chơi ngắn", "a short trip taken for pleasure", "The school organised an outing to the museum."),
        w("get-together", "/ˈɡet təɡeðə(r)/", "n", "buổi gặp mặt", "an informal social meeting", "We had a small get-together at home."),
        w("socialise", "/ˈsəʊʃəlaɪz/", "v", "giao lưu, giao tiếp xã hội", "to spend time with other people", "I like to socialise with my colleagues."),
        w("mingle", "/ˈmɪŋɡl/", "v", "hoà mình vào đám đông", "to move around and talk to many people", "She mingled with the guests at the party."),
        w("RSVP", "/ˌɑːr es viː ˈpiː/", "abbr", "xin xác nhận tham dự", "please reply to an invitation", "Please RSVP by Friday."),
        w("venue", "/ˈvenjuː/", "n", "địa điểm tổ chức", "the place where an event happens", "The venue can hold two hundred people."),
      ],
    },
    {
      title: "Giữ liên lạc & trò chuyện",
      summary:
        "20 từ/cụm từ về nhắn tin, gọi điện, mạng xã hội và cách duy trì liên lạc với bạn bè.",
      sections: [
        {
          title: "Kênh liên lạc",
          body: `- **keep in touch**: giữ liên lạc
- **text / message**: nhắn tin
- **call back**: gọi lại
- **voicemail**: thư thoại
- **group chat**: nhóm trò chuyện
- **video call**: cuộc gọi video

Mẫu câu:
- Let's **keep in touch** after the course.
- I missed your call, so I will **call you back**.`,
          remember: "keep in touch with somebody — nhớ giới từ with.",
        },
        {
          title: "Giao tiếp trực tiếp",
          body: `- **face-to-face**: trực tiếp, mặt đối mặt
- **body language**: ngôn ngữ cơ thể
- **conversation**: cuộc trò chuyện
- **topic**: chủ đề
- **reply**: trả lời
- **forward**: chuyển tiếp

Mẫu câu:
- A **face-to-face** conversation is often better.
- He **forwarded** the message to the group.`,
          remember: "reply to somebody / reply to a message — có giới từ to.",
        },
      ],
      words: [
        w("keep in touch", "/ˌkiːp ɪn ˈtʌtʃ/", "phrase", "giữ liên lạc", "to stay in contact with someone", "We keep in touch through social media."),
        w("text", "/tekst/", "v/n", "nhắn tin; tin nhắn", "to send a written message by phone", "I texted her to say I was late."),
        w("message", "/ˈmesɪdʒ/", "n/v", "tin nhắn; nhắn tin", "a written or spoken piece of information", "She sent me a long message."),
        w("call back", "/ˌkɔːl ˈbæk/", "phr v", "gọi lại", "to phone someone again", "I'll call you back after the meeting."),
        w("voicemail", "/ˈvɔɪsmeɪl/", "n", "thư thoại", "a recorded phone message", "I left him a voicemail."),
        w("email", "/ˈiːmeɪl/", "n/v", "thư điện tử; gửi email", "a message sent by computer", "Please email me the details."),
        w("social media", "/ˌsəʊʃl ˈmiːdiə/", "n", "mạng xã hội", "websites where people share content", "She spends too much time on social media."),
        w("reply", "/rɪˈplaɪ/", "v/n", "trả lời", "to answer someone", "He replied to my message quickly."),
        w("forward", "/ˈfɔːwəd/", "v", "chuyển tiếp", "to send a message to someone else", "Can you forward me that email?"),
        w("attachment", "/əˈtætʃmənt/", "n", "tệp đính kèm", "a file sent with an email", "I opened the attachment but it was empty."),
        w("group chat", "/ˈɡruːp tʃæt/", "n", "nhóm trò chuyện", "a conversation between several people online", "Our group chat gets very busy at weekends."),
        w("video call", "/ˈvɪdiəʊ kɔːl/", "n", "cuộc gọi video", "a phone call with pictures", "We had a video call with our cousins abroad."),
        w("face-to-face", "/ˌfeɪs tə ˈfeɪs/", "adj/adv", "trực tiếp, mặt đối mặt", "in person, not online", "We finally met face-to-face."),
        w("body language", "/ˈbɒdi læŋɡwɪdʒ/", "n", "ngôn ngữ cơ thể", "the way you move your body to show feelings", "Her body language showed that she was nervous."),
        w("conversation", "/ˌkɒnvəˈseɪʃn/", "n", "cuộc trò chuyện", "a talk between people", "We had a long conversation about our plans."),
        w("topic", "/ˈtɒpɪk/", "n", "chủ đề", "the subject of a conversation", "We changed the topic when she arrived."),
        w("rumour", "/ˈruːmə(r)/", "n", "tin đồn", "information that may not be true", "There is a rumour that they are moving away."),
        w("update", "/ˌʌpˈdeɪt/", "n/v", "thông tin mới; cập nhật", "new information; to give the latest news", "She gave me an update on her new job."),
        w("contact", "/ˈkɒntækt/", "n/v", "liên lạc", "communication with someone", "I lost contact with him after school."),
        w("reach", "/riːtʃ/", "v", "liên lạc được với", "to be able to contact someone", "You can reach me on my mobile."),
      ],
    },
    {
      title: "Bất đồng & làm hoà",
      summary:
        "20 từ/cụm từ về tranh cãi, hiểu lầm, xin lỗi, tha thứ và cách giải quyết mâu thuẫn.",
      sections: [
        {
          title: "Khi có mâu thuẫn",
          body: `- **argument**: cuộc tranh cãi
- **disagreement**: sự bất đồng quan điểm
- **misunderstanding**: sự hiểu lầm
- **quarrel**: cãi vã (thân mật, thường nhỏ)
- **blame**: đổ lỗi
- **accuse**: buộc tội

Mẫu câu:
- We had an **argument** about money.
- It was just a **misunderstanding**.`,
          remember: "argue with somebody about something.",
        },
        {
          title: "Làm hoà",
          body: `- **apologise (to somebody for something)**: xin lỗi
- **apology**: lời xin lỗi
- **forgive**: tha thứ
- **calm down**: bình tĩnh lại
- **sort out**: giải quyết
- **compromise**: thoả hiệp

Mẫu câu:
- He **apologised for** being late.
- We need to **sort out** this problem together.`,
          remember: "apologise to somebody for doing something — nhớ cả to và for.",
        },
      ],
      words: [
        w("argument", "/ˈɑːɡjumənt/", "n", "cuộc tranh cãi", "an angry disagreement", "They had an argument about the bill."),
        w("disagreement", "/ˌdɪsəˈɡriːmənt/", "n", "sự bất đồng", "a situation where people have different opinions", "We had a disagreement but stayed friends."),
        w("misunderstanding", "/ˌmɪsʌndəˈstændɪŋ/", "n", "sự hiểu lầm", "a failure to understand each other", "The mistake was caused by a misunderstanding."),
        w("quarrel", "/ˈkwɒrəl/", "n/v", "cuộc cãi vã; cãi vã", "an angry argument, often about something small", "The sisters had a quarrel over a dress."),
        w("fight", "/faɪt/", "n/v", "cuộc đánh nhau; tranh đấu", "a physical or serious argument", "They had a fight at school."),
        w("apologise", "/əˈpɒlədʒaɪz/", "v", "xin lỗi", "to say sorry", "He apologised for his rude comment."),
        w("apology", "/əˈpɒlədʒi/", "n", "lời xin lỗi", "a statement saying sorry", "She accepted his apology."),
        w("forgive", "/fəˈɡɪv/", "v", "tha thứ", "to stop being angry with someone", "I can forgive a mistake, but not a lie."),
        w("blame", "/bleɪm/", "v/n", "đổ lỗi; sự đổ lỗi", "to say someone is responsible for a problem", "Don't blame me for the delay."),
        w("accuse", "/əˈkjuːz/", "v", "buộc tội, cáo buộc", "to say someone has done something wrong", "She accused him of lying."),
        w("criticise", "/ˈkrɪtɪsaɪz/", "v", "phê bình, chỉ trích", "to say what is wrong with something", "He criticises everything I do."),
        w("insult", "/ɪnˈsʌlt/", "v/n", "xúc phạm; lời xúc phạm", "to say something rude to someone", "She insulted him in front of everyone."),
        w("offence", "/əˈfens/", "n", "sự xúc phạm", "something that makes someone upset", "He took offence at my joke."),
        w("take offence", "/ˌteɪk əˈfens/", "phrase", "thấy bị xúc phạm", "to feel upset by something someone says", "She takes offence very easily."),
        w("calm down", "/ˌkɑːm ˈdaʊn/", "phr v", "bình tĩnh lại", "to become less angry or excited", "Take a deep breath and calm down."),
        w("sort out", "/ˌsɔːt ˈaʊt/", "phr v", "giải quyết", "to solve a problem", "We sorted out our differences."),
        w("compromise", "/ˈkɒmprəmaɪz/", "n/v", "sự thoả hiệp; thoả hiệp", "an agreement where both sides give up something", "Both sides had to compromise."),
        w("trust", "/trʌst/", "n/v", "sự tin tưởng; tin tưởng", "a belief that someone is honest", "Trust is important in any friendship."),
        w("betray", "/bɪˈtreɪ/", "v", "phản bội", "to break someone's trust", "She felt betrayed by her best friend."),
        w("make peace", "/ˌmeɪk ˈpiːs/", "phrase", "làm hoà", "to end an argument", "They finally made peace after a long talk."),
      ],
    },
  ],
};
