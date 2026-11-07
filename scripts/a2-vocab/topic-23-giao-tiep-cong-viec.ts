import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 23: Giao tiếp trong công việc. */
export const TOPIC_23: SeedVocabTopic = {
  name: "Giao tiếp trong công việc",
  slug: "giao-tiep-cong-viec",
  icon: "forum",
  description:
    "Từ vựng về trao đổi công việc, họp, thuyết trình, đàm phán và phản hồi hiệu quả.",
  lessons: [
    {
      title: "Giao tiếp nơi làm việc",
      summary:
        "20 từ/cụm từ về email, thông báo, cách xưng hô và quy tắc giao tiếp công sở.",
      sections: [
        {
          title: "Email và thông báo",
          body: `- **communication**: sự giao tiếp
- **memo**: bản ghi nhớ
- **brief / briefing**: bản tóm tắt, giao việc / buổi giao ban
- **announcement**: thông báo
- **circulate / cc**: gửi vòng, phổ biến / gửi bản sao
- **subject line / signature**: dòng tiêu đề / chữ ký

Mẫu câu:
- Please read the **memo** before the meeting.
- Put a clear subject in the **subject line**.`,
          remember: "cc là viết tắt của carbon copy — gửi bản sao cho người khác.",
        },
        {
          title: "Cách giao tiếp",
          body: `- **informal / polite**: thân mật / lịch sự
- **concise / clarify / confirm**: ngắn gọn / làm rõ / xác nhận
- **respond / query / input**: phản hồi / câu hỏi / ý kiến đóng góp
- **chain of command / subordinate / hierarchy**: hệ thống cấp bậc / cấp dưới / thứ bậc

Mẫu câu:
- Keep your email **concise** and clear.
- Please **confirm** the meeting time.`,
          remember: "respond to an email; reply to an email — cả hai đều dùng to.",
        },
      ],
      words: [
        w("communication", "/kəˌmjuːnɪˈkeɪʃn/", "n", "sự giao tiếp", "the exchange of information", "Good communication prevents mistakes."),
        w("memo", "/ˈmeməʊ/", "n", "bản ghi nhớ", "a short official note", "The manager sent a memo about the new policy."),
        w("brief", "/briːf/", "n/v", "bản tóm tắt; giao việc", "a short summary or set of instructions", "The client gave us a brief for the project."),
        w("briefing", "/ˈbriːfɪŋ/", "n", "buổi giao ban", "a meeting to give information", "There is a briefing at nine o'clock."),
        w("announcement", "/əˈnaʊnsmənt/", "n", "thông báo", "a public statement", "The director made an announcement about the merger."),
        w("circulate", "/ˈsɜːkjəleɪt/", "v", "gửi vòng, phổ biến", "to send information to a group", "Please circulate the report to the team."),
        w("cc", "/ˌsiː ˈsiː/", "v", "gửi bản sao", "to send a copy of an email to someone", "Cc me on the message to finance."),
        w("subject line", "/ˈsʌbdʒɪkt laɪn/", "n", "dòng tiêu đề", "the title of an email", "Write a clear subject line."),
        w("signature", "/ˈsɪɡnətʃə(r)/", "n", "chữ ký", "your name written at the end of a message", "Add your job title to your email signature."),
        w("informal", "/ɪnˈfɔːml/", "adj", "thân mật", "relaxed and not official", "The team uses informal language in chat."),
        w("polite", "/pəˈlaɪt/", "adj", "lịch sự", "showing good manners", "Even a short email should be polite."),
        w("concise", "/kənˈsaɪs/", "adj", "ngắn gọn", "short and clear", "Keep your message concise."),
        w("clarify", "/ˈklærəfaɪ/", "v", "làm rõ", "to make something easier to understand", "Could you clarify the last point?"),
        w("confirm", "/kənˈfɜːm/", "v", "xác nhận", "to say that something is definitely true", "Please confirm your attendance."),
        w("respond", "/rɪˈspɒnd/", "v", "phản hồi", "to reply", "She responded within an hour."),
        w("query", "/ˈkwɪəri/", "n/v", "câu hỏi; hỏi", "a question about something", "Send any queries to the HR team."),
        w("input", "/ˈɪnpʊt/", "n", "ý kiến đóng góp", "advice or ideas you give", "We welcome your input on the plan."),
        w("chain of command", "/ˌtʃeɪn əv kəˈmɑːnd/", "n", "hệ thống cấp bậc", "the official line of authority", "Report the problem through the chain of command."),
        w("subordinate", "/səˈbɔːdɪnət/", "n", "cấp dưới", "a person with a lower position", "She manages six subordinates."),
        w("hierarchy", "/ˈhaɪərɑːki/", "n", "hệ thống thứ bậc", "a system where people have different ranks", "The company has a flat hierarchy."),
      ],
    },
    {
      title: "Họp & thuyết trình",
      summary:
        "20 từ/cụm từ về chuẩn bị họp, thuyết trình, biên bản và đưa ra quyết định tập thể.",
      sections: [
        {
          title: "Chuẩn bị và trình bày",
          body: `- **slide / projector**: trang trình chiếu / máy chiếu
- **handout**: tài liệu phát tay
- **chairperson / minutes**: người chủ trì / biên bản
- **action point**: đầu việc cần làm
- **vote / consensus**: bỏ phiếu / sự đồng thuận
- **brainstorm**: động não

Mẫu câu:
- The **chairperson** opened the meeting.
- I will take the **minutes** today.`,
          remember: "minutes ở đây là biên bản cuộc họp, không phải phút.",
        },
        {
          title: "Thảo luận và kết luận",
          body: `- **suggest / suggestion**: đề xuất / lời đề xuất
- **object / interrupt / digress**: phản đối / ngắt lời / lạc đề
- **summarise / conclusion**: tóm tắt / kết luận
- **elaborate / persuade / convince**: giải thích chi tiết / thuyết phục
- **unanimous**: nhất trí

Mẫu câu:
- May I **suggest** a different approach?
- The committee reached a **unanimous** decision.`,
          remember: "object to something — phản đối điều gì.",
        },
      ],
      words: [
        w("slide", "/slaɪd/", "n", "trang trình chiếu", "one page of a presentation", "The first slide shows the sales figures."),
        w("projector", "/prəˈdʒektə(r)/", "n", "máy chiếu", "a machine that shows images on a screen", "Could you turn on the projector?"),
        w("handout", "/ˈhændaʊt/", "n", "tài liệu phát tay", "a printed sheet given to people", "The speaker prepared a handout for everyone."),
        w("chairperson", "/ˈtʃeəpɜːsn/", "n", "người chủ trì", "the person who leads a meeting", "The chairperson kept the discussion on track."),
        w("minutes", "/ˈmɪnɪts/", "n", "biên bản cuộc họp", "the written record of a meeting", "She emailed the minutes the next day."),
        w("action point", "/ˈækʃn pɔɪnt/", "n", "đầu việc cần làm", "a task agreed in a meeting", "We listed five action points."),
        w("vote", "/vəʊt/", "n/v", "sự bỏ phiếu; bỏ phiếu", "a formal choice made by a group", "The team voted on the new design."),
        w("consensus", "/kənˈsensəs/", "n", "sự đồng thuận", "general agreement among a group", "They reached a consensus after a long debate."),
        w("brainstorm", "/ˈbreɪnstɔːm/", "v/n", "động não", "to suggest many ideas quickly", "Let's brainstorm some solutions."),
        w("suggest", "/səˈdʒest/", "v", "đề xuất", "to offer an idea", "I suggest we start with the budget."),
        w("suggestion", "/səˈdʒestʃən/", "n", "lời đề xuất", "an idea or plan offered", "Thank you for your suggestion."),
        w("object", "/əbˈdʒekt/", "v", "phản đối", "to say you disagree", "Several members objected to the plan."),
        w("interrupt", "/ˌɪntəˈrʌpt/", "v", "ngắt lời", "to stop someone while they are speaking", "Please don't interrupt the speaker."),
        w("digress", "/daɪˈɡres/", "v", "lạc đề", "to move away from the main subject", "Let's not digress from the agenda."),
        w("summarise", "/ˈsʌməraɪz/", "v", "tóm tắt", "to give the main points briefly", "She summarised the discussion at the end."),
        w("conclusion", "/kənˈkluːʒn/", "n", "kết luận", "the final decision or judgement", "The meeting ended without a clear conclusion."),
        w("elaborate", "/ɪˈlæbəreɪt/", "v", "giải thích chi tiết", "to add more detail", "Could you elaborate on that point?"),
        w("persuade", "/pəˈsweɪd/", "v", "thuyết phục", "to make someone agree", "He persuaded the team to try a new approach."),
        w("convince", "/kənˈvɪns/", "v", "thuyết phục", "to make someone believe something", "Her argument convinced everyone."),
        w("unanimous", "/juˈnænɪməs/", "adj", "nhất trí", "agreed by everyone", "The board made a unanimous decision."),
      ],
    },
    {
      title: "Đàm phán & giải quyết vấn đề",
      summary:
        "20 từ/cụm từ về thỏa thuận, nhượng bộ, xung đột và cách tìm giải pháp chung.",
      sections: [
        {
          title: "Đàm phán và thỏa thuận",
          body: `- **negotiation / deal**: sự đàm phán / thỏa thuận
- **terms / agreement / clause**: điều khoản / thỏa thuận / điều khoản hợp đồng
- **offer / counter-offer**: đề nghị / đề nghị đối lại
- **concession**: sự nhượng bộ

Mẫu câu:
- Both sides made a **concession**.
- They signed the **agreement** on Friday.`,
          remember: "reach a deal / reach an agreement — đạt được thỏa thuận.",
        },
        {
          title: "Xung đột và giải pháp",
          body: `- **dispute / conflict**: tranh chấp / xung đột
- **resolve / resolution**: giải quyết / sự giải quyết
- **mediator / mediate**: người hòa giải / hòa giải
- **escalate / solution**: leo thang / giải pháp
- **issue / urgent / alternative / outcome**: vấn đề / khẩn cấp / lựa chọn thay thế / kết quả

Mẫu câu:
- We need a **mediator** to resolve the **dispute**.
- Let's find an **alternative** solution.`,
          remember: "escalate a problem = đẩy vấn đề lên cấp cao hơn.",
        },
      ],
      words: [
        w("negotiation", "/nɪˌɡəʊʃiˈeɪʃn/", "n", "sự đàm phán", "discussion to reach an agreement", "The negotiation lasted all afternoon."),
        w("deal", "/diːl/", "n", "thỏa thuận", "an agreement, especially in business", "They finally closed the deal."),
        w("terms", "/tɜːmz/", "n", "điều khoản", "the conditions of an agreement", "Read the terms before you sign."),
        w("agreement", "/əˈɡriːmənt/", "n", "thỏa thuận", "an arrangement accepted by both sides", "The two companies reached an agreement."),
        w("clause", "/klɔːz/", "n", "điều khoản hợp đồng", "one part of a legal document", "The contract has a confidentiality clause."),
        w("offer", "/ˈɒfə(r)/", "n/v", "đề nghị", "something you say you will give", "They made us a generous offer."),
        w("counter-offer", "/ˈkaʊntər ɒfə(r)/", "n", "đề nghị đối lại", "a reply to an offer with different terms", "She responded with a counter-offer."),
        w("concession", "/kənˈseʃn/", "n", "sự nhượng bộ", "something you agree to give up", "Both sides made concessions."),
        w("dispute", "/dɪˈspjuːt/", "n/v", "tranh chấp", "a serious disagreement", "The dispute was settled out of court."),
        w("conflict", "/ˈkɒnflɪkt/", "n", "xung đột", "a serious disagreement", "There is conflict between the two departments."),
        w("resolve", "/rɪˈzɒlv/", "v", "giải quyết", "to solve a problem", "We resolved the issue quickly."),
        w("resolution", "/ˌrezəˈluːʃn/", "n", "sự giải quyết", "the act of solving a problem", "They reached a peaceful resolution."),
        w("mediator", "/ˈmiːdieɪtə(r)/", "n", "người hòa giải", "a person who helps others agree", "An independent mediator was brought in."),
        w("mediate", "/ˈmiːdieɪt/", "v", "hòa giải", "to help two sides reach agreement", "She mediated between the manager and the staff."),
        w("escalate", "/ˈeskəleɪt/", "v", "leo thang", "to become more serious", "The complaint escalated to senior management."),
        w("solution", "/səˈluːʃn/", "n", "giải pháp", "a way to solve a problem", "We need a practical solution."),
        w("issue", "/ˈɪʃuː/", "n", "vấn đề", "a subject or problem being discussed", "The main issue is the delivery date."),
        w("urgent", "/ˈɜːdʒənt/", "adj", "khẩn cấp", "needing immediate attention", "This is an urgent matter."),
        w("alternative", "/ɔːlˈtɜːnətɪv/", "n/adj", "lựa chọn thay thế", "another possibility", "We need an alternative supplier."),
        w("outcome", "/ˈaʊtkʌm/", "n", "kết quả", "the final result", "The outcome of the talks was positive."),
      ],
    },
    {
      title: "Phản hồi & đánh giá",
      summary:
        "20 từ/cụm từ về khen ngợi, góp ý, đánh giá hiệu suất và ghi nhận thành tích.",
      sections: [
        {
          title: "Khen và góp ý",
          body: `- **evaluation / evaluate**: sự đánh giá / đánh giá
- **constructive / criticism**: mang tính xây dựng / sự phê bình
- **praise / recognition**: lời khen / sự ghi nhận
- **achievement / weakness**: thành tích / điểm yếu
- **milestone**: cột mốc

Mẫu câu:
- She gave me some **constructive** feedback.
- The team received **praise** for the launch.`,
          remember: "constructive criticism = phê bình mang tính xây dựng.",
        },
        {
          title: "Hiệu suất và cơ hội",
          body: `- **productivity / efficient / effective**: năng suất / hiệu quả / hiệu lực
- **incentive / pay rise**: ưu đãi / sự tăng lương
- **probation / mentoring / coaching**: thử việc / cố vấn / huấn luyện
- **capability / competence / accountability**: năng lực / năng lực chuyên môn / trách nhiệm giải trình

Mẫu câu:
- The new software improved **productivity**.
- She is still on **probation** until June.`,
          remember: "effective là tạo ra kết quả mong muốn; efficient là làm với ít lãng phí.",
        },
      ],
      words: [
        w("evaluation", "/ɪˌvæljuˈeɪʃn/", "n", "sự đánh giá", "a careful judgement of something", "The project is due for evaluation."),
        w("evaluate", "/ɪˈvæljueɪt/", "v", "đánh giá", "to judge the value or quality", "We evaluate staff performance twice a year."),
        w("constructive", "/kənˈstrʌktɪv/", "adj", "mang tính xây dựng", "helpful and intended to improve", "Thank you for the constructive comments."),
        w("criticism", "/ˈkrɪtɪsɪzəm/", "n", "sự phê bình", "negative comments about something", "She accepted the criticism calmly."),
        w("praise", "/preɪz/", "n/v", "lời khen; khen", "words expressing approval", "The manager praised her hard work."),
        w("recognition", "/ˌrekəɡˈnɪʃn/", "n", "sự ghi nhận", "public appreciation of achievement", "He received recognition for his contribution."),
        w("achievement", "/əˈtʃiːvmənt/", "n", "thành tích", "something done successfully", "Winning the contract was a major achievement."),
        w("weakness", "/ˈwiːknəs/", "n", "điểm yếu", "a fault or lack of strength", "Lack of planning is his main weakness."),
        w("milestone", "/ˈmaɪlstəʊn/", "n", "cột mốc", "an important stage in a process", "The launch was an important milestone."),
        w("productivity", "/ˌprɒdʌkˈtɪvəti/", "n", "năng suất", "the rate at which work is done", "Flexible hours increased productivity."),
        w("efficient", "/ɪˈfɪʃnt/", "adj", "hiệu quả", "working well without waste", "The new system is more efficient."),
        w("effective", "/ɪˈfektɪv/", "adj", "hiệu lực, hiệu quả", "producing the intended result", "The training was very effective."),
        w("incentive", "/ɪnˈsentɪv/", "n", "ưu đãi, động lực", "something that encourages you to work harder", "Bonuses are an incentive to perform well."),
        w("pay rise", "/ˈpeɪ raɪz/", "n", "sự tăng lương", "an increase in salary", "She asked for a pay rise."),
        w("probation", "/prəˈbeɪʃn/", "n", "thời gian thử việc", "a trial period in a new job", "New staff are on probation for three months."),
        w("mentoring", "/ˈmentɔːrɪŋ/", "n", "việc cố vấn", "advice and support from an experienced person", "The company runs a mentoring programme."),
        w("coaching", "/ˈkəʊtʃɪŋ/", "n", "huấn luyện", "training to improve a specific skill", "He received coaching before the presentation."),
        w("capability", "/ˌkeɪpəˈbɪləti/", "n", "năng lực", "the ability to do something", "The team has the capability to deliver."),
        w("competence", "/ˈkɒmpɪtəns/", "n", "năng lực chuyên môn", "the ability to do a job well", "We assess technical competence in the interview."),
        w("accountability", "/əˌkaʊntəˈbɪləti/", "n", "trách nhiệm giải trình", "being responsible for your actions", "Clear roles improve accountability."),
      ],
    },
  ],
};
