import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 02: Gia đình & các mối quan hệ. */
export const TOPIC_02: SeedVocabTopic = {
  name: "Gia đình & các mối quan hệ",
  slug: "gia-dinh-moi-quan-he",
  icon: "family_restroom",
  description:
    "Từ vựng về thành viên gia đình, các giai đoạn cuộc đời, tính cách và những dịp sum họp.",
  lessons: [
    {
      title: "Thành viên trong gia đình",
      summary:
        "20 từ/cụm từ chỉ người thân, quan hệ hôn nhân, anh chị em ruột thịt và họ hàng hai bên.",
      sections: [
        {
          title: "Gia đình gần và gia đình mở rộng",
          body: `- **nuclear family**: gia đình hạt nhân (bố mẹ và con)
- **extended family**: đại gia đình, gồm ông bà, cô chú...
- **relative** = **relation**: người thân, họ hàng
- **sibling**: anh/chị/em ruột (dùng chung, không phân biệt giới tính)

Mẫu câu:
- I have two **siblings**: a brother and a sister.
- All our **relatives** live in the same town.`,
          remember: "sibling dùng cho cả brother và sister.",
        },
        {
          title: "Gia đình kết hợp và họ hàng",
          body: `Khi bố mẹ kết hôn với người khác:
- **stepmother / stepfather**: mẹ kế / bố dượng
- **stepbrother / stepsister**: anh/chị/em kế
- **half-brother / half-sister**: anh/chị/em cùng bố hoặc cùng mẹ

Họ hàng qua hôn nhân:
- **mother-in-law / father-in-law**: mẹ chồng/vợ, bố chồng/vợ
- **brother-in-law / sister-in-law**: anh/chị/em dâu, rể
- **nephew / niece**: cháu trai / cháu gái (con của anh chị em)`,
          remember: "in-law chỉ quan hệ do kết hôn, không phải ruột thịt.",
        },
      ],
      words: [
        w("relative", "/ˈrelətɪv/", "n", "người thân, họ hàng", "a member of your family", "Many relatives came to the wedding."),
        w("relationship", "/rɪˈleɪʃnʃɪp/", "n", "mối quan hệ", "the way people are connected", "She has a close relationship with her sister."),
        w("parent", "/ˈpeərənt/", "n", "bố hoặc mẹ", "a mother or father", "Every parent wants their child to be happy."),
        w("partner", "/ˈpɑːtnə(r)/", "n", "bạn đời, người yêu", "the person you live with or love", "He came to the party with his partner."),
        w("spouse", "/spaʊs/", "n", "vợ hoặc chồng", "a husband or wife", "You can bring your spouse to the dinner."),
        w("sibling", "/ˈsɪblɪŋ/", "n", "anh/chị/em ruột", "a brother or sister", "I have two siblings, both older than me."),
        w("stepmother", "/ˈstepmʌðə(r)/", "n", "mẹ kế", "your father's new wife", "His stepmother treats him kindly."),
        w("stepfather", "/ˈstepfɑːðə(r)/", "n", "bố dượng", "your mother's new husband", "My stepfather taught me to ride a bike."),
        w("stepbrother", "/ˈstepbrʌðə(r)/", "n", "anh/em trai kế", "the son of your step-parent", "My stepbrother is the same age as me."),
        w("stepsister", "/ˈstepsɪstə(r)/", "n", "chị/em gái kế", "the daughter of your step-parent", "Her stepsister lives in Canada."),
        w("half-brother", "/ˈhɑːf brʌðə(r)/", "n", "anh/em trai cùng cha khác mẹ", "a brother who shares one parent with you", "I have a half-brother from my father's first marriage."),
        w("half-sister", "/ˈhɑːf sɪstə(r)/", "n", "chị/em gái cùng cha khác mẹ", "a sister who shares one parent with you", "My half-sister visits us every summer."),
        w("mother-in-law", "/ˈmʌðər ɪn lɔː/", "n", "mẹ chồng, mẹ vợ", "the mother of your husband or wife", "My mother-in-law cooks very well."),
        w("father-in-law", "/ˈfɑːðər ɪn lɔː/", "n", "bố chồng, bố vợ", "the father of your husband or wife", "Her father-in-law is a retired teacher."),
        w("brother-in-law", "/ˈbrʌðər ɪn lɔː/", "n", "anh/em rể, anh/em vợ/chồng", "the brother of your spouse, or your sister's husband", "My brother-in-law works at a bank."),
        w("sister-in-law", "/ˈsɪstər ɪn lɔː/", "n", "chị/em dâu, chị/em vợ/chồng", "the sister of your spouse, or your brother's wife", "My sister-in-law is coming for dinner."),
        w("nephew", "/ˈnefjuː/", "n", "cháu trai (con anh/chị/em)", "the son of your brother or sister", "My nephew starts school this year."),
        w("niece", "/niːs/", "n", "cháu gái (con anh/chị/em)", "the daughter of your brother or sister", "I bought a gift for my niece."),
        w("only child", "/ˌəʊnli ˈtʃaɪld/", "n", "con một", "a child with no brothers or sisters", "As an only child, she spent a lot of time alone."),
        w("generation", "/ˌdʒenəˈreɪʃn/", "n", "thế hệ", "all the people born around the same time", "Three generations live in that house."),
      ],
    },
    {
      title: "Các giai đoạn của cuộc đời",
      summary:
        "20 từ/cụm từ về sinh ra, tuổi thơ, tuổi trưởng thành, nuôi dạy con và tuổi già.",
      sections: [
        {
          title: "Từ khi sinh ra đến tuổi trưởng thành",
          body: `- **be born**: được sinh ra — She **was born** in Hanoi.
- **childhood**: tuổi thơ
- **upbringing**: cách nuôi dạy
- **bring up / raise**: nuôi dạy con
- **grow up**: lớn lên

Mẫu câu:
- I **grew up** in a small village.
- Her parents **brought her up** to be independent.`,
          remember: "be born dùng bị động; grow up không cần tân ngữ.",
        },
        {
          title: "Trưởng thành và tuổi già",
          body: `- **teenager**: người 13–19 tuổi
- **adult** → **adulthood**: người trưởng thành → tuổi trưởng thành
- **middle-aged**: trung niên
- **elderly**: cao tuổi (lịch sự hơn old)
- **retire** → **retirement**: nghỉ hưu → thời gian nghỉ hưu

Mẫu câu:
- My father **retired** at sixty.
- **Elderly** people often need more help.`,
          remember: "elderly là cách nói lịch sự; tránh gọi người khác là old.",
        },
      ],
      words: [
        w("birth", "/bɜːθ/", "n", "sự sinh ra", "the time when a baby is born", "The birth of their daughter changed their lives."),
        w("newborn", "/ˈnjuːbɔːn/", "adj/n", "sơ sinh; trẻ sơ sinh", "a baby that has just been born", "The newborn baby slept peacefully."),
        w("childhood", "/ˈtʃaɪldhʊd/", "n", "tuổi thơ", "the time when you are a child", "She had a happy childhood in the countryside."),
        w("upbringing", "/ˈʌpbrɪŋɪŋ/", "n", "cách nuôi dạy", "the way your parents raise you", "His strict upbringing taught him discipline."),
        w("teenager", "/ˈtiːneɪdʒə(r)/", "n", "thiếu niên (13–19 tuổi)", "a person between 13 and 19 years old", "As a teenager, he loved playing football."),
        w("adolescence", "/ˌædəˈlesns/", "n", "tuổi vị thành niên", "the period between childhood and adulthood", "Adolescence can be a difficult time for many young people."),
        w("adult", "/ˈædʌlt/", "n/adj", "người trưởng thành", "a fully grown person", "Adults pay a higher ticket price."),
        w("adulthood", "/ˈædʌlthʊd/", "n", "tuổi trưởng thành", "the period when you are an adult", "She moved abroad at the start of adulthood."),
        w("middle-aged", "/ˌmɪdl ˈeɪdʒd/", "adj", "trung niên", "between about 45 and 65 years old", "My middle-aged uncle has started running marathons."),
        w("elderly", "/ˈeldəli/", "adj", "cao tuổi", "old, used politely", "An elderly couple lives next door."),
        w("retirement", "/rɪˈtaɪəmənt/", "n", "sự nghỉ hưu", "the time after you stop working", "He is enjoying his retirement."),
        w("retire", "/rɪˈtaɪə(r)/", "v", "nghỉ hưu", "to stop working because of age", "My mother retired last year."),
        w("grow up", "/ˌɡrəʊ ˈʌp/", "phr v", "lớn lên", "to become an adult", "I grew up in a quiet neighbourhood."),
        w("bring up", "/ˌbrɪŋ ˈʌp/", "phr v", "nuôi dạy", "to care for and educate a child", "They brought up three children."),
        w("raise", "/reɪz/", "v", "nuôi dạy; nâng lên", "to care for a child until adulthood", "It is not easy to raise a family."),
        w("twin", "/twɪn/", "n/adj", "cặp sinh đôi; sinh đôi", "one of two children born at the same time", "The twins look exactly the same."),
        w("adoption", "/əˈdɒpʃn/", "n", "sự nhận nuôi", "the legal act of taking another person's child as your own", "They are going through the adoption process."),
        w("pregnant", "/ˈpreɡnənt/", "adj", "mang thai", "expecting a baby", "My sister is six months pregnant."),
        w("mature", "/məˈtʃʊə(r)/", "adj", "trưởng thành, chín chắn", "behaving in a sensible adult way", "He is very mature for his age."),
        w("generation gap", "/ˌdʒenəˈreɪʃn ɡæp/", "n", "khoảng cách thế hệ", "differences in attitudes between old and young people", "The family often talks about the generation gap."),
      ],
    },
    {
      title: "Tính cách trong gia đình",
      summary:
        "20 tính từ và cụm từ mô tả cách các thành viên đối xử, quan tâm và gắn bó với nhau.",
      sections: [
        {
          title: "Tính từ tích cực",
          body: `- **caring**: hay quan tâm
- **supportive**: luôn ủng hộ
- **reliable**: đáng tin cậy
- **protective**: hay che chở
- **affectionate**: trìu mến
- **close-knit**: gắn bó chặt chẽ

Mẫu câu:
- My grandmother is a **caring** person.
- We are a **close-knit** family.`,
          remember: "close-knit dùng cho tập thể gắn bó, không dùng cho một người.",
        },
        {
          title: "Tính từ cần cân nhắc",
          body: `- **strict**: nghiêm khắc
- **lenient**: dễ dãi
- **demanding**: hay đòi hỏi
- **selfish**: ích kỷ
- **jealous**: ghen tị
- **traditional**: theo truyền thống

Mẫu câu:
- My parents were **strict** about bedtime.
- He can be **demanding**, but he means well.`,
          remember: "strict + about/with: strict about rules, strict with children.",
        },
      ],
      words: [
        w("caring", "/ˈkeərɪŋ/", "adj", "hay quan tâm", "kind and looking after other people", "She is a caring mother and friend."),
        w("supportive", "/səˈpɔːtɪv/", "adj", "luôn ủng hộ", "giving help and encouragement", "My family has always been supportive of my studies."),
        w("strict", "/strɪkt/", "adj", "nghiêm khắc", "expecting rules to be followed", "My father was strict about homework."),
        w("lenient", "/ˈliːniənt/", "adj", "dễ dãi, khoan dung", "not strict in punishment", "The children prefer their lenient uncle."),
        w("tolerant", "/ˈtɒlərənt/", "adj", "bao dung, kiên nhẫn", "willing to accept differences and mistakes", "She is very tolerant of other people's mistakes."),
        w("easy-going", "/ˌiːzi ˈɡəʊɪŋ/", "adj", "dễ tính", "relaxed and not easily worried", "My easy-going brother never argues."),
        w("responsible", "/rɪˈspɒnsəbl/", "adj", "có trách nhiệm", "reliable and sensible", "She is the most responsible person in the family."),
        w("reliable", "/rɪˈlaɪəbl/", "adj", "đáng tin cậy", "able to be trusted", "You can always count on my reliable cousin."),
        w("protective", "/prəˈtektɪv/", "adj", "hay che chở", "wanting to keep someone safe", "Older brothers can be very protective."),
        w("affectionate", "/əˈfekʃənət/", "adj", "trìu mến", "showing love in a physical or kind way", "My grandparents are very affectionate with each other."),
        w("loving", "/ˈlʌvɪŋ/", "adj", "yêu thương", "showing love", "She grew up in a loving home."),
        w("devoted", "/dɪˈvəʊtɪd/", "adj", "hết lòng, tận tụy", "giving a lot of love and time to someone", "He is a devoted father."),
        w("loyal", "/ˈlɔɪəl/", "adj", "trung thành", "always supporting your family or friends", "She is loyal to her friends."),
        w("selfish", "/ˈselfɪʃ/", "adj", "ích kỷ", "thinking only about yourself", "It was selfish of him not to help."),
        w("jealous", "/ˈdʒeləs/", "adj", "ghen tị", "unhappy because someone has something you want", "He gets jealous when his sister gets attention."),
        w("understanding", "/ˌʌndəˈstændɪŋ/", "adj", "thấu hiểu", "kind and able to forgive", "My mother is very understanding."),
        w("demanding", "/dɪˈmɑːndɪŋ/", "adj", "hay đòi hỏi", "expecting a lot of effort or attention", "Her demanding job leaves little family time."),
        w("traditional", "/trəˈdɪʃənl/", "adj", "theo truyền thống", "following old customs", "They have a traditional family dinner on Sundays."),
        w("close-knit", "/ˌkləʊs ˈnɪt/", "adj", "gắn bó chặt chẽ", "having strong relationships with each other", "It is a close-knit community."),
        w("role model", "/ˈrəʊl mɒdl/", "n", "tấm gương, hình mẫu", "a person you admire and want to be like", "My grandfather is my role model."),
      ],
    },
    {
      title: "Sum họp & truyền thống gia đình",
      summary:
        "20 từ/cụm từ về đám cưới, giỗ chạp, sum họp, phong tục và cách các thế hệ giúp đỡ nhau.",
      sections: [
        {
          title: "Những dịp sum họp",
          body: `- **family gathering / reunion**: buổi sum họp gia đình
- **anniversary**: ngày kỷ niệm
- **wedding**: đám cưới
- **ceremony**: nghi lễ
- **celebrate**: tổ chức ăn mừng

Mẫu câu:
- We have a family **reunion** every summer.
- They **celebrated** their tenth **anniversary** at home.`,
          remember: "anniversary là ngày kỷ niệm hằng năm; birthday là sinh nhật.",
        },
        {
          title: "Phong tục và sự giúp đỡ",
          body: `- **tradition** / **custom**: truyền thống / phong tục
- **ancestor**: tổ tiên
- **heritage**: di sản
- **respect**: tôn trọng
- **babysit**: trông trẻ
- **make up**: làm hoà sau khi cãi nhau

Mẫu câu:
- We **respect** our **ancestors** during the festival.
- Could you **babysit** the children tonight?`,
          remember: "make up = làm hoà; make up for = bù đắp cho.",
        },
      ],
      words: [
        w("gather", "/ˈɡæðə(r)/", "v", "tụ họp", "to come together in one place", "The whole family gathers at Tet."),
        w("gathering", "/ˈɡæðərɪŋ/", "n", "buổi tụ họp", "a meeting of people", "It was a small family gathering."),
        w("reunion", "/ˌriːˈjuːniən/", "n", "cuộc sum họp", "a meeting of people who have not seen each other for a long time", "We had a school reunion last year."),
        w("celebration", "/ˌselɪˈbreɪʃn/", "n", "lễ kỷ niệm, sự ăn mừng", "a special event to mark something", "The wedding celebration lasted all night."),
        w("anniversary", "/ˌænɪˈvɜːsəri/", "n", "ngày kỷ niệm", "a date remembered every year", "My parents are celebrating their anniversary."),
        w("wedding", "/ˈwedɪŋ/", "n", "đám cưới", "a marriage ceremony", "We were invited to my cousin's wedding."),
        w("bride", "/braɪd/", "n", "cô dâu", "a woman on her wedding day", "The bride wore a white dress."),
        w("groom", "/ɡruːm/", "n", "chú rể", "a man on his wedding day", "The groom gave a short speech."),
        w("guest", "/ɡest/", "n", "khách mời", "a person invited to an event", "There were two hundred guests at the wedding."),
        w("ceremony", "/ˈserəməni/", "n", "nghi lễ", "a formal event with a set of actions", "The ceremony took place in a small church."),
        w("tradition", "/trəˈdɪʃn/", "n", "truyền thống", "a custom passed down over time", "It is a family tradition to cook together."),
        w("custom", "/ˈkʌstəm/", "n", "phong tục", "a usual way of behaving in a society", "Giving lucky money is a Tet custom."),
        w("ancestor", "/ˈænsestə(r)/", "n", "tổ tiên", "a family member from long ago", "The family honours its ancestors every year."),
        w("heritage", "/ˈherɪtɪdʒ/", "n", "di sản", "traditions and culture passed down", "Food is an important part of our heritage."),
        w("household", "/ˈhaʊshəʊld/", "n", "hộ gia đình", "all the people living in one house", "The household has six members."),
        w("respect", "/rɪˈspekt/", "n/v", "sự tôn trọng; tôn trọng", "a feeling of admiration; to admire someone", "We should respect our elders."),
        w("argue", "/ˈɑːɡjuː/", "v", "tranh cãi", "to disagree in an angry way", "The brothers often argue about small things."),
        w("make up", "/ˌmeɪk ˈʌp/", "phr v", "làm hoà", "to become friends again after an argument", "They argued but made up the next day."),
        w("share", "/ʃeə(r)/", "v", "chia sẻ", "to give part of something to others", "The sisters share a bedroom."),
        w("babysit", "/ˈbeɪbisɪt/", "v", "trông trẻ", "to look after a child while the parents are out", "My aunt babysits us on Friday evenings."),
      ],
    },
  ],
};
