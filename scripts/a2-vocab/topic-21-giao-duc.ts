import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 21: Giáo dục & tương lai. */
export const TOPIC_21: SeedVocabTopic = {
  name: "Giáo dục & tương lai",
  slug: "giao-duc-tuong-lai",
  icon: "school",
  description:
    "Từ vựng về học tập suốt đời, kỹ năng học, hướng nghiệp và xu hướng giáo dục mới.",
  lessons: [
    {
      title: "Học tập suốt đời",
      summary:
        "20 từ/cụm từ về kiến thức, kỹ năng, động lực học và các hình thức học ngoài trường.",
      sections: [
        {
          title: "Kiến thức và năng lực",
          body: `- **lifelong learning**: học tập suốt đời
- **skill / knowledge**: kỹ năng / kiến thức
- **ability / talent / potential**: khả năng / tài năng / tiềm năng
- **curiosity / motivation**: sự tò mò / động lực
- **target / self-study**: mục tiêu / tự học

Mẫu câu:
- **Lifelong learning** keeps your mind active.
- She has a natural **talent** for languages.`,
          remember: "learn something (không dùng learn about với kỹ năng cụ thể).",
        },
        {
          title: "Các hình thức học",
          body: `- **online course / distance learning**: khóa học trực tuyến / học từ xa
- **workshop / tutorial**: hội thảo thực hành / buổi hướng dẫn
- **tuition**: học phí, sự giảng dạy
- **scholarship / grant**: học bổng / trợ cấp
- **enrolment / enrol**: sự ghi danh / ghi danh

Mẫu câu:
- He applied for a **scholarship** to study abroad.
- You can **enrol** online in minutes.`,
          remember: "scholarship là học bổng dựa trên thành tích; grant thường là trợ cấp.",
        },
      ],
      words: [
        w("lifelong learning", "/ˌlaɪflɒŋ ˈlɜːnɪŋ/", "n", "học tập suốt đời", "learning that continues throughout life", "Lifelong learning helps people adapt to change."),
        w("skill", "/skɪl/", "n", "kỹ năng", "the ability to do something well", "Communication is an important skill."),
        w("knowledge", "/ˈnɒlɪdʒ/", "n", "kiến thức", "information and understanding about a subject", "She has a lot of knowledge about history."),
        w("ability", "/əˈbɪləti/", "n", "khả năng", "the power or skill to do something", "He has the ability to learn quickly."),
        w("talent", "/ˈtælənt/", "n", "tài năng", "a natural ability", "She has a talent for drawing."),
        w("potential", "/pəˈtenʃl/", "n", "tiềm năng", "the ability to develop in the future", "The course helps students reach their potential."),
        w("curiosity", "/ˌkjʊəriˈɒsəti/", "n", "sự tò mò", "a strong wish to learn about things", "Curiosity is the start of learning."),
        w("motivation", "/ˌməʊtɪˈveɪʃn/", "n", "động lực", "the reason or energy to do something", "Praise can increase motivation."),
        w("motivated", "/ˈməʊtɪveɪtɪd/", "adj", "có động lực", "wanting to do something", "The students are highly motivated."),
        w("target", "/ˈtɑːɡɪt/", "n", "mục tiêu", "a result you aim to achieve", "My target is to read ten books this year."),
        w("self-study", "/ˌself ˈstʌdi/", "n", "tự học", "learning without a teacher", "Self-study requires discipline."),
        w("online course", "/ˌɒnlaɪn ˈkɔːs/", "n", "khóa học trực tuyến", "a course taken over the internet", "I finished an online course in web design."),
        w("workshop", "/ˈwɜːkʃɒp/", "n", "hội thảo thực hành", "a practical class on a subject", "She attended a writing workshop."),
        w("tutorial", "/tjuːˈtɔːriəl/", "n", "buổi hướng dẫn", "a small teaching session", "The tutorial covers grammar and writing."),
        w("distance learning", "/ˈdɪstəns lɜːnɪŋ/", "n", "học từ xa", "studying without attending a school", "Distance learning is popular with working adults."),
        w("tuition", "/tjuˈɪʃn/", "n", "học phí; sự giảng dạy", "money paid for teaching", "Tuition fees have increased this year."),
        w("scholarship", "/ˈskɒləʃɪp/", "n", "học bổng", "money given to a student to study", "She won a scholarship to a top university."),
        w("grant", "/ɡrɑːnt/", "n", "khoản trợ cấp", "money given for a particular purpose", "He received a research grant."),
        w("enrolment", "/ɪnˈrəʊlmənt/", "n", "sự ghi danh", "the act of joining a course", "Enrolment closes at the end of August."),
        w("enrol", "/ɪnˈrəʊl/", "v", "ghi danh", "to join a course officially", "She enrolled in a part-time degree."),
      ],
    },
    {
      title: "Kỹ năng học tập",
      summary:
        "20 từ/cụm từ về tập trung, quản lý thời gian, ghi nhớ và các phương pháp học hiệu quả.",
      sections: [
        {
          title: "Tập trung và tổ chức",
          body: `- **concentrate / focus**: tập trung
- **organise / prioritise**: sắp xếp / ưu tiên
- **plan / manage time**: lên kế hoạch / quản lý thời gian
- **objective / strategy**: mục tiêu / chiến lược
- **method / technique**: phương pháp / kỹ thuật

Mẫu câu:
- It is hard to **concentrate** in a noisy room.
- **Prioritise** the tasks that are due first.`,
          remember: "concentrate on something; focus on something.",
        },
        {
          title: "Luyện tập và ghi nhớ",
          body: `- **practise / repetition**: luyện tập / sự lặp lại
- **recall / comprehension**: nhớ lại / sự hiểu
- **critical thinking**: tư duy phản biện
- **problem-solving / teamwork**: giải quyết vấn đề / làm việc nhóm
- **creativity / confidence / improvement**: sáng tạo / tự tin / sự cải thiện

Mẫu câu:
- Regular **repetition** helps you remember new words.
- Group projects develop **teamwork** skills.`,
          remember: "practise là động từ (Anh); practice là danh từ.",
        },
      ],
      words: [
        w("concentrate", "/ˈkɒnsntreɪt/", "v", "tập trung", "to give all your attention to something", "I can't concentrate with the TV on."),
        w("focus", "/ˈfəʊkəs/", "v/n", "tập trung; sự tập trung", "to direct your attention to something", "Focus on one task at a time."),
        w("organise", "/ˈɔːɡənaɪz/", "v", "sắp xếp", "to plan and arrange things", "She organised her notes by topic."),
        w("prioritise", "/praɪˈɒrətaɪz/", "v", "ưu tiên", "to decide what is most important", "You need to prioritise your work."),
        w("plan", "/plæn/", "v/n", "lên kế hoạch; kế hoạch", "to decide how to do something", "We planned our revision schedule."),
        w("manage time", "/ˌmænɪdʒ ˈtaɪm/", "phrase", "quản lý thời gian", "to use your time efficiently", "Learning to manage time is essential at university."),
        w("objective", "/əbˈdʒektɪv/", "n", "mục tiêu", "something you plan to achieve", "The objective of the lesson is clear."),
        w("strategy", "/ˈstrætədʒi/", "n", "chiến lược", "a plan for achieving something", "She has a good strategy for exams."),
        w("method", "/ˈmeθəd/", "n", "phương pháp", "a way of doing something", "This method works well for vocabulary."),
        w("technique", "/tekˈniːk/", "n", "kỹ thuật", "a particular way of doing something", "Try a different study technique."),
        w("practise", "/ˈpræktɪs/", "v", "luyện tập", "to do something regularly to improve", "Practise speaking English every day."),
        w("repetition", "/ˌrepəˈtɪʃn/", "n", "sự lặp lại", "doing the same thing many times", "Repetition helps with memorisation."),
        w("recall", "/rɪˈkɔːl/", "v", "nhớ lại", "to remember something", "I couldn't recall the answer."),
        w("comprehension", "/ˌkɒmprɪˈhenʃn/", "n", "sự hiểu", "the ability to understand something", "The test checks reading comprehension."),
        w("critical thinking", "/ˌkrɪtɪkl ˈθɪŋkɪŋ/", "n", "tư duy phản biện", "the ability to think carefully and question ideas", "University encourages critical thinking."),
        w("problem-solving", "/ˈprɒbləm sɒlvɪŋ/", "n", "giải quyết vấn đề", "the process of finding solutions", "The course focuses on problem-solving."),
        w("teamwork", "/ˈtiːmwɜːk/", "n", "làm việc nhóm", "working well with other people", "Teamwork is important in most jobs."),
        w("creativity", "/ˌkriːeɪˈtɪvəti/", "n", "sự sáng tạo", "the ability to produce new ideas", "The project rewards creativity."),
        w("confidence", "/ˈkɒnfɪdəns/", "n", "sự tự tin", "belief in your own ability", "Speaking in class builds confidence."),
        w("improvement", "/ɪmˈpruːvmənt/", "n", "sự cải thiện", "the process of getting better", "There has been a clear improvement in her writing."),
      ],
    },
    {
      title: "Hướng nghiệp & tương lai",
      summary:
        "20 từ/cụm từ về ước mơ nghề nghiệp, thực tập, cố vấn và triển vọng việc làm.",
      sections: [
        {
          title: "Ước mơ và con đường",
          body: `- **aspiration / ambition**: khát vọng / tham vọng
- **dream job**: công việc mơ ước
- **pathway**: con đường, lộ trình
- **internship / apprentice**: kỳ thực tập / người học việc
- **apprenticeship**: chương trình học nghề
- **work experience**: kinh nghiệm làm việc

Mẫu câu:
- Her **dream job** is to work in film.
- He did an **internship** at a design studio.`,
          remember: "an internship at a company; an apprenticeship in a trade.",
        },
        {
          title: "Cố vấn và triển vọng",
          body: `- **mentor / guidance**: người cố vấn / sự hướng dẫn
- **career advisor**: cố vấn nghề nghiệp
- **skill set / transferable**: bộ kỹ năng / có thể chuyển đổi
- **sector / industry**: lĩnh vực / ngành
- **prospects / advancement**: triển vọng / sự thăng tiến
- **freelance / self-employed / redundancy**: làm tự do / tự làm chủ / sự dư thừa nhân sự

Mẫu câu:
- A **mentor** can help you plan your career.
- Technical skills are **transferable** between industries.`,
          remember: "career prospects = triển vọng nghề nghiệp.",
        },
      ],
      words: [
        w("aspiration", "/ˌæspəˈreɪʃn/", "n", "khát vọng", "a strong hope or ambition", "She has aspirations to become a doctor."),
        w("dream job", "/ˌdriːm ˈdʒɒb/", "n", "công việc mơ ước", "the job you most want", "He finally got his dream job."),
        w("ambition", "/æmˈbɪʃn/", "n", "tham vọng", "a strong desire to achieve something", "Her ambition is to run her own company."),
        w("pathway", "/ˈpɑːθweɪ/", "n", "con đường, lộ trình", "a route to a goal", "The course offers a pathway to university."),
        w("internship", "/ˈɪntɜːnʃɪp/", "n", "kỳ thực tập", "a period of work for experience", "She completed a summer internship."),
        w("apprentice", "/əˈprentɪs/", "n", "người học việc", "a person learning a trade", "He started as an apprentice electrician."),
        w("apprenticeship", "/əˈprentɪʃɪp/", "n", "chương trình học nghề", "a training programme for a trade", "She chose an apprenticeship instead of university."),
        w("work experience", "/ˈwɜːk ɪkˌspɪəriəns/", "n", "kinh nghiệm làm việc", "time spent working to learn about a job", "The school arranges work experience for students."),
        w("mentor", "/ˈmentɔː(r)/", "n", "người cố vấn", "an experienced person who advises you", "My mentor helped me prepare for interviews."),
        w("guidance", "/ˈɡaɪdns/", "n", "sự hướng dẫn", "help and advice", "Students can ask for careers guidance."),
        w("career advisor", "/kəˈrɪər ədˌvaɪzə(r)/", "n", "cố vấn nghề nghiệp", "a person who helps with career choices", "The career advisor suggested several options."),
        w("skill set", "/ˈskɪl set/", "n", "bộ kỹ năng", "the skills a person has", "The job requires a broad skill set."),
        w("transferable", "/trænsˈfɜːrəbl/", "adj", "có thể chuyển đổi", "useful in different jobs", "Communication is a transferable skill."),
        w("sector", "/ˈsektə(r)/", "n", "lĩnh vực", "a part of the economy", "She works in the public sector."),
        w("industry", "/ˈɪndəstri/", "n", "ngành công nghiệp", "the production of goods or services", "The film industry is growing."),
        w("prospects", "/ˈprɒspekts/", "n", "triển vọng", "chances of future success", "The job offers good career prospects."),
        w("advancement", "/ədˈvɑːnsmənt/", "n", "sự thăng tiến", "the chance to move to a higher position", "She is keen on professional advancement."),
        w("freelance", "/ˈfriːlɑːns/", "adj/v", "làm tự do", "working independently for different clients", "He works as a freelance writer."),
        w("self-employed", "/ˌself ɪmˈplɔɪd/", "adj", "tự làm chủ", "working for yourself", "Self-employed people pay their own tax."),
        w("redundancy", "/rɪˈdʌndənsi/", "n", "sự dư thừa nhân sự", "losing a job because it is no longer needed", "The factory announced fifty redundancies."),
      ],
    },
    {
      title: "Tương lai giáo dục",
      summary:
        "20 từ/cụm từ về công nghệ trong lớp học, đánh giá và xu hướng học tập mới.",
      sections: [
        {
          title: "Công nghệ và hình thức học mới",
          body: `- **future / prediction**: tương lai / dự đoán
- **virtual reality / online learning**: thực tế ảo / học trực tuyến
- **blended learning**: học kết hợp
- **personalised / interactive**: cá nhân hóa / tương tác
- **digital literacy / robotics**: kỹ năng số / ngành robot

Mẫu câu:
- **Blended learning** combines online and classroom study.
- **Interactive** lessons keep students engaged.`,
          remember: "blended learning = học kết hợp trực tuyến và trực tiếp.",
        },
        {
          title: "Chương trình và đánh giá",
          body: `- **syllabus / assessment**: chương trình môn học / sự đánh giá
- **examination / credential**: kỳ thi / chứng chỉ
- **academic / vocational**: học thuật / hướng nghiệp
- **practical / theoretical**: thực tiễn / lý thuyết
- **critical / independent / lifelong**: phê phán / độc lập / suốt đời

Mẫu câu:
- The **syllabus** lists all the topics for the year.
- **Vocational** courses prepare students for specific jobs.`,
          remember: "assessment có thể là đánh giá quá trình, không chỉ thi.",
        },
      ],
      words: [
        w("future", "/ˈfjuːtʃə(r)/", "n", "tương lai", "the time that will come", "Education shapes the future."),
        w("prediction", "/prɪˈdɪkʃn/", "n", "dự đoán", "a statement about what will happen", "Her prediction about online learning was right."),
        w("virtual reality", "/ˌvɜːtʃuəl riˈæləti/", "n", "thực tế ảo", "a computer-generated environment", "Students explored ancient Rome in virtual reality."),
        w("online learning", "/ˌɒnlaɪn ˈlɜːnɪŋ/", "n", "học trực tuyến", "studying using the internet", "Online learning became common during the pandemic."),
        w("blended learning", "/ˌblendɪd ˈlɜːnɪŋ/", "n", "học kết hợp", "a mix of online and in-person classes", "The school uses blended learning."),
        w("personalised", "/ˈpɜːsənaɪzd/", "adj", "cá nhân hóa", "designed for one person's needs", "The app offers personalised exercises."),
        w("interactive", "/ˌɪntərˈæktɪv/", "adj", "tương tác", "involving communication with the user", "The museum has interactive displays."),
        w("digital literacy", "/ˌdɪdʒɪtl ˈlɪtərəsi/", "n", "kỹ năng số", "the ability to use digital technology", "Digital literacy is now a basic skill."),
        w("robotics", "/rəʊˈbɒtɪks/", "n", "ngành robot", "the science of designing robots", "The university offers a course in robotics."),
        w("syllabus", "/ˈsɪləbəs/", "n", "chương trình môn học", "a list of topics in a course", "The syllabus is available online."),
        w("assessment", "/əˈsesmənt/", "n", "sự đánh giá", "the process of testing ability", "Assessment includes essays and presentations."),
        w("examination", "/ɪɡˌzæmɪˈneɪʃn/", "n", "kỳ thi", "a formal test of knowledge", "The examination lasts three hours."),
        w("credential", "/krəˈdenʃl/", "n", "chứng chỉ, bằng cấp", "a qualification that proves ability", "Employers check candidates' credentials."),
        w("academic", "/ˌækəˈdemɪk/", "adj", "học thuật", "relating to study and education", "She has a strong academic background."),
        w("vocational", "/vəʊˈkeɪʃənl/", "adj", "hướng nghiệp", "teaching skills for a particular job", "Vocational training is practical and focused."),
        w("practical", "/ˈpræktɪkl/", "adj", "thực tiễn", "useful in real situations", "The course is more practical than theoretical."),
        w("theoretical", "/ˌθɪəˈretɪkl/", "adj", "lý thuyết", "based on ideas rather than practice", "The first term is mainly theoretical."),
        w("critical", "/ˈkrɪtɪkl/", "adj", "phê phán", "carefully judging information", "Critical reading is an important skill."),
        w("independent", "/ˌɪndɪˈpendənt/", "adj", "độc lập", "able to work or learn alone", "Older students are expected to be independent."),
        w("lifelong", "/ˈlaɪflɒŋ/", "adj", "suốt đời", "continuing through your whole life", "She has a lifelong interest in science."),
      ],
    },
  ],
};
