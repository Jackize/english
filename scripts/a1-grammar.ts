import type { SeedGrammarLesson, SeedQuestion } from "./curriculum-data";

function q(
  prompt: string,
  correct: string,
  wrong: [string, string, string],
  explanation?: string,
): SeedQuestion {
  const labels = [correct, ...wrong];
  const offset = prompt.length % labels.length;
  const ordered = [...labels.slice(offset), ...labels.slice(0, offset)];

  return {
    prompt,
    explanation,
    choices: ordered.map((label) => ({ label, correct: label === correct })),
  };
}

/**
 * Chương trình ngữ pháp A1 gồm 20 bài, bám theo các chủ điểm A1 phổ biến:
 * to be, mạo từ, danh từ, hiện tại đơn, hiện tại tiếp diễn, can, there is/are,
 * some/any, much/many, giới từ, quá khứ đơn, be going to, would like,
 * đại từ tân ngữ và so sánh hơn.
 */
export const A1_GRAMMAR: SeedGrammarLesson[] = [
  {
    title: "To be & đại từ nhân xưng",
    summary: "Nắm vững am / is / are, đại từ I, you, he, she, it, we, they và cách giới thiệu bản thân.",
    sections: [
      {
        title: "Động từ to be ở hiện tại",
        body: `Động từ **to be** có ba dạng ở thì hiện tại:
- I **am** (I'm)
- He / She / It **is** (he's, she's, it's)
- You / We / They **are** (you're, we're, they're)

Dùng **to be** để giới thiệu tên, tuổi, nghề nghiệp, quốc tịch, tính cách hoặc trạng thái.

Ví dụ:
- I **am** a student. (Tôi là học sinh.)
- She **is** from Vietnam. (Cô ấy đến từ Việt Nam.)
- They **are** very friendly. (Họ rất thân thiện.)`,
        remember: "I đi với am; he / she / it đi với is; you / we / they đi với are.",
      },
      {
        title: "Phủ định và câu hỏi",
        body: `Thêm **not** sau to be để tạo câu phủ định:
- I **am not** tired. (Tôi không mệt.)
- He **is not / isn't** at home. (Anh ấy không ở nhà.)
- They **are not / aren't** teachers. (Họ không phải giáo viên.)

Đảo to be lên trước chủ ngữ để tạo câu hỏi:
- **Are** you a student? — Yes, I am. / No, I'm not.
- **Is** she from Japan? — Yes, she is. / No, she isn't.`,
        remember: "Câu hỏi Yes/No với to be: Be + chủ ngữ + ...?",
      },
      {
        title: "Lỗi thường gặp",
        body: `- Không dùng **have** để nói tuổi trong tiếng Anh: **I am 20 years old**, không nói "I have 20 years old".
- Chủ ngữ số ít đi với **is**, số nhiều đi với **are**: My brother **is** tall. / My brothers **are** tall.
- Khi nói quốc tịch, dùng to be: She **is** Vietnamese. (Cô ấy là người Việt Nam.)`,
        remember: "Nói tuổi: I am + số tuổi + years old.",
      },
    ],
    questions: [
      q("My sister ___ a doctor.", "is", ["am", "are", "be"], "My sister là ngôi thứ ba số ít nên dùng is."),
      q("We ___ from Vietnam.", "are", ["am", "is", "be"], "We là số nhiều nên đi với are."),
      q("___ you tired?", "Are", ["Am", "Is", "Be"], "Câu hỏi với you dùng Are you...?"),
      q("She ___ not at home.", "is", ["am", "are", "be"], "She đi với is; phủ định là is not / isn't."),
      q("Câu nào đúng?", "I am 20 years old.", ["I have 20 years old.", "I is 20 years old.", "I be 20 years old."], "Tiếng Anh dùng to be để nói tuổi: I am 20 years old."),
      q("Đại từ nào thay thế đúng cho “Lan and I”?", "We", ["They", "She", "You"], "Lan and I = chúng tôi, dùng we."),
    ],
  },
  {
    title: "Mạo từ a / an / the & danh từ số nhiều",
    summary: "Dùng a/an đúng theo âm, dùng the khi xác định, và nắm quy tắc chuyển danh từ sang số nhiều.",
    sections: [
      {
        title: "A / an / the",
        body: `- **A** đứng trước danh từ đếm được số ít bắt đầu bằng **âm phụ âm**: a book, a car, a university (âm /j/).
- **An** đứng trước danh từ bắt đầu bằng **âm nguyên âm**: an apple, an egg, an hour (h câm), an honest person.
- **The** dùng khi người nghe đã biết vật/người đó, khi vật là duy nhất hoặc đã được nhắc trước: the sun, the door, the book on the table.
- Không dùng a/an với danh từ số nhiều hoặc danh từ không đếm được: books, water (không nói "a water").`,
        remember: "Chọn a/an theo ÂM đầu, không chỉ theo chữ cái: an hour, a university.",
      },
      {
        title: "Danh từ số nhiều",
        body: `- Thêm **-s**: book → books, car → cars.
- Thêm **-es** sau -s, -x, -ch, -sh, -o: bus → buses, box → boxes, watch → watches, tomato → tomatoes.
- Phụ âm + y → **-ies**: city → cities, study → studies.
- Một số danh từ bất quy tắc: man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth.
- Danh từ số nhiều đi với **are** hoặc động từ số nhiều: The children **are** happy.`,
        remember: "child → children, person → people; không thêm -s vào các dạng bất quy tắc này.",
      },
      {
        title: "Mạo từ và nghĩa chung",
        body: `Khi nói về một loại sự vật nói chung, ta thường dùng danh từ số nhiều hoặc danh từ không đếm được mà không cần mạo từ:
- **Books** are expensive. (Sách nói chung thì đắt.)
- I like **music**. (Tôi thích âm nhạc.)

Khi nói một vật cụ thể, dùng **the**:
- The book on the desk is mine. (Quyển sách trên bàn là của tôi.)`,
        remember: "Nói chung: books / music. Nói cụ thể: the book / the music.",
      },
    ],
    questions: [
      q("I saw ___ elephant at the zoo.", "an", ["a", "the", "some"], "Elephant bắt đầu bằng âm nguyên âm /e/ nên dùng an."),
      q("She is ___ honest person.", "an", ["a", "the", "some"], "Honest có h câm, bắt đầu bằng âm /ɒ/ nên dùng an."),
      q("___ sun is very hot today.", "The", ["A", "An", "Some"], "Sun là vật duy nhất nên dùng the."),
      q("These books ___ expensive.", "are", ["is", "am", "be"], "Books là số nhiều nên dùng are."),
      q("Dạng số nhiều của “city” là gì?", "cities", ["citys", "cityes", "citis"], "Phụ âm + y đổi thành -ies: city → cities."),
      q("Câu nào đúng?", "There are three children.", ["There are three childs.", "There are three childes.", "There are three childrens."], "Child có dạng số nhiều bất quy tắc là children."),
    ],
  },
  {
    title: "This / that / these / those & tính từ sở hữu",
    summary: "Phân biệt this/that/these/those, dùng my, your, his, her, our, their và sở hữu cách 's.",
    sections: [
      {
        title: "Chỉ vật ở gần và ở xa",
        body: `- **This** + danh từ số ít ở gần: This book is new. (Quyển sách này mới.)
- **These** + danh từ số nhiều ở gần: These books are new.
- **That** + danh từ số ít ở xa: That car is expensive.
- **Those** + danh từ số nhiều ở xa: Those cars are expensive.

This/that đi với động từ số ít; these/those đi với động từ số nhiều.`,
        remember: "this/that + số ít; these/those + số nhiều.",
      },
      {
        title: "Tính từ sở hữu",
        body: `Tính từ sở hữu đứng trước danh từ:
- I → **my** book
- You → **your** book
- He → **his** book
- She → **her** book
- It → **its** name
- We → **our** books
- They → **their** books

Ví dụ: **Her** name is Lan. / **Their** house is big.`,
        remember: "Tính từ sở hữu luôn đứng trước danh từ, không đứng một mình.",
      },
      {
        title: "Sở hữu cách 's",
        body: `Thêm **'s** vào người sở hữu:
- This is **Lan's** book. (Đây là sách của Lan.)
- My **brother's** car is new.

Với danh từ số nhiều đã có -s, chỉ thêm dấu **'**:
- my **parents'** house (nhà của bố mẹ tôi)

Với danh từ số nhiều bất quy tắc, thêm **'s**:
- the **children's** room (phòng của bọn trẻ)`,
        remember: "Người sở hữu + 's + vật được sở hữu: Lan's book.",
      },
    ],
    questions: [
      q("___ books are mine. (những quyển sách ở gần)", "These", ["This", "That", "Those"], "Books là số nhiều và ở gần nên dùng these."),
      q("___ is my car. (chiếc xe ở xa)", "That", ["This", "These", "Those"], "Car là số ít và ở xa nên dùng that."),
      q("This is ___ bag. (của cô ấy)", "her", ["she", "hers", "his"], "Trước danh từ bag cần tính từ sở hữu her."),
      q("___ name is Nam. (của anh ấy)", "His", ["Her", "Him", "He"], "Trước danh từ name cần tính từ sở hữu his."),
      q("Câu nào đúng?", "This is Lan's book.", ["This is Lan book.", "This is book's Lan.", "This is Lans' book."], "Sở hữu cách: Lan + 's + book."),
      q("___ are my shoes. (những đôi giày ở xa)", "Those", ["This", "That", "These"], "Shoes là số nhiều và ở xa nên dùng those."),
    ],
  },
  {
    title: "There is / There are & giới từ chỉ nơi chốn",
    summary: "Mô tả sự vật trong nhà, trong thành phố bằng there is/are và các giới từ in, on, under, between...",
    sections: [
      {
        title: "There is / There are",
        body: `- **There is** + danh từ số ít hoặc không đếm được: There is a table in the kitchen.
- **There are** + danh từ số nhiều: There are two bedrooms.
- Phủ định: There isn't a garden. / There aren't any chairs.
- Câu hỏi: Is there a bank near here? / Are there any shops?

Trong câu liệt kê, động từ thường theo danh từ đầu tiên:
- There **is** a bed and two chairs in the room.`,
        remember: "There is + số ít/không đếm được; There are + số nhiều.",
      },
      {
        title: "Giới từ chỉ nơi chốn",
        body: `- **in**: trong (in the box, in the kitchen)
- **on**: trên bề mặt (on the table, on the wall)
- **under**: ở dưới (under the bed)
- **behind**: ở phía sau (behind the door)
- **in front of**: ở phía trước (in front of the house)
- **next to**: bên cạnh (next to the bank)
- **between**: ở giữa hai vật/người (between the bank and the park)
- **near**: gần (near the school)`,
        remember: "on the wall / on the table; in the box / in the room.",
      },
      {
        title: "Mẫu câu miêu tả",
        body: `- There is a picture **on** the wall.
- The cat is **under** the table.
- The bank is **between** the supermarket and the park.
- Are there **any** books on the desk? — Yes, there are.

Dùng **some** trong câu khẳng định với số nhiều/không đếm được: There are **some** books on the desk.`,
        remember: "There is/are + some + danh từ; câu hỏi/phủ định thường dùng any.",
      },
    ],
    questions: [
      q("There ___ a table in the kitchen.", "is", ["are", "am", "be"], "A table là số ít nên dùng there is."),
      q("There ___ two bedrooms in the house.", "are", ["is", "am", "be"], "Two bedrooms là số nhiều nên dùng there are."),
      q("The cat is ___ the table. (ở dưới bàn)", "under", ["on", "in", "between"], "Under nghĩa là ở dưới."),
      q("The bank is ___ the supermarket and the park.", "between", ["under", "on", "next"], "Between dùng cho vị trí ở giữa hai vật."),
      q("Câu nào đúng?", "There are some books on the desk.", ["There is some books on the desk.", "There are any books on the desk.", "There have some books on the desk."], "Books số nhiều dùng there are; câu khẳng định dùng some."),
      q("The picture is ___ the wall.", "on", ["in", "at", "under"], "Tranh treo trên bề mặt tường nên dùng on the wall."),
    ],
  },
  {
    title: "Thì hiện tại đơn: khẳng định",
    summary: "Diễn tả thói quen, sự thật và lịch trình; nắm quy tắc thêm -s/-es cho he, she, it.",
    sections: [
      {
        title: "Cấu trúc",
        body: `- I / You / We / They + **động từ nguyên mẫu**: I work in Hanoi.
- He / She / It + **động từ thêm -s/-es**: She works in Hanoi.

Dùng thì hiện tại đơn để nói:
- Thói quen: I **get up** at six every day.
- Sự thật hiển nhiên: Water **boils** at 100°C.
- Lịch trình: The train **leaves** at 8 a.m.`,
        remember: "He / she / it + động từ thêm -s hoặc -es.",
      },
      {
        title: "Quy tắc thêm -s / -es",
        body: `- Thêm **-s**: work → works, live → lives, read → reads.
- Thêm **-es** sau -s, -x, -ch, -sh, -o: watch → watches, go → goes, do → does.
- Phụ âm + y → **-ies**: study → studies, carry → carries.
- **Have** → **has** với he/she/it.

Ví dụ: She **watches** TV. / He **studies** English. / It **has** a long tail.`,
        remember: "go → goes, do → does, have → has, study → studies.",
      },
      {
        title: "Trạng từ và thói quen",
        body: `Thì hiện tại đơn thường đi với:
- every day / every morning
- usually, often, sometimes, never
- once a week, twice a month

Ví dụ:
- I **drink** coffee every morning.
- My brother **plays** football on Sundays.`,
        remember: "Thói quen + hiện tại đơn + trạng từ tần suất.",
      },
    ],
    questions: [
      q("She ___ to school every day.", "goes", ["go", "going", "gone"], "She là ngôi thứ ba số ít: go → goes."),
      q("My brother ___ TV in the evening.", "watches", ["watch", "watching", "watched"], "Watch + -es vì kết thúc bằng -ch và chủ ngữ số ít."),
      q("We ___ in Hanoi.", "live", ["lives", "living", "lived"], "We là số nhiều nên dùng động từ nguyên mẫu live."),
      q("Câu nào đúng?", "He studies English every night.", ["He studys English every night.", "He studyes English every night.", "He study English every night."], "Study → studies: phụ âm + y đổi thành -ies."),
      q("Water ___ at 100°C.", "boils", ["boil", "boiling", "boiled"], "Sự thật hiển nhiên dùng hiện tại đơn; water là số ít nên thêm -s."),
      q("They ___ breakfast at 7 a.m.", "have", ["has", "having", "haves"], "They đi với have, không thêm -s."),
    ],
  },
  {
    title: "Thì hiện tại đơn: phủ định & câu hỏi",
    summary: "Dùng don't / doesn't, Do / Does và trả lời ngắn đúng chuẩn.",
    sections: [
      {
        title: "Phủ định",
        body: `- I / You / We / They + **don't** + động từ nguyên mẫu: I **don't** like coffee.
- He / She / It + **doesn't** + động từ nguyên mẫu: She **doesn't** like coffee.

Lưu ý: sau doesn't, động từ **không** thêm -s:
- He **doesn't go** to work on Sunday. (không nói "doesn't goes")`,
        remember: "doesn't + động từ nguyên mẫu.",
      },
      {
        title: "Câu hỏi Yes/No",
        body: `- **Do** + I / you / we / they + động từ nguyên mẫu?
- **Does** + he / she / it + động từ nguyên mẫu?

Ví dụ:
- **Do** you live in Da Nang? — Yes, I do. / No, I don't.
- **Does** she play tennis? — Yes, she does. / No, she doesn't.`,
        remember: "Do/Does + chủ ngữ + động từ nguyên mẫu?",
      },
      {
        title: "Lỗi thường gặp",
        body: `- Không dùng hai lần -s: "Does she **plays**?" → **Does she play?**
- Không quên trợ động từ: "She like fish?" → **Does she like fish?**
- Trả lời ngắn dùng do/does, không lặp lại động từ chính: Yes, she **does**.`,
        remember: "Sau do/does/don't/doesn't luôn là động từ nguyên mẫu.",
      },
    ],
    questions: [
      q("He ___ like fish.", "doesn't", ["don't", "isn't", "not"], "He là ngôi thứ ba số ít nên dùng doesn't."),
      q("___ you live in Da Nang?", "Do", ["Does", "Are", "Is"], "You đi với Do trong câu hỏi hiện tại đơn."),
      q("___ she play tennis?", "Does", ["Do", "Is", "Are"], "She là ngôi thứ ba số ít nên dùng Does."),
      q("Câu nào đúng?", "She doesn't go to work on Sunday.", ["She don't go to work on Sunday.", "She doesn't goes to work on Sunday.", "She not go to work on Sunday."], "Sau doesn't dùng động từ nguyên mẫu go."),
      q("“Does he work here?” — Yes, ___.", "he does", ["he do", "he is", "he works"], "Câu trả lời ngắn dùng does, không lặp lại work."),
      q("They ___ not watch TV in the morning.", "do", ["does", "is", "are"], "They đi với do: they do not / don't."),
    ],
  },
  {
    title: "Trạng từ tần suất & cách nói giờ",
    summary: "Dùng always, usually, often, sometimes, never đúng vị trí và nói giờ với past / to.",
    sections: [
      {
        title: "Trạng từ tần suất",
        body: `Các trạng từ thường gặp:
- **always** (luôn luôn) → **usually** (thường xuyên) → **often** (thường) → **sometimes** (thỉnh thoảng) → **rarely** (hiếm khi) → **never** (không bao giờ)

Vị trí:
- Trước động từ thường: She **usually** walks to school.
- Sau động từ to be: He is **never** late.
- Sau trợ động từ: I **don't often** eat fast food.`,
        remember: "Trước động từ thường, sau to be.",
      },
      {
        title: "Cách nói giờ",
        body: `- 7:00 — **seven o'clock**
- 7:15 — **quarter past seven**
- 7:30 — **half past seven**
- 7:45 — **quarter to eight**
- 7:10 — **ten past seven**
- 7:50 — **ten to eight**

Dùng **at** trước giờ: at 7 o'clock, at half past six.`,
        remember: "past = hơn; to = kém. 7:45 = quarter to eight.",
      },
      {
        title: "Cụm thời gian thường dùng",
        body: `- **every day / every morning**: I run every morning.
- **once a week / twice a month**: She goes swimming twice a week.
- **on Mondays**: I work on Mondays.
- **at night**: I read at night.

Lưu ý: **at night**, không nói "in the night" khi nói chung.`,
        remember: "at night, in the morning, on Monday.",
      },
    ],
    questions: [
      q("She ___ walks to school. (thường xuyên)", "usually", ["yesterday", "tomorrow", "last week"], "Usually là trạng từ tần suất, phù hợp với thì hiện tại đơn."),
      q("He is ___ late. (anh ấy không bao giờ đến muộn)", "never", ["always", "usually", "often"], "Never nghĩa là không bao giờ; các từ còn lại đều trái nghĩa."),
      q("7:15 đọc là gì?", "quarter past seven", ["quarter to seven", "half past seven", "seven quarter past"], "7:15 là 7 giờ 15 phút, dùng quarter past seven."),
      q("I ___ drink coffee in the morning.", "often", ["yesterday", "tomorrow", "last night"], "Often là trạng từ tần suất; các lựa chọn còn lại chỉ thời gian quá khứ/tương lai."),
      q("Câu nào đúng?", "She always gets up early.", ["She gets up always early.", "She always get up early.", "Always she gets up early."], "Trạng từ tần suất đứng trước động từ thường; chủ ngữ she dùng gets."),
      q("Cụm nào đúng?", "at night", ["in night", "on night", "by night"], "Cụm cố định là at night."),
    ],
  },
  {
    title: "Thì hiện tại tiếp diễn",
    summary: "Diễn tả hành động đang diễn ra ngay lúc nói với am/is/are + V-ing.",
    sections: [
      {
        title: "Cấu trúc",
        body: `- I **am** + V-ing: I **am reading** a book.
- He / She / It **is** + V-ing: She **is cooking** dinner.
- You / We / They **are** + V-ing: They **are playing** football.

Dùng thì này cho hành động đang diễn ra **ngay lúc nói**:
- Look! The baby **is sleeping**.
- I **am working** at the moment.`,
        remember: "am/is/are + động từ thêm -ing.",
      },
      {
        title: "Quy tắc thêm -ing",
        body: `- Thông thường thêm **-ing**: read → reading, play → playing.
- Động từ tận cùng bằng **e** câm: bỏ e rồi thêm -ing: make → making, write → writing.
- Động từ một âm tiết kết thúc bằng nguyên âm + phụ âm: gấp đôi phụ âm: run → running, swim → swimming, sit → sitting.
- **lie** → lying, **die** → dying (trường hợp đặc biệt).`,
        remember: "make → making, run → running, swim → swimming.",
      },
      {
        title: "Dấu hiệu nhận biết",
        body: `Các cụm thường đi với hiện tại tiếp diễn:
- **now**, **right now**
- **at the moment**
- **Look!**, **Listen!**
- **today** (khi nói tạm thời)

Ví dụ: **Listen!** Someone **is singing**.
Phủ định: She **isn't** sleeping. Câu hỏi: **Are** you listening?`,
        remember: "now / at the moment / Look! / Listen! → hiện tại tiếp diễn.",
      },
    ],
    questions: [
      q("She ___ reading a book now.", "is", ["am", "are", "be"], "She đi với is trong thì hiện tại tiếp diễn."),
      q("They ___ playing football.", "are", ["is", "am", "be"], "They đi với are."),
      q("I ___ working at the moment.", "am", ["is", "are", "be"], "I đi với am."),
      q("Câu nào đúng?", "He is swimming in the pool.", ["He swimming in the pool.", "He is swiming in the pool.", "He are swimming in the pool."], "Swim gấp đôi m: swimming; he đi với is."),
      q("Look! The baby ___ .", "is sleeping", ["sleep", "sleeps", "are sleeping"], "Look! báo hiệu hành động đang diễn ra; the baby số ít dùng is sleeping."),
      q("What ___ you doing?", "are", ["is", "am", "do"], "Câu hỏi hiện tại tiếp diễn với you: What are you doing?"),
    ],
  },
  {
    title: "Hiện tại đơn vs hiện tại tiếp diễn",
    summary: "Phân biệt thói quen và hành động đang diễn ra; nhận biết dấu hiệu và động từ trạng thái.",
    sections: [
      {
        title: "Khác biệt cốt lõi",
        body: `- **Hiện tại đơn**: thói quen, sự thật, lịch trình.
  - I **go** to school by bus every day.
  - She **drinks** coffee every morning.
- **Hiện tại tiếp diễn**: hành động đang diễn ra hoặc tạm thời.
  - I **am going** to school now.
  - She **is drinking** coffee at the moment.`,
        remember: "Thói quen → hiện tại đơn; đang xảy ra → hiện tại tiếp diễn.",
      },
      {
        title: "Dấu hiệu nhận biết",
        body: `Hiện tại đơn thường đi với:
- every day, usually, often, sometimes, never, once a week.

Hiện tại tiếp diễn thường đi với:
- now, right now, at the moment, Look!, Listen!, today.

Ví dụ:
- He **plays** tennis every Sunday.
- He **is playing** tennis now.`,
        remember: "every Sunday → đơn; now → tiếp diễn.",
      },
      {
        title: "Động từ trạng thái",
        body: `Một số động từ chỉ trạng thái, suy nghĩ, cảm xúc thường **không** dùng ở tiếp diễn:
- like, love, hate, want, need, know, understand, believe.

Đúng: I **like** this song.
Sai: I am liking this song.

Một số động từ có thể đổi nghĩa: I **have** a car. (sở hữu) / I **am having** lunch. (đang ăn)`,
        remember: "like / want / know / need thường dùng hiện tại đơn.",
      },
    ],
    questions: [
      q("I usually ___ to school by bus.", "go", ["am going", "goes", "went"], "Usually là thói quen nên dùng hiện tại đơn; I đi với go."),
      q("Be quiet! The teacher ___ .", "is talking", ["talks", "talk", "are talking"], "Hành động đang diễn ra, the teacher số ít nên dùng is talking."),
      q("She ___ coffee every morning.", "drinks", ["is drinking", "drink", "drinking"], "Every morning là thói quen; she dùng drinks."),
      q("Look! It ___ .", "is raining", ["rains", "rain", "are raining"], "Look! báo hiệu hành động đang diễn ra; it dùng is raining."),
      q("Câu nào đúng?", "I am reading a book now.", ["I read a book now.", "I reading a book now.", "I am read a book now."], "Now cần hiện tại tiếp diễn: am reading."),
      q("He ___ English at the moment.", "is studying", ["studies", "study", "are studying"], "At the moment cần tiếp diễn; he dùng is studying."),
    ],
  },
  {
    title: "Can / can't, câu mệnh lệnh & Let's",
    summary: "Nói về khả năng, xin phép, đưa ra mệnh lệnh và rủ rê bằng can, imperative và let's.",
    sections: [
      {
        title: "Can / can't",
        body: `- **Can + động từ nguyên mẫu** để nói khả năng hoặc xin phép:
  - I **can** swim. (Tôi biết bơi.)
  - **Can** I open the window? (Tôi có thể mở cửa sổ không?)
- **Can't** = cannot, dùng cho khả năng tiêu cực:
  - She **can't** speak Japanese.
- Không thêm -s sau can: He **can play** the guitar. (không nói "cans play")`,
        remember: "can/can't + động từ nguyên mẫu, không chia theo chủ ngữ.",
      },
      {
        title: "Câu mệnh lệnh",
        body: `Câu mệnh lệnh bắt đầu bằng động từ nguyên mẫu:
- **Open** the door, please.
- **Sit** down.
- **Don't** run in the classroom. (phủ định)

Dùng **please** để lịch sự hơn.`,
        remember: "Mệnh lệnh khẳng định: V + ...; phủ định: Don't + V.",
      },
      {
        title: "Let's",
        body: `**Let's** = Let us, dùng để rủ rê:
- **Let's** go to the cinema tonight. (Chúng ta đi xem phim tối nay nhé.)
- **Let's** have lunch together.

Sau let's là động từ nguyên mẫu, không có "to".`,
        remember: "Let's + động từ nguyên mẫu.",
      },
    ],
    questions: [
      q("She ___ swim very well.", "can", ["cans", "can to", "is can"], "Can không chia và đi trực tiếp với động từ nguyên mẫu."),
      q("___ you help me, please?", "Can", ["Do", "Are", "Is"], "Can you...? dùng để nhờ vả/xin phép."),
      q("Câu phủ định: I ___ speak Japanese.", "can't", ["don't can", "not can", "can not to"], "Can't là dạng phủ định của can, theo sau là động từ nguyên mẫu."),
      q("___ open the door, please.", "Open", ["Opens", "Opening", "To open"], "Câu mệnh lệnh dùng động từ nguyên mẫu Open."),
      q("___ go to the cinema tonight.", "Let's", ["Let", "Lets", "Let us to"], "Let's + động từ nguyên mẫu để rủ rê."),
      q("Câu nào đúng?", "He can play the guitar.", ["He can plays the guitar.", "He cans play the guitar.", "He can playing the guitar."], "Sau can luôn là động từ nguyên mẫu play."),
    ],
  },
  {
    title: "Danh từ đếm được / không đếm được & some / any",
    summary: "Phân biệt danh từ đếm được và không đếm được; dùng some, any và đơn vị đo.",
    sections: [
      {
        title: "Hai loại danh từ",
        body: `- **Đếm được**: có dạng số ít và số nhiều, dùng với a/an và số đếm.
  - a book → two books, an apple → three apples.
- **Không đếm được**: không có dạng số nhiều, không dùng a/an.
  - water, milk, rice, money, information, homework, music.

Muốn đếm danh từ không đếm được, dùng đơn vị:
- a glass of water, a bowl of rice, a piece of information, a piece of homework.`,
        remember: "Không nói a water / informations; dùng a glass of water / some information.",
      },
      {
        title: "Some / any",
        body: `- **Some** dùng trong câu khẳng định với số nhiều/không đếm được:
  - There are **some** apples. / There is **some** milk.
- **Any** dùng trong câu phủ định và câu hỏi:
  - There aren't **any** apples. / Is there **any** milk?
- **Some** cũng dùng trong lời mời, đề nghị:
  - Would you like **some** tea? / Can I have **some** water?`,
        remember: "Khẳng định: some; phủ định/câu hỏi: any; lời mời: some.",
      },
      {
        title: "Mẫu câu thường gặp",
        body: `- I need **some** information about the course.
- We don't have **any** homework today.
- Are there **any** eggs in the fridge?
- Would you like **some** coffee?

Lưu ý: **information**, **homework**, **money**, **news** là danh từ không đếm được.`,
        remember: "Information không có -s; nói some information.",
      },
    ],
    questions: [
      q("There is ___ milk in the fridge.", "some", ["any", "a", "many"], "Câu khẳng định với danh từ không đếm được dùng some."),
      q("Are there ___ apples?", "any", ["some", "much", "a"], "Câu hỏi với danh từ số nhiều dùng any."),
      q("I don't have ___ money.", "any", ["some", "a", "many"], "Câu phủ định dùng any; money không đếm được."),
      q("Would you like ___ tea?", "some", ["any", "many", "a"], "Lời mời dùng some."),
      q("Câu nào đúng?", "I need some information.", ["I need an information.", "I need informations.", "I need many information."], "Information là danh từ không đếm được, không dùng a/an hay -s."),
      q("There aren't ___ chairs in the room.", "any", ["some", "much", "a"], "Câu phủ định với danh từ số nhiều dùng any."),
    ],
  },
  {
    title: "Much / many / a lot of & How much / How many",
    summary: "Hỏi và nói về số lượng với much, many, a lot of, how much và how many.",
    sections: [
      {
        title: "Much / many / a lot of",
        body: `- **Many** + danh từ đếm được số nhiều: many books, many people.
- **Much** + danh từ không đếm được: much water, much time.
- **A lot of / lots of** + cả hai loại, thường dùng trong câu khẳng định:
  - a lot of books, a lot of water.

Much và many thường dùng trong câu phủ định và câu hỏi:
- I don't have **much** time.
- Are there **many** students?`,
        remember: "many + đếm được; much + không đếm được; a lot of + cả hai.",
      },
      {
        title: "How much / How many",
        body: `- **How many** + danh từ đếm được số nhiều:
  - **How many** books do you have?
- **How much** + danh từ không đếm được:
  - **How much** water do you drink every day?
- **How much** cũng dùng để hỏi giá tiền:
  - **How much** is this T-shirt?`,
        remember: "How many + đếm được; How much + không đếm được/giá tiền.",
      },
      {
        title: "Lỗi thường gặp",
        body: `- Không nói "many water" → **much water** hoặc **a lot of water**.
- Không nói "much books" → **many books**.
- Không nói "a lot of traffic**s**" → **a lot of traffic** (traffic không đếm được).
- Sau how much/many dùng danh từ, không dùng động từ: How much **money**...?`,
        remember: "Traffic, information, homework, money: không đếm được.",
      },
    ],
    questions: [
      q("How ___ sugar do you need?", "much", ["many", "a lot", "any"], "Sugar không đếm được nên dùng how much."),
      q("How ___ students are there in the class?", "many", ["much", "a lot", "any"], "Students đếm được số nhiều nên dùng how many."),
      q("There isn't ___ water in the bottle.", "much", ["many", "a lot", "any"], "Câu phủ định với danh từ không đếm được dùng much."),
      q("How ___ eggs are there?", "many", ["much", "a lot", "any"], "Eggs đếm được số nhiều nên dùng how many."),
      q("Câu nào đúng?", "There is a lot of traffic.", ["There are a lot of traffic.", "There is many traffic.", "There is much traffics."], "Traffic không đếm được, dùng a lot of traffic."),
      q("How much ___ do you have?", "time", ["times", "people", "books"], "Time không đếm được nên dùng how much time."),
    ],
  },
  {
    title: "Giới từ thời gian in / on / at",
    summary: "Dùng in, on, at đúng với tháng, năm, thứ, ngày và giờ.",
    sections: [
      {
        title: "In",
        body: `Dùng **in** với:
- Tháng: **in** January, **in** May
- Năm: **in** 2026, **in** 1999
- Mùa: **in** summer, **in** winter
- Buổi trong ngày: **in** the morning, **in** the afternoon, **in** the evening

Ngoại lệ: **at night**, không dùng "in the night" khi nói chung.`,
        remember: "in + tháng / năm / mùa / buổi (trừ at night).",
      },
      {
        title: "On",
        body: `Dùng **on** với:
- Thứ: **on** Monday, **on** Friday
- Ngày: **on** 12 March, **on** my birthday
- Ngày cụ thể: **on** Christmas Day

Ví dụ:
- I have English **on** Monday.
- We have a party **on** my birthday.`,
        remember: "on + thứ / ngày cụ thể.",
      },
      {
        title: "At",
        body: `Dùng **at** với:
- Giờ: **at** 6 o'clock, **at** half past seven
- **at night**, **at noon**, **at midnight**
- **at the weekend** (Anh) / **on the weekend** (Mỹ)

Ví dụ:
- She gets up **at** six.
- I read **at night**.`,
        remember: "at + giờ; at night / at noon / at midnight.",
      },
    ],
    questions: [
      q("I was born ___ 2005.", "in", ["on", "at", "by"], "Năm đi với in: in 2005."),
      q("The meeting is ___ Monday.", "on", ["in", "at", "by"], "Thứ đi với on: on Monday."),
      q("She wakes up ___ 6 o'clock.", "at", ["in", "on", "by"], "Giờ đi với at: at 6 o'clock."),
      q("We have English ___ the morning.", "in", ["on", "at", "by"], "Buổi sáng dùng in the morning."),
      q("___ my birthday, I usually have a party.", "On", ["In", "At", "By"], "Ngày cụ thể (sinh nhật) dùng on."),
      q("Cụm nào đúng?", "at night", ["in night", "on night", "by night"], "Cụm cố định là at night."),
    ],
  },
  {
    title: "Từ để hỏi (Question words)",
    summary: "Dùng what, where, when, why, who, whose, how, which để đặt câu hỏi đúng trật tự.",
    sections: [
      {
        title: "Các từ để hỏi thường gặp",
        body: `- **What**: cái gì → What is your name?
- **Where**: ở đâu → Where do you live?
- **When**: khi nào → When is your birthday?
- **Why**: tại sao → Why are you late?
- **Who**: ai → Who is that man?
- **Whose**: của ai → Whose book is this?
- **How**: như thế nào → How do you go to school?
- **Which**: cái nào → Which colour do you like?`,
        remember: "What / Where / When / Why / Who / Whose / How / Which.",
      },
      {
        title: "Trật tự câu hỏi",
        body: `Với động từ thường:
- **Wh- + do/does + chủ ngữ + động từ nguyên mẫu?**
  - Where **do** you **live**?
  - What **does** she **want**?

Với to be:
- **Wh- + am/is/are + chủ ngữ?**
  - Where **is** the bank?
  - Why **are** you tired?

Khi who/which là chủ ngữ, không dùng do/does:
- Who **plays** football? (không nói "Who does play...?")`,
        remember: "Wh- + trợ động từ + chủ ngữ + động từ chính.",
      },
      {
        title: "Mẫu hỏi và trả lời",
        body: `- **How** do you go to school? — By bike.
- **How often** do you play football? — Twice a week.
- **Whose** bag is this? — It's Lan's.
- **Which** do you prefer, tea or coffee? — Tea, please.

Lưu ý: **How** có thể hỏi cách thức; **How often** hỏi tần suất; **How much/many** hỏi số lượng.`,
        remember: "How = cách thức; How often = tần suất; How much/many = số lượng.",
      },
    ],
    questions: [
      q("___ is your name?", "What", ["Where", "When", "Why"], "Hỏi tên dùng What is your name?"),
      q("___ do you live?", "Where", ["What", "When", "Why"], "Hỏi nơi chốn dùng Where."),
      q("___ are you late?", "Why", ["What", "Where", "When"], "Hỏi lý do dùng Why."),
      q("___ is your birthday?", "When", ["What", "Where", "Why"], "Hỏi thời gian dùng When."),
      q("___ book is this?", "Whose", ["Who", "Which", "How"], "Hỏi ai sở hữu dùng Whose."),
      q("___ do you go to school? — By bike.", "How", ["What", "Why", "When"], "Hỏi cách thức/phương tiện dùng How."),
    ],
  },
  {
    title: "Quá khứ đơn với was / were",
    summary: "Diễn tả trạng thái và sự việc trong quá khứ với was/were, phủ định và câu hỏi.",
    sections: [
      {
        title: "Cấu trúc",
        body: `- I / He / She / It + **was**: I **was** at home yesterday.
- You / We / They + **were**: They **were** happy last night.

Dùng was/were để nói về:
- Trạng thái trong quá khứ: She **was** tired.
- Nơi chốn trong quá khứ: We **were** at the cinema.
- Thông tin cá nhân trong quá khứ: I **was** born in 2000.`,
        remember: "I/he/she/it + was; you/we/they + were.",
      },
      {
        title: "Phủ định và câu hỏi",
        body: `- Phủ định: **wasn't / weren't**
  - She **wasn't** at school yesterday.
  - They **weren't** at home.
- Câu hỏi: **Was/Were + chủ ngữ?**
  - **Was** he at the party? — Yes, he was.
  - **Were** you tired? — No, I wasn't.`,
        remember: "wasn't / weren't; Was/Were + S...?",
      },
      {
        title: "Cụm thời gian quá khứ",
        body: `- yesterday, last night, last week, last year
- two days ago, in 2010
- when I was a child

Ví dụ:
- I **was** at my grandmother's house **last weekend**.
- We **were** in Da Nang **two years ago**.`,
        remember: "yesterday / last... / ... ago → quá khứ.",
      },
    ],
    questions: [
      q("I ___ at home yesterday.", "was", ["were", "am", "is"], "I đi với was trong quá khứ."),
      q("They ___ happy last night.", "were", ["was", "are", "is"], "They đi với were."),
      q("She ___ not at school yesterday.", "was", ["were", "is", "are"], "She đi với was; phủ định là was not / wasn't."),
      q("___ you tired after the trip?", "Were", ["Was", "Are", "Do"], "You đi với were trong câu hỏi quá khứ."),
      q("Câu nào đúng?", "We were at the cinema last Sunday.", ["We was at the cinema last Sunday.", "We are at the cinema last Sunday.", "We be at the cinema last Sunday."], "We đi với were và last Sunday là quá khứ."),
      q("He ___ born in 2000.", "was", ["were", "is", "am"], "Cấu trúc be born dùng was với he."),
    ],
  },
  {
    title: "Quá khứ đơn: động từ có quy tắc",
    summary: "Thêm -ed đúng chính tả và dùng thì quá khứ đơn cho hành động đã kết thúc.",
    sections: [
      {
        title: "Cấu trúc",
        body: `- Khẳng định: **S + V-ed**
  - I **visited** my grandparents yesterday.
  - She **watched** TV last night.
- Phủ định: **S + didn't + V nguyên mẫu**
  - He **didn't visit** his aunt.
- Câu hỏi: **Did + S + V nguyên mẫu?**
  - **Did** you **watch** the film?`,
        remember: "Quá khứ đơn khẳng định: V-ed; sau didn't/did dùng động từ nguyên mẫu.",
      },
      {
        title: "Quy tắc thêm -ed",
        body: `- Thông thường: work → work**ed**, play → play**ed**.
- Tận cùng bằng **e**: chỉ thêm **-d**: live → live**d**, like → like**d**.
- Phụ âm + y → **-ied**: study → stud**ied**, carry → carr**ied**.
- Một âm tiết, kết thúc bằng nguyên âm + phụ âm: gấp đôi phụ âm: stop → stop**ped**, plan → plan**ned**.`,
        remember: "study → studied, stop → stopped, live → lived.",
      },
      {
        title: "Cách dùng",
        body: `Dùng quá khứ đơn cho hành động đã xảy ra và kết thúc trong quá khứ, thường có mốc thời gian:
- I **finished** my homework **two hours ago**.
- We **walked** to the park **yesterday**.
- She **cooked** dinner **last night**.

Không dùng quá khứ đơn cho thói quen hiện tại.`,
        remember: "Hành động đã kết thúc + mốc thời gian quá khứ → V-ed.",
      },
    ],
    questions: [
      q("I ___ my grandparents yesterday.", "visited", ["visit", "visiting", "visits"], "Yesterday cần quá khứ đơn: visit → visited."),
      q("She ___ TV last night.", "watched", ["watch", "watching", "watches"], "Last night cần quá khứ đơn: watch → watched."),
      q("They ___ to the park two days ago.", "walked", ["walk", "walking", "walks"], "Two days ago cần quá khứ đơn: walk → walked."),
      q("Câu nào đúng?", "He studied English last night.", ["He studyed English last night.", "He studed English last night.", "He studies English last night."], "Study → studied (y → ied)."),
      q("We ___ dinner at 7 p.m. yesterday.", "cooked", ["cook", "cooking", "cooks"], "Yesterday cần quá khứ đơn: cook → cooked."),
      q("Did you ___ the film?", "like", ["liked", "likes", "liking"], "Sau did dùng động từ nguyên mẫu like."),
    ],
  },
  {
    title: "Quá khứ đơn: động từ bất quy tắc",
    summary: "Học các động từ bất quy tắc thường gặp và dùng didn't / Did đúng.",
    sections: [
      {
        title: "Động từ bất quy tắc thường gặp",
        body: `Một số động từ không thêm -ed:
- go → **went**
- have → **had**
- buy → **bought**
- see → **saw**
- eat → **ate**
- come → **came**
- do → **did**
- make → **made**
- take → **took**
- get → **got**

Ví dụ: I **went** to the market. / She **bought** a new dress.`,
        remember: "go → went, have → had, buy → bought, see → saw.",
      },
      {
        title: "Phủ định và câu hỏi",
        body: `- Phủ định: **didn't + động từ nguyên mẫu**
  - He **didn't come** to the party.
  - I **didn't eat** breakfast.
- Câu hỏi: **Did + S + động từ nguyên mẫu?**
  - **Did** you **see** him last night?
  - **Did** she **buy** the tickets?

Sau didn't/did, động từ bất quy tắc trở về nguyên mẫu.`,
        remember: "didn't/did + V nguyên mẫu, không dùng went/ate/bought.",
      },
      {
        title: "Mẫu câu kể chuyện",
        body: `- Yesterday, I **got** up late and **went** to school by bus.
- We **had** dinner at a restaurant and then **saw** a film.
- She **came** home, **did** her homework and **went** to bed.

Dùng các từ nối **and**, **then**, **after that** để kể lại sự việc.`,
        remember: "Kể chuyện quá khứ: dùng V2 và từ nối and/then.",
      },
    ],
    questions: [
      q("I ___ to the market yesterday.", "went", ["goed", "gone", "go"], "Go có dạng quá khứ bất quy tắc là went."),
      q("She ___ a new dress last week.", "bought", ["buyed", "buys", "buy"], "Buy có dạng quá khứ là bought."),
      q("We ___ breakfast at 8 a.m.", "had", ["haved", "have", "has"], "Have có dạng quá khứ là had."),
      q("He ___ not come to the party.", "did", ["was", "does", "is"], "Câu phủ định quá khứ dùng did not / didn't + động từ nguyên mẫu."),
      q("___ you see him last night?", "Did", ["Do", "Are", "Was"], "Câu hỏi quá khứ với động từ thường dùng Did."),
      q("Câu nào đúng?", "I didn't eat breakfast.", ["I didn't ate breakfast.", "I don't ate breakfast.", "I not eat breakfast."], "Sau didn't dùng động từ nguyên mẫu eat."),
    ],
  },
  {
    title: "Be going to & would like",
    summary: "Nói về dự định tương lai với be going to và lời mời lịch sự với would like.",
    sections: [
      {
        title: "Be going to",
        body: `Cấu trúc: **am/is/are + going to + động từ nguyên mẫu**
- I **am going to visit** my aunt tomorrow.
- She **is going to start** a new job.
- They **are going to move** house next week.

Dùng để nói về **dự định** đã quyết định hoặc dự đoán có căn cứ:
- Look at those clouds! It **is going to rain**.`,
        remember: "am/is/are + going to + V nguyên mẫu.",
      },
      {
        title: "Would like",
        body: `- **Would like + danh từ**: I would like a cup of tea.
- **Would like + to + động từ nguyên mẫu**: I would like to have a cup of tea.
- Viết tắt: I'd like, she'd like.

Dùng để mời hoặc yêu cầu lịch sự:
- **Would you like some coffee?**
- **Would you like to come** with us?`,
        remember: "would like + to V; would like + danh từ.",
      },
      {
        title: "Phân biệt với hiện tại tiếp diễn",
        body: `- **Be going to** nhấn mạnh dự định: I **am going to study** English tonight.
- **Hiện tại tiếp diễn** có thể nói lịch hẹn đã sắp xếp: I **am meeting** my friend at 7.

Với A1, dùng **be going to** cho kế hoạch tương lai là an toàn và rõ nghĩa.`,
        remember: "Dự định tương lai: be going to + V.",
      },
    ],
    questions: [
      q("I ___ going to visit my aunt tomorrow.", "am", ["is", "are", "be"], "I đi với am: I am going to visit."),
      q("She is going to ___ a new job.", "start", ["starts", "started", "starting"], "Sau going to dùng động từ nguyên mẫu start."),
      q("We ___ going to travel next month.", "are", ["is", "am", "be"], "We đi với are."),
      q("I would like ___ a cup of tea.", "to have", ["have", "having", "had"], "Would like + to + động từ nguyên mẫu."),
      q("Would you like ___ with us?", "to come", ["come", "coming", "came"], "Would you like + to + động từ nguyên mẫu."),
      q("Câu nào đúng?", "They are going to move house next week.", ["They going to move house next week.", "They are going move house next week.", "They is going to move house next week."], "They đi với are và sau going to là động từ nguyên mẫu move."),
    ],
  },
  {
    title: "Đại từ tân ngữ & like / enjoy + V-ing",
    summary: "Dùng me, you, him, her, it, us, them và các cấu trúc like, love, enjoy + V-ing.",
    sections: [
      {
        title: "Đại từ tân ngữ",
        body: `Đại từ tân ngữ đứng sau động từ hoặc giới từ:
- I → **me**
- You → **you**
- He → **him**
- She → **her**
- It → **it**
- We → **us**
- They → **them**

Ví dụ:
- Can you help **me**?
- We often visit **them**.
- This book is for **you**.`,
        remember: "Sau động từ/giới từ dùng tân ngữ: me, him, her, us, them.",
      },
      {
        title: "Like / love / enjoy + V-ing",
        body: `- **like / love / enjoy + V-ing**: I like **reading**. / She enjoys **swimming**.
- **enjoy** luôn đi với V-ing, không đi với to V: She enjoys **cooking**. (không nói "enjoys to cook")
- **would like + to V** khác với **like + V-ing**:
  - I **like swimming**. (sở thích nói chung)
  - I **would like to swim** now. (muốn làm ngay)`,
        remember: "enjoy + V-ing; would like + to V.",
      },
      {
        title: "Mẫu câu về sở thích",
        body: `- I **like** listening to music.
- He **loves** playing football.
- She **enjoys** reading books.
- They **hate** getting up early.

Có thể dùng **like/love + to V** với nghĩa tương tự, nhưng **enjoy** chỉ dùng V-ing.`,
        remember: "enjoy + V-ing; like/love + V-ing hoặc to V.",
      },
    ],
    questions: [
      q("She enjoys ___ .", "reading", ["read", "to read", "reads"], "Enjoy + V-ing: enjoy reading."),
      q("Can you help ___?", "me", ["I", "my", "mine"], "Sau động từ help dùng đại từ tân ngữ me."),
      q("We often visit ___ .", "them", ["they", "their", "theirs"], "Sau động từ visit dùng tân ngữ them."),
      q("She enjoys ___ music.", "listening to", ["listen", "listened", "to listen"], "Enjoy + V-ing: enjoy listening to music."),
      q("This book is for ___ .", "you", ["your", "yours", "yourself"], "Sau giới từ for dùng đại từ tân ngữ you."),
      q("Câu nào đúng?", "I like reading books.", ["I like read books.", "I like to reading books.", "I like reads books."], "Like + V-ing: like reading."),
    ],
  },
  {
    title: "So sánh hơn với tính từ ngắn",
    summary: "So sánh hai người/vật bằng tính từ ngắn + -er + than và các dạng bất quy tắc.",
    sections: [
      {
        title: "Cấu trúc",
        body: `- **Tính từ ngắn + -er + than**
  - My house is **bigger than** yours.
  - She is **taller than** her sister.
- Tính từ ngắn thường có một âm tiết: big, small, tall, short, old, new, cheap, cold, hot.`,
        remember: "A + be + adj-er + than + B.",
      },
      {
        title: "Quy tắc thêm -er",
        body: `- Thông thường: tall → tall**er**, cheap → cheap**er**.
- Tận cùng bằng **e**: chỉ thêm **-r**: nice → nic**er**, large → larg**er**.
- Phụ âm + y → **-ier**: happy → happ**ier**, easy → eas**ier**.
- Một âm tiết, nguyên âm + phụ âm: gấp đôi phụ âm: big → big**ger**, hot → hot**ter**.`,
        remember: "big → bigger, hot → hotter, happy → happier.",
      },
      {
        title: "Bất quy tắc và lưu ý",
        body: `- good → **better**
- bad → **worse**
- far → **farther / further**

Ví dụ:
- This book is **better than** that one.
- The weather today is **worse than** yesterday.

Với tính từ dài, dùng **more + adj + than**: more expensive, more beautiful (sẽ học kỹ ở A2).`,
        remember: "good → better, bad → worse; dài: more + adj.",
      },
    ],
    questions: [
      q("My house is ___ than yours.", "bigger", ["big", "biggest", "more big"], "Big gấp đôi phụ âm: bigger; so sánh hơn dùng than."),
      q("She is ___ than her sister.", "taller", ["tall", "tallest", "more tall"], "Tall + er: taller."),
      q("This book is ___ than that one.", "cheaper", ["cheap", "cheapest", "more cheap"], "Cheap + er: cheaper."),
      q("Today is ___ than yesterday.", "hotter", ["hot", "hottest", "more hot"], "Hot gấp đôi phụ âm: hotter."),
      q("Câu nào đúng?", "He is better at English than me.", ["He is gooder at English than me.", "He is more good at English than me.", "He is best at English than me."], "Good có dạng so sánh hơn là better."),
      q("Hanoi is ___ than Da Nang in winter.", "colder", ["cold", "coldest", "more cold"], "Cold + er: colder."),
    ],
  },
];
