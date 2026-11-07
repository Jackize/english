import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 24: Sự kiện & lễ hội. */
export const TOPIC_24: SeedVocabTopic = {
  name: "Sự kiện & lễ hội",
  slug: "su-kien-le-hoi",
  icon: "celebration",
  description:
    "Từ vựng về lễ hội, phong tục truyền thống, cách tổ chức và tham dự sự kiện, cùng các buổi lễ kỷ niệm và trao giải.",
  lessons: [
    {
      title: "Lễ hội & ngày lễ",
      summary:
        "20 từ/cụm từ về lễ hội, phong tục, nghi lễ và các hoạt động truyền thống trong năm.",
      sections: [
        {
          title: "Lễ hội và phong tục",
          body: `- **fair / festivity**: hội chợ / lễ hội, không khí lễ hội
- **carnival / parade**: hội hóa trang / cuộc diễu hành
- **fireworks / lantern**: pháo hoa / đèn lồng
- **costume / procession**: trang phục hóa trang / đoàn rước
- **folklore / superstition / ritual**: văn hóa dân gian / mê tín / nghi lễ
- **rite**: nghi thức

Mẫu câu:
- The whole town joins the **carnival** every spring.
- It is a local **superstition** to light **lanterns** at the fair.`,
          remember:
            "tradition là truyền thống nói chung; custom là phong tục, thói quen của cộng đồng.",
        },
        {
          title: "Ngày lễ và kỷ niệm",
          body: `- **holiday / public holiday**: ngày lễ / ngày nghỉ lễ
- **eve**: đêm trước ngày lễ
- **decorate / decoration**: trang trí
- **legend / commemorate**: truyền thuyết / tưởng niệm
- **festive / annual**: mang không khí lễ hội / hằng năm

Mẫu câu:
- New Year's **Eve** is celebrated with **fireworks**.
- The **annual** festival attracts thousands of visitors.`,
          remember:
            "eve là đêm hoặc ngày trước một sự kiện quan trọng, ví dụ Christmas Eve.",
        },
      ],
      words: [
        w("fair", "/feə(r)/", "n", "hội chợ", "a public event with stalls and entertainment", "The village fair is held every August."),
        w("festivity", "/feˈstɪvəti/", "n", "lễ hội, không khí lễ hội", "the happy feeling of a celebration", "Colourful lights added to the festivity."),
        w("carnival", "/ˈkɑːnɪvl/", "n", "hội hóa trang, lễ hội đường phố", "a public festival with music, costumes and dancing", "The carnival fills the streets with dancers."),
        w("parade", "/pəˈreɪd/", "n", "cuộc diễu hành", "a public procession to celebrate something", "We watched the parade from the pavement."),
        w("fireworks", "/ˈfaɪəwɜːks/", "n", "pháo hoa", "explosive objects that make coloured lights in the sky", "The fireworks lit up the whole harbour."),
        w("costume", "/ˈkɒstjuːm/", "n", "trang phục (hóa trang, biểu diễn)", "clothes worn for a festival or performance", "She made her own costume for the parade."),
        w("folklore", "/ˈfəʊklɔː(r)/", "n", "văn hóa dân gian", "the traditional stories and beliefs of a community", "The book collects folklore from the region."),
        w("superstition", "/ˌsuːpəˈstɪʃn/", "n", "mê tín", "a belief that is not based on reason", "It is a superstition that black cats bring bad luck."),
        w("ritual", "/ˈrɪtʃuəl/", "n", "nghi lễ", "a set of actions performed in a fixed way", "The tea ceremony is an important ritual."),
        w("rite", "/raɪt/", "n", "nghi thức", "a formal ceremony", "The rite is performed at the start of spring."),
        w("holiday", "/ˈhɒlədeɪ/", "n", "ngày lễ, kỳ nghỉ", "a day or period when people do not work", "The school is closed for the holiday."),
        w("public holiday", "/ˌpʌblɪk ˈhɒlədeɪ/", "n", "ngày nghỉ lễ", "a day when most businesses close", "The first of May is a public holiday."),
        w("eve", "/iːv/", "n", "đêm trước ngày lễ", "the day or evening before an important day", "We always have a big dinner on New Year's Eve."),
        w("decorate", "/ˈdekəreɪt/", "v", "trang trí", "to make something look more attractive", "They decorate the square with lights and flowers."),
        w("lantern", "/ˈlæntən/", "n", "đèn lồng", "a light inside a frame, often carried at festivals", "Children carried paper lanterns through the streets."),
        w("procession", "/prəˈseʃn/", "n", "đoàn rước, đám rước", "a line of people moving as part of a ceremony", "The procession moved slowly towards the temple."),
        w("legend", "/ˈledʒənd/", "n", "truyền thuyết", "an old story about famous people or events", "The legend explains how the lake was formed."),
        w("commemorate", "/kəˈmeməreɪt/", "v", "tưởng niệm, kỷ niệm", "to remember and honour an important event or person", "The monument commemorates the end of the war."),
        w("festive", "/ˈfestɪv/", "adj", "mang không khí lễ hội", "typical of a celebration", "The streets had a festive atmosphere."),
        w("annual", "/ˈænjuəl/", "adj", "hằng năm", "happening once every year", "The annual festival takes place in June."),
      ],
    },
    {
      title: "Tổ chức sự kiện",
      summary:
        "20 từ/cụm từ về địa điểm, khách mời, ngân sách, hậu cần và các bước chuẩn bị cho một sự kiện.",
      sections: [
        {
          title: "Địa điểm và khách mời",
          body: `- **occasion / auditorium**: dịp, sự kiện / khán phòng
- **organiser / name badge**: người tổ chức / thẻ tên
- **guest list / seating**: danh sách khách mời / chỗ ngồi
- **catering / refreshment**: dịch vụ ăn uống / đồ uống nhẹ
- **decoration / equipment**: trang trí / thiết bị
- **sound system**: hệ thống âm thanh

Mẫu câu:
- We need a bigger **auditorium** for two hundred guests.
- The **catering** company will provide lunch.`,
          remember:
            "venue là địa điểm tổ chức; place là nơi chốn nói chung.",
        },
        {
          title: "Kế hoạch và vận hành",
          body: `- **programme / expenses**: chương trình / chi phí
- **sponsor / funding**: nhà tài trợ / nguồn tài trợ
- **time slot / set aside**: khung giờ / dành riêng
- **set up / run-through**: chuẩn bị, lắp đặt / buổi chạy thử
- **permit / safety**: giấy phép / an toàn

Mẫu câu:
- Book the **auditorium** early and confirm the **expenses**.
- We have a **run-through** the day before the occasion.`,
          remember:
            "set up là lắp đặt, chuẩn bị; setup (một từ) là danh từ chỉ cấu hình.",
        },
      ],
      words: [
        w("occasion", "/əˈkeɪʒn/", "n", "dịp, sự kiện", "a particular time when something happens", "The wedding was a happy occasion."),
        w("auditorium", "/ˌɔːdɪˈtɔːriəm/", "n", "khán phòng", "the part of a building where the audience sits", "The auditorium seats five hundred people."),
        w("organiser", "/ˈɔːɡənaɪzə(r)/", "n", "người tổ chức", "a person who plans and arranges an event", "The organiser sent us the final schedule."),
        w("name badge", "/ˈneɪm bædʒ/", "n", "thẻ tên", "a small card showing a person's name", "Please collect your name badge at the desk."),
        w("guest list", "/ˈɡest lɪst/", "n", "danh sách khách mời", "a list of people invited to an event", "Please check your name on the guest list."),
        w("seating", "/ˈsiːtɪŋ/", "n", "chỗ ngồi", "the arrangement of seats for guests", "The seating is arranged in rows."),
        w("catering", "/ˈkeɪtərɪŋ/", "n", "dịch vụ ăn uống", "the business of providing food for events", "The catering includes a vegetarian option."),
        w("refreshment", "/rɪˈfreʃmənt/", "n", "đồ ăn uống nhẹ", "light food and drinks", "Refreshments will be served after the talk."),
        w("decoration", "/ˌdekəˈreɪʃn/", "n", "đồ trang trí", "something used to make a place look attractive", "We hung decorations from the ceiling."),
        w("programme", "/ˈprəʊɡræm/", "n", "chương trình", "a plan of activities for an event", "The programme lists every speaker and time."),
        w("expenses", "/ɪkˈspensɪz/", "n", "chi phí", "the money needed for an activity", "We must keep the event expenses low."),
        w("sponsor", "/ˈspɒnsə(r)/", "n/v", "nhà tài trợ; tài trợ", "a person or company that pays for an event", "A local bank agreed to sponsor the race."),
        w("time slot", "/ˈtaɪm slɒt/", "n", "khung giờ", "a period booked for a particular activity", "Choose a time slot for your visit."),
        w("set aside", "/ˌset əˈsaɪd/", "phr v", "dành riêng", "to keep something for a particular purpose", "Set aside a small amount for emergencies."),
        w("equipment", "/ɪˈkwɪpmənt/", "n", "thiết bị", "the tools and machines needed for an activity", "All the sound equipment arrived on time."),
        w("set up", "/ˌset ˈʌp/", "phr v", "chuẩn bị, lắp đặt", "to prepare equipment or a place", "The team set up the stage in two hours."),
        w("permit", "/ˈpɜːmɪt/", "n", "giấy phép", "an official document allowing something", "You need a permit to close the street."),
        w("safety", "/ˈseɪfti/", "n", "an toàn", "the state of being protected from danger", "Safety checks were carried out before the event."),
        w("sound system", "/ˈsaʊnd sɪstəm/", "n", "hệ thống âm thanh", "equipment for playing music and speech", "The sound system was too loud at the back."),
        w("run-through", "/ˈrʌn θruː/", "n", "buổi chạy thử", "a practice session before a performance", "The final run-through went smoothly."),
      ],
    },
    {
      title: "Tham dự sự kiện",
      summary:
        "20 từ/cụm từ về khách mời, người chủ trì, xếp hàng, biểu diễn và cảm xúc khi tham dự.",
      sections: [
        {
          title: "Khách mời và người chủ trì",
          body: `- **visitor / presenter**: khách tham quan / người dẫn chương trình
- **admission / entrance**: sự cho vào / lối vào
- **turnstile / crowd**: cổng xoay / đám đông
- **onlooker / audience**: người xem / khán giả
- **meet-up**: buổi gặp mặt

Mẫu câu:
- The **presenter** welcomed every **visitor** at the door.
- **Admission** is free for children under twelve.`,
          remember:
            "spectator xem thể thao hoặc sự kiện ngoài trời; audience nghe hoặc xem buổi biểu diễn.",
        },
        {
          title: "Biểu diễn và cảm xúc",
          body: `- **matinee / encore**: suất diễn ban ngày / màn diễn thêm
- **interval / backstage**: giờ nghỉ giữa buổi / sau sân khấu
- **autograph / memento**: chữ ký lưu niệm / vật kỷ niệm
- **booth / showcase**: quầy, gian hàng / buổi trưng bày
- **display / march / applause**: màn trưng bày / cuộc tuần hành / tràng vỗ tay
- **cheer**: reo hò, cổ vũ

Mẫu câu:
- The band came back for an **encore**.
- The **crowd** burst into **applause**.`,
          remember:
            "applause là tiếng vỗ tay; cheer là tiếng reo hò, cổ vũ.",
        },
      ],
      words: [
        w("visitor", "/ˈvɪzɪtə(r)/", "n", "khách tham quan", "a person who visits a place or event", "Visitors must sign in at reception."),
        w("presenter", "/prɪˈzentə(r)/", "n", "người dẫn chương trình", "a person who introduces a show or event", "The presenter kept the audience entertained."),
        w("admission", "/ədˈmɪʃn/", "n", "sự cho vào, phí vào cửa", "the right or price to enter a place", "Admission to the museum is free on Sundays."),
        w("entrance", "/ˈentrəns/", "n", "lối vào", "the door or gate where you enter", "We waited by the main entrance."),
        w("turnstile", "/ˈtɜːnstaɪl/", "n", "cổng xoay", "a gate that turns as one person passes through", "Fans entered the stadium through the turnstiles."),
        w("crowd", "/kraʊd/", "n", "đám đông", "a large group of people in one place", "A huge crowd gathered in the square."),
        w("onlooker", "/ˈɒnlʊkə(r)/", "n", "người xem, người đứng nhìn", "a person who watches something happening", "Onlookers gathered to watch the parade."),
        w("meet-up", "/ˈmiːt ʌp/", "n", "buổi gặp mặt", "an informal meeting arranged in advance", "We organised a meet-up for former classmates."),
        w("matinee", "/ˈmætɪneɪ/", "n", "suất diễn ban ngày", "an afternoon performance", "The Saturday matinee is popular with families."),
        w("encore", "/ˈɒŋkɔː(r)/", "n", "màn diễn thêm", "an extra performance requested by the audience", "The singer returned for an encore."),
        w("interval", "/ˈɪntəvl/", "n", "giờ nghỉ giữa buổi", "a short break during a performance", "We bought drinks during the interval."),
        w("backstage", "/ˌbækˈsteɪdʒ/", "adv/n", "sau sân khấu", "the area behind the stage", "The actors waited backstage before the show."),
        w("autograph", "/ˈɔːtəɡrɑːf/", "n", "chữ ký lưu niệm", "a famous person's signature", "She asked the author for an autograph."),
        w("memento", "/məˈmentəʊ/", "n", "vật kỷ niệm", "a small object kept to remember an event", "He kept the ticket as a memento of the concert."),
        w("booth", "/buːð/", "n", "quầy, gian hàng", "a small temporary shop at an event", "Local farmers sold cheese at a booth."),
        w("showcase", "/ˈʃəʊkeɪs/", "n/v", "buổi trưng bày; giới thiệu", "an event that displays something to the public", "The gallery held a showcase of young artists."),
        w("display", "/dɪˈspleɪ/", "n/v", "màn trưng bày; trưng bày", "an arrangement of things for people to see", "There was a display of traditional costumes."),
        w("march", "/mɑːtʃ/", "n/v", "cuộc tuần hành; diễu hành", "an organized walk by a group of people", "The march ended in the main square."),
        w("applause", "/əˈplɔːz/", "n", "tràng vỗ tay", "the sound of many people clapping", "The speech ended with loud applause."),
        w("cheer", "/tʃɪə(r)/", "v/n", "reo hò, cổ vũ", "to shout loudly to show support", "The fans cheered when the team appeared."),
      ],
    },
    {
      title: "Lễ kỷ niệm & trao giải",
      summary:
        "20 từ/cụm từ về lễ kỷ niệm, họp mặt, giải thưởng, đề cử và vinh danh thành tích.",
      sections: [
        {
          title: "Kỷ niệm và họp mặt",
          body: `- **commemoration / remembrance**: sự tưởng niệm / sự tưởng nhớ
- **jubilee / centenary**: lễ kỷ niệm (thường 25/50/60 năm) / lễ trăm năm
- **homecoming / banquet**: buổi trở về thăm / bữa tiệc long trọng
- **speech / tribute**: bài phát biểu / lời tri ân
- **memorial**: đài tưởng niệm

Mẫu câu:
- The school held a **homecoming** for former students.
- His **speech** was a warm **tribute** to his teacher.`,
          remember:
            "jubilee thường gắn với mốc 25, 50 hoặc 60 năm; centenary là đúng 100 năm.",
        },
        {
          title: "Giải thưởng và vinh danh",
          body: `- **award / prize / accolade / plaque**: giải thưởng / giải / vinh dự, giải thưởng / tấm biển vinh danh
- **nominee / nomination**: người được đề cử / sự đề cử
- **champion / jury**: nhà vô địch / ban giám khảo
- **honour / recipient**: vinh dự / người nhận
- **congratulation**: lời chúc mừng

Mẫu câu:
- The **jury** announced the **champion** on stage.
- Please accept my **congratulations** on your award.`,
          remember:
            "congratulations luôn dùng ở số nhiều khi chúc mừng ai đó.",
        },
      ],
      words: [
        w("commemoration", "/kəˌmeməˈreɪʃn/", "n", "sự tưởng niệm", "an event that honours an important person or event", "A commemoration was held at the war memorial."),
        w("remembrance", "/rɪˈmembrəns/", "n", "sự tưởng nhớ", "the act of remembering and honouring someone", "The service was a day of remembrance."),
        w("jubilee", "/ˈdʒuːbɪliː/", "n", "lễ kỷ niệm lớn", "a special anniversary celebration", "The village celebrated its golden jubilee."),
        w("centenary", "/senˈtiːnəri/", "n", "lễ kỷ niệm trăm năm", "a 100th anniversary", "The club marked its centenary with a dinner."),
        w("homecoming", "/ˈhəʊmkʌmɪŋ/", "n", "buổi trở về thăm", "an event when former members return to a place", "The school holds a homecoming every five years."),
        w("banquet", "/ˈbæŋkwɪt/", "n", "bữa tiệc long trọng", "a formal meal for many people", "The award ceremony ended with a banquet."),
        w("speech", "/spiːtʃ/", "n", "bài phát biểu", "a formal talk given to an audience", "The director gave a short speech."),
        w("tribute", "/ˈtrɪbjuːt/", "n", "lời tri ân", "something said or done to show respect", "The concert was a tribute to the composer."),
        w("memorial", "/məˈmɔːriəl/", "n", "đài tưởng niệm", "a structure built to remember someone", "They laid flowers at the memorial."),
        w("award", "/əˈwɔːd/", "n/v", "giải thưởng; trao giải", "a prize given for achievement", "She won an award for her research."),
        w("prize", "/praɪz/", "n", "giải thưởng", "something given to the winner", "The first prize was a trip to Paris."),
        w("accolade", "/ˈækəleɪd/", "n", "vinh dự, giải thưởng", "praise or an award for achievement", "The film received accolades from critics."),
        w("plaque", "/plɑːk/", "n", "tấm biển vinh danh", "a flat piece of metal or stone with a name on it", "A plaque honours the founder of the school."),
        w("nominee", "/ˌnɒmɪˈniː/", "n", "người được đề cử", "a person officially suggested for an award", "The nominees waited for the result."),
        w("nomination", "/ˌnɒmɪˈneɪʃn/", "n", "sự đề cử", "the act of officially suggesting someone", "She received a nomination for best actress."),
        w("champion", "/ˈtʃæmpiən/", "n", "nhà vô địch", "the person who wins a competition", "The champion gave a short thank-you speech."),
        w("jury", "/ˈdʒʊəri/", "n", "ban giám khảo", "a group who decide the result of a competition", "The jury praised all five finalists."),
        w("honour", "/ˈɒnə(r)/", "n/v", "vinh dự; tôn vinh", "a sign of respect or recognition", "It was an honour to receive the prize."),
        w("recipient", "/rɪˈsɪpiənt/", "n", "người nhận", "a person who receives something", "The recipient thanked the whole team."),
        w("congratulation", "/kənˌɡrætʃuˈleɪʃn/", "n", "lời chúc mừng", "words said to praise someone's success", "She sent a message of congratulation."),
      ],
    },
  ],
};
