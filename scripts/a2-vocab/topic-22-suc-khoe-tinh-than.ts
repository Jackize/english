import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 22: Sức khỏe tinh thần & lối sống. */
export const TOPIC_22: SeedVocabTopic = {
  name: "Sức khỏe tinh thần & lối sống",
  slug: "suc-khoe-tinh-than",
  icon: "self_improvement",
  description:
    "Từ vựng về cảm xúc, căng thẳng, thói quen tốt và cách chăm sóc sức khỏe tinh thần.",
  lessons: [
    {
      title: "Tâm trạng & sức khỏe tinh thần",
      summary:
        "20 từ/cụm từ về cảm xúc, tâm lý, lo âu và các khái niệm sức khỏe tinh thần.",
      sections: [
        {
          title: "Tâm trạng và tâm lý",
          body: `- **mental / psychological**: thuộc tinh thần / thuộc tâm lý
- **emotional / mood**: thuộc cảm xúc / tâm trạng
- **mindset / attitude**: tư duy / thái độ
- **resilience**: khả năng phục hồi
- **burnout / anxiety / depression**: kiệt sức / lo âu / trầm cảm

Mẫu câu:
- Good sleep supports **mental** health.
- Her positive **mindset** helped her recover.`,
          remember: "mental health = sức khỏe tinh thần; physical health = sức khỏe thể chất.",
        },
        {
          title: "Chăm sóc và trị liệu",
          body: `- **therapy / therapist**: liệu pháp / nhà trị liệu
- **counselling / counsellor**: tư vấn tâm lý / cố vấn tâm lý
- **self-care / mindfulness**: chăm sóc bản thân / chánh niệm
- **meditation / meditate**: thiền / thiền định
- **breathing / balance**: hơi thở / sự cân bằng

Mẫu câu:
- Talking to a **therapist** can really help.
- **Mindfulness** helps me manage stress.`,
          remember: "go to therapy; a therapist is the person you talk to.",
        },
      ],
      words: [
        w("mental", "/ˈmentl/", "adj", "thuộc tinh thần", "relating to the mind", "Mental health is as important as physical health."),
        w("psychological", "/ˌsaɪkəˈlɒdʒɪkl/", "adj", "thuộc tâm lý", "relating to the mind and feelings", "The injury caused psychological stress."),
        w("emotional", "/ɪˈməʊʃənl/", "adj", "thuộc cảm xúc", "relating to feelings", "She needed emotional support."),
        w("mood", "/muːd/", "n", "tâm trạng", "the way you feel at a particular time", "Exercise improves my mood."),
        w("mindset", "/ˈmaɪndset/", "n", "tư duy", "a way of thinking about things", "A positive mindset makes problems easier."),
        w("attitude", "/ˈætɪtjuːd/", "n", "thái độ", "the way you think and behave", "Try to keep a healthy attitude to failure."),
        w("resilience", "/rɪˈzɪliəns/", "n", "khả năng phục hồi", "the ability to recover from difficulties", "Children need resilience to cope with change."),
        w("burnout", "/ˈbɜːnaʊt/", "n", "sự kiệt sức", "extreme tiredness caused by too much work", "She took a break to avoid burnout."),
        w("anxiety", "/æŋˈzaɪəti/", "n", "sự lo âu", "a feeling of worry and fear", "He suffers from anxiety before exams."),
        w("depression", "/dɪˈpreʃn/", "n", "trầm cảm", "a serious feeling of sadness and hopelessness", "Depression is a treatable condition."),
        w("therapy", "/ˈθerəpi/", "n", "liệu pháp", "treatment for a mental or physical problem", "She has been in therapy for a year."),
        w("therapist", "/ˈθerəpɪst/", "n", "nhà trị liệu", "a person trained to treat mental health", "The therapist listened without judging."),
        w("counselling", "/ˈkaʊnsəlɪŋ/", "n", "tư vấn tâm lý", "professional advice about personal problems", "The school offers free counselling."),
        w("counsellor", "/ˈkaʊnsələ(r)/", "n", "cố vấn tâm lý", "a person who gives advice and support", "Our counsellor helped us talk about stress."),
        w("self-care", "/ˌself ˈkeə(r)/", "n", "chăm sóc bản thân", "looking after your own health and happiness", "Self-care includes rest, food and exercise."),
        w("mindfulness", "/ˈmaɪndflnəs/", "n", "chánh niệm", "the practice of paying attention to the present", "Mindfulness can reduce anxiety."),
        w("meditation", "/ˌmedɪˈteɪʃn/", "n", "thiền", "the practice of calming the mind", "Ten minutes of meditation helps me focus."),
        w("meditate", "/ˈmedɪteɪt/", "v", "thiền định", "to calm your mind through meditation", "She meditates before work."),
        w("breathing", "/ˈbriːðɪŋ/", "n", "hơi thở", "the act of taking air into the lungs", "Deep breathing helps you relax."),
        w("balance", "/ˈbæləns/", "n/v", "sự cân bằng; cân bằng", "a healthy mixture of different things", "Try to balance work and rest."),
      ],
    },
    {
      title: "Thói quen & lối sống",
      summary:
        "20 từ/cụm từ về giấc ngủ, nghỉ ngơi, ý chí và những thói quen tốt mỗi ngày.",
      sections: [
        {
          title: "Nghỉ ngơi và thư giãn",
          body: `- **bedtime / nap**: giờ đi ngủ / giấc ngủ trưa
- **rest / downtime**: nghỉ ngơi / thời gian nghỉ
- **recreation**: sự giải trí
- **switch off**: ngắt kết nối, nghỉ ngơi
- **digital detox / screen-free**: cai nghiện thiết bị số / không màn hình

Mẫu câu:
- A short **nap** can improve your afternoon.
- I try to **switch off** after eight o'clock.`,
          remember: "switch off = ngừng làm việc và thư giãn.",
        },
        {
          title: "Xây dựng thói quen",
          body: `- **moderation / consistency**: sự điều độ / sự kiên định
- **willpower / self-discipline**: ý chí / tự kỷ luật
- **reward / intention / priority**: phần thưởng / ý định / sự ưu tiên
- **outdoors / nature / sunlight**: ngoài trời / thiên nhiên / ánh sáng mặt trời
- **water intake / balanced diet**: lượng nước nạp vào / chế độ ăn cân bằng

Mẫu câu:
- **Consistency** matters more than perfection.
- Spend time **outdoors** every day if you can.`,
          remember: "in moderation = một cách điều độ.",
        },
      ],
      words: [
        w("bedtime", "/ˈbedtaɪm/", "n", "giờ đi ngủ", "the time when you go to bed", "Try to keep a regular bedtime."),
        w("nap", "/næp/", "n", "giấc ngủ trưa", "a short sleep during the day", "I took a twenty-minute nap."),
        w("rest", "/rest/", "n/v", "sự nghỉ ngơi; nghỉ ngơi", "a period of relaxing", "You need to rest after the operation."),
        w("downtime", "/ˈdaʊntaɪm/", "n", "thời gian nghỉ ngơi", "time when you can relax", "I use my downtime to read."),
        w("recreation", "/ˌrekriˈeɪʃn/", "n", "sự giải trí", "activities done for enjoyment", "The park is used for recreation."),
        w("switch off", "/ˌswɪtʃ ˈɒf/", "phr v", "ngắt kết nối, nghỉ ngơi", "to stop thinking about work", "It is hard to switch off at weekends."),
        w("digital detox", "/ˌdɪdʒɪtl ˈdiːtɒks/", "n", "cai nghiện thiết bị số", "a period without phones or computers", "She did a digital detox for a week."),
        w("moderation", "/ˌmɒdəˈreɪʃn/", "n", "sự điều độ", "avoiding too much of something", "Eat sweets in moderation."),
        w("consistency", "/kənˈsɪstənsi/", "n", "sự kiên định", "doing something regularly", "Consistency is the key to progress."),
        w("willpower", "/ˈwɪlpaʊə(r)/", "n", "ý chí", "the ability to control your actions", "It takes willpower to stop scrolling."),
        w("self-discipline", "/ˌself ˈdɪsəplɪn/", "n", "tự kỷ luật", "the ability to make yourself do things", "Self-discipline helps you keep good habits."),
        w("reward", "/rɪˈwɔːd/", "n/v", "phần thưởng; thưởng", "something given for good behaviour", "Give yourself a small reward after studying."),
        w("intention", "/ɪnˈtenʃn/", "n", "ý định", "something you plan to do", "My intention is to exercise three times a week."),
        w("priority", "/praɪˈɒrəti/", "n", "sự ưu tiên", "something that is more important", "Make sleep a priority."),
        w("screen-free", "/ˈskriːn friː/", "adj", "không màn hình", "without using phones or screens", "We have a screen-free evening once a week."),
        w("outdoors", "/ˌaʊtˈdɔːz/", "adv", "ở ngoài trời", "not inside a building", "The children play outdoors after school."),
        w("nature", "/ˈneɪtʃə(r)/", "n", "thiên nhiên", "the natural world", "Walking in nature reduces stress."),
        w("sunlight", "/ˈsʌnlaɪt/", "n", "ánh sáng mặt trời", "light from the sun", "Sunlight helps your body make vitamin D."),
        w("water intake", "/ˈwɔːtə ɪnteɪk/", "n", "lượng nước nạp vào", "the amount of water you drink", "Increase your water intake in hot weather."),
        w("balanced diet", "/ˌbælənst ˈdaɪət/", "n", "chế độ ăn cân bằng", "food that gives all the nutrients you need", "A balanced diet supports good mental health."),
      ],
    },
    {
      title: "Căng thẳng & quản lý",
      summary:
        "20 từ/cụm từ về đối phó với áp lực, các dấu hiệu căng thẳng và cách tìm hỗ trợ.",
      sections: [
        {
          title: "Đối phó và vượt qua",
          body: `- **cope (with)**: đối phó
- **manage / overcome**: xoay xở / vượt qua
- **trigger**: tác nhân gây ra
- **tension / panic**: sự căng thẳng / hoảng loạn
- **exhaustion / insomnia**: sự kiệt sức / chứng mất ngủ

Mẫu câu:
- She finds it hard to **cope with** pressure.
- Lack of sleep can **trigger** anxiety.`,
          remember: "cope with something — đối phó với điều gì.",
        },
        {
          title: "Dấu hiệu và hỗ trợ",
          body: `- **migraine / appetite**: chứng đau nửa đầu / sự thèm ăn
- **comfort / comfort zone**: sự an ủi / vùng an toàn
- **support network**: mạng lưới hỗ trợ
- **reach out / confide**: tìm đến giúp đỡ / tâm sự
- **journal / journaling**: nhật ký / việc viết nhật ký
- **gratitude / positive**: lòng biết ơn / tích cực

Mẫu câu:
- It is important to **reach out** when you struggle.
- She **confided** in her best friend.`,
          remember: "confide in somebody — tâm sự với ai.",
        },
      ],
      words: [
        w("cope", "/kəʊp/", "v", "đối phó", "to deal successfully with a problem", "He is learning to cope with stress."),
        w("cope with", "/ˈkəʊp wɪð/", "phrase", "đối phó với", "to manage a difficult situation", "How do you cope with a heavy workload?"),
        w("manage", "/ˈmænɪdʒ/", "v", "xoay xở, quản lý", "to succeed in dealing with something", "She manages her time well."),
        w("overcome", "/ˌəʊvəˈkʌm/", "v", "vượt qua", "to succeed in dealing with a difficulty", "He overcame his fear of public speaking."),
        w("trigger", "/ˈtrɪɡə(r)/", "n/v", "tác nhân; gây ra", "something that causes a reaction", "Stress can trigger headaches."),
        w("tension", "/ˈtenʃn/", "n", "sự căng thẳng", "a feeling of nervousness or strain", "You could feel the tension in the room."),
        w("panic", "/ˈpænɪk/", "n/v", "sự hoảng loạn; hoảng loạn", "a sudden strong feeling of fear", "She panicked when she lost her phone."),
        w("exhaustion", "/ɪɡˈzɔːstʃən/", "n", "sự kiệt sức", "extreme tiredness", "He was suffering from exhaustion."),
        w("insomnia", "/ɪnˈsɒmniə/", "n", "chứng mất ngủ", "the inability to sleep", "Worry can cause insomnia."),
        w("migraine", "/ˈmaɪɡreɪn/", "n", "chứng đau nửa đầu", "a severe headache", "Bright light makes her migraine worse."),
        w("appetite", "/ˈæpɪtaɪt/", "n", "sự thèm ăn", "the desire to eat", "Stress affected his appetite."),
        w("comfort", "/ˈkʌmfət/", "n/v", "sự an ủi; an ủi", "a feeling of being less worried or sad", "She found comfort in music."),
        w("comfort zone", "/ˈkʌmfət zəʊn/", "n", "vùng an toàn", "a situation where you feel safe", "Learning a language means leaving your comfort zone."),
        w("support network", "/səˈpɔːt netwɜːk/", "n", "mạng lưới hỗ trợ", "people who can help you", "Friends and family form her support network."),
        w("reach out", "/ˌriːtʃ ˈaʊt/", "phr v", "tìm đến giúp đỡ", "to ask someone for help", "Don't be afraid to reach out."),
        w("confide", "/kənˈfaɪd/", "v", "tâm sự", "to tell someone a secret or problem", "She confided in her sister."),
        w("journal", "/ˈdʒɜːnl/", "n", "nhật ký", "a notebook for daily thoughts", "He writes in a journal every night."),
        w("journaling", "/ˈdʒɜːnəlɪŋ/", "n", "việc viết nhật ký", "the habit of writing a journal", "Journaling helps her process emotions."),
        w("gratitude", "/ˈɡrætɪtjuːd/", "n", "lòng biết ơn", "the feeling of being thankful", "She practises gratitude every morning."),
        w("positive", "/ˈpɒzətɪv/", "adj", "tích cực", "hopeful and constructive", "Try to keep a positive attitude."),
      ],
    },
    {
      title: "Chăm sóc & hỗ trợ",
      summary:
        "20 từ/cụm từ về chẩn đoán, điều trị, phục hồi và sự đồng cảm với người gặp khó khăn.",
      sections: [
        {
          title: "Chẩn đoán và điều trị",
          body: `- **diagnose / diagnosis**: chẩn đoán / sự chẩn đoán
- **condition / disorder**: tình trạng bệnh / rối loạn
- **specialist / clinic / ward**: bác sĩ chuyên khoa / phòng khám / khoa bệnh viện
- **inpatient / outpatient**: bệnh nhân nội trú / ngoại trú
- **medication / side effect**: thuốc / tác dụng phụ

Mẫu câu:
- The doctor **diagnosed** her with anxiety.
- Read the **side effects** before taking the medication.`,
          remember: "be diagnosed with an illness — được chẩn đoán mắc bệnh.",
        },
        {
          title: "Phục hồi và đồng cảm",
          body: `- **addicted / addiction**: nghiện / sự nghiện
- **rehab / relapse**: phục hồi chức năng / tái phát
- **coping strategy / holistic**: chiến lược đối phó / toàn diện
- **preventative**: mang tính phòng ngừa
- **empathy / stigma**: sự đồng cảm / sự kỳ thị

Mẫu câu:
- He is in **rehab** for his addiction.
- There is still a **stigma** around mental illness.`,
          remember: "addicted to something — nghiện thứ gì.",
        },
      ],
      words: [
        w("diagnose", "/ˈdaɪəɡnəʊz/", "v", "chẩn đoán", "to identify an illness", "The doctor diagnosed him with depression."),
        w("diagnosis", "/ˌdaɪəɡˈnəʊsɪs/", "n", "sự chẩn đoán", "the identification of an illness", "She received the diagnosis last month."),
        w("condition", "/kənˈdɪʃn/", "n", "tình trạng bệnh", "an illness or medical problem", "The condition is treatable."),
        w("disorder", "/dɪsˈɔːdə(r)/", "n", "rối loạn", "a medical problem affecting the mind or body", "He has an anxiety disorder."),
        w("specialist", "/ˈspeʃəlɪst/", "n", "bác sĩ chuyên khoa", "a doctor with expert knowledge", "She was referred to a specialist."),
        w("clinic", "/ˈklɪnɪk/", "n", "phòng khám", "a place where medical advice is given", "The clinic offers free counselling."),
        w("ward", "/wɔːd/", "n", "khoa bệnh viện", "a room in a hospital for patients", "He was treated in the psychiatric ward."),
        w("inpatient", "/ˈɪnpeɪʃnt/", "n", "bệnh nhân nội trú", "a patient staying in hospital", "Inpatients receive meals and care."),
        w("outpatient", "/ˈaʊtpeɪʃnt/", "n", "bệnh nhân ngoại trú", "a patient who visits hospital for treatment", "She attends the clinic as an outpatient."),
        w("medication", "/ˌmedɪˈkeɪʃn/", "n", "thuốc men", "medicine used to treat an illness", "He takes medication for anxiety."),
        w("side effect", "/ˈsaɪd ɪfekt/", "n", "tác dụng phụ", "an unwanted effect of a medicine", "Drowsiness is a common side effect."),
        w("addicted", "/əˈdɪktɪd/", "adj", "nghiện", "unable to stop using something", "He became addicted to his phone."),
        w("addiction", "/əˈdɪkʃn/", "n", "sự nghiện", "the inability to stop doing something harmful", "Gambling addiction is a serious problem."),
        w("rehab", "/ˈriːhæb/", "n", "phục hồi chức năng", "treatment to help someone recover", "She spent a month in rehab."),
        w("relapse", "/rɪˈlæps/", "n/v", "tái phát", "a return of an illness or bad habit", "He had a relapse after several months."),
        w("coping strategy", "/ˈkəʊpɪŋ strætədʒi/", "n", "chiến lược đối phó", "a way of dealing with stress", "Walking is one of her coping strategies."),
        w("holistic", "/həʊˈlɪstɪk/", "adj", "toàn diện", "treating the whole person, not just symptoms", "The clinic takes a holistic approach."),
        w("preventative", "/prɪˈventətɪv/", "adj", "mang tính phòng ngừa", "intended to stop something happening", "Preventative care saves money in the long run."),
        w("empathy", "/ˈempəθi/", "n", "sự đồng cảm", "the ability to understand others' feelings", "Good counsellors show empathy."),
        w("stigma", "/ˈstɪɡmə/", "n", "sự kỳ thị", "strong disapproval that is unfair", "The campaign aims to reduce stigma."),
      ],
    },
  ],
};
