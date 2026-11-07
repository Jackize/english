import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 06: Công việc & nghề nghiệp. */
export const TOPIC_06: SeedVocabTopic = {
  name: "Công việc & nghề nghiệp",
  slug: "cong-viec-nghe-nghiep",
  icon: "work",
  description:
    "Từ vựng về nghề nghiệp, ứng tuyển, môi trường làm việc và các hình thức nghỉ việc.",
  lessons: [
    {
      title: "Nghề nghiệp & sự nghiệp",
      summary:
        "20 từ/cụm từ về nghề nghiệp phổ biến, con đường sự nghiệp và mô tả công việc.",
      sections: [
        {
          title: "Nói về nghề nghiệp",
          body: `- **job**: công việc cụ thể
- **career**: sự nghiệp lâu dài
- **profession**: nghề chuyên môn
- **occupation**: nghề nghiệp (trang trọng, dùng trong biểu mẫu)

Mẫu câu:
- What is your **occupation**?
- She has had a successful **career** in law.`,
          remember: "job là việc làm; career là cả quá trình sự nghiệp.",
        },
        {
          title: "Nghề chuyên môn",
          body: `- **architect**: kiến trúc sư
- **lawyer**: luật sư
- **accountant**: kế toán
- **journalist**: nhà báo
- **programmer**: lập trình viên
- **mechanic**: thợ máy
- **pharmacist**: dược sĩ
- **vet**: bác sĩ thú y

Mẫu câu:
- My cousin is a software **programmer**.
- The **vet** treated our dog.`,
          remember: "vet là viết tắt của veterinary surgeon; không dùng cho bác sĩ người.",
        },
      ],
      words: [
        w("career", "/kəˈrɪə(r)/", "n", "sự nghiệp", "the work you do for a long period of your life", "She wants a career in medicine."),
        w("profession", "/prəˈfeʃn/", "n", "nghề chuyên môn", "a job that needs special training", "Teaching is a demanding profession."),
        w("occupation", "/ˌɒkjuˈpeɪʃn/", "n", "nghề nghiệp", "a person's job, used formally", "Please write your occupation on the form."),
        w("architect", "/ˈɑːkɪtekt/", "n", "kiến trúc sư", "a person who designs buildings", "The architect showed us the plans."),
        w("lawyer", "/ˈlɔːjə(r)/", "n", "luật sư", "a person who advises people about the law", "You should speak to a lawyer."),
        w("accountant", "/əˈkaʊntənt/", "n", "kế toán", "a person who keeps financial records", "The accountant checks the company's accounts."),
        w("journalist", "/ˈdʒɜːnəlɪst/", "n", "nhà báo", "a person who writes news stories", "The journalist interviewed the mayor."),
        w("scientist", "/ˈsaɪəntɪst/", "n", "nhà khoa học", "a person who studies science", "Scientists are developing a new vaccine."),
        w("programmer", "/ˈprəʊɡræmə(r)/", "n", "lập trình viên", "a person who writes computer programs", "He works as a programmer for a start-up."),
        w("designer", "/dɪˈzaɪnə(r)/", "n", "nhà thiết kế", "a person who plans how things look", "She is a graphic designer."),
        w("mechanic", "/məˈkænɪk/", "n", "thợ máy", "a person who repairs vehicles or machines", "The mechanic fixed the engine."),
        w("carpenter", "/ˈkɑːpəntə(r)/", "n", "thợ mộc", "a person who makes wooden things", "The carpenter built a new cupboard."),
        w("receptionist", "/rɪˈsepʃənɪst/", "n", "lễ tân", "a person who greets visitors and answers the phone", "The receptionist gave me a visitor's badge."),
        w("pharmacist", "/ˈfɑːməsɪst/", "n", "dược sĩ", "a person who prepares and sells medicine", "Ask the pharmacist how often to take it."),
        w("dentist", "/ˈdentɪst/", "n", "nha sĩ", "a person who treats teeth", "I have an appointment with the dentist."),
        w("vet", "/vet/", "n", "bác sĩ thú y", "a doctor who treats animals", "The vet said our cat was healthy."),
        w("pilot", "/ˈpaɪlət/", "n", "phi công", "a person who flies an aircraft", "She dreamed of becoming a pilot."),
        w("flight attendant", "/ˈflaɪt ətendənt/", "n", "tiếp viên hàng không", "a person who cares for passengers on a plane", "The flight attendant helped the elderly passenger."),
        w("chef", "/ʃef/", "n", "đầu bếp", "a trained cook, especially in a restaurant", "The chef prepared a five-course meal."),
        w("entrepreneur", "/ˌɒntrəprəˈnɜː(r)/", "n", "doanh nhân khởi nghiệp", "a person who starts and runs a business", "The young entrepreneur opened her first shop."),
      ],
    },
    {
      title: "Ứng tuyển & tuyển dụng",
      summary:
        "20 từ/cụm từ về nộp đơn, phỏng vấn, hồ sơ, vị trí tuyển dụng và quy trình chọn người.",
      sections: [
        {
          title: "Tìm việc và nộp đơn",
          body: `- **apply for a job**: nộp đơn xin việc
- **application / applicant**: đơn ứng tuyển / ứng viên
- **vacancy**: vị trí đang trống
- **position**: chức vụ, vị trí
- **CV / résumé**: sơ yếu lý lịch
- **cover letter**: thư xin việc

Mẫu câu:
- I am **applying for** the marketing **position**.
- There is a **vacancy** in our department.`,
          remember: "apply for a job/position — dùng giới từ for.",
        },
        {
          title: "Phỏng vấn và tuyển chọn",
          body: `- **interview**: buổi phỏng vấn
- **interviewer / candidate**: người phỏng vấn / ứng viên
- **experience / qualification**: kinh nghiệm / bằng cấp
- **reference**: người hoặc thư giới thiệu
- **shortlist**: danh sách rút gọn
- **hire / employ**: thuê, tuyển dụng

Mẫu câu:
- The **interview** went well.
- They decided to **hire** the most experienced **candidate**.`,
          remember: "hire (Anh-Mỹ) và employ đều là tuyển dụng; employee là người được tuyển.",
        },
      ],
      words: [
        w("apply", "/əˈplaɪ/", "v", "nộp đơn, ứng tuyển", "to ask formally for a job or place", "I applied for three jobs last week."),
        w("application", "/ˌæplɪˈkeɪʃn/", "n", "đơn ứng tuyển", "a formal request for a job or place", "Please send your application by email."),
        w("applicant", "/ˈæplɪkənt/", "n", "ứng viên", "a person who applies for something", "There were over fifty applicants for the job."),
        w("interview", "/ˈɪntəvjuː/", "n/v", "buổi phỏng vấn; phỏng vấn", "a formal meeting to decide if someone is suitable", "She has a job interview on Monday."),
        w("interviewer", "/ˈɪntəvjuːə(r)/", "n", "người phỏng vấn", "the person who asks questions in an interview", "The interviewer asked about my experience."),
        w("candidate", "/ˈkændɪdət/", "n", "ứng viên", "a person being considered for a job", "The best candidate got the position."),
        w("CV", "/ˌsiː ˈviː/", "n", "sơ yếu lý lịch", "a document summarising your education and experience", "Keep your CV short and clear."),
        w("cover letter", "/ˈkʌvə letə(r)/", "n", "thư xin việc", "a letter sent with your CV", "Write a cover letter for each application."),
        w("recruit", "/rɪˈkruːt/", "v", "tuyển dụng", "to find and employ new people", "The company is recruiting engineers."),
        w("recruitment", "/rɪˈkruːtmənt/", "n", "việc tuyển dụng", "the process of finding new employees", "Recruitment takes several weeks."),
        w("vacancy", "/ˈveɪkənsi/", "n", "vị trí tuyển dụng", "a job that is available", "We have a vacancy for a receptionist."),
        w("position", "/pəˈzɪʃn/", "n", "chức vụ, vị trí", "a job in a company", "She applied for a senior position."),
        w("experience", "/ɪkˈspɪəriəns/", "n", "kinh nghiệm", "knowledge or skill gained by doing something", "He has five years of experience in sales."),
        w("qualification", "/ˌkwɒlɪfɪˈkeɪʃn/", "n", "bằng cấp, trình độ", "an exam or course you have completed", "This job requires a teaching qualification."),
        w("reference", "/ˈrefrəns/", "n", "thư giới thiệu", "a letter from a previous employer about you", "Can you provide two references?"),
        w("shortlist", "/ˈʃɔːtlɪst/", "n/v", "danh sách rút gọn", "a small list of the best candidates", "I was surprised to be on the shortlist."),
        w("hire", "/ˈhaɪə(r)/", "v", "thuê, tuyển", "to employ someone", "They hired a new manager."),
        w("employ", "/ɪmˈplɔɪ/", "v", "tuyển dụng, sử dụng lao động", "to pay someone to work for you", "The factory employs two hundred people."),
        w("employer", "/ɪmˈplɔɪə(r)/", "n", "người sử dụng lao động", "a person or company that employs people", "A good employer offers training."),
        w("employee", "/ɪmˈplɔɪiː/", "n", "nhân viên", "a person employed by a company", "All employees receive a bonus."),
      ],
    },
    {
      title: "Môi trường làm việc",
      summary:
        "20 từ/cụm từ về đồng nghiệp, phòng ban, ca làm, khối lượng công việc và đánh giá hiệu suất.",
      sections: [
        {
          title: "Công việc hằng ngày",
          body: `- **workplace**: nơi làm việc
- **staff**: đội ngũ nhân viên
- **department**: phòng ban
- **shift**: ca làm việc
- **overtime**: làm thêm giờ
- **workload**: khối lượng công việc

Mẫu câu:
- I work the night **shift** this week.
- The **workload** is heavy at the moment.`,
          remember: "staff là danh từ tập hợp; không nói a staff khi chỉ một nhân viên.",
        },
        {
          title: "Họp và đánh giá",
          body: `- **agenda**: chương trình họp
- **meeting**: cuộc họp
- **conference**: hội nghị
- **performance**: hiệu suất làm việc
- **appraisal**: buổi đánh giá nhân viên
- **promotion**: sự thăng chức

Mẫu câu:
- The **agenda** has five items.
- She received a **promotion** after her appraisal.`,
          remember: "promotion là thăng chức; advertisement là quảng cáo.",
        },
      ],
      words: [
        w("workplace", "/ˈwɜːkpleɪs/", "n", "nơi làm việc", "the place where people work", "The workplace is friendly and relaxed."),
        w("staff", "/stɑːf/", "n", "đội ngũ nhân viên", "the people who work for a company", "The staff are trained every year."),
        w("department", "/dɪˈpɑːtmənt/", "n", "phòng ban", "one part of a large organisation", "She works in the sales department."),
        w("meeting", "/ˈmiːtɪŋ/", "n", "cuộc họp", "an event where people discuss things", "We have a team meeting every Monday."),
        w("task", "/tɑːsk/", "n", "nhiệm vụ", "a piece of work you have to do", "My first task is to answer the emails."),
        w("shift", "/ʃɪft/", "n", "ca làm việc", "a period of work in a day", "He works the night shift."),
        w("overtime", "/ˈəʊvətaɪm/", "n", "làm thêm giờ", "extra hours worked beyond normal time", "She does overtime to earn more money."),
        w("client", "/ˈklaɪənt/", "n", "khách hàng (dịch vụ)", "a person who pays for a service", "The client wants to change the design."),
        w("customer", "/ˈkʌstəmə(r)/", "n", "khách hàng", "a person who buys goods or services", "The shop always puts customers first."),
        w("team", "/tiːm/", "n", "đội, nhóm", "a group of people working together", "Our team finished the project on time."),
        w("supervisor", "/ˈsuːpəvaɪzə(r)/", "n", "người giám sát", "a person who manages other workers", "Ask your supervisor if you need help."),
        w("workload", "/ˈwɜːkləʊd/", "n", "khối lượng công việc", "the amount of work someone has to do", "Her workload increased after the promotion."),
        w("responsibility", "/rɪˌspɒnsəˈbɪləti/", "n", "trách nhiệm", "a duty you must take care of", "His responsibilities include training new staff."),
        w("promotion", "/prəˈməʊʃn/", "n", "sự thăng chức", "a move to a higher position at work", "She got a promotion after two years."),
        w("training", "/ˈtreɪnɪŋ/", "n", "đào tạo", "teaching people the skills for a job", "New employees receive two weeks of training."),
        w("performance", "/pəˈfɔːməns/", "n", "hiệu suất, thành tích", "how well someone does their job", "The manager reviews our performance every year."),
        w("negotiate", "/nɪˈɡəʊʃieɪt/", "v", "thương lượng", "to discuss something in order to reach an agreement", "She negotiated a higher salary."),
        w("agenda", "/əˈdʒendə/", "n", "chương trình họp", "a list of topics for a meeting", "Please read the agenda before the meeting."),
        w("conference", "/ˈkɒnfərəns/", "n", "hội nghị", "a large meeting for discussion", "He attended a conference in Berlin."),
        w("appraisal", "/əˈpreɪzl/", "n", "buổi đánh giá nhân viên", "a formal review of an employee's work", "My appraisal is scheduled for Friday."),
      ],
    },
    {
      title: "Nghỉ việc & quyền lợi",
      summary:
        "20 từ/cụm từ về xin việc, bị sa thải, trợ cấp, lương thưởng và các hình thức làm việc.",
      sections: [
        {
          title: "Rời khỏi công việc",
          body: `- **resign**: xin nghỉ việc
- **resignation**: đơn xin nghỉ việc
- **dismiss / fire**: sa thải
- **lay off**: cho nghỉ việc vì lý do kinh tế
- **redundant**: bị dư thừa nhân sự
- **unemployed**: thất nghiệp

Mẫu câu:
- She **resigned** after five years.
- The company had to **lay off** twenty workers.`,
          remember: "resign là tự nguyện; fire/dismiss là bị sa thải.",
        },
        {
          title: "Lương, thưởng và nghỉ phép",
          body: `- **wage / income**: tiền công / thu nhập
- **bonus**: tiền thưởng
- **pension**: lương hưu
- **annual leave**: phép năm
- **sick leave**: nghỉ ốm
- **maternity leave**: nghỉ thai sản
- **part-time / full-time**: bán thời gian / toàn thời gian
- **remote work / freelance**: làm việc từ xa / làm tự do

Mẫu câu:
- She works **part-time** while studying.
- He applied for three days of **annual leave**.`,
          remember: "wage thường là lương theo giờ; salary là lương cố định theo tháng.",
        },
      ],
      words: [
        w("resign", "/rɪˈzaɪn/", "v", "xin nghỉ việc", "to officially leave your job", "He resigned because he found a better job."),
        w("resignation", "/ˌrezɪɡˈneɪʃn/", "n", "đơn xin nghỉ việc", "a formal statement that you are leaving your job", "She handed in her resignation yesterday."),
        w("dismiss", "/dɪsˈmɪs/", "v", "sa thải", "to remove someone from their job", "The company dismissed him for breaking the rules."),
        w("fire", "/ˈfaɪə(r)/", "v", "sa thải (thân mật)", "to remove someone from their job", "He was fired for being late every day."),
        w("lay off", "/ˌleɪ ˈɒf/", "phr v", "cho nghỉ việc vì kinh tế", "to stop employing someone because of financial problems", "The factory laid off fifty workers."),
        w("redundant", "/rɪˈdʌndənt/", "adj", "bị dư thừa nhân sự", "no longer needed for a job", "My uncle was made redundant last year."),
        w("unemployed", "/ˌʌnɪmˈplɔɪd/", "adj", "thất nghiệp", "without a job", "He has been unemployed for six months."),
        w("unemployment", "/ˌʌnɪmˈplɔɪmənt/", "n", "tình trạng thất nghiệp", "the situation of not having a job", "Unemployment is rising in the region."),
        w("benefit", "/ˈbenɪfɪt/", "n", "trợ cấp; lợi ích", "money paid by the state or an advantage", "She receives unemployment benefit."),
        w("pension", "/ˈpenʃn/", "n", "lương hưu", "money paid regularly after retirement", "He lives on a small pension."),
        w("notice", "/ˈnəʊtɪs/", "n", "thông báo nghỉ việc", "advance warning before leaving a job", "She gave one month's notice."),
        w("wage", "/weɪdʒ/", "n", "tiền công", "money paid for work, often hourly", "The workers asked for a higher wage."),
        w("income", "/ˈɪnkʌm/", "n", "thu nhập", "the money you earn", "They have a comfortable income."),
        w("bonus", "/ˈbəʊnəs/", "n", "tiền thưởng", "extra money given for good work", "Everyone received a year-end bonus."),
        w("annual leave", "/ˌænjuəl ˈliːv/", "n", "phép năm", "paid holiday days from work", "I have five days of annual leave left."),
        w("sick leave", "/ˈsɪk liːv/", "n", "nghỉ ốm", "time off work because of illness", "He is on sick leave this week."),
        w("maternity leave", "/məˈtɜːnəti liːv/", "n", "nghỉ thai sản", "time off work before and after having a baby", "She is on maternity leave until June."),
        w("part-time", "/ˌpɑːt ˈtaɪm/", "adj/adv", "bán thời gian", "working only part of the week", "He has a part-time job in a bookshop."),
        w("full-time", "/ˌfʊl ˈtaɪm/", "adj/adv", "toàn thời gian", "working the normal number of hours", "She is looking for a full-time position."),
        w("remote work", "/rɪˈməʊt wɜːk/", "n", "làm việc từ xa", "working from home or away from the office", "Remote work has become more common."),
      ],
    },
  ],
};
