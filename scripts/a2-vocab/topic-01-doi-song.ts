import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/**
 * Chủ đề 01: Đời sống hằng ngày.
 * 80 từ/cụm từ, chia 4 bài học × 20 từ.
 */
export const TOPIC_01: SeedVocabTopic = {
  name: "Đời sống hằng ngày",
    slug: "doi-song-hang-ngay",
    icon: "wb_sunny",
    description:
      "Từ vựng về thói quen buổi sáng, việc nhà, lịch trình và cách thư giãn vào cuối tuần.",
    lessons: [
      {
        title: "Buổi sáng & thói quen cá nhân",
        summary:
          "20 từ/cụm từ về các bước chuẩn bị buổi sáng, đồ dùng cá nhân và cách nói về đúng giờ hay trễ giờ.",
        sections: [
          {
            title: "Một buổi sáng điển hình",
            body: `Trình tự quen thuộc:
1. **set the alarm** — đặt báo thức
2. **wake up** rồi **get up** — tỉnh dậy rồi ra khỏi giường
3. **take a shower**, **brush your teeth**, **get dressed**
4. **have breakfast** rồi ra khỏi nhà

Cụm hay dùng:
- **first thing in the morning**: việc đầu tiên buổi sáng
- **get ready**: chuẩn bị sẵn sàng
- **a morning person**: người thích dậy sớm`,
            remember: "wake up = tỉnh dậy; get up = ra khỏi giường.",
          },
          {
            title: "Đúng giờ và trễ giờ",
            body: `- **on time**: đúng giờ theo kế hoạch — The train was **on time**.
- **in time**: kịp trước khi quá muộn — We arrived **in time** for dinner.
- Thứ tự thời gian: **early** → **on time** → **late**.
- **oversleep**: ngủ quên, dậy muộn hơn dự định.
- **punctual**: luôn đúng giờ (nói về tính cách).

Ví dụ:
- Sorry, I'm **late** — the bus didn't come.
- She is always **punctual** for meetings.`,
            remember: "on time = đúng giờ; in time = kịp lúc.",
          },
        ],
        words: [
          w("alarm", "/əˈlɑːm/", "n", "đồng hồ báo thức", "a clock that wakes you at a set time", "I set my alarm for six o'clock."),
          w("get dressed", "/ˌɡet ˈdrest/", "phrase", "mặc quần áo", "to put on your clothes", "It takes me ten minutes to get dressed."),
          w("shower", "/ˈʃaʊə(r)/", "n", "vòi sen; việc tắm", "a wash under falling water", "I take a quick shower before breakfast."),
          w("shave", "/ʃeɪv/", "v", "cạo râu", "to cut hair off your face", "He shaves every morning before work."),
          w("comb", "/kəʊm/", "n/v", "lược; chải tóc", "a tool for arranging your hair; to arrange your hair", "She combed her hair in front of the mirror."),
          w("mirror", "/ˈmɪrə(r)/", "n", "gương", "glass that reflects an image", "The bathroom mirror was covered in steam."),
          w("toothpaste", "/ˈtuːθpeɪst/", "n", "kem đánh răng", "a paste used for cleaning teeth", "We are running out of toothpaste."),
          w("toothbrush", "/ˈtuːθbrʌʃ/", "n", "bàn chải đánh răng", "a small brush for cleaning teeth", "Replace your toothbrush every three months."),
          w("towel", "/ˈtaʊəl/", "n", "khăn tắm", "a cloth used for drying your body", "Grab a clean towel from the cupboard."),
          w("soap", "/səʊp/", "n", "xà phòng", "a substance used for washing", "Wash your hands with soap and water."),
          w("shampoo", "/ʃæmˈpuː/", "n", "dầu gội", "a liquid used for washing hair", "This shampoo is gentle on dry hair."),
          w("routine", "/ruːˈtiːn/", "n", "thói quen, trình tự hằng ngày", "the usual order in which you do things", "Exercise is part of my morning routine."),
          w("habit", "/ˈhæbɪt/", "n", "thói quen", "something you do regularly", "Reading before bed is a good habit."),
          w("early", "/ˈɜːli/", "adj/adv", "sớm", "before the usual or expected time", "I usually get up early on weekdays."),
          w("late", "/leɪt/", "adj/adv", "muộn, trễ", "after the expected time", "Sorry, I'm late — the bus didn't come."),
          w("on time", "/ɒn ˈtaɪm/", "phrase", "đúng giờ", "at the planned time", "The train arrived exactly on time."),
          w("oversleep", "/ˌəʊvəˈsliːp/", "v", "ngủ quên", "to sleep longer than you intended", "I overslept and missed breakfast."),
          w("punctual", "/ˈpʌŋktʃuəl/", "adj", "đúng giờ, chuyên cần", "always arriving at the right time", "She is always punctual for meetings."),
          w("wash", "/wɒʃ/", "v", "rửa, giặt", "to clean something with water", "Wash your face with warm water."),
          w("dry", "/draɪ/", "v/adj", "lau khô; khô", "to remove water from something; not wet", "Dry your hands on the towel."),
        ],
      },
      {
        title: "Việc nhà & sinh hoạt",
        summary:
          "20 từ/cụm từ về công việc nhà, dọn dẹp, giặt giũ, sửa chữa và chăm sóc đồ đạc trong nhà.",
        sections: [
          {
            title: "Chia việc nhà",
            body: `Các việc thường ngày:
- **do the washing-up / do the dishes**: rửa bát
- **do the laundry**: giặt giũ
- **do the ironing**: là quần áo
- **sweep the floor**, **mop the floor**, **vacuum the carpet**
- **take out the rubbish**, **recycle bottles**

Lưu ý:
- **do** + việc nhà: do the housework, do the dishes
- **make** + giường: make the bed`,
            remember: "do the housework / make the bed — không đổi do và make.",
          },
          {
            title: "Dọn dẹp và sửa chữa",
            body: `- **tidy up** / **clear up**: dọn cho gọn gàng
- **clean**: lau chùi, làm sạch
- **repair**: sửa thứ bị **broken**
- **look after**: chăm sóc người hoặc đồ vật

Ví dụ:
- Can you **clear up** after dinner?
- The **washing machine** is **broken**, so we need to **repair** it.
- My sister **looks after** the plants when I travel.`,
            remember: "broken là tính từ; repair là động từ chỉ hành động sửa.",
          },
        ],
        words: [
          w("chore", "/tʃɔː(r)/", "n", "việc vặt trong nhà", "a small regular job around the house", "The children have a list of chores."),
          w("housework", "/ˈhaʊswɜːk/", "n", "công việc nhà", "the work of cleaning and tidying a house", "We share the housework equally."),
          w("tidy", "/ˈtaɪdi/", "v/adj", "dọn dẹp; gọn gàng", "to make a place neat; neat", "Please tidy your room before dinner."),
          w("clean", "/kliːn/", "v/adj", "lau chùi; sạch", "to remove dirt; free from dirt", "I clean the kitchen every evening."),
          w("sweep", "/swiːp/", "v", "quét", "to clean the floor with a brush", "Sweep the floor after cooking."),
          w("mop", "/mɒp/", "v/n", "lau nhà; cây lau nhà", "to wash a floor with water; a tool for this", "Mop the bathroom floor once a week."),
          w("vacuum", "/ˈvækjuːm/", "v/n", "hút bụi; máy hút bụi", "to clean with a vacuum cleaner; the machine", "I vacuum the living room on Saturdays."),
          w("dust", "/dʌst/", "n/v", "bụi; phủi bụi", "fine dirt; to remove dust from something", "There is dust on the shelves."),
          w("laundry", "/ˈlɔːndri/", "n", "quần áo cần giặt; việc giặt giũ", "clothes to be washed; the act of washing them", "I do the laundry on Sunday morning."),
          w("iron", "/ˈaɪən/", "v/n", "là (ủi); bàn là", "to press clothes smooth; the tool for this", "Can you iron my shirt for the interview?"),
          w("fold", "/fəʊld/", "v", "gấp (quần áo)", "to bend clothes so they are flat", "Fold the towels and put them away."),
          w("dishwasher", "/ˈdɪʃwɒʃə(r)/", "n", "máy rửa bát", "a machine that washes dishes", "Load the dishwasher after dinner."),
          w("washing machine", "/ˈwɒʃɪŋ məʃiːn/", "n", "máy giặt", "a machine that washes clothes", "The washing machine is broken again."),
          w("rubbish", "/ˈrʌbɪʃ/", "n", "rác", "things you throw away", "Put the rubbish in the bin outside."),
          w("recycle", "/ˌriːˈsaɪkl/", "v", "tái chế", "to process waste so it can be used again", "We recycle glass, paper and plastic."),
          w("repair", "/rɪˈpeə(r)/", "v/n", "sửa chữa", "to fix something that is damaged", "It costs a lot to repair the old fridge."),
          w("broken", "/ˈbrəʊkən/", "adj", "bị hỏng", "damaged and not working", "The vacuum cleaner is broken."),
          w("clear up", "/ˌklɪər ˈʌp/", "phr v", "dọn dẹp", "to tidy a place after use", "Let's clear up the kitchen together."),
          w("take out", "/ˌteɪk ˈaʊt/", "phr v", "mang ra ngoài (đổ rác)", "to remove something and put it outside", "Don't forget to take out the rubbish."),
          w("look after", "/ˌlʊk ˈɑːftə(r)/", "phr v", "chăm sóc, trông nom", "to take care of someone or something", "She looks after her younger brother."),
        ],
      },
      {
        title: "Lịch trình & thời gian",
        summary:
          "20 từ/cụm từ về lịch làm việc, cuộc hẹn, hạn chót và cách nói về việc thay đổi kế hoạch.",
        sections: [
          {
            title: "Nói về lịch",
            body: `- **schedule** (Anh-Mỹ) / **timetable** (Anh-Anh): lịch trình
- **appointment**: cuộc hẹn với bác sĩ, khách hàng...
- **calendar**: nơi ghi các cuộc hẹn
- **deadline**: hạn cuối phải hoàn thành

Mẫu câu:
- I have a dentist **appointment** at 3 p.m.
- The **deadline** for the report is next Friday.
- Are you **free** on Saturday?`,
            remember: "appointment = cuộc hẹn; deadline = hạn chót.",
          },
          {
            title: "Thay đổi kế hoạch",
            body: `- **delay**: làm chậm, bị trễ — The flight was **delayed**.
- **cancel**: huỷ hẳn, không làm nữa.
- **postpone**: hoãn sang thời điểm khác.
- **arrange**: sắp xếp, thu xếp.
- **remind**: nhắc ai đó nhớ việc gì.

So sánh:
- They **cancelled** the meeting. (không họp nữa)
- They **postponed** the meeting until Monday. (vẫn họp, nhưng muộn hơn)`,
            remember: "cancel = huỷ; postpone = hoãn lại.",
          },
        ],
        words: [
          w("schedule", "/ˈʃedjuːl/", "n/v", "lịch trình; lên lịch", "a plan of times and activities; to plan something", "My schedule is full this week."),
          w("timetable", "/ˈtaɪmteɪbl/", "n", "thời khóa biểu, lịch trình", "a list of times when things happen", "Check the bus timetable before you leave."),
          w("appointment", "/əˈpɔɪntmənt/", "n", "cuộc hẹn", "an arranged meeting at a fixed time", "I have a dentist appointment at three."),
          w("calendar", "/ˈkælɪndə(r)/", "n", "lịch", "a chart showing days, weeks and months", "Mark the deadline on your calendar."),
          w("deadline", "/ˈdedlaɪn/", "n", "hạn chót", "the latest time to finish something", "The deadline for the report is Friday."),
          w("busy", "/ˈbɪzi/", "adj", "bận rộn", "having a lot to do", "She is busy preparing for the exam."),
          w("free", "/friː/", "adj", "rảnh; miễn phí", "not busy; costing nothing", "Are you free on Saturday afternoon?"),
          w("available", "/əˈveɪləbl/", "adj", "có sẵn, rảnh", "able to be used or met", "The doctor is available after lunch."),
          w("delay", "/dɪˈleɪ/", "n/v", "sự trì hoãn; hoãn, làm trễ", "a period of waiting; to make something late", "The flight has a two-hour delay."),
          w("cancel", "/ˈkænsl/", "v", "huỷ", "to decide that something will not happen", "They had to cancel the meeting."),
          w("postpone", "/pəˈspəʊn/", "v", "hoãn lại", "to move something to a later time", "We decided to postpone the trip until May."),
          w("arrange", "/əˈreɪndʒ/", "v", "sắp xếp", "to plan or organize something", "Can you arrange a meeting for Monday?"),
          w("remind", "/rɪˈmaɪnd/", "v", "nhắc nhở", "to make someone remember something", "Please remind me to call my parents."),
          w("noon", "/nuːn/", "n", "buổi trưa (12 giờ)", "twelve o'clock in the middle of the day", "The shop opens at noon."),
          w("midnight", "/ˈmɪdnaɪt/", "n", "nửa đêm (12 giờ đêm)", "twelve o'clock at night", "He finished the essay at midnight."),
          w("weekday", "/ˈwiːkdeɪ/", "n", "ngày trong tuần", "any day from Monday to Friday", "I work out on weekdays."),
          w("weekend", "/ˌwiːkˈend/", "n", "cuối tuần", "Saturday and Sunday", "We usually visit our grandparents at the weekend."),
          w("monthly", "/ˈmʌnθli/", "adj/adv", "hằng tháng", "happening once a month", "The team has a monthly meeting."),
          w("daily", "/ˈdeɪli/", "adj/adv", "hằng ngày", "happening every day", "The app tracks my daily progress."),
          w("flexible", "/ˈfleksəbl/", "adj", "linh hoạt", "able to change easily to suit the situation", "My working hours are quite flexible."),
        ],
      },
      {
        title: "Cuối tuần & thư giãn",
        summary:
          "20 từ/cụm từ về hoạt động thư giãn, sở thích, sự kiện văn hoá và cách hẹn gặp bạn bè.",
        sections: [
          {
            title: "Hoạt động thư giãn",
            body: `- **relax** / **unwind**: thư giãn sau giờ làm
- **leisure time**: thời gian rảnh
- **jog**, **hike**, **do yoga**, **go to the gym**
- **go camping**, **have a picnic**, **have a barbecue**

Mẫu câu:
- I **unwind** by listening to music.
- We **went camping** last weekend.
- She does **yoga** every morning.`,
            remember: "go + V-ing: go camping, go hiking, go jogging.",
          },
          {
            title: "Sở thích và gặp gỡ",
            body: `- **collect** (động từ) → **collection** (danh từ)
- **photography**: nhiếp ảnh
- **board game**, **puzzle**: trò chơi trong nhà
- **concert**, **exhibition**, **festival**: sự kiện văn hoá
- **catch up with someone**: gặp để cập nhật chuyện

Mẫu câu:
- Let's **catch up** over coffee.
- There's a photo **exhibition** in my **neighbourhood**.`,
            remember: "catch up with somebody = gặp lại và trò chuyện.",
          },
        ],
        words: [
          w("relax", "/rɪˈlæks/", "v", "thư giãn", "to rest and become less tense", "I relax by listening to music."),
          w("unwind", "/ˌʌnˈwaɪnd/", "v", "thư giãn, xả hơi", "to relax after work or stress", "A hot bath helps me unwind after work."),
          w("leisure", "/ˈleʒə(r)/", "n", "thời gian rảnh", "time when you are not working", "She enjoys reading in her leisure time."),
          w("picnic", "/ˈpɪknɪk/", "n", "chuyến dã ngoại", "a meal eaten outdoors", "We had a picnic in the park."),
          w("barbecue", "/ˈbɑːbɪkjuː/", "n", "tiệc nướng", "an outdoor meal with grilled food", "They invited us to a barbecue on Sunday."),
          w("camping", "/ˈkæmpɪŋ/", "n", "việc cắm trại", "staying outdoors in a tent", "We go camping in the mountains every summer."),
          w("hike", "/haɪk/", "n/v", "chuyến đi bộ đường dài; đi bộ đường dài", "a long walk in the countryside; to take one", "The hike took us four hours."),
          w("jog", "/dʒɒɡ/", "v/n", "chạy bộ nhẹ; buổi chạy bộ", "to run slowly for exercise; a slow run", "I jog around the lake before breakfast."),
          w("gym", "/dʒɪm/", "n", "phòng tập thể hình", "a place with equipment for exercise", "He goes to the gym three times a week."),
          w("yoga", "/ˈjəʊɡə/", "n", "yoga", "a system of exercises for body and mind", "Yoga helps me reduce stress."),
          w("collect", "/kəˈlekt/", "v", "sưu tầm, thu gom", "to gather things as a hobby", "My brother collects old coins."),
          w("collection", "/kəˈlekʃn/", "n", "bộ sưu tập", "a group of similar things kept together", "She showed me her stamp collection."),
          w("photography", "/fəˈtɒɡrəfi/", "n", "nhiếp ảnh", "the art of taking photographs", "Photography is his favourite hobby."),
          w("board game", "/ˈbɔːd ɡeɪm/", "n", "trò chơi trên bàn", "a game played on a board", "We played a board game after dinner."),
          w("puzzle", "/ˈpʌzl/", "n", "trò xếp hình; câu đố", "a game or question that tests thinking", "The children finished the puzzle together."),
          w("concert", "/ˈkɒnsət/", "n", "buổi hòa nhạc", "a public performance of music", "We bought tickets for a rock concert."),
          w("exhibition", "/ˌeksɪˈbɪʃn/", "n", "triển lãm", "a public show of art or objects", "There is an art exhibition at the museum."),
          w("festival", "/ˈfestɪvl/", "n", "lễ hội", "a public event with music, food or culture", "The street festival lasts for three days."),
          w("neighbourhood", "/ˈneɪbəhʊd/", "n", "khu phố", "the area around where you live", "Our neighbourhood is quiet and friendly."),
          w("catch up", "/ˌkætʃ ˈʌp/", "phr v", "gặp gỡ trò chuyện; cập nhật", "to meet someone and share recent news", "Let's catch up over coffee next week."),
        ],
      },
    ],
};
