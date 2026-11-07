import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 17: Cảm xúc & tính cách. */
export const TOPIC_17: SeedVocabTopic = {
  name: "Cảm xúc & tính cách",
  slug: "cam-xuc-tinh-cach",
  icon: "psychology",
  description:
    "Từ vựng để gọi tên cảm xúc tích cực, tiêu cực và mô tả tính cách của con người.",
  lessons: [
    {
      title: "Cảm xúc tích cực",
      summary:
        "20 từ/cụm từ về niềm vui, sự biết ơn, tự hào và những trạng thái tinh thần dễ chịu.",
      sections: [
        {
          title: "Vui mừng và biết ơn",
          body: `- **delighted**: vui mừng
- **thrilled**: rất phấn khích
- **grateful**: biết ơn
- **relieved**: nhẹ nhõm
- **glad**: vui, hài lòng
- **amused**: thích thú

Mẫu câu:
- I'm **delighted** to hear your news.
- We are **grateful** for all your help.`,
          remember: "grateful to somebody for something — biết ơn ai vì việc gì.",
        },
        {
          title: "Tự tin và lạc quan",
          body: `- **proud (of)**: tự hào
- **hopeful**: đầy hy vọng
- **cheerful**: vui vẻ
- **calm**: bình tĩnh
- **confident**: tự tin
- **optimistic**: lạc quan
- **enthusiastic**: nhiệt tình

Mẫu câu:
- She is **proud of** her students.
- Try to stay **optimistic** about the future.`,
          remember: "proud of + người/vật; pride là danh từ.",
        },
      ],
      words: [
        w("delighted", "/dɪˈlaɪtɪd/", "adj", "vui mừng", "very pleased", "We are delighted to see you again."),
        w("thrilled", "/θrɪld/", "adj", "rất phấn khích", "extremely pleased and excited", "She was thrilled to win the prize."),
        w("grateful", "/ˈɡreɪtfl/", "adj", "biết ơn", "feeling thankful", "I'm grateful for your support."),
        w("relieved", "/rɪˈliːvd/", "adj", "nhẹ nhõm", "happy because a worry has ended", "We were relieved when the test results arrived."),
        w("proud", "/praʊd/", "adj", "tự hào", "pleased about something you or others achieved", "His parents are very proud of him."),
        w("hopeful", "/ˈhəʊpfl/", "adj", "đầy hy vọng", "believing something good may happen", "She is hopeful about the new job."),
        w("cheerful", "/ˈtʃɪəfl/", "adj", "vui vẻ", "happy and positive", "He gave us a cheerful greeting."),
        w("calm", "/kɑːm/", "adj", "bình tĩnh", "not worried or excited", "Try to stay calm during the interview."),
        w("confident", "/ˈkɒnfɪdənt/", "adj", "tự tin", "sure about your ability", "She feels confident about the exam."),
        w("optimistic", "/ˌɒptɪˈmɪstɪk/", "adj", "lạc quan", "expecting good things to happen", "He is optimistic about the future."),
        w("enthusiastic", "/ɪnˌθjuːziˈæstɪk/", "adj", "nhiệt tình", "showing strong interest and excitement", "The children were enthusiastic about the trip."),
        w("satisfied", "/ˈsætɪsfaɪd/", "adj", "hài lòng", "pleased because something is good enough", "The customer was satisfied with the service."),
        w("amazed", "/əˈmeɪzd/", "adj", "kinh ngạc", "very surprised in a pleasant way", "We were amazed by the view."),
        w("impressed", "/ɪmˈprest/", "adj", "ấn tượng", "admiring something because it is good", "The teacher was impressed by her essay."),
        w("fond", "/fɒnd/", "adj", "yêu mến", "liking someone or something a lot", "She is very fond of her grandparents."),
        w("eager", "/ˈiːɡə(r)/", "adj", "háo hức", "wanting to do something very much", "The students were eager to start."),
        w("curious", "/ˈkjʊəriəs/", "adj", "tò mò", "wanting to know or learn something", "Children are naturally curious."),
        w("amused", "/əˈmjuːzd/", "adj", "thích thú", "finding something funny", "Everyone was amused by his story."),
        w("peaceful", "/ˈpiːsfl/", "adj", "bình yên", "quiet and calm", "The garden is a peaceful place."),
        w("glad", "/ɡlæd/", "adj", "vui, hài lòng", "pleased about something", "I'm glad you could come."),
      ],
    },
    {
      title: "Cảm xúc tiêu cực",
      summary:
        "20 từ/cụm từ về lo lắng, thất vọng, giận dữ và những cảm xúc khó chịu khác.",
      sections: [
        {
          title: "Lo lắng và buồn bã",
          body: `- **anxious / nervous**: lo âu / lo lắng
- **frustrated / annoyed**: bực bội / khó chịu
- **irritated**: cáu kỉnh
- **disappointed**: thất vọng
- **miserable / lonely**: khổ sở / cô đơn
- **homesick**: nhớ nhà

Mẫu câu:
- I felt **anxious** before the interview.
- She was **disappointed** with the result.`,
          remember: "anxious about something; nervous about/of doing something.",
        },
        {
          title: "Xấu hổ, sợ hãi và tức giận",
          body: `- **embarrassed / ashamed / guilty**: xấu hổ / hổ thẹn / có lỗi
- **upset**: buồn bực
- **exhausted / stressed**: kiệt sức / căng thẳng
- **overwhelmed**: quá tải
- **scared / terrified**: sợ hãi / kinh hoàng
- **furious / envious**: giận dữ / ghen tị

Mẫu câu:
- He was **embarrassed** about his mistake.
- She was **furious** when the train was cancelled.`,
          remember: "embarrassed by/at something; ashamed of something.",
        },
      ],
      words: [
        w("anxious", "/ˈæŋkʃəs/", "adj", "lo âu", "worried and nervous", "I felt anxious before the results came out."),
        w("nervous", "/ˈnɜːvəs/", "adj", "lo lắng", "worried about something that may happen", "He gets nervous before speaking in public."),
        w("frustrated", "/frʌˈstreɪtɪd/", "adj", "bực bội", "annoyed because you cannot do something", "She was frustrated with the slow computer."),
        w("annoyed", "/əˈnɔɪd/", "adj", "khó chịu", "slightly angry", "The neighbours were annoyed by the noise."),
        w("irritated", "/ˈɪrɪteɪtɪd/", "adj", "cáu kỉnh", "slightly angry and impatient", "He sounded irritated on the phone."),
        w("disappointed", "/ˌdɪsəˈpɔɪntɪd/", "adj", "thất vọng", "unhappy because something was not as good as expected", "We were disappointed by the film."),
        w("embarrassed", "/ɪmˈbærəst/", "adj", "xấu hổ", "feeling shy or uncomfortable", "She felt embarrassed about falling over."),
        w("ashamed", "/əˈʃeɪmd/", "adj", "hổ thẹn", "feeling bad about something you did", "He was ashamed of his behaviour."),
        w("guilty", "/ˈɡɪlti/", "adj", "có lỗi, áy náy", "feeling responsible for something wrong", "I felt guilty for forgetting her birthday."),
        w("upset", "/ʌpˈset/", "adj", "buồn bực", "unhappy or worried", "She was upset by the news."),
        w("miserable", "/ˈmɪzrəbl/", "adj", "khổ sở", "very unhappy", "He felt miserable during the long winter."),
        w("lonely", "/ˈləʊnli/", "adj", "cô đơn", "unhappy because you are alone", "She felt lonely in the new city."),
        w("homesick", "/ˈhəʊmsɪk/", "adj", "nhớ nhà", "missing your home and family", "The student was homesick at first."),
        w("exhausted", "/ɪɡˈzɔːstɪd/", "adj", "kiệt sức", "extremely tired", "I was exhausted after the journey."),
        w("stressed", "/strest/", "adj", "căng thẳng", "very worried and under pressure", "She is stressed about the deadline."),
        w("overwhelmed", "/ˌəʊvəˈwelmd/", "adj", "quá tải", "feeling unable to deal with too much", "He felt overwhelmed by all the work."),
        w("scared", "/skeəd/", "adj", "sợ hãi", "frightened", "The child was scared of the dark."),
        w("terrified", "/ˈterɪfaɪd/", "adj", "kinh hoàng", "extremely frightened", "She was terrified of flying."),
        w("furious", "/ˈfjʊəriəs/", "adj", "giận dữ", "extremely angry", "My father was furious about the broken window."),
        w("envious", "/ˈenviəs/", "adj", "ghen tị", "wanting what someone else has", "He was envious of her success."),
      ],
    },
    {
      title: "Tính cách tích cực",
      summary:
        "20 tính từ khen ngợi về sự tử tế, trung thực, can đảm và khả năng sống với người khác.",
      sections: [
        {
          title: "Tốt bụng và chân thành",
          body: `- **generous / kind-hearted**: hào phóng / tốt bụng
- **honest / sincere**: trung thực / chân thành
- **thoughtful / considerate**: chu đáo / ân cần
- **humble / modest**: khiêm tốn / khiêm nhường
- **gentle / trustworthy**: dịu dàng / đáng tin cậy

Mẫu câu:
- It was **generous** of you to pay for everyone.
- She is a **thoughtful** friend who remembers details.`,
          remember: "generous with money; generous of somebody (to do something).",
        },
        {
          title: "Can đảm và cởi mở",
          body: `- **courageous / determined**: can đảm / quyết tâm
- **ambitious / hard-working**: có tham vọng / chăm chỉ
- **resourceful / adaptable**: tháo vát / dễ thích nghi
- **sociable / charming**: hòa đồng / duyên dáng
- **witty / open-minded**: hóm hỉnh / cởi mở

Mẫu câu:
- She is **determined** to finish the course.
- He is **open-minded** about other cultures.`,
          remember: "determined to do something — quyết tâm làm gì.",
        },
      ],
      words: [
        w("generous", "/ˈdʒenərəs/", "adj", "hào phóng", "willing to give money or help", "He is generous with his time."),
        w("honest", "/ˈɒnɪst/", "adj", "trung thực", "telling the truth", "She gave an honest answer."),
        w("kind-hearted", "/ˌkaɪnd ˈhɑːtɪd/", "adj", "tốt bụng", "caring and generous", "Our kind-hearted neighbour feeds the birds."),
        w("thoughtful", "/ˈθɔːtfl/", "adj", "chu đáo", "thinking about other people's needs", "It was thoughtful of you to call."),
        w("considerate", "/kənˈsɪdərət/", "adj", "ân cần", "careful not to upset others", "Please be considerate of your neighbours."),
        w("humble", "/ˈhʌmbl/", "adj", "khiêm tốn", "not thinking you are better than others", "Despite his success, he remains humble."),
        w("modest", "/ˈmɒdɪst/", "adj", "khiêm nhường", "not talking proudly about yourself", "She is modest about her achievements."),
        w("courageous", "/kəˈreɪdʒəs/", "adj", "can đảm", "brave", "It was a courageous decision to speak up."),
        w("determined", "/dɪˈtɜːmɪnd/", "adj", "quyết tâm", "having a strong wish to succeed", "She is determined to learn English."),
        w("ambitious", "/æmˈbɪʃəs/", "adj", "có tham vọng", "wanting to achieve great things", "He is an ambitious young lawyer."),
        w("hard-working", "/ˌhɑːd ˈwɜːkɪŋ/", "adj", "chăm chỉ", "putting a lot of effort into work", "She is a hard-working student."),
        w("resourceful", "/rɪˈsɔːsfl/", "adj", "tháo vát", "good at finding solutions", "He is resourceful in difficult situations."),
        w("adaptable", "/əˈdæptəbl/", "adj", "dễ thích nghi", "able to adjust to new conditions", "Children are usually very adaptable."),
        w("sociable", "/ˈsəʊʃəbl/", "adj", "hòa đồng", "friendly and enjoying others' company", "She is sociable and makes friends easily."),
        w("witty", "/ˈwɪti/", "adj", "hóm hỉnh", "clever and funny with words", "He made a witty comment about the weather."),
        w("charming", "/ˈtʃɑːmɪŋ/", "adj", "duyên dáng", "pleasant and attractive", "Our host was charming and welcoming."),
        w("trustworthy", "/ˈtrʌstwɜːði/", "adj", "đáng tin cậy", "able to be trusted", "He is a trustworthy colleague."),
        w("sincere", "/sɪnˈsɪə(r)/", "adj", "chân thành", "honest and genuine", "Please accept my sincere apologies."),
        w("open-minded", "/ˌəʊpən ˈmaɪndɪd/", "adj", "cởi mở", "willing to hear new ideas", "She has an open-minded attitude to life."),
        w("gentle", "/ˈdʒentl/", "adj", "dịu dàng", "kind and calm", "He has a gentle way with animals."),
      ],
    },
    {
      title: "Tính cách tiêu cực",
      summary:
        "20 tính từ mô tả những nét tính cách khó chịu và cách chúng thể hiện ra bên ngoài.",
      sections: [
        {
          title: "Thô lỗ và kiêu ngạo",
          body: `- **rude / impolite**: thô lỗ / bất lịch sự
- **arrogant**: kiêu ngạo
- **stubborn**: bướng bỉnh
- **impatient**: thiếu kiên nhẫn
- **moody**: thất thường
- **bossy**: hay sai khiến

Mẫu câu:
- It is **rude** to interrupt people.
- He can be **stubborn** and refuse to listen.`,
          remember: "rude to somebody; impolite to do something.",
        },
        {
          title: "Thiếu trách nhiệm và hẹp hòi",
          body: `- **aggressive / unreliable**: hung hăng / không đáng tin
- **careless / lazy**: bất cẩn / lười biếng
- **greedy**: tham lam
- **narrow-minded / pessimistic**: hẹp hòi / bi quan
- **sensitive / shy / reserved**: nhạy cảm / nhút nhát / kín đáo
- **bad-tempered / cheeky / mischievous**: nóng tính / láu lỉnh / tinh nghịch

Mẫu câu:
- **Careless** driving causes accidents.
- He is **sensitive** to criticism.`,
          remember: "sensitive to something — nhạy cảm với điều gì.",
        },
      ],
      words: [
        w("rude", "/ruːd/", "adj", "thô lỗ", "not polite", "It is rude to shout at people."),
        w("impolite", "/ˌɪmpəˈlaɪt/", "adj", "bất lịch sự", "not showing good manners", "It would be impolite to refuse the invitation."),
        w("arrogant", "/ˈærəɡənt/", "adj", "kiêu ngạo", "thinking you are better than others", "He is talented but arrogant."),
        w("stubborn", "/ˈstʌbən/", "adj", "bướng bỉnh", "refusing to change your mind", "My brother is too stubborn to apologise."),
        w("impatient", "/ɪmˈpeɪʃnt/", "adj", "thiếu kiên nhẫn", "unable to wait calmly", "Drivers get impatient in traffic."),
        w("moody", "/ˈmuːdi/", "adj", "thất thường", "changing mood quickly", "Teenagers can be moody."),
        w("aggressive", "/əˈɡresɪv/", "adj", "hung hăng", "angry and ready to attack", "The dog became aggressive near strangers."),
        w("unreliable", "/ˌʌnrɪˈlaɪəbl/", "adj", "không đáng tin", "not able to be trusted", "The bus service is unreliable."),
        w("careless", "/ˈkeələs/", "adj", "bất cẩn", "not paying enough attention", "A careless mistake cost him the game."),
        w("lazy", "/ˈleɪzi/", "adj", "lười biếng", "not wanting to work", "He is too lazy to tidy his room."),
        w("greedy", "/ˈɡriːdi/", "adj", "tham lam", "wanting more than you need", "Don't be greedy — leave some cake for others."),
        w("narrow-minded", "/ˌnærəʊ ˈmaɪndɪd/", "adj", "hẹp hòi", "not willing to accept new ideas", "It is a narrow-minded view."),
        w("pessimistic", "/ˌpesɪˈmɪstɪk/", "adj", "bi quan", "expecting bad things to happen", "He is pessimistic about the economy."),
        w("sensitive", "/ˈsensətɪv/", "adj", "nhạy cảm", "easily affected or upset", "She is sensitive to loud noise."),
        w("shy", "/ʃaɪ/", "adj", "nhút nhát", "nervous with other people", "He was too shy to speak first."),
        w("reserved", "/rɪˈzɜːvd/", "adj", "kín đáo", "not talking much about feelings", "She is quiet and reserved at work."),
        w("bad-tempered", "/ˌbæd ˈtempəd/", "adj", "nóng tính", "often angry or impatient", "He gets bad-tempered when he is tired."),
        w("bossy", "/ˈbɒsi/", "adj", "hay sai khiến", "telling other people what to do", "My sister can be very bossy."),
        w("cheeky", "/ˈtʃiːki/", "adj", "láu lỉnh", "rude in a funny or playful way", "The boy gave a cheeky answer."),
        w("mischievous", "/ˈmɪstʃɪvəs/", "adj", "tinh nghịch", "liking to play tricks", "The puppy has a mischievous look."),
      ],
    },
  ],
};
