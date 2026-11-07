import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 09: Sức khỏe & thể chất. */
export const TOPIC_09: SeedVocabTopic = {
  name: "Sức khỏe & thể chất",
  slug: "suc-khoe-the-chat",
  icon: "health_and_safety",
  description:
    "Từ vựng về bộ phận cơ thể, triệu chứng, điều trị và lối sống lành mạnh.",
  lessons: [
    {
      title: "Bộ phận cơ thể",
      summary:
        "20 từ/cụm từ chỉ các bộ phận bên ngoài và cơ quan bên trong cơ thể người.",
      sections: [
        {
          title: "Bên ngoài cơ thể",
          body: `- **forehead / cheek / chin**: trán / má / cằm
- **neck / shoulder**: cổ / vai
- **elbow / wrist**: khuỷu tay / cổ tay
- **finger / thumb**: ngón tay / ngón cái
- **knee / ankle**: đầu gối / mắt cá chân

Mẫu câu:
- He hurt his **knee** while playing football.
- She wore a ring on her **thumb**.`,
          remember: "thumb là ngón cái; toe là ngón chân.",
        },
        {
          title: "Bên trong cơ thể",
          body: `- **chest / stomach**: ngực / dạ dày
- **lung / heart**: phổi / tim
- **brain**: não
- **skin / bone / muscle**: da / xương / cơ

Mẫu câu:
- Smoking is bad for your **lungs**.
- Exercise strengthens your **muscles**.`,
          remember: "stomach vừa là dạ dày vừa là bụng; belly thân mật hơn.",
        },
      ],
      words: [
        w("forehead", "/ˈfɔːhed/", "n", "trán", "the front part of your head above your eyes", "She touched his forehead to check his temperature."),
        w("cheek", "/tʃiːk/", "n", "má", "the soft side of your face", "The child had red cheeks."),
        w("chin", "/tʃɪn/", "n", "cằm", "the part of your face below your mouth", "He rested his chin on his hand."),
        w("neck", "/nek/", "n", "cổ", "the part connecting your head to your body", "My neck hurts after sitting at the computer."),
        w("shoulder", "/ˈʃəʊldə(r)/", "n", "vai", "the part between your neck and arm", "She carried the bag on her shoulder."),
        w("elbow", "/ˈelbəʊ/", "n", "khuỷu tay", "the joint in the middle of your arm", "He hit his elbow on the door."),
        w("wrist", "/rɪst/", "n", "cổ tay", "the joint between your hand and arm", "I wear a watch on my wrist."),
        w("finger", "/ˈfɪŋɡə(r)/", "n", "ngón tay", "one of the long parts of your hand", "She pointed her finger at the map."),
        w("thumb", "/θʌm/", "n", "ngón tay cái", "the short thick finger on your hand", "He hurt his thumb with the hammer."),
        w("knee", "/niː/", "n", "đầu gối", "the joint in the middle of your leg", "My knee hurts when I run."),
        w("ankle", "/ˈæŋkl/", "n", "mắt cá chân", "the joint connecting your foot to your leg", "She twisted her ankle on the stairs."),
        w("back", "/bæk/", "n", "lưng", "the rear part of your body", "He has a bad back."),
        w("chest", "/tʃest/", "n", "ngực", "the front part of your body between neck and stomach", "She felt a pain in her chest."),
        w("stomach", "/ˈstʌmək/", "n", "dạ dày, bụng", "the organ where food is digested", "My stomach is full."),
        w("lung", "/lʌŋ/", "n", "phổi", "one of the organs used for breathing", "Fresh air is good for your lungs."),
        w("heart", "/hɑːt/", "n", "tim", "the organ that pumps blood", "Exercise keeps your heart healthy."),
        w("brain", "/breɪn/", "n", "não", "the organ that controls thought and movement", "The brain needs rest to work well."),
        w("skin", "/skɪn/", "n", "da", "the outer covering of your body", "Protect your skin from the sun."),
        w("bone", "/bəʊn/", "n", "xương", "one of the hard parts inside your body", "Milk helps build strong bones."),
        w("muscle", "/ˈmʌsl/", "n", "cơ", "tissue in the body that produces movement", "Stretching helps prevent muscle pain."),
      ],
    },
    {
      title: "Bệnh & chấn thương",
      summary:
        "20 từ/cụm từ về bệnh thường gặp, triệu chứng, vết thương và cách mô tả cơn đau.",
      sections: [
        {
          title: "Bệnh thường gặp",
          body: `- **illness / disease**: bệnh tật / căn bệnh
- **flu / fever**: cúm / sốt
- **cough / sneeze**: ho / hắt hơi
- **sore throat**: đau họng
- **stomachache / toothache / earache**: đau bụng / đau răng / đau tai
- **rash**: phát ban

Mẫu câu:
- I have a **sore throat** and a **fever**.
- She caught the **flu** last winter.`,
          remember: "have a cold / have the flu — cold dùng a, flu thường dùng the.",
        },
        {
          title: "Chấn thương",
          body: `- **wound / injury**: vết thương / chấn thương
- **injure**: làm bị thương
- **sprain**: bong gân
- **fracture**: gãy xương
- **bleed**: chảy máu
- **dizzy**: chóng mặt
- **nausea**: buồn nôn
- **symptom**: triệu chứng

Mẫu câu:
- He **injured** his ankle during the match.
- I felt **dizzy** and had to sit down.`,
          remember: "injure là động từ; injury là danh từ.",
        },
      ],
      words: [
        w("illness", "/ˈɪlnəs/", "n", "bệnh tật", "the state of being unwell", "She missed a week of work because of illness."),
        w("disease", "/dɪˈziːz/", "n", "căn bệnh", "a medical condition affecting the body", "Heart disease is a serious problem."),
        w("flu", "/fluː/", "n", "bệnh cúm", "an illness like a bad cold, with fever", "He is in bed with the flu."),
        w("fever", "/ˈfiːvə(r)/", "n", "sốt", "a body temperature that is too high", "The child has a high fever."),
        w("cough", "/kɒf/", "n/v", "ho", "to push air out of your throat noisily", "I have had a cough for a week."),
        w("sneeze", "/sniːz/", "v/n", "hắt hơi", "to force air out of your nose suddenly", "Cover your mouth when you sneeze."),
        w("sore throat", "/ˌsɔː ˈθrəʊt/", "n", "đau họng", "a painful throat", "Warm tea helps a sore throat."),
        w("stomachache", "/ˈstʌməkeɪk/", "n", "đau bụng", "pain in your stomach", "I had a stomachache after lunch."),
        w("toothache", "/ˈtuːθeɪk/", "n", "đau răng", "pain in a tooth", "He went to the dentist because of a toothache."),
        w("earache", "/ˈɪəreɪk/", "n", "đau tai", "pain in your ear", "The little boy has an earache."),
        w("rash", "/ræʃ/", "n", "phát ban", "red spots on the skin", "The rash disappeared after a few days."),
        w("wound", "/wuːnd/", "n", "vết thương", "an injury that cuts or breaks the skin", "The nurse cleaned the wound."),
        w("injury", "/ˈɪndʒəri/", "n", "chấn thương", "damage to your body", "He missed the final because of an injury."),
        w("injure", "/ˈɪndʒə(r)/", "v", "làm bị thương", "to hurt someone or yourself", "She injured her shoulder at the gym."),
        w("sprain", "/spreɪn/", "v/n", "bong gân", "to damage a joint by twisting it", "I sprained my ankle while running."),
        w("fracture", "/ˈfræktʃə(r)/", "n/v", "gãy xương", "a break in a bone", "The X-ray showed a small fracture."),
        w("bleed", "/bliːd/", "v", "chảy máu", "to lose blood", "His nose started to bleed."),
        w("dizzy", "/ˈdɪzi/", "adj", "chóng mặt", "feeling that everything is spinning", "I felt dizzy when I stood up."),
        w("nausea", "/ˈnɔːziə/", "n", "buồn nôn", "the feeling that you might vomit", "The medicine can cause nausea."),
        w("symptom", "/ˈsɪmptəm/", "n", "triệu chứng", "a sign of an illness", "A high temperature is a common symptom."),
      ],
    },
    {
      title: "Khám & điều trị",
      summary:
        "20 từ/cụm từ về đơn thuốc, thuốc, tiêm chủng, phẫu thuật và quá trình hồi phục.",
      sections: [
        {
          title: "Thuốc và đơn thuốc",
          body: `- **treatment**: cách điều trị
- **cure**: chữa khỏi
- **prescribe / prescription**: kê đơn / đơn thuốc
- **pill / tablet**: viên thuốc
- **dose**: liều lượng
- **antibiotic**: thuốc kháng sinh
- **vaccine**: vắc-xin

Mẫu câu:
- The doctor **prescribed** some **antibiotics**.
- Take one **tablet** twice a day.`,
          remember: "cure là chữa khỏi hẳn; treat là điều trị, chưa chắc khỏi.",
        },
        {
          title: "Thủ thuật và hồi phục",
          body: `- **injection**: mũi tiêm
- **bandage / plaster**: băng gạc / băng dán
- **surgery / operation**: phẫu thuật / ca mổ
- **recover / recovery**: hồi phục / sự hồi phục
- **check-up**: khám sức khỏe định kỳ
- **patient**: bệnh nhân

Mẫu câu:
- He had an **operation** on his knee.
- She is **recovering** well at home.`,
          remember: "operation là ca phẫu thuật; surgery là ngành/lĩnh vực phẫu thuật.",
        },
      ],
      words: [
        w("treatment", "/ˈtriːtmənt/", "n", "cách điều trị", "medical care for an illness", "The treatment lasted six weeks."),
        w("cure", "/kjʊə(r)/", "v/n", "chữa khỏi; cách chữa", "to make an illness go away completely", "There is no cure for this virus."),
        w("prescribe", "/prɪˈskraɪb/", "v", "kê đơn", "to order medicine for a patient", "The doctor prescribed painkillers."),
        w("prescription", "/prɪˈskrɪpʃn/", "n", "đơn thuốc", "a written order for medicine", "You need a prescription for these tablets."),
        w("pill", "/pɪl/", "n", "viên thuốc", "a small round piece of medicine", "Take the pill with water."),
        w("tablet", "/ˈtæblət/", "n", "viên nén", "a small flat piece of medicine", "Take one tablet after breakfast."),
        w("dose", "/dəʊs/", "n", "liều lượng", "the amount of medicine to take", "Do not exceed the recommended dose."),
        w("drugstore", "/ˈdrʌɡstɔː(r)/", "n", "hiệu thuốc (Mỹ)", "a shop that sells medicine", "I bought some aspirin at the drugstore."),
        w("chemist", "/ˈkemɪst/", "n", "hiệu thuốc (Anh)", "a shop or person that prepares and sells medicine", "Ask the chemist for advice."),
        w("antibiotic", "/ˌæntibaɪˈɒtɪk/", "n", "thuốc kháng sinh", "a medicine that kills bacteria", "Antibiotics do not work against viruses."),
        w("vaccine", "/ˈvæksiːn/", "n", "vắc-xin", "a substance that protects against a disease", "The vaccine is free for children."),
        w("injection", "/ɪnˈdʒekʃn/", "n", "mũi tiêm", "medicine put into the body with a needle", "The nurse gave me an injection."),
        w("bandage", "/ˈbændɪdʒ/", "n/v", "băng gạc; băng bó", "a strip of cloth used to cover a wound", "The nurse put a bandage on his arm."),
        w("plaster", "/ˈplɑːstə(r)/", "n", "băng dán", "a small sticky covering for a cut", "I need a plaster for this cut."),
        w("surgery", "/ˈsɜːdʒəri/", "n", "phẫu thuật", "medical treatment that involves cutting the body", "He needed surgery on his back."),
        w("operation", "/ˌɒpəˈreɪʃn/", "n", "ca phẫu thuật", "a medical procedure performed by a surgeon", "The operation was successful."),
        w("recover", "/rɪˈkʌvə(r)/", "v", "hồi phục", "to become well again", "It took him a month to recover."),
        w("recovery", "/rɪˈkʌvəri/", "n", "sự hồi phục", "the process of getting better", "She made a full recovery."),
        w("check-up", "/ˈtʃek ʌp/", "n", "khám sức khỏe định kỳ", "a regular medical examination", "I have a dental check-up tomorrow."),
        w("patient", "/ˈpeɪʃnt/", "n", "bệnh nhân", "a person receiving medical treatment", "The doctor sees ten patients a day."),
      ],
    },
    {
      title: "Lối sống lành mạnh",
      summary:
        "20 từ/cụm từ về tập luyện, dinh dưỡng, năng lượng và thói quen tốt cho sức khỏe.",
      sections: [
        {
          title: "Vận động và thể lực",
          body: `- **fitness**: thể lực
- **workout**: buổi tập luyện
- **strength / stamina**: sức mạnh / sức bền
- **flexibility**: độ dẻo dai
- **posture**: tư thế
- **active / sedentary**: năng động / ít vận động

Mẫu câu:
- Regular exercise improves your **fitness**.
- A **sedentary** lifestyle is bad for your health.`,
          remember: "sedentary lifestyle = lối sống ngồi nhiều, ít vận động.",
        },
        {
          title: "Dinh dưỡng và phòng bệnh",
          body: `- **nutrition / nutritious**: dinh dưỡng / giàu dinh dưỡng
- **vitamin / protein / fibre**: vitamin / chất đạm / chất xơ
- **calorie**: calo
- **hydration / hydrate**: sự cấp nước / bổ sung nước
- **immunity / prevention**: khả năng miễn dịch / sự phòng ngừa
- **well-being**: sức khỏe tinh thần và thể chất

Mẫu câu:
- Fruit and vegetables are **nutritious**.
- Good sleep supports your **immune system**.`,
          remember: "nutrition là lĩnh vực dinh dưỡng; nutritious là giàu dinh dưỡng.",
        },
      ],
      words: [
        w("fitness", "/ˈfɪtnəs/", "n", "thể lực", "the condition of being physically healthy", "Swimming improves your fitness."),
        w("workout", "/ˈwɜːkaʊt/", "n", "buổi tập luyện", "a period of physical exercise", "I do a short workout every morning."),
        w("nutrition", "/njuˈtrɪʃn/", "n", "dinh dưỡng", "the process of getting food for health", "Good nutrition is essential for children."),
        w("nutritious", "/njuˈtrɪʃəs/", "adj", "giàu dinh dưỡng", "containing substances that keep you healthy", "Beans are cheap and nutritious."),
        w("vitamin", "/ˈvɪtəmɪn/", "n", "vitamin", "a substance in food that your body needs", "Oranges are rich in vitamin C."),
        w("protein", "/ˈprəʊtiːn/", "n", "chất đạm", "a substance in food needed to build muscle", "Eggs are a good source of protein."),
        w("fibre", "/ˈfaɪbə(r)/", "n", "chất xơ", "plant material that helps digestion", "Vegetables and grains are high in fibre."),
        w("calorie", "/ˈkæləri/", "n", "calo", "a unit for measuring energy in food", "This drink contains only ten calories."),
        w("hydration", "/ˌhaɪˈdreɪʃn/", "n", "sự cấp nước", "the process of supplying water to the body", "Hydration is important during exercise."),
        w("hydrate", "/ˈhaɪdreɪt/", "v", "bổ sung nước", "to supply the body with water", "Remember to hydrate before you run."),
        w("active", "/ˈæktɪv/", "adj", "năng động", "physically energetic and moving often", "Try to stay active every day."),
        w("sedentary", "/ˈsedntri/", "adj", "ít vận động", "spending a lot of time sitting down", "Office workers often have a sedentary lifestyle."),
        w("lifestyle", "/ˈlaɪfstaɪl/", "n", "lối sống", "the way you live", "They have a healthy lifestyle."),
        w("well-being", "/ˌwel ˈbiːɪŋ/", "n", "sức khỏe toàn diện", "the state of being comfortable and healthy", "Music improves my sense of well-being."),
        w("immunity", "/ɪˈmjuːnəti/", "n", "khả năng miễn dịch", "the body's ability to resist disease", "Vaccines build immunity."),
        w("prevention", "/prɪˈvenʃn/", "n", "sự phòng ngừa", "the act of stopping something bad from happening", "Prevention is better than cure."),
        w("strength", "/streŋθ/", "n", "sức mạnh", "the quality of being physically strong", "Lifting weights builds strength."),
        w("stamina", "/ˈstæmɪnə/", "n", "sức bền", "the ability to continue for a long time", "Running improves your stamina."),
        w("flexibility", "/ˌfleksəˈbɪləti/", "n", "độ dẻo dai", "the ability to bend easily", "Yoga improves flexibility."),
        w("posture", "/ˈpɒstʃə(r)/", "n", "tư thế", "the position in which you hold your body", "Good posture can reduce back pain."),
      ],
    },
  ],
};
