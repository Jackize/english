import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 05: Trường học & học tập. */
export const TOPIC_05: SeedVocabTopic = {
  name: "Trường học & học tập",
  slug: "truong-hoc-hoc-tap",
  icon: "school",
  description:
    "Từ vựng về cấp học, môn học, hoạt động học tập, kỳ thi và đời sống học đường.",
  lessons: [
    {
      title: "Cấp học & nơi học",
      summary:
        "20 từ/cụm từ về các cấp học, học kỳ, môn học, giảng đường và khuôn viên trường.",
      sections: [
        {
          title: "Các cấp học",
          body: `- **kindergarten / nursery**: mẫu giáo / nhà trẻ
- **primary school**: tiểu học
- **secondary school / high school**: trung học
- **college / university**: cao đẳng / đại học
- **higher education**: giáo dục đại học

Mẫu câu:
- My sister is still in **primary school**.
- He studies engineering at **university**.`,
          remember: "college thường là cao đẳng hoặc một phần của đại học.",
        },
        {
          title: "Năm học và môn học",
          body: `- **term / semester**: học kỳ
- **academic year**: năm học
- **curriculum**: chương trình học
- **subject**: môn học
- **course**: khoá học
- **lecture / seminar**: bài giảng / buổi thảo luận
- **campus**: khuôn viên trường

Mẫu câu:
- The new **academic year** starts in September.
- My favourite **subject** is history.`,
          remember: "subject là môn học ở trường; course là một khoá học cụ thể.",
        },
      ],
      words: [
        w("education", "/ˌedʒuˈkeɪʃn/", "n", "nền giáo dục", "the process of teaching and learning", "Every child should have access to education."),
        w("primary school", "/ˈpraɪməri skuːl/", "n", "trường tiểu học", "a school for children aged about 5–11", "She teaches at a primary school."),
        w("secondary school", "/ˈsekəndri skuːl/", "n", "trường trung học", "a school for children aged about 11–18", "He started secondary school last year."),
        w("high school", "/ˈhaɪ skuːl/", "n", "trường trung học phổ thông", "a school for older children, especially in the US", "My cousin is in her final year of high school."),
        w("academy", "/əˈkædəmi/", "n", "học viện", "a school for a special subject or skill", "She studies music at an academy in London."),
        w("college", "/ˈkɒlɪdʒ/", "n", "trường cao đẳng", "a place of higher or further education", "He is taking a cooking course at college."),
        w("kindergarten", "/ˈkɪndəɡɑːtn/", "n", "trường mẫu giáo", "a school for very young children", "My son starts kindergarten in September."),
        w("nursery", "/ˈnɜːsəri/", "n", "nhà trẻ", "a place where very young children are cared for", "She works at a nursery near her home."),
        w("term", "/tɜːm/", "n", "học kỳ", "one of the periods in a school year", "We have exams at the end of term."),
        w("semester", "/sɪˈmestə(r)/", "n", "học kỳ (đại học)", "one of two periods in an academic year", "The first semester ends in January."),
        w("academic year", "/ˌækəˈdemɪk jɪə(r)/", "n", "năm học", "the period when schools and universities teach", "The academic year begins in autumn."),
        w("curriculum", "/kəˈrɪkjələm/", "n", "chương trình học", "the subjects taught in a school or course", "The school has updated its curriculum."),
        w("subject", "/ˈsʌbdʒɪkt/", "n", "môn học", "an area of knowledge studied at school", "Science is my favourite subject."),
        w("course", "/kɔːs/", "n", "khoá học", "a series of lessons on one subject", "I signed up for an online English course."),
        w("lecture", "/ˈlektʃə(r)/", "n", "bài giảng", "a talk given to a large group of students", "The lecture lasted two hours."),
        w("seminar", "/ˈsemɪnɑː(r)/", "n", "buổi thảo luận", "a small class where students discuss a topic", "We have a seminar every Thursday."),
        w("campus", "/ˈkæmpəs/", "n", "khuôn viên trường", "the land and buildings of a university", "The campus has a large sports centre."),
        w("classroom", "/ˈklɑːsruːm/", "n", "phòng học", "a room where lessons take place", "The classroom was bright and quiet."),
        w("playground", "/ˈpleɪɡraʊnd/", "n", "sân chơi", "an outdoor area where children play", "The children ran into the playground."),
        w("tutor", "/ˈtjuːtə(r)/", "n", "giáo viên phụ đạo", "a teacher who works with one student or a small group", "My tutor helped me with my essay."),
      ],
    },
    {
      title: "Hoạt động học tập",
      summary:
        "20 từ/cụm từ về ôn bài, ghi chú, nghiên cứu, viết bài, thuyết trình và nhận phản hồi.",
      sections: [
        {
          title: "Học và ôn tập",
          body: `- **study**: học, nghiên cứu
- **revise / review**: ôn lại
- **memorise**: ghi nhớ
- **take notes**: ghi chú
- **research**: nghiên cứu

Mẫu câu:
- I **revise** for two hours every evening.
- She **took notes** during the lecture.`,
          remember: "revise là ôn bài (Anh-Anh); review cũng dùng được (Anh-Mỹ).",
        },
        {
          title: "Bài tập và phản hồi",
          body: `- **essay**: bài luận
- **assignment**: bài tập lớn được giao
- **project**: dự án
- **presentation**: bài thuyết trình
- **draft**: bản nháp
- **feedback**: phản hồi
- **achieve**: đạt được

Mẫu câu:
- The **assignment** is due on Monday.
- My teacher gave me useful **feedback**.`,
          remember: "assignment thường lớn hơn homework; essay là một dạng bài viết.",
        },
      ],
      words: [
        w("study", "/ˈstʌdi/", "v/n", "học, nghiên cứu", "to spend time learning about something", "I study English every morning."),
        w("revise", "/rɪˈvaɪz/", "v", "ôn tập", "to prepare for an exam by reviewing work", "She is revising for her history test."),
        w("review", "/rɪˈvjuː/", "v/n", "xem lại, ôn lại; bài đánh giá", "to look at something again; a careful examination", "Review your notes before the class."),
        w("memorise", "/ˈmeməraɪz/", "v", "ghi nhớ", "to learn something by heart", "It is hard to memorise all these dates."),
        w("take notes", "/ˌteɪk ˈnəʊts/", "phrase", "ghi chú", "to write down important information", "Take notes while you read."),
        w("research", "/rɪˈsɜːtʃ/", "n/v", "nghiên cứu", "careful study to discover new facts", "He is doing research on climate change."),
        w("essay", "/ˈeseɪ/", "n", "bài luận", "a short piece of writing on a subject", "I have to write a 500-word essay."),
        w("assignment", "/əˈsaɪnmənt/", "n", "bài tập được giao", "a piece of work given to a student", "The assignment must be submitted online."),
        w("project", "/ˈprɒdʒekt/", "n", "dự án", "a piece of work involving study and planning", "Our group is working on a science project."),
        w("presentation", "/ˌpreznˈteɪʃn/", "n", "bài thuyết trình", "a talk in which you show and explain something", "I gave a presentation about my country."),
        w("group work", "/ˈɡruːp wɜːk/", "n", "làm việc nhóm", "work done together with other students", "The teacher encourages group work."),
        w("experiment", "/ɪkˈsperɪmənt/", "n/v", "thí nghiệm; làm thí nghiệm", "a scientific test", "We did an experiment in the chemistry lab."),
        w("report", "/rɪˈpɔːt/", "n/v", "báo cáo; báo cáo lại", "a written or spoken account of something", "She wrote a report on the survey."),
        w("source", "/sɔːs/", "n", "nguồn tài liệu", "a person or document that provides information", "Always check your sources online."),
        w("summary", "/ˈsʌməri/", "n", "bản tóm tắt", "a short account of the main points", "Write a summary of the article."),
        w("outline", "/ˈaʊtlaɪn/", "n/v", "dàn ý; phác thảo", "a plan showing the main points", "Make an outline before you start writing."),
        w("draft", "/drɑːft/", "n/v", "bản nháp; viết nháp", "an early version of a piece of writing", "This is only the first draft."),
        w("feedback", "/ˈfiːdbæk/", "n", "phản hồi", "advice or comments about your work", "The tutor gave me feedback on my essay."),
        w("progress", "/ˈprəʊɡres/", "n", "sự tiến bộ", "improvement over time", "You have made good progress this term."),
        w("achieve", "/əˈtʃiːv/", "v", "đạt được", "to succeed in reaching a goal", "She achieved excellent results."),
      ],
    },
    {
      title: "Kỳ thi & kết quả",
      summary:
        "20 từ/cụm từ về bài kiểm tra, điểm số, đỗ trượt, bằng cấp và lễ tốt nghiệp.",
      sections: [
        {
          title: "Các loại bài kiểm tra",
          body: `- **test**: bài kiểm tra ngắn
- **quiz**: bài kiểm tra nhanh
- **final exam**: kỳ thi cuối kỳ
- **entrance exam**: kỳ thi đầu vào
- **oral / written exam**: thi nói / thi viết
- **multiple choice**: trắc nghiệm

Mẫu câu:
- We have a **quiz** every Friday.
- She passed the **entrance exam**.`,
          remember: "test thường ngắn hơn exam; exam trang trọng và quan trọng hơn.",
        },
        {
          title: "Điểm số và bằng cấp",
          body: `- **score / mark / grade**: điểm
- **pass / fail**: đỗ / trượt
- **result**: kết quả
- **certificate**: chứng chỉ
- **degree / diploma**: bằng đại học / bằng tốt nghiệp
- **graduate / graduation**: tốt nghiệp / lễ tốt nghiệp

Mẫu câu:
- I **passed** the exam with a high **score**.
- He **graduated** from university last year.`,
          remember: "pass chỉ đỗ; pass a test cũng là làm bài kiểm tra.",
        },
      ],
      words: [
        w("test", "/test/", "n/v", "bài kiểm tra; kiểm tra", "a short examination; to examine something", "We have a maths test tomorrow."),
        w("quiz", "/kwɪz/", "n", "bài kiểm tra nhanh", "a short informal test", "The teacher started the lesson with a quiz."),
        w("score", "/skɔː(r)/", "n/v", "điểm số; ghi điểm", "the number of points you get; to get points", "My score was higher than I expected."),
        w("mark", "/mɑːk/", "n/v", "điểm; chấm điểm", "a letter or number showing quality; to grade", "The teacher marked our essays."),
        w("grade", "/ɡreɪd/", "n/v", "điểm, cấp; chấm điểm", "a level of quality or a mark", "She got the highest grade in the class."),
        w("pass", "/pɑːs/", "v", "đỗ, vượt qua", "to succeed in an exam", "I passed my driving test first time."),
        w("fail", "/feɪl/", "v", "trượt, không đạt", "to not succeed in an exam", "He failed the exam and had to retake it."),
        w("result", "/rɪˈzʌlt/", "n", "kết quả", "the outcome of an exam or action", "The results will be published next week."),
        w("certificate", "/səˈtɪfɪkət/", "n", "chứng chỉ", "an official document proving a qualification", "She received a certificate after the course."),
        w("degree", "/dɪˈɡriː/", "n", "bằng đại học", "a qualification from a university", "He has a degree in economics."),
        w("diploma", "/dɪˈpləʊmə/", "n", "bằng tốt nghiệp", "a qualification from a college or school", "She earned a diploma in design."),
        w("entrance exam", "/ˈentrəns ɪɡˌzæm/", "n", "kỳ thi đầu vào", "a test used to decide who can enter a school", "The entrance exam is very competitive."),
        w("final exam", "/ˌfaɪnl ɪɡˈzæm/", "n", "kỳ thi cuối kỳ", "the last important exam of a course", "We are preparing for the final exam."),
        w("oral exam", "/ˈɔːrəl ɪɡˌzæm/", "n", "kỳ thi nói", "an exam where you speak instead of writing", "The oral exam lasts about fifteen minutes."),
        w("written exam", "/ˈrɪtn ɪɡˌzæm/", "n", "kỳ thi viết", "an exam where you write your answers", "The written exam has three parts."),
        w("multiple choice", "/ˌmʌltɪpl ˈtʃɔɪs/", "n/adj", "trắc nghiệm", "a test where you choose from several answers", "The test was mostly multiple choice."),
        w("cheat", "/tʃiːt/", "v", "gian lận", "to act dishonestly in an exam or game", "Students who cheat will lose marks."),
        w("retake", "/ˌriːˈteɪk/", "v/n", "thi lại", "to take an exam again", "She decided to retake the test."),
        w("graduate", "/ˈɡrædʒueɪt/", "v/n", "tốt nghiệp; người tốt nghiệp", "to complete a course of study", "He graduated from university in June."),
        w("graduation", "/ˌɡrædʒuˈeɪʃn/", "n", "lễ tốt nghiệp", "a ceremony when students receive their qualifications", "My parents came to my graduation."),
      ],
    },
    {
      title: "Đời sống học đường",
      summary:
        "20 từ/cụm từ về đi học, vắng mặt, nội quy, áp lực thi cử và hoạt động ngoại khoá.",
      sections: [
        {
          title: "Đi học và nội quy",
          body: `- **attend**: tham dự, đi học
- **absent**: vắng mặt
- **attendance**: tỷ lệ chuyên cần
- **permission**: sự cho phép
- **rule**: nội quy
- **uniform**: đồng phục
- **detention**: hình phạt ở lại trường

Mẫu câu:
- Students must **attend** all classes.
- He was **absent** because he was ill.`,
          remember: "be absent from school — nhớ giới từ from.",
        },
        {
          title: "Áp lực và hoạt động ngoại khoá",
          body: `- **pressure**: áp lực
- **concentration**: sự tập trung
- **distraction**: điều gây xao nhãng
- **bully / bullying**: bắt nạt / nạn bắt nạt
- **participate (in)**: tham gia
- **extra-curricular**: ngoại khoá
- **club / competition**: câu lạc bộ / cuộc thi

Mẫu câu:
- Many students feel under **pressure** before exams.
- She **participates in** a debating **club**.`,
          remember: "participate in something = take part in something.",
        },
      ],
      words: [
        w("attend", "/əˈtend/", "v", "tham dự, đi học", "to go to a lesson, meeting or event", "All students must attend the first lesson."),
        w("absent", "/ˈæbsənt/", "adj", "vắng mặt", "not present in class", "She was absent from school yesterday."),
        w("attendance", "/əˈtendəns/", "n", "tỷ lệ chuyên cần", "the act of being present at school or work", "Good attendance is important for your grade."),
        w("excuse", "/ɪkˈskjuːz/", "n/v", "lý do; miễn cho", "a reason for being absent; to forgive", "He gave a medical excuse for missing class."),
        w("permission", "/pəˈmɪʃn/", "n", "sự cho phép", "the act of allowing someone to do something", "You need permission to leave early."),
        w("rule", "/ruːl/", "n", "nội quy, quy tắc", "an instruction about what is allowed", "The school has a strict rule about phones."),
        w("uniform", "/ˈjuːnɪfɔːm/", "n", "đồng phục", "special clothes worn by students or workers", "We have to wear a uniform at school."),
        w("break", "/breɪk/", "n", "giờ nghỉ", "a short period when you stop working", "We play football during the break."),
        w("detention", "/dɪˈtenʃn/", "n", "hình phạt ở lại trường", "a punishment where a student stays after school", "He got detention for being late."),
        w("bully", "/ˈbʊli/", "v/n", "bắt nạt; kẻ bắt nạt", "to hurt or frighten someone weaker", "Some older students bully younger children."),
        w("bullying", "/ˈbʊliɪŋ/", "n", "nạn bắt nạt", "repeated behaviour that hurts or frightens someone", "The school has a zero-tolerance policy on bullying."),
        w("pressure", "/ˈpreʃə(r)/", "n", "áp lực", "a feeling of stress because of expectations", "Students are under a lot of pressure."),
        w("concentration", "/ˌkɒnsnˈtreɪʃn/", "n", "sự tập trung", "the ability to focus your attention", "Loud music makes concentration difficult."),
        w("distraction", "/dɪˈstrækʃn/", "n", "điều gây xao nhãng", "something that takes your attention away", "Her phone is a constant distraction."),
        w("participate", "/pɑːˈtɪsɪpeɪt/", "v", "tham gia", "to take part in an activity", "Everyone is encouraged to participate in class."),
        w("extra-curricular", "/ˌekstrə kəˈrɪkjələ(r)/", "adj", "ngoại khoá", "outside the normal school lessons", "She does a lot of extra-curricular activities."),
        w("club", "/klʌb/", "n", "câu lạc bộ", "a group of people who share an activity", "I joined the photography club."),
        w("competition", "/ˌkɒmpəˈtɪʃn/", "n", "cuộc thi", "an event where people try to win", "She won a writing competition."),
        w("principal", "/ˈprɪnsəpl/", "n", "hiệu trưởng", "the head of a school", "The principal gave a short speech."),
        w("discipline", "/ˈdɪsəplɪn/", "n", "kỷ luật", "controlled behaviour and clear rules", "The school is known for its strong discipline."),
      ],
    },
  ],
};
